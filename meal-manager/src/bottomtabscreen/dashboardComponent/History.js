import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import {Context as MessContext} from '../../context/MessContext';
import {Context as PreviousMonthContext} from '../../context/PreviousMonthContext';

import Header from '../../component/Header';

import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import NoNetConnection from '../../otherScreen/NoNetConnection';

console.disableYellowBox = true;

const History = ({navigation}) => {
  const {HistoryMonthYearName} = useContext(PreviousMonthContext);

  const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));

  const [monthStart, setMonthStart] = useState(
    new moment()
      .startOf('month')
      .format('YYYY-MM-DD')
      .toString(),
  );
  const [monthEnd, setMonthEnd] = useState(
    new moment()
      .endOf('month')
      .format('YYYY-MM-DD')
      .toString(),
  );
  const [checkNetConnetion, setCheckNetConnetion] = useState(true);
  const [Year, setYear] = useState(
    new moment()
      .endOf('month')
      .format('YYYY')
      .toString(),
  );

  let date_number = new moment()
    .endOf('month')
    .format('MM')
    .toString();

  const [Month, setMonth] = useState(
    moment()
      .month(date_number - 1)
      .format('MMMM')
      .toString(),
  );
  const [HistoryYM, setHistoryYM] = useState(
    new moment()
      .endOf('month')
      .format('YYYY-MM')
      .toString(),
  );

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
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

  const renderMonth = month => {
    if (month.month >= 1 && month.month <= 9) {
      setMonthStart(month.year + '-' + '0' + month.month + '-' + '01'),
        setMonthEnd(month.year + '-' + '0' + month.month + '-' + '31'),
        setHistoryYM(month.year + '-' + '0' + month.month);
    } else {
      setMonthStart(month.year + '-' + month.month + '-' + '01'),
        setMonthEnd(month.year + '-' + month.month + '-' + '31'),
        setHistoryYM(month.year + '-' + month.month);
    }

    setYear(month.year),
      setMonth(
        moment()
          .month(month.month - 1)
          .format('MMMM'),
      );
  };

  const checkMonth = () => {
    if (monthStart === '' || monthEnd === '') {
      alert(" Can't select current month ");
    } else {
      navigation.navigate('History Mess', {
        Pitem: {monthStart, monthEnd, Year, Month, HistoryYM},
        History: 1,
        HistoryDate: monthStart,
      }),
        HistoryMonthYearName(` ${Month} ${Year} `);
    }
  };

  if (!checkNetConnetion) {
    return <NoNetConnection />;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {/*Start Header Area*/}
      <View>
        <Header navigation={navigation} title="Previous History" />
      </View>
      {/*End Header Area*/}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1, backgroundColor: '#f0f4ff'}}>
          {/*Start Body Area*/}
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              paddingVertical: '2%',
              justifyContent: 'center',
            }}>
            <View style={{width: '100%', alignItems: 'center'}}>
              <View style={{width: '100%', alignItems: 'center'}}>
                <View style={{width: '95%', alignItems: 'center'}}>
                  <View
                    style={{
                      width: '100%',
                      paddingVertical: '1%',
                      elevation: 8,
                    }}>
                    <Calendar
                      current={currentDate}
                      onDayPress={day => {
                        setCurrentDate(day.dateString), checkMonth();
                      }}
                      onMonthChange={month => {
                        renderMonth(month);
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
            {/*End calendar Area*/}
          </View>
          {/*End Body Area*/}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default History;
