import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

import { elevation } from 'theme/Utils';
import Colors from 'theme/Colors';

const styles = StyleSheet.create({
  cta: {
    flexDirection: 'row',
    marginTop: 40,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    ...elevation(6),
  },

  text: {
    color: 'white',
  },

  image: {
    width: 16,
    height: 16,
    marginLeft: 5,
    resizeMode: 'contain',
  },
});

const ActionButton = ({ onPress, text, image, backgroundColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.cta, { backgroundColor }]}>
    <Text style={styles.text}>{text}</Text>
    {image && <Image source={image} style={styles.image} />}
  </TouchableOpacity>
);

ActionButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  image: PropTypes.number,
};

ActionButton.defaultProps = {
  backgroundColor: Colors.BLUE,
  image: null,
};

export default ActionButton;
