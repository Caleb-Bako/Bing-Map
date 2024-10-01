import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <Stack screenOptions={
        {
          headerShown:false,
        }
      }>
        <Stack.Screen name="HomeScreen"/>
        <Stack.Screen name="PlacesPage"/>
        <Stack.Screen name="Places"/>
        <Stack.Screen name="[placeId]"/>
        <Stack.Screen name="admin/Admin"/>
        <Stack.Screen name="admin/EventCreation"/>
      </Stack>
    </GestureHandlerRootView>
  );
}
