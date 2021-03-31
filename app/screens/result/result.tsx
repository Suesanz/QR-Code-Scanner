import React from 'react';

import {Image, StatusBar, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export const Result = () => {
  // const data = props.route.params.data;
  const data = {
    appointmentTime: '9:30 PM, Mar 20, 2021',
    appointerName: 'Sourav Yadav',
    appointeeName: 'Gourav Yadav',
  };

  const appointmentTime = data.appointmentTime.split(',');
  const time = appointmentTime[0].split(' ');
  const date = appointmentTime[1].substring(1).split(' ');
  const year = appointmentTime[2];

  return (
    <SafeAreaView style={{flex: 1}} edges={['top']}>
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
        }}>
        <Image
          style={{flex: 1, borderRadius: 100}}
          source={{uri: 'https://picsum.photos/200/300'}}
        />
      </View>
      <View
        style={{
          flex: 1,
          borderWidth: 5,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          marginTop: 75,
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
        }}>
        <View
          style={{
            alignItems: 'center',
            height: '100%',
            paddingHorizontal: 40,
          }}>
          <Text style={{fontSize: 35, marginTop: 65, fontWeight: '800'}}>
            {data.appointeeName}
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginVertical: 30,
              fontWeight: '500',
              color: '#4F5266',
            }}>
            have an appointment with
          </Text>
          <Text style={{fontSize: 35, fontWeight: '800'}}>
            {data.appointerName}
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginTop: 25,
              marginBottom: 30,
              fontWeight: '500',
              color: '#4F5266',
            }}>
            on
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 55, letterSpacing:2,fontWeight: '600', color: '#dd3333'}}>
              {time[0]}{' '}
            </Text>
            <Text style={{fontSize: 55, letterSpacing:2,fontWeight: '600', color: '#3797F1'}}>
              {time[1]}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 55, letterSpacing:2,fontWeight: '600', color: '#3797F1'}}>
              {date[0]}{' '}
            </Text>
            <Text style={{fontSize: 55, letterSpacing:2,fontWeight: '600', color: '#dd3333'}}>
              {date[1]}
            </Text>
          </View>
          <Text style={{fontSize: 50, letterSpacing:2,fontWeight: '600', color: '#0175E3'}}>
            {year}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
