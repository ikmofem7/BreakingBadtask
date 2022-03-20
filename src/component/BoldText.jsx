import React from "react";
import { Text } from "react-native";

const BoldText = (props) => {
  const { title } = props;
  return (
    <Text style={{ fontWeight: "bold", color: "black", fontSize: 16 }}>
      {title}
    </Text>
  );
};

export default BoldText;
