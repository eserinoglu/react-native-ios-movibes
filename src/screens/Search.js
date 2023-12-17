import { View, Text, Dimensions, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

export default function Search({ navigation }) {
  const { width, height } = Dimensions.get("window");
  const headerHeight = height * 0.23;
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const searchMovie = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmNkZWNmODNjZjg0ZmQ0ZGVhNDQ2NjhjNjYwMGFkOSIsInN1YiI6IjY0NzRiMTUzOWFlNjEzMDEyNTdjZGZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T69nKZl7FL8H4m3B3BKMh-J87Jku91-Ffb2ujM2jQew",
      },
    };
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchInput}&include_adult=false&language=en-US&page=1&sort_by=vote_count.desc`,
      options
    );
    const data = await res.json();
    setResults(data.results);
  };

  return (
    <>
      <BlurView
        intensity={70}
        tint="dark"
        style={{ height: headerHeight }}
        className="absolute top-0 right-0 left-0 w-full z-10"
      >
        <SafeAreaView className="px-4 flex-row items-center">
          <FontAwesome
            onPress={() => navigation.pop()}
            name="arrow-left"
            size={24}
            color="white"
          />
          <Text className="text-white text-3xl font-bold tracking-tight ml-3">
            Search
          </Text>
        </SafeAreaView>
        <View className="px-4">
          <TextInput
            autoFocus
            onChange={searchMovie}
            clearButtonMode="always"
            value={searchInput}
            onChangeText={(text) => setSearchInput(text)}
            className="bg-white/5 border border-white/10 rounded-xl p-3 text-white tracking-tight"
            placeholder="Search movies"
          />
        </View>
      </BlurView>
      <ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: headerHeight }}
        className="flex-1 bg-black"
      >
        <View className="px-4">
          <FlatList
            data={results.filter((item) => item.poster_path)}
            className="mt-5"
            keyExtractor={(item) => item.id}
            columnWrapperStyle={{ gap: 10 }}
            contentContainerStyle={{ gap: 10, paddingBottom: 100 }}
            scrollEnabled={false}
            numColumns={3}
            key={3}
            renderItem={({ item }) => {
              return (
                <MoviePoster
                  item={item}
                  width={width}
                  navigation={navigation}
                />
              );
            }}
          />
        </View>
      </ScrollView>
    </>
  );
}

function MoviePoster({ width, item, navigation }) {
  const [isLoading, setIsLoading] = React.useState(true);
  return (
    <TouchableOpacity
      onPress={() => navigation.push("MovieDetail", { id: item.id })}
      style={{
        width: (width - 52) / 3,
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
