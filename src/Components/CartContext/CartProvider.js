

import React, { useState, useEffect } from "react";
import CartContext from './cart-context';

const CartProvider = (props) => {
    const [items, setItems] = useState([]);
    const token = localStorage.getItem('token');
    const productId = 'expense-tracker-33a34'; // Use your product ID here

    const fetchData = async () => {
        const email = localStorage.getItem('email');
        if (!email) {
            console.error('Email not found in localStorage');
            alert('Please log in to continue.');
            return;
        }

        const newEmail = email.replace(/[^\w\s]/gi, ""); // Remove special characters
        try {
            const response = await fetch(`https://react-http-834f8-default-rtdb.firebaseio.com/${productId}/${newEmail}.json`);
            if (!response.ok) {
                throw new Error('Failed to fetch expenses');
            }

            const existingItems = await response.json();
            if (existingItems) {
                const updatedItems = Object.values(existingItems); // Convert object to array
                setItems(updatedItems);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchData(); // Fetch data when component mounts
    }, [token]);

    const addItemHandler = async (item) => {
        console.log(item);

        const email = localStorage.getItem('email');
        if (!email) {
            console.error('Email not found in localStorage');
            return;
        }

        const newEmail = email.replace(/[^\w\s]/gi, ""); // Remove special characters
        try {
            const response = await fetch(`https://react-http-834f8-default-rtdb.firebaseio.com/${productId}/${newEmail}.json`);

            if (!response.ok) {
                throw new Error('Failed to fetch cart items');
            }

            const existingItems = await response.json();
            let updatedItems = [];
            if (existingItems) {
                updatedItems = Object.values(existingItems); // Convert object to array
            }
            updatedItems.push(item);

            const updatedResponse = await fetch(`https://react-http-834f8-default-rtdb.firebaseio.com/${productId}/${newEmail}.json`, {
                method: 'PUT',
                body: JSON.stringify(updatedItems),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!updatedResponse.ok) {
                throw new Error('Failed to update cart items');
            }

            setItems(updatedItems);
        } catch (error) {
            console.error(error.message);
        }
    };

    const removeItemHandler = async (id) => {
        const email = localStorage.getItem('email');
        if (!email) {
            console.error('Email not found in localStorage');
            return;
        }

        const newEmail = email.replace(/[^\w\s]/gi, "");
        try {
            const response = await fetch(`https://react-http-834f8-default-rtdb.firebaseio.com/${productId}/${newEmail}.json`);

            if (!response.ok) {
                throw new Error('Failed to fetch cart items');
            }

            const existingItems = await response.json();
            let updatedItems = [];
            if (existingItems) {
                updatedItems = Object.values(existingItems); // Convert object to array
            }

            updatedItems = updatedItems.filter(item => item.id !== id);

            const updatedResponse = await fetch(`https://react-http-834f8-default-rtdb.firebaseio.com/${productId}/${newEmail}.json`, {
                method: 'PUT',
                body: JSON.stringify(updatedItems),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!updatedResponse.ok) {
                throw new Error('Failed to update cart items');
            }

            setItems(updatedItems);
        } catch (error) {
            console.error(error.message);
        }
    };

    const cartContext = {
        items,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        fetchData
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
