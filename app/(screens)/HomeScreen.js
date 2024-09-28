import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import NavBar from '@/components/navigation/NavBar';
import BottomSection from '@/components/BottomSection';
import MapScreen from './Map';



export default function Home(){
  return (
    <View style={styles.container}>
    {/* avatar and bell icon */}
       <NavBar/>
       <BottomSection/>
    </View>
     
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },
});