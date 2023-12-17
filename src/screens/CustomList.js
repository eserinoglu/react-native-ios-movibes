import {
  View,
  Text,
  Image,
  Dimensions,
  RefreshControl,
  ActionSheetIOS,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import supabase from "../supabase/supabase";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import dayjs from "dayjs";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function CustomList({ route }) {
  const bottomTabBarHeight = useBottomTabBarHeight();
  const arr = [1, 2, 3, 4, 5, 6];
  const { width } = Dimensions.get("window");
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const list = route.params.list;
  const [movies, setMovies] = React.useState([]);
  const fetchListMovies = async () => {
    let { data, error } = await supabase
      .from("list_movies")
      .select("movie_id, poster_path")
      .eq("list_id", list.id)
      .order("created_at", { ascending: false });
    if (error) {
      console.log(error);
    }
    setMovies(data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchListMovies();
  }, [list]);
  return (
    <View className="flex-1 bg-black">
      <BlurView
        onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
        intensity={80}
        tint="dark"
        className="py-5 px-4 absolute top-0 right-0 left-0 z-10 space-y-1"
      >
        <Text className="text-2xl font-bold tracking-tight text-white">
          {list.name}
        </Text>
        <Text className="text-white/50 tracking-tight text-xs">
          Created at{" "}
          <Text className="font-semibold">
            {dayjs(list.created_at).format("MMMM DD, YYYY")}
          </Text>
        </Text>
      </BlurView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchListMovies} />
        }
        contentContainerStyle={{
          paddingTop: headerHeight,
          paddingBottom: bottomTabBarHeight + 20,
        }}
        className="flex-1 bg-black"
      >
        <View className="px-4 mt-5">
          {isLoading ? (
            <FlatList
              data={arr}
              keyExtractor={(item) => item}
              scrollEnabled={false}
              numColumns={3}
              key={3}
              contentContainerStyle={{ gap: 10 }}
              columnWrapperStyle={{ gap: 10 }}
              renderItem={({ item }) => {
                return (
                  <View
                    className="aspect-[2/3] rounded-xl bg-white/10 animate-pulse"
                    style={{ width: (width - 52) / 3 }}
                  ></View>
                );
              }}
            />
          ) : (
            <FlatList
              data={movies}
              keyExtractor={(item) => item.movie_id}
              scrollEnabled={false}
              numColumns={3}
              contentContainerStyle={{ gap: 10 }}
              columnWrapperStyle={{ gap: 10 }}
              key={3}
              renderItem={({ item }) => (
                <MoviePoster item={item} width={width} />
              )}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function MoviePoster({ width, item }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const navigation = useNavigation();
  const removeMovieFromList = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Remove from list"],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
        userInterfaceStyle: "dark",
        title: "Remove this movie from the list?",
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          console.log("remove");
        }
      }
    );
  return (
    <TouchableOpacity
      onLongPress={() => removeMovieFromList()}
      onPress={() => navigation.push("MovieDetail", { id: item.movie_id })}
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
