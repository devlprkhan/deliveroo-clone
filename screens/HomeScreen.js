import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, Image, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  UserIcon,
  ChevronDownIcon,
  SearchIcon,
  AdjustmentsIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";
import Banners from "../components/Banners";

export default function HomeScreen() {
  // useState Hook to get data from "sanity" and store into state
  const [featuredCategories, setFeaturedCategories] = useState([]);
  // useEffect Hook used to fetch data from "sanity" when the components loaded
  useEffect(() => {
    // Groq Query to get Data its Like (GraphQl)
    sanityClient
      .fetch(
        `
      *[_type == "featured"] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->
        }
      }
      `
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  // Navigation Hook
  const navigation = useNavigation();
  // Hide Navigation Header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  // console.log(featuredCategories)
  return (
    <SafeAreaView className="bg-white pt-5 pb-7">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-9 w-9 bg-gray-300 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Delivery . Now</Text>
          <View className="items-center flex-row">
            <Text className="font-bold text-xl pr-2">Current Location</Text>
            <ChevronDownIcon size={20} color="#00ccbb" />
          </View>
        </View>

        {/* User Icon */}
        <View className="bg-gray-100 p-2 rounded-full">
          <UserIcon size={25} color="#00ccbb" />
        </View>
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3 items-center rounded">
          <SearchIcon color="gray" size={20} />
          <TextInput
            placeholder="Restaurants and cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsIcon color="#00ccbb" className="rotate-45" />
      </View>

      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* Categories */}
        <Categories />
        {/* Offers Banner */}
        <Banners />
        
        {/* Populate Data in Component Coming From Sanity */}
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
