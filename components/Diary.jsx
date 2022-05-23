import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import styled from 'styled-components/native';
import * as ImagePicker from 'expo-image-picker';

export default function Diary() {
  const [imageUrl, setImageUrl] = useState(null);

  const openImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      alert('Please allow permission!');

      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled) return;

    setImageUrl(pickerResult.uri);
  };

  const deleteImage = () => {
    setImageUrl(null);
  };

  return (
    <Styled.Container>
      {imageUrl ? (
        <>
          <TouchableOpacity
            onPress={deleteImage}>
            <Text>사진 지우기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={openImagePicker}>
            <Styled.DiaryImage source={{uri: imageUrl}}/>
          </TouchableOpacity>
        </>
      ) : (      
        <Styled.ImageButton
          onPress={openImagePicker}>
          <Text>Image</Text>
        </Styled.ImageButton>
      )}
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
  `,
  ImageButton: styled.TouchableOpacity`
    width: 100;
    height: 50;
    border-width: 1;
    justify-content: center;
    align-items: center;
    border-radius: 5;
  `,
  DiaryImage: styled.Image`
    width: 300;
    height: 300;
    resize-mode: contain;
    border-width: 1;
  `
};
