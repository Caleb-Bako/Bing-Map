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

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth:{
        detectSessionInUrl: false,
        storage: ExpoSecureStoreAdapter,
    },
});