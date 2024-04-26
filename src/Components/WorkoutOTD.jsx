import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font'


const otdImage = require("./../../assets/Images/workoutotd.jpg")

const WorkoutOTD = () => {

  const [fontsLoaded, fontError] = useFonts({
    Rockridge: require("./../../assets/fonts/Rockridge.otf"),
    Wickfield: require("./../../assets/fonts/Wickfield.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableOpacity className="items-center justify-center">
      <View className="rounded-3xl overflow-hidden h-40 w-[80%]">
        <ImageBackground
        source={otdImage}
        className="flex-1 justify-center items-center"
        resizeMode='cover'
        >
            <View>
                <Text style={{ fontFamily: "Wickfield", color: 'rgba(179, 29, 29, 0.80)' }} className=" text-4xl tracking-tight">Workout Of The Day</Text>
            </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  )
}

export default WorkoutOTD