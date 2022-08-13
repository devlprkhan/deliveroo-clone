import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import sanityClient, {urlFor} from "../sanity";

const FeaturedRow = ({ id, title, description }) => {
  // State to store data coming from "sanity"
  const [restaurants, setRestaurants] = useState([]);

  // useEffect Hook used to fetch data from "sanity" when the components loaded
  useEffect(
    () => {
      // Groq Query to get Data its Like (GraphQl)
      // Error Exists Here to set remover [0] zero from array
      sanityClient
        .fetch(
          `
        *[_type == "featured" && _id == $id] {
          ...,
          restaurants[]->{
            ...,
            dishes[]->,
            type-> {
              name
            }
          },
        }[0]
      `,
          { id }
        ).then((data) => {
          setRestaurants(data?.restaurants);
        });
        
    }, []);

  return (
    <View>
      <View className="flex-row mt-4 items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon size={25} color="#00ccbb" />
      </View>
      <Text className="text-gray-500 text-xs px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* Reastaurant Cards */}
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={urlFor(restaurant.image).url()}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type?.name}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
