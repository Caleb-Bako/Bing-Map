import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DateandTimePicker from '@/components/DateandTimePicker';

const EventCreation = () => {
  const [name,setName] = useState('');
  const [location,setLocation] = useState('');
  const [description,setDescription] = useState('');
  const [focusState, setFocusState] = useState({ firstInput: false, anotherInput: false });
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const colors = ['red', 'blue', 'green', 'yellow','pink','orange','purple'];
  const eventTypes = ['Public', 'Ticket', 'Department'];

  const handleFocus = (inputName) => {
    setFocusState({ ...focusState, [inputName]: true });
  };

  const handleBlur = (inputName) => {
    setFocusState({ ...focusState, [inputName]: false });
  };
  return (
    <View style={styles.container}>
    <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}>
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
          {eventTypes.map((type, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedEvent(type)}
              style={[
                styles.eventtext,
                selectedEvent === type && { backgroundColor: 'black', borderColor: 'black' }
              ]}
            >
              <Text
                style={{
                  color: selectedEvent === type ? 'white' : 'black',
                }}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.input}>
      <Text style={styles.text}>Description</Text>
        <View style={[
            styles.inputWrapper, 
            { borderBottomColor: focusState.anotherInput ? 'black' : '#d3d3d3' }
          ]}>
          <TextInput
            autoCapitalize="none"
            placeholder="e.g. Come one and all to Revival for the most life changing moment in your life"
            value={description}
            onChangeText={setDescription}
            onFocus={() => handleFocus('anotherInput')}
            onBlur={() => handleBlur('anotherInput')}
            multiline={true}
            textAlignVertical="top"
            style={styles.textarea}
          />
        </View>
      </View>
      <View style={styles.input}>
        <Text style={styles.text}>Pick Color for Event Maker</Text>
        <View style={{ flexDirection: 'row', gap: 15 ,paddingTop: 12}}>
          {colors.map((color, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedColor(color)}
              style={{
                backgroundColor: color,
                borderRadius: 50,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {selectedColor === color && (
                <Entypo name="check" size={20} color="#fff" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
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
    paddingVertical: 10,
    borderColor: 'black',
    fontSize:20,
    fontWeight:'bold' 
  },
  textarea:{
    flex: 1, 
    borderColor: 'black',
    paddingVertical: 10, 
    paddingHorizontal: 5, 
    flex: 1,
    textAlignVertical: 'top',
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
})