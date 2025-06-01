import 'react-native-get-random-values';
import { StyleSheet, Text, View } from 'react-native'
import {Slot, Stack} from 'expo-router'
import React from 'react'

import "../global.css";

const Rootlayout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" 
        options={{headerShown: false}}/>
        <Stack.Screen name="help"    
        options={{headerShown: false}}/>
        <Stack.Screen name="upload" 
        options={{ headerShown: false }} />
        <Stack.Screen name="clean" 
        options={{ headerShown: false }} />
        <Stack.Screen name="mismatched" 
        options={{ headerShown: false }} />
        <Stack.Screen name="checkNull" 
        options={{ headerShown: false }} />
        <Stack.Screen name="checkDuplicates" 
        options={{ headerShown: false }} />
        <Stack.Screen name="checkUnique" 
        options={{ headerShown: false }} />
    </Stack>
  )
}

export default Rootlayout

const styles = StyleSheet.create({})