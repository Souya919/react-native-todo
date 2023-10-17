import React, { useState, useEffect, useCallback } from "react";
import { View, StatusBar, FlatList, Text, Button } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import styled from "styled-components";
import AddInput from "./components/AddInput";
import UpdateInput from "./components/UpdateInput";
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
  const [selectedItem, setSelectedItem] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Handle authentication using LocalAuthentication
  const handleAuthentication = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        // Authentication successful
        setIsAuthenticated(true);
      } else {
        // Authentication failed
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error while authenticating:", error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    // Load fonts, authenticate, hide splash screen
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
      if (!isAuthenticated) await handleAuthentication();
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isAuthenticated]);

  if (!fontsLoaded) {
    return null;
  }

  // Handler for submitting new data item
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

  // Handler for updating a data item
  const handleUpdate = (key, updatedValue) => {
    // Find the index of the item with the matching key
    const index = data.findIndex((item) => item.key === key);

    // Create a copy of the data array and update the value of the item at the found index
    const newData = [...data];
    newData[index].value = updatedValue;

    // Set the updated data array as the new state
    setData(newData);

    // Reset the selectedItem state variable and setIsUpdating to false
    setSelectedItem(null);
    setIsUpdating(false);
  };

  // Update the selectedItem state variable for editing
  const updateItem = (key) => {
    // Find the item with the matching key from the data array
    const selectedItem = data.find((item) => item.key === key);
    // Set the selectedItem state variable with the found item
    setSelectedItem(selectedItem);
    setIsUpdating(true);
  };

  // Delete a data item
  const deleteItem = (key) => {
    setData((prevTodo) => {
      return prevTodo.filter((todo) => todo.key != key);
    });
  };

  return (
    <ComponentContainer onLayout={onLayoutRootView}>
      <View>
        <StatusBar barStyle="light-content" backgroundColor="midnightblue" />
      </View>

      <View>
        {/* Displaying a list of data items */}
        <FlatList
          data={data}
          ListHeaderComponent={() => <Header />}
          ListEmptyComponent={() => <Empty />}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <TodoList
              item={item}
              updateItem={updateItem}
              deleteItem={deleteItem}
            />
          )}
        />
        <View>
          {/* Conditional rendering based on isUpdating state */}
          {isUpdating ? (
            <UpdateInput
              selectedItem={selectedItem}
              updateHandler={handleUpdate}
            />
          ) : (
            <AddInput submitHandler={submitHandler} />
          )}
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
