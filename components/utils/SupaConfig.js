import * as SecureStore from 'expo-secure-store'
import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'


const ExpoSecureStoreAdapter ={
    getItem: (key) => {
        return SecureStore.getItemAsync(key);
    },
    setItem: (key,value) => {
        SecureStore.setItemAsync(key,value);
    },
    removeItem: (key) => {
        SecureStore.deleteItemAsync(key);
    },
}

const supabaseUrl = 'https://bvkgxylvuumrwwhgtiqz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2a2d4eWx2dXVtcnd3aGd0aXF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2Mzc1NDAsImV4cCI6MjAzMTIxMzU0MH0.-5-gOakcnw2PqwOdFulunOkBlLkOaXE3Nkon3rqScJc';

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth:{
        detectSessionInUrl: false,
        storage: ExpoSecureStoreAdapter,
    },
});