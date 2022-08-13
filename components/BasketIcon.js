import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import Currency from "react-currency-formatter";


const BasketIcon = () => {

    // Store
    const items = useSelector(selectBasketItems)
    // Navigation
    const navigation = useNavigation()
    // Basket Total
    const basketTotal = useSelector(selectBasketTotal)

    if (items.length === 0) {
      return null
    }

  return (
    <View className="absolute bottom-10 w-full z-50">
        <TouchableOpacity onPress={() => navigation.navigate("Basket")} className="bg-[#00ccbb] mx-5 p-4 rounded-lg flex-row items-center space-x-1">
            <Text className="text-white font-extrabold text-xl bg-[#01A296] py-1 px-2 rounded-md">{items.length}</Text>
            <Text className="flex-1 text-white font-extrabold text-lg text-center">View Basket</Text>
            <Text className="text-lg text-white font-extrabold">
                <Currency quantity={basketTotal} currency="GBP"/>
            </Text>
        </TouchableOpacity>
    </View>
  )
}

export default BasketIcon