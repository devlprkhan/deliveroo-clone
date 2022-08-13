import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id)

    //   Copy of Actual Basket
      let newBasket = [...state.items]

      if (index >= 0) {
        newBasket.splice(index, 1)
      }
      else {
        console.warn(`Cant Remove Product (id: ${action.payload.id}) as its not in basket!`)
      }

      state.items = newBasket
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions

// Get Current Stored Values of Basket from Store
export const selectBasketItems = (state) => state.basket.items 

// Select Coresponding Basket Item
export const selectBasketItemsWithId = (state, id) => state.basket.items.filter((item) => item.id === id);

// Basket Total Maker Takes Array and extract price and sum it
export const selectBasketTotal = (state) => state.basket.items.reduce((total, item) => (total += item.price), 0) 

export default basketSlice.reducer