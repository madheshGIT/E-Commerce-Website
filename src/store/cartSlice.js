import { createSlice } from "@reduxjs/toolkit";

const fetchFromLocalStorage = () => {
    let cart = localStorage.getItem('cart');
    if(cart){
        return JSON.parse(localStorage.getItem('cart'))
    } else {
        return [];
    }
}

const storeInLocalStorage = (data) => {
    localStorage.setItem('cart', JSON.stringify(data))
}
const calculateGrandTotal = (totalAmount, deliveryCharge, discount) => {
    return totalAmount + deliveryCharge - discount;
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        data: fetchFromLocalStorage(),
        totalItems: 0,
        totalAmount: 0,
        deliveryCharge: (Math.floor(Math.random() * (150 - 50 + 1)) + 50),
        grandtotal: 0
    }, 
    reducers: {
        addToCart(state, action){
            const tempItem = state.data.find(item => item.id === action.payload.id);
            if(tempItem){
                const tempCart = state.data.map(item => {
                    if(item.id === action.payload.id){
                        let newQty = item.quantity + action.payload.quantity;
                        let newTotalPrice = newQty * item.price;
                        return { ...item, quantity: newQty, totalPrice: newTotalPrice };
                    } else {
                        return item;
                    }
                });
                state.data = tempCart;
                storeInLocalStorage(state.data);
            } else {
                state.data.push(action.payload);
                storeInLocalStorage(state.data);
            }
        },
        removeFromCart(state, action){
            const tempCart = state.data.filter(item => item.id !== action.payload);
            state.data = tempCart;
            storeInLocalStorage(state.data);
        },
        clearCart(state){
            state.data = [];
            storeInLocalStorage(state.data);
        },
        toggleCartQty(state, action){
            const tempCart = state.data.map(item => {
                if(item.id === action.payload.id){
                    let tempQty = item.quantity;
                    let tempTotalPrice = item.totalPrice;
                    if(action.payload.type === "INC"){
                        tempQty++;
                        tempTotalPrice = tempQty * item.price;
                    }
                    if(action.payload.type === "DEC"){
                        tempQty--;
                        if(tempQty < 1) tempQty = 1;
                        tempTotalPrice = tempQty * item.price;
                    }
                    return {...item, quantity: tempQty, totalPrice: tempTotalPrice};
                } else {
                    return item;
                }
            });
            state.data = tempCart;
            storeInLocalStorage(state.data);
        },
        getCartTotal(state){
            state.totalAmount = state.data.reduce((cartTotal, cartItem) => {
                return cartTotal += cartItem.totalPrice;
            }, 0);
            state.totalItems = state.data.length;
            state.grandtotal = calculateGrandTotal(state.totalAmount, state.deliveryCharge, state.discount); 
        } 
        // searchProducts: (state, action) => {
        //     const searchInput = action.payload.toLowerCase(); 
        //     const filteredItems = state.data.filter((item) =>
        //       item.name.toLowerCase().includes(searchInput)
        //     );
        //     state.data = filteredItems;
        //   }
    }
});

export const {addToCart, removeFromCart, toggleCartQty, getCartTotal, clearCart,searchProducts} = cartSlice.actions;
export default cartSlice.reducer;