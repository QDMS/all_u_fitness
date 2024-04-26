import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import { Text, View } from "react-native";
import WorkoutScreen from "./src/Screens/WorkoutScreen.jsx";
import TimerScreen from "./src/Screens/TimerScreen";
import CalculationScreen from "./src/Screens/CalculationScreen";
import { Image } from "react-native"; // Import Image from react-native

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const dumbellsIcon = require("./assets/gifs/dumbells.gif");
const timerIcon = require("./assets/gifs/timer.gif");
const calculationIcon = require("./assets/gifs/calculate.gif");

export default function App() {
  function TabNavigator() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case "Workout":
                return (
                  <Image
                    source={dumbellsIcon}
                    style={{ width: size * 1.5, height: size * 1.5 }}
                  />
                );
              case "Timer":
                return (
                  <Image
                    source={timerIcon}
                    style={{ width: size * 1.5, height: size * 1.5 }}
                  />
                );
              case "Calculation":
                return (
                  <Image
                    source={calculationIcon}
                    style={{ width: size * 1.5, height: size * 1.5 }}
                  />
                );
            }
          },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "black",
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
            paddingVertical: 5,
          },
        })}
      >
        <Tab.Screen name="Workout" component={WorkoutScreen} />
        <Tab.Screen name="Timer" component={TimerScreen} />
        <Tab.Screen name="Calculation" component={CalculationScreen} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={TabNavigator} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
