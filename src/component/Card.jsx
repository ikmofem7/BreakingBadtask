import React from "react";
import { View, StyleSheet } from "react-native";

const Card = (props) => {
  return <View style={styles.card}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
    padding: 10,
    backgroundColor: "white",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D7D7D7",
    margin: 10,
    borderRadius: 10,
  },
});

export default Card;
