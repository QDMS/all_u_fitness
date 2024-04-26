import { View, Text, Image } from "react-native";
import React from "react";
import CategoryItems from "./CategoryItems";

const swapRight = require("./../../assets/gifs/right.gif");

const Category = () => {
    return (
        <View>
            <View className="flex-row items-center justify-between mx-10 mb-3">
                <Text style={{ color: "#B31D1D" }} className="text-xl font-bold ">
                    Categories
                </Text>
                <Image source={swapRight} style={{ width: 50, height: 20 }} />
            </View>
            <CategoryItems />
        </View>
    );
};

export default Category;
