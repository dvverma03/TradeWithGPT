import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../constants'

export default function IconTextButton({label, icon, containerStyle, onPress}) {
  return (
    <TouchableOpacity
    style={{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        height:50,
        borderRadius:SIZES.radius,
        backgroundColor:COLORS.white,
        ...containerStyle
    }}
    onPress={onPress}
    >
    <Image source={icon} resizeMode='contain' style={{
        width:20,
        height:20
    }} />
    <Text style={{
        marginLeft:SIZES.base, ...FONTS.h3, color:'black'
    }}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})