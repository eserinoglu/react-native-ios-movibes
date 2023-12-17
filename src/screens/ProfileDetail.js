import { View, Text, ActivityIndicator, Dimensions, Image } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import {
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";

export default function ProfileDetail({ route }) {
  const navigation = useNavigation();
  const { height, width } = Dimensions.get("screen");
  const id = route.params.id;
  const name = route.params.name;
  React.useLayoutEffect(() => {
    navigation.setOptions({ title: name });
  }, [navigation]);
  const fetchProfileData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmNkZWNmODNjZjg0ZmQ0ZGVhNDQ2NjhjNjYwMGFkOSIsInN1YiI6IjY0NzRiMTUzOWFlNjEzMDEyNTdjZGZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T69nKZl7FL8H4m3B3BKMh-J87Jku91-Ffb2ujM2jQew",
      },
    };

    const res = await fetch(
      `https://api.themoviedb.org/3/person/${id}?language=en-US`,
      options
    );
    const data = await res.json();
    return data;
  };
  const fetchFilmography = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmNkZWNmODNjZjg0ZmQ0ZGVhNDQ2NjhjNjYwMGFkOSIsInN1YiI6IjY0NzRiMTUzOWFlNjEzMDEyNTdjZGZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T69nKZl7FL8H4m3B3BKMh-J87Jku91-Ffb2ujM2jQew",
      },
    };

    const res = await fetch(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?language=en-US`,
      options
    );
    const data = await res.json();
    return data.cast;
  };
  const { data, isLoading } = useQuery(["profileData", id], fetchProfileData);
  const { data: filmography, isLoading: isLoadingFilmography } = useQuery(
    ["filmographyData", id],
    fetchFilmography
  );
  if (isLoading || isLoadingFilmography) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator color={"#ffffff"} />
      </View>
    );
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      className="bg-black flex-1"
    >
      <View
        style={{ height: height * 0.6 }}
        className="relative flex-col justify-end"
      >
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/original${data.profile_path}`,
          }}
          className="w-full h-full object-cover absolute top-0 right-0"
        />
        <LinearGradient
          colors={["transparent", "black"]}
          className="absolute bottom-0 right-0 w-full  h-full"
        />
        <Text className="text-white font-bold tracking-tight text-4xl px-4">
          {data.name}
        </Text>
        <View className="flex-row items-center px-4 gap-2 mt-0 opacity-50">
          <FontAwesome5 name="birthday-cake" size={14} color="white" />
          <Text className="text-white">
            {dayjs(data.birthday).format("MMMM DD, YYYY")}
          </Text>
        </View>
      </View>
      <View className="px-4 flex-col mt-8 mb-20">
        <Text className="text-white/60 font-semibold tracking-tight text-xl mb-6">
          Filmography
        </Text>
        <FlatList
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ gap: 10 }}
          data={filmography.filter((data) => data.poster_path !== null)}
          keyExtractor={(item) => item.id}
          numColumns={3}
          key={3}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <MovieCard item={item} navigation={navigation} width={width} />
          )}
        />
      </View>
    </ScrollView>
  );
}

function MovieCard({ item, navigation, width }) {
  const [isImageLoading, setIsImageLoading] = React.useState(true);
  return (
    <TouchableOpacity
      key={item.id}
      className="rounded-xl overflow-hidden"
      onPress={() => navigation.replace("MovieDetail", { id: item.id })}
      style={{ width: width / 3 - 20, aspectRatio: 2 / 3 }}
    >
      {isImageLoading && (
        <View className="w-full h-full bg-white/10 animate-pulse"></View>
      )}
      <Image
        className="w-full h-full"
        onLoadEnd={() => setIsImageLoading(false)}
        source={{
          uri: `https://image.tmdb.org/t/p/w342${item.poster_path}`,
        }}
      />
    </TouchableOpacity>
  );
}
