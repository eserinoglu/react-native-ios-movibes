import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import { FontAwesome5, AntDesign, Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { useUser } from "../context/UserContext";
import AddToList from "./AddToList";

export default function DetailHeader({ data, navigation }) {
  const {
    addFavorite,
    userFavorites,
    removeFromFavorites,
    userWatchlist,
    addToWatchlist,
    removeFromWatchlist,
  } = useUser();
  const { width } = Dimensions.get("window");
  const insets = useSafeAreaInsets();
  const isLiked = userFavorites.some((item) => item.movie_id === data.id);
  const isWatchlisted = userWatchlist.some((item) => item.movie_id === data.id);
  return (
    <View
      style={{ height: width * 1.58 }}
      className="justify-end flex-col w-full"
    >
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/original${data.poster_path}`,
        }}
        className="w-full h-full absolute top-0 right-0"
      />
      <View
        style={{ paddingTop: insets.top + 10 }}
        className="flex-row items-center justify-between z-10 px-4 w-full absolute top-0"
      >
        <TouchableOpacity onPress={() => navigation.pop()}>
          <FontAwesome5 name="chevron-circle-left" size={32} color="white" />
        </TouchableOpacity>
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
            size={18}
            color={"rgb(239 68 68)"}
          />
        </TouchableOpacity>
      </View>
      <LinearGradient
        colors={["transparent", "black"]}
        className="absolute right-0 w-full h-2/3"
      />
      <View className="z-10 px-4 space-y-2 pb-12">
        <View className="flex-row items-center space-x-2">
          <TouchableOpacity
            style={{ width: 40 }}
            onPress={() =>
              isWatchlisted
                ? removeFromWatchlist(data.id)
                : addToWatchlist(data.id, data.poster_path)
            }
            className="bg-white/30 aspect-square rounded-full justify-center items-center mb-2"
          >
            <Feather
              name={isWatchlisted ? "eye-off" : "eye"}
              size={20}
              color="white"
            />
          </TouchableOpacity>
          <AddToList movie={data} />
        </View>
        <Text className="font-medium text-white/60 tracking-tight text-lg">
          {data.release_date.split("-")[0]}
        </Text>
        <Text className="font-bold text-3xl tracking-tight text-white">
          {data.title}
        </Text>
      </View>
    </View>
  );
}
