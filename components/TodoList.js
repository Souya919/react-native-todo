import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

export default function TodoList({ item, editItem, deleteItem }) {
  return (
    <View style={styles.componentContainer}>
      <TouchableOpacity style={styles.listContainer}>
        <View style={styles.circleContainer}>
          <Entypo name="circle" size={20} color="midnightblue" />
        </View>
        <View>
          <Text style={styles.textItem}>{item.value}</Text>
          <Text style={styles.textDate}> Task</Text>
        </View>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => editItem(item.key)}
        >
          <MaterialIcons name="edit" size={24} color="midnightblue" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => deleteItem(item.key)}
        >
          <MaterialIcons name="delete" size={24} color="midnightblue" />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  componentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: "auto",
    width: "auto",
  },
  listContainer: {
    backgroundColor: "whitesmoke",
    height: "auto",
    width: 350,
    marginBottom: 30,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textItem: {
    color: "black",
    width: 260,
    height: "auto",
    fontSize: 20,
    marginTop: 10,
    marginRight: 20,
    fontFamily: "poppins-regular",
  },
  textDate: {
    color: "goldenrod",
    fontSize: 15,
    marginRight: 20,
    fontFamily: "poppins-regular",
    borderRadius: 10,
    width: 40,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 0,
    marginTop: 15,
    height: 40,
    borderRadius: 10,
  },
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 5,
  },
};
