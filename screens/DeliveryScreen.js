import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectRestaurant } from '../features/restaurantSlice'

const DeliveryScreen = () => {

    const navigation = useNavigation()
    const restaurant = useSelector(selectRestaurant)

  return (
    <View className="bg-[#00ccbb] flex-1">
      <SafeAreaView>
        <Text>dhshd</Text>
      </SafeAreaView>
    </View>
  )
}

export default DeliveryScreen