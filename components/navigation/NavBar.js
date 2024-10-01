import { View, Image, Pressable } from 'react-native';
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';

export default function NavBar() {
  const navBarStyles = {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribute icons evenly
    alignItems: 'center',
    padding: 10,
    paddingTop: 40,
    backgroundColor: '#f0f0f0',
  };
  const router = useRouter();
  return (
    <View style={navBarStyles}>
      <Pressable onPress={()=> router.navigate('/admin/Admin')}>
        <Image 
            source={require('../../assets/images/Avatar-Profile-PNG-Image-File.png')} 
            style={{height:hp(5), width:hp(5.5)}}
          />
      </Pressable>
        <FontAwesome name="bell-o" size={hp(3)} color="black" />
    </View>
  )
}