import React, { useState, useEffect, useContext } from 'react';
import { View, Animated, TouchableWithoutFeedback, ActivityIndicator, Text, ToastAndroid, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import {SafeAreaView } from 'react-native-safe-area-context';

import {Context as MessContext} from '../../context/MessContext';
import Header from './BazarListComponent/Header';

import BazarListAllMember from './BazarListComponent/BazarListAllMember';
import NetInfo from '@react-native-community/netinfo';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import  Entypo  from 'react-native-vector-icons/Entypo';
import NoNetConnection from '../../otherScreen/NoNetConnection';

let scrollDate = 0;

console.disableYellowBox = true;

const BazarListScreen=({ navigation })=>{

const { state, state: { uniqueDate, bazarCreateSuccess, messMember, bazarList, UserID }, 
	  fetchBazarList, BazarListDuplicate, FetchNotification } = useContext(MessContext);

const [ monthStart ] = useState(new moment().startOf('month').format("YYYY-MM-DD").toString());
const [ monthEnd ] = useState(new moment().endOf("month").format("YYYY-MM-DD").toString());
const [ checkNetConnetion, setCheckNetConnetion ] = useState(true);
const [ fade ] = useState(new Animated.Value(1));

const [ date, setdate ] = useState(moment().format('YYYY-MM-DD'));

const [dataSourceCords, setDataSourceCords]=useState([]);
const [DeleteModal, setDeleteModal] = useState(false);
const [ Day, setDay ] = useState('');

const manager = messMember ? ( messMember.find(i=>i.user_id == UserID) ) : null


useEffect(()=>{ 

	{ 
		bazarCreateSuccess === 'Added successfully' ||
		bazarCreateSuccess === 'Edited successfully' ||
		bazarCreateSuccess === 'Deleted successfully' 
		? 
			ToastAndroid.show( bazarCreateSuccess , ToastAndroid.SHORT) : 
			null 
		}

	{ bazarCreateSuccess === 'Deleted successfully' ?  
	(
    fetchBazarList({ monthStart, monthEnd }),
    BazarListDuplicate({monthStart,monthEnd})
    // FetchNotification({ monthStart, monthEnd, UserID })
	) 
	: null }

},[bazarCreateSuccess]);

{ dataSourceCords ? scrollDate = dataSourceCords.find(i=> i.position == Day ) : 0}

useEffect(()=>{

	{
		Day ? 
		(
		scrollDate ? 
		( 
			_scrollView.scrollTo({ y: scrollDate.y_value, animated: true }),
			Animation()

		 ) 
		: null
		)
		: null
	}

	},[ Day, scrollDate]);

	useEffect(()=>{

		let unmounted = false;

		if(!unmounted){

			NetInfo.addEventListener(state => {
				{!unmounted ? setCheckNetConnetion(	state.isConnected ) : null};
			});

		}

		return ()=>{
			unmounted = true;
		}

	},[checkNetConnetion]);

	const Animation =()=>{
		Animated.spring(fade, {
			toValue: 0.95,
			friction: 2,
			tension: 100, 
			useNativeDriver: true,
		}).start(()=>{
			Animated.spring(fade, {
				toValue: 1,
				duration: 60,
				useNativeDriver: true
			}).start();
		});
	} 

const Callback =()=>{
	return(
		setDeleteModal(!DeleteModal)
	);
};

if(!checkNetConnetion){
	return <NoNetConnection/>;
}

// if(state.loading){
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
          <Header
            navigation={navigation}
            title="Shopping List"
            manager={manager}
            Callback={Callback}
          />
        </View>
        {/*End Header Area*/}
        <ScrollView
          keyboardShouldPersistTaps="handled"
          ref={view => (_scrollView = view)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 1, backgroundColor: '#f0f4ff'}}>
            {/*Start Body Area*/}
            <View style={styles.bodyView}>
              <View style={{width: '100%'}}>
                <View>
                  {bazarList ? (
                    bazarList.length ? (
                      uniqueDate ? (
                        uniqueDate.length ? (
                          uniqueDate.map((item, index) => {
                            return (
                              <Animated.View
                                key={item.Cdate}
                                style={
                                  item.Cdate == Day
                                    ? {transform: [{scale: fade}]}
                                    : null
                                }
                                onLayout={event => {
                                  const layout = event.nativeEvent.layout;
                                  setDataSourceCords(dataSourceCords => [
                                    ...dataSourceCords,
                                    {
                                      position: item.Cdate,
                                      y_value: layout.y,
                                    },
                                  ]);
                                }}>
                                <BazarListAllMember
                                  navigation={navigation}
                                  item={item}
                                />
                              </Animated.View>
                            );
                          })
                        ) : (
                          <View
                            style={{
                              flex: 1,
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginTop: '10%',
                            }}>
                            <Text style={styles.messTextTitleView}>
                              No shopping list found!
                            </Text>
                          </View>
                        )
                      ) : (
                        <View
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '10%',
                          }}>
                          <Text style={styles.messTextTitleView}>
                            No shopping list found!
                          </Text>
                        </View>
                      )
                    ) : (
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: '10%',
                        }}>
                        <Text style={styles.messTextTitleView}>
                          No shopping list found!
                        </Text>
                      </View>
                    )
                  ) : (
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '10%',
                      }}>
                      <Text style={styles.messTextTitleView}>
                        No shopping list found!
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
            {/*End Body Area*/}

            {/*Start Delete Modal Area*/}
            <View style={{flex: 1}}>
              <Modal
                animationType="slide"
                transparent={false}
                visible={DeleteModal}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: '#ddd',
                  }}
                  onPress={() => {
                    setDeleteModal(!DeleteModal);
                  }}>
                  <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                      flexGrow: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    showsVerticalScrollIndicator={false}>
                    <TouchableWithoutFeedback>
                      <View style={styles.modelView}>
                        <View
                          style={{
                            width: '90%',
                            paddingVertical: '15%',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{width: '100%', alignItems: 'flex-end'}}>
                            <TouchableOpacity
                              activeOpacity={0.5}
                              onPress={() => {
                                setDeleteModal(!DeleteModal);
                              }}
                              style={{zIndex: 1}}>
                              <Entypo
                                name="circle-with-cross"
                                size={20}
                                color="#FF6666"
                                style={{zIndex: 1}}
                              />
                            </TouchableOpacity>
                          </View>

                          <View
                            style={{
                              width: '97%',
                              marginTop: -10,
                              borderWidth: 1,
                              borderColor: '#ddd',
                              borderRadius: 2,
                            }}>
                            <Calendar
                              current={date}
                              // hideExtraDays={true}
                              disableArrowLeft={true}
                              disableArrowRight={true}
                              onDayPress={day => {
                                setDay(day.dateString),
                                  setDeleteModal(!DeleteModal);
                              }}
                            />
                          </View>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </ScrollView>
                </TouchableOpacity>
              </Modal>
            </View>
            {/*End Delete Modal Area*/}
          </View>
        </ScrollView>
      </SafeAreaView>
    );

};


const styles = StyleSheet.create({

	bodyView:{
		alignItems: 'center',
		paddingBottom: '2%',
	},

  modelView:{
    backgroundColor: '#fff',
    width: '90%',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: '2%',
  },

	messTextTitleView:{
		fontSize: 15,
		color:'#666',
	},

});

export default BazarListScreen;