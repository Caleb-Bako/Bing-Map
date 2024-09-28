import { View, Text, ScrollView, TouchableOpacity, Button, TextInput, StatusBar, Modal, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Animated,{FadeInDown, FadeIn} from 'react-native-reanimated';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '@/components/utils/SupaConfig';
import Spinner from 'react-native-loading-spinner-overlay';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import ImageItem from '@/components/ImageItem';

export default function PlacesDetailScreen() {
  const navigation = useNavigation();
  const [meals, setMeals] = useState([]);
  const [loading,setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState(''); // State for name input
  const [nickname, setNickname] = useState('');
  const [mostOccurringTag, setMostOccurringTag] = useState(null);

  const { placeId } = useLocalSearchParams();
  
  //When there is a change in place id it should run fetchItems() function
  useEffect(() => {
    fetchItems();
  }, [ placeId ]);

  console.log(placeId)
// Fetching the building data from the database
  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('places')
      .select('*')
      .eq('name', placeId);
    if (error) {
      console.error('Error fetching items:', error);
    } else {
      console.log('Fetched items:', meals);
      setMeals(data);
      findMostOccurringTag(data);
    }
  };
  
  const findMostOccurringTag = (items) => {
    const tagFrequency = {};
  
    items.forEach(item => {
      // Check if item.tags exists and is an array
      if (Array.isArray(item.tags)) {
        item.tags.forEach(tag => {
          tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
        });
      }
    });
  
    console.log('Tag frequency:', tagFrequency);
  
    const mostOccurringTag = Object.keys(tagFrequency).reduce((a, b) =>
      tagFrequency[a] > tagFrequency[b] ? a : b
    );
  
    console.log('Most occurring tag:', mostOccurringTag);
  
    const mostOccurringTagCount = tagFrequency[mostOccurringTag];

    setMostOccurringTag(mostOccurringTag);

    //After finding name occuring more than 10 function is called
    if (mostOccurringTagCount > 10) {
      updateName(mostOccurringTag);
    }
  };

  const updateName = async (newName) => {
    const { data, error } = await supabase
      .from('places')
      .update({ name: newName })
      .eq('imageUrl', placeId);

    if (error) {
      console.error('Error updating name:', error);
    } else {
      setName(newName);  // Update the local state
    }
  };

  const updateItem = async () => {
    // Step 1: Fetch existing tags
    const { data: existingItem, error: fetchError } = await supabase
      .from('places')
      .select('tags')
      .eq('id', placeId)
      .single();

    if (fetchError) {
      console.error('Error fetching item:', fetchError);
      return;
    }

    const existingTags = existingItem.tags || [];
    
    // Step 2: Add new nickname to the existing array
    const newTags = [...existingTags, nickname];
    const updatedTags = [...new Set(newTags)]; 

    // Step 3: Update the item with the new tag array
    const { data, error: updateError } = await supabase
      .from('places')
      .update({ tags: updatedTags })
      .eq('imageUrl', placeId);

    if (updateError) {
      console.error('Error updating item:', updateError);
    } else {
      console.log('Updated item:', data);
      setNickname(''); 
    }
  };

  const handleNameChange = (text) => {
    setName(text);
  };
  
  const handleNicknameChange = (text) => {
    setNickname(text);
  }

  const handleEditPress = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={{ flex: 1 }}>
      {meals.map((meal)=>(
        <View style={{ flex: 1 }}>
        <ScrollView
        style={{ backgroundColor: 'white', flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30}}
        >
        <StatusBar style={"light"}/>
        {/* Places Image */}

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <ImageItem
            i ={meal.imageUrl}
            imageStyle={{width: wp(98), height: hp(40), borderRadius: 25, borderBottomLeftRadius:40,borderBottomRightRadius:40, marginTop:4}}
          />
        </View>

        {/* BackButton */}
        <Animated.View entering={FadeIn.delay(200).duration(1000)} 
        style={{ 
          width: '100%', 
          position: 'absolute', 
          flexDirection: 'column', 
          justifyContent: 'space-between', 
          paddingTop: 36 
          }}>
          <View style={{
              display: 'flex',
              flexDirection: 'row', 
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              paddingBottom:90,
          }}>
            <TouchableOpacity   
            style={{
                padding: 6,
                borderRadius: 50, 
                marginLeft: 12,
                backgroundColor: 'white', 
              }}
              onPress={()=> navigation.goBack()}
              >
              <Entypo name="chevron-left" size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
            </TouchableOpacity>
            <TouchableOpacity   
            style={{
                padding: 6,
                borderRadius: 50, 
                marginLeft: 12,
                backgroundColor: 'white', 
              }}
              onPress={handleEditPress}
            >
              <FontAwesome6 name="pencil" size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
            </TouchableOpacity>
          </View>
        </Animated.View>
  {/* Modal for Edit Section */}
  <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 35,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>Suggest New Name</Text>
              <TextInput
                style={{ fontSize: 16, padding: 10, borderWidth: 1, borderRadius: 10, width: 200, marginBottom: 15 }}
                placeholder="Enter New Name"
                onChangeText={handleNicknameChange}
                value={nickname}
              />
              <Button title="Add Item" onPress={updateItem} />
              <Button title="Close" onPress={handleEditPress} color="red" />
            </View>
          </View>
        </Modal>

        {/* Description */}
        {
          loading? (
            <Spinner visible={loading} />
          ):(
            <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} 
              style={{ 
                paddingHorizontal: 16, 
                flexDirection: 'column', 
                justifyContent: 'space-between', 
                paddingTop: 12, 
                paddingBottom: 32
                }}>
              {/* name and area */}
              <View style={{ marginTop: 8, marginBottom: 8 }}>
                <Text style={{fontSize: hp(3),fontWeight: 'bold', flex: 1, color: '#666666' }}>
                  {meal.name}
                </Text>
                <Text style={{fontSize: hp(2),fontWeight: '500', flex: 1, color: '#666666' }}>
                {mostOccurringTag}
                </Text>
              </View> 
              {/* misc */}
              <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={{ flexDirection: 'column', borderRadius: 9999, backgroundColor: '#FFECB3', padding: 8 }}> 
                  <View 
                    style={{height: hp(6.5), width: hp(6.5),backgroundColor: 'white', borderRadius: 9999, alignItems: 'center', justifyContent: 'center' }}
                    >
                      <FontAwesome6 name="clock" size={hp(4)} strokeWidth={2.5} color="#525252" />
                  </View>
                  <View style={{ flexDirection: 'column', alignItems: 'center', paddingVertical: 8, marginBottom: 8 }}>
                    <Text style={{fontSize: hp(2),fontWeight: 'bold', color: '#666666' }}>
                      {meal.openTime}
                    </Text>
                    <Text style={{fontSize: hp(1.3),fontWeight: 'bold', color: '#666666' }}>
                      AM
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'column', borderRadius: 9999, backgroundColor: '#FFECB3', padding: 8 }}> 
                  <View 
                    style={{height: hp(6.5), width: hp(6.5),backgroundColor: 'white', borderRadius: 9999, alignItems: 'center', justifyContent: 'center' }}
                    >
                      <FontAwesome6 name="users" size={hp(4)} strokeWidth={2.5} color="#525252" />
                  </View>
                  <View style={{ flexDirection: 'column', alignItems: 'center', paddingVertical: 8, marginBottom: 8 }}>
                    <Text style={{fontSize: hp(2),fontWeight: 'bold', color: '#666666' }}>
                      Student
                    </Text>
                    <Text style={{fontSize: hp(1.3),fontWeight: 'bold', color: '#666666' }}>
                      Use
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'column', borderRadius: 9999, backgroundColor: '#FFECB3', padding: 8 }}> 
                  <View 
                    style={{height: hp(6.5), width: hp(6.5),backgroundColor: 'white', borderRadius: 9999, alignItems: 'center', justifyContent: 'center' }}
                    >
                      <FontAwesome6 size={hp(4)} strokeWidth={2.5} color="#525252" />
                  </View>
                  <View style={{ flexDirection: 'column', alignItems: 'center', paddingVertical: 8, marginBottom: 8 }}>
                    <Text style={{fontSize: hp(2),fontWeight: 'bold', color: '#666666' }}>
                      01
                    </Text>
                    <Text style={{fontSize: hp(1.3),fontWeight: 'bold', color: '#666666' }}>
                      Ext..
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'column', borderRadius: 9999, backgroundColor: '#FFECB3', padding: 8 }}> 
                  <View 
                    style={{height: hp(6.5), width: hp(6.5),backgroundColor: 'white', borderRadius: 9999, alignItems: 'center', justifyContent: 'center' }}
                    >
                     <FontAwesome6 name="clock" size={hp(4)} strokeWidth={2.5} color="#525252" />
                  </View>
                  <View style={{ flexDirection: 'column', alignItems: 'center', paddingVertical: 8, marginBottom: 8 }}>
                    <Text style={{fontSize: hp(2), fontWeight: 'bold', color: '#666666' }}>
                      {meal.closeTime}
                    </Text>
                    <Text style={{fontSize: hp(1.3),fontWeight: 'bold', color: '#666666' }}>
                      PM
                    </Text>
                  </View>
                </View>
              </Animated.View>

              {/*  description */}
              <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className="space-y-4">
                <Text style={{fontSize: hp(3),fontWeight: 'bold', flex: 1, color: '#666666', marginTop:10 }} className="font-bold flex-1 text-neutral-700">
                  Description
                </Text>
                <View className="space-y-2 ml-3">
                <Text className="font-medium text-neutral-600">
                  {meal.description}
                </Text>
                </View>
              </Animated.View>
            </Animated.View>
          )
        }
      </ScrollView>
      <View style=
        {{
          position: 'absolute', // Absolute positioning
          bottom: 0, // Position at the bottom
          left: 0, // Span the entire width
          right: 0,
          padding: 10,
          }}>
            <Button title="Get Directions" color='#FFBF00'  style=
              {{
                color: '#fff',
                width: 100,
                borderRadius: 20,
              }} />
        </View>
          </View>
        ))}
      
    </View>
  )
}
