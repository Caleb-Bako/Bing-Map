import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Spinner from 'react-native-loading-spinner-overlay';
import ImageItem from '@/components/ImageItem';
import { supabase } from '@/components/utils/SupaConfig';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

export default function SearchResults({ activeCategory }) {
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('places')
        .select('*')
        .eq('category', activeCategory);

      if (data) {
        const uniqueProfiles = data.filter((profile, index, self) =>
          index === self.findIndex(p => p.id === profile.id)
        );
        setProfiles(uniqueProfiles);
      }
    };
    fetchData();
  }, [activeCategory]);

  useEffect(() => {
    const loadImages = async () => {
      const { data, error } = await supabase.storage.from('files').list('general');
      if (data && !error) {
        setFiles(data);
      } else {
        console.error('Error loading images:', error);
      }
    };

    loadImages();
  }, []);

  // Combine files with profiles based on matching criteria
  const combinedData = files.map((file, index) => {
    const matchedProfile = profiles.find(profile => profile.imageUrl === file.name); // Adjust to your matching criteria
    return {
      ...file,
      profileName: matchedProfile ? matchedProfile.name : 'Unknown', // Add profile name or fallback to 'Unknown'
    };
  });

  return (
    <View className="mx-4 mt-4 space-y-3">
      <Text style={{ fontSize: hp(3) }} className="font-semibold text-neutral-600">
        Results
      </Text>
      <View>
        {files.length === 0 ? (
          <Spinner visible={loading} />
        ) : (
          <MasonryList
            data={combinedData}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => (
              <LocationCard item={item} i={i} activeCategory={activeCategory} />
            )}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
}

const LocationCard = ({ item, i }) => {
  const isEven = i % 2 === 0;
  const router = useRouter();
  return (
    <View>
      <Animated.View entering={FadeInDown.delay(i * 100).duration(600).springify().damping(12)}>
        <Pressable
          style={{ width: '100%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
          onPress={()=> router.navigate(`/${item.profileName}`)}
        >
          <ImageItem 
            i={i} fil={item} imageStyle={{width: '100%', height: i % 3 === 0 ? hp(25) : hp(35), borderRadius: 35 }}
          />
        </Pressable>
      </Animated.View>
      <Text style={{ fontSize: hp(1.5), marginTop: 5 }}>
        {item.profileName.length > 20 ? `${item.profileName.slice(0, 20)}...` : item.profileName}
      </Text>
    </View>
  );
};
