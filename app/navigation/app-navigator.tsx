import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {Scan, Result} from '../screens';

const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        stackAnimation: 'default',
        gestureEnabled: true,
        headerShown: false,
      }}
      initialRouteName={'HomeScreen'}>
      <Stack.Screen name={'ScanScreen'} component={Scan} />
      <Stack.Screen
        name={'ResultScreen'}
        component={Result}
        options={{stackPresentation: 'modal'}}
      />
    </Stack.Navigator>
  );
};
