import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  Alert,
  RefreshControl,
  View,
  Image,
  Linking,
  Dimensions,
  ActivityIndicator,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from './dashboardComponent/Header';
import {Context as AuthContext} from '../context/AuthContext';
import {Context as MessContext} from '../context/MessContext';

import moment from 'moment';

import MessDetailsScreen from './dashboardComponent/MessDetailsScreen';
import NetInfo from '@react-native-community/netinfo';
import NoNetConnection from '../otherScreen/NoNetConnection';
import ServerErrorToFetchMess from '../otherScreen/ServerErrorToFetchMess';
import {RFPercentage} from 'react-native-responsive-fontsize';

import profileBg from '../drawerscreen/images/sign_in.png';

const {width} = Dimensions.get('window');

// let manager = 0;
// need to change when upload on google play,
// require version 2.1
let AppVersion = 2.1; 

console.disableYellowBox = true;

// Refresh controller function
const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

const DashboardScreen = ({navigation}) => {
  const {
    state: {
      apkVersion,
      messLoading,
      bazarCreateSuccess,
      loading,
      UserID,
      mess,
      messMember,
      FetchMessErrorMessage,
    },
    fetchTotalMeal,
    fetchMess,
    fetchTotalCost,
    fetchMemberMoney,
    MealListDuplicate,
    GetdateCurrent,
    fetchMessMember,
    CheckUserID,
    fetchMeal,
    fetchBazarList,
    BazarListDuplicate,
    FetchNotification,
    fetchMemberProfile,
    MessOtherCosts,
    OtherCostsDuplicate,
    FetchImage,
    clearMessError,
  } = useContext(MessContext);

  const {clearLoginItem, clearResendVerificationId} = useContext(AuthContext);

  // console.log(apkVersion, AppVersion);
  // console.log(profileImage, 'profileImage\n');

  useEffect(() => {
    navigation.addListener('focus', () => {
      ToastAndroid.show(' Home ', ToastAndroid.SHORT);
    });

    // navigation.addListener('blur', () => {
    //   clearMessError();
    // });

    clearLoginItem();
    clearResendVerificationId();

    {
      apkVersion
        ? AppVersion !== apkVersion
          ? Alert.alert(
              'Update Meal Manager',
              'Meal manager is available right now. Press update to get latest version',
              [
                {
                  text: 'Cancel',
                  onPress: () => {},
                  style: 'Later',
                },
                {
                  text: 'Update',
                  onPress: async () =>
                    await Linking.openURL(
                      'https://play.google.com/store/apps/details?id=com.messmanager',
                    ),
                },
              ],
              {cancelable: false},
            )
          : null
        : null;
    }
  }, [apkVersion]);

  useEffect(() => {
    {
      bazarCreateSuccess
        ? bazarCreateSuccess === 'Member added successfully' ||
          bazarCreateSuccess === 'Member deleted successfully' ||
          bazarCreateSuccess === 'Mess created successfully' ||
          bazarCreateSuccess === 'Manager changes successfully'
          ? (ToastAndroid.show(bazarCreateSuccess, ToastAndroid.SHORT),
            fetchMess(),
            fetchMessMember())
          : null
        : null;
    }
  }, [bazarCreateSuccess]);

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
  const [firstLoading, setFirstloading] = useState(true);
  const [checkNetConnetion, setCheckNetConnetion] = useState(true);
  // Refresh controller
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', () => {
      {
        UserID ? FetchNotification({monthStart, monthEnd, UserID}) : null;
      }
    });

    {
      UserID ? FetchNotification({monthStart, monthEnd, UserID}) : null;
    }

    {
      UserID ? fetchMemberProfile(UserID) : null;
    }
  }, [UserID]);

  useEffect(() => {
    setTimeout(function() {
      setFirstloading(false);
    }, 1000);

    let unmounted = false;

    if (!unmounted) {
      navigation.addListener('focus', () => {
        fetchTotalMeal({monthStart, monthEnd});
        fetchTotalCost({monthStart, monthEnd});

        // fetchMess();
        // fetchMessMember();
        fetchMemberMoney({monthStart, monthEnd});

        CheckUserID();

        fetchMeal({monthStart, monthEnd});
        fetchBazarList({monthStart, monthEnd});

        BazarListDuplicate({monthStart, monthEnd});
        MealListDuplicate({monthStart, monthEnd});
        MessOtherCosts({monthStart, monthEnd});
        OtherCostsDuplicate({monthStart, monthEnd});

        GetdateCurrent();
        FetchImage();
      });

      NetInfo.addEventListener(state => {
        {
          !unmounted ? setCheckNetConnetion(state.isConnected) : null;
        }

        {
          state.isConnected == true
            ? (fetchMess(),
              fetchMessMember(),
              fetchTotalMeal({monthStart, monthEnd}),
              fetchTotalCost({monthStart, monthEnd}),
              fetchMemberMoney({monthStart, monthEnd}),
              CheckUserID(),
              fetchMeal({monthStart, monthEnd}),
              fetchBazarList({monthStart, monthEnd}),
              BazarListDuplicate({monthStart, monthEnd}),
              MealListDuplicate({monthStart, monthEnd}),
              MessOtherCosts({monthStart, monthEnd}),
              OtherCostsDuplicate({monthStart, monthEnd}),
              FetchImage())
            : null;
        }
      });
    }

    return () => {
      unmounted = true;
    };
  }, []);

  // Refresh controller function

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(500)
      .then(() => {
        setRefreshing(false),
          fetchMessMember(),
          fetchTotalMeal({monthStart, monthEnd}),
          fetchTotalCost({monthStart, monthEnd}),
          fetchMemberMoney({monthStart, monthEnd}),
          CheckUserID(),
          fetchMeal({monthStart, monthEnd}),
          fetchBazarList({monthStart, monthEnd}),
          MessOtherCosts({monthStart, monthEnd}),
          FetchImage();
      })
      .catch(err => {
        // console.log(err);
      });
  }, []);

  // Refresh controller function

  if (!checkNetConnetion || FetchMessErrorMessage) {
    return <ServerErrorToFetchMess />;
  }

  // console.log(messMember);

  // {
  // 	messMember
  // 	?  manager = messMember.find(i=>i.user_id == UserID)
  // 	: null
  // }

  const listMess = mess ? mess.find(i => i.id === mess[0].id) : 0;

  if (loading || messLoading || firstLoading || mess === undefined) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#2D8575" />
      </View>
    );
  }

  //// Mess details page child pass
  const MessId = () => {
    return listMess.id;
  };

  // Create Mess Function
  const CreateMessFunction = () => {
    navigation.navigate('CreateMess', {ID: 1});
  };

  return (
    <SafeAreaView style={styles.FlexStyle}>
      {listMess ? (
        <View style={styles.FlexStyle}>
          {/*Start Header Area*/}
          <View>
            <Header navigation={navigation} title="Home" />
          </View>
          {/*End Header Area*/}
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.ScrollViewStyle}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                progressViewOffset={40}
                colors={['#059D84', '#FF6666', '#5842f4', '#F59C14']}
              />
            }>
            <View style={styles.FlexStyle}>
              <MessDetailsScreen navigation={navigation} id={MessId} />
            </View>
          </ScrollView>
        </View>
      ) : (
        <View style={styles.FlexStyle}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.ScrollViewStyle}>
            <View style={styles.NoNetInitialView}>
              {/* start Header part */}
              <View style={styles.ImageInitialView}>
                <View style={styles.ImageView}>
                  <Image source={profileBg} style={styles.ImageStyle} />
                </View>
              </View>
              {/* eND Header part */}

              {/* Start FOoter Part */}
              <View style={styles.FooterView}>
                <View style={styles.TitleView}>
                  <Text style={styles.TitleTextStyle}>
                    To access our features
                  </Text>

                  <Text style={styles.CreatMessTextStyle}>
                    please create a mess
                  </Text>
                </View>

                <View style={styles.ButtonInitialView}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={CreateMessFunction}>
                    <View style={styles.MessCreateButton}>
                      <Text style={styles.MessCreateButtonText}>
                        Create Mess
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              {/* End FOoter Part */}
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  FlexStyle: {
    flex: 1,
  },

  ScrollViewStyle: {
    flexGrow: 1,
  },

  NoNetInitialView: {
    flex: 1,
    backgroundColor: '#5842f4',
  },

  ImageInitialView: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ImageView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: '3%',
  },

  ImageStyle: {
    resizeMode: 'contain',
    width: width * 0.5,
    height: width * 0.5,
  },

  TitleView: {
    marginVertical: '2%',
    width: '80%',
  },

  TitleTextStyle: {
    marginTop: 8,
    fontWeight: '100',
    fontSize: RFPercentage(3.5),
    color: '#333',
  },

  CreatMessTextStyle: {
    paddingLeft: '2%',
    color: '#333',
    fontSize: RFPercentage(2.7),
  },

  ButtonInitialView: {
    width: '85%',
    alignItems: 'center',
    paddingBottom: '2%',
    paddingTop: '3%',
  },

  FooterView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },

  MessCreateButton: {
    paddingVertical: '4%',
    paddingHorizontal: '8%',
    backgroundColor: '#5842f4',
    borderRadius: 50,
  },

  MessCreateButtonText: {
    color: '#fff',
  },
});

export default DashboardScreen;
