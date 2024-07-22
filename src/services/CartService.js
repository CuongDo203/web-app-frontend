import { useState, useEffect } from "react";
import { getUser } from "./authService";

function CartService() {
    const [cart, setCart] = useState(new Map());

    useEffect(() => {
        // Lấy dữ liệu giỏ hàng từ localStorage khi khởi tạo service
        const storedCart = localStorage.getItem(getCartKey());
        if (storedCart) {
            setCart(new Map(JSON.parse(storedCart)));
        }
    }, []);

    const getCartKey = () => {
        const user = getUser()
        if(user)
            return `cart:${user.id}`
    }

    const addToCart = (productId, quantity = 1) => {
        if(cart.has(productId)) {
            const updatedQuantity = cart.get(productId) + quantity;
            cart.set(productId, updatedQuantity);
            setCart(new Map(cart));
        }
        else {
            cart.set(productId, quantity);
            setCart(new Map(cart))
        }
        saveCartToLocalStorage()
    }

    const removeFromCart = (productId) => {
        cart.delete(productId)
        saveCartToLocalStorage()
    }

    const getCart = () => {
        return cart
    }

    const refreshCart = () => {
        const storedCart = localStorage.getItem(getCartKey())
        if(storedCart) {
            setCart(new Map(JSON.parse(storedCart)))
        }
        else {
            setCart(new Map())
        }
        saveCartToLocalStorage()
    }

    const clearCart = () => {
        cart.clear()
        saveCartToLocalStorage()
    }

    const saveCartToLocalStorage = () => {
        localStorage.setItem(getCartKey(), JSON.stringify(Array.from(cart.entries())))
    }

    return {
        cart, 
        addToCart,
        getCart,
        clearCart,
        refreshCart,
        removeFromCart
    }
}

export default CartService
