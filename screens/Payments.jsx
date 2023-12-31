import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Searchbar, Button, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment/moment';

const Payments = () => {
  const navigator = useNavigation();
  useLayoutEffect(() => {
    navigator.setOptions({ headerShown: false });
  }, [navigator]);

  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };

  const [search, setSearch] = useState('');

  const DATA = [
    {
      farmerName: 'Ayush',
      farmerId: '100',
      balance: '5000'
    },
    {
      farmerName: 'Bhola',
      farmerId: '101',
      balance: '3000'
    },
  ];

  const filteredData = DATA.filter((item) =>
    item.farmerId.includes(search)
  );

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        style={styles.search}
        placeholder="Search by Farmer ID"
        onChangeText={(text) => setSearch(text)}
        value={search}
      />

      {filteredData.length > 0 && search.length === filteredData[0].farmerId.length ? (
        filteredData.map((item, index) => (
          <View style={styles.farmerDetails} key={index}>
            <View style={{ flexDirection: 'row', padding: 5 }}>
              <Text style={{ color: 'red', fontFamily: 'InterB' }}>
                FARMER NAME:{' '}
              </Text>
              <Text>{item.farmerName}</Text>
            </View>

            <View style={{ flexDirection: 'row', padding: 5 }}>
              <Text style={{ color: 'red', fontFamily: 'InterB' }}>
                FARMER ID:{' '}
              </Text>
              <Text>{item.farmerId}</Text>
            </View>

            <View style={{ flexDirection: 'row', padding: 5 }}>
              <Text style={{ color: 'red', fontFamily: 'InterB' }}>
                BALANCE:{' '}
              </Text>
              <Text> ₹ {item.balance}</Text>
            </View>

            <View>


              {!isPickerShow && (
                <View style={styles.dateContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={showPicker}
                  >
                    <Text style={{fontFamily: 'Inter'}}>{moment(date).format('DD-MM-YYYY')}</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* The date picker */}
              {isPickerShow && (
                <DateTimePicker
                  value={date}
                  mode={'date'}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  is24Hour={true}
                  onChange={onChange}
                  style={styles.datePicker}
                />
              )}



              <TextInput
                style={styles.textInput}
                label="Amount to Pay"
                mode="outlined"
                outlineColor="#e6e6e6"
                underlineColor="#e6e6e6"
                activeUnderlineColor="#e6e6e6"
                activeOutlineColor="#737373"
              />

              <TextInput
                style={[styles.textInput]}
                label="Remarks"
                mode="outlined"
                outlineColor="#e6e6e6"
                underlineColor="#e6e6e6"
                activeUnderlineColor="#e6e6e6"
                activeOutlineColor="#737373"
                dense={true}
                multiline={true}
              />
            </View>

            <View style={styles.btnCnt}>
              <Button
                style={styles.button}
                mode="contained"
                buttonColor="#77b300"
              >
                Pay Now
              </Button>

              <Button
                style={styles.button}
                mode="contained"
                buttonColor="#77b300"
              >
                Generate Receipt and Pay
              </Button>
            </View>
          </View>
        ))
      ) : (
        <Text
          style={{
            padding: 50,
            fontFamily: 'Inter',
            width: '85%',
            textAlign: 'center',
          }}
        >
          No farmer found
        </Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    top: 10,
    gap: 20,
  },
  search: {
    width: '90%',
    backgroundColor: '#fff',
    borderColor: '#edebeb',
    borderWidth: 2,
  },
  farmerDetails: {
    width: '90%',
    backgroundColor: '#fff',
    borderColor: '#edebeb',
    borderWidth: 2,
    padding: 10,
  },
  btnCnt: {
    marginVertical: 10,
    gap: 10
  },
  textInput: {
    marginVertical: 10,
    fontSize: 13,
    fontFamily: 'Inter',
  },
  rateText: {
    color: 'green',
  },
  longTextInput: {
    height: 50,
    alignItems: 'flex-start',
  },
  dateContainer: {
    backgroundColor: '#fffbff',
    borderColor: '#f0eff0',
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 10,
    height: 50,
    justifyContent: 'center',
    marginTop: 10
  }
});

export default Payments;
