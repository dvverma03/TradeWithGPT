import {Image, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import Registration from '../assets/images/Registration.png';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GetStarted() {
    const navigation= useNavigation()
    useEffect(()=>{
      const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('TradeWithGPT');
            if(!value){
            }else{

              navigation.navigate("MainLayout")
            }
        } catch (e) {
          console.log("error in async", e)
        }
      }
      getData()
    },[])
  return (
    <ScrollView style={{backgroundColor: 'black', flex: 1, paddingBottom: 30}}>
      <View style={{flex: 1, marginTop: 55, marginLeft: 10, marginBottom:30}}>
        
        <View style={{alignItems: 'center', marginTop: 40}}>
          <Image source={Registration} />
        </View>
        <View>
            <Text style={{fontSize:35, textAlign:'center', marginTop:60}}>Create your Account</Text>
        </View>
        
        <View style={{alignItems: 'center', marginTop: 40}}>
          <Pressable onPress={()=> navigation.navigate("SignIn")} style={{justifyContent: 'center', width: '90%'}}>
            <Text
              style={{
                borderColor: 'gray',
                borderWidth: 2,
                width: '100%',
                paddingVertical: 5,
                fontSize: 25,
                textAlign: 'center',
                borderRadius: 10,
              }}>
              Sign In
            </Text>
          </Pressable>
        </View>
        <View style={{alignItems: 'center', marginTop: 20}}>
        <Pressable onPress={()=> navigation.navigate("SignUp")} style={{justifyContent: 'center', width: '90%'}}>
            <Text
              style={{
                borderColor: 'gray',
                borderWidth: 2,
                width: '100%',
                paddingVertical: 5,
                fontSize: 25,
                textAlign: 'center',
                borderRadius: 10,
              }}>
              Sign Up
            </Text>
          </Pressable>
        </View>
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
