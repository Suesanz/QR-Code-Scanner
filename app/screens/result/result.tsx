import React from 'react';

import {Image, StatusBar, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export const Result = props => {
  // const data = props.route.params.data;
  const data = {
    appointmentTime: 'Mar 20, 2021',
    appointerName: 'Sourav',
    appointeeName: 'Gourav',
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        animated={true}
        translucent={true}
        barStyle={'light-content'}
      />
      <View
        style={{
          position: 'absolute',
          top: 60,
          borderRadius: 100,
          borderWidth: 2,
          height: 100,
          width: 100,
          alignSelf: 'center',
          zIndex: 1,
          backgroundColor: '#FFFFFF',
        }}>
        <Image
          style={{flex: 1, borderRadius: 100}}
          source={{uri: 'https://picsum.photos/200/300'}}
        />
      </View>
      <View
        style={{
          flex: 1,
          borderWidth: 2,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          marginTop: 75,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'red',
        }}>
        <Text style={{fontSize: 35}}>{data.appointeeName}</Text>
        <Text style={{fontSize: 18}}>have an appointment with</Text>
        <Text style={{fontSize: 35}}>{data.appointerName}</Text>
        <Text style={{fontSize: 18}}>on</Text>
        <Text style={{fontSize: 35}}>{data.appointmentTime}</Text>
      </View>
    </SafeAreaView>
  );
};
