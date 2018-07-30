import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './Components/common';
import LoginForm from './Components/LoginForm';

/*
App that demonstrates basic authentication functionality using firebase
authentication
*/
class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyB2QXAroMv1ovsgWCmp37H02pA8lnxjN5E',
      authDomain: 'authreact-b721a.firebaseapp.com',
      databaseURL: 'https://authreact-b721a.firebaseio.com',
      projectId: 'authreact-b721a',
      storageBucket: 'authreact-b721a.appspot.com',
      messagingSenderId: '527396315260'
    });

    firebase.auth().onAuthStateChanged( (user) => {
      if(user) {
        this.setState({loggedIn: true});
      }else{
        this.setState({loggedIn: false});
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn){
      case true:
        return (
          <View>
            <Button onPress={() => firebase.auth().signOut()}>
              Log out
            </Button>
          </View>
        );
      case false:
        return <LoginForm/>;
      default:
        return(
          <View style={{paddingTop: 50}}>
            <Spinner size="large" />
          </View>
        );
    }
  }

  render () {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}
export default App;
