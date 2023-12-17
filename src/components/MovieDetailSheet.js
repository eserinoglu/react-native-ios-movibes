import { Pressable, View, Text } from "react-native";
import React from "react";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import CastView from "./CastView";
import { useNavigation } from "@react-navigation/native";
import WatchProvider from "./WatchProvider";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import CrewView from "./CrewView";
import SimilarMovies from "./SimilarMovies";
import { Ionicons, AntDesign } from "@expo/vector-icons";

export default function ListViewSheet({ movie }) {
  const navigation = useNavigation();
  const textHeight = useSharedValue(100);
  const [textExpanded, setTextExpanded] = React.useState(false);
  const handleText = () => {
    if (textExpanded) {
      textHeight.value = withTiming(100, { duration: 400 });
      setTextExpanded(false);
    } else {
      textHeight.value = withTiming(800, { duration: 400 });
      setTextExpanded(true);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <BottomSheetScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 20, paddingBottom: 40 }}
      >
        <View className="flex-row items-center justify-around w-full px-4">
          <View className="flex-col items-center">
            <AntDesign name="star" size={30} color="#F5D003" />
            <Text className="text-base font-semibold tracking-tight text-white">
              {movie.vote_average.toFixed(1)}
            </Text>
          </View>
          <View className="flex-col items-center opacity-60">
            <Ionicons name="time-outline" size={30} color="white" />
            <Text className="text-base font-semibold tracking-tight text-white">
              {movie.runtime} mins
            </Text>
          </View>
        </View>
        <Pressable className="px-4" onPress={handleText}>
          <Animated.Text
            style={{
              maxHeight: textHeight,
            }}
            className="text-white/80 tracking-tight text-base font-semibold"
          >
            {movie.overview}
          </Animated.Text>
        </Pressable>
        <CastView id={movie.id} navigation={navigation} />
        <WatchProvider id={movie.id} />
        <CrewView id={movie.id} />
        <SimilarMovies id={movie.id} navigation={navigation} />
      </BottomSheetScrollView>
    </View>
  );
}
