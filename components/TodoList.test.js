import React from "react";
import renderer from "react-test-renderer";
import TodoList from "./TodoList";

// Mock the necessary dependencies
jest.mock("@expo/vector-icons", () => ({
  Entypo: "Entypo",
  MaterialIcons: "MaterialIcons",
}));

describe("<TodoList />", () => {
  it("renders correctly", () => {
    // Create a sample item object that matches the prop shape expected by TodoList
    const item = {
      key: "1",
      value: "Sample task",
    };

    // Define mock updateItem and deleteItem functions
    const updateItem = jest.fn();
    const deleteItem = jest.fn();

    // Render the TodoList component with the required props
    const tree = renderer
      .create(
        <TodoList item={item} updateItem={updateItem} deleteItem={deleteItem} />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
