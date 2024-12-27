import { StyleSheet, Text, View } from 'react-native'
import {Slot, Stack} from 'expo-router'
import React from 'react'

import "../global.css";

const Rootlayout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" 
        options={{headerShown: false}}/>
        <Stack.Screen name="explore" 
        options={{headerShown: false}}/>
    </Stack>
  )
}

export default Rootlayout

const styles = StyleSheet.create({})