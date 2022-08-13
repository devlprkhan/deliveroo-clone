import { Image, TouchableOpacity } from 'react-native'
import React from 'react'

const CategoryCard = ({imgUrl, title}) => {
  return (
    <TouchableOpacity className="relative mr-2">
      <Image 
      source={{
        uri: imgUrl
      }}
      className="h-20 w-20 rounded"
      />
    </TouchableOpacity>
  )
}

export default CategoryCard