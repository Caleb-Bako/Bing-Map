import { View, StyleSheet } from 'react-native';
import React from 'react';
import NavBar from '@/components/navigation/NavBar';
import BottomSection from '@/components/BottomSection';
import SearchOverlay from './PlacesPage';
import MapScreen from './Map';

export default function Home() {
  return (
    <View style={styles.container}>
      {/* Avatar and bell icon */}
      <NavBar />
      <View style={styles.mapContainer}>
        <MapScreen />
      </View>
      <BottomSection>
        <SearchOverlay />
      </BottomSection>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject, // Ensures MapScreen takes the full screen
    zIndex: -1, // Push the map behind other components
  },
});
