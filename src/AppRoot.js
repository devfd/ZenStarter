import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { select } from '@rematch/select';
import SplashScreen from 'react-native-splash-screen';

import AuthScreen from 'screens/AuthScreen';
import HomeNavigator from 'screens/Home/Navigator';

class AppRoot extends React.Component {
  componentDidMount() {
    this.props.startApp();
  }

  componentDidUpdate() {
    if (!this.props.isLoading) {
      SplashScreen.hide();
    }
  }

  render() {
    const { isLoading, user } = this.props;

    if (isLoading) {
      return null;
    }

    if (!user) {
      return <AuthScreen />;
    }

    return <HomeNavigator />;
  }
}

AppRoot.propTypes = {
  startApp: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

AppRoot.defaultProps = {
  user: null,
};

const mapStateToProps = state => ({
  isLoading: select.app.isLoading(state),
  user: state.app.user,
});

const mapDispatchToProps = ({ app }) => ({
  startApp: app.startApp,
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
