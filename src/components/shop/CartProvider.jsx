import { createContext, useContext, useEffect, useMemo, useState } from "react";

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