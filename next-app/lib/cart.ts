import { CartItem, Product } from "@/types";

const CART_KEY = "mbs_cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveCart(cart: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

export function addToCart(product: Product, variant: string, qty: number): void {
  const cart = getCart();
  const existing = cart.find(
    (item) => item.id === product.id && item.variant === variant
  );
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      variant,
      qty,
    });
  }
  saveCart(cart);
}

export function updateQty(index: number, delta: number): void {
  const cart = getCart();
  if (cart[index]) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
    saveCart(cart);
  }
}

export function removeItem(index: number): void {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

export function getCartTotal(): number {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

export function updateCartBadge(): void {
  const count = getCartCount();
  const badge = document.querySelector(".header__cart-count");
  if (badge) {
    badge.textContent = count > 0 ? String(count) : "";
    badge.classList.toggle("visible", count > 0);
  }
}

export function formatPrice(num: number): string {
  return "Rs. " + num.toLocaleString("en-PK");
}
