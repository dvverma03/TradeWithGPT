import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FONTS, COLORS} from '../constants';

export default function TabIcon({focused, icon, iconStyle, label, isTrade}) {
  if (isTrade) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#060606',
          marginBottom: 10,
          borderWidth: 1,
        }}>
        <Image
          source={icon} 
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: COLORS.white ,
            ...iconStyle,
          }}
        />
        <Text
          style={{
            color:COLORS.white,
            ...FONTS.h4,
          }}>
          {label}
        </Text>
      </View>
    );
  } else {
    return (
      <View style={{marginBottom: 10}}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={icon}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: focused ? COLORS.white : COLORS.lightGray3,
              ...iconStyle,
            }}
          />
          <Text
            style={{
              color: focused ? COLORS.white : COLORS.lightGray3,
              ...FONTS.h4,
            }}>
            {label}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
