import {
  View,
  ActivityIndicator,
  StatusBar,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import { useQuery } from "react-query";
import DetailHeader from "../components/DetailHeader";
import BottomSheet from "@gorhom/bottom-sheet";
import ListViewSheet from "../components/ListViewSheet";

export default function MovieDetail({ route, navigation }) {
  const { height, width } = Dimensions.get("window");
  const id = route.params.id;
  const fetchMovie = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmNkZWNmODNjZjg0ZmQ0ZGVhNDQ2NjhjNjYwMGFkOSIsInN1YiI6IjY0NzRiMTUzOWFlNjEzMDEyNTdjZGZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T69nKZl7FL8H4m3B3BKMh-J87Jku91-Ffb2ujM2jQew",
      },
    };

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      options
    );
    const data = await res.json();
    return data;
  };
  const { data, isLoading } = useQuery(["movieData", id], fetchMovie);

  const bottomSheetRef = React.useRef(null);
  const snapPoints = [height - width * 1.5, "80%"];

  if (isLoading)
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator color={"#ffffff"} />
      </View>
    );
  return (
    <View className="flex-1 bg-black">
      <BottomSheet
        backgroundStyle={{ borderRadius: 30, backgroundColor: "#161616" }}
        backgroundComponent={({ style }) => (
          <View style={[style, { backgroundColor: "black" }]}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w342${data.backdrop_path}`,
              }}
              className="absolute w-full h-full top-0 right-0 opacity-30"
              blurRadius={40}
              style={style}
            />
          </View>
        )}
        enableHandlePanningGesture={false}
        containerStyle={{
          zIndex: 11,
        }}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
      >
        <ListViewSheet movie={data} />
      </BottomSheet>
      <StatusBar />
      <DetailHeader data={data} navigation={navigation} />
    </View>
  );
}
