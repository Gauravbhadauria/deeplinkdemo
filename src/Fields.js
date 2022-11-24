import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';

const Fields = ({
  index,
  onChangeCompany,
  onChangeProfile,
  onChangeYear,
  onClickRemove,
}) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text style={{marginLeft: 20}}>Experience {index + 1} </Text>
        <TouchableOpacity
          style={{marginRight: 20}}
          onPress={() => {
            onClickRemove();
          }}>
          <Text style={{color: 'red'}}>Remove</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="Enter Company Name"
        onChangeText={txt => {
          onChangeCompany(txt);
        }}
        style={{
          width: '90%',
          height: 50,
          borderWidth: 0.5,
          borderRadius: 10,
          alignSelf: 'center',
          marginTop: 20,
          paddingLeft: 15,
        }}
      />
      <TextInput
        placeholder="Enter Profile Name"
        onChangeText={txt => {
          onChangeProfile(txt);
        }}
        style={{
          width: '90%',
          height: 50,
          borderWidth: 0.5,
          borderRadius: 10,
          alignSelf: 'center',
          marginTop: 20,
          paddingLeft: 15,
        }}
      />
      <TextInput
        placeholder="Enter Start Year"
        onChangeText={txt => {
          onChangeYear(txt);
        }}
        style={{
          width: '90%',
          height: 50,
          borderWidth: 0.5,
          borderRadius: 10,
          alignSelf: 'center',
          marginTop: 20,
          paddingLeft: 15,
        }}
      />
    </View>
  );
};

export default Fields;
