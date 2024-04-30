import { View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const backButton = require("../../assets/gifs/backButton.gif");

const BackButton = () => {
  const navigate = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigate.goBack()}
      className="absolute top-14 left-5"
    >
      {/* <Image
        source={backButton}
        style={{ width: 50 * 2, height: 50 * 2 }}
      /> */}
      <FontAwesome6 name="arrow-left" size={25} color="black" />
    </TouchableOpacity>
  );
};

export default BackButton;
