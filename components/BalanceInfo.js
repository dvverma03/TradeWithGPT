import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FONTS, COLORS, SIZES, icons} from '../constants';

export default function BalanceInfo({
  title,
  displayAmount,
  changePct,
  containerStyle,
}) {
  return (
    <View style={{...containerStyle}}>
      {/* title  */}
      <Text style={{...FONTS.h2, color: COLORS.lightGray3}}>{title}</Text>
      {/* figure  */}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{...FONTS.h3, color: COLORS.lightGray3}}>$</Text>
        <Text
          style={{...FONTS.h2, color: COLORS.white, marginLeft: SIZES.base}}>
          {displayAmount}
        </Text>
        <Text style={{...FONTS.h3, color: COLORS.lightGray3}}>USD</Text>
      </View>
      {/* change percentage  */}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {changePct != 0 && (
          <Image
            source={icons.upArrow}
            style={{
              width: 10,
              height: 10,
              alignItems:'center',
              alignSelf: 'center',
              tintColor: changePct > 0 ? COLORS.lightGreen : COLORS.red,
              transform:
                changePct > 0 ? [{rotate: '45deg'}] : [{rotate: '125deg'}],
            }}
          />
        )}
        <Text
          style={{
            marginLeft: SIZES.base,
            alignSelf: 'flex-end',
            color:
              changePct == 0
                ? COLORS.lightGray3
                : changePct > 0
                ? COLORS.lightGreen
                : COLORS.red,
            ...FONTS.h4,
          }}>
          {changePct.toFixed(2)}
        </Text>

        <Text
          style={{
            marginLeft: SIZES.radius,
            alignSelf: 'flex-end',
            color: COLORS.lightGray3,
            ...FONTS.h5,
          }}>
          7d change
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
