import { View, Text, Pressable, Alert } from "react-native";
import React from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useUser } from "../context/UserContext";
import { AntDesign } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import CreateListModal from "../components/CreateListModal";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function Lists({ navigation }) {
  const tabBarHeight = useBottomTabBarHeight();
  const { userLists, deleteList } = useUser();
  const bottomSheetRef = React.useRef(null);
  const snapPoints = React.useMemo(() => [220], []);
  return (
    <View className="flex-1 bg-black pt-4">
      <BottomSheet
        enablePanDownToClose
        index={-1}
        bottomInset={tabBarHeight}
        containerStyle={{ zIndex: 1 }}
        backgroundStyle={{ backgroundColor: "#212121" }}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
      >
        <CreateListModal />
      </BottomSheet>
      <ScrollView className="px-4">
        <TouchableHighlight
          onPress={() => bottomSheetRef.current.collapse()}
          className="bg-indigo-600 rounded-xl py-3 items-center mb-5"
        >
          <Text className="text-white font-semibold tracking-tight text-lg">
            Create list
          </Text>
        </TouchableHighlight>

        <FlatList
          data={userLists}
          keyExtractor={(item) => item.name}
          scrollEnabled={false}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => navigation.push("CustomList", { list: item })}
              className="bg-white/5 border-white/10 border rounded-xl p-4 overflow-hidden items-center flex-row justify-between"
            >
              <Text className="text-white font-semibold tracking-tight text-lg">
                {item.name}
              </Text>
              <AntDesign
                onPress={() =>
                  Alert.alert(
                    "Delete list",
                    "Are you sure you want to delete the list?",
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "Delete",
                        onPress: () => deleteList(item.id),
                        style: "destructive",
                      },
                    ]
                  )
                }
                style={{ opacity: 0.3, zIndex: 10 }}
                name="delete"
                size={20}
                color="white"
              />
            </Pressable>
          )}
        />
      </ScrollView>
    </View>
  );
}
