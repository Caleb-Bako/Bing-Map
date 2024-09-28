import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import SearchOverlay from '../app/(screens)/PlacesPage';
import MapScreen from '@/app/(screens)/Map';

export default function BottomSection() {
  const [currentIndex, setCurrentIndex] = useState(0); 
    // ref
    const bottomSheetRef = useRef(null);
    // callbacks
    const handleSheetChanges = (index) => {
      setCurrentIndex(index);
      console.log('handleSheetChanges', index);
    };
    const snapPoints = ['15%','50%','90%'];
    // renders
    const renderBackdrop = (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={2}
      />
    );
    return (
      <View style={styles.container}>
        <MapScreen/>
        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          handleIndicatorStyle= {{backgroundColor:'#FFBF00'}}
        >
          <SearchOverlay currentIndex={currentIndex}/>
        </BottomSheet>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // padding: 24,
      // backgroundColor: 'grey',
    },
    contentContainer: {
      flex: 1,
    //   alignItems: 'center',
    },
  });