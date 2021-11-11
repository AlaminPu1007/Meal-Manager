import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  ToastAndroid,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Context as MessContext} from '../context/MessContext';
import moment from 'moment';
import NoNetConnection from '../otherScreen/NoNetConnection';
import NetInfo from '@react-native-community/netinfo';
import Header from '../component/Header';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Icon} from '@up-shared/components';

const {width} = Dimensions.get('window');

console.disableYellowBox = true;

const NotificationScreen = ({navigation}) => {
  const {
    state: {UserID, notificationList},
    FetchNotification,
    NotificationIsSeen,
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
    navigation.addListener('focus', () => {
      ToastAndroid.show(' Notification ', ToastAndroid.SHORT);
    });
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      {
        UserID ? FetchNotification({monthStart, monthEnd, UserID}) : null;
      }
    });

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

  if (!checkNetConnetion) {
    return <NoNetConnection />;
  }

  // console.log(notificationList.length, 'notificationList\n');

  return (
    <SafeAreaView style={{flex: 1}}>
      {/*Start Header Area*/}
      <View>
        <Header navigation={navigation} title="Notification" />
      </View>
      {/*End Header Area*/}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{flex: 1, paddingBottom: '1%', backgroundColor: '#f0f4ff'}}>
          <View style={{flex: 1}}>
            {notificationList ? (
              notificationList.length ? (
                notificationList
                  .map(item => {
                    return (
                      <View key={item.id} style={styles.mapContainer}>
                        <TouchableOpacity
                          activeOpacity={item.is_seen === 0 ? 0.5 : 1}
                          style={{width: '100%', alignItems: 'center'}}
                          onPress={() => {
                            item.is_seen === 0
                              ? NotificationIsSeen(
                                  item.id,
                                  monthStart,
                                  monthEnd,
                                  UserID,
                                )
                              : null;
                          }}>
                          {/* Main Notification Box */}
                          <View
                            style={
                              item.is_seen === 0
                                ? [
                                    styles.notificationWrap,
                                    {backgroundColor: '#dcd9f4'},
                                  ]
                                : styles.notificationWrap
                            }>
                            {/* Notification Icon & Text View */}
                            <View style={styles.NotificationStyle}>
                              {/* Icon View */}
                              <View
                                style={{
                                  width: '20%',
                                  alignItems: 'center',
                                  marginRight: '1%',
                                }}>
                                <View
                                  style={
                                    item.is_seen === 0
                                      ? [
                                          styles.notificationIcon,
                                          {backgroundColor: '#5842f4'},
                                        ]
                                      : styles.notificationIcon
                                  }>
                                  <Icon
                                    name="icon_notification"
                                    size={24}
                                    color="#FFF"
                                  />
                                </View>
                              </View>
                              {/* Icon View */}

                              {/* Text View */}
                              <View style={{width: '80%'}}>
                                <Text style={styles.notificationTx}>
                                  {item.notification}
                                </Text>
                              </View>
                              {/* Text View */}
                            </View>
                            {/* Notification Icon & Text View */}

                            {/* Notification Date */}
                            <View style={styles.NotificationDate}>
                              <Text style={styles.NotificationDateText}>
                                {item.date}
                              </Text>
                            </View>
                            {/* Notification Date */}
                          </View>
                          {/* Main Notification Box */}
                        </TouchableOpacity>
                      </View>
                    );
                  })
                  .reverse()
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text> no notification... </Text>
                </View>
              )
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text> no notification... </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: '3%',
  },

  notificationWrap: {
    width: '90%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    shadowColor: '#edf2fc',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 6,
    borderRadius: Dimensions.get('window').width * 0.08,
    paddingTop: '4%',
    paddingBottom: '3%',
  },

  NotificationStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
  },

  notificationIcon: {
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.15,
    height: Dimensions.get('window').width * 0.15,
    borderRadius: 1000,
    justifyContent: 'center',
    backgroundColor: '#c4ccd1',
  },

  notificationTx: {
    fontSize: RFPercentage(2.4),
    color: '#3b363c',
  },

  NotificationDate: {
    width: '95%',
    alignItems: 'flex-end',
  },

  NotificationDateText: {
    color: '#909cc3',
    fontSize: RFPercentage(2.2),
  },
});

export default NotificationScreen;
