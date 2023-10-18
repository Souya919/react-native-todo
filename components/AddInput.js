import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";

export default function AddInput({ addItem }) {
  const [value, setValue] = useState("");

  // Updates the value state with the input text
  const updateValue = (val) => {
    setValue(val);
  };

  // Adds the item to the data state when submit button is pressed
  const addItemOnSubmit = () => {
    if (value) addItem(value);
  };

  return (
    <View style={styles.componentContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add Task..."
          onChangeText={updateValue}
        />
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={addItemOnSubmit}>
        <AntDesign name="plus" size={24} color="midnightblue" />
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  componentContainer: {
    flexDirection: "row",
  },
  inputContainer: {
    flexDirection: "row",
    borderRadius: 10,
  },
  input: {
    fontFamily: "poppins-regular",
    fontSize: 20,
    backgroundColor: "white",
    width: 300,
    marginRight: 20,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  submitButton: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
    marginBottom: 20,
    borderRadius: 50,
  },
};
