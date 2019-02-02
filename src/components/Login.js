import React, { Component } from "react";
import {
    View,
    Text,
    TouchableHighlight
} from "react-native";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions';

function mapStateToProps(state) {
	return {
		user: state.userReducers.user
	};
}

function mapDispatchToProps(dispatch) {
	return 
		bindActionCreators(Actions, dispatch);
}

class Login extends Component{
	onLoginButtonPress(){
		this.props.login({
			userName: 'testuser',
			password: 'pass'
		});
	}

	render() {
		return (
			<View>
				{
					!this.props.user.loggedIn &&
						<TouchableHighlight onPress ={this.onLoginButtonPress}>
							<Text>
								Log In
							</Text>	
						</TouchableHighlight>
				}
			</View>
		)
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (Login)