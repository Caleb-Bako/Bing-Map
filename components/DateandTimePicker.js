import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from '@expo/vector-icons/AntDesign';

const DateandTimePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [mode, setMode] = useState('date'); 
  const [show, setShow] = useState(false);
  const [currentPicker, setCurrentPicker] = useState(null); 

  const onChange = (event, selectedDate) => {
    setShow(false); 

    if (currentPicker === 'startDate') {
      setStartDate(selectedDate || startDate);
    } else if (currentPicker === 'endDate') {
      setEndDate(selectedDate || endDate);
    } else if (currentPicker === 'startTime') {
      setStartTime(selectedDate || startTime);
    } else if (currentPicker === 'endTime') {
      setEndTime(selectedDate || endTime);
    }
  };

  const showMode = (currentMode, picker) => {
    setShow(true);
    setMode(currentMode); 
    setCurrentPicker(picker); 
  };

  return (
    <View>
      {/* Date pickers */}
      <View style={styles.date}>
        <View>
          <Text style={styles.text}>Start Date</Text>
            <View style={styles.container}>
                <Text>{startDate.toLocaleDateString()}</Text>
                <Pressable onPress={() => showMode('date', 'startDate')}>
                    <AntDesign name="calendar" size={24} color="#fbbf24" />
                </Pressable>
            </View>
        </View>
        <View>
          <Text style={styles.text}>End Date</Text>
          <View style={styles.container}>
            <Text>{endDate.toLocaleDateString()}</Text>
            <Pressable onPress={() => showMode('date', 'endDate')}>
                <AntDesign name="calendar" size={24} color="#fbbf24" />
            </Pressable>
          </View>
        </View>
      </View>

      {/* Time pickers */}
      <View style={styles.date}>
        <View>
          <Text style={styles.text}>Start Time</Text>
          <View  style={styles.timecontainer}>
            <Text>{startTime.toLocaleTimeString()}</Text>
            <Pressable onPress={() => showMode('time', 'startTime')}>
                <AntDesign name="clockcircleo" size={24} color="#fbbf24" />
            </Pressable>
          </View>
        </View>
        <View>
          <Text style={styles.text}>End Time</Text>
          <View style={styles.timecontainer}>
            <Text>{endTime.toLocaleTimeString()}</Text>
            <Pressable onPress={() => showMode('time', 'endTime')}>
                <AntDesign name="clockcircleo" size={24} color="#fbbf24" />
            </Pressable>
          </View>
        </View>
      </View>
      
      {/* DateTimePicker component */}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={
            currentPicker === 'startDate'
              ? startDate
              : currentPicker === 'endDate'
              ? endDate
              : currentPicker === 'startTime'
              ? startTime
              : endTime
          }
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DateandTimePicker;

const styles = StyleSheet.create({
  date: {
    paddingTop:40,
    flexDirection:'row',
    gap:80
  },
  text: {
    fontSize:13,
    color:'grey',
  },
  container: {
    flexDirection: 'row',
    gap:45,
    alignItems: 'center',
    borderBottomWidth: 1, 
    borderBottomColor: '#d3d3d3', 
  },
  timecontainer: {
    flexDirection: 'row',
    gap:32,
    alignItems: 'center',
    borderBottomWidth: 1, 
    borderBottomColor: '#d3d3d3', 
  },
});
