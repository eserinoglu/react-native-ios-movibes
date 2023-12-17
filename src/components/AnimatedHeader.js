import { View, Text, Animated } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../context/UserContext";

export default function AnimatedHeader({ data, scrollY }) {
  const { userFavorites, removeFromFavorites, addFavorite } = useUser();
  const isLiked = userFavorites.some((item) => item.movie_id === data.id);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 250],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 250],
    outputRange: [-150, 0],
    extrapolate: "clamp",
  });
  return (
    <Animated.View
      style={{
        opacity: headerOpacity,
        transform: [{ translateY: headerTranslateY }],
      }}
      className="absolute left-0 top-0 right-0 w-full z-20 flex-row"
    >
      <BlurView
        tint="dark"
        style={{ paddingTop: insets.top, paddingBottom: 16 }}
        intensity={100}
        className="flex-row items-center px-4 w-full justify-between h-full"
      >
        <View className="flex-row items-center w-4/5">
          <TouchableOpacity
            onPress={() => navigation.pop()}
            className="flex items-center justify-center mr-3"
          >
            <FontAwesome5 name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <Text
            numberOfLines={1}
            className="text-xl font-semibold tracking-tight text-white"
          >
            {data.title}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            isLiked
              ? removeFromFavorites(data.id)
              : addFavorite(data.id, data.poster_path)
          }
          className="w-9 aspect-square rounded-full bg-white flex items-center justify-center"
        >
          <AntDesign
            name={isLiked ? "heart" : "hearto"}
            size={22}
            color={"rgb(239 68 68)"}
          />
        </TouchableOpacity>
      </BlurView>
    </Animated.View>
  );
}
