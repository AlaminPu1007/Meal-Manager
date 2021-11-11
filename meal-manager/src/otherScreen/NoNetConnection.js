import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Icon} from '@up-shared/components';

const NoNetConnection = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#5842f4',
        }}>
        <View>
          <Icon name="icon_no-internet" size={20} color="#ffffff" />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 16, color: '#fff', paddingVertical: '1%'}}>
            No network connection detected.
          </Text>
          <Text style={{color: '#fff'}}>
            Please enable network to complete operation.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NoNetConnection;
