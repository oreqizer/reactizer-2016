import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const App = () =>
  <View style={styles.container}>
    <Text style={styles.welcome}>
      Welcome to Reactizer's React Native!
    </Text>
    <Text style={styles.instructions}>
      To get started, edit ./src/native/index.js
    </Text>
    <Text style={styles.instructions}>
      Press Cmd+R to reload,{'\n'}
      Cmd+D or shake for dev menu
    </Text>
  </View>;

export default App;
