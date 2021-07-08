import React, { useEffect, useState } from "react";
import { VStack, Image, Center, NativeBaseProvider, Button, Spacer, Text } from "native-base";
import { ScrollView, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navigation from "../navigation";

export default function ListaAnimais({ navigation }) {
  const [animal, setAnimal] = useState();
  const [keys, setKeys] = useState();
  const [key, setKey] = useState();
  let parsed;

  //Buscar registro do animal na memória.
  const getItem = async (key) => {
    AsyncStorage.getItem(key).then((item) => {
      parsed = JSON.parse(item);
      setAnimal(parsed);
      setKey(key);
    })
  }
  //Remover registro do animal da memória do aplicativo.
  const removeItem = async (key) => {
    AsyncStorage.removeItem(key);
    navigation.navigate('Doutor Carneiro');
  }

  //Ler todos os registros de animais salvos no aplicativo.
  const readData = async () => {
    try {
      const keys_aux = await AsyncStorage.getAllKeys();
      setKeys(keys_aux);
      console.log(JSON.stringify(keys))
    } catch (e) {
      alert('Sem dados!')
    }
  }


  useEffect(() => {
    readData()
  }, [])

  //Retorna a lista de registros e ao clicar em um, renderiza a tela de exibição dos detalhes do animal.
  return (
    <NativeBaseProvider>
      <ScrollView>
        {!animal ? (
          keys?.map((key) => (
            <>
              <Button margin={5} size="sm" onPress={() => getItem(key)}>
                {key}
              </Button>
              <Spacer />
            </>
          ))) : (
          <VStack space={2} alignItems="center" safeAreaTop my={6}>
            <Image
              size={'2xl'}
              resizeMode="cover"
              source={{ uri: animal?.imagem }}
              alt={"Registro_Animal"}
            />
            <Text fontSize="md">Id do Animal: {animal?.idAnimal}</Text>
            <Text fontSize="md">Nome do Responsável: {animal?.responsavel}</Text>
            <Text fontSize="md">Data de Registro: {animal?.data}</Text>
            <Text marginLeft="5" marginRight="5" fontSize="md">Diagnóstico: {animal?.diagnosticoAnimal}</Text>
            <Button marginBottom="5" marginTop="5" size="sm" onPress={() => removeItem(key)}>Remover</Button>
          </VStack>
        )}
      </ScrollView>
    </NativeBaseProvider>
  );
}
