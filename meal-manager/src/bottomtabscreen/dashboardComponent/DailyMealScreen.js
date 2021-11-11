import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  ToastAndroid,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Context as MessContext} from '../../context/MessContext';
import Header from '../../component/Header';
import DailyMealMemberView from './DailyMealComponent/DailyMealMemberView';
import CreateMealSingleView from './DailyMealComponent/CreateMealSingleView';

import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NetInfo from '@react-native-community/netinfo';
import NoNetConnection from '../../otherScreen/NoNetConnection';
import { RFPercentage } from 'react-native-responsive-fontsize';
import {useIsFocused} from '@react-navigation/native';

console.disableYellowBox = true;

const DailyMealScreen = ({navigation}) => {
  const isFocused = useIsFocused();

  const {
    state,
    state: {bazarCreateSuccess, messMember, UserID},
    fetchMeal,
    FetchNotification,
    clearMealEmptyError,
  } = useContext(MessContext);

  const [monthStart] = useState(
    new moment()
      .startOf('month')
      .format('YYYY-MM-DD')
      .toString(),
  );
  const [monthEnd] = useState(
    new moment()
      .endOf('month')
      .format('YYYY-MM-DD')
      .toString(),
  );
  const [checkNetConnetion, setCheckNetConnetion] = useState(true);

  useEffect(() => {
    {
      isFocused
        ? bazarCreateSuccess == 'Added successfully' ||
          bazarCreateSuccess == 'Edited successfully' ||
          bazarCreateSuccess == 'Deleted successfully'
          ? ToastAndroid.show(bazarCreateSuccess, ToastAndroid.SHORT)
          : null
        : null;
    }

    {
      isFocused
        ? bazarCreateSuccess
          ? (fetchMeal({monthStart, monthEnd}),
            FetchNotification({monthStart, monthEnd, UserID}))
          : null
        : null;
    }
  }, [bazarCreateSuccess]);

  useEffect(() => {
    navigation.addListener('blur', () => {
      clearMealEmptyError();
    });

    let unmounted = false;

    if (!unmounted) {
      navigation.addListener('blur', () => {
        setVisible(false);
      });

      NetInfo.addEventListener(state => {
        {
          !unmounted ? setCheckNetConnetion(state.isConnected) : null;
        }
      });
    }

    return () => {
      unmounted = true;
    };
  }, [checkNetConnetion]);

  const [date, setdate] = useState(moment().format('YYYY-MM-DD'));
  const [Visible, setVisible] = useState(false);

  const manager = messMember ? messMember.find(i => i.user_id == UserID) : null;

  state.loading ? (
    manager ? (
      manager.type === 1 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#2D8575" />
        </View>
      ) : null
    ) : null
  ) : null;

  if (!checkNetConnetion) {
    return <NoNetConnection />;
  }


  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#f0f4ff',
          paddingBottom: '1%',
        }}>
        {manager ? (
          manager.type === 1 ? (
            <View style={{flex: 1}}>
              {/*Start Header Area*/}
              <View>
                <Header navigation={navigation} title="Daily Meal" />
              </View>
              {/*End Header Area*/}
              <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}>
                <View style={{flex: 1, backgroundColor: '#f0f4ff'}}>
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      paddingBottom: '1%',
                    }}>
                    <View style={{width: '90%', alignItems: 'center'}}>
                      <View
                        style={{
                          width: '100%',
                          alignItems: 'center',
                          paddingBottom: '1%',
                          paddingTop: '3%',
                        }}>
                        <TouchableOpacity
                          activeOpacity={0.9}
                          style={{width: '100%', alignItems: 'center'}}
                          onPress={() => {
                            setVisible(!Visible);
                          }}>
                          <View style={{width: '100%', alignItems: 'center'}}>
                            <View style={styles.calendarBtn}>
                              <View
                                style={{
                                  width: '100%',
                                  alignItems: 'center',
                                }}>
                                <Text style={styles.calendarTx}> {date} </Text>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>

                      <View style={{width: '100%', alignItems: 'center'}}>
                        {Visible ? (
                          <View
                            style={{
                              width: '100%',
                              alignItems: 'center',
                              paddingBottom: '2%',
                            }}>
                            <View
                              style={{
                                alignItems: 'flex-end',
                                width: '100%',
                                zIndex: 1,
                              }}>
                              <MaterialIcons
                                name="cancel"
                                size={25}
                                color="#FF6666"
                                onPress={() => {
                                  setVisible(!Visible);
                                }}
                              />
                            </View>
                            <View
                              style={{
                                width: '95%',
                                marginTop: -15,
                                borderWidth: 1,
                                borderColor: '#ccc',
                              }}>
                              <Calendar
                                current={date}
                                disableArrowLeft={true}
                                disableArrowRight={true}
                                onDayPress={day => {
                                  setdate(day.dateString), setVisible(!Visible);
                                }}
                              />
                            </View>
                          </View>
                        ) : null}
                      </View>
                    </View>

                    <View>
                      {messMember
                        ? messMember.map(item => {
                            return (
                              <View
                                key={item.email}
                                style={{
                                  width: '100%',
                                  alignItems: 'center',
                                }}>
                                <CreateMealSingleView
                                  date={date}
                                  navigation={navigation}
                                  item={item}
                                />
                              </View>
                            );
                          })
                        : null}
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          ) : (
            <View style={{flex: 1}}>
              <DailyMealMemberView navigation={navigation} />
            </View>
          )
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  calendarBtn: {
    width: '100%',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 8,
    shadowColor: '#000000',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },

  calendarTx: {
    fontSize: RFPercentage(2.4),
  },
});

export default DailyMealScreen;
