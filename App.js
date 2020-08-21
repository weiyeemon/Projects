/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Alert, TouchableOpacity, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
    };
  }
  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
    });
  };
  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return <Icon name="close" style={styles.tileX} />;
      case -1:
        return <Icon name="circle-outline" style={styles.tileO} />;
      default:
        return <View />;
    }
  };
  onTilePress = (row, col) => {
    var value = this.state.gameState[row][col];
    if (value !== 0) {
      return;
    }
    var currentPlayer = this.state.currentPlayer;
    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState: arr});
    var nextPayer = currentPlayer === 1 ? -1 : 1;
    this.setState({currentPlayer: nextPayer});

    var winner = this.getWinner();
    if (winner === 1) {
      Alert.alert('Player1 win!!!');
      //this.initializeGame();
    }

    if (winner === -1) {
      Alert.alert('Player2 win!!!');
      //this.initializeGame();
    }
  };
  getWinner = () => {
    var array = this.state.gameState;
    const NumOfTile = 3;
    var sum = 0;
    for (let index = 0; index < NumOfTile; index++) {
      sum = array[index][0] + array[index][1] + array[index][2];
      if (sum === 3) {
        return 1;
      } else if (sum === -3) {
        return -1;
      }
    }
    for (let index = 0; index < NumOfTile; index++) {
      sum = array[0][index] + array[1][index] + array[2][index];
      if (sum === 3) {
        return 1;
      } else if (sum === -3) {
        return -1;
      }
    }

    sum = array[0][0] + array[1][1] + array[2][2];
    if (sum === 3) {
      return 1;
    } else if (sum === -3) {
      return -1;
    }

    sum = array[2][0] + array[1][1] + array[0][2];
    if (sum === 3) {
      return 1;
    } else if (sum === -3) {
      return -1;
    }

    return 0;
  };
  newGameStart = () => {
    this.initializeGame();
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 0)}
            style={[styles.tile, {borderLeftWidth: 0, borderTopWidth: 0}]}>
            {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 1)}
            style={[styles.tile, {borderTopWidth: 0}]}>
            {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 2)}
            style={[styles.tile, {borderRightWidth: 0, borderTopWidth: 0}]}>
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 0)}
            style={[styles.tile, {borderLeftWidth: 0}]}>
            {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 1)}
            style={styles.tile}>
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 2)}
            style={[styles.tile, {borderRightWidth: 0}]}>
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 0)}
            style={[styles.tile, {borderLeftWidth: 0, borderBottomWidth: 0}]}>
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 1)}
            style={[styles.tile, {borderBottomWidth: 0}]}>
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 2)}
            style={[styles.tile, {borderRightWidth: 0, borderBottomWidth: 0}]}>
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>
        <Button title="new game" onPress={this.newGameStart} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: {
    borderWidth: 3,
    width: 100,
    height: 100,
  },
  tileX: {
    color: 'red',
    fontSize: 68,
  },
  tileO: {
    color: 'green',
    fontSize: 68,
  },
});
