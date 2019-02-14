import React from 'react';
import { View, TextInput } from 'react-native';
import {styles} from './StyleSheet.js';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import axios from 'react-native-axios';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      userid: '',
      pass: '',
    };
  }

  componentDidMount() {
    console.log(this.props)
    if (this.props.username){
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
    if (this.state.user == '' || this.state.pass == '' ) {
      alert('Require Input')
    }
    console.log(this.state)
    axios.post('http://192.168.1.10:8081/mongodblogin', 
      {
        username : this.state.user,
        password : this.state.pass,
      }
    )
    .then((response) => {
        console.log('dataid: ',response.data._id);
        this.setState(
          {
            user : response.data.username,
            userid : response.data._id
          }
        );
      alert('login berhasil')
      this.props.login(this.state.user, this.state.userid)
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Blog' })],
      });
      this.props.navigation.dispatch(resetAction);
      })
      .catch((error) => {
        alert(error.message)
        console.log(error);
      });
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
        username: state.username,
        _userid: state._userid
    }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (username, _userid) => {
      console.log("username: ", username)
      console.log("_userid: ", _userid)
      return dispatch({ type: 'login', payload: {
        username,
        _userid
      }})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)