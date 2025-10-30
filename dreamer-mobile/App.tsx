import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

import { RootStackParamList } from './src/types';
import LandingScreen from './src/screens/LandingScreen';
import BuilderScreen from './src/screens/BuilderScreen';
import StoryboardScreen from './src/screens/StoryboardScreen';
import VisualSequenceEditorScreen from './src/screens/VisualSequenceEditorScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName="Landing"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#000000',
            },
            headerTintColor: '#F59E0B',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            cardStyle: {
              backgroundColor: '#000000',
            },
          }}
        >
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Builder"
            component={BuilderScreen}
            options={{ title: 'Dreamer Builder' }}
          />
          <Stack.Screen
            name="Storyboard"
            component={StoryboardScreen}
            options={{ title: 'Script to Storyboard' }}
          />
          <Stack.Screen
            name="VisualSequenceEditor"
            component={VisualSequenceEditorScreen}
            options={{ title: 'Visual Sequence Editor' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
