import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const styles = StyleSheet.create({
  BottomContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#2b3a66',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const Scan = props => {
  const onSuccess = e => {
    props.navigation.navigate({name: 'ResultScreen', params: {data: e.data}});
  };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      flashMode={RNCamera.Constants.FlashMode.off}
      topContent={
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#192954',
          }}>
          <Text style={{fontSize: 35, fontWeight: '600', color: '#FFFFFF'}}>
            Scan QR code
          </Text>
        </View>
      }
      bottomContent={
        <>
          <View style={styles.BottomContainer}>
            <Text
              style={{
                color: '#FFFFFF',
                textAlign: 'center',
                marginHorizontal: 20,
                fontWeight: '500',
              }}>
              This QR code scanner is specifically designed to scan QR code
              generated by Book Appointment app. Other QR codes' output cannot
              be guaranteed.
            </Text>
          </View>
        </>
      }
    />
  );
};
