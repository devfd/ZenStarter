import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { connect } from 'react-redux';
import { select } from '@rematch/select';

import ActionButton from 'components/ActionButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 35,
    backgroundColor: 'white',
  },

  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
});

class ProfileScreen extends React.Component {
  signOut = () => {
    this.props.signOut();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>

        <Text style={styles.welcome}>Hello {this.props.userName}</Text>

        <View style={{ marginTop: 0 }}>
          <ActionButton onPress={this.signOut} text="Signout now" />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userName: select.app.userName(state),
});

const mapDispatchToProps = ({ app }) => ({
  signOut: app.signOut,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
