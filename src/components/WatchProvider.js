import { View, Text, ActivityIndicator, Image, Dimensions } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { FlatList } from "react-native-gesture-handler";

export default function WatchProvider({ id }) {
  const { width } = Dimensions.get("window");
  const fetchProviders = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmNkZWNmODNjZjg0ZmQ0ZGVhNDQ2NjhjNjYwMGFkOSIsInN1YiI6IjY0NzRiMTUzOWFlNjEzMDEyNTdjZGZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T69nKZl7FL8H4m3B3BKMh-J87Jku91-Ffb2ujM2jQew",
      },
    };

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/watch/providers`,
      options
    );
    const data = await res.json();
    return data.results.US;
  };
  const { data, isLoading } = useQuery(["providersData", id], fetchProviders);
  if (isLoading) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator color={"#ffffff"} size={"small"} />
      </View>
    );
  }
  return (
    <View className="px-4">
      {data && (
        <>
          <Text className="text-xl tracking-tight font-medium text-white/70 mb-2">
            Watch Providers
          </Text>
          <View className="w-full p-3 bg-white/5 border border-white/10 rounded-xl space-y-3">
            {data && data.buy && (
              <View className="w-full">
                <Text className="text-white/50 tracking-tight mb-2">
                  Buy or Rent
                </Text>
                <FlatList
                  horizontal
                  contentContainerStyle={{ gap: 6 }}
                  showsHorizontalScrollIndicator={false}
                  data={data.buy.slice(0, 6)}
                  keyExtractor={(item) => item.provider_id}
                  renderItem={({ item }) => {
                    return (
                      <Image
                        source={{
                          uri: `https://image.tmdb.org/t/p/original${item.logo_path}`,
                        }}
                        style={{ width: (width - 58) / 6 - 6 }}
                        className="aspect-square rounded-xl"
                      />
                    );
                  }}
                />
              </View>
            )}
            {data && data.flatrate && (
              <View className="w-full">
                <Text className="text-white/50 tracking-tight mb-2">
                  Stream
                </Text>
                <FlatList
                  horizontal
                  contentContainerStyle={{ gap: 6 }}
                  showsHorizontalScrollIndicator={false}
                  data={data.flatrate.slice(0, 6)}
                  keyExtractor={(item) => item.provider_id}
                  renderItem={({ item }) => {
                    return (
                      <Image
                        source={{
                          uri: `https://image.tmdb.org/t/p/original${item.logo_path}`,
                        }}
                        style={{ width: (width - 58) / 6 - 6 }}
                        className="aspect-square rounded-xl"
                      />
                    );
                  }}
                />
              </View>
            )}
          </View>
        </>
      )}
    </View>
  );
}
