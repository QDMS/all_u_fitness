import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "./../../Firebase/config";
import { Audio } from "expo-av";
import BackButton from "../Components/BackButton";
import ExerciseData from "../../exercise_data.json";
import { FontAwesome6 } from "@expo/vector-icons";

const countDownAudio = require("../../assets/audio/countdown.mp3");

const CategoryExerciseScreen = () => {
  const route = useRoute();
  const { intensity } = route.params;
  const initialTime = 5;
  const minTime = 5;

  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [countDownSound, setCountDownSound] = useState();
  const [exercises, setExercises] = useState([]);
  const [categoryExercises, setCategoryExercises] = useState([]);
  const [exerciseIndex, setExerciseIndex] = useState(0);

  const scrollViewRef = useRef();

  const fetchExercisesByIntensity = async (intensity) => {
    const folderPath = `${intensity}Exercises`;
    const storageRef = ref(storage, folderPath);
    try {
      const matchingExercises = [];
      listAll(storageRef).then((res) => {
        res.items.forEach((item) => {
          const fileName = item.name.split("/").pop();
          const matchingExercise = ExerciseData.find(
            (exercise) => exercise.gif_url === fileName
          );
          if (matchingExercise) {
            matchingExercises.push(matchingExercise);
          }
        });
        setExercises(matchingExercises);
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchExercisesByIntensity(intensity);
  }, []);

  const fetchGifUrl = async (exercise) => {
    try {
      const storageRef = ref(
        storage,
        `${intensity}Exercises/${exercise.gif_url}`
      );
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.log("error = ", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchGifUrlsForExercises = async () => {
      const exerciseWithGifUrl = await Promise.all(
        exercises.map(async (exercise) => {
          const gifUrl = await fetchGifUrl(exercise);
          return {
            ...exercise,
            gif_url: gifUrl,
          };
        })
      );
      setCategoryExercises(exerciseWithGifUrl);
    };
    fetchGifUrlsForExercises();
  }, [exercises]);

  console.log("fetchGifUrlsForExercises = ", categoryExercises);

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
      setIsRunning(false);
    }
  };

  const currentExercise = categoryExercises[exerciseIndex];

  const navigateToNextExercise = () => {
    if (exerciseIndex < categoryExercises.length - 1) {
      setExerciseIndex(exerciseIndex + 1);
    }
  };

  const navigateToPrevExercise = () => {
    if (exerciseIndex > 0) {
      setExerciseIndex(exerciseIndex - 1);
    }
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [categoryExercises]);

  return (
    <View className="flex 1">
      {currentExercise ? (
        <>
          <Image
            source={{ uri: currentExercise.gif_url }}
            className="w-full h-80"
          />

          <BackButton />
          <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated: true})}
          >
            <View className="mt-2 mx-3">
              <Text className="text-2xl font-bold text-center mb-1 capitalize">
                {currentExercise.title}
              </Text>
              <View className="flex-row">
                {currentExercise.category.split(", ").map((cat, index) => (
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
                  {currentExercise.intensity}
                </Text>
              </View>
              <Text className="text-xl font-semibold mt-2">Instructions:</Text>
              <View className="mt-2">
                {currentExercise.instructions.map((instruction) => (
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
            <View className="mt-2.5 flex-row item-center justify-center mb-10 space-x-4">
              <TouchableOpacity
                onPress={navigateToPrevExercise}
                disabled={exerciseIndex === 0}
                className={`mt-1.5 right-3 ${
                  exerciseIndex === 0 ? "opacity-30" : ""
                }`}
              >
                <FontAwesome6 name="backward" size={35} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={isRunning ? handlePause : handleStart}
                disabled={time === 0}
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
              <TouchableOpacity
                onPress={navigateToNextExercise}
                disabled={exerciseIndex === categoryExercises.length - 1}
                className={`mt-1.5 left-3 ${
                  exerciseIndex === categoryExercises.length - 1
                    ? "opacity-30"
                    : ""
                }`}
              >
                <FontAwesome6 name="forward" size={35} color="black" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      ) : (
        <View className="items-center justify-center w-full h-80">
          <ActivityIndicator size={"large"} color={"silver"} />
        </View>
      )}
    </View>
  );
};

export default CategoryExerciseScreen;
