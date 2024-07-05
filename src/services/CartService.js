import { useState, useEffect } from "react";

function CartService() {
    const [cart, setCart] = useState(new Map());

    useEffect(() => {
        // Lấy dữ liệu giỏ hàng từ localStorage khi khởi tạo service
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(new Map(JSON.parse(storedCart)));
        }
    }, []);

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

    const getCart = () => {
        return cart
    }

    const clearCart = () => {
        cart.clear()
        saveCartToLocalStorage()
    }

    const saveCartToLocalStorage = () => {
        localStorage.setItem('cart', JSON.stringify(Array.from(cart.entries())))
    }

    return {
        cart, 
        addToCart,
        getCart,
        clearCart
    }
}

export default CartService
