import React, {useRef} from 'react';
import {
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
const MyEditor = () => {
  const richText = useRef();

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log('Imagemime', image);
      convertBase64(image);
    });
  };
  const convertBase64 = image => {
    ImgToBase64.getBase64String(image.path)
      .then(base64String => {
        const str = `data:${image.mime};base64,${base64String}`;
        richText.current.insertImage(str);
      })
      .catch(err => console.log(err));
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <Text>Description:</Text>
          <RichEditor
            ref={richText}
            onChange={descriptionText => {
              console.log('descriptionText:', descriptionText);
            }}
          />
        </KeyboardAvoidingView>
      </ScrollView>

      <View style={{position: 'absolute', bottom: 0}}>
        <RichToolbar
          editor={richText}
          actions={[
            actions.insertImage,
            actions.setBold,
            actions.setItalic,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.insertLink,
            actions.keyboard,
            actions.setStrikethrough,
            actions.setUnderline,
            actions.removeFormat,
            actions.insertVideo,
            actions.checkboxList,
            actions.undo,
            actions.redo,
          ]}
          onPressAddImage={() => {
            pickImage();
          }}
          iconMap={{
            [actions.heading1]: ({tintColor}) => (
              <Text style={[{color: tintColor}]}>H1</Text>
            ),
          }}
          
        />
      </View>
    </SafeAreaView>
  );
};

export default MyEditor;
