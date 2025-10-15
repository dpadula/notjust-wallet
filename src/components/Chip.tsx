import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type ChipProps = {
  size?: number;
  color?: string;
};

const Chip = ({ size = 36, color }: ChipProps) => {
  return (
    <View style={[styles.chipBox]}>
      <MaterialCommunityIcons
        name='integrated-circuit-chip'
        size={size}
        color={color}
      />
    </View>
  );
};

export default Chip;

const styles = StyleSheet.create({
  chipBox: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderColor: 'rgba(0,0,0,0.25)',
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
});
