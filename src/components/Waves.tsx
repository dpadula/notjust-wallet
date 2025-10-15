import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const Waves = () => {
  return (
    <View style={styles.shapesContainer}>
      <Svg
        viewBox='0 0 400 240'
        preserveAspectRatio='none'
        style={styles.waveSvg}
      >
        {/* Capa 1 */}
        <Path
          d='M0 0 Q100 130 200 60 T400 150 L400 240 L0 240 Z'
          fill='rgba(255,255,255,0.25)'
        />
        {/* Capa 2 */}
        <Path
          // Inicia en Y=140, punto de control en 80, luego se repite
          d='M0 20 Q100 180 200 100 T400 170 L400 240 L0 240 Z'
          fill='rgba(255,255,255,0.15)'
        />
        {/* Capa 3 */}
        <Path
          d='M0 40 Q100 220 200 140 T400 190 L400 240 L0 240 Z'
          fill='rgba(255,255,255,0.25)'
        />
        {/* Capa 4 */}
        <Path
          d='M0 60 Q100 260 200 180 T400 210 L400 240 L0 240 Z'
          fill='rgba(255,255,255,0.25)'
        />
      </Svg>
    </View>
  );
};

export default Waves;

const styles = StyleSheet.create({
  shapesContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 18,
    overflow: 'hidden',
  },
  waveSvg: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '60%',
  },
});
