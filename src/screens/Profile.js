import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { useUser } from "../context/UserContext";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import supabase from "../supabase/supabase";

export default function Profile() {
  const insets = useSafeAreaInsets();
  const { user } = useUser();
  const [displayName, setDisplayName] = React.useState("");
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
  };
  const fetchUserData = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("display_name")
      .eq("id", user.id)
      .single();
    if (!error) {
      setDisplayName(data.display_name);
    }
  };
  React.useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <ScrollView className="bg-black flex-1">
      <View
        style={{ paddingTop: insets.top + 50 }}
        className="items-center space-y-3"
      >
        <Image
          className="w-20 aspect-square rounded-full"
          source={{
            uri: "https://southernplasticsurgery.com.au/wp-content/uploads/2013/10/user-placeholder.png",
          }}
        />
      </View>
      <View className="px-5 gap-3 mt-6">
        <View className="flex-row items-center justify-between">
          <View className="p-3 rounded-xl bg-white/5 border border-white/10 flex-row items-center space-x-2 w-full">
            <Text className="text-white/50 tracking-tight text-base">
              {displayName?.length > 0 && displayName}
            </Text>
          </View>
        </View>
        <View className="p-3 rounded-xl bg-white/5 border border-white/10 flex-row items-center space-x-2">
          <MaterialIcons name="email" size={24} color="#ffffff50" />
          <Text className="text-white/50 tracking-tight text-base">
            {user.email}
          </Text>
        </View>
        <View className="p-3 rounded-xl bg-white/5 border border-white/10 flex-row items-center space-x-2">
          <FontAwesome name="user-secret" size={24} color="#ffffff50" />
          <Text className="text-white/50 tracking-tight text-base">
            *********
          </Text>
        </View>
        <Pressable
          onPress={logout}
          className="rounded-xl p-3 items-center flex-row justify-center border border-white/20"
        >
          <Text className="font-medium tracking-tight text-base text-white/20">
            Logout
          </Text>
          <MaterialIcons name="logout" size={24} color="#ffffff25" />
        </Pressable>
      </View>
    </ScrollView>
  );
}
