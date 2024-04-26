import React, { useRef, useLayoutEffect } from 'react';
import { View, Animated, useWindowDimensions } from 'react-native';

const Separator = () => {
    const translateX = useRef(new Animated.Value(0)).current;
    const screenWidth = useWindowDimensions().width;

    useLayoutEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(translateX, {
                    toValue: screenWidth - 30, // Adjusted for margin (assuming a 10 unit margin on both sides)
                    duration: 5000, // Adjust this value to control the speed of movement
                    useNativeDriver: false,
                }),
                Animated.timing(translateX, {
                    toValue: 0,
                    duration: 5000,
                    useNativeDriver: false,
                }),
            ]),
        ).start();
    }, [screenWidth]);

    return (
        <View className="my-7" style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Animated.View
                style={{
                    height: 1, // Border height
                    backgroundColor: 'red', // Border color
                    width: 30, // Border width
                    transform: [{ translateX }],
                }}
            />
        </View>
    );
};

export default Separator;
