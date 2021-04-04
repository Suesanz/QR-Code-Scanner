import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import storage from '@react-native-firebase/storage';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import Placeholder from '../assets/placeholder.svg';

const styles = StyleSheet.create({
  ProfileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
  } as ImageStyle,
});

export const Result = (props: {route: {params: {data: any}}}) => {
  const output = props?.route?.params?.data || '';
  console.log('data', output, typeof output);

  const [isImageLoading, setIsImageLoading] = useState(false);
  const [uri, setUri] = useState('');
  const circularProgressRef = useRef<AnimatedCircularProgress>(null);
  const [error, setError] = useState('');

  const getAppointmentTime = () => output.data.appointmentTime.split(',');

  const getDate = (index: number) => {
    const appointmentTime = getAppointmentTime();
    return appointmentTime[1].substring(2).split(' ')[index];
  };

  const getYear = () => {
    const appointmentTime = getAppointmentTime();
    return appointmentTime[2];
  };

  const getTime = (index: number) => {
    const appointmentTime = getAppointmentTime();
    return appointmentTime[0].split(' ')[index] || 0;
  };

  useEffect(() => {
    (async () => {
      if (output?.isFromBookAppointment) {
        setIsImageLoading(true);
        try {
          const url = await storage()
            .ref(`${output.data.appointeeEmail}-profile-image.png`)
            .getDownloadURL();
          console.log('url', url);
          setUri(url);
        } catch (e) {
          setError('Data cannot be fetched. Please try again!');
        }
        setIsImageLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#192954'}} edges={['top']}>
      {output?.isFromBookAppointment ? (
        <>
          <View
            style={{
              position: 'absolute',
              top: 60,
              borderRadius: 100,
              borderWidth: uri ? 0 : 2,
              height: 100,
              width: 100,
              alignSelf: 'center',
              zIndex: 1,
              backgroundColor: '#FFFFFF',
              overflow: 'hidden',
              justifyContent: 'center',
            }}>
            {isImageLoading ? (
              <ActivityIndicator size={'small'} color={'grey'} />
            ) : uri ? (
              <AnimatedCircularProgress
                ref={circularProgressRef}
                size={100}
                width={5}
                fill={0}
                prefill={0}
                tintColor="#0183ff"
                backgroundColor="#FFFFFF">
                {() => (
                  <Image
                    source={{uri}}
                    resizeMode={'cover'}
                    style={styles.ProfileImage}
                    defaultSource={require('../assets/profile-default-placeholder.png')}
                    onProgress={({nativeEvent: {loaded, total}}) => {
                      circularProgressRef.current &&
                        circularProgressRef.current.animate(
                          (100 / total) * loaded,
                          500,
                        );
                    }}
                  />
                )}
              </AnimatedCircularProgress>
            ) : (
              <Placeholder
                width={105}
                height={105}
                style={{
                  alignSelf: 'center',
                  borderRadius: 45,
                }}
              />
            )}
          </View>
          <View
            style={{
              flex: 1,
              borderWidth: 2.5,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              marginTop: 75,
              alignItems: 'center',
              borderColor: '#afb0ba',
              marginHorizontal: -10,
              marginBottom: -5,
              backgroundColor: '#2b3a66',
            }}>
            <View
              style={{
                alignItems: 'center',
                height: '100%',
                paddingHorizontal: 40,
              }}>
              <Text
                style={{
                  fontSize: 35,
                  marginTop: 65,
                  fontWeight: '800',
                  textAlign: 'center',
                  color: '#FFFFFF',
                }}>
                {output.data.appointeeName}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  marginVertical: 30,
                  fontWeight: '500',
                  color: '#9b9ca5',
                  textAlign: 'center',
                }}>
                have an appointment with
              </Text>
              <Text style={{fontSize: 35, fontWeight: '800', color: '#FFFFFF'}}>
                {output.data.appointerName}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 25,
                  marginBottom: 30,
                  fontWeight: '500',
                  color: '#9b9ca5',
                  textAlign: 'center',
                }}>
                on
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 55,
                    letterSpacing: 2,
                    fontWeight: '600',
                    color: '#ff0000',
                    textAlign: 'center',
                  }}>
                  {getTime(0)}{' '}
                </Text>
                <Text
                  style={{
                    fontSize: 55,
                    letterSpacing: 2,
                    fontWeight: '600',
                    color: '#5da4ff',
                    textAlign: 'center',
                  }}>
                  {getTime(1)}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 55,
                    letterSpacing: 2,
                    fontWeight: '600',
                    color: '#5da4ff',
                    textAlign: 'center',
                  }}>
                  {getDate(0)}{' '}
                </Text>
                <Text
                  style={{
                    fontSize: 55,
                    letterSpacing: 2,
                    fontWeight: '600',
                    color: '#ff0000',
                    textAlign: 'center',
                  }}>
                  {getDate(1)}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 50,
                  letterSpacing: 2,
                  fontWeight: '600',
                  color: '#0183ff',
                  textAlign: 'center',
                }}>
                {getYear()}
              </Text>
            </View>
          </View>
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 22, color: '#FFFFFF', textAlign: 'center'}}>
            {output.data}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};
