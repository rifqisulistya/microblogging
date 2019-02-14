import React from 'react';
import { View, TextInput } from 'react-native';
import {styles} from './StyleSheet.js';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import axios from 'react-native-axios';
import { Button, Container, Header, Title, Content, Footer, Form, FooterTab, Item, Input, Left, Right, Body, Icon, Text } from 'native-base';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

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
    axios.post('http://192.168.1.12:8081/mongodblogin', 
      {
        username : this.state.user,
        password : this.state.pass,
      }
    )
    .then((response) => {
        if (response.data._id != null) {
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
        } else {
          alert('login gagal')
      }
    })
    .catch((error) => {
      alert(error.message)
      console.log(error);
    });
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>BlogMobile</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text style={styles.welcome}>Welcome to BlogMobile App!</Text>
          <Form>
            <Item>
              <Input 
                placeholder="Username" 
                onChangeText={this.handleUser}
                value={this.state.text}
              />
            </Item>
            <Item last>
              <Input 
                placeholder="Password" 
                onChangeText={this.handlePass}
                value={this.state.text}
              />
            </Item>
          </Form>
          <Body>
            <Button 
              onPress={() => this.handleLogin()}
            >
              <Text>Sign in</Text>
            </Button>
          </Body> 
        </Content>
      </Container>
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