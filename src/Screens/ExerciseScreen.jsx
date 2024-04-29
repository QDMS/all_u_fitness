import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "./../../Firebase/config";
import { Audio } from "expo-av";
import BackButton from "../Components/BackButton";

const countDownAudio = require("../../assets/audio/countdown.mp3");

const ExerciseScreen = () => {
  const route = useRoute();
  const { item } = route.params;
  const initialTime = 5;
  const minTime = 5;

  const [gifUrl, setGifUrl] = useState(null);
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [countDownSound, setCountDownSound] = useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(countDownAudio);
    setCountDownSound(sound);

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        setIsAudioPlaying(false);
      }
    });
    await sound.playAsync();
    setIsAudioPlaying(true);
  }

//   useEffect(() => {
//     return countDownSound
//       ? () => {
//           countDownSound.unloadAsync();
//         }
//       : undefined;
//   }, [countDownSound]);

  const fetchGifUrl = async () => {
    try {
      const storageRef = ref(storage, `AllExercises/${item.gif_url}`);
      const url = await getDownloadURL(storageRef);
      setGifUrl(url);
    } catch (error) {}
  };

  useEffect(() => {
    fetchGifUrl();
  }, []);

  const handleDecreaseTime = () => {
    if (!isRunning && time > minTime) {
      setTime((prevTime) => prevTime - 10);
    }
  };

  const handleIncreaseTime = () => {
    if (!isRunning) {
      setTime((prevTime) => prevTime + 10);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsFirstTime(true);
    setTime(initialTime);
    if (countDownSound && isAudioPlaying) {
      countDownSound.stopAsync();
      setIsAudioPlaying(false);
    }
  };

  useEffect(() => {
    let countDownInterval;
    if (isRunning && time > 0) {
      countDownInterval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
        if (time === 5) {
          playSound();
        }
      }, 1000);
    } else {
      setIsRunning(false);
      clearInterval(countDownInterval);
    }
    return () => {
      clearInterval(countDownInterval);
    };
  }, [isRunning, time]);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      if (isFirstTime) {
        setIsFirstTime(false);
      }
    } else {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    if (isRunning) {
        setIsRunning(false)
    }
  }

  return (
    <View className="flex 1">
      {gifUrl ? (
        <Image source={{ uri: gifUrl }} className="w-full h-80" />
      ) : (
        <View className="items-center justify-center w-full h-80">
          <ActivityIndicator size={"large"} color={"silver"} />
        </View>
      )}
      <BackButton />
      <ScrollView>
        <View className="mt-4 mx-3">
          <Text className="text-2xl font-bold text-center mb-1 capitalize">
            {item.title}
          </Text>
          <View className="flex-row">
            {item.category.split(", ").map((cat, index) => (
              <View key={index} className="mr-2">
                <View className="mr-2 bg-gray-300 rounded-2xl px-2 pb-1 pt-1">
                  <Text className="text-purple-500 text-center justify-center">
                    #{cat}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <View className="flex-row items-center space-x-2 mt-2">
            <Text className="font-semibold text-blue-600">Intensity:</Text>
            <Text className="text-orange-400 italic text-base">
              {item.intensity}
            </Text>
          </View>
          <Text className="text-xl font-semibold mt-4">Instructions:</Text>
          <View className="mt-2">
            {item.instructions.map((instruction) => (
              <View
                key={instruction.step}
                className="flex-row items-start mb-2"
              >
                <Text className="text-base text-gray-600 mb-4">
                  {instruction.step}.
                </Text>
                <Text className="ml-2 text-base ">{instruction.text}</Text>
              </View>
            ))}
          </View>
        </View>
        <View className="mt-4 flex-row items-center justify-center space-x-3">
          <TouchableOpacity
            onPress={handleDecreaseTime}
            className="border-2 border-red-500 rounded-full flex justify-center items-center w-14 h-14"
          >
            <Text className="text-red-500 text-lg text-center">-</Text>
          </TouchableOpacity>
          <Text className="text-xl font-bold">{time} Seconds</Text>
          <TouchableOpacity
            onPress={handleIncreaseTime}
            className="border-2 border-green-500 rounded-full flex justify-center items-center w-14 h-14"
          >
            <Text className="text-green-500 text-lg text-center">+</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-11 flex-row item-center justify-center mb-10 space-x-4">
          <TouchableOpacity
            onPress={isRunning ? handlePause : handleStart}
            disabled = {time === 0}
            className={`${
              isRunning ? "text-yellow-500" : "text-blue-500"
            } text-xl py-2 border ${
              isRunning ? "border-yellow-500" : "border-blue-500"
            } rounded-lg px-4`}
          >
            <Text
              className={`text-lg text-center ${
                isRunning ? "text-yellow-500" : "text-blue-500"
              }`}
            >
              {isRunning ? "PAUSE" : "START"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleReset}
            className="text-gray-500 text-xl py-2 border border-gray-500 rounded-lg px-4"
          >
            <Text className="text-gray-500 text-lg text-center">RESET</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ExerciseScreen;
