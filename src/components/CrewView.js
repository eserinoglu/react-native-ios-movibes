import { View, Text, ActivityIndicator, Image } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { FlatList } from "react-native-gesture-handler";

export default function CrewView({ id }) {
  const fetchCrew = async () => {
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
    return data.crew;
  };
  const { data, isLoading } = useQuery(["crewData", id], fetchCrew);
  const director = data && data.find((data) => data.job === "Director");
  const screenplay = data && data.find((data) => data.job === "Screenplay");
  const producer = data && data.find((data) => data.job === "Producer");
  const editor = data && data.find((data) => data.job === "Editor");
  const crew = [
    {
      job: "Director",
      name: director && director.name,
      profile_path: director && director.profile_path,
    },
    {
      job: "Screenplay",
      name: screenplay && screenplay.name,
      profile_path: screenplay && screenplay.profile_path,
    },
    {
      job: "Producer",
      name: producer && producer.name,
      profile_path: producer && producer.profile_path,
    },
    {
      job: "Editor",
      name: editor && editor.name,
      profile_path: editor && editor.profile_path,
    },
  ];
  if (isLoading) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator color={"#ffffff"} />
      </View>
    );
  }
  return (
    <View className="px-4 flex-col gap-2">
      <Text className="text-xl tracking-tight font-medium text-white/70">
        Crew
      </Text>
      <View>
        <FlatList
          scrollEnabled={false}
          contentContainerStyle={{ gap: 10 }}
          data={crew.filter((data) => data.name)}
          keyExtractor={(item) => item.job}
          renderItem={({ item }) => <CrewCard data={item} />}
        />
      </View>
    </View>
  );
}

function CrewCard({ data }) {
  return (
    <View className="w-full border border-white/10 bg-white/5 p-3 rounded-xl flex-row items-center">
      <Image
        className="w-14 aspect-square rounded-full mr-2"
        source={{
          uri: data.profile_path
            ? `https://image.tmdb.org/t/p/w500${data.profile_path}`
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhGHdcalX0wUWxZQCiSv8WzmSPpFGHr4jlsw&usqp=CAU",
        }}
      />
      <View>
        <Text className="text-white/40 tracking-tight">{data.job}</Text>
        <Text className="text-white/70 tracking-tight text-lg font-medium">
          {data.name}
        </Text>
      </View>
    </View>
  );
}
