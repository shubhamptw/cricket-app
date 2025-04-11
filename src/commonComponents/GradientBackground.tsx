// GradientBackground.tsx
import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface GradientBackgroundProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  colors?: string[];
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  style,
  colors = ['red', '#00008B'],
}) => {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0.5, y: 1 }}
      end={{ x: 0.5, y: 0.4 }}
      style={[{ flex: 1 }, style]}
    >
      {children}
    </LinearGradient>
  );
};

export default GradientBackground;
