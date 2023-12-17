import { View, Text, Image, Dimensions, ActivityIndicator } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function SimilarMovies({ id }) {
  const { width } = Dimensions.get("window");
  const fetchRecommendations = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmNkZWNmODNjZjg0ZmQ0ZGVhNDQ2NjhjNjYwMGFkOSIsInN1YiI6IjY0NzRiMTUzOWFlNjEzMDEyNTdjZGZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T69nKZl7FL8H4m3B3BKMh-J87Jku91-Ffb2ujM2jQew",
      },
    };
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`,
      options
    );
    const data = await res.json();
    return data.results.slice(0, 10).filter((item) => item.poster_path);
  };
  const { data, isLoading } = useQuery(
    ["similarMovies", id],
    fetchRecommendations
  );
  if (isLoading) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator color={"#ffffff"} size={"small"} />
      </View>
    );
  }
  return (
    <View className="flex-col gap-2">
      {data.length > 0 && (
        <>
          <Text className="text-xl tracking-tight font-medium text-white/70 mb-1 px-4">
            Recommendations
          </Text>
          <FlatList
            horizontal
            contentContainerStyle={{ gap: 6 }}
            showsHorizontalScrollIndicator={false}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => {
              return <MoviePoster width={width} item={item} index={index} />;
            }}
          />
        </>
      )}
    </View>
  );
}

function MoviePoster({ width, item, index }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.push("MovieDetail", { id: item.id })}
      style={{
        width: width * 0.25,
        marginLeft: index === 0 ? 16 : 0,
        marginRight: index === 9 ? 16 : 0,
      }}
      className="aspect-[2/3] rounded-xl overflow-hidden border border-white/20"
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
