import {useRef} from 'react';
import {
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

import ImgToBase64 from 'react-native-image-base64';
import ImagePicker from 'react-native-image-crop-picker';

const RichTextEditor = () => {
  const richText = useRef();
  const openGalleryClickProfile = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('Imagemime', image);
      onPressAddImage(image);
    });
  };

  const onPressAddImage = image => {
    ImgToBase64.getBase64String(image.path)
      .then(base64String => {
        const str = `data:${image.mime};base64,${base64String}`;
        richText.current?.insertImage(str);
      })
      .catch(err => {
        console.log('base64:Image:', err);
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Text>Description:</Text>
          <RichEditor
          
            ref={richText}
            focusable
            onChange={descriptionText => {
              console.log('descriptionText:', descriptionText);
            }}
          />
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={{}}>
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
            openGalleryClickProfile();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default RichTextEditor;
