import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';

const NavigationBar = ({ onOpenSheet }) => {
  const router = useRouter();

  return (
    <View>
      <Animated.View entering={FadeIn.delay(200).duration(1000)}>
        <View style={styles.navarbar}>
          <TouchableOpacity
            style={styles.opacity_body}
            onPress={() => router.back()}
          >
            <Entypo name="chevron-left" size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
          </TouchableOpacity>

          {/* Trigger the onOpenSheet function to open BottomSheet */}
          <TouchableOpacity onPress={onOpenSheet}>
            <AntDesign name="pluscircle" size={hp(3.5)} color="#FFC107" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({
  navarbar: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribute icons evenly
    alignItems: 'center',
    padding: 10,
    paddingTop: 40,
    backgroundColor: '#f0f0f0',
  },
  opacity_body: {
    padding: 6,
    borderRadius: 50,
    marginLeft: 12,
    backgroundColor: 'white',
  },
});
