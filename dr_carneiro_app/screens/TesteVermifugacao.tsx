import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import {
  Center,
  Flex,
  NativeBaseProvider,
  Popover,
  Button,
  Text,
  Image,
  Spacer,
  Input,
  KeyboardAvoidingView,
} from "native-base";
import { height } from "styled-system";
import AsyncStorage from '@react-native-async-storage/async-storage';

//Tela do teste de vermifugação.
export default function Add({ navigation }) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [startCamera, setStartCamera] = React.useState(false);
  const [camera, setCamera] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [idAnimal, setIdAnimal] = useState('');
  const [name, setName] = useState('');
  var animal: any;

  const permisionFunction = async () => {
    const cameraPermission = await Camera.requestPermissionsAsync();

    setCameraPermission(cameraPermission.status === "granted");

    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    console.log(imagePermission.status);

    setGalleryPermission(imagePermission.status === "granted");

    if (
      imagePermission.status !== "granted" &&
      cameraPermission.status !== "granted"
    ) {
      alert("Permissião negada!");
    }
  };

  useEffect(() => {
    permisionFunction();
  }, []);

  //Função para a captura da foto.
  const takePicture = async () => {
    setStartCamera(true);
    if (camera) {
      const data = await camera.takePictureAsync(null);
      console.log(data.uri);
      setImageUri(data.uri);
      setStartCamera(false);
    }
  };

  //Salvar o animal na memória.
  const saveAnimal = (id, responsavel, diagnostico) => {
    if(!id || !responsavel){
      alert('Preencha os campos!');
      return;
    }
    var date = new Date();
    const animal = {
      idAnimal: id,
      responsavel: responsavel,
      data: date.toLocaleDateString('pt-BR'),
      imagem: imageUri,
      diagnosticoAnimal: diagnostico,
    };
    try {
      AsyncStorage.setItem(idAnimal, JSON.stringify(animal));
      console.log("Salvo!");
      console.log(animal);
      navigation.navigate('Lista de Animais')
    } catch (e) {
      console.log(e);
    }
  }

  //Retorna o botão para tirar a foto e caso já tenha sido capturada a foto, renderiza a parte de diagnóstico e salvamento do registro.
  return (
    <View style={styles.container}>
      {startCamera ? (
        <View style={styles.cameraContainer}>
          <Camera
            ref={(ref) => setCamera(ref)}
            style={styles.fixedRatio}
            type={type}
          >
            <View
              style={{
                position: "absolute",
                bottom: 0,
                flexDirection: "row",
                flex: 1,
                width: "100%",
                padding: 20,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  alignSelf: "center",
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={takePicture}
                  style={{
                    width: 70,
                    height: 70,
                    bottom: 0,
                    borderRadius: 50,
                    backgroundColor: "#fff",
                  }}
                />
              </View>
            </View>
          </Camera>
        </View>
      ) : null}
      {!startCamera ? (
        <NativeBaseProvider>
          <Center>
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                alt="Imagem do Animal"
                size={{ width: "50%", height: 200 }}
                marginTop="10"
              />
            ) : (
              <Spacer marginTop="50%" />
            )}
            <Button size="sm" marginTop="10%" onPress={takePicture}>
              Tirar Foto!
            </Button>
            {!imageUri ? (
              <Text w={250} m="10" justifyContent="center">
                Para realizar o teste, tire uma foto da conjuntiva ocular do
                animal.
              </Text>
            ) : (
              <>
                <Text w={250} m="10" justifyContent="center">
                  Toque em um dos botões abaixo cuja cor mais se aproxima da cor
                  da mucosa ocular do animal.
                </Text>

                <Flex h={40} w={50} direction="row">
                  <Button.Group
                    variant="solid"
                    isAttached
                    space={6}
                    mx={{
                      base: "auto",
                      md: 0,
                    }}
                  >
                    <Popover
                      trigger={(triggerProps) => {
                        return (
                          <Button
                            {...triggerProps}
                            colorScheme="rgb(254, 46, 46)"
                            size="lg"
                            mr={2}
                            borderWidth="1px"
                          ></Button>
                        );
                      }}
                    >
                      <Popover.Content
                        accessibilityLabel="hello world"
                        borderRadius={"xl"}
                        bg={"#339900"}
                      >
                        <Popover.Arrow />
                        <Popover.CloseButton />
                        <Popover.Header>Está tudo bem!</Popover.Header>
                        <Popover.Body>
                          O animal não precisa de vermifugação, hematócrito
                          maior que 27%.
                          <TextInput
                            placeholderTextColor="black"
                            onChangeText={setIdAnimal}
                            defaultValue={idAnimal}
                            placeholder="Insira o id do Animal"
                          ></TextInput>
                          <TextInput
                            placeholderTextColor="black"
                            onChangeText={setName}
                            defaultValue={name}
                            placeholder="Indique o Responsável"
                          ></TextInput>
                          <Button size="sm" onPress={() => saveAnimal(idAnimal, name, 'Está tudo bem, hematócrito maior que 27%.')}>Salvar</Button>
                        </Popover.Body>
                      </Popover.Content>
                    </Popover>
                    <Popover
                      trigger={(triggerProps) => {
                        return (
                          <Button
                            {...triggerProps}
                            colorScheme="rgb(250, 88, 88)"
                            size="lg"
                            mr={2}
                            borderWidth="1px"
                          ></Button>
                        );
                      }}
                    >
                      <Popover.Content
                        accessibilityLabel="hello world"
                        borderRadius={"xl"}
                        bg={"#99cc33"}
                      >
                        <Popover.Arrow />
                        <Popover.CloseButton />
                        <Popover.Header>Está tudo bem!</Popover.Header>
                        <Popover.Body>
                          O animal não precisa de vermifugação, hematócrito
                          entre 23 e 27%.
                          <TextInput
                            placeholderTextColor="black"
                            onChangeText={setIdAnimal}
                            defaultValue={idAnimal}
                            placeholder="Insira o id do Animal"
                          ></TextInput>
                          <TextInput
                            placeholderTextColor="black"
                            onChangeText={setName}
                            defaultValue={name}
                            placeholder="Indique o Responsável"
                          ></TextInput>
                          <Button size="sm" onPress={() => saveAnimal(idAnimal, name, 'Está tudo bem, hematócrito entre 23 e 27%.')}>Salvar</Button>
                        </Popover.Body>
                      </Popover.Content>
                    </Popover>

                    <Popover
                      trigger={(triggerProps) => {
                        return (
                          <Button
                            {...triggerProps}
                            colorScheme="rgb(245, 169, 169)"
                            size="lg"
                            mr={2}
                            borderWidth="1px"
                          ></Button>
                        );
                      }}
                    >
                      <Popover.Content
                        accessibilityLabel="hello world"
                        borderRadius={"xl"}
                        bg={"#ffcc00"}
                      >
                        <Popover.Arrow />
                        <Popover.CloseButton />
                        <Popover.Header>
                          Seu animal está anêmico!
                        </Popover.Header>
                        <Popover.Body>
                          Faça a vermifugação, hematócrito entre 18 e 22%.
                          <TextInput
                            placeholderTextColor="black"
                            onChangeText={setIdAnimal}
                            defaultValue={idAnimal}
                            placeholder="Insira o id do Animal"
                          ></TextInput>
                          <TextInput
                            placeholderTextColor="black"
                            onChangeText={setName}
                            defaultValue={name}
                            placeholder="Indique o Responsável"
                          ></TextInput>
                          <Button size="sm" onPress={() => saveAnimal(idAnimal, name, 'Faça a vermifugação, hematócrito entre 18 e 22%.')}>Salvar</Button>
                        </Popover.Body>
                      </Popover.Content>
                    </Popover>

                    <Popover
                      trigger={(triggerProps) => {
                        return (
                          <Button
                            {...triggerProps}
                            colorScheme="rgb(246, 206, 206)"
                            size="lg"
                            mr={2}
                            borderWidth="1px"
                          ></Button>
                        );
                      }}
                    >
                      <Popover.Content
                        accessibilityLabel="hello world"
                        borderRadius={"xl"}
                        bg={"#ff9966"}
                      >
                        <Popover.Arrow />
                        <Popover.CloseButton />
                        <Popover.Header>
                          Seu animal está muito anêmico!
                        </Popover.Header>
                        <Popover.Body>
                          Faça a vermifugação o quanto antes, hematócrito entre
                          13 a 17%.
                          <TextInput
                            placeholderTextColor="black"
                            onChangeText={setIdAnimal}
                            defaultValue={idAnimal}
                            placeholder="Insira o id do Animal"
                          ></TextInput>
                          <TextInput
                            placeholderTextColor="black"
                            onChangeText={setName}
                            defaultValue={name}
                            placeholder="Indique o Responsável"
                          ></TextInput>
                          <Button size="sm" onPress={() => saveAnimal(idAnimal, name, 'Faça a vermifugação o quanto antes, hematócrito entre 13 a 17%.')}>Salvar</Button>
                        </Popover.Body>
                      </Popover.Content>
                    </Popover>

                    <Popover
                      trigger={(triggerProps) => {
                        return (
                          <Button
                            {...triggerProps}
                            colorScheme="rgb(248, 224, 224)"
                            size="lg"
                            mr={2}
                            borderWidth="1px"
                          ></Button>
                        );
                      }}
                    >
                      <Popover.Content
                        accessibilityLabel="hello world"
                        borderRadius={"xl"}
                        bg={"#cc3300"}
                      >
                        <Popover.Arrow />
                        <Popover.CloseButton />
                        <Popover.Header>
                          Seu animal está extremanente anêmico!
                        </Popover.Header>
                        <Popover.Body>
                          Faça a vermifugação com urgência, hematócrito menor
                          que 13%.
                          <TextInput
                            placeholderTextColor="black"
                            onChangeText={setIdAnimal}
                            defaultValue={idAnimal}
                            placeholder="Insira o id do Animal"
                          ></TextInput>
                          <TextInput
                            placeholderTextColor="black"
                            onChangeText={setName}
                            defaultValue={name}
                            placeholder="Indique o Responsável"
                          ></TextInput>
                          <Button size="sm" onPress={() => saveAnimal(idAnimal, name, 'Faça a vermifugação com urgência, hematócrito menor que 13%.')}>Salvar</Button>
                        </Popover.Body>
                      </Popover.Content>
                    </Popover>
                  </Button.Group>
                </Flex>
              </>
            )}
          </Center>
        </NativeBaseProvider>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7f7f7",
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
  },
  button: {
    flex: 0.1,
    padding: 10,
    alignSelf: "flex-end",
    alignItems: "center",
  },
});
