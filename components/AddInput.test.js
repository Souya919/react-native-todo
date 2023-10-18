import React from "react";
import renderer from "react-test-renderer";
import AddInput from "./AddInput";

// Mock the necessary dependencies
jest.mock("@expo/vector-icons", () => ({
  AntDesign: "AntDesign",
}));

describe("<AddInput />", () => {
  it("renders correctly", () => {
    // Define mock addItem function
    const addItem = jest.fn();

    // Render the AddInput component with the required prop
    const tree = renderer.create(<AddInput addItem={addItem} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
