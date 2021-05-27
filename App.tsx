import {GiftedChat, User} from 'react-native-gifted-chat';
import {Image, StyleSheet, Text, View} from 'react-native';
// App.js
import React, {Component} from 'react';

import {Dialogflow_V2} from 'react-native-dialogflow';
import {dialogflowConfig} from './src/env';

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
const BOT = {
  _id: 2,
  name: 'FAQ Bot',
  avatar: 'https://i.imgur.com/7k12EPD.png',
};
class App extends Component {
  state: State = {
    messages: [
      {
        _id: 1,
        text: `Hi! I am the FAQ bot 🤖 from Jscrambler.\n\nHow may I help you with today?`,
        createdAt: new Date(),
        user: BOT,
      },
    ],
  };

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id,
    );
  }

  onSend(messages: Array<Message> = []) {
    this.setState((previousState: State) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      result => this.handleGoogleResponse(result),
      error => console.log(error),
    );
  }

  handleGoogleResponse(result: any) {
    const text = result.queryResult.fulfillmentMessages[0].text.text[0];
    console.log(text);
    this.sendBotResponse(text.length > 0 ? text : 'hmm not sure');
  }

  sendBotResponse(text: string) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT,
    };

    this.setState((previousState: State) => ({
      messages: GiftedChat.append(previousState.messages, [msg]),
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
