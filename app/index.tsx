import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);
  const route = useRouter();

  useEffect(()=>{
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(()=> ring1padding.value = withSpring(ring1padding.value+hp(5)), 100);
    setTimeout(()=> ring2padding.value = withSpring(ring2padding.value+hp(5.5)), 300);
    setTimeout(()=> route.navigate('/HomeScreen'),2500)
  },[])
  return (
    <View
    style={{ flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingVertical: 10, 
    backgroundColor: '#FFC107' }}
    >
      <StatusBar style='light'/>

      {/* Logo */}
      <Animated.View style={{
        padding: ring2padding,
        backgroundColor: 'rgba(255, 255, 255, 0.2)', 
        borderRadius: 9999, 
        }}>
        <Animated.View style={{
          padding: ring1padding,
          backgroundColor: 'rgba(255, 255, 255, 0.2)', 
          borderRadius: 9999, 
          }}>
          <Image source={require('../assets/images/Bingham_University_logo.png')}
          style={{width: hp(20), height:hp(20)}} />
        </Animated.View>
      </Animated.View>
      {/* Title */}
      <View
        style={{ flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'space-around', 
        marginTop: 2 }}
        >
        <Text style={{fontSize: hp(7),
          fontWeight: 'bold', 
          color: 'white', 
          letterSpacing: 2 }} 
          >
          BingMap
          </Text>
        <Text style={{fontSize: hp(2),
          fontWeight: '500', 
          color: 'white', 
          letterSpacing: 2,}}
          >
          Know where to Go
          </Text>
      </View>
    </View>
  )
} 