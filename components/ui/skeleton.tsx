import React, { useEffect, useRef } from 'react';
import { Animated, View, type ViewProps } from 'react-native';

interface SkeletonProps extends ViewProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
}

const Skeleton = ({ width, height, borderRadius = 8, style, className, ...rest }: SkeletonProps) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      className={`bg-gray-200 dark:bg-gray-700 ${className}`}
      style={[{ width, height, borderRadius, opacity }, style]}
      {...rest}
    />
  );
};

export default Skeleton;
