import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  type CartItem,
  type ShopifyProduct,
  createShopifyCart,
  addLineToShopifyCart,
  updateShopifyCartLine,
  removeLineFromShopifyCart,
  storefrontApiRequest,
  CART_QUERY,
} from '@/lib/shopify';
import type { DummyProduct } from '@/data/dummyProducts';

export type { CartItem, ShopifyProduct };

// Helper to convert DummyProduct into a CartItem-compatible shape
export function dummyToCartItem(product: DummyProduct): Omit<CartItem, 'lineId'> {
  return {
    product: {
      node: {
        id: `dummy-${product.id}`,
        title: product.title,
        description: product.description,
        handle: product.handle,
        productType: product.category,
        tags: [],
        priceRange: { minVariantPrice: { amount: product.price, currencyCode: product.currency } },
        images: { edges: [{ node: { url: product.image, altText: product.title } }] },
        variants: { edges: [{ node: { id: `dummy-variant-${product.id}`, title: 'Default', price: { amount: product.price, currencyCode: product.currency }, availableForSale: true, selectedOptions: product.sizes.length > 0 ? [{ name: 'Size', value: product.sizes[0] }] : [] } }] },
        options: product.sizes.length > 0 ? [{ name: 'Size', values: product.sizes }] : [],
      },
    },
    variantId: `dummy-variant-${product.id}`,
    variantTitle: 'Default',
    price: { amount: product.price, currencyCode: product.currency },
    quantity: 1,
    selectedOptions: product.sizes.length > 0 ? [{ name: 'Size', value: product.sizes[0] }] : [],
  };
}

function isDummyVariant(variantId: string) {
  return variantId.startsWith('dummy-variant-');
}

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  isSyncing: boolean;
  addItem: (item: Omit<CartItem, 'lineId'>) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;
  clearCart: () => void;
  syncCart: () => Promise<void>;
  getCheckoutUrl: () => string | null;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,
      isSyncing: false,

      addItem: async (item) => {
        const { items } = get();
        const existingItem = items.find(i => i.variantId === item.variantId);

        // For dummy products, handle locally only
        if (isDummyVariant(item.variantId)) {
          if (existingItem) {
            set({ items: items.map(i => i.variantId === item.variantId ? { ...i, quantity: i.quantity + item.quantity } : i) });
          } else {
            set({ items: [...items, { ...item, lineId: `local-${Date.now()}` }] });
          }
          return;
        }

        // Real Shopify flow
        const { cartId, clearCart } = get();
        set({ isLoading: true });
        try {
          if (!cartId) {
            const result = await createShopifyCart({ ...item, lineId: null });
            if (result) {
              set({ cartId: result.cartId, checkoutUrl: result.checkoutUrl, items: [{ ...item, lineId: result.lineId }] });
            }
          } else if (existingItem) {
            const newQuantity = existingItem.quantity + item.quantity;
            if (!existingItem.lineId) return;
            const result = await updateShopifyCartLine(cartId, existingItem.lineId, newQuantity);
            if (result.success) {
              set({ items: get().items.map(i => i.variantId === item.variantId ? { ...i, quantity: newQuantity } : i) });
            } else if (result.cartNotFound) clearCart();
          } else {
            const result = await addLineToShopifyCart(cartId, { ...item, lineId: null });
            if (result.success) {
              set({ items: [...get().items, { ...item, lineId: result.lineId ?? null }] });
            } else if (result.cartNotFound) clearCart();
          }
        } catch (error) {
          console.error('Failed to add item:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      updateQuantity: async (variantId, quantity) => {
        if (quantity <= 0) { await get().removeItem(variantId); return; }

        if (isDummyVariant(variantId)) {
          set({ items: get().items.map(i => i.variantId === variantId ? { ...i, quantity } : i) });
          return;
        }

        const { items, cartId, clearCart } = get();
        const item = items.find(i => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;
        set({ isLoading: true });
        try {
          const result = await updateShopifyCartLine(cartId, item.lineId, quantity);
          if (result.success) {
            set({ items: get().items.map(i => i.variantId === variantId ? { ...i, quantity } : i) });
          } else if (result.cartNotFound) clearCart();
        } catch (error) { console.error('Failed to update quantity:', error); }
        finally { set({ isLoading: false }); }
      },

      removeItem: async (variantId) => {
        if (isDummyVariant(variantId)) {
          const newItems = get().items.filter(i => i.variantId !== variantId);
          set({ items: newItems });
          return;
        }

        const { items, cartId, clearCart } = get();
        const item = items.find(i => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;
        set({ isLoading: true });
        try {
          const result = await removeLineFromShopifyCart(cartId, item.lineId);
          if (result.success) {
            const newItems = get().items.filter(i => i.variantId !== variantId);
            newItems.length === 0 ? clearCart() : set({ items: newItems });
          } else if (result.cartNotFound) clearCart();
        } catch (error) { console.error('Failed to remove item:', error); }
        finally { set({ isLoading: false }); }
      },

      clearCart: () => set({ items: [], cartId: null, checkoutUrl: null }),
      getCheckoutUrl: () => get().checkoutUrl,

      syncCart: async () => {
        const { cartId, isSyncing, clearCart } = get();
        if (!cartId || isSyncing) return;
        set({ isSyncing: true });
        try {
          const data = await storefrontApiRequest(CART_QUERY, { id: cartId });
          if (!data) return;
          const cart = data?.data?.cart;
          if (!cart || cart.totalQuantity === 0) clearCart();
        } catch (error) { console.error('Failed to sync cart:', error); }
        finally { set({ isSyncing: false }); }
      },
    }),
    {
      name: 'shopify-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items, cartId: state.cartId, checkoutUrl: state.checkoutUrl }),
    }
  )
);
