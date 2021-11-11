import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Image,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Icon} from '@up-shared/components'; 
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Context as AuthContext} from '../context/AuthContext';
import {Context as MessContext} from '../context/MessContext';
import {Context as PreviousMonthContext} from '../context/PreviousMonthContext';

let filter = 0;
let manager = 0;
const {width} = Dimensions.get('window');

// console.log(Math.abs(width*0.07))

export function DrawerContent({props, navigation}) {
  //to remove default drawer padding from top view
  const insets = useSafeAreaInsets();
  const {signOut} = useContext(AuthContext);

  const {
    state,
    state: {mess, UserID, messMember, profileImage},
    EditMess,
    RemoveUserID,
  } = useContext(MessContext);

  const {HistoryMonthYearName} = useContext(PreviousMonthContext);

  const [DeleteModal, setDeleteModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState('');

  {
    mess ? (filter = mess.find(i => i.id === mess[0].id)) : null;
  }

  const RollManager = messMember
    ? messMember.find(i => i.user_id == UserID)
    : null;

  messMember
    ? UserID
      ? (manager = messMember.filter(s => s.user_id == UserID))
      : null
    : null;

  useEffect(() => {
    filter ? setId(filter.id) : null;
  }, [filter]);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        contentContainerStyle={{
          paddingTop: insets.top,
        }}
        {...props}>
        <View style={styles.container}>
          {/*Start Profile View*/}
          <View style={styles.InitialProfileView}>
            {/* Start Roll area */}
            {/* <View style={{ width: '95%', alignItems: 'flex-end' }}>
						<Text style={{ color: '#FFF' }}> Roll : Manager </Text>
					</View> */}
            {/* End Roll area */}

            {/*Start Image View*/}
            <View>
              {profileImage ? (
                profileImage.length ? (
                  <Image
                    source={{uri: profileImage}}
                    style={{
                      resizeMode: 'cover',
                      width: width * 0.2,
                      height: width * 0.2,
                      borderRadius: 1000,
                    }}
                  />
                ) : (
                  <Image
                    source={require('./images/profile_bg.png')}
                    style={{
                      resizeMode: 'cover',
                      width: width * 0.2,
                      height: width * 0.2,
                      borderRadius: 1000,
                    }}
                  />
                )
              ) : (
                <Image
                  source={require('./images/profile_bg.png')}
                  style={{
                    resizeMode: 'cover',
                    width: width * 0.2,
                    height: width * 0.2,
                    borderRadius: 1000,
                  }}
                />
              )}
            </View>
            {/*Start ProfileInfo View*/}
            <View style={{paddingVertical: '2%', width: '85%'}}>
              {manager ? (
                manager.map(item => {
                  return (
                    <View
                      key={item.email}
                      style={{width: '100%', alignItems: 'center'}}>
                      <Text style={styles.profileTextStyle}>
                        {item.username}{' '}
                        {RollManager
                          ? RollManager.type === 1
                            ? '( Manager )'
                            : '( Member )'
                          : null}
                      </Text>

                      <Text style={[styles.profileTextStyle, {fontSize: 14}]}>
                        {item.email}
                      </Text>
                      {/* <Text style={[styles.profileTextStyle,{fontSize: 14}]}>Roll : Member </Text> */}
                    </View>
                  );
                })
              ) : (
                <View>
                  <Text style={[styles.profileTextStyle, {fontSize: 15}]}>
                    Demo name
                  </Text>
                  <Text style={[styles.profileTextStyle, {fontSize: 15}]}>
                    demo@gmail.com
                  </Text>
                </View>
              )}
            </View>

            {/*Start show profile View*/}
            <View
              style={{
                paddingVertical: '2%',
                width: '80%',
                alignItems: 'center',
              }}>
              {manager ? (
                manager.map(item => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.5}
                      key={item.email}
                      onPress={() => {
                        navigation.navigate('Profile');
                      }}>
                      <View style={styles.ProfilebuttonStyle}>
                        <Text style={{color: '#444'}}>View Profile</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <TouchableOpacity activeOpacity={0.5}>
                  <View style={styles.ProfilebuttonStyle}>
                    <Text style={{color: '#444'}}>View Profile</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
            {/*End show profile View*/}
          </View>
          {/*End Profile View*/}

          {/*Start body button View*/}
          <View style={styles.bodyButton}>
            {/*start Main View*/}
            <View style={styles.mainView}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Dashboard');
                }}>
                <View style={styles.rootView}>
                  <View style={styles.iconView}>
                    <Icon name="icon_home" size={18} color="#212121" />
                  </View>
                  <View style={styles.textView}>
                    <Text style={styles.TextStyle}> Home </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            {/*End Main View*/}

            {/*Start Create Member View*/}
            {filter ? (
              manager ? (
                manager.map(item => {
                  return item.type === 1 ? (
                    <View key={item.email} style={styles.mainView}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('CreateMember');
                        }}>
                        <View style={styles.rootView}>
                          <View style={styles.iconView}>
                            <Icon
                              name="icon_member"
                              size={18}
                              color="#212121"
                            />
                          </View>
                          <View style={styles.textView}>
                            <Text style={styles.TextStyle}> Add Member </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : null;
                })
              ) : null
            ) : (
              <View style={styles.mainView}>
                <TouchableOpacity>
                  <View style={styles.rootView}>
                    <View style={styles.iconView}>
                      <Icon name="icon_member" size={18} color="#212121" />
                    </View>
                    <View style={styles.textView}>
                      <Text style={[styles.TextStyle, {color: '#a8a2a2'}]}>
                        {' '}
                        Add Member{' '}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}

            {/*End Create Member View*/}

            {/*Start Add daily meal View*/}

            {filter ? (
              manager ? (
                manager.map(item => {
                  return item.type === 1 ? (
                    <View key={item.email} style={styles.mainView}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('DailyMeal');
                        }}>
                        <View style={styles.rootView}>
                          <View style={styles.iconView}>
                            <Icon
                              name="icon_meal"
                              size={18}
                              color="#212121"
                            />
                          </View>
                          <View style={styles.textView}>
                            <Text style={styles.TextStyle}>Meals </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View key={item.email} style={styles.mainView}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('DailyMeal');
                        }}>
                        <View style={styles.rootView}>
                          <View style={styles.iconView}>
                            <Icon
                              name="icon_meal"
                              size={18}
                              color="#212121"
                            />
                          </View>
                          <View style={styles.textView}>
                            <Text style={styles.TextStyle}> Meals </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })
              ) : null
            ) : (
              <View style={styles.mainView}>
                <TouchableOpacity>
                  <View style={styles.rootView}>
                    <View style={styles.iconView}>
                      <Icon name="icon_meal" size={18} color="#212121" />
                    </View>
                    <View style={styles.textView}>
                      <Text style={[styles.TextStyle, {color: '#a8a2a2'}]}>
                        {' '}
                        Meals{' '}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}

            {/*Start Add daily meal View*/}
            {filter ? (
              manager ? (
                manager.map(item => {
                  return item.type === 1 ? (
                    <View key={item.email} style={styles.mainView}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('BazarList');
                        }}>
                        <View style={styles.rootView}>
                          <View style={styles.iconView}>
                            <Icon
                              name="icon_shopping"
                              size={18}
                              color="#212121"
                            />
                          </View>
                          <View style={styles.textView}>
                            <Text style={styles.TextStyle}> Shopping </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View key={item.email} style={styles.mainView}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('BazarList');
                        }}>
                        <View style={styles.rootView}>
                          <View style={styles.iconView}>
                            <Icon
                              name="icon_shopping"
                              size={18}
                              color="#212121"
                            />
                          </View>
                          <View style={styles.textView}>
                            <Text style={styles.TextStyle}>  Shopping </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })
              ) : null
            ) : (
              <View style={styles.mainView}>
                <TouchableOpacity>
                  <View style={styles.rootView}>
                    <View style={styles.iconView}>
                      <Icon name="icon_shopping" size={18} color="#212121" />
                    </View>
                    <View style={styles.textView}>
                      <Text style={[styles.TextStyle, {color: '#a8a2a2'}]}>
                        {' '}
                        Shopping{' '}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}

            {/*End Add daily meal View*/}

            {/*Start Deposited money View*/}

            {filter ? (
              manager ? (
                manager.map(item => {
                  return item.type === 1 ? (
                    <View key={item.email} style={styles.mainView}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('Deposited Money');
                        }}>
                        <View style={styles.rootView}>
                          <View style={styles.iconView}>
                            <Icon
                              name="icon_deposit"
                              size={18}
                              color="#212121"
                            />
                          </View>
                          <View style={styles.textView}>
                            <Text style={styles.TextStyle}>Deposits </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View key={item.email} style={styles.mainView}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('Deposited Money');
                        }}>
                        <View style={styles.rootView}>
                          <View style={styles.iconView}>
                            <Icon
                              name="icon_deposit"
                              size={18}
                              color="#212121"
                            />
                          </View>
                          <View style={styles.textView}>
                            <Text style={styles.TextStyle}> Deposits </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })
              ) : null
            ) : (
              <View style={styles.mainView}>
                <TouchableOpacity>
                  <View style={styles.rootView}>
                    <View style={styles.iconView}>
                      <Icon name="icon_deposit" size={18} color="#212121" />
                    </View>
                    <View style={styles.textView}>
                      <Text style={[styles.TextStyle, {color: '#a8a2a2'}]}>
                        {' '}
                        Deposits{' '}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}

            {/*End Deposited money View*/}

            {/*Start Other Costs View*/}

            {filter ? (
              manager ? (
                manager.map(item => {
                  return item.type === 1 ? (
                    <View key={item.email} style={styles.mainView}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('Other Costs');
                        }}>
                        <View style={styles.rootView}>
                          <View style={styles.iconView}>
                            <Icon
                              name="icon_extra-cost"
                              size={18}
                              color="#212121"
                            />
                          </View>
                          <View style={styles.textView}>
                            <Text style={styles.TextStyle}>
                             Fixed Costs
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View key={item.email} style={styles.mainView}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('Other Costs');
                        }}>
                        <View style={styles.rootView}>
                          <View style={styles.iconView}>
                            <Icon
                              name="icon_extra-cost"
                              size={18}
                              color="#212121"
                            />
                          </View>
                          <View style={styles.textView}>
                            <Text style={styles.TextStyle}>
                              Fixed Costs
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })
              ) : null
            ) : (
              <View style={styles.mainView}>
                <TouchableOpacity>
                  <View style={styles.rootView}>
                    <View style={styles.iconView}>
                      <Icon
                        name="icon_extra-cost"
                        size={18}
                        color="#212121"
                      />
                    </View>
                    <View style={styles.textView}>
                      <Text style={[styles.TextStyle, {color: '#a8a2a2'}]}>
                        {' '}
                        Fixed Costs{' '}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}

            {/*End Other Costs View*/}

            {/*Start Member profile View*/}

            {filter ? (
              manager ? (
                manager.map(item => {
                  return item.type === 1 ? (
                    <View key={item.email} style={styles.mainView}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('Member Profile');
                        }}>
                        <View style={styles.rootView}>
                          <View style={styles.iconView}>
                            <Icon
                              name="icon_user"
                              size={18}
                              color="#212121"
                            />
                          </View>
                          <View style={styles.textView}>
                            <Text style={styles.TextStyle}> Members </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View key={item.email} style={styles.mainView}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('Member Profile');
                        }}>
                        <View style={styles.rootView}>
                          <View style={styles.iconView}>
                            <Icon
                              name="icon_user"
                              size={18}
                              color="#212121"
                            />
                          </View>
                          <View style={styles.textView}>
                            <Text style={styles.TextStyle}> Members</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })
              ) : null
            ) : (
              <View style={styles.mainView}>
                <TouchableOpacity>
                  <View style={styles.rootView}>
                    <View style={styles.iconView}>
                      <Icon name="icon_user" size={18} color="#212121" />
                    </View>
                    <View style={styles.textView}>
                      <Text style={[styles.TextStyle, {color: '#a8a2a2'}]}>
                        {' '}
                        Members{' '}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}

            {/*Start Member profile View*/}

            {/*End Main View*/}
          </View>
          {/*End body button View*/}

          <View
            style={{
              paddingVertical: '5%',
              width: '100%',
              alignItems: 'center',
            }}>
            <View style={styles.horizontalLine} />

            <View style={{width: '85%', paddingTop: '5%'}}>
              <Text style={styles.optionsText}>Options</Text>
            </View>
          </View>

          {/*Start Options View*/}
          <View style={{width: '85%', paddingBottom: '5%'}}>
            {/*Start Current Month View*/}

            {filter ? (
              manager ? (
                manager.map(item => {
                  return item.type === 1 ? (
                    <View key={item.email} style={styles.mainView}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('Dashboard');
                        }}>
                        <View style={styles.rootView}>
                          <View style={styles.iconView}>
                            <Icon
                              name="icon_running-month"
                              size={18}
                              color="#212121"
                            />
                          </View>
                          <View style={styles.textView}>
                            <Text style={styles.TextStyle}>
                              {' '}
                              Running Month{' '}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View key={item.email} style={styles.mainView}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('Dashboard');
                        }}>
                        <View style={styles.rootView}>
                          <View style={styles.iconView}>
                            <Icon
                              name="icon_running-month"
                              size={18}
                              color="#212121"
                            />
                          </View>
                          <View style={styles.textView}>
                            <Text style={styles.TextStyle}>
                              {' '}
                              Running Month{' '}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })
              ) : null
            ) : (
              <View style={styles.mainView}>
                <TouchableOpacity>
                  <View style={styles.rootView}>
                    <View style={styles.iconView}>
                      <Icon
                        name="icon_running-month"
                        size={18}
                        color="#212121"
                      />
                    </View>
                    <View style={styles.textView}>
                      <Text style={[styles.TextStyle, {color: '#a8a2a2'}]}>
                        {' '}
                        Running Month{' '}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}

            {/*End Current Month View*/}

            {/*Start Previous Month View*/}

            {filter ? (
              manager ? (
                manager.map(item => {
                  return item.type === 1 ? (
                    <View key={item.email} style={styles.mainView}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('Previous Month', {id: 1}),
                            HistoryMonthYearName('');
                        }}>
                        <View style={styles.rootView}>
                          <View style={styles.iconView}>
                            <Icon
                              name="icon_running-month"
                              size={18}
                              color="#212121"
                            />
                          </View>
                          <View style={styles.textView}>
                            <Text style={styles.TextStyle}>
                              {' '}
                              Previous Month{' '}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View key={item.email} style={styles.mainView}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('Previous Month', {
                            Pitem: '',
                            id: 1,
                          }),
                            HistoryMonthYearName('');
                        }}>
                        <View style={styles.rootView}>
                          <View style={styles.iconView}>
                            <Icon
                              name="icon_running-month"
                              size={18}
                              color="#212121"
                            />
                          </View>
                          <View style={styles.textView}>
                            <Text style={styles.TextStyle}>
                              {' '}
                              Previous Month{' '}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })
              ) : null
            ) : (
              <View style={styles.mainView}>
                <TouchableOpacity>
                  <View style={styles.rootView}>
                    <View style={styles.iconView}>
                      <Icon
                        name="icon_running-month"
                        size={18}
                        color="#212121"
                      />
                    </View>
                    <View style={styles.textView}>
                      <Text style={[styles.TextStyle, {color: '#a8a2a2'}]}>
                        {' '}
                        Previous Month{' '}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}

            {/*End Previous Month View*/}

            {/*Start History View*/}

            {filter ? (
              manager ? (
                manager.map(item => {
                  return item.type === 1 ? ( //Previous Month
                    <View key={item.email} style={styles.mainView}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('History');
                        }}>
                        <View style={styles.rootView}>
                          <View style={styles.iconView}>
                            <Icon
                              name="icon_history"
                              size={18}
                              color="#212121"
                            />
                          </View>
                          <View style={styles.textView}>
                            <Text style={styles.TextStyle}> History </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    //Previous Month onMonthChange={month => { }}
                    <View key={item.email} style={styles.mainView}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('History');
                        }}>
                        <View style={styles.rootView}>
                          <View style={styles.iconView}>
                            <Icon
                              name="icon_history"
                              size={18}
                              color="#212121"
                            />
                          </View>
                          <View style={styles.textView}>
                            <Text style={styles.TextStyle}> History </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })
              ) : null
            ) : (
              <View style={styles.mainView}>
                <TouchableOpacity>
                  <View style={styles.rootView}>
                    <View style={styles.iconView}>
                      <Icon name="icon_history" size={18} color="#212121" />
                    </View>
                    <View style={styles.textView}>
                      <Text style={[styles.TextStyle, {color: '#a8a2a2'}]}>
                        {' '}
                        History{' '}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}

            {/*End History View*/}

            {/*Start Remove member View*/}

            {/*
    		filter ? 
    		manager ?
    		manager.map(item=>{
    			return(
    				item.type === 1 ?
    				(
    					<View style={styles.mainView}>
			      	<TouchableOpacity onPress={()=>{ navigation.navigate('Member Profile') }} >
			      	<View style={styles.rootView}>
			      		<View style={styles.iconView}>  
					      	<Avatar
									  size={30}
									  rounded
									  source={require('./image/sad.png')}
									/>
					      </View>
					      <View style={styles.textView}> 
					      		<Text style={styles.TextStyle}> Remove member </Text>
					      </View>  
			      	</View>
			      	</TouchableOpacity>
			      </View>
    				) 
    				: 
    				null
    			)
    		})
    		: null
    		: 
    		(
    			<View style={styles.mainView}>
	      	<TouchableOpacity >
	      	<View style={styles.rootView}>
	      		<View style={styles.iconView}>  
			      	<Avatar
							  size={30}
							  rounded
							  source={require('./image/sad.png')}
							/>
			      </View>
			      <View style={styles.textView}> 
			      		<Text style={[styles.TextStyle,{color: '#a8a2a2'}]}> Remove member </Text>
			      </View>  
	      	</View>
	      	</TouchableOpacity>
	      </View>
    		)
    	*/}

            {/*End Remove member View*/}

            {filter ? (
              manager ? (
                manager.map(item => {
                  return item.type === 1 ? (
                    <View key={item.email} style={styles.mainView}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('Setting');
                        }}
                        // navigation.navigate('CreateMess', { ID: 2 })
                      >
                        <View style={styles.rootView}>
                          <View style={styles.iconView}>
                            <Icon
                              name="icon_settings"
                              size={18}
                              color="#212121"
                            />
                          </View>
                          <View style={styles.textView}>
                            <Text style={styles.TextStyle}> Settings </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : null;
                })
              ) : null
            ) : (
              <View style={styles.mainView}>
                <TouchableOpacity>
                  <View style={styles.rootView}>
                    <View style={styles.iconView}>
                      <Icon name="icon_settings" size={18} color="#212121" />
                    </View>
                    <View style={styles.textView}>
                      <Text style={[styles.TextStyle, {color: '#a8a2a2'}]}>
                        {' '}
                        Setting{' '}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
          {/*End Options View*/}

          <View>
            {/*Start Main View*/}
            <View style={styles.mainView}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  signOut(), RemoveUserID();
                }}>
                <View style={styles.LogOutbuttonView}>
                  <Text style={styles.LogOutbuttonViewText}> Log Out </Text>
                </View>
              </TouchableOpacity>
            </View>
            {/*End Main View*/}
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  InitialProfileView: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: '3%',
    backgroundColor: '#45ABF6',
  },

  profileTextStyle: {
    color: '#fff',
    fontSize: 15,
    paddingVertical: '1%',
  },

  ProfilebuttonStyle: {
    backgroundColor: '#fff',
    paddingVertical: '2%',
    paddingHorizontal: '20%',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  bodyButton: {
    paddingVertical: '5%',
    width: '85%',
  },

  mainView: {
    width: '100%',
    paddingVertical: '3%',
  },
  rootView: {
    flexDirection: 'row',
    width: '100%',
  },

  iconView: {
    paddingVertical: '3%',
    paddingHorizontal: '3%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textView: {
    borderBottomColor: '#e1e1e1',
    flex: 1,
    borderBottomWidth: 1,
    paddingVertical: '4%',
    marginHorizontal: '2%',
  },

  TextStyle: {
    // fontSize:15,
    color: '#444',
  },

  horizontalLine: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#ddd',
  },

  optionsText: {
    fontSize: 15,
    color: '#ff6d80',
  },

  LogOutbuttonView: {
    borderWidth: 1,
    padding: '5%',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#ff6d80',
  },

  LogOutbuttonViewText: {
    fontSize: 15,
    color: '#ff6d80',
  },
});
