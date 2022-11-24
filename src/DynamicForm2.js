import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Fields from './Fields';

const DynamicForm2 = () => {
  const [data, setData] = useState([{company: '', profile: '', year: ''}]);
  const changeProfile = (ind, txt) => {
    let temp = data;
    temp.map((item, index) => {
      if (index == ind) {
        item.profile = txt;
      }
    });
    console.log(temp);
    setData(temp);
  };
  const changeCompany = (ind, txt) => {
    let temp = data;
    temp.map((item, index) => {
      if (index == ind) {
        item.company = txt;
      }
    });
    console.log(temp);
    setData(temp);
  };
  const changeYear = (ind, txt) => {
    let temp = data;
    temp.map((item, index) => {
      if (index == ind) {
        item.year = txt;
      }
    });
    console.log(temp);
    setData(temp);
  };
  return (
    <View style={{flex: 1}}>
      <View>
        <FlatList
          data={data}
          renderItem={({item, index}) => {
            return (
              <Fields
                index={index}
                onChangeCompany={txt => {
                  changeCompany(index, txt);
                }}
                onChangeProfile={txt => {
                  changeProfile(index, txt);
                }}
                onChangeYear={txt => {
                  changeYear(index, txt);
                }}
                onClickRemove={() => {
                  if (data.length > 1) {
                    let temp = data;
                    temp.splice(index, 1);
                    let xyz = [];
                    temp.map(item => {
                      xyz.push(item);
                    });
                    setData(xyz);
                  }
                }}
              />
            );
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          width: '90%',
          height: 50,
          backgroundColor: '#000',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          position: 'absolute',
          bottom: 10,
          borderRadius: 10,
        }}
        onPress={() => {
          let tempData = data;
          tempData.push({company: '', profile: '', year: ''});
          let temp = [];
          tempData.map(item => {
            temp.push(item);
          });
          setData(temp);
        }}>
        <Text style={{color: '#fff'}}>Add More Experience Field</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DynamicForm2;
