import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const dumbell = require("./../../assets/gifs/dumbell.gif");

const beginner = require("./../../assets/Images/beginner.jpg");
const balance = require("./../../assets/Images/balance.jpg");
const gentle = require("./../../assets/Images/gentle.jpg");
const intense = require("./../../assets/Images/intense.jpg");
const moderate = require("./../../assets/Images/moderate.jpg");
const strength = require("./../../assets/Images/strength.jpg");
const toning = require("./../../assets/Images/toning.jpg");

const workoutData = [
    { id: 1, imageSource: beginner, numberOfExercises: 7, title: 'Beginner' },
    { id: 2, imageSource: balance, numberOfExercises: 9, title: 'Balance' },
    { id: 3, imageSource: gentle, numberOfExercises: 5, title: 'Gentle' },
    { id: 4, imageSource: intense, numberOfExercises: 8, title: 'Intense' },
    { id: 5, imageSource: moderate, numberOfExercises: 23, title: 'Moderate' },
    { id: 6, imageSource: strength, numberOfExercises: 11, title: 'Strength' },
    { id: 7, imageSource: toning, numberOfExercises: 10, title: 'Toning' },
]

const CategoryItems = () => {

    const navigation = useNavigation();

    const handleExercisePress = (intensity) => {
        navigation.navigate('CategoryExercise', {intensity})
    }

    const renderWorkoutItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleExercisePress(item.title)}>
            <ImageBackground
                source={item.imageSource}
                className='h-36 w-40 rounded-2xl overflow-hidden mx-2 bg-red-900'
            >
                <View className="flex-1 justify-between m-3">
                    <View className="flex-row items-center space-x-1">
                        <Image
                            source={dumbell}
                            style={{ width: 15 * 2, height: 15 * 2 }}
                        />
                        <Text className="text-white font-bold tracking-widest">{item.numberOfExercises}</Text>
                    </View>
                    <Text className="text-white font-medium tracking-widest">
                        {item.title}
                    </Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )

    return (
        <View>
            <FlatList
                data={workoutData}
                renderItem={renderWorkoutItem}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default CategoryItems;
