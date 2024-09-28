import React, { useContext, useState } from 'react';
import MapView ,{ Marker, PROVIDER_GOOGLE, Polyline }from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
// import { UserContextLocation } from './context/UserContextLocation';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyC11QpqKF149EHUjrMtoVt1AciIcG00cMg';

export default function MapScreen() {
//   const {location} = useContext(UserContextLocation);
  const [destination, setDestination] = useState(null);

  const handleMapPress = (e) => {
    setDestination(e.nativeEvent.coordinate);
  };

  return (
    <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} 
          style={styles.map}
          region={{
            latitude:8.9565,
            longitude: 7.6996,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          onPress={handleMapPress}
        >
          <Marker
            coordinate={{
              latitude:8.9565,
              longitude:7.6996
            }}
          />
          {destination && (
            <Marker
              coordinate={destination}
              title="Destination"
            />
          )}
          {destination && (
            <MapViewDirections
              origin={{ latitude: 8.9565, longitude: 7.6996}}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="blue"
            />
          )}
        </MapView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex:1
  },
  map: {
    height: "100%",
    width: "100%",
  },
 });
