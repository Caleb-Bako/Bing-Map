import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import NavigationBar from './NavigationBar';
import BottomSection from '@/components/BottomSection';
import EventCreation from './EventCreation';

const Admin = () => {
  // Create a ref for BottomSection
  const bottomSheetRef = useRef(null);

  return (
    <View style={{ flex: 1 }}>
      {/* Pass the openSheet function to NavigationBar */}
      <NavigationBar onOpenSheet={() => bottomSheetRef.current?.openSheet()} />
      
      <BottomSection ref={bottomSheetRef}>
        <EventCreation />
      </BottomSection>
    </View>
  );
};

export default Admin;

const styles = StyleSheet.create({});
