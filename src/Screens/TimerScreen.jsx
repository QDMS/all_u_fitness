import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const TimerScreen = () => {
  const [roundDuration, setRoundDuration] = useState(60);
  const [restDuration, setRestDuration] = useState(3);
  const [numberOfRounds, setNumberOfRounds] = useState(2);
  const [currentRound, setCurrentRound] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(roundDuration);
  const [isResting, setIsResting] = useState(false);
  const [resetFlag, setResetFlag] = useState(false);

  useEffect(() => {
    setTime(isResting ? restDuration : roundDuration);
  }, [roundDuration, restDuration, isResting, resetFlag]);

  return (
    <SafeAreaView className="p-5">
      <Text>
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
      <Text>{`${
        Math.floor(time / 3600) > 0 ? Math.floor(time / 3600) + ":" : ""
      }${Math.floor((time % 3600) / 60)}:${time % 60 < 10 ? "0" : ""}${
        time % 60
      }`}</Text>
    </SafeAreaView>
  );
};

export default TimerScreen;
