import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

import styled from "styled-components/native";

export default function Diary({ navigation, route }) {
  const [diaryInfo, setDiaryInfo] = useState({ content: "", imageUrl: "" });

  const openImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Please allow permission!");

      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled) return;

    setDiaryInfo({
      ...diaryInfo,
      imageUrl: pickerResult.uri,
    });
  };

  const deleteImage = () => {
    setDiaryInfo({
      ...diaryInfo,
      imageUrl: null,
    });
  };

  const handleChangeText = (txt) => {
    setDiaryInfo({
      ...diaryInfo,
      content: txt,
    });
  };

  const saveDiaryData = async () => {
    alert("saved");

    try {
      let diaryData = JSON.parse(await AsyncStorage.getItem("Diary-data"));

      if (!diaryData) {
        diaryData = [];
      }

      diaryData.push(diaryInfo);

      await AsyncStorage.setItem("Diary-data", JSON.stringify(diaryData));
    } catch (err) {
      console.error(err);
    }

    navigation.reset({ index: 0, routes: [{ name: "Home" }] });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Styled.Container>
        {diaryInfo.imageUrl ? (
          <>
            <TouchableOpacity onPress={deleteImage}>
              <Text>사진 지우기</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openImagePicker}>
              <Styled.DiaryImage source={{ uri: diaryInfo.imageUrl }} />
            </TouchableOpacity>
          </>
        ) : (
          <Styled.ImageButton onPress={openImagePicker}>
            <Text>Image</Text>
          </Styled.ImageButton>
        )}
        <Styled.DiaryInput
          multiline
          onChangeText={handleChangeText}
          value={diaryInfo.content}
        />
        <Styled.SaveButton onPress={saveDiaryData}>
          <Text>Save</Text>
        </Styled.SaveButton>
      </Styled.Container>
    </SafeAreaView>
  );
}

const Styled = {
  Container: styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
  `,
  ScrollWrapper: styled.ScrollView`
    flex: 1;
  `,
  ImageButton: styled.TouchableOpacity`
    width: 100;
    height: 50;
    border-width: 1;
    justify-content: center;
    align-items: center;
    border-radius: 5;
  `,
  DiaryInput: styled.TextInput`
    width: 80%;
    height: 50%
    border-width: 1;
  `,
  DiaryImage: styled.Image`
    width: 300;
    height: 300;
    resize-mode: contain;
    border-width: 1;
  `,
  SaveButton: styled.TouchableOpacity`
    width: 80%;
    height: 50;
    border-width: 1;
    justify-content: center;
    align-items: center;
    border-radius: 5;
  `,
};
