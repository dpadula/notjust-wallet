import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  LayoutChangeEvent,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import { Brand } from '../model/types';
import { applyAlphaToColor } from '../util/alphaColor';
import { formatCreditCardNumber } from '../util/formatCreditCardNumber';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import Waves from './Waves';

interface CardProps {
  cardNumber: string;
  holderName?: string;
  expiry?: string;
  cvv?: string;
  brand?: Brand;
  sizeBrand?: number;
  gradientColors?: string[];
  style?: ViewStyle;
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
  const { width: windowWidth } = useWindowDimensions();
  const [cardWidth, setCardWidth] = useState(windowWidth * 0.9);

  // Se usa el ancho real de la tarjeta para calcular escala
  const scale = cardWidth / 400; // ancho de la pantalla aproximado?

  const onLayout = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    setCardWidth(width);
  };

  // 🔸 Helpers internos como funciones tipo const
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

  // 🔸 Variables derivadas
  const colors: [string, string, ...string[]] = (
    gradientColors && gradientColors.length >= 2
      ? gradientColors
      : defaultColorsForBrand(brand)
  ) as [string, string, ...string[]];

  const formattedNumber = formatCreditCardNumber(cardNumber, numberMasked);

  const cardTextColor =
    alphaFactor != null ? applyAlphaToColor(color, alphaFactor) : color;

  // ====================
  // 🔹 Render principal
  // ====================
  return (
    <View style={style} onLayout={onLayout}>
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
    </View>
  );
};

// ====================
// 🔹 Estilos
// ====================
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
});

export default Card;
