import { View, Text, Image } from 'react-native'
import React from 'react'
import ExerciseItems from './ExerciseItems'

const swapDown = require("./../../assets/gifs/down.gif");

const Exercise = () => {
  return (
    <View>
      <View className="flex-row items-center justify-between mx-10 mb-3">
                <Text style={{ color: "#B31D1D" }} className="text-xl font-bold ">
                    Exercises
                </Text>
                <Image source={swapDown} style={{ width: 50, height: 70 }} />
            </View>
            <ExerciseItems />
    </View>
  )
}

export default Exercise