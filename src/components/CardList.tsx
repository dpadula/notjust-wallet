import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Card from './Card';

const cards = [
  require('../../assets/cards/Card 1.png'),
  require('../../assets/cards/Card 2.png'),
  require('../../assets/cards/Card 3.png'),
  require('../../assets/cards/Card 4.png'),
  require('../../assets/cards/Card 5.png'),
  require('../../assets/cards/Card 6.png'),
  require('../../assets/cards/Card 7.png'),
  require('../../assets/cards/Card 8.png'),
  require('../../assets/cards/Card 9.png'),
];

const CardList = () => {
  const pan = Gesture.Pan()
    .onStart(() => {
      console.log('pan started');
    })
    .onChange((e) => {
      console.log('pan: ', e.changeY);
    })
    .onEnd(() => {
      console.log('pan ended');
    });
  return (
    <GestureDetector gesture={pan}>
      <View style={styles.container}>
        {/* {cards.map((card, index) => ( */}
        <Image style={styles.image} source={cards[0]} />
        <Card
          color='#0a0a0a'
          alphaFactor={0.9}
          style={styles.image}
          cardNumber='5439 5154 7858 2335'
          holderName='Star Burst'
          expiry='03/25'
          cvv='942'
          brand='mastercard'
        />
        {/* ))} */}
      </View>
    </GestureDetector>
  );
};

export default CardList;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 7 / 4,
    marginVertical: 5,
  },
});
