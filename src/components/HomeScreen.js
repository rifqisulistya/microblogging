import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import {styles} from './StyleSheet.js';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
    };
  }

  componentDidMount() {
    console.log(this.props)
    if (this.props.username == 'U'){
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Blog' })],
      });
      this.props.navigation.dispatch(resetAction);  
    }
  }
  
  handleUser = (text) => {
    this.setState(
      {
        user: text
      }
    )
  }

  handlePass = (text) => {
    this.setState(
      {
        pass: text
      }
    )
  }

  handleLogin = () => {
    if (this.state.user == 'U' && this.state.pass == 'P') {
      this.props.login(this.state.user)
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Blog' })],
      });
      this.props.navigation.dispatch(resetAction);
    }
    else if (this.state.user == 'U' && this.state.pass != 'P') {
      alert('Wrong password')
    }
    else if  (this.state.user != 'U' && this.state.pass == 'P') {
      alert('Wrong username')
    }
    else {alert ('Wrong username & password')}
  }
  
  componentWillMount(){

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to BlogMobile App!</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          onChangeText={this.handleUser}
          value={this.state.text}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={this.handlePass}
          value={this.state.text}
        />
        <Button
          title="Login"
          onPress={() => this.handleLogin()}
        />          
      </View>
    );
  }  
}

function mapStateToProps(state) {
    return {
        username: state.username
    }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (username) => {
      console.log("username: ", username)
      return dispatch({ type: 'login', payload: username})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)