import React, { useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  cancelAnimation,
  clamp,
  useAnimatedStyle,
  useSharedValue,
  withClamp,
  withDecay,
} from 'react-native-reanimated';
import { Brand } from '../model/types';
import Card from './Card';

const cards = [
  {
    cardNumber: '5439 5154 7858 2335',
    holderName: 'Star Burst',
    expiry: '03/25',
    cvv: '942',
    brand: 'discover',
  },
  {
    cardNumber: '5439 5154 7858 2335',
    holderName: 'Star Burst',
    expiry: '03/25',
    cvv: '942',
    brand: 'visa',
  },
  {
    cardNumber: '5439 5154 7858 2335',
    holderName: 'Star Burst',
    expiry: '03/25',
    cvv: '942',
    brand: 'mastercard',
  },
  {
    cardNumber: '5439 5154 7858 2335',
    holderName: 'Star Burst',
    expiry: '03/25',
    cvv: '942',
    brand: 'amex',
  },
  {
    cardNumber: '5439 5154 7858 2335',
    holderName: 'Star Burst',
    expiry: '03/25',
    cvv: '942',
    brand: 'discover',
  },
  {
    cardNumber: '5439 5154 7858 2335',
    holderName: 'Star Burst',
    expiry: '03/25',
    cvv: '942',
    brand: 'visa',
  },
  {
    cardNumber: '5439 5154 7858 2335',
    holderName: 'Star Burst',
    expiry: '03/25',
    cvv: '942',
    brand: 'mastercard',
  },
  {
    cardNumber: '5439 5154 7858 2335',
    holderName: 'Star Burst',
    expiry: '03/25',
    cvv: '942',
    brand: 'amex',
  },
  {
    cardNumber: '5439 5154 7858 2335',
    holderName: 'Star Burst',
    expiry: '03/25',
    cvv: '942',
    brand: 'discover',
  },
  {
    cardNumber: '5439 5154 7858 2335',
    holderName: 'Star Burst',
    expiry: '03/25',
    cvv: '942',
    brand: 'visa',
  },
  {
    cardNumber: '5439 5154 7858 2335',
    holderName: 'Star Burst',
    expiry: '03/25',
    cvv: '942',
    brand: 'mastercard',
  },
  {
    cardNumber: '5439 5154 7858 2335',
    holderName: 'Star Burst',
    expiry: '03/25',
    cvv: '942',
    brand: 'amex',
  },
  {
    cardNumber: '5439 5154 7858 2335',
    holderName: 'Star Burst',
    expiry: '03/25',
    cvv: '942',
    brand: 'discover',
  },
  {
    cardNumber: '5439 5154 7858 2335',
    holderName: 'Star Burst',
    expiry: '03/25',
    cvv: '942',
    brand: 'visa',
  },
  {
    cardNumber: '5439 5154 7858 2335',
    holderName: 'Star Burst',
    expiry: '03/25',
    cvv: '942',
    brand: 'mastercard',
  },
  {
    cardNumber: '5439 5154 7858 2335',
    holderName: 'Star Burst',
    expiry: '03/25',
    cvv: '942',
    brand: 'amex',
  },
];

const CardList = () => {
  const { height: screenHeight } = useWindowDimensions();
  const [listHeight, setListHeight] = useState(0);
  const scrollY = useSharedValue(0);
  const maxScrollY = listHeight - screenHeight + 100;

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -scrollY.value }],
  }));
  const pan = Gesture.Pan()
    .onBegin(() => {
      cancelAnimation(scrollY);
    })
    .onStart(() => {
      console.log('pan started');
    })
    .onChange((e) => {
      scrollY.value = clamp(scrollY.value - e.changeY, 0, maxScrollY);
    })
    .onEnd((e) => {
      scrollY.value = withClamp(
        { min: 0, max: maxScrollY },
        withDecay({ velocity: -e.velocityY })
      );
      console.log('pan ended');
    });
  return (
    <GestureDetector gesture={pan}>
      <View
        style={styles.container}
        onLayout={(e) => setListHeight(e.nativeEvent.layout.height)}
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            color='#0a0a0a'
            alphaFactor={0.9}
            style={[styles.card, animatedCardStyle]}
            cardNumber={card.cardNumber}
            holderName={card.holderName}
            expiry={card.expiry}
            cvv={card.cvv}
            brand={card.brand as Brand}
          />
        ))}
      </View>
    </GestureDetector>
  );
};

export default CardList;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    width: '100%',
    height: undefined,
    aspectRatio: 7 / 4,
    marginVertical: 5,
  },
});
