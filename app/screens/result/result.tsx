import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageStyle,
  StatusBar,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import storage from '@react-native-firebase/storage';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import Placeholder from '../assets/placeholder.svg';
import Cross from '../assets/cross.svg';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#192954',
  } as ViewStyle,

  CrossIcon: {
    position: 'absolute',
    zIndex: 2,
    height: 20,
    width: 20,
    top: 40,
    left: 10,
  } as ViewStyle,

  ProfileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
  } as ImageStyle,
  ImageContainer: {
    position: 'absolute',
    top: 60,
    borderRadius: 100,
    height: 100,
    width: 100,
    alignSelf: 'center',
    zIndex: 1,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    justifyContent: 'center',
  } as ViewStyle,

  ImagePlaceholder: {
    alignSelf: 'center',
    borderRadius: 45,
  } as ImageStyle,

  OutputContainer: {
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
  } as ViewStyle,

  AppointeeNameContainer: {
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 40,
  } as ViewStyle,

  AppointeeName: {
    fontSize: 35,
    marginTop: 65,
    fontWeight: '800',
    textAlign: 'center',
    color: '#FFFFFF',
  } as ViewStyle,

  SubText: {
    fontSize: 20,
    marginVertical: 30,
    fontWeight: '500',
    color: '#9b9ca5',
    textAlign: 'center',
  } as TextStyle,

  FD_ROW: {
    flexDirection: 'row',
  } as ViewStyle,

  Time: {
    fontSize: 55,
    letterSpacing: 2,
    fontWeight: '600',
    color: '#ff0000',
    textAlign: 'center',
  } as TextStyle,

  Meridian: {
    fontSize: 55,
    letterSpacing: 2,
    fontWeight: '600',
    color: '#5da4ff',
    textAlign: 'center',
  } as TextStyle,

  Date: {
    fontSize: 55,
    letterSpacing: 2,
    fontWeight: '600',
    color: '#5da4ff',
    textAlign: 'center',
  } as TextStyle,

  Month: {
    fontSize: 55,
    letterSpacing: 2,
    fontWeight: '600',
    color: '#ff0000',
    textAlign: 'center',
  } as TextStyle,

  Year: {
    fontSize: 50,
    letterSpacing: 2,
    fontWeight: '600',
    color: '#0183ff',
    textAlign: 'center',
  } as TextStyle,

  OtherQRContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,

  OtherQROutput: {
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'center',
  } as TextStyle,

  AppointerName: {
    fontSize: 35,
    fontWeight: '800',
    color: '#FFFFFF',
  } as TextStyle,

  ErrorContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
  } as ViewStyle,

  Error: {
    fontSize: 20,
    color: '#FFFFFF',
    alignSelf: 'center',
  } as TextStyle,
});

export const Result = (props: {route: {params: {data: any}}}) => {
  const output = props?.route?.params?.data || '';

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
    <SafeAreaView style={styles.Container} edges={['top']}>
      <StatusBar
        translucent={true}
        animated={true}
        barStyle={'light-content'}
      />
      <Cross
        width={20}
        height={20}
        style={styles.CrossIcon}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      {output?.isFromBookAppointment ? (
        <>
          <View style={[styles.ImageContainer, {borderWidth: uri ? 0 : 2}]}>
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
                style={styles.ImagePlaceholder}
              />
            )}
          </View>
          {error ? (
            <View style={[styles.OutputContainer, styles.ErrorContainer]}>
              <Text style={styles.Error}>{error}</Text>
            </View>
          ) : (
            <View style={styles.OutputContainer}>
              <View style={styles.AppointeeNameContainer}>
                <Text style={styles.AppointeeName}>
                  {output.data.appointeeName}
                </Text>
                <Text style={styles.SubText}>have an appointment with</Text>
                <Text style={styles.AppointerName}>
                  {output.data.appointerName}
                </Text>
                <Text style={styles.SubText}>on</Text>
                <View style={styles.FD_ROW}>
                  <Text style={styles.Time}>{getTime(0)} </Text>
                  <Text style={styles.Meridian}>{getTime(1)}</Text>
                </View>
                <View style={styles.FD_ROW}>
                  <Text style={styles.Date}>{getDate(0)} </Text>
                  <Text style={styles.Month}>{getDate(1)}</Text>
                </View>
                <Text style={styles.Year}>{getYear()}</Text>
              </View>
            </View>
          )}
        </>
      ) : (
        <View style={styles.OtherQRContainer}>
          <Text style={styles.OtherQROutput}>{output.data}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};
