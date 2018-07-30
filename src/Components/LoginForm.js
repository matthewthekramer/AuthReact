import React, { Component } from 'react';
import { Text} from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

//contains basic email + password fields to submit auth request to firebase server
class LoginForm extends Component{
  state = { email: '', password: '', error: '', loading: false};

  onButtonPress() {
      this.setState({error: '', loading: true});
      firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .then(this.onLoginSuccess.bind(this)) //.bind cuz we don't know context this will be used in
        .catch(() => {
          firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFailure.bind(this));
        });
  }

  onLoginFailure() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: 'Authenication Failed'
    });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  renderButton() {
    if(this.state.loading){
      return <Spinner size="small"/>;
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>Log in</Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder="user@gmail.com"
            label="Email"
            value={this.state.email}
            onChangeText={text => this.setState({email: text})}
            style={{ height: 80, width: 100 }}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            placeholder='password'
            label='Password'
            value={this.state.password}
            onChangeText={text => this.setState({password: text})}
          />
        </CardSection>

        <Text style={styles.errorStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>

      </Card>
    );
  }
}

const styles = {
  errorStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}
export default LoginForm;
