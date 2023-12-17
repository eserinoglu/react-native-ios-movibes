import { View, Text, Dimensions, Image } from "react-native";
import React from "react";
import {
  FlatList,
  ScrollView,
  TouchableHighlight,
} from "react-native-gesture-handler";
import { useUser } from "../context/UserContext";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";

export default function UserFavorites({ navigation }) {
  const tabBarHeight = useBottomTabBarHeight();
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const { width, height } = Dimensions.get("window");
  const { userFavorites } = useUser();
  return (
    <View className="flex-1 bg-black">
      <BlurView
        onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
        intensity={80}
        tint="dark"
        className="py-5 px-4 absolute top-0 right-0 left-0 z-10 space-y-1"
      >
        <Text className="text-2xl font-bold tracking-tight text-white">
          Favorites
        </Text>
      </BlurView>
      <ScrollView className="flex-1 bg-black px-4">
        {userFavorites.length > 0 ? (
          <FlatList
            className="mt-4"
            data={userFavorites.reverse()}
            keyExtractor={(item) => item.movie_id}
            numColumns={3}
            columnWrapperStyle={{ gap: 10 }}
            contentContainerStyle={{
              gap: 10,
              paddingBottom: tabBarHeight + 20,
              paddingTop: headerHeight,
            }}
            key={3}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableHighlight
                onPress={() =>
                  navigation.push("MovieDetail", { id: item.movie_id })
                }
                style={{ width: (width - 52) / 3 }}
                className="aspect-[2/3] rounded-xl overflow-hidden"
              >
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                  className="w-full h-full"
                />
              </TouchableHighlight>
            )}
          />
        ) : (
          <View
            style={{ height: height / 1.5 }}
            className="items-center justify-center h-full"
          >
            <Text className="text-2xl font-semibold tracking-tight text-white/50">
              Your favorites list is empty.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
