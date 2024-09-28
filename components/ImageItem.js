import { Image, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { supabase } from './utils/SupaConfig';

const ImageItem = ({ i, fil, imageStyle = {} }) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    const downloadImage = async () => {
      const imagePath = fil?.name ? fil.name : i; // Use fil if available, fallback to i
      const { data, error } = await supabase.storage
        .from('files')
        .download(`general/${imagePath}`);

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
  }, [fil, i]); // Add both fil and i as dependencies

  return (
    <View style={{ flex: 1 }}>
      {image ? (
        <Image
          source={{ uri: image }}
          style={imageStyle}
        />
      ) : (
        <Text>Loading image...</Text>
      )}
    </View>
  );
};

export default ImageItem;
