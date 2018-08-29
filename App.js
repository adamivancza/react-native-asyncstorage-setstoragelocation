/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, AsyncStorage, Switch, TouchableOpacity, TextInput} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  state = {
    asyncLocation: AsyncStorage.StorageLocationIOS.documents,
    keys: [],
    newKey: ''
  }

  componentWillMount() {
    this.getKeys();
  }

  updateAsyncStorageAndGetKeys = () => {
    AsyncStorage.setStorageLocationIOS(this.state.asyncLocation);
    this.getKeys();
  }

  getKeys = async () => {
    this.setState({ keys: [] });
    const keys = await AsyncStorage.getAllKeys();
    this.setState({ keys });
  }

  onValueChange = () => {
    const asyncLocation = this.state.asyncLocation === AsyncStorage.StorageLocationIOS.documents ?
    AsyncStorage.StorageLocationIOS.applicationSupport :
    AsyncStorage.StorageLocationIOS.documents
    this.setState({ asyncLocation }, this.updateAsyncStorageAndGetKeys);
  }

  onAddNewKey = () => {
    this.setState({ newKey: '' });
    AsyncStorage.setItem(this.state.newKey, 'test');
    this.getKeys();
  }

  render() {
    const props = {};
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <Text>Application Support</Text>
            <Switch
              value={this.state.asyncLocation === AsyncStorage.StorageLocationIOS.documents}
              onValueChange={() => this.setState({
                asyncLocation: this.state.asyncLocation === AsyncStorage.StorageLocationIOS.documents ?
                  AsyncStorage.StorageLocationIOS.applicationSupport :
                  AsyncStorage.StorageLocationIOS.documents
              }, () => {
                AsyncStorage.setStorageLocationIOS(this.state.asyncLocation);
                this.getKeys();
              })} />
          <Text>Documents</Text>
        </View>
        <View style={{ marginBottom: 10 }}>
              <TextInput
                placeholder="your new key"
                value={this.state.newKey}
                style={{ borderColor: 'black', borderWidth: 1 }}
                onChangeText={newKey => this.setState({ newKey })}/>
              <TouchableOpacity onPress={() => this.onAddNewKey()}>
                <Text>Add key to async location: {this.state.asyncLocation}</Text>
              </TouchableOpacity>
        </View>
        <Text>Keys:</Text>
        {this.state.keys.map(key => <Text key={key}>{key}</Text>)}
      </View>
    );
  }
}

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
