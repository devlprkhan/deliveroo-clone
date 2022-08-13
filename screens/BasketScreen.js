import React, { useMemo, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import { selectBasketItems, removeFromBasket } from "../features/basketSlice";
import {XCircleIcon} from "react-native-heroicons/solid"
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter"


const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const dispatch = useDispatch();


  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

  // Optimization
  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems)
  }, [items]);

  // console.log(groupedItemsInBasket)

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00ccbb] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">{restaurant.title}</Text>
          </View>

          <TouchableOpacity
          onPress={navigation.goBack}
          className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color="#00ccbb" height={50} width={50}/>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
          source={{
            uri: "https://links.papareact.com/wru"
          }}
          className="h-9 w-9 bg-gray-300 rounded-full"
          />
          <Text className="flex-1">Deliver in 25-30 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00ccbb]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5">
              <Text className="text-[#00ccbb]">{items.length} x</Text>
              <Image 
              source={{uri: urlFor(items[0]?.image).url()}}
              className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">
                <Currency quantity={items[0]?.price} currency="GBP"/>
              </Text>

              <TouchableOpacity>
                <Text
                className="text-[#00bbcc] text-xs"
                onPress={() => dispatch(removeFromBasket({id: key}))}
                >
                  Remove
                  </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
