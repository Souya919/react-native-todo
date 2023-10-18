import React from "react";
import renderer from "react-test-renderer";
import UpdateInput from "./UpdateInput";

// Mock the necessary dependencies
jest.mock("@expo/vector-icons", () => ({
  AntDesign: "AntDesign",
}));

describe("<UpdateInput />", () => {
  it("renders correctly", async () => {
    // Define mock updateItem function
    const updateItem = jest.fn();

    // Render the UpdateInput component with the required prop
    let tree;

    await renderer.act(async () => {
      tree = renderer.create(
        <UpdateInput
          selectedItem={{ key: "1", value: "Task" }}
          updateItem={updateItem}
        />
      );
    });

    expect(tree).toMatchSnapshot();
  });
});
