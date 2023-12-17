import { View, Text, Image } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function MoviesSlider({ name }) {
  const fetchMovies = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmNkZWNmODNjZjg0ZmQ0ZGVhNDQ2NjhjNjYwMGFkOSIsInN1YiI6IjY0NzRiMTUzOWFlNjEzMDEyNTdjZGZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T69nKZl7FL8H4m3B3BKMh-J87Jku91-Ffb2ujM2jQew",
      },
    };

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${name}?language=en-US&page=1`,
      options
    );
    const data = await res.json();
    return data.results;
  };
  const { width } = Dimensions.get("window");
  const { data, isLoading } = useQuery(name, fetchMovies);
  return (
    <View
      style={{
        marginBottom: name === "top_rated" ? 20 : 0,
      }}
      className="gap-4"
    >
      <Text className="text-white font-medium text-xl tracking-tight px-5">
        {name === "top_rated"
          ? "Top Rated"
          : name.charAt(0).toUpperCase() + name.slice(1)}
      </Text>
      <FlatList
        data={data}
        horizontal
        contentContainerStyle={{ gap: 14 }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(data) => data.id}
        renderItem={({ item, index }) => {
          return <MoviePoster width={width} item={item} index={index} />;
        }}
      />
    </View>
  );
}

function MoviePoster({ width, item, index }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("MovieDetail", { id: item.id })}
      style={{
        width: width * 0.25,
        marginLeft: index === 0 ? 20 : 0,
        marginRight: index === 9 ? 20 : 0,
      }}
      className="aspect-[2/3] rounded-xl overflow-hidden"
    >
      {isLoading && (
        <View className="w-full h-full bg-white/10 animate-pulse rounded-xl"></View>
      )}
      <Image
        onLoadEnd={() => setIsLoading(false)}
        className="w-full h-full"
        source={{
          uri: `https://image.tmdb.org/t/p/w342${item.poster_path}`,
        }}
      />
    </TouchableOpacity>
  );
}
