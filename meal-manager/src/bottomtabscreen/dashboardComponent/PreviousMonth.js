import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import {Context as AuthContext} from '../../context/AuthContext';
import {Context as MessContext} from '../../context/MessContext';
import {Context as PreviousMonthContext} from '../../context/PreviousMonthContext';

import PreviousMessDetailsScreen from './PreviousMonthComponent/PreviousMessDetailsScreen';

import moment from 'moment';

import Header from '../../component/Header';
import NoNetConnection from '../../otherScreen/NoNetConnection';

let manager = 0;

console.disableYellowBox = true;

const PreviousMonth = ({navigation}) => {
  const {
    state: {loading, UserID, messMember, mess},
  } = useContext(MessContext);

  const {
    state: {loading2},
    PMonthTotalMeals,
    PMonthTotalCosts,
    PMonthMemberMoney,
    PMonthMemberMeals,
    PMonthMemberBazarList,
    PMealListDuplicate,
    PBazarListDuplicate,
    PMonthExtraCostsList,
    PreviousOtherCostsDuplicate,
  } = useContext(PreviousMonthContext);

  const [monthStart] = useState(
    moment()
      .subtract(1, 'months')
      .startOf('month')
      .format('YYYY-MM-DD')
      .toString(),
  );
  const [monthEnd] = useState(
    moment()
      .subtract(1, 'months')
      .endOf('month')
      .format('YYYY-MM-DD')
      .toString(),
  );
  const [checkNetConnetion, setCheckNetConnetion] = useState(true);
  const [firstLoading, setFirstloading] = useState(true);

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      setTimeout(function() {
        setFirstloading(false);
      }, 1000);

      navigation.addListener('focus', () => {
        PMonthTotalMeals({monthStart, monthEnd}),
          PMonthTotalCosts({monthStart, monthEnd}),
          PMonthMemberMoney({monthStart, monthEnd}),
          PMonthMemberMeals({monthStart, monthEnd}),
          PMonthMemberBazarList({monthStart, monthEnd}),
          PBazarListDuplicate({monthStart, monthEnd}),
          PMealListDuplicate({monthStart, monthEnd}),
          PMonthExtraCostsList({monthStart, monthEnd});
          PreviousOtherCostsDuplicate({monthStart, monthEnd});

        ToastAndroid.show(' Previous month History ', ToastAndroid.SHORT);
      });

      NetInfo.addEventListener(state => {
        {
          !unmounted ? setCheckNetConnetion(state.isConnected) : null;
        }
        {
          state.isConnected == true
            ? (PMonthTotalMeals({monthStart, monthEnd}),
              PMonthTotalCosts({monthStart, monthEnd}),
              PMonthMemberMoney({monthStart, monthEnd}),
              PMonthMemberMeals({monthStart, monthEnd}),
              PMonthMemberBazarList({monthStart, monthEnd}),
              PBazarListDuplicate({monthStart, monthEnd}),
              PMealListDuplicate({monthStart, monthEnd}),
              PMonthExtraCostsList({monthStart, monthEnd}),
              PreviousOtherCostsDuplicate({monthStart, monthEnd}))
            : null;
        }
      });
    }

    return () => {
      unmounted = true;
    };
  }, [checkNetConnetion]);

  if (mess === undefined) {
    return null;
  }

  {
    messMember ? (manager = messMember.find(i => i.user_id == UserID)) : null;
  }

  if (!checkNetConnetion) {
    return <NoNetConnection />;
  }

  if (loading || loading2 || firstLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#2D8575" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {/*Start Header Area*/}
      <View>
        <Header navigation={navigation} title="Previous Month History" />
      </View>
      {/*End Header Area*/}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1, backgroundColor: '#f0f4ff'}}>
          {/*Start Mess Area*/}

          {mess.length
            ? mess.map(item => {
                return (
                  <View
                    key={item.id}
                    style={{alignItems: 'center', paddingTop: '2%'}}>
                    <PreviousMessDetailsScreen
                      History={0}
                      navigation={navigation}
                      id={item.id}
                    />
                  </View>
                );
              })
            : null}

          {/*End Mess Area*/}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mainStyles = StyleSheet.create({});

export default PreviousMonth;
