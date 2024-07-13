

import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {LineChart} from 'react-native-wagmi-charts';
import {COLORS, SIZES} from '../constants';
import moment from 'moment';
import { Dimensions } from 'react-native';


const Chart = ({containerStyle, chartPrices, Color}) => {
  const screenWidth = Dimensions.get('window').width;
  const adjustedWidth = screenWidth - 20;



  const startUnixTimestamp = moment().subtract(7, 'days').unix();

  const data = chartPrices.map((item, index) => ({
    timestamp: startUnixTimestamp + (index + 1) * 3600,
    value: item,
  }));


  const formateNumber=(value, roundingPoint)=>{
    if(value>1e9){
      return `${(value/1e9).toFixed(roundingPoint)}B`
    }
    else if(value>1e6){
      return `${(value/1e6).toFixed(roundingPoint)}M`
    }
    else if(value>1e3){
      return `${(value/1e3).toFixed(roundingPoint)}K`
    }else{
      return value.toFixed(roundingPoint)
    }
  }

  const getAxisLabelValues=()=>{
    if(chartPrices!=undefined){
      let minValue= Math.min(...chartPrices)
      let maxValue= Math.max(...chartPrices)
      let mid= (maxValue+ minValue)/2

      let higherMidValue= (maxValue+mid)/2
      let lowerMidValue= (minValue+mid)/2

      let roundingPoint=2

      return [
        formateNumber(maxValue, roundingPoint),
        formateNumber(higherMidValue, roundingPoint),
        formateNumber(lowerMidValue, roundingPoint),
        formateNumber(minValue, roundingPoint),
      ]
    }else{
      return []
    }
  }

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
        {
          getAxisLabelValues().map((item, index)=>{
            return (
              <Text key={index}
              style={{color:COLORS.lightGray3}}>
                {item}
              </Text>
            )
          })
        }

      </View>

      {/* chart  */}
      <LineChart.Provider  data={data}>
        <LineChart width={adjustedWidth} color="white" height={150}>
          <LineChart.Path color={Color} />
          <LineChart.CursorCrosshair color='white'>
            <LineChart.Tooltip
              textStyle={{
                backgroundColor: 'black',
                borderRadius: 4,
                color: 'white',
                fontSize: 10,
                padding: 4,
              }}
            />
            <LineChart.Tooltip
              position="bottom"
              >
              <LineChart.DatetimeText
                textStyle={{
                  color: 'white',
                  fontSize: 10,
                }}
              />
            </LineChart.Tooltip>
          </LineChart.CursorCrosshair>
        </LineChart>
      </LineChart.Provider>
    </View>
  )
}

export default Chart;