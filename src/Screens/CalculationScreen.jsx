import { View, Text } from "react-native";
import React, { useState } from "react";

const CalculationScreen = () => {
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [bmi, setBmi] = useState(null);
  const [weightUnit, setWeightUnit] = useState("kg");
  const [heightUnit, setHeightUnit] = useState("cm");

  const calculateBmi = () => {
    if (weight && height) {
      const weightKg =
        weightUnit === "kg" ? parseFloat(weight) : parseFloat(weight) / 2.20462;
      const heightM =
        heightUnit === "cm"
          ? parseFloat(height) / 100
          : parseFloat(height) * 0.0254;
      const bmiValue = weightKg / (heightM * heightM);
      setBmi(bmiValue.toFixed(2));
    } else {
      setBmi(null);
    }
  };

  const getBmiMeanings = () => {
    if (bmi !== null) {
      if (bmi < 18.5) {
        return {message: "You Are Underweight. Consider Consulting A Doctor Or An Nutritionist", color: 'yellow'}
      } else if (bmi < 24.9) {
        return {message: "Congratulation! You Are In A Healthy Weight Range", color: 'green'}
      } else if (bmi < 29.9) {
        return {message: "You Are Overweight. Consider Adopting A Healthy Diet", color: 'orange'}
      } else {
        return {message: "You Are Obese. Please Consider Consulting A Healthcare Professional", color: 'red'}
      }
    }
  }

  return (
    <View>
      <Text>Calculation Screen</Text>
    </View>
  );
};

export default CalculationScreen;
