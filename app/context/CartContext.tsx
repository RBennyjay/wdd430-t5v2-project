// app/context/CartContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product } from '@/app/lib/definitions'; // Import your Product type

// --- Define Types ---

// The CartItem should include the Product details and a quantity
export interface CartItem extends Product {
  quantity: number;
}

// The Cart Context shape
interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  totalPrice: number;
  addItem: (product: Product, quantity: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// --- Context Provider Component ---

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // 1. Load cart from localStorage on initial load
  useEffect(() => {
    const savedCart = localStorage.getItem('handcraftedHavenCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // 2. Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('handcraftedHavenCart', JSON.stringify(cartItems));
    } else if (cartItems.length === 0) {
      localStorage.removeItem('handcraftedHavenCart');
    }
  }, [cartItems]);

  // Derived state calculations (memoized for performance)
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // --- Cart Actions ---

  const addItem = useCallback((product: Product, quantity: number) => {
    setCartItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(item => item.id === product.id);

      if (existingItemIndex > -1) {
        // Product exists: update quantity
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // New product: add as a new item
        const newItem: CartItem = { ...product, quantity };
        return [...currentItems, newItem];
      }
    });
  }, []);

  const updateQuantity = useCallback((productId: number, newQuantity: number) => {
    setCartItems(currentItems => {
      if (newQuantity <= 0) {
        return currentItems.filter(item => item.id !== productId);
      }
      return currentItems.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  }, []);

  const removeItem = useCallback((productId: number) => {
    setCartItems(currentItems => 
      currentItems.filter(item => item.id !== productId)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const value = {
    cartItems,
    cartCount,
    totalPrice,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// --- Custom Hook to Consume Context ---

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};