import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import WorkoutOTD from "./WorkoutOTD";
import Separator from "./Separator";

const welcomeGif = require("../../assets/gifs/Welcome.gif");

const Welcome = () => {
  const [fontsLoaded, fontError] = useFonts({
    Rockridge: require("./../../assets/fonts/Rockridge.otf"),
    Wickfield: require("./../../assets/fonts/Wickfield.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View>
      <Text
        style={{
          fontFamily: "Rockridge",
          fontSize: 30,
          textAlign: "center",
          color: "#B31D1D",
        }}
      >
        All-U Fitness
      </Text>
      <Image
        source={welcomeGif}
        style={{ width: 50 * 2, height: 50 * 2, alignSelf: "center" }}
      />
      
    </View>
  );
};

export default Welcome;
