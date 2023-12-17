import { View, Text, ActionSheetIOS } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import { useUser } from "../context/UserContext";

export default function AddToList({ movie }) {
  const { userLists, addMovieToList } = useUser();
  const message =
    userLists.length > 0 ? "Select a list" : "You don't have any lists yet";
  const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", ...userLists.map((item) => item.name)],
        cancelButtonIndex: 0,
        userInterfaceStyle: "dark",
        message,
      },
      (buttonIndex) => {
        if (buttonIndex !== 0) {
          addMovieToList(
            movie.id,
            movie.poster_path,
            userLists[buttonIndex - 1].id
          );
        }
      }
    );
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ width: 40 }}
      className="bg-white/30 aspect-square rounded-full justify-center items-center mb-2 ml-1"
    >
      <Entypo name="add-to-list" size={22} color="white" />
    </TouchableOpacity>
  );
}
