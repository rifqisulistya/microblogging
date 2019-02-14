import React from 'react';
import { Alert, AppRegistry, Button, Dimensions, FlatList, Image, Platform, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { styles } from './StyleSheet.js';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import LinkPreview from 'react-native-link-preview';
import axios from 'react-native-axios';

class BlogScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      posts: [],
      title : "sample title",
      editMode: null
    };
  }

  handleChange = (text) => {
    this.setState({text})
  }

  handleHapus = (key) => {
    if (this.props._userid == key._userid) {
      var posts = this.state.posts
      var newPost = []
      for (i=0; i<posts.length; i++){
        if (key._id != posts[i]._id){
          newPost.push(posts[i])
        }
      }
      this.setState(
        {
          posts : newPost
        }    
      )
      console.log('key:', key)
      axios.delete('http://192.168.1.10:8081/mongodb/'+key._id)
      .then(function (response) {
        alert(response.data)
        console.log(response);

      })
      .catch(function (error) {
        alert(error.message)
        console.log(error);
      }); 
    } else {
    alert('You are not authorized to delete this post')
    }
  } 

  handlePost = () => {
    var regex = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?/;
    if (this.state.text == ""){
      alert('require input')
    }
    else if (this.state.text.match(regex)) {
      LinkPreview.getPreview(this.state.text)
      .then(data => {
        axios.post('http://192.168.1.10:8081/mongodb', 
          {
            title:data.title, 
            img:data.images[0],
            dsc:data.description,
            post:this.state.text,
            _userid:this.props._userid
          }
        )
        .then((response) => {
          alert(response.data)
          console.log(response);
          this.setState(
            {
              posts:
              [
                {
                  title:data.title, 
                  img:data.images[0],
                  dsc:data.description,
                  post:this.state.text,
                  _id:response.data._id,
                  _userid:this.props._userid
                  
                },
                ...this.state.posts
              ],
              text:''
            }
          );

        })
        .catch((error) => {
          alert(error.message)
          console.log(error);
        });
      });
    }
    else {
      console.log('masuk ke else')
      axios.post('http://192.168.1.10:8081/mongodb', 
        {
          title:'', 
          img:'',
          dsc:'',
          post:this.state.text,
          _userid:this.props._userid
        }
      )
      .then((response) => {
        console.log('dataid: ',response.data._id);
        this.setState(
          {
            posts:
            [
              {
                title:'', 
                img:'',
                dsc:'',
                post:this.state.text,
                _id:response.data._id,
                _userid:this.props._userid
              },
              ...this.state.posts
            ],
            text:''
          }
        );

      })
      .catch((error) => {
        alert(error.message)
        console.log(error);
      });
    }  
  }

  handleLongPress = (item) => {
    if (this.props._userid == item._userid) {
      this.setState(
        {
          text: item.post,
          editMode: item._id
        }
      )
      alert(this.state.text)
    } 
    else {
      alert('You are not Authorized to edit this post')
    }
  }

  handleEdit = (_id) => {
    var regex = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?/;
    if (this.state.text == ""){
      alert('require input')
    }
    else if (this.state.text.match(regex)) {
      LinkPreview.getPreview(this.state.text)
      .then(data => {
        axios.put('http://192.168.1.10:8081/mongodb/'+_id, 
          {
            title:data.title, 
            img:data.images[0],
            dsc:data.description,
            post:this.state.text
          }
        )
        .then((response) => {
          alert(response.data)
          console.log(response);
          var newPost = this.state.posts
          for (var i=0; i<newPost.length; i++) {
            if (newPost[i]._id == _id) {
              newPost[i] = {
                title:data.title, 
                img:data.images[0],
                dsc:data.description,
                post:this.state.text,
                _id: _id
              }  
            break
            }
          }
          this.setState(
            {
              posts : newPost,
              text: '',
              editMode: null
            }  
          )
        })
        .catch((error) => {
          alert(error.message)
          console.log(error);
        });
      });
    }
    else {
      axios.put('http://192.168.1.10:8081/mongodb/'+_id, 
          {
            title:'', 
            img:'',
            dsc:'',
            post:this.state.text
          }
        )
        .then((response) => {
          alert(response.data)
          console.log(response);
          var newPost = this.state.posts
          for (var i=0; i<newPost.length; i++) {
            if (newPost[i]._id == _id) {
              newPost[i] = {
                title:'', 
                img:'',
                dsc:'',
                post:this.state.text,
                _id: _id
              }  
            break
            }
          }
          this.setState(
            {
              posts : newPost,
              text: '',
              editMode: null
            }  
          )
        })
        .catch((error) => {
          alert(error.message)
          console.log(error);
        });
    }

  } 

  componentDidMount () {
    console.log(this.props)
    axios.get("http://192.168.1.10:8081/mongodb")
      .then (response => {
        this.setState({
          posts: response.data
        })
      })
      .catch(error => {
        console.log('err', error)
      }); 
  }

  renderImage = (param) => {
    if (param) {
      return (
        <Image source={{uri:param}} style={{width:100, height:100}}/>
      )
    }
  }

  renderItem = (obj) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onLongPress = {() => this.handleLongPress(obj.item)}
      > 
        <Text style={styles.itemText}>{obj.item.post}</Text>
        <Text style={styles.itemText}>{obj.item.title}</Text>
        {this.renderImage(obj.item.img)}
        <Button
          onPress={() => this.handleHapus(obj.item)}
          title="x"
        />
      </TouchableOpacity>
    );
  };

  renderButton = () => {
    if (this.state.editMode) {
      return (
        <Button
          onPress={() => this.handleEdit(this.state.editMode)}
          title="Edit it!"
        />
      )  
    }
    return (
        <Button
          onPress={this.handlePost}
          title="Post it!"
        />
      )
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Logout"
          onPress={() => {
            this.props.logout()
            const resetAction = StackActions.reset({
              actions: [NavigationActions.navigate({ routeName: 'Home' })],
            });
            alert('kelewat')
          }}
        /> 
        <Text style={styles.welcome}>Welcome to Blog Mobile App!</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Type here to post something!"
          onChangeText={this.handleChange}
          value={this.state.text}
        />
        {this.renderButton()}
        <FlatList
          data={this.state.posts}
          renderItem={(dasda) => this.renderItem(dasda)}
          keyExtractor = {(item,index) => item._id.toString()}
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
    logout: () => dispatch({ type: 'logout' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogScreen)
