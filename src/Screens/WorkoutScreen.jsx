import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Welcome from '../Components/Welcome'
import WorkoutOTD from '../Components/WorkoutOTD'
import Separator from '../Components/Separator'
import Category from '../Components/Category'
import Exercise from '../Components/Exercise'
import { SafeAreaView } from 'react-native-safe-area-context'


const WorkoutScreen = () => {
  return (
    <SafeAreaView>
      <Welcome />
      <ScrollView>
        <WorkoutOTD />
        <Separator />
        <Category />
        <Separator />
        <Exercise />
      </ScrollView>
    </SafeAreaView>
  )
}

export default WorkoutScreen