import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES, FONTS } from '../constants'

export default function Headerbar({title}) {
  return (
    <View
    style={{
        height:100,
        paddingHorizontal:SIZES.radius,
        justifyContent:'center'
    }}
    >
      <Text
      style={{color:COLORS.white,...FONTS.largeTitle }}
      >{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})