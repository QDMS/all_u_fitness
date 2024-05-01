import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "./../Components/BackButton";

const TimerScreen = () => {
  const [roundDuration, setRoundDuration] = useState(90);
  const [restDuration, setRestDuration] = useState(3);
  const [numberOfRounds, setNumberOfRounds] = useState(2);
  const [currentRound, setCurrentRound] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(roundDuration);
  const [isResting, setIsResting] = useState(false);

  const countDown = useRef(null);

  useEffect(() => {
    setTime(isResting ? restDuration : roundDuration);
  }, []);

  const startCountDown = () => {
    if (currentRound <= numberOfRounds) {
      setIsRunning(true);
      countDown.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(countDown.current);
            if (currentRound < numberOfRounds) {
              if (isResting) {
                setCurrentRound(currentRound + 1);
                setIsResting(false);
                return roundDuration;
              } else {
                setIsResting(true);
                return restDuration;
              }
            } else {
              setIsRunning(false);
              setIsResting(false);
              return 0;
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };

  const pauseCountDown = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(countDown.current);
    }
  };

  const resetCountDown = () => {
    setCurrentRound(1);
    setIsResting(false);
    setIsRunning(false);
    clearInterval(countDown.current);
    setTime(roundDuration);
  };

  useEffect(() => {
    if (currentRound === numberOfRounds && time === 0) {
      clearInterval(countDown.current);
      setIsResting(false);
      setIsRunning(false);
      setTime(0);
      return;
    }

    if (isRunning && time === 0) {
      if (currentRound < numberOfRounds) {
        if (isResting) {
          setCurrentRound(currentRound + 1);
          setIsResting(false);
          setTime(roundDuration);
        } else {
          setIsResting(true);
          setTime(restDuration);
        }
      } else {
        setIsRunning(false);
        setIsResting(false);
        setTime(0);
      }
    }
  }, [isRunning, time]);

  return (
    <View className="pt-[30%] items-center min-h-screen bg-gray-300">
      <Text className="text-5xl mb-4">
        {isRunning
          ? isResting
            ? "Resting"
            : `Round ${currentRound}`
          : currentRound === 1 && time === roundDuration
          ? "Start"
          : currentRound === numberOfRounds && time === 0
          ? "Finished"
          : "Paused"}
      </Text>
      <Text className="text-5xl">{`${
        Math.floor(time / 3600) > 0 ? Math.floor(time / 3600) + ":" : ""
      }${Math.floor((time % 3600) / 60)}:${time % 60 < 10 ? "0" : ""}${
        time % 60
      }`}</Text>
      <View className="flex-row mt-5">
        <TouchableOpacity
          onPress={startCountDown}
          disabled={isRunning || currentRound > numberOfRounds}
          className="mx-5 bg-white px-4 py-1 rounded-lg"
        >
          <Text className="text-lg text-green-500">START</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={pauseCountDown}
          disabled={!isRunning}
          className="mx-5 bg-white px-4 py-1 rounded-lg"
        >
          <Text className="text-lg text-red-500">PAUSE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          // disabled={isRunning || currentRound > numberOfRounds}
          onPress={resetCountDown}
          className="mx-5 bg-white px-4 py-1 rounded-lg"
        >
          <Text className="text-lg text-blue-500">RESET</Text>
        </TouchableOpacity>
      </View>
      <View className="mt-8">
        <Text className="text-xl text-slate-500 text-center">
          Round Duration (Seconds)
        </Text>
        <TextInput
          className="text-2xl text-neutral-950 text-center"
          value={roundDuration.toString()}
          onChangeText={(text) => setRoundDuration(parseInt(text) || 0)}
          keyboardType="numeric"
          returnKeyType="done"
          editable={!isRunning}
        />
        <Text className="text-xl text-slate-500 text-center">
          Rest Duration
        </Text>
        <TextInput
          className="text-2xl text-neutral-950 text-center "
          value={restDuration.toString()}
          onChangeText={(text) => setRestDuration(parseInt(text) || 0)}
          returnKeyType="done"
          keyboardType="numeric"
          editable={!isRunning}
        />
        <Text className="text-xl text-slate-500 text-center">
          Number Of Rounds
        </Text>
        <TextInput
          className="text-2xl text-neutral-950 text-center"
          value={numberOfRounds.toString()}
          onChangeText={(text) => setNumberOfRounds(parseInt(text) || 0)}
          returnKeyType="done"
          keyboardType="numeric"
          editable={!isRunning}
        />
      </View>
    </View>
  );
};

export default TimerScreen;
