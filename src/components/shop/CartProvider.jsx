import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { base44 } from "@/api/base44Client";

const STORAGE_KEY = "codelustre-cart";
const CartContext = createContext(null);

function readStoredCart() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // The cart is stored in the browser, so prices can go stale after a shop update.
  // Refresh the stored lines against current product prices once per visit.
  useEffect(() => {
    if (items.length === 0) return;
    let cancelled = false;
    base44.entities.Product.filter({ id: { $in: items.map((item) => item.product_id) } })
      .then((products) => {
        if (cancelled || !Array.isArray(products)) return;
        setItems((current) =>
          current.map((item) => {
            const product = products.find((entry) => entry.id === item.product_id);
            if (!product) return item;
            return {
              ...item,
              name: product.name,
              price_cents: product.price_cents,
              image_url: product.image_url,
            };
          })
        );
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const add = (product, quantity = 1) =>
    setItems((current) => {
      if (current.some((item) => item.product_id === product.id)) {
        return current.map((item) =>
          item.product_id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, 20) }
            : item
        );
      }
      return [
        ...current,
        {
          product_id: product.id,
          name: product.name,
          price_cents: product.price_cents,
          image_url: product.image_url,
          quantity,
        },
      ];
    });

  const setQuantity = (productId, quantity) =>
    setItems((current) =>
      quantity <= 0
        ? current.filter((item) => item.product_id !== productId)
        : current.map((item) =>
            item.product_id === productId ? { ...item, quantity: Math.min(quantity, 20) } : item
          )
    );

  const remove = (productId) =>
    setItems((current) => current.filter((item) => item.product_id !== productId));

  const clear = () => setItems([]);

  const value = useMemo(() => {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce((total, item) => total + item.price_cents * item.quantity, 0);
    return { items, count, subtotal, add, setQuantity, remove, clear };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}