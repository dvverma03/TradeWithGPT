import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainLayout from './MainLayout';
import {COLORS, SIZES, icons, FONTS} from '../constants';
import BalanceInfo from '../components/BalanceInfo';
import {holdings} from '../constants/dummy';
import fetchHoldingData from '../components/fetchHoldingData';
import Chart from '../components/Chart';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import ActiveIndicator from '../components/ActiveIndecator';
import IconTextButton from '../components/IconTextButton';

export default function Home() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [data, setData] = useState();
  const [data1, setData1] = useState();
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState();
  const {holding} = useSelector((store)=> store?.holding)

  useEffect(() => {
      const fun =() => {
        const data = holding
        setData(data[0][0]?.sparkline_in_7d)
        setData1(data)
        let amount = 0;

        data.forEach((e, index) => {
          const currAmount = e[0]?.current_price * holdings[index].qty;
          amount += currAmount;
        });
        setTotalAmount(Number(amount).toFixed(2));
      };
      fun()
  }, []);

  const renderWalletInfoSection = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}>
        <Text style={{fontSize: 40, marginTop: 20, fontWeight: 600}}>
          Portfolio
        </Text>
        {/* balance info section  */}
        <BalanceInfo
          title="Current Balance"
          displayAmount={totalAmount}
          changePct={2.3}
          containerStyle={{marginBottom: 5, marginTop: 10}}
        />
        {/* buttons  */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            marginBottom: -15,
            paddingHorizontal: SIZES.radius,
          }}>
          <IconTextButton
            label="Ask Chat-GPT anythings"
            icon={icons.market}
            containerStyle={{
              flex: 1,
              height: 40,
              marginRight: SIZES.radius,
            }}
            onPress={() => navigation.navigate('Ask anything')}
          />
        </View>
      </View>
    );
  };

  if (!data || !coins) {
    return <ActiveIndicator />;
  }


  return (
    <MainLayout>
      <View style={{flex: 1, backgroundColor: COLORS.black}}>
        {/* header  */}
        {renderWalletInfoSection()}

        {/* chart  */}
        <View style={{height: 190, marginTop: 20, paddingHorizontal:10}}>
          {data?.price && (
            <Chart
              chartPrices={
                selectedCoin
                  ? selectedCoin?.sparkline_in_7d?.price
                  : data?.price
              }
              containerStyle={{
                color: 'white',
                marginTop: 30,
              }}
              Color={selectedCoin? selectedCoin?.price_change_percentage_7d_in_currency == 0
                ? COLORS.lightGray3
                : selectedCoin?.price_change_percentage_7d_in_currency > 0
                ? COLORS.lightGreen
                : COLORS.red: COLORS.lightGreen}
            />
          )}
        </View>

        {/* Top cryptoCurrency  */}
        {data1?.length > 0 && (
          <FlatList
            data={data1}
            keyExtractor={item => item[0]?.id}
            contentContainerStyle={{
              marginTop: 30,
              paddingHorizontal: SIZES.padding,
              paddingBottom:30
            }}
            ListHeaderComponent={
              <View style={{marginBottom: SIZES.radius}}>
                <Text style={{color: COLORS.white, fontSize: 18}}>
                  Your Assets
                </Text>
                <View 
                style={{
                  flexDirection:'row',
                  marginTop:SIZES.radius
                }}
                >
                  <Text style={{flex:1, color:COLORS.lightGray3}}>Asset</Text>
                  <Text style={{flex:1, color:COLORS.lightGray3, textAlign:'right'}}>Price</Text>
                  <Text style={{flex:1, color:COLORS.lightGray3, textAlign:'right'}}>Holding</Text>

                </View>
              </View>
            }
            renderItem={({item,index}) => {
              let priceColor =
                item[0]?.price_change_percentage_7d_in_currency == 0
                  ? COLORS.lightGray3
                  : item[0]?.price_change_percentage_7d_in_currency > 0
                  ? COLORS.lightGreen
                  : COLORS.red;
              return (
                <TouchableOpacity
                  style={{
                    height: 55,
                    flexDirection: 'row',
                  }}
                  onPress={() => setSelectedCoin(item[0])}>
                  {/* Assets  */}
                  <View style={{
                        flex:1,
                        flexDirection:'row',
                        alignItems:'center'
                      }}>
                    <Image
                      source={{uri: item[0]?.image}}
                      style={{
                        height: 20,
                        width: 20,
                      }}
                    />
                    <Text style={{color: COLORS.white, ...FONTS.h4, marginLeft:SIZES.radius}}>{item[0]?.name}</Text>
                  </View>

                  {/* Price  */}
                  <View style={{
                    flex:1,
                    justifyContent:'center'
                  }}>
                    <Text
                      style={{
                        textAlign: 'right',
                        color: COLORS.white,
                        ...FONTS.h4,lineHeight:15
                      }}>
                      $ {item[0]?.current_price}
                    </Text>
                    <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'flex-end'}}>
                      {item[0]?.price_change_percentage_7d_in_currency != 0 && (
                        <Image
                          source={icons.upArrow}
                          style={{
                            height: 10,
                            width: 10,
                            tintColor: priceColor,
                            transform:
                              item[0]?.price_change_percentage_7d_in_currency > 0
                                ? [{rotate: '45deg'}]
                                : [{rotate: '125deg'}],
                          }}
                        />
                      )}
                      <Text
                        style={{
                          marginLeft: 5,
                          color: priceColor,
                          ...FONTS.body5,
                          lineHeight: 15,
                        }}>
                        {item[0]?.price_change_percentage_7d_in_currency.toFixed(
                          2,
                        )}
                        %
                      </Text>
                    </View>
                  </View>

                  {/* holding  */}
                  <View
                  style={{
                    flex:1,
                    justifyContent:'center'
                  }}
                  >
                    <Text style={{textAlign:'right', color:COLORS.white, ...FONTS.h4,
                      lineHeight:15
                    }}>{Number(holdings[index]?.qty*item[0]?.current_price).toFixed(2)}</Text>
                    <Text style={{textAlign:'right', color:COLORS.white, ...FONTS.h4,
                      lineHeight:15
                    }}>{Number(holdings[index]?.qty)}{item[0]?.symbol.toUpperCase()}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}

      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({});
