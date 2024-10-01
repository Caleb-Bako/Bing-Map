import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DateandTimePicker from '@/components/DateandTimePicker';

const EventCreation = () => {
  const [name,setName] = useState('');
  const [location,setLocation] = useState('');
  const [focusState, setFocusState] = useState({ firstInput: false, anotherInput: false });

  const handleFocus = (inputName) => {
    setFocusState({ ...focusState, [inputName]: true });
  };

  const handleBlur = (inputName) => {
    setFocusState({ ...focusState, [inputName]: false });
  };
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Text style={styles.text}>Event Name</Text>
          <View style={[
            styles.inputWrapper, 
            { borderBottomColor: focusState.firstInput ? 'black' : '#d3d3d3' }
          ]}>
          <TextInput
            autoCapitalize="none"
            placeholder="e.g. Revival"
            value={name}
            onChangeText={setName}
            onFocus={() => handleFocus('firstInput')}
            onBlur={() => handleBlur('firstInput')}
            style={styles.inputField}
          />
        </View>
      </View>
      <View style={styles.input}>
        <Text style={styles.text}>Location</Text>
        <View style={[
            styles.inputWrapper, 
            { borderBottomColor: focusState.anotherInput ? 'black' : '#d3d3d3' }
          ]}>
          <TextInput
            autoCapitalize="none"
            placeholder="e.g. Chapel"
            value={location}
            onChangeText={setLocation}
            onFocus={() => handleFocus('anotherInput')}
            onBlur={() => handleBlur('anotherInput')}
            style={styles.inputField}
          />
          <Entypo 
          name="location-pin" 
          size={hp(3.5)} 
          strokeWidth={4.5} 
          color="#fbbf24" 
          style={styles.icon} 
        />
        </View>
      </View>
      <View >
          <DateandTimePicker/>
      </View>
      <View style={styles.input}>
        <Text style={styles.text}>Event Type</Text>
        <View style={styles.event}>
          <Text style={styles.eventtext}>Public</Text>
          <Text style={styles.eventtext}>Ticket</Text>
          <Text style={styles.eventtext}>Department</Text>
        </View>
      </View>
      <View style={styles.input}>
        <Text style={styles.text}>Pick Color for Event Maker</Text>
        <View style={styles.marker}>
          <View style={{backgroundColor:'red',borderRadius:50, width: 40, height: 40,  justifyContent: 'center', alignItems: 'center' }}>
            <Entypo name="check" size={20} color="#ffff" />
          </View>
          <View style={{backgroundColor:'purple',borderRadius:50, width: 40, height: 40}}/>
          <View style={{backgroundColor:'green',borderRadius:50, width: 40, height: 40}}/>
          <View style={{backgroundColor:'blue',borderRadius:50, width: 40, height: 40}}/>
          <View style={{backgroundColor:'pink',borderRadius:50, width: 40, height: 40}}/>
          <View style={{backgroundColor:'orange',borderRadius:50, width: 40, height: 40}}/>
          <View style={{backgroundColor:'brown',borderRadius:50, width: 40, height: 40}}/>
        </View>
      </View>
    </View>
  )
}

export default EventCreation

const styles = StyleSheet.create({
  container:{
    padding:20
  },
  input:{
    paddingTop:40,
  },
  text:{
    fontSize:13,
    color:'grey',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1, 
    borderBottomColor: '#d3d3d3', 
  },
  icon: {
    marginRight: 10, 
  },
  inputField: {
    flex: 1, 
    fontSize: 16,
    paddingVertical: 10,
    borderColor: 'black',
    fontSize:20,
    fontWeight:'bold' 
  },
  event:{
    flexDirection:'row',
    paddingTop:12,
    gap:65,
  },
  eventtext:{
    fontSize:14,
    borderWidth:1,
    borderBlockColor:'black',
    paddingHorizontal:15,
    paddingVertical:8,
    borderRadius:20
  },
  marker:{
    paddingTop: 12,
    flexDirection:'row',
    gap:15
  }
})