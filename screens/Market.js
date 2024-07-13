import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import MainLayout from './MainLayout';
import {COLORS, SIZES, FONTS, icons} from '../constants';
import Headerbar from '../components/Headerbar';
import marketTabs from '../constants/constants';
import TextButton from '../components/TextButton';
import Animated from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import Chart from '../components/Chart';
import MarketChart from '../components/MarketChart';
import ActiveIndicator from '../components/ActiveIndecator';
import IconTextButton from '../components/IconTextButton';

export default function Market() {
  const {coins} = useSelector(store => store?.coins)

  if (!coins) {
    return <ActiveIndicator />;
  }

  const Tabs = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        {/* Tabs  */}
        {marketTabs?.marketTabs?.map((item, index) => {
          return (
            <TouchableOpacity key={`marketTab-${index}`} style={{flex: 1}}>
              <View
                ref={item.ref}
                style={{
                  paddingHorizontal: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                }}>
                <Text
                  style={{
                    color: COLORS.white,
                    ...FONTS.h3,
                  }}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  

  const renderButtons = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
        }}>
        <TextButton label="USD" />
        <TextButton
          label="% (7d)"
          containerStyle={{
            marginLeft: SIZES.base,
          }}
        />
        <TextButton
          label="Top"
          containerStyle={{
            marginLeft: SIZES.base,
          }}
        />
      </View>
    );
  };

  const renderList = () => {
    return (
      <Animated.FlatList
        data={marketTabs?.marketTabs}
        contentContainerStyle={{
          marginTop: SIZES.padding,
        }}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                flex: 1,
                width: SIZES.width,
              }}>
              <FlatList
                data={coins}
                keyExtractor={item => item?.id}
                renderItem={({item, index}) => {

                  let priceColor =
                    item?.price_change_percentage_7d_in_currency == 0
                      ? COLORS.lightGray3
                      : item?.price_change_percentage_7d_in_currency > 0
                      ? COLORS.lightGreen
                      : COLORS.red;
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingLeft: 12,
                        marginBottom: SIZES.radius,
                      }}>
                      <View
                        style={{
                          flex: 1.5,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={{uri: item?.image}}
                          style={{
                            height: 20,
                            width: 20,
                            borderRadius: 15,
                          }}
                        />
                        <Text
                          style={{
                            marginLeft: SIZES.radius,
                            color: COLORS.white,
                            ...FONTS.h3,
                            width:100
                          }}>
                          {item?.name}
                        </Text>
                      </View>
                      <View style={{flex:1, alignItems:'center'}}>
                        <MarketChart
                          chartPrices={item?.sparkline_in_7d?.price}
                          Color={priceColor}
                          containerStyle={{
                            color: 'white',
                          }}
                        />
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                          paddingRight: 20,
                        }}>
                        <Text
                          style={{
                            color: COLORS.white,
                            ...FONTS.h4,
                          }}>
                          $ {item?.current_price}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                          }}>
                          {item?.price_change_percentage_7d_in_currency !=
                            0 && (
                            <Image
                              source={icons.upArrow}
                              style={{
                                height: 10,
                                width: 10,
                                tintColor: priceColor,
                                transform:
                                  item?.price_change_percentage_7d_in_currency >
                                  0
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
                    </View>
                  );
                }}
              />
            </View>
          );
        }}
      />
    );
  };

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
          paddingHorizontal: 10,
        }}>
        {/* Header  */}
        <Headerbar title="Market" />

        {/* buttons  */}
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 10,
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


        {/* Buttons  */}
        {renderButtons()}

        {/* Market list  */}
        {renderList()}
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({});
