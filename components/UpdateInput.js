import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";

export default function UpdateInput({ selectedItem, updateItem }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    // Set the value state with the selected item's value whenever it changes
    setValue(selectedItem.value);
  }, [selectedItem]);

  // Updates the value state with the input text
  const updateValue = (val) => {
    setValue(val);
  };

  const updateItemOnSubmit = () => {
    // If a value exists, call the updateItem function with the selected item's key and the updated value
    if (value) updateItem(selectedItem.key, value);
  };

  return (
    <View style={styles.componentContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Update Task..."
          value={value}
          onChangeText={updateValue}
        />
      </View>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={updateItemOnSubmit}
      >
        <AntDesign name="edit" size={24} color="midnightblue" />
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
