import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { StatusBar } from "react-native";
import NowPlaying from "../components/NowPlaying";
import MoviesSlider from "../components/MoviesSlider";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function Home() {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <ScrollView
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        gap: 15,
        paddingBottom: tabBarHeight,
      }}
      className="flex-1 bg-black"
    >
      <StatusBar />
      <NowPlaying />
      <MoviesSlider name={"upcoming"} />
      <MoviesSlider name={"popular"} />
      <MoviesSlider name={"top_rated"} />
    </ScrollView>
  );
}
