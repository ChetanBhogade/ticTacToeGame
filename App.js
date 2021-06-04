import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  Text,
  Header,
  Body,
  Container,
  H1,
  H3,
  Button,
  Title,
  Content,
  Card,
} from 'native-base';
import Icons from './components/Icons';
import Snackbar from 'react-native-snackbar';

const itemArray = new Array(9).fill('empty');

const App = () => {
  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState('');

  const changeItem = itemNumber => {
    if (winMessage) {
      return Snackbar.show({
        text: 'Current Match Is Over',
        backgroundColor: '#000000',
        textColor: '#ffffff',
      });
    }

    if (itemArray[itemNumber] === 'empty') {
      itemArray[itemNumber] = isCross ? 'cross' : 'circle';
      setIsCross(!isCross);
    } else {
      return Snackbar.show({
        text: 'Card is already filled',
        backgroundColor: '#000000',
        textColor: '#ffffff',
      });
    }

    let noOfEmptyCard = 0;
    for (let index = 0; index < itemArray.length; index++) {
      const item = itemArray[index];
      if (item === 'empty') {
        noOfEmptyCard += 1;
      }
    }
    if (noOfEmptyCard === 0) {
      setWinMessage('Match is Draw!');
      return Snackbar.show({
        text: 'Match is Draw!!!',
        backgroundColor: '#000000',
        textColor: '#ffffff',
      });
    }

    checkWinner();
  };

  const resetGame = () => {
    setIsCross(false);
    setWinMessage('');
    for (let index = 0; index < itemArray.length; index++) {
      itemArray[index] = 'empty';
    }
  };

  const checkWinner = () => {
    if (
      itemArray[0] !== 'empty' &&
      itemArray[0] === itemArray[1] &&
      itemArray[1] === itemArray[2]
    ) {
      setWinMessage(`${itemArray[0]} Won the match`);
    } else if (
      itemArray[3] !== 'empty' &&
      itemArray[3] === itemArray[4] &&
      itemArray[4] === itemArray[5]
    ) {
      setWinMessage(`${itemArray[3]} Won the match`);
    } else if (
      itemArray[6] !== 'empty' &&
      itemArray[6] === itemArray[7] &&
      itemArray[7] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[6]} Won the match`);
    } else if (
      itemArray[0] !== 'empty' &&
      itemArray[0] === itemArray[3] &&
      itemArray[3] === itemArray[6]
    ) {
      setWinMessage(`${itemArray[0]} Won the match`);
    } else if (
      itemArray[1] !== 'empty' &&
      itemArray[1] === itemArray[4] &&
      itemArray[4] === itemArray[7]
    ) {
      setWinMessage(`${itemArray[1]} Won the match`);
    } else if (
      itemArray[2] !== 'empty' &&
      itemArray[2] === itemArray[5] &&
      itemArray[5] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[2]} Won the match`);
    } else if (
      itemArray[0] !== 'empty' &&
      itemArray[0] === itemArray[4] &&
      itemArray[4] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[0]} Won the match`);
    } else if (
      itemArray[2] !== 'empty' &&
      itemArray[2] === itemArray[4] &&
      itemArray[4] === itemArray[6]
    ) {
      setWinMessage(`${itemArray[2]} Won the match`);
    }
  };

  return (
    <>
      <Container>
        <Header style={{backgroundColor: '#000'}}>
          <Body style={{ alignItems: "center" }}>
            <Title style={{ fontSize: 30 }}>Tic Tac Toe</Title>
          </Body>
        </Header>
        <Content>
          <View style={styles.grid}>
            {itemArray.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    console.log('Card Pressed');
                    changeItem(index);
                  }}
                  key={index}
                  style={styles.box}>
                  <Card style={styles.myIcon}>
                    <Icons name={item} />
                  </Card>
                </TouchableOpacity>
              );
            })}
          </View>

          {winMessage ? (
            <View>
              <H1 style={styles.message}>{winMessage}</H1>
              <Button
                primary
                rounded
                last
                onPress={() => {
                  resetGame();
                }}
                style={{
                  width: '90%',
                  justifyContent: 'center',
                  marginHorizontal: '5%',
                }}>
                <Text>Reload Game</Text>
              </Button>
            </View>
          ) : (
            <H3 style={styles.message}>
              {`${isCross ? 'Cross' : 'Circle'}`} Turn
            </H3>
          )}
        </Content>
      </Container>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  grid: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  box: {
    width: '33%',
    marginBottom: 6,
  },
  myIcon: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    marginBottom: 6,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
