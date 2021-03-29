import React from 'react';

import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export const Scan = props => {
  const onSuccess = e => {
    console.log('e', e.data);
    props.navigation.navigate({name: 'ResultScreen', params: {data: e.data}});
  };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      flashMode={RNCamera.Constants.FlashMode.off}
      bottomContent={
        <>
          {/* Flash */}
          <TouchableOpacity
            style={styles.buttonTouchable}
            onPress={() =>
              props.navigation.navigate({name: 'ResultScreen', params: {}})
            }>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        </>
      }
    />
  );
};
