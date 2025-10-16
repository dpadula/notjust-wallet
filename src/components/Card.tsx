import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  clamp,
  Easing,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Brand } from '../model/types';
import { applyAlphaToColor } from '../util/alphaColor';
import { formatCreditCardNumber } from '../util/formatCreditCardNumber';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import Waves from './Waves';

interface CardProps {
  index: number;
  activeCardIndex: SharedValue<number | null>;
  scrollY: SharedValue<number>;
  cardNumber: string;
  holderName?: string;
  expiry?: string;
  cvv?: string;
  brand?: Brand;
  sizeBrand?: number;
  gradientColors?: string[];
  style?: StyleProp<ViewStyle>;
  showChip?: boolean;
  showContactless?: boolean;
  numberMasked?: boolean;
  color: string;
  alphaFactor?: number; // 0 a 1, para aplicar transparencia al color
}

// ====================
// 🔹 Componente principal
// ====================
const Card = ({
  index = 0,
  activeCardIndex,
  scrollY,
  cardNumber,
  holderName = 'Card Holder',
  expiry = 'MM/YY',
  cvv = '***',
  brand = 'generic',
  sizeBrand = 40,
  gradientColors = [],
  style,
  showChip = true,
  showContactless = true,
  numberMasked = false,
  color = '#fff',
  alphaFactor = 1,
}: CardProps) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [cardWidth, setCardWidth] = useState(screenWidth * 0.9);
  const [cardHeight, setCardHeight] = useState(0);
  const translateY = useSharedValue(0);

  const cardVisiblePercentage = 0.95;
  const stackMargin = 10;

  // Se usa el ancho real de la tarjeta para calcular escala
  const scale = cardWidth / screenWidth; // ancho de la pantalla aproximado?

  const tap = Gesture.Tap().onEnd((e) => {
    if (activeCardIndex.value === null) {
      activeCardIndex.value = index;
    } else {
      activeCardIndex.value = null;
    }
  });

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setCardWidth(width);
    setCardHeight(height + stackMargin);
  };

  const defaultColorsForBrand = (brand?: Brand): string[] => {
    switch (brand) {
      case 'visa':
        return ['#1434CB', '#FFFFFF', '#FCC015'];
      case 'mastercard':
        return ['#eb001b', '#ff5f00', '#FFFFFF', '#f79e1bff'];
      case 'amex':
        return ['#016FD0', '#FFFFFF', '#001eb3ff'];
      case 'discover':
        return ['#000000', '#F79C1F', '#922F0B'];
      default:
        return ['#f6d365', '#fda085'];
    }
  };

  const colors: [string, string, ...string[]] = (
    gradientColors && gradientColors.length >= 2
      ? gradientColors
      : defaultColorsForBrand(brand)
  ) as [string, string, ...string[]];

  const formattedNumber = formatCreditCardNumber(cardNumber, numberMasked);

  const cardTextColor =
    alphaFactor != null ? applyAlphaToColor(color, alphaFactor) : color;

  useAnimatedReaction(
    () => scrollY.value,
    (current) => {
      translateY.value = clamp(
        -current,
        -index * cardHeight * cardVisiblePercentage,
        0
      );
    }
  );

  useAnimatedReaction(
    () => activeCardIndex?.value,
    (current, previous) => {
      if (current === previous) {
        return;
      }
      //Si no hay ninguna tarjeta activa activeCardIndex?.value = null, entonces mostrar la lista scrollable
      if (activeCardIndex.value === null) {
        translateY.value = withTiming(
          clamp(-scrollY.value, -index * cardHeight * cardVisiblePercentage, 0)
        );
      } else if (activeCardIndex.value === index) {
        translateY.value = withTiming(-index * cardHeight, {
          duration: 500,
          easing: Easing.out(Easing.ease),
        });
      } else {
        translateY.value = withTiming(
          -index * cardHeight * cardVisiblePercentage + screenHeight * 0.8,
          {
            duration: 500,
            easing: Easing.out(Easing.ease),
          }
        );
      }
    }
  );

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });
  return (
    <GestureDetector gesture={tap}>
      <Animated.View style={[style, animatedCardStyle]} onLayout={onLayout}>
        <LinearGradient
          colors={colors}
          start={[0, 0]}
          end={[1, 1]}
          style={[
            styles.gradient,
            { borderRadius: 18 * scale, padding: 18 * scale },
          ]}
        >
          <Waves borderRadius={18 * scale} height={150 * scale} />
          {/* Top row: CardHeader = chip + brand */}
          <CardHeader
            showChip={showChip}
            brand={brand}
            brandSize={sizeBrand * scale}
            chipSize={36 * scale}
            paddingChip={6 * scale}
            color={cardTextColor}
          />
          {/* Middle row: number + contactless */}
          <CardBody
            formattedNumber={formattedNumber}
            showContactless={showContactless}
            iconSize={24 * scale}
            fontSize={15 * scale}
            color={cardTextColor}
          />
          {/* Bottom row: name / exp / cvv */}
          <CardFooter
            holderName={holderName}
            expiry={expiry}
            cvv={cvv}
            color={cardTextColor}
            smallTextSize={8 * scale}
            bigTextSize={13 * scale}
          />
        </LinearGradient>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
});

export default Card;
