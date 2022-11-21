import {View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useState} from 'react';
let rules = [
  {
    field: 'TEXT_INPUT',
    data: {
      placeholder: 'Enter Name',
      maxLength: 30,
      isRequired: true,
      badMessage: 'Please Enter Correct Name',
    },
  },
  {
    field: 'TEXT_INPUT',
    data: {
      placeholder: 'Enter Email',
      maxLength: 30,
      isRequired: true,
      badMessage: 'Please Enter Valid  Email Id',
    },
  },
  {
    field: 'TEXT',
    data: {
      value: 'XYZ264DD',
    },
  },
  {
    field: 'TEXT',
    data: {
      value: '253637377373737337',
    },
  },
  {
    field: 'TEXT_INPUT',
    data: {
      placeholder: 'Enter Mobile Number',
      maxLength: 10,
      isRequired: false,
      badMessage: 'Please Enter Valid Mobile',
    },
  },
  {
    field: 'TEXT_INPUT',
    data: {
      placeholder: 'Enter Current Address',
      maxLength: 50,
      isRequired: false,
      badMessage: 'Please Enter  Current Address',
    },
  },
  {
    field: 'CHECK_BOX',
    data: {
      isRequire: true,
      title: 'I accept all conditions',
    },
  },
  {
    field: 'BUTTON',
    data: {
      backgroundColor: 'purple',
      title: 'Submit',
    },
  },
];
const DynamicForm = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={rules}
        renderItem={({item, index}) => {
          return (
            <View>
              {item.field == 'TEXT_INPUT' ? (
                <TextInput
                  placeholder={item.data.placeholder}
                  style={{
                    width: '90%',
                    height: 50,
                    borderRadius: 10,
                    borderWidth: 0.5,
                    alignSelf: 'center',
                    paddingLeft: 20,
                    marginTop: 20,
                  }}
                />
              ) : item.field == 'TEXT' ? (
                <View
                  style={{
                    width: '90%',
                    height: 50,
                    borderRadius: 10,
                    borderWidth: 0.5,
                    alignSelf: 'center',
                    paddingLeft: 20,
                    marginTop: 20,
                    justifyContent: 'center',
                  }}>
                  <Text>{item.data.value}</Text>
                </View>
              ) : item.field == 'CHECK_BOX' ? (
                <View
                  style={{
                    width: '90%',
                    height: 50,
                    flexDirection: 'row',
                    alignSelf: 'center',
                    alignItems: 'center',
                  }}>
                  <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={newValue => setToggleCheckBox(newValue)}
                  />
                  <Text>{item.data.title}</Text>
                </View>
              ) : item.field == 'BUTTON' ? (
                <TouchableOpacity
                  style={{
                    width: '90%',
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: item.data.backgroundColor,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop:30
                  }}>
                  <Text style={{color:'#fff'}}>{item.data.title}</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          );
        }}
      />
    </View>
  );
};

export default DynamicForm;
