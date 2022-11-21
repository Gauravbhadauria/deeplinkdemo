import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

const FlatlistDemo2 = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const searchRef = useRef();
  const listRef = useRef();
  const [ind, setInd] = useState(0);
  const [oldData, setOldData] = useState([]);
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(response => {
        console.log(response);
        setData(response);
        setOldData(response);
      });
  }, []);

  const onSearch = text => {
    if (text == '') {
      setData(oldData);
    } else {
      let tempList = data.filter(item => {
        return item.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setData(tempList);
    }
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          height: 70,
          marginTop: 20,

          justifyContent: 'space-between',
        }}>
        <View
          style={{
            width: '80%',
            height: 50,
            borderRadius: 10,
            borderWidth: 0.2,

            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 15,
          }}>
          <Image
            source={require('./search.png')}
            style={{width: 24, height: 24, marginLeft: 15, opacity: 0.5}}
          />
          <TextInput
            ref={searchRef}
            placeholder="search item here..."
            style={{width: '76%', height: 50}}
            value={search}
            onChangeText={txt => {
              onSearch(txt);
              setSearch(txt);
            }}
          />
          {search == '' ? null : (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => {
                searchRef.current.clear();
                onSearch('');
                setSearch('');
              }}>
              <Image
                source={require('./close.png')}
                style={{width: 16, height: 16, opacity: 0.5}}
              />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={{
            marginRight: 15,
          }}
          onPress={() => {
            setVisible(true);
          }}>
          <Image
            source={require('./filter.png')}
            style={{width: 24, height: 24}}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        ref={listRef}
        showsVerticalScrollIndicator={false}
        initialScrollIndex={ind}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width: '90%',

                borderRadius: 10,
                borderWidth: 0.5,
                alignSelf: 'center',
                marginTop: 20,
                marginBottom: index == data.length - 1 ? 20 : 0,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Image
                source={{uri: item.image}}
                style={{
                  width: 60,
                  height: '90%',
                  marginLeft: 10,
                  borderRadius: 10,
                }}
              />
              <View style={{width: '80%'}}>
                <Text
                  style={{fontWeight: '600', marginLeft: 10, marginTop: 10}}>
                  {item.title.substring(0, 30)}
                </Text>
                <Text style={{fontSize: 12, margin: 10}}>
                  {item.description.substring(0, 50)}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      marginLeft: 10,
                      fontWeight: '800',
                      color: 'green',
                    }}>
                    {'$ ' + item.price}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 50,
                      fontWeight: '800',
                      color: 'orange',
                    }}>
                    {item.rating.rate}
                  </Text>
                  <Image
                    source={require('./star.png')}
                    style={{width: 12, height: 12, marginLeft: 5}}
                  />
                </View>
              </View>
            </View>
          );
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,.5)',
          }}>
          <View
            style={{
              width: '80%',
              height: 200,
              borderRadius: 10,
              backgroundColor: '#fff',
            }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                borderBottomWidth: 0.5,
                justifyContent: 'center',
                paddingLeft: 20,
              }}
              onPress={() => {
                let tempList = data.sort((a, b) =>
                  a.title > b.title ? 1 : -1,
                );
                setData(tempList);
                listRef.current.scrollToIndex({animated: true, index: 0});
                setVisible(false);
              }}>
              <Text style={{fontSize: 18, color: '#000'}}> Sort By Name</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                borderBottomWidth: 0.5,
                justifyContent: 'center',
                paddingLeft: 20,
              }}
              onPress={() => {
                setData(data.sort((a, b) => a.price - b.price));
                listRef.current.scrollToIndex({animated: true, index: 0});
                setVisible(false);
              }}>
              <Text style={{fontSize: 18, color: '#000'}}>
                Low to High Price
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                borderBottomWidth: 0.5,
                justifyContent: 'center',
                paddingLeft: 20,
              }}
              onPress={() => {
                setData(data.sort((a, b) => b.price - a.price));
                listRef.current.scrollToIndex({animated: true, index: 0});
                setVisible(false);
              }}>
              <Text style={{fontSize: 18, color: '#000'}}>
                Hight to Low Price
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                borderBottomWidth: 0.5,
                justifyContent: 'center',
                paddingLeft: 20,
              }}
              onPress={() => {
                setData(data.sort((a, b) => b.rating.rate - a.rating.rate));
                listRef.current.scrollToIndex({animated: true, index: 0});
                setVisible(false);
              }}>
              <Text style={{fontSize: 18, color: '#000'}}> Sort By Rating</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FlatlistDemo2;
