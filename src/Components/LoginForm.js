import React, { Component } from 'react';
import { Text} from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input } from './common';
class LoginForm extends Component{
  state = { email: '', password: '', error: ''};

  onButtonPress() {
      this.setState({error: ''});
      firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .catch(() => {
          firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .catch(() => {
              this.setState({error: 'Authentication Failed.'});
            });
        });
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
          <Button onPress={this.onButtonPress.bind(this)}>Log in</Button>
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
