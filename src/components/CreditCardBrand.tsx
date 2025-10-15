import Fontisto from '@expo/vector-icons/Fontisto';
import React from 'react';
import { Brand } from '../model/types';

interface CreditCardBrandProps {
  brand?: Brand;
  size?: number;
  color?: string;
}

const CreditCardBrand = ({
  brand = 'generic',
  size = 36,
  color = '#000',
}: CreditCardBrandProps) => {
  switch (brand) {
    case 'visa':
      return <Fontisto name='visa' size={size} color={color} />;
    case 'mastercard':
      return <Fontisto name='mastercard' size={size} color={color} />;
    case 'amex':
      return <Fontisto name='american-express' size={size} color={color} />;
    case 'discover':
      return <Fontisto name='discover' size={size} color={color} />;
    default:
      return <Fontisto name='credit-card' size={size} color={color} />;
  }
};

export default CreditCardBrand;
