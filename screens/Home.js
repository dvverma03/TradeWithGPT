import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainLayout from './MainLayout';
import {COLORS, SIZES, icons, FONTS} from '../constants';
import BalanceInfo from '../components/BalanceInfo';
import {holdings} from '../constants/dummy';
import fetchHoldingData from '../components/fetchHoldingData';
import IconTextButton from '../components/IconTextButton';
import Chart from '../components/Chart';
import TopCryptoCurrency from '../components/TopCryptoCurrency';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {addHolding} from '../store/holdingSlice';
import {addCoins} from '../store/coinsSlice';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActiveIndicator from '../components/ActiveIndecator';

export default function Home() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [data, setData] = useState();
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (!data) {
      const fetchData = async () => {
        const holdingData = await fetchHoldingData();
        dispatch(addHolding(holdingData));
        setData(holdingData[0][0]?.sparkline_in_7d);

        let amount = 0;
        holdingData.forEach((e, index) => {
          const currAmount = e[0]?.current_price * holdings[index].qty;
          amount += currAmount;
        });
        setTotalAmount(Number(amount).toFixed(2));

        const topCryptoData = await TopCryptoCurrency();
        dispatch(addCoins(topCryptoData));
        setCoins(topCryptoData);
      };

      const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('TradeWithGPT');
          if (value !== null) {
            console.log('stored value in home', value);
          }
        } catch (e) {
          console.log('error in async', e);
        }
      };
      fetchData();
      getData();
    }
  }, [data, dispatch, holdings]);

  if (!data || !coins) {
    return <ActiveIndicator />;
  }

  const renderWalletInfoSection = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}>
        {/* balance info section  */}
        <BalanceInfo
          title="Your Wallet"
          displayAmount={totalAmount}
          changePct={2.3}
          containerStyle={{marginTop: 30}}
        />
        {/* buttons  */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
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
            onPress={() => navigation.navigate("Ask anything")}
          />
        </View>
      </View>
    );
  };
  return (
    <MainLayout>
      <View style={{flex: 1, backgroundColor: COLORS.black}}>
        {/* header  */}
        {renderWalletInfoSection()}

        {/* chart  */}
        <View style={{height: 190, marginTop: 20}}>
          {data?.price && (
            <Chart
              chartPrices={
                selectedCoin
                  ? selectedCoin?.sparkline_in_7d?.price
                  : data?.price
              }
              Color={
                selectedCoin
                  ? selectedCoin?.price_change_percentage_7d_in_currency == 0
                    ? COLORS.lightGray3
                    : selectedCoin?.price_change_percentage_7d_in_currency > 0
                    ? COLORS.lightGreen
                    : COLORS.red
                  : COLORS.lightGreen
              }
              containerStyle={{
                color: 'white',
                marginTop: 30,
                paddingHorizontal: 10,
              }}
            />
          )}
        </View>

        {/* Top cryptoCurrency  */}
        {coins?.length > 0 && (
          <FlatList
            data={coins}
            keyExtractor={item => item.id}
            contentContainerStyle={{
              marginTop: 30,
              paddingHorizontal: SIZES.padding,
              paddingBottom: 30,
            }}
            ListHeaderComponent={
              <View style={{marginBottom: SIZES.radius}}>
                <Text style={{color: COLORS.white, fontSize: 18}}>
                  Top Cryptocurrency
                </Text>
              </View>
            }
            renderItem={({item}) => {
              let priceColor =
                item?.price_change_percentage_7d_in_currency == 0
                  ? COLORS.lightGray3
                  : item?.price_change_percentage_7d_in_currency > 0
                  ? COLORS.lightGreen
                  : COLORS.red;
              return (
                <TouchableOpacity
                  style={{
                    height: 55,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => setSelectedCoin(item)}>
                  {/* Logo  */}
                  <View style={{width: 35}}>
                    <Image
                      source={{uri: item.image}}
                      style={{
                        height: 20,
                        width: 20,
                      }}
                    />
                  </View>

                  {/* Name  */}
                  <View
                    style={{
                      flex: 1,
                    }}>
                    <Text style={{color: COLORS.white}}>{item?.name}</Text>
                  </View>

                  {/* Figures  */}
                  <View>
                    <Text
                      style={{
                        textAlign: 'right',
                        color: COLORS.white,
                        ...FONTS.h4,
                      }}>
                      $ {item.current_price}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      {item?.price_change_percentage_7d_in_currency != 0 && (
                        <Image
                          source={icons.upArrow}
                          style={{
                            height: 10,
                            width: 10,
                            tintColor: priceColor,
                            transform:
                              item.price_change_percentage_7d_in_currency > 0
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
                        {item?.price_change_percentage_7d_in_currency.toFixed(
                          2,
                        )}
                        %
                      </Text>
                    </View>
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
