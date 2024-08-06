import React, { useEffect } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {enableScreens} from 'react-native-screens';
enableScreens();

import Tabs from './navigation/tabs';
import {Provider} from 'react-redux';
import appStore from './store/appStore';
import ChatGPT from './screens/ChatGPT';
import Main from './screens/Main';
import GetStarted from './screens/GetStarted';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import TradingViewWidget from './screens/NewsScreen';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#4B009A', // Set your drawer background color here
        },
        drawerActiveTintColor: 'white', // Active item text color
        drawerInactiveTintColor: 'white', // Inactive item text color
        drawerActiveBackgroundColor: '#6200EC', // Active item background color
        itemStyle: {marginVertical: 5},
        labelStyle: {fontSize: 18},
      }}>
      <Drawer.Screen
        options={{
          headerStyle: {
            backgroundColor: '#6200EC',
          },
          headerTintColor: 'white',
          headerTitle: '',
        }}
        name="StockX"
        component={Main}
      />
      <Drawer.Screen
        options={{
          headerStyle: {
            backgroundColor: '#6200EC',
          },
          headerTintColor: 'white',
          headerTitle: '',
        }}
        name="News"
        component={TradingViewWidget}
      />
    </Drawer.Navigator>
  );
}

const App = () => {

  useEffect(()=>{
    SplashScreen.hide()
  },[])
  return (
    <Provider store={appStore}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Main'}>
          <Stack.Screen
            name="Main"
            component={MyDrawer}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="GetStarted"
            component={GetStarted}
            options={{
              headerStyle: {
                backgroundColor: '#6200EC',
              },
              headerTintColor: 'white',
              headerTitle: '',
            }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              headerStyle: {
                backgroundColor: '#6200EC', // Set your header color here
              },
              headerTintColor: 'white',
              headerTitle: '',
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              headerStyle: {
                backgroundColor: '#6200EC', // Set your header color here
              },
              headerTintColor: 'white',
              headerTitle: '',
            }}
          />
          <Stack.Screen
            name="MainLayout"
            component={Tabs}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            options={{
              headerStyle: {
                backgroundColor: '#6200EC',
              },
              headerTintColor: 'white',
              headerTitle: '',
            }}
            name="Ask anything"
            component={ChatGPT}
          />
          <Stack.Screen
            name="News"
            component={TradingViewWidget}
            options={{
              headerStyle: {
                backgroundColor: '#6200EC',
              },
              headerTintColor: 'white',
              headerTitle: '',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
