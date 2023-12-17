import { View, Text, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableHighlight } from "react-native-gesture-handler";
import image from "../../assets/onboarding3.jpeg";

export default function Onboarding3({ navigation }) {
  return (
    <View className="flex-1 justify-end">
      <Image
        resizeMethod="scale"
        source={image}
        className="absolute top-0 right-0 left-0 h-full w-full"
      />
      <LinearGradient
        colors={["transparent", "black"]}
        className="absolute bottom-0 right-0 left-0 w-full h-full"
      />
      <View className="p-5 pb-14">
        <Text className="text-white text-4xl font-bold tracking-tight mb-1">
          Favorites and watchlist
        </Text>
        <Text className="text-white/60 font-semibold tracking-tight text-base mb-4">
          Add films to your favorites and watchlist to keep track of what you
          want to watch and what you love.
        </Text>
        <TouchableHighlight
          onPress={() => navigation.replace("Onboarding4")}
          className="bg-indigo-600 rounded-2xl py-3 items-center"
        >
          <Text className="text-white font-bold tracking-tight text-xl">
            Continue
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}
