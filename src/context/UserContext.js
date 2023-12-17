import React, { createContext, useEffect } from "react";
import supabase from "../supabase/supabase";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [userFavorites, setUserFavorites] = React.useState([]);
  const [userWatchlist, setUserWatchlist] = React.useState([]);
  const [userLists, setUserLists] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getUserFavorites = async (userId) => {
    let { data, error } = await supabase
      .from("user_favorites")
      .select("movie_id, poster_path")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) {
      console.log(error);
    }
    setUserFavorites(data);
  };
  const getUserWatchlist = async (userId) => {
    let { data, error } = await supabase
      .from("user_watchlist")
      .select("movie_id, poster_path")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) {
      console.log(error);
    }
    setUserWatchlist(data);
  };
  const addFavorite = async (movieId, posterPath) => {
    if (!user) return;
    setUserFavorites((prev) => [
      ...prev,
      { movie_id: movieId, poster_path: posterPath },
    ]);
    const { error } = await supabase
      .from("user_favorites")
      .insert([
        { user_id: user.id, movie_id: movieId, poster_path: posterPath },
      ]);
    if (error) {
      console.log(error);
    }
  };
  const removeFromFavorites = async (movieId) => {
    if (!user) return;
    setUserFavorites((prev) =>
      prev.filter((item) => item.movie_id !== movieId)
    );
    const { error } = await supabase
      .from("user_favorites")
      .delete()
      .eq("movie_id", movieId);
    if (error) {
      console.log(error);
    }
  };
  const addToWatchlist = async (movieId, posterPath) => {
    if (!user) return;
    setUserWatchlist((prev) => [
      ...prev,
      { movie_id: movieId, poster_path: posterPath },
    ]);
    const { error } = await supabase
      .from("user_watchlist")
      .insert([
        { user_id: user.id, movie_id: movieId, poster_path: posterPath },
      ]);
    if (error) {
      console.log(error);
    }
  };
  const removeFromWatchlist = async (movieId) => {
    if (!user) return;
    setUserWatchlist((prev) =>
      prev.filter((item) => item.movie_id !== movieId)
    );
    const { error } = await supabase
      .from("user_watchlist")
      .delete()
      .eq("movie_id", movieId);
    if (error) {
      console.log(error);
    }
  };
  const getUserLists = async (userId) => {
    const { data, error } = await supabase
      .from("user_lists")
      .select("name, id, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) {
      console.log(error);
    }
    setUserLists(data);
  };
  const addMovieToList = async (movieId, posterPath, listId) => {
    if (!user) return;
    const { error } = await supabase
      .from("list_movies")
      .insert([
        { list_id: listId, movie_id: movieId, poster_path: posterPath },
      ]);
    if (error) {
      console.log(error);
    }
  };
  const removeMovieFromList = async (movieId, listId) => {
    if (!user) return;
    const { error } = await supabase
      .from("list_movies")
      .delete()
      .eq("movie_id", movieId)
      .eq("list_id", listId);
    if (error) {
      console.log(error);
    }
  };
  const createList = async (listName) => {
    if (!user) return;
    const { data, error } = await supabase
      .from("user_lists")
      .insert([{ user_id: user.id, name: listName }])
      .select("name, id");
    if (error) {
      console.log(error);
    }
    setUserLists((prev) => [...prev, data[0]]);
  };
  const deleteList = async (listId) => {
    if (!user) return;
    const { error } = await supabase
      .from("user_lists")
      .delete()
      .eq("id", listId);
    if (error) {
      console.log(error);
    }
    setUserLists((prev) => prev.filter((item) => item.id !== listId));
  };

  useEffect(() => {
    if (user) {
      getUserFavorites(user.id);
      getUserWatchlist(user.id);
      getUserLists(user.id);
    }
  }, [user]);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
        setIsLoading(false);
      } else {
        setUser(null);
        setUserFavorites([]);
        setUserWatchlist([]);
        setUserLists([]);
        setIsLoading(false);
      }
    });
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        userFavorites,
        userWatchlist,
        addFavorite,
        removeFromFavorites,
        addToWatchlist,
        removeFromWatchlist,
        userLists,
        addMovieToList,
        createList,
        deleteList,
      }}
    >
      {isLoading ? (
        <View className="bg-black flex-1">
          <Text className="text-white">Loading</Text>
        </View>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
