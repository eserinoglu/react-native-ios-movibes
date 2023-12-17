import { View, Text, Image, Pressable, ActivityIndicator } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { useQuery } from "react-query";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../context/UserContext";

export default function NowPlaying() {
  const { user } = useUser();
  const [isImageLoading, setIsImageLoading] = React.useState(true);
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("screen");
  const fetchMovie = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmNkZWNmODNjZjg0ZmQ0ZGVhNDQ2NjhjNjYwMGFkOSIsInN1YiI6IjY0NzRiMTUzOWFlNjEzMDEyNTdjZGZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T69nKZl7FL8H4m3B3BKMh-J87Jku91-Ffb2ujM2jQew",
      },
    };

    const res = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      options
    );
    const data = await res.json();
    return data.results[0];
  };
  const { data, error, isLoading } = useQuery("nowPlaying", fetchMovie);
  if (isLoading)
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator color={"#ffffff"} size={"small"} />
      </View>
    );
  return (
    <Pressable
      onPress={() => navigation.navigate("MovieDetail", { id: data.id })}
      className="relative flex-row items-end justify-center"
      style={{
        width: width,
        height: height * 0.6,
      }}
    >
      {isImageLoading && (
        <View className="w-full h-full absolute top-0 right-0 bg-white/20 animate-pulse rounded-xl"></View>
      )}
      <Image
        onLoadEnd={() => setIsImageLoading(false)}
        className="absolute w-full h-full top-0 right-0"
        source={{
          uri: `https://image.tmdb.org/t/p/original${data.poster_path}`,
        }}
      />
      <View className="flex-col gap-4 p-4 z-10">
        <Text className="text-white text-3xl font-semibold tracking-tight">
          {data.title}
        </Text>
        <View className="p-1 rounded-xl bg-indigo-600 w-28 items-center">
          <Text className="text-white font-medium text-sm">Now Playing</Text>
        </View>
        <Text
          numberOfLines={3}
          className="text-white/60 tracking-tight text-sm"
        >
          {data.overview}
        </Text>
      </View>
      <LinearGradient
        className="absolute bottom-0 right-0 w-full h-full"
        colors={["transparent", "black"]}
        locations={[0, 0.9]}
      />
    </Pressable>
  );
}
