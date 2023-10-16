import React, { useState, useEffect, useCallback } from "react";
import { View, StatusBar, FlatList, Text, Button } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import styled from "styled-components";
import AddInput from "./components/AddInput";
import TodoList from "./components/TodoList";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Empty from "./components/Empty";
import Header from "./components/Header";

SplashScreen.preventAutoHideAsync();

const getFonts = () =>
  Font.loadAsync({
    "poppins-regular": require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
    "poppins-bold": require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState([]);

  const handleAuthentication = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        // Authentication successful
        console.log("Authentication successful");
        setIsAuthenticated(true);
      } else {
        // Authentication failed
        console.log("Authentication failed");
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error while authenticating:", error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    async function prepare() {
      try {
        await getFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await handleAuthentication();
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const submitHandler = (value) => {
    setData((prevTodo) => {
      return [
        {
          value: value,
          key: Math.random().toString(),
        },
        ...prevTodo,
      ];
    });
  };

  const deleteItem = (key) => {
    setData((prevTodo) => {
      return prevTodo.filter((todo) => todo.key != key);
    });
  };

  if (!fontsLoaded || !isAuthenticated) {
    return (
      <ComponentContainer onLayout={onLayoutRootView}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Press the button to authenticate</Text>
          <Button title="Authenticate" onPress={handleAuthentication} />
        </View>
      </ComponentContainer>
    );
  }

  return (
    <ComponentContainer onLayout={onLayoutRootView}>
      <View>
        <StatusBar barStyle="light-content" backgroundColor="midnightblue" />
      </View>

      <View>
        <FlatList
          data={data}
          ListHeaderComponent={() => <Header />}
          ListEmptyComponent={() => <Empty />}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <TodoList item={item} deleteItem={deleteItem} />
          )}
        />
        <View>
          <AddInput submitHandler={submitHandler} />
        </View>
      </View>
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  background-color: midnightblue;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
