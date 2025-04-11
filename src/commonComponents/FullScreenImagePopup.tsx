

import React from 'react';
import { Modal, View, Image, StyleSheet, TouchableOpacity, ImageSourcePropType, Text, Button } from 'react-native';
import { ScreenNames } from '../navigation/screenMapping';

type Props = {
    visible: boolean,
    onClose?: () => void,
    imageSource?: ImageSourcePropType;
    centerText?: string;
    retry?: boolean;
    navigation?: any;
}

const ImageModal = ({ visible, onClose, imageSource, centerText, retry, navigation }: Props) => {

  const handleOnRetryPress = () => {
        navigation?.replace(ScreenNames.GAME_PLAY_SCREEN)
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <TouchableOpacity style={styles.touchableArea} activeOpacity={1} onPress={onClose}>
          {imageSource? <Image source={imageSource} style={styles.image} />: null}
          {centerText? <Text style={styles.centerText}>{centerText}</Text>: null}
          {retry ? (
            <TouchableOpacity style={styles.retryButton} onPress={handleOnRetryPress}>
              <Text style={styles.ctaText}>{'Play again'}</Text>
              </TouchableOpacity>
          ): null}
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ImageModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  centerText: {
    fontSize: 72,
    fontWeight: '900',
    color: 'skyblue',
    alignSelf: 'center',
    marginBottom: 64,
  },
  button: {
    marginVertical: 16,
    width: '100%',
  },
  ctaText: {
    color: 'white'
  },
  retryButton: {
    backgroundColor: 'red', 
    padding: 16
  }
});
