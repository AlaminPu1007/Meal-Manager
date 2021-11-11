import React, { useState, useEffect, useContext, } from 'react';
import { View, ActivityIndicator, ToastAndroid, StyleSheet, ScrollView, } from 'react-native';
import {SafeAreaView } from 'react-native-safe-area-context';
 
import {Context as MessContext} from '../../context/MessContext';
import Header from '../../component/Header';
import DepositMemberView from './depositMoneyComponent/DepositMemberView';
import NetInfo from '@react-native-community/netinfo';
import DepositedMoneyExpand from './depositMoneyComponent/DepositedMoneyExpand';
import moment from 'moment';
import NoNetConnection from '../../otherScreen/NoNetConnection';

console.disableYellowBox = true;

const DepositedMoney=({ navigation })=>{

const { state, state:{ loading, bazarCreateSuccess, messMember, UserID, },
	 clearDepositerror, fetchMemberMoney, clearAddedSuccessMessage, FetchNotification } = useContext(MessContext);

const [ monthStart ] = useState(new moment().startOf('month').format("YYYY-MM-DD").toString());
const [ monthEnd ] = useState(new moment().endOf("month").format("YYYY-MM-DD").toString());
const [ checkNetConnetion, setCheckNetConnetion ] = useState(true);


useEffect(()=>{

	{ 
		bazarCreateSuccess === 'Added successfully' ||
		bazarCreateSuccess === 'Edited successfully' ||
		bazarCreateSuccess === 'Deleted successfully'  
		? 
		ToastAndroid.show( bazarCreateSuccess , ToastAndroid.SHORT) : 
		null 
	} 

	{ bazarCreateSuccess ? 
		(
			fetchMemberMoney({ monthStart, monthEnd }), FetchNotification({ monthStart, monthEnd, UserID })
		) : null }

},[bazarCreateSuccess]);

useEffect(()=>{

	let unmounted = false;

		if(!unmounted){

			navigation.addListener('blur' ,()=>{
				clearDepositerror();
 				clearAddedSuccessMessage(); 
			});

			NetInfo.addEventListener(state => {
				{!unmounted ? setCheckNetConnetion(	state.isConnected ) : null};
				state.isConnected === true ? 
				(
					clearDepositerror(),
 					clearAddedSuccessMessage()
				) 
				: null
			});

		}

		return ()=>{
			unmounted = true;
		}

 },[checkNetConnetion]);


if(!checkNetConnetion){
	return <NoNetConnection/>;
}

// if(loading){
// 	return(
// 		<View style= {{ flex: 1 , justifyContent: 'center', alignItems: 'center' }} >
// 			<ActivityIndicator size="large" color="#2D8575" />
// 		</View>
// 	);
// }

	return (
    <SafeAreaView style={{flex: 1}}>
      {/*Start Header Area*/}
      <View>
        <Header navigation={navigation} title="Add money" />
      </View>
      {/*End Header Area*/}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1, backgroundColor: '#f0f4ff'}}>
          {/*Start Body Area*/}
          <View style={styles.bodyView}>
            {/*Start Member List Area*/}
            <View style={{width: '95%', alignItems: 'center'}}>
              {messMember.map(item => {
                return (
                  <View
                    key={item.email}
                    style={{width: '100%', paddingTop: '2%'}}>
                    <DepositedMoneyExpand
                      navigation={navigation}
                      item={item}
                    />
                  </View>
                );
              })}
            </View>
            {/*End   Member List Area*/}
          </View>
          {/*End Body Area*/}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

	bodyView:{
		alignItems: 'center',
		paddingBottom: '3%',
		paddingTop: '1%',
		width: '100%'
	},

});

export default DepositedMoney;