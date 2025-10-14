import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

// ====================
// 🔹 Tipos y Props
// ====================
type Brand = 'visa' | 'mastercard' | 'amex' | 'discover' | 'generic';

interface CardProps {
  cardNumber: string;
  holderName?: string;
  expiry?: string;
  cvv?: string;
  brand?: Brand;
  sizeBrand?: number;
  gradientColors?: string[];
  style?: ViewStyle;
  onPress?: (e: GestureResponderEvent) => void;
  showChip?: boolean;
  showContactless?: boolean;
  numberMasked?: boolean;
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
  onPress,
  showChip = true,
  showContactless = true,
  numberMasked = false,
}: CardProps) => {
  // 🔸 Helpers internos como funciones tipo const
  const defaultColorsForBrand = (brand?: Brand): string[] => {
    switch (brand) {
      case 'visa':
        return ['#1A56DB', '#3B82F6'];
      case 'mastercard':
        return ['#ff6a00', '#ff3b3b'];
      case 'amex':
        return ['#0077a2', '#2bc0e4'];
      case 'discover':
        return ['#F0C14B', '#FF8A00'];
      default:
        return ['#f6d365', '#fda085'];
    }
  };

  const brandIcon = (brand?: Brand, size = 36) => {
    switch (brand) {
      case 'visa':
        return <FontAwesome name='cc-visa' size={size} color='white' />;
      case 'mastercard':
        return <FontAwesome name='cc-mastercard' size={size} color='white' />;
      case 'amex':
        return <FontAwesome name='cc-amex' size={size} color='white' />;
      case 'discover':
        return <FontAwesome5 name='cc-discover' size={size} color='white' />;
      default:
        return <FontAwesome5 name='credit-card' size={size} color='white' />;
    }
  };

  const formatCardNumber = (n: string, masked = false) => {
    const digits = n.replace(/\s+/g, '');
    if (digits.length === 0) return '---- ---- ---- ----';

    if (masked) {
      const last4 = digits.slice(-4).padStart(4, '*');
      const groups = ['****', '****', '****', last4];
      return groups.join(' ');
    }

    const groups: string[] = [];
    for (let i = 0; i < digits.length; i += 4) {
      groups.push(digits.slice(i, i + 4));
    }
    while (groups.length < 4) groups.push('----');
    return groups.slice(0, 4).join('  ');
  };

  // 🔸 Variables derivadas
  const colors: [string, string, ...string[]] = (
    gradientColors && gradientColors.length >= 2
      ? gradientColors
      : defaultColorsForBrand(brand)
  ) as [string, string, ...string[]];
  const formattedNumber = formatCardNumber(cardNumber, numberMasked);

  // ====================
  // 🔹 Render principal
  // ====================
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.8 : 1}
      onPress={onPress}
      style={[styles.container, style]}
    >
      <LinearGradient
        colors={colors}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.gradient}
      >
        <View style={styles.shapesContainer}>
          <Svg
            viewBox='0 0 400 240'
            preserveAspectRatio='none'
            style={styles.waveSvg}
          >
            {/* Capa 1 (más clara, al fondo) */}
            <Path
              d='M0 160 Q100 120 200 160 T400 160 L400 240 L0 240 Z'
              fill='rgba(255,255,255,0.25)'
            />
            {/* Capa 2 */}
            <Path
              d='M0 180 Q100 140 200 180 T400 180 L400 240 L0 240 Z'
              fill='rgba(255,255,255,0.35)'
            />
            {/* Capa 3 */}
            <Path
              d='M0 200 Q100 160 200 200 T400 200 L400 240 L0 240 Z'
              fill='rgba(255,255,255,0.45)'
            />
          </Svg>
        </View>
        {/* Top row: chip + brand */}
        <View style={styles.topRow}>
          {showChip && (
            <View style={styles.chipBox}>
              <MaterialCommunityIcons
                name='integrated-circuit-chip'
                size={38}
                color='#ffffffcc'
              />
            </View>
          )}

          <View style={styles.rightTop}>{brandIcon(brand, sizeBrand)}</View>
        </View>

        {/* Middle: number + contactless */}
        <View style={styles.middleRow}>
          <Text style={styles.cardNumber}>{formattedNumber}</Text>
          {showContactless && (
            <MaterialCommunityIcons
              name='contactless-payment'
              size={24}
              color='white'
              //   style={{ transform: [{ rotate: '90deg' }] }}
            />
          )}
        </View>

        {/* Bottom: name / exp / cvv */}
        <View style={styles.bottomRow}>
          <View style={styles.bottomColumn}>
            <Text style={styles.smallLabel}>Card Holder</Text>
            <Text style={styles.bigText}>{holderName}</Text>
          </View>

          <View style={[styles.bottomColumn, { marginLeft: 18 }]}>
            <Text style={styles.smallLabel}>Expires</Text>
            <Text style={styles.bigText}>{expiry}</Text>
          </View>

          <View style={[styles.bottomColumn, { marginLeft: 18 }]}>
            <Text style={styles.smallLabel}>CVV</Text>
            <Text style={styles.bigText}>{cvv}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

// ====================
// 🔹 Estilos
// ====================
const styles = StyleSheet.create({
  container: {
    width: '92%',
    maxWidth: 420,
    aspectRatio: 1.6,
    borderRadius: 18,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  gradient: {
    flex: 1,
    padding: 18,
    borderRadius: 18,
    justifyContent: 'space-between',
  },
  shapesContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 18,
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    width: '120%',
    height: 80,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    transform: [{ rotate: '-15deg' }],
  },
  waveSvg: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '60%',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chipBox: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 6,
    width: 48,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightTop: {
    alignItems: 'flex-end',
  },
  middleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  cardNumber: {
    color: 'white',
    fontSize: 14,
    letterSpacing: 0.8,
    fontWeight: '500',
    flex: 1,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  bottomColumn: {
    flex: 1,
  },
  smallLabel: {
    color: 'rgba(201, 201, 201, 0.85)',
    fontSize: 8,
    fontWeight: '400',
    opacity: 0.9,
  },
  bigText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 4,
  },
});

export default Card;
