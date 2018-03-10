import React from 'react';

import { StyleSheet, Text, View, Platform } from 'react-native';

import Config from 'react-native-config';
import { getLanguages } from 'react-native-i18n';

import ActionButton from 'components/ActionButton';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
  },

  container: {
    flex: 1,
    padding: 20,
    paddingTop: 35,
    backgroundColor: 'white',
  },

  appInfo: {
    marginBottom: 5,
  },

  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 20,
  },
});

class SettingsScreen extends React.Component {
  state = {
    lang: [],
  };

  componentDidMount() {
    getLanguages().then(lang => this.setState({ lang }));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>

        <Text style={styles.instructions}>{instructions}</Text>

        <View style={{ marginTop: 0 }}>
          <Text style={styles.appInfo}>APP_NAME: {Config.APP_NAME}</Text>
          <Text style={styles.appInfo}>APP_VERSION: {Config.APP_VERSION}</Text>
          <Text style={styles.appInfo}>APP_ID: {Config.APP_ID}</Text>
          <Text style={styles.appInfo}>LANG: {JSON.stringify(this.state.lang)}</Text>
        </View>
      </View>
    );
  }
}

export default SettingsScreen;
