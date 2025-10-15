import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Brand } from '../model/types';
import Chip from './Chip';
import CreditCardBrand from './CreditCardBrand';

interface CardHeaderProps {
  showChip: boolean;
  brand: Brand;
  brandSize: number;
  chipSize: number;
  color: string;
  paddingChip: number;
}

const CardHeader = ({
  showChip,
  brand,
  color,
  brandSize = 40,
  chipSize = 36,
  paddingChip = 6,
}: CardHeaderProps) => {
  return (
    <View style={styles.topRow}>
      {showChip && <Chip size={chipSize} color={color} padding={paddingChip} />}
      <CreditCardBrand brand={brand} size={brandSize} color={color} />
    </View>
  );
};

export default CardHeader;

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
