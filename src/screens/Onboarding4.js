import { View, Text, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableHighlight } from "react-native-gesture-handler";
import image from "../../assets/onboarding4.jpeg";

export default function Onboarding4({ navigation }) {
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
          Your lists
        </Text>
        <Text className="text-white/60 font-semibold tracking-tight text-base mb-4">
          Create lists to organize your favorite films.
        </Text>
        <TouchableHighlight
          onPress={() => navigation.replace("SignUp")}
          className="bg-indigo-600 rounded-2xl py-3 items-center"
        >
          <Text className="text-white font-bold tracking-tight text-xl">
            Get started
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}
