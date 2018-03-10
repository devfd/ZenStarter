import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import I18n from 'react-native-i18n';

import { dispatch } from '@rematch/core';

import Logo from 'images/logo.png';
import ActionButton from 'components/ActionButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '20%',
    backgroundColor: 'white',
    alignItems: 'center',
  },

  header: {
    height: 200,
    width: 200,
    borderRadius: 100,
    resizeMode: 'contain',
  },
});

const AuthScreen = () => (
  <View style={styles.container}>
    <Image style={styles.header} source={Logo} />
    <View style={{ marginTop: 50 }}>
      <Text>Zen Starter</Text>
      <Text>Minimalist production-ready demo project.</Text>
      <ActionButton text={I18n.t('auth.signin')} onPress={() => dispatch.app.signIn()} />
    </View>
  </View>
);

export default AuthScreen;
