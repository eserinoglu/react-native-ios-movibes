import { View, Text, Animated, Image, Dimensions } from "react-native";
import React from "react";
import { useInfiniteQuery } from "react-query";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import ExploreHeader from "../components/ExploreHeader";
import BottomSheet from "@gorhom/bottom-sheet";
import SortAndFilter from "../components/SortAndFilter";

export default function Explore() {
  const tabBarHeight = useBottomTabBarHeight();
  const { width, height } = Dimensions.get("window");
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef(null);
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [selectedGenre, setSelectedGenre] = React.useState(28);
  const [sortBy, setSortBy] = React.useState("popularity.desc");
  const [minYear, setMinYear] = React.useState(1960);
  const [maxYear, setMaxYear] = React.useState(2023);
  const [minRating, setMinRating] = React.useState(2);
  const [maxRating, setMaxRating] = React.useState(10);
  const fetchMovies = async ({ pageParam = 1 }) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmNkZWNmODNjZjg0ZmQ0ZGVhNDQ2NjhjNjYwMGFkOSIsInN1YiI6IjY0NzRiMTUzOWFlNjEzMDEyNTdjZGZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T69nKZl7FL8H4m3B3BKMh-J87Jku91-Ffb2ujM2jQew",
      },
    };

    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageParam}&sort_by=${sortBy}&with_genres=${selectedGenre}&vote_count.gte=200&primary_release_date.gte=${minYear}-01-01&vote_average.gte=${minRating}`,
      options
    );
    const data = await res.json();
    return data.results.filter((item) => item.poster_path);
  };

  const { data, isLoading, fetchNextPage } = useInfiniteQuery(
    ["movies", selectedGenre, sortBy, minYear, minRating],
    fetchMovies,
    {
      getNextPageParam: (lastPage, pages) => pages.length + 1,
    }
  );

  const bottomSheetRef = React.useRef(null);
  const snapPoints = ["55%"];

  React.useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      if (value > 0.8 * height) {
        fetchNextPage();
      }
    });
    return () => {
      scrollY.removeListener(listener);
    };
  }, [scrollY, fetchNextPage]);

  React.useEffect(() => {
    ref.current.scrollTo({
      y: 0,
      animated: true,
    });
  }, [selectedGenre, sortBy, minYear, maxYear]);
  return (
    <>
      <ExploreHeader
        onPress={() => bottomSheetRef.current.expand()}
        scrollY={scrollY}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
      <BottomSheet
        backgroundStyle={{ borderRadius: 30, backgroundColor: "#161616" }}
        enablePanDownToClose
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        containerStyle={{ zIndex: 1 }}
      >
        <SortAndFilter
          sortBy={sortBy}
          setSortBy={setSortBy}
          minYear={minYear}
          setMinYear={setMinYear}
          maxYear={maxYear}
          setMaxYear={setMaxYear}
          minRating={minRating}
          setMinRating={setMinRating}
          maxRating={maxRating}
          setMaxRating={setMaxRating}
        />
      </BottomSheet>
      <Animated.ScrollView
        ref={ref}
        className="bg-black"
        onScroll={onScroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 20, paddingTop: 280 }}
      >
        {isLoading ? (
          <FlatList
            className="px-4"
            contentContainerStyle={{
              gap: 10,
              paddingBottom: tabBarHeight + 20,
            }}
            columnWrapperStyle={{ gap: 10 }}
            data={arr}
            scrollEnabled={false}
            numColumns={3}
            key={3}
            keyExtractor={(index) => index}
            renderItem={({ item }) => (
              <View
                className="aspect-[2/3] rounded-xl bg-white/10 animate-pulse"
                style={{ width: (width - 52) / 3 }}
              ></View>
            )}
          />
        ) : (
          <FlatList
            className="px-4"
            contentContainerStyle={{ gap: 10 }}
            columnWrapperStyle={{ gap: 10 }}
            data={data.pages.flat()}
            scrollEnabled={false}
            numColumns={3}
            key={3}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MoviePoster item={item} width={width} />}
          />
        )}
      </Animated.ScrollView>
    </>
  );
}

function MoviePoster({ width, item }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const navigation = useNavigation();
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
