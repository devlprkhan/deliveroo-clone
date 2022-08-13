import { Image, TouchableOpacity } from 'react-native'
import React from 'react'

const BannerCrad = ({imgUrl}) => {
  return (
    <TouchableOpacity className="relative mr-2">
      <Image 
      source={{
        uri: imgUrl
      }}
      className="h-40 w-80 rounded"
      />
    </TouchableOpacity>
  )
}

export default BannerCrad