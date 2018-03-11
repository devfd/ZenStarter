import { AsyncStorage } from 'react-native';

export default {
  state: {
    loading: true,
    user: null,
  },

  selectors: {
    isLoading: state => state.loading,
    userName: state => state.user.name,
  },

  reducers: {
    didFinishLoading(state, { user } = {}) {
      return { ...state, loading: false, user };
    },

    updateUser(state, { user } = {}) {
      return { ...state, user };
    },
  },

  effects: {
    async startApp() {
      const rawUser = await AsyncStorage.getItem('user');
      if (!rawUser) {
        return this.didFinishLoading();
      }

      const user = JSON.parse(rawUser);
      await new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });
      return this.didFinishLoading({ user });
    },

    async signIn() {
      const user = { name: 'User1' };
      await AsyncStorage.setItem('user', JSON.stringify(user));
      return this.updateUser({ user });
    },

    async signOut() {
      await AsyncStorage.removeItem('user');
      return this.updateUser({ user: null });
    },
  },
};
