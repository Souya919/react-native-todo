import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { AntDesign } from "@expo/vector-icons";

export default function UpdateInput({ selectedItem, updateHandler }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(selectedItem.value);
  }, [selectedItem]);

  const onChangeText = (text) => {
    setValue(text);
  };

  const handleSubmit = () => {
    if (value) updateHandler(selectedItem.key, value);
  };

  return (
    <ComponentContainer>
      <InputContainer>
        <Input
          placeholder="Update Task..."
          value={value}
          onChangeText={onChangeText}
        />
      </InputContainer>
      <SubmitButton onPress={handleSubmit}>
        <AntDesign name="edit" size={24} color="midnightblue" />
      </SubmitButton>
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  flex-direction: row;
`;

const InputContainer = styled.View`
  flex-direction: row;
  border-radius: 10px;
`;

const Input = styled.TextInput`
  font-family: poppins-regular;
  font-size: 20px;
  background-color: white;
  width: 300px;
  margin-right: 20px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

const SubmitButton = styled.TouchableOpacity`
  width: 50px;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  margin-bottom: 20px;
  border-radius: 50px;
`;
