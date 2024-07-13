import {Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import MainLayout from './MainLayout';
import { COLORS, SIZES, dummyData, FONTS, icons } from '../constants';
import Headerbar from '../components/Headerbar';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const SectionTitle=({title})=>{
  return (
    <View
    style={{
      marginTop:SIZES.padding
    }}
    >
      <Text style={{color:COLORS.lightGray3, ...FONTS.h4}}>{title}</Text>

    </View>
  )
}

const Setting=({title, value, type, onPress})=>{
  if(type=="button"){

    return (
      <TouchableOpacity
      style={{
        flexDirection:'row',
        height:50,
        alignItems:'center'
      }}
      onPress={onPress}
      >
        <Text style={{color:COLORS.white, ...FONTS.h3, flex:1}}>{title}</Text>

        <View style={{
          flexDirection:'row',
          alignItems:'center'
        }}>
          <Text
          style={{
            marginRight:SIZES.radius, color:COLORS.lightGray3, ...FONTS.h3
          }}
          >{value}</Text>
          <Image source={icons.rightArrow}
          style={{
            height:15,
            width:15,
            tintColor:COLORS.white
          }}
          />

        </View>
  
      </TouchableOpacity>
    )
  }else{
    return(
      <View
      style={{
        flexDirection:'row',
        height:50, 
        alignItems:'center'
      }}
      >
        <Text
        style={{
          flex:1, color:COLORS.white, ...FONTS.h3
        }}
        >
          {title}
        </Text>
        <Switch value={value} onValueChange={(value)=>onPress(value)} />

      </View>
    )
  }
}

export default function Profile() {
  const [faceId, setFaceId]= useState(true)
  const navigation= useNavigation()
  const {user} = useSelector((store)=> store?.user)

  const handleLogout=async()=>{
      try {
          await AsyncStorage.removeItem('TradeWithGPT');
          navigation.navigate("Main")

      }
      catch(exception) {
        console.log("exception", exception)
      }
  }
  return (
    <MainLayout>
      <View
      style={{
        flex:1,
        paddingHorizontal:SIZES.padding,
        backgroundColor:COLORS.black
      }}
      >
        {/* Header  */}
        <Headerbar title="Profile"/>

        {/* details  */}
        <ScrollView>
          <View
          style={{
            flexDirection:'row',
            marginTop:SIZES.radius
          }}
          >
            <View
            style={{
              flex:1
            }}
            >
             <Text
             style={{
              color:COLORS.white,...FONTS.h3
             }}
             >
              {dummyData.profile.email}
             </Text>
             <Text 
             style={{color:COLORS.lightGray3,
              ...FONTS.body4
             }}
             >
              ID:{dummyData.profile.id}
             </Text>
            </View>

            <View style={{
              flexDirection:'row',
              alignItems:'center'
            }}>
              <Image source={icons.verified} style={{
                height:25,
                width:25
              }}/>
              <Text style={{
                marginLeft:SIZES.base,
                color:COLORS.lightGreen,
                ...FONTS.body4
              }}>
                Verified
              </Text>

            </View>

          </View>
          {/* APP  */}
          <SectionTitle title="APP"/>

          <Setting title="Launch Screen" value="Home" type="button" onPress={()=> navigation.navigate("MainLayout")} />
          <Setting title="Appearance" value="Dark" type="button" onPress={()=> console.log("Pressed")} />

            {/* Account  */}

            <SectionTitle title="ACCOUNT"/>

          <Setting title="Payment Currency" value="USD" type="button" onPress={()=> console.log("Pressed")} />
          <Setting title="Language" value="English" type="button" onPress={()=> console.log("Pressed")} />

            {/* Security  */}
            <SectionTitle title="SECURITY"/>
            <Setting title="FaceID" value={faceId} type="switch" onPress={(value)=> setFaceId(value)} />
            <Setting title="Password Setting" value="" type="button" onPress={()=> console.log("Pressed")} />
          <Setting title="Change Password" value="" type="button" onPress={()=> console.log("Pressed")} />
          <Setting title="Logout" value="" type="button" onPress={handleLogout} />



        </ScrollView>
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({});
