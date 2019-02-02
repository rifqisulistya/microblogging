import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import {styles} from './src/components/StyleSheet.js';
import HomeScreen from './src/components/HomeScreen';
import BlogScreen from './src/components/BlogScreen';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const initialState = {
    username: ''
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'login':
            return { username: action.payload }
        case 'logout':
            return { username: '' }
    }
    return state
}

const store = createStore(reducer)

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View>        
          <HomeScreen/>
          <BlogScreen/>
        </View>  
      </Provider>  
    );
  }  
}



