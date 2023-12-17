import { View, Text, Image, ActivityIndicator } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

export default function CastView({ id, navigation }) {
  const fetchCast = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmNkZWNmODNjZjg0ZmQ0ZGVhNDQ2NjhjNjYwMGFkOSIsInN1YiI6IjY0NzRiMTUzOWFlNjEzMDEyNTdjZGZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T69nKZl7FL8H4m3B3BKMh-J87Jku91-Ffb2ujM2jQew",
      },
    };

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
      options
    );
    const data = await res.json();
    return data.cast;
  };
  const { data, isLoading } = useQuery(["castData", id], fetchCast);
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator color={"#ffffff"} />
      </View>
    );
  }
  return (
    <View className="flex-col gap-2">
      <Text className="text-xl tracking-tight font-medium text-white/70 px-4">
        Cast
      </Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
        horizontal
        data={data.slice(0, 20).filter((data) => data.profile_path !== null)}
        keyExtractor={(data) => data.id}
        renderItem={({ item, index }) => (
          <CastCard
            key={item.id}
            data={item}
            index={index}
            navigation={navigation}
          />
        )}
      />
    </View>
  );
}

function CastCard({ data, index, navigation }) {
  const [isImageLoading, setIsImageLoading] = React.useState(true);
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ProfileDetail", { id: data.id, name: data.name })
      }
      style={{
        marginLeft: index === 0 ? 16 : 0,
        marginRight: index === 19 ? 16 : 0,
      }}
      className="w-20 aspect-[2/3] rounded-xl overflow-hidden border border-white/20"
    >
      {isImageLoading && (
        <View className="w-full h-full bg-white/10 animate-pulse"></View>
      )}
      <Image
        className="w-full h-full"
        onLoadEnd={() => setIsImageLoading(false)}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${data.profile_path}`,
        }}
      />
    </TouchableOpacity>
  );
}
