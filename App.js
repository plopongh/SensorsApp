/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import  { Accelerometer, Gyroscope } from 'react-native-sensors';

const accelerationObservable = new Accelerometer({
  updateInterval: 100, // defaults to 100ms
});

const gyroscopeObservable = new Gyroscope({
  updateInterval: 2000, // defaults to 100ms
});

export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      acceleration: {
        x: 'unknown',
        y: 'unknown',
        z: 'unknown',
      },
      gyroscope: {
        x: 'unknown',
        y: 'unknown',
        z: 'unknown',
      }
    };
  }

  componentWillMount() {
    accelerationObservable
      .subscribe(acceleration => this.setState({
        acceleration,
      }));

    gyroscopeObservable
      .subscribe(gyroscope => this.setState({
        gyroscope,
      }));
  }

  render() {

    const {
      acceleration,
      gyroscope,
    } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Acceleration:
        </Text>
        <Text style={styles.instructions}>
          {acceleration.x + '/' + acceleration.y + '/' + acceleration.z}
        </Text>
        <Text style={styles.welcome}>
          Gyroscope:
        </Text>
        <Text style={styles.instructions}>
          {gyroscope.x + '/' + gyroscope.y + '/' + gyroscope.z}
        </Text>
      </View>
    );
  }
  componentWillUnmount() {
    accelerationObservable.stop();
    gyroscopeObservable.stop();
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
