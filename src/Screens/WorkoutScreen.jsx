import { View, Text } from 'react-native'
import React from 'react'
import Welcome from '../Components/Welcome'
import WorkoutOTD from '../Components/WorkoutOTD'
import Separator from '../Components/Separator'
import Category from '../Components/Category'

const WorkoutScreen = () => {
  return (
    <View>
      <Welcome />
      <WorkoutOTD />
      <Separator />
      <Category />
      <Separator />
    </View>
  )
}

export default WorkoutScreen