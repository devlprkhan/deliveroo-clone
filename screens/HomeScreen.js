import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { Text, View } from 'react-native'

export default function HomeScreen() {

  // Navigation Hook
  const navigation = useNavigation();

  useLayoutEffect(() =>{

  }, [])

  return (
    <View>
      <Text className='text-red-500 p-10'>HomeScreen</Text>
    </View>
  )
}