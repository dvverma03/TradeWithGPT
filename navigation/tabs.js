import React, { useEffect, useState } from 'react';
import {TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Home, Portfolio, Market, Profile} from '../screens';
import {COLORS, icons} from '../constants';
import {TabIcon} from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { toggleVisible } from '../store/isVisibleSlice';
import TradingViewWidget from '../screens/NewsScreen';
const Tab = createBottomTabNavigator();

const selectIsVisible = (state) => state.isTradeVisible.isVisible;

const TabBarCustomButton = ({children, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const Tabs = () => {
    const [isTradeModelVisible, setIsTradeModelVisible]= useState(false)
    const dispatch = useDispatch();
    const isVisible = useSelector(selectIsVisible);
    const tradeTabButtonHandler=()=>{
        setIsTradeModelVisible(!isTradeModelVisible)
        dispatch(toggleVisible())
    }
  return (
    <Tab.Navigator
      screenOptions={{
        showLabel: false,
        tabBarActiveTintColor: 'white', 
        tabBarInactiveTintColor: 'red', 
        tabBarLabelStyle: {fontSize: 15},
        tabBarStyle: {
          backgroundColor:COLORS.gray,
          height: 95,
          paddingTop: 20,
        },
        headerShown:false
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            if(!isTradeModelVisible){

                return <TabIcon focused={focused} icon={icons.home} label='Home' />;
            }
          },
          tabBarLabel:''
        }}
        listeners={{
            tabPress: e=>{
                if(isTradeModelVisible){
                    e.preventDefault()
                }
            }
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          tabBarIcon: ({focused}) => {
            if(!isTradeModelVisible){

                return <TabIcon focused={focused} icon={icons.briefcase} label='Portfolio' />;
            }
          },
          tabBarLabel:''
        }}
        listeners={{
            tabPress: e=>{
                if(isTradeModelVisible){
                    e.preventDefault()
                }
            }
        }}
      />
      <Tab.Screen
        name="News"
        component={TradingViewWidget}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <TabIcon focused={focused} icon={isTradeModelVisible?icons.close: icons.trade} iconStyle={isTradeModelVisible?{height:15, width:15}:null} isTrade={true} label='News' />
            );
          },
          
          tabBarLabel:''
        }}
      />
      <Tab.Screen
        name="Market"
        component={Market}
        options={{
          tabBarIcon: ({focused}) => {
              
            if(!isTradeModelVisible){
                return <TabIcon focused={focused} icon={icons.market} label='Market' />;
            }
          },
          tabBarLabel:''
        }}
        listeners={{
            tabPress: e=>{
                if(isTradeModelVisible){
                    e.preventDefault()
                }
            }
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => {
            if(!isTradeModelVisible){

                return <TabIcon focused={focused} icon={icons.profile} label='Profile'  />;
            }
          },
          tabBarLabel:''
        }}
        listeners={{
            tabPress: e=>{
                if(isTradeModelVisible){
                    e.preventDefault()
                }
            }
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
