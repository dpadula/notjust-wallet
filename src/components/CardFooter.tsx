import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type CardFooterProps = {
  holderName: string;
  expiry: string;
  cvv: string;
  color: string;
  smallTextSize: number;
  bigTextSize: number;
  cvvMasked?: boolean;
};
const CardFooter = ({
  holderName,
  expiry,
  cvv,
  color,
  smallTextSize,
  bigTextSize,
  cvvMasked = false,
}: CardFooterProps) => {
  return (
    <View style={styles.bottomRow}>
      <View style={styles.bottomColumn}>
        <Text
          style={[styles.smallLabel, { fontSize: smallTextSize }, { color }]}
        >
          Card Holder
        </Text>
        <Text style={[styles.bigText, { fontSize: bigTextSize }, { color }]}>
          {holderName}
        </Text>
      </View>

      <View style={styles.bottomColumn}>
        <Text
          style={[styles.smallLabel, { fontSize: smallTextSize }, { color }]}
        >
          Expires
        </Text>
        <Text style={[styles.bigText, { fontSize: bigTextSize }, { color }]}>
          {expiry}
        </Text>
      </View>

      <View style={styles.bottomColumn}>
        <Text
          style={[styles.smallLabel, { fontSize: smallTextSize }, { color }]}
        >
          CVV
        </Text>
        <Text style={[styles.bigText, { fontSize: bigTextSize }, { color }]}>
          {cvvMasked ? '•••' : cvv}
        </Text>
      </View>
    </View>
  );
};

export default CardFooter;

const styles = StyleSheet.create({
  bottomRow: {
    flexDirection: 'row',
  },
  bottomColumn: {
    marginRight: '15%',
  },
  smallLabel: {
    fontWeight: '500',
    opacity: 0.9,
  },
  bigText: {
    fontWeight: '600',
    marginTop: 4,
  },
});
