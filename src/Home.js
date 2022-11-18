import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import Clipboard from '@react-native-clipboard/clipboard';
const Home = ({navigation}) => {
  const [generateLink, setGeneratedLink] = useState('');
  const buildLink = async () => {
    const link = await dynamicLinks().buildLink({
      link: 'https://invertase.io/offer',
      // domainUriPrefix is created in your Firebase console
      domainUriPrefix: 'https://deeplinkdemoapp123.page.link',
      // optional setup which updates Firebase analytics campaign
      // "banner". This also needs setting up before hand
      analytics: {
        campaign: 'banner',
      },
    });

    setGeneratedLink(link);
  };

  const handleDynamicLink = link => {
    // Handle dynamic link inside your own application
    if (link.url === 'https://invertase.io/offer') {
      // ...navigate to your offers screen
      navigation.navigate('Offer');
    } else {
      alert('not matched ');
    }
  };

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        if (link.url === 'https://invertase.io/offer') {
          // ...navigate to your offers screen
          navigation.navigate('Offer');
        } else {
          alert('not matched ');
        }
      });
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{generateLink}</Text>
      <TouchableOpacity
        style={{
          width: 200,
          height: 50,
          borderWidth: 1,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
        }}
        onPress={() => {
          buildLink();
        }}>
        <Text>Generate Deep Link</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: 200,
          height: 50,
          borderWidth: 1,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
        }}
        onPress={() => {
          Clipboard.setString(generateLink);
        }}>
        <Text>Copy Deep Link</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
