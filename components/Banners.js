import { Image, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import sanityClient, { urlFor } from "../sanity";
import BannerCard from "./BannerCrad";

const Banners = () => {
  // State to store data coming from "sanity"
  const [banners, setBanners] = useState([]);

  // useEffect Hook used to fetch data from "sanity" when the components loaded
  useEffect(() => {
    // Groq Query to get Data its Like (GraphQl)
    sanityClient
      .fetch(
        `
        *[_type == "banner"]
      `
      )
      .then((data) => {
        setBanners(data);
      });
  }, []);
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 15,
      }}
    >
      {/* Banner Card */}
      {banners?.map((banner) => (
        <BannerCard key={banner._id} imgUrl={urlFor(banner.image).url()} />
      ))}
    </ScrollView>
  );
};

export default Banners;
