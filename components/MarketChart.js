import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {LineChart} from 'react-native-wagmi-charts';
import {COLORS, SIZES} from '../constants';
import moment from 'moment';
import { Dimensions } from 'react-native';


const MarketChart = ({containerStyle, chartPrices, Color}) => {
  const screenWidth = Dimensions.get('window').width;
  const adjustedWidth = screenWidth - 20;
  const startUnixTimestamp = moment().subtract(7, 'days').unix();
  const data = chartPrices.map((item, index) => ({
    timestamp: startUnixTimestamp + (index + 1) * 3600,
    value: item,
  }));

  return (
    <View style={{...containerStyle}}>
      {/* y axis label  */}
      <View style={{
        position:'absolute',
        top:0,
        bottom:0,
        justifyContent:'space-between',
        left:15

      }}>
      </View>
      {/* chart  */}
      <LineChart.Provider  data={data}>
        <LineChart width={120} color="white" height={80}>
          <LineChart.Path color={Color} />
        </LineChart>
      </LineChart.Provider>
    </View>
  )
}

export default MarketChart;


