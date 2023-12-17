import { View, Text, Animated, Dimensions, Button } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { useQuery } from "react-query";

export default function ExploreHeader({
  selectedGenre,
  setSelectedGenre,
  scrollY,
  onPress,
}) {
  const { height } = Dimensions.get("window");
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const maxHeaderHeight = 250 + 10;
  const minHeaderHeight = height * 0.23;

  const fetchGenres = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmNkZWNmODNjZjg0ZmQ0ZGVhNDQ2NjhjNjYwMGFkOSIsInN1YiI6IjY0NzRiMTUzOWFlNjEzMDEyNTdjZGZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T69nKZl7FL8H4m3B3BKMh-J87Jku91-Ffb2ujM2jQew",
      },
    };

    const res = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      options
    );
    const data = await res.json();
    return data.genres;
  };
  const { data, isLoading } = useQuery("genres", fetchGenres);

  const searchBarOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const genreBarTranslateY = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -70],
    extrapolate: "clamp",
  });
  const animatedHeaderHeight = scrollY.interpolate({
    inputRange: [0, maxHeaderHeight - minHeaderHeight],
    outputRange: [maxHeaderHeight, minHeaderHeight],
    extrapolate: "clamp",
  });
  return (
    <Animated.View
      className="flex-col absolute top-0 right-0 w-full left-0 z-10"
      style={{
        height: animatedHeaderHeight,
      }}
    >
      <BlurView
        tint="dark"
        intensity={80}
        style={{ paddingTop: insets.top + 20, gap: 20 }}
        className="absolute w-full h-full top-0 right-0"
      >
        <View className="px-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-3xl font-bold tracking-tight text-white">
              Explore
            </Text>
            <Button onPress={onPress} title="Sort and Filter" />
          </View>
        </View>
        <View className="px-4">
          <Animated.View style={{ opacity: searchBarOpacity }}>
            <TouchableOpacity
              onPress={() => navigation.push("Search")}
              className="w-full px-3 py-2 border border-white/10 bg-white/5 rounded-xl flex-row items-center"
            >
              <FontAwesome5 name="search" size={16} color="#ffffff50" />
              <Text className="text-[#ffffff60] tracking-tight text-base ml-2">
                Search movies
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <Animated.View
          style={{ transform: [{ translateY: genreBarTranslateY }] }}
        >
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            horizontal
            contentContainerStyle={{ gap: 10 }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <TouchableHighlight
                  onPress={() => setSelectedGenre(item.id)}
                  className="px-4 py-3 rounded-xl"
                  style={{
                    backgroundColor:
                      selectedGenre === item.id
                        ? "rgb(79 70 229)"
                        : "rgba(255, 255, 255, 0.1)",
                    opacity: selectedGenre === item.id ? 1 : 0.4,
                    marginLeft: index === 0 ? 16 : 0,
                    marginRight: index === data.length - 1 ? 16 : 0,
                  }}
                >
                  <Text className="text-white font-medium tracking-tight text-base">
                    {item.name}
                  </Text>
                </TouchableHighlight>
              );
            }}
          />
        </Animated.View>
      </BlurView>
    </Animated.View>
  );
}
