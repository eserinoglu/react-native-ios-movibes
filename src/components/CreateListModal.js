import { Text } from "react-native";
import React from "react";
import { TouchableHighlight } from "react-native-gesture-handler";
import {
  BottomSheetTextInput,
  BottomSheetView,
  useBottomSheet,
} from "@gorhom/bottom-sheet";
import { useUser } from "../context/UserContext";

export default function CreateListModal() {
  const { close } = useBottomSheet();
  const { createList } = useUser();
  const [listName, setListName] = React.useState("");
  return (
    <BottomSheetView style={{ paddingHorizontal: 16, rowGap: 14 }}>
      <Text className="text-white font-semibold tracking-tight text-2xl">
        Create list
      </Text>
      <BottomSheetTextInput
        value={listName}
        onChangeText={(text) => setListName(text)}
        placeholder="List name"
        style={{
          backgroundColor: "#ffffff10",
          color: "#ffffff",
          borderRadius: 10,
          paddingHorizontal: 16,
          paddingVertical: 12,
          fontSize: 16,
        }}
        placeholderTextColor={"#ffffff50"}
      />
      <TouchableHighlight
        onPress={() => {
          createList(listName);
          setListName("");
          close();
        }}
        className="items-center py-3 rounded-xl bg-indigo-600"
      >
        <Text className="text-white font-semibold tracking-tight text-lg">
          Create
        </Text>
      </TouchableHighlight>
    </BottomSheetView>
  );
}
