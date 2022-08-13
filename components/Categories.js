import { ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import CategoryCard from "./CategoryCard";
import sanityClient, {urlFor}  from "../sanity";

const Categories = () => {
  // State to store data coming from "sanity"
  const [categories, setCategories] = useState([]);

  // useEffect Hook used to fetch data from "sanity" when the components loaded
  useEffect(() => {
    // Groq Query to get Data its Like (GraphQl)
    sanityClient
      .fetch(
        `
        *[_type == "category"]
      `
      )
      .then((data) => {
        setCategories(data);
      });
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
    >
      {/* CategoryCard */}
      {categories?.map((category) => (
        <CategoryCard
          key={category._id}
          imgUrl={urlFor(category.image).url()}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
