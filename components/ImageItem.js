import { Image, View, Text, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { supabase } from './utils/SupaConfig';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ImageItem = ({ i, fil }) => {
  const [image, setImage] = useState('');
  
  useEffect(() => {
    const downloadImage = async () => {
      const { data, error } = await supabase.storage
        .from('files')
        .download(`general/${fil.name}`);

      if (data) {
        const fr = new FileReader();
        fr.onload = () => {
          setImage(fr.result); // Set the Base64 image string
        };
        fr.readAsDataURL(data); // Convert to Base64
      }

      if (error) {
        console.error("Error downloading image:", error);
      }
    };

    downloadImage();
  }, [fil]);

  const isEven = i % 2 === 0;

  return (
    <Animated.View entering={FadeInDown.delay(i * 100).duration(600).springify().damping(12)}>
      <Pressable
        style={{ width: '100%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
      >
        {image ? (
          <Image
            style={{ width: '100%', height: i % 3 === 0 ? hp(25) : hp(35), borderRadius: 35 }}
            source={{ uri: image }}
          />
        ) : (
          <Text>Loading image...</Text>
        )}
      </Pressable>
    </Animated.View>
  
  );
};

export default ImageItem;
