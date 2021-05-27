import {GiftedChat, User} from 'react-native-gifted-chat';
import {Image, StyleSheet, Text, View} from 'react-native';
// App.js
import React, {Component} from 'react';

const styles = StyleSheet.create({
  bubble: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
interface User {
  _id: number;
  name: string;
  avatar: string;
}
interface Message {
  _id: number;
  text: string;
  createdAt: Date;
  user: User;
}

interface State {
  messages: Array<Message>;
}

class App extends Component {
  state: State = {
    messages: [
      {
        _id: 1,
        text: `Hi! I am the FAQ bot 🤖 from Jscrambler.\n\nHow may I help you with today?`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'FAQ Bot',
          avatar: 'https://i.imgur.com/7k12EPD.png',
        },
      },
    ],
  };

  onSend(messages = []) {
    this.setState((previousState: State) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
      <View style={styles.bubble}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
    );
  }
}

export default App;
