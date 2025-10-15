import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type CardBodyProps = {
  formattedNumber: string;
  showContactless: boolean;
  iconSize: number;
  fontSize: number;
  color: string;
};

const CardBody = ({
  formattedNumber,
  showContactless,
  iconSize,
  fontSize,
  color,
}: CardBodyProps) => {
  return (
    <View style={styles.middleRow}>
      <Text style={[styles.cardNumber, { fontSize }, { color }]}>
        {formattedNumber}
      </Text>
      {showContactless && (
        <MaterialCommunityIcons
          name='contactless-payment'
          size={iconSize}
          color={color}
          //   style={{ transform: [{ rotate: '90deg' }] }}
        />
      )}
    </View>
  );
};

export default CardBody;

const styles = StyleSheet.create({
  middleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  cardNumber: {
    letterSpacing: 0.2,
    fontWeight: '700',
    flex: 1,
  },
});
