import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Dimensions } from "react-native";
import { BlurView } from "expo-blur";
import { useUser } from "../context/UserContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TopTab = createMaterialTopTabNavigator();

//Icons
import { Octicons, Entypo, FontAwesome, AntDesign } from "@expo/vector-icons";

//Screens
import Home from "../screens/Home";
import Explore from "../screens/Explore";
import Profile from "../screens/Profile";
import Lists from "../screens/Lists";
import MovieDetail from "../screens/MovieDetail";
import ProfileDetail from "../screens/ProfileDetail";
import Search from "../screens/Search";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import UserFavorites from "../screens/UserFavorites";
import UserWatchlist from "../screens/UserWatchlist";
import CustomList from "../screens/CustomList";
import Onboarding1 from "../screens/Onboarding1";
import Onboarding2 from "../screens/Onboarding2";
import Onboarding3 from "../screens/Onboarding3";
import Onboarding4 from "../screens/Onboarding4";

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);
  const checkIfFirstLaunch = async () => {
    try {
      const value = await AsyncStorage.getItem("onboardingShown");
      if (value === null) {
        AsyncStorage.setItem("onboardingShown", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    checkIfFirstLaunch();
  }, []);
  if (isFirstLaunch === null) {
    return null;
  }
  return (
    <Stack.Navigator
      initialRouteName={isFirstLaunch ? "Onboarding1" : "Login"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Onboarding1" component={Onboarding1} />
      <Stack.Screen name="Onboarding2" component={Onboarding2} />
      <Stack.Screen name="Onboarding3" component={Onboarding3} />
      <Stack.Screen name="Onboarding4" component={Onboarding4} />
    </Stack.Navigator>
  );
};
const CustomListStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ListView"
    >
      <Stack.Screen name="ListView" component={Lists} />
      <Stack.Screen name="CustomList" component={CustomList} />
    </Stack.Navigator>
  );
};
const ListStack = () => {
  const insets = useSafeAreaInsets();
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: insets.top,
          backgroundColor: "black",
        },
        tabBarIndicatorStyle: {
          backgroundColor: "rgb(79 70 229)",
        },
      }}
      initialRouteName="Favorites"
    >
      <TopTab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="heart"
              size={18}
              color={focused ? "rgb(79 70 229)" : "#777"}
            />
          ),
        }}
        name="Favorites"
        component={UserFavorites}
      />
      <TopTab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="eye"
              size={22}
              color={focused ? "rgb(79 70 229)" : "#777"}
            />
          ),
        }}
        name="Watchlist"
        component={UserWatchlist}
      />
      <TopTab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="list"
              size={22}
              color={focused ? "rgb(79 70 229)" : "#777"}
            />
          ),
        }}
        name="Lists"
        component={CustomListStack}
      />
    </TopTab.Navigator>
  );
};
const MainTab = () => {
  const { height } = Dimensions.get("screen");
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ffffff",
        tabBarStyle: {
          backgroundColor: "rgba(0,0,0,0.6)",
          borderTopWidth: 0,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          borderRadius: 15,
          height: height * 0.1,
          paddingTop: 10,
        },
        tabBarBackground: () => (
          <BlurView
            tint="dark"
            intensity={100}
            className="absolute bottom-0 right-0 left-0 top-0"
          />
        ),
      }}
      initialRouteName="Main"
    >
      <Tab.Screen
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, size }) => (
            <Octicons
              name="home"
              size={size}
              color={focused ? "#ffffff" : "#777"}
            />
          ),
        }}
        name="Main"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Entypo
              name="compass"
              size={size}
              color={focused ? "#ffffff" : "#777"}
            />
          ),
        }}
        name="Explore"
        component={Explore}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Lists",
          tabBarIcon: ({ focused, size }) => (
            <Entypo
              name="list"
              size={size}
              color={focused ? "#ffffff" : "#777"}
            />
          ),
        }}
        name="UserLists"
        component={ListStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, size }) => (
            <FontAwesome
              name="user-circle"
              size={size}
              color={focused ? "#ffffff" : "#777"}
            />
          ),
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default AppNavigation = () => {
  const { user } = useUser();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user ? (
          <>
            <Stack.Screen name="Home" component={MainTab} />
            <Stack.Screen name="MovieDetail" component={MovieDetail} />
            <Stack.Screen
              options={{
                presentation: "modal",
                headerShown: true,
                headerBackVisible: true,
                headerTransparent: true,
                headerBlurEffect: "systemUltraThinMaterialDark",
                headerTitleStyle: { color: "#ffffffc0" },
              }}
              name="ProfileDetail"
              component={ProfileDetail}
            />
            <Stack.Screen
              options={{
                animation: "fade",
              }}
              name="Search"
              component={Search}
            />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
