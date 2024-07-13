import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Earn from '../assets/images/Earn.png';
import Trade from '../assets/images/Trade.png';
import Frame from '../assets/images/Frame.png';
import Illustration from '../assets/images/Illustration.png';
import Home from '../assets/images/Home.jpg';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Main() {
  const navigation = useNavigation();
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('TradeWithGPT');
        if (!value) {
          console.log('there are issue in async or async is empty');
        } else {
          navigation.navigate('MainLayout');
        }
      } catch (e) {
        console.log('error in async', e);
      }
    };
    getData();
  }, []);

  return (
    <ScrollView style={{backgroundColor: 'black', flex: 1, paddingBottom: 30}}>
      <View style={{flex: 1, marginTop: 55, marginLeft: 10, marginBottom: 30}}>
        <View>
          <Text
            style={{
              fontSize: 45,
              paddingHorizontal: 20,
              textAlign: 'center',
              fontWeight: 600,
              lineHeight: 60,
              color: '#e3e0e0',
            }}>
            Quickly Grow Your Money with TradeWithGPT
          </Text>
          <Text
            style={{
              fontSize: 20,
              paddingHorizontal: 30,
              textAlign: 'center',
              paddingTop: 20,
              lineHeight: 30,
            }}>
            TradeWithGPT is the easiest place to buy and sell your assets. Buy
            Bitcoin, Ethereum and other digital assets within minutes
          </Text>
        </View>
        <View></View>
        <View style={{alignItems: 'center', marginTop: 40}}>
          <Pressable
            onPress={() => navigation.navigate('GetStarted')}
            style={{justifyContent: 'center'}}>
            <Text
              style={{
                borderColor: 'gray',
                borderWidth: 2,
                width: 250,
                paddingVertical: 5,
                fontSize: 30,
                textAlign: 'center',
                borderRadius: 10,
              }}>
              Get Started
            </Text>
          </Pressable>
        </View>
        <View>
          <Text style={{fontSize: 18, textAlign: 'center', marginTop: 20}}>
            No Waitlist - available for download
          </Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Image source={Trade} />
        </View>
        <View>
          <Text style={{fontSize: 30, textAlign: 'center', marginTop: 20}}>
            Accessible to Anyone
          </Text>
          <Text
            style={{
              fontSize: 15,
              textAlign: 'center',
              lineHeight: 25,
              paddingTop: 15,
            }}>
            Lightning fast transaction.
          </Text>
          <Text style={{fontSize: 15, textAlign: 'center', lineHeight: 25}}>
            Buy and sell with ease and peace of mind.
          </Text>
          <Text style={{fontSize: 15, textAlign: 'center', lineHeight: 25}}>
            {' '}
            Invest in cryptocurrency today with just a few clicks
          </Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Image source={Home} />
        </View>
        <View>
          <Text
            style={{
              fontSize: 35,
              paddingHorizontal: 20,
              textAlign: 'center',
              fontWeight: 600,
              marginTop: 30,
              lineHeight: 50,
            }}>
            Earn more Money when you Shop
          </Text>
          <Text
            style={{
              fontSize: 18,
              paddingHorizontal: 30,
              textAlign: 'center',
              lineHeight: 25,
              marginTop: 20,
            }}>
            Earn bonus investments by shopping at thousands of top brands —
            including ones you likely shop at anyway!
          </Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 40}}>
          <Image source={Earn} />
        </View>
        <View style={{alignItems: 'center', marginTop: 40}}>
          <Pressable
            onPress={() => navigation.navigate('GetStarted')}
            style={{justifyContent: 'center', width: '90%'}}>
            <Text
              style={{
                borderColor: 'gray',
                borderWidth: 2,
                width: '100%',
                paddingVertical: 5,
                fontSize: 30,
                textAlign: 'center',
                borderRadius: 10,
              }}>
              Get Started
            </Text>
          </Pressable>
        </View>
        <View>
          <Text
            style={{
              fontSize: 35,
              paddingHorizontal: 20,
              textAlign: 'center',
              fontWeight: 600,
              marginTop: 30,
              lineHeight: 50,
            }}>
            Join Our Team
          </Text>
          <Text
            style={{
              fontSize: 15,
              paddingHorizontal: 30,
              textAlign: 'center',
              fontWeight: 400,
              marginTop: 10,
              lineHeight: 20,
            }}>
            Each author receives dividends from TradeWithGPT and subscribers
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 35,
              paddingHorizontal: 20,
              textAlign: 'center',
              fontWeight: 600,
              marginTop: 50,
              lineHeight: 45,
            }}>
            Our authors use all the TradeWithGPT Tools for free
          </Text>
          <View style={{alignItems: 'center', marginTop: 10}}>
            <Image source={Illustration} />
          </View>
        </View>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Pressable
            onPress={() => navigation.navigate('GetStarted')}
            style={{justifyContent: 'center', width: '90%'}}>
            <Text
              style={{
                borderColor: 'gray',
                borderWidth: 2,
                width: '100%',
                paddingVertical: 5,
                fontSize: 30,
                textAlign: 'center',
                borderRadius: 10,
              }}>
              Get Started
            </Text>
          </Pressable>
        </View>
        <View>
          <Text style={{fontSize: 20, textAlign: 'center', marginTop: 25}}>
            Thanks for support
          </Text>
          <Text style={{fontSize: 12, textAlign: 'center', marginTop: 5}}>
            @2024 All rights reserved
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
