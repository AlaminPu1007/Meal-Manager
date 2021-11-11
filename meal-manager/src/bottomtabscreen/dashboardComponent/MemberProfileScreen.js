import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  ActivityIndicator,
  ToastAndroid,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icon} from '@up-shared/components';
import NetInfo from '@react-native-community/netinfo';
import {Context as MessContext} from '../../context/MessContext';
import Header from '../../component/Header';
import UserExpandedScreen from './memberprofilecomponent/UserExpandedScreen';
import NoNetConnection from '../../otherScreen/NoNetConnection';

console.disableYellowBox = true;

const MemberProfileScreen = ({navigation}) => {
  const {
    state: {messMember, loading},
  } = useContext(MessContext);
  const [checkNetConnetion, setCheckNetConnetion] = useState(true);

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      navigation.addListener('focus', () => {
        ToastAndroid.show(' Tap for details ', ToastAndroid.SHORT);
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

  if (!checkNetConnetion) {
    return <NoNetConnection />;
  }

  if (loading) {
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
        <Header navigation={navigation} title="Member Profile" />
      </View>
      {/*End Header Area*/}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1, backgroundColor: '#f0f4ff'}}>
          {/*Start Body Area*/}
          <View style={styles.bodyView}>
            {messMember
              ? messMember.map(item => {
                  return (
                    <View key={item.user_id} style={styles.userListWrap}>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                          navigation.navigate(
                            'UserMess Info',
                            {
                              id: item.user_id,
                            },
                          );
                        }}
                        style={styles.userList}>
                        <UserExpandedScreen
                          navigation={navigation}
                          item={item}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })
              : null}
          </View>
          {/*End Body Area*/}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bodyView: {
    alignItems: 'center',
    // paddingVertical: '3%',
    backgroundColor: '#f0f4ff',
  },

  userListWrap: {
    width: '90%',
  },
  userList: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: '4%',
    marginBottom: '6%',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 8,
    shadowColor: '#000000',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default MemberProfileScreen;
