import { View, Text, ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'
import {categoryData} from '../hooks/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated,{FadeInDown} from 'react-native-reanimated';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';

export default function Categories({activeCategory,handleChangeCategory}) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <BottomSheetScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{paddingHorizontal: 15}}
        >
            {
                categoryData.map((cat,index)=>{
                    let isActive = cat.name==activeCategory;
                    let activeButtonStyle = isActive ? 
                        { 
                            borderRadius: 9999,
                            padding: 6,
                            marginHorizontal: 4,
                            marginTop: 6,
                            backgroundColor: '#FFCA28' // Amber-400 color
                        } : 
                        {
                            borderRadius: 9999,
                            padding: 6,
                            marginHorizontal: 4,
                            marginTop: 6,
                            backgroundColor: 'rgba(0, 0, 0, 0.1)' // Black with 10% opacity
                        };
                    return(
                        <TouchableOpacity
                            key={index}
                            onPress={()=> handleChangeCategory(cat.name)}
                            style={{ 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                justifyContent: 'space-between', 
                                marginVertical: 2 }}
                            >
                                <View style={activeButtonStyle}>
                                    {/* <Image
                                        source={{uri:cat.strCategoryThumb}}
                                        style={{width:hp(6), height: hp(6)}}
                                        className="rounded-full"/> */}
                                       
                                    <Image
                                        source={{uri:cat.image}}
                                        style={{
                                            width:hp(6), 
                                            height: hp(6),
                                            borderRadius: 9999 }}
                                    />   
                                   {/* <CachedImage
                                        uri={cat.image}
                                        style={{
                                            width:hp(6), 
                                            height: hp(6),
                                            borderRadius: 9999 }}/> */}
                                </View>
                                <Text style={{
                                        fontSize: hp(1.6),
                                        marginLeft: 28, 
                                        marginRight: 28, 
                                        marginTop: 4,
                                        color: '#666666', 
                                    }}>
                                    {cat.name}
                                </Text>
                            </TouchableOpacity>
                    )
                })
            }
        </BottomSheetScrollView>
    </Animated.View>
  )
}