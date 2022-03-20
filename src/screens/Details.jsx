import React from "react";
import { Text, View, Image } from "react-native";
import BoldText from "../component/BoldText";
import Card from "../component/Card";
import CustomButton from "../component/CustomButton";

const Details = (props) => {
  const { route, navigation } = props;
  const { item } = route.params;
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
        padding: 20,
      }}
    >
      <Card>
        <Image
          source={{ uri: item.img }}
          style={{ width: 200, height: 200 }}
          resizeMethod="resize"
          resizeMode="center"
        />
      </Card>
      <Text style={{ textAlign: "center" }}>
        <BoldText title="Name:" /> {item.name}
      </Text>
      <Text style={{ textAlign: "center" }}>
        <BoldText title="Occupation:" /> {item.occupation.join(",")}
      </Text>
      <Text style={{ textAlign: "center" }}>
        <BoldText title="Status:" /> {item.status}
      </Text>
      <Text style={{ textAlign: "center" }}>
        <BoldText title="Nickname:" /> {item.nickname}
      </Text>
      <Text style={{ textAlign: "center" }}>
        <BoldText title="Season appearance:" /> {item.appearance.join(",")}
      </Text>
      <CustomButton title="Go Back" pressAction={() => navigation.goBack()} />
    </View>
  );
};

export default Details;
