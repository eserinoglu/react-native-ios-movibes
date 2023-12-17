import { View, Text, Pressable } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import Slider from "@react-native-community/slider";

export default function SortAndFilter({
  sortBy,
  setSortBy,
  minYear,
  setMinYear,
  maxYear,
  minRating,
  setMinRating,
  maxRating,
}) {
  const sortingOptions = [
    { label: "Popularity high to low", value: "popularity.desc" },
    { label: "Date high to low", value: "primary_release_date.desc" },
    { label: "Rating high to low", value: "vote_average.desc" },
    { label: "Popularity low to high", value: "popularity.asc" },
    { label: "Date low to high", value: "primary_release_date.asc" },
    { label: "Rating low to high", value: "vote_average.asc" },
  ];
  return (
    <View className="space-y-4">
      <View className="flex-col space-y-3">
        <Text className="text-white/60 tracking-tight px-4">Sort by</Text>
        <FlatList
          data={sortingOptions}
          keyExtractor={(item) => item.value}
          horizontal
          contentContainerStyle={{ gap: 10 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => setSortBy(item.value)}
              className={`px-3 py-4 rounded-2xl ${
                sortBy === item.value ? "bg-indigo-600" : "bg-white/5"
              }`}
              style={{
                marginLeft: index === 0 ? 16 : 0,
                marginRight: index === sortingOptions.length - 1 ? 16 : 0,
              }}
            >
              <Text className="text-white/80">{item.label}</Text>
            </Pressable>
          )}
        />
      </View>
      <View className="flex-col space-y-3 px-4">
        <Text className="text-white/60 tracking-tight">Filter</Text>
        <View className="flex-col">
          <View className="flex-row items-center justify-between">
            <Text className="text-base tracking-tight font-medium text-white/70">
              Min. year
            </Text>
            <Text className="text-lg text-white tracking-tight font-semibold">
              {minYear}
            </Text>
          </View>
          <Slider
            step={1}
            onValueChange={(value) => setMinYear(value)}
            thumbTintColor="rgb(79 70 229)"
            minimumValue={1960}
            maximumValue={2023}
          />
        </View>
        <View className="flex-col">
          <View className="flex-row items-center justify-between">
            <Text className="text-base tracking-tight font-medium text-white/70">
              Min. rating
            </Text>
            <Text className="text-lg text-white tracking-tight font-semibold">
              {minRating}
            </Text>
          </View>
          <Slider
            onValueChange={(value) => setMinRating(value)}
            step={1}
            tapToSeek
            thumbTintColor="rgb(79 70 229)"
            minimumValue={2}
            maximumValue={9}
          />
        </View>
      </View>
    </View>
  );
}
