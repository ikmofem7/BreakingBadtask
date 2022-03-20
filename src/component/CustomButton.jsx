import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";

const CustomButton = (props) => {
  const { title, pressAction } = props;
  return (
    <Pressable onPress={() => pressAction()} style={styles.button}>
      <Text style={{ color: "white" }}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3b6926",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});

export default CustomButton;
