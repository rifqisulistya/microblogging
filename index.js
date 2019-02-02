/** @format */
import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import HomeScreen from './src/components/HomeScreen';
import BlogScreen from './src/components/BlogScreen';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import { AsyncStorage } from 'react-native'

const HomeAppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Blog: {
    screen: BlogScreen,
  },
}, {
    initialRouteName: 'Home',
});

const BlogAppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Blog: {
    screen: BlogScreen,
  },
}, {
    initialRouteName: 'Blog',
});

const HomeApp = createAppContainer(HomeAppNavigator);
const BlogApp = createAppContainer(BlogAppNavigator);

const Microblogging = () => {
	if (store.getState().username) {
		return <BlogApp/>
	}
	return <HomeApp/>
}

const initialState = {
    username: ''
}

const persistConfig = {
  key: 'store',
  storage: AsyncStorage,
}

const reducer = (state = initialState, action) => {
  console.log("action: ", action)
  console.log(state)
  switch (action.type) {
      case 'login':
          console.log('masuk login')
          return { username: action.payload }
      case 'logout':
          return { username: '' }
      default: return state
  }
}

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer) 

export const persistor = persistStore(store);

export default store

AppRegistry.registerComponent(appName, () => () => {
	return (
		<Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      	<HomeApp/>
      </PersistGate>	  
    </Provider>
  )
}) 