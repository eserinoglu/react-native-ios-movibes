import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import {
  ScrollView,
  TextInput,
  TouchableHighlight,
} from "react-native-gesture-handler";
import supabase from "../supabase/supabase";

export default function Login({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = async () => {
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) console.log(error);
  };

  return (
    <View className="flex-1 bg-black">
      <Image
        source={{
          uri: "https://i.ytimg.com/vi/we_O2o8NJlI/maxresdefault.jpg",
        }}
        className="absolute top-0 right-0 left-0 w-full h-3/5 opacity-30"
      />
      <View className="w-full h-1/2 justify-end p-5">
        <Text className="text-white tracking-tight font-bold text-4xl">
          Welcome back!
        </Text>
        <Text className="text-white/60 text-lg tracking-tight">
          Sign in to your account to continue.
        </Text>
      </View>
      <View className="absolute bottom-0 w-full right-0 left-0 bg-[#161616] h-[50%] rounded-tl-3xl rounded-tr-3xl">
        <ScrollView className="flex-1 p-5 flex-col gap-3">
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
            onPress={() => login()}
            className="bg-indigo-600 rounded-xl py-3 items-center"
          >
            <Text className="text-white font-semibold tracking-tight text-lg">
              Login
            </Text>
          </TouchableHighlight>
          <Pressable
            onPress={() => navigation.navigate("SignUp")}
            className="pt-10"
          >
            <Text className="text-white/50 text-center">
              Don't you have an account? Sign up.
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
}
