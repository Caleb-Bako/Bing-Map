import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

// Use forwardRef to pass the handleOpenSheet function to the parent component
const BottomSection = forwardRef(({ children }, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // ref for BottomSheet
  const bottomSheetRef = useRef(null);

  // Function to handle the sheet changes
  const handleSheetChanges = (index) => {
    setCurrentIndex(index);
    console.log('handleSheetChanges', index);
  };

  // Snap points for the BottomSheet
  const snapPoints = ['15%', '50%', '90%'];

  // Function to open the BottomSheet
  const handleOpenSheet = () => bottomSheetRef.current?.expand();

  // Use useImperativeHandle to pass handleOpenSheet to the parent component
  useImperativeHandle(ref, () => ({
    openSheet: handleOpenSheet,
  }));

  // Renders backdrop component for BottomSheet
  const renderBackdrop = (props) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={0}
      appearsOnIndex={2}
    />
  );

  const renderChildren = React.cloneElement(children, { currentIndex });

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ backgroundColor: '#FFBF00' }}
      >
        {renderChildren}
      </BottomSheet>
    </View>
  );
});

export default BottomSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
