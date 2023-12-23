import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { TextInput, TouchableHighlight } from "react-native-gesture-handler";
import supabase from "../supabase/supabase";

export default function SignUp({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  const signup = async () => {
    const { data: authUser, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (!error) {
      const { error } = await supabase
        .from("users")
        .update({ display_name: name })
        .eq("id", authUser.user.id);
      if (error) {
        alert(error.message);
      }
    }
  };

  return (
    <View className="flex-1 bg-black">
      <Image
        source={{
          uri: "https://assets.mubicdn.net/images/artworks/636470/images-original.png?1696244029",
        }}
        className="absolute top-0 right-0 left-0 w-full h-3/5 opacity-30"
      />
      <View className="w-full h-1/2 justify-end p-5">
        <Text className="text-white tracking-tight font-bold text-4xl">
          Join us!
        </Text>
        <Text className="text-white/60 text-lg tracking-tight">
          Sign up to create your account.
        </Text>
      </View>
      <View className="absolute bottom-0 w-full right-0 left-0 bg-[#161616] h-[50%] rounded-tl-3xl rounded-tr-3xl z-10">
        <View className="flex-1 p-5 flex-col gap-3">
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            className="bg-white/5 p-3 rounded-xl text-white text-lg"
            placeholder="Your name"
          />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            className="bg-white/5 p-3 rounded-xl text-white text-lg"
            placeholder="E-mail"
          />
          <TextInput
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            className="bg-white/5 p-3 rounded-xl text-white text-lg"
            placeholder="Password"
          />
          <TouchableHighlight
            onPress={() => signup()}
            className="bg-indigo-600 rounded-xl py-3 items-center"
          >
            <Text className="text-white font-semibold tracking-tight text-lg">
              Sign Up
            </Text>
          </TouchableHighlight>
          <Pressable
            onPress={() => navigation.navigate("Login")}
            className="pt-5"
          >
            <Text className="text-white/50 text-center">
              Already have an account? Login.
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
