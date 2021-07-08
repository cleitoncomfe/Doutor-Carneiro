import React from "react"
import { Image, Center, NativeBaseProvider, Button, Spacer, Flex } from "native-base"
var firstImage = require('../assets/images/logo.jpeg');

//Tela inicial, onde é exibida a logo do aplicativo e o menu.
export function Logo() {
  return (
    <Image
      source={require('../assets/images/logo.jpeg')}
      alt="Alternate Text"
      size={200}
    />
  )
}

export default ({ navigation }) => {
  return (
    <NativeBaseProvider >
      <Center flex={1} bgColor='#f7f7f7' mb={20}>
        <Logo />

        <Flex h={200} w={300} mt={10}>
          <Button marginBottom="5" size="sm" onPress={() => navigation.navigate('Teste de Vermifugação')}>
            Teste de Vermifugação
      </Button>
          <Spacer />
          <Button marginBottom="5" size="sm" onPress={() => navigation.navigate('Lista de Animais')}>
            Lista de Animais
      </Button>
          <Spacer />
          <Button marginBottom="5" size="sm" disabled>
            Manejo de Animais Doentes
      </Button>
          <Spacer />
          <Button marginBottom="5" size="sm" disabled>
            Conheça as Principais Doenças
      </Button>
          <Spacer />
          <Button marginBottom="5" size="sm" disabled>
            Encontre um Hospital Veterinário
      </Button>
        </Flex>
      </Center>
    </NativeBaseProvider>
  )
}