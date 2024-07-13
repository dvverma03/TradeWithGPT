import { Animated, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { COLORS, SIZES, icons } from '../constants';
import IconTextButton from '../components/IconTextButton';

const selectIsVisible = (state) => state.isTradeVisible.isVisible;

export default function MainLayout({ children }) {
  const isVisible = useSelector(selectIsVisible);
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(modalAnimatedValue, {
      toValue: isVisible ? 1 : 0,
      duration: 500,
      useNativeDriver: false, // You can change this to true if you don't need to animate non-transform properties
    }).start();
  }, [isVisible]);

  const modelY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 250],
  });

  return (
    <View style={{ flex: 1 }}>
      {children}

   {
    isVisible && <Animated.View style={{
        position:'absolute',
        top:0,
        left:0,
        bottom:0,
        right:0,
        backgroundColor:COLORS.transparentBlack
    }}>

    </Animated.View>
   }

      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          top: modelY,
          width: '100%',
          padding: SIZES.padding,
          backgroundColor: COLORS.primary,
        }}
      >
        <IconTextButton
          label="Transfer"
          icon={icons.send}
          onPress={() => console.log('transfer')}
        />
        <IconTextButton
          label="Withdraw"
          icon={icons.withdraw}
          containerStyle={{
            marginTop: SIZES.base,
          }}
          onPress={() => console.log('withdraw')}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({});
