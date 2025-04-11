

import React from 'react';
import { Modal, View, Image, StyleSheet, TouchableOpacity, ImageSourcePropType, Text } from 'react-native';

type Props = {
    visible: boolean,
    onClose?: () => void,
    imageSource?: ImageSourcePropType;
    centerText?: string;
}

const ImageModal = ({ visible, onClose, imageSource, centerText }: Props) => {
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
    // position: 'absolute',
    // top: '50%',
    // left: '50%',
    alignSelf: 'center'
  }
});
