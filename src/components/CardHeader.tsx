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
}

const CardHeader = ({
  showChip,
  brand,
  color,
  brandSize = 40,
  chipSize = 36,
}: CardHeaderProps) => {
  return (
    <View style={styles.topRow}>
      {showChip && <Chip size={chipSize} color={color} />}
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
