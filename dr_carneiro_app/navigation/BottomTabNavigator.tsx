import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Home from '../screens/Home';
import ListaAnimais from '../screens/ListaAnimais';
import TesteVermifugacao from '../screens/TesteVermifugacao';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

//Configuração da navegação entre as telas do aplicativo
export default function BottomTabNavigator() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Doutor Carneiro" component={Home} />
      <Stack.Screen name="Teste de Vermifugação" component={TesteVermifugacao} />
      <Stack.Screen name="Lista de Animais" component={ListaAnimais} />
    </Stack.Navigator>
  );
}

function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="Doutor Carneiro"
        component={Home}
        options={{ headerTitle: 'Doutor Carneiro' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="Teste de Vermifugação"
        component={TesteVermifugacao}
        options={{ headerTitle: 'Teste de Vermifugação' }}
      />
    </TabTwoStack.Navigator>
  );
}
