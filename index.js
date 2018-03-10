import React from 'react';
import { AppRegistry } from 'react-native';

// Redux with Rematch
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import selectorsPlugin from '@rematch/select';

import I18n from 'react-native-i18n';
import ScreenSwitcher from 'react-native-device-screen-switcher';

// projet imports
import AppRoot from 'AppRoot';
import * as models from 'models';
import * as translations from 'i18n';

I18n.fallbacks = true;
I18n.translations = translations;

const store = init({ models, plugins: [selectorsPlugin()] });

const ReduxApp = () => (
  <Provider store={store}>
    <AppRoot />
  </Provider>
);

const ResponsiveApp = () => {
  if (__DEV__) {
    return (
      <ScreenSwitcher>
        <ReduxApp />
      </ScreenSwitcher>
    );
  }

  return <ReduxApp />;
};

AppRegistry.registerComponent('ZenStarter', () => ResponsiveApp);
