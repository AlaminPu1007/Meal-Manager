import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Context as MessContext} from '../context/MessContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Icon} from '@up-shared/components';

const ServerErrorToFetchMess = () => {
  const {
    state: {messLoading},
    fetchMess,
  } = useContext(MessContext);
  
  // On Press Function
  const ReloadFunction = () => {
    fetchMess();
    return null;
  };
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
          <Icon name="icon_no-internet" size={30} color="#ffffff" />
        </View>
        <View style={{alignItems: 'center', width: '90%'}}>
          <Text
            style={{
              fontSize: 20,
              color: '#fff',
              paddingVertical: '1%',
              fontWeight: '700',
            }}>
            Sorry, something went wrong
          </Text>
          <Text style={{color: '#fff', textAlign: 'center', marginTop: '1%'}}>
            Please check that you are connected to the internet and try again or
            this may cause to an server issue
          </Text>
        </View>
        {/* Reload button */}
        <TouchableOpacity
          style={styles.ReloadButton}
          activeOpacity={0.5}
          onPress={ReloadFunction}>
          {messLoading ? (
            <ActivityIndicator
              size="small"
              color="#5842f4"
              style={{paddingHorizontal: '5%'}}
            />
          ) : (
            <Text style={styles.ReloadText}>Re Fresh</Text>
          )}
        </TouchableOpacity>
        {/* Reload button */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ReloadButton: {
    borderWidth: 1,
    marginTop: '10%',
    backgroundColor: '#FFF',
    paddingVertical: '2%',
    paddingHorizontal: '6%',
    borderColor: '#999999',
    borderRadius: 5,
  },
  ReloadText: {
    fontSize: 15,
  },
});

export default ServerErrorToFetchMess;
