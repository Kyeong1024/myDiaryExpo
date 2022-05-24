import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as ImagePicker from "expo-image-picker";

import styled from "styled-components/native";

export default function Diary({ navigation, route }) {
  const [diaryInfo, setDiaryInfo] = useState({
    content: "",
    imageUrl: "",
    date: "",
  });

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
      date: new Date().toLocaleDateString(),
      id: new Date().getTime(),
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
    if (!diaryInfo.content || !diaryInfo.imageUrl) {
      alert("사진과 내용 모두 적어주세요.");
      return;
    }

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
  ImageButton: styled.TouchableOpacity`
    width: 100px;
    height: 50px;
    border-width: 1px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
  `,
  DiaryInput: styled.TextInput`
    width: 80%;
    height: 50%
    border-width: 1px;
    border-radius: 5px;
    margin-top: 5px;
    padding: 10px;
  `,
  DiaryImage: styled.Image`
    width: 300px;
    height: 200px;
    resize-mode: cover;
  `,
  SaveButton: styled.TouchableOpacity`
    width: 80%;
    height: 50px;
    margin-top: 5px;
    border-width: 1px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
  `,
};
