import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header } from './Components/common';
import LoginForm from './Components/LoginForm';


class App extends Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyB2QXAroMv1ovsgWCmp37H02pA8lnxjN5E',
      authDomain: 'authreact-b721a.firebaseapp.com',
      databaseURL: 'https://authreact-b721a.firebaseio.com',
      projectId: 'authreact-b721a',
      storageBucket: 'authreact-b721a.appspot.com',
      messagingSenderId: '527396315260'
    });
  }
  render () {
    return (
      <View>
        <Header headerText="Authentication" />
        <LoginForm />
      </View>
    );
  }
}
export default App;
