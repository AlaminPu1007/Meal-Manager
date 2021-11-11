import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  Modal,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Context as MessContext} from '../../context/MessContext';
import Header from '../../component/Header';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import NetInfo from '@react-native-community/netinfo';
import NoNetConnection from '../../otherScreen/NoNetConnection';
import {Icon} from '@up-shared/components';
import {RFPercentage} from 'react-native-responsive-fontsize';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const {width} = Dimensions.get('window');

let manager = 0;

console.disableYellowBox = true;

const Setting = ({navigation}) => {
  const {
    state: {
      bazarCreateSuccess,
      loading,
      messMember,
      UserID,
      userEmpty,
      emailEmpty,
      passwordEmpty,
      confirmPasswordEmpty,
      errorMessage,
    },
    ChangesPassword,
    ClearErrorMessage,
    DeleteMessMember,
    ChangeManager,
    NotificationCreate,
  } = useContext(MessContext);

  const [checkNetConnetion, setCheckNetConnetion] = useState(true);
  const [ReMemberNotification, setReMemberNotification] = useState('');

  const [DeleteModal, setDeleteModal] = useState(false);
  const [MemberDeleteModal, setMemberDelete] = useState(false);
  const [managerRemoveModal, setManagerRemoveModal] = useState(false);

  const [id, setId] = useState('');
  const [user_id, setuser_id] = useState('');

  const [currentPassword, setcurrentPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const [SecureTextEntry, setsecureTextEntry] = useState(true);
  const [ConfirmSecureTextEntry, setConfirmsecureTextEntry] = useState(true);
  const [CurrentPassSecureText, setCurrentPassSecureText] = useState(true);

  const [Expand, setExpand] = useState(false);
  const [changeMExpand, setchangeMExpand] = useState(false);

  const [SelectManager, setSelectManager] = useState(false);
  ///TextInput Fill
  const [CurrentPasswordFill, setCurrentPasswordFill] = useState('');
  const [PassWordFill, setPassWordFill] = useState('');
  const [ConfirmPassWordFill, setConfirmPassWordFill] = useState('');

  useEffect(() => {
    {
      bazarCreateSuccess
        ? (ToastAndroid.show(bazarCreateSuccess, ToastAndroid.SHORT),
          setDeleteModal(false),
          setMemberDelete(false),
          setManagerRemoveModal(false),
          ClearTextInput(),
          ClearErrorMessage())
        : null;
    }

    DeleteModal == false ? (ClearConfirmInput(), ClearErrorMessage()) : null;

    {
      ReMemberNotification
        ? ToastAndroid.show(ReMemberNotification, ToastAndroid.SHORT)
        : null;
    }

    CurrentPasswordFill == false ||
    ConfirmPassWordFill == false ||
    PassWordFill == false
      ? ClearErrorMessage()
      : null;
  }, [
    bazarCreateSuccess,
    ReMemberNotification,
    DeleteModal,
    CurrentPasswordFill,
    ConfirmPassWordFill,
    PassWordFill,
  ]);

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      navigation.addListener('focus', () => {
        ToastAndroid.show(' Setting  ', ToastAndroid.SHORT);
      });

      navigation.addListener('blur', () => {
        ClearErrorMessage();
        ClearTextInput();
      });

      NetInfo.addEventListener(state => {
        {
          !unmounted ? setCheckNetConnetion(state.isConnected) : null;
        }
        state.isConnected === true ? ClearErrorMessage() : null;
      });
    }

    return () => {
      unmounted = true;
    };
  }, [checkNetConnetion]);

  const ClearConfirmInput = () => {
    setcurrentPassword(''),
      setnewPassword(''),
      setconfirmPassword(''),
      setsecureTextEntry(true),
      setConfirmsecureTextEntry(true),
      setCurrentPassSecureText(true),
      setCurrentPasswordFill(''),
      setPassWordFill(''),
      setConfirmPassWordFill('');
  };

  const ClearTextInput = () => {
    setcurrentPassword(''),
      setnewPassword(''),
      setconfirmPassword(''),
      setsecureTextEntry(true),
      setConfirmsecureTextEntry(true),
      setCurrentPassSecureText(true),
      setExpand(false),
      setchangeMExpand(false),
      setSelectManager(false),
      setReMemberNotification(''),
      setCurrentPasswordFill(''),
      setPassWordFill(''),
      setConfirmPassWordFill('');
  };

  messMember
    ? UserID
      ? (manager = messMember.find(s => s.user_id == UserID))
      : null
    : null;

  if (!checkNetConnetion) {
    return <NoNetConnection />;
  }

  let managerName = manager ? manager.username : null;

  // if(loading){
  // 	return(
  // 		<View style= {{ flex: 1 , justifyContent: 'center', alignItems: 'center' }} >
  // 		<ActivityIndicator size="large" color="#2D8575" />
  // 	</View>
  // 	);
  // }

  const memberExpand = () => {
    return (
      <View style={{width: '100%', alignItems: 'center', paddingTop: '1%'}}>
        {messMember ? (
          messMember.map(item => {
            return (
              <View
                key={item.email}
                style={{width: '95%', alignItems: 'center', paddingTop: '3%'}}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{width: '100%', alignItems: 'center'}}
                  onPress={() => {
                    manager.type != item.type
                      ? (setId(item.user_id),
                        setMemberDelete(!MemberDeleteModal),
                        setReMemberNotification(''))
                      : setReMemberNotification(' You are already manager ');
                  }}>
                  <View style={[styles.messInfoView, {flexDirection: 'row'}]}>
                    <View style={{width: '15%', alignItems: 'center'}}>
                      <Image
                        source={require('../../drawerscreen/images/profile_bg.png')}
                        style={{
                          resizeMode: 'cover',
                          width: width * 0.09,
                          height: width * 0.09,
                        }}
                      />
                    </View>

                    <View style={{width: '75%'}}>
                      <Text style={{color: '#555'}}> {item.username} </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <Text> no member found </Text>
        )}
      </View>
    );
  };

  const changemanager = () => {
    return (
      <View style={{width: '100%', alignItems: 'center', paddingTop: '1%'}}>
        {messMember ? (
          messMember.map(item => {
            return (
              <View
                key={item.email}
                style={{width: '95%', alignItems: 'center', paddingTop: '3%'}}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    manager.type === item.type
                      ? setReMemberNotification('You are already manager')
                      : (setId(item.user_id),
                        setuser_id(item.user_id),
                        setManagerRemoveModal(!managerRemoveModal),
                        setReMemberNotification(''));
                  }}>
                  <View style={[styles.messInfoView, {flexDirection: 'row'}]}>
                    <View style={{width: '15%', alignItems: 'center'}}>
                      <Image
                        source={require('../../drawerscreen/images/profile_bg.png')}
                        style={{
                          resizeMode: 'cover',
                          width: width * 0.09,
                          height: width * 0.09,
                        }}
                      />
                    </View>

                    <View style={{width: '75%'}}>
                      <Text style={{color: '#555'}}> {item.username} </Text>
                    </View>

                    <View style={{width: '10%', alignItems: 'center'}}>
                      {manager.type === item.type ? (
                        !SelectManager ? (
                          <Fontisto
                            name="radio-btn-active"
                            size={20}
                            color="#FF6666"
                            style={{padding: '2%'}}
                            // onPress={()=>{ alert('manager can not be remove') }}
                          />
                        ) : (
                          <Fontisto
                            name="radio-btn-passive"
                            size={20}
                            color="#999"
                            style={{padding: '2%'}}
                            // onPress={()=>{ alert('manager can not be remove') }}
                          />
                        )
                      ) : SelectManager ? (
                        <Fontisto
                          name="radio-btn-active"
                          size={20}
                          color="#FF6666"
                          style={{padding: '2%'}}
                          // onPress={()=>{ alert('manager can not be remove') }}
                        />
                      ) : (
                        <Fontisto
                          name="radio-btn-passive"
                          size={20}
                          color="#999"
                          style={{padding: '2%'}}
                          // onPress={()=>{ setSelectManager(!SelectManager) }}
                        />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <Text> no member found </Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {/*Start Header Area*/}
      <View>
        <Header navigation={navigation} title="Settings" />
      </View>
      {/*End Header Area*/}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1, backgroundColor: '#f0f4ff'}}>
          {/*Start Body Area*/}
          <View style={styles.bodyView}>
            {/*Start Profile View*/}
            <View style={styles.InitialProfileView}>
              {/*Start Image View*/}
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  navigation.navigate('Profile');
                }}
                style={{width: '95%', alignItems: 'center'}}>
                <View style={styles.saveBtn}>
                  <Text style={styles.saveTx}>Edit Profile</Text>
                </View>
              </TouchableOpacity>

              {/*End Profile View*/}

              {/* Start Profile Area*/}
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  setDeleteModal(!DeleteModal);
                }}
                style={{width: '95%', alignItems: 'center'}}>
                <View style={styles.saveBtn}>
                  <Text style={styles.saveTx}> Change Password </Text>
                </View>
              </TouchableOpacity>
              {/* End Profile Area*/}

              {/* Start Mess name Area*/}
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  navigation.navigate('CreateMess', {ID: 2});
                }}
                style={{width: '95%', alignItems: 'center'}}>
                <View style={styles.saveBtn}>
                  <Text style={styles.saveTx}> Edit Mess Name </Text>
                </View>
              </TouchableOpacity>
              {/* End Mess name Area*/}

              {/* Start  Change manager Area*/}
              <View
                style={{
                  width: '100%',
                  paddingVertical: '2%',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.spring,
                    ),
                      setchangeMExpand(!changeMExpand),
                      setExpand(false);
                  }}>
                  <View style={styles.messInfoView}>
                    <View style={styles.dropdownBtn}>
                      <View style={{width: '90%', alignItems: 'center'}}>
                        <Text style={{color: '#000'}}> Change manager </Text>
                      </View>

                      <View style={{width: '10%', alignItems: 'flex-end'}}>
                        {changeMExpand ? (
                          <AntDesign name="up" size={16} color="#777" />
                        ) : (
                          <AntDesign name="down" size={16} color="#777" />
                        )}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <View>{changeMExpand && changemanager()}</View>
              </View>
              {/* End  Change manager Area*/}

              {/* End Mess Area*/}

              {/* Start Remove member Area*/}
              <View
                style={{
                  width: '100%',
                  paddingVertical: '2%',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.spring,
                    ),
                      setExpand(!Expand),
                      setchangeMExpand(false);
                  }}
                  style={{width: '95%', alignItems: 'center'}}>
                  <View
                    style={[
                      styles.messInfoView,
                      {width: '100%', paddingVertical: '3%'},
                    ]}>
                    <View style={styles.dropdownBtn}>
                      <View style={{width: '90%', alignItems: 'center'}}>
                        <Text style={{color: '#000'}}> Remove member </Text>
                      </View>

                      <View style={{width: '10%', alignItems: 'flex-end'}}>
                        {Expand ? (
                          <AntDesign name="up" size={16} color="#777" />
                        ) : (
                          <AntDesign name="down" size={16} color="#777" />
                        )}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                {Expand && memberExpand()}
              </View>
              {/* End Remove member Area*/}
            </View>
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
                    backgroundColor: '#f0f4ff',
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
                            paddingVertical: '10%',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              width: '90%',
                              paddingVertical: '2%',
                              alignItems: 'center',
                            }}>
                            {/* start input area */}
                            {/* start input area */}
                            <View style={styles.ModalInputViewStyle}>
                              {/* <View style={styles.InputTextView}>
          	<Text style={styles.InputTextViewTextStyle}>Current password </Text>
          </View> */}

                              <View
                                style={
                                  userEmpty ||
                                  (CurrentPasswordFill !== ''
                                    ? !CurrentPasswordFill
                                    : null)
                                    ? [
                                        styles.viewtextInputStyle,
                                        styles.ErrorBorderStyle,
                                      ]
                                    : styles.viewtextInputStyle
                                }>
                                <View
                                  style={styles.CurrentPasswordInputWidthStyle}>
                                  <TextInput
                                    placeholder=" Current password"
                                    placeholderTextColor="#000" 
                                    multiline={false}
                                    // keyboardType="numeric"
                                    returnKeyType="done"
                                    autoFocus={true}
                                    secureTextEntry={CurrentPassSecureText}
                                    value={currentPassword}
                                    onChangeText={text => {
                                      if (text.length == 0) {
                                        setCurrentPasswordFill(false);
                                      } else {
                                        setCurrentPasswordFill(true);
                                      }
                                      setcurrentPassword(text);
                                    }}
                                  />
                                </View>

                                <View style={styles.SecureTextViewStyle}>
                                  <TouchableOpacity
                                    activeOpacity={0.5}
                                    style={styles.SecureTextButtonViewStyle}
                                    onPress={() => {
                                      setCurrentPassSecureText(
                                        !CurrentPassSecureText,
                                      );
                                    }}>
                                    {CurrentPassSecureText ? (
                                      <Icon
                                        name="icon_eye-close"
                                        size={14}
                                        color="#a4a4a4"
                                      />
                                    ) : (
                                      <Icon
                                        name="icon_eye"
                                        size={12}
                                        color="#a4a4a4"
                                      />
                                    )}
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>

                            {/* End input area */}

                            {/* start input area */}
                            <View style={styles.ModalInputViewStyle}>
                              <View
                                style={
                                  emailEmpty ||
                                  (PassWordFill !== '' ? !PassWordFill : null)
                                    ? [
                                        styles.viewtextInputStyle,
                                        styles.ErrorBorderStyle,
                                      ]
                                    : styles.viewtextInputStyle
                                }>
                                <View style={styles.PasswordInputWidthStyle}>
                                  <TextInput
                                    // style={styles.PasswordTextInputStyle}
                                    placeholder=" New password"
                                    placeholderTextColor="#000" 
                                    multiline={false}
                                    returnKeyType="done"
                                    value={newPassword}
                                    secureTextEntry={SecureTextEntry}
                                    onChangeText={text => {
                                      if (text.length == 0) {
                                        setPassWordFill(false);
                                      } else {
                                        setPassWordFill(true);
                                      }
                                      setnewPassword(text);
                                    }}
                                  />
                                </View>

                                <View style={styles.SecureTextViewStyle}>
                                  <TouchableOpacity
                                    activeOpacity={0.5}
                                    style={styles.SecureTextButtonViewStyle}
                                    onPress={() => {
                                      setsecureTextEntry(!SecureTextEntry);
                                    }}>
                                    {SecureTextEntry ? (
                                      <Icon
                                        name="icon_eye-close"
                                        size={14}
                                        color="#a4a4a4"
                                      />
                                    ) : (
                                      <Icon
                                        name="icon_eye"
                                        size={12}
                                        color="#a4a4a4"
                                      />
                                    )}
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>
                            {/* End input area */}

                            {/* start input area */}
                            <View style={styles.ModalInputViewStyle}>
                              <View
                                style={
                                  //confirmPasswordEmpty
                                  passwordEmpty ||
                                  confirmPasswordEmpty ||
                                  (ConfirmPassWordFill !== ''
                                    ? !ConfirmPassWordFill ||
                                      newPassword !== confirmPassword
                                    : null)
                                    ? [
                                        styles.viewtextInputStyle,
                                        styles.ErrorBorderStyle,
                                      ]
                                    : styles.viewtextInputStyle
                                }>
                                <View style={styles.ConfirmPassInputWidth}>
                                  <TextInput
                                    // style={styles.PasswordTextInputStyle}
                                    placeholder=" Confirm password"
                                    placeholderTextColor="#000" 
                                    multiline={false}
                                    // keyboardType="numeric"
                                    returnKeyType="done"
                                    value={confirmPassword}
                                    secureTextEntry={ConfirmSecureTextEntry}
                                    onChangeText={text => {
                                      if (text.length == 0) {
                                        setConfirmPassWordFill(false);
                                      } else {
                                        setConfirmPassWordFill(true);
                                      }
                                      setconfirmPassword(text);
                                    }}
                                  />
                                </View>

                                <View style={styles.ConfirmSecureTextViewStyle}>
                                  <TouchableOpacity
                                    activeOpacity={0.5}
                                    style={styles.SecureTextButtonViewStyle}
                                    onPress={() => {
                                      setConfirmsecureTextEntry(
                                        !ConfirmSecureTextEntry,
                                      );
                                    }}>
                                    {ConfirmSecureTextEntry ? (
                                      <Icon
                                        name="icon_eye-close"
                                        size={14}
                                        color="#a4a4a4"
                                      />
                                    ) : (
                                      <Icon
                                        name="icon_eye"
                                        size={12}
                                        color="#a4a4a4"
                                      />
                                    )}
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>
                            {/* End input area */}

                            {errorMessage ? (
                              <View
                                style={{
                                  width: '100%',
                                  marginTop: '2%',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{color: 'red', textAlign: 'center'}}>
                                  {' '}
                                  {errorMessage}{' '}
                                </Text>
                              </View>
                            ) : null}
                          </View>

                          <View style={{width: '100%', paddingBottom: '2%'}}>
                            {CurrentPasswordFill &&
                            PassWordFill &&
                            ConfirmPassWordFill &&
                            newPassword == confirmPassword ? (
                              <View style={styles.ButtonAlignDesign}>
                                <TouchableOpacity
                                  activeOpacity={0.5}
                                  style={styles.PasswordInitialButtonView}
                                  onPress={() => {
                                    ChangesPassword({
                                      currentPassword,
                                      newPassword,
                                      confirmPassword,
                                    });
                                  }}>
                                  <View
                                    style={[
                                      styles.PasswordButtonView,
                                      {paddingHorizontal: '14%'},
                                    ]}>
                                    {loading ? (
                                      <ActivityIndicator
                                        size="small"
                                        color="#FFF"
                                        style={{paddingHorizontal: '4%'}}
                                      />
                                    ) : (
                                      <Text style={styles.buttonText}>
                                        Save
                                      </Text>
                                    )}
                                  </View>
                                </TouchableOpacity>
                              </View>
                            ) : (
                              <View style={styles.ButtonAlignDesign}>
                                <TouchableOpacity
                                  style={styles.PasswordInitialButtonView}
                                  disabled={true}>
                                  <View style={styles.DisableButtonView}>
                                    <Text style={styles.buttonText}>Save</Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            )}

                            <View style={styles.ButtonAlignDesign}>
                              <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => {
                                  setDeleteModal(!DeleteModal);
                                }}
                                style={styles.PasswordInitialButtonView}>
                                <View
                                  style={[
                                    styles.PasswordButtonView,
                                    {backgroundColor: '#FF3860'},
                                  ]}>
                                  <Text style={styles.buttonText}>Cancel</Text>
                                </View>
                              </TouchableOpacity>
                            </View>
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
          {/*End Body Area*/}

          {/*Start Delete Member Modal Area*/}
          <View style={{flex: 1}}>
            <Modal
              animationType="slide"
              transparent={false}
              visible={MemberDeleteModal}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  backgroundColor: '#f0f4ff',
                }}
                onPress={() => {
                  setMemberDelete(!MemberDeleteModal);
                }}>
                <ScrollView
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
                          style={{
                            width: '100%',
                            paddingVertical: '2%',
                            alignItems: 'center',
                          }}>
                          <Text style={{fontSize: RFPercentage(2.5)}}>
                            {' '}
                             Are you sure you want to delete this member?{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            width: '90%',
                            paddingVertical: '2%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={styles.initialButtonView}>
                            <TouchableOpacity
                              activeOpacity={0.5}
                              onPress={() => {
                                setMemberDelete(!MemberDeleteModal);
                              }}>
                              <View style={styles.ButtonView}>
                                <Text style={styles.buttonText}>Cancel</Text>
                              </View>
                            </TouchableOpacity>
                          </View>

                          <View style={styles.initialButtonView}>
                            <TouchableOpacity
                              activeOpacity={0.5}
                              onPress={() => {
                                DeleteMessMember(id);
                              }}>
                              <View
                                style={[
                                  styles.ButtonView,
                                  {backgroundColor: '#FF3860'},
                                ]}>
                                {loading ? (
                                  <ActivityIndicator
                                    size="small"
                                    color="#FFF"
                                    style={{paddingHorizontal: '6%'}}
                                  />
                                ) : (
                                  <Text style={styles.buttonText}>Delete</Text>
                                )}
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </ScrollView>
              </TouchableOpacity>
            </Modal>
          </View>
          {/*End Delete Member Modal Area*/}

          {/*Start Change manager Modal Area*/}
          <View style={{flex: 1}}>
            <Modal
              animationType="slide"
              transparent={false}
              visible={managerRemoveModal}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  backgroundColor: '#ddd',
                }}
                onPress={() => {
                  setManagerRemoveModal(!managerRemoveModal);
                }}>
                <ScrollView
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
                          style={{
                            width: '100%',
                            paddingVertical: '2%',
                            alignItems: 'center',
                          }}>
                          <Text style={{fontSize: RFPercentage(2.5)}}>
                            If you make this person manager
                          </Text>
                          <Text style={{fontSize: RFPercentage(2.5)}}>
                            you will loss your access.
                          </Text>
                        </View>

                        <View
                          style={{
                            width: '90%',
                            paddingVertical: '2%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={styles.initialButtonView}>
                            <TouchableOpacity
                              activeOpacity={0.5}
                              onPress={() => {
                                setManagerRemoveModal(!managerRemoveModal);
                              }}>
                              <View style={styles.ButtonView}>
                                <Text style={styles.buttonText}>Cancel</Text>
                              </View>
                            </TouchableOpacity>
                          </View>

                          <View style={styles.initialButtonView}>
                            <TouchableOpacity
                              activeOpacity={0.5}
                              onPress={() => {
                                ChangeManager({id, managerName});
                              }}>
                              <View
                                style={[
                                  styles.ButtonView,
                                  {
                                    backgroundColor: '#FF3860',
                                    paddingHorizontal: '12%',
                                  },
                                ]}>
                                {loading ? (
                                  <ActivityIndicator
                                    size="small"
                                    color="#FFF"
                                    style={{paddingHorizontal: '4%'}}
                                  />
                                ) : (
                                  <Text style={styles.buttonText}>save</Text>
                                )}
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </ScrollView>
              </TouchableOpacity>
            </Modal>
          </View>
          {/*End Change manager Modal Area*/}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ModalInputViewStyle: {
    paddingVertical: '4%',
    width: '100%',
  },

  CurrentPasswordInputWidthStyle: {
    width: '80%',
  },

  SecureTextViewStyle: {
    width: '20%',
    alignItems: 'center',
  },

  SecureTextButtonViewStyle: {
    width: '100%',
    padding: '2%',
    alignItems: 'center',
  },

  ErrorBorderStyle: {
    borderColor: 'red',
  },

  CurrentPasswordInputWidthStyle: {
    width: '80%',
  },

  PasswordInputWidthStyle: {
    width: '80%',
  },

  ConfirmPassInputWidth: {
    width: '80%',
  },

  ConfirmSecureTextViewStyle: {
    width: '20%',
    alignItems: 'center',
  },

  ButtonAlignDesign: {
    alignItems: 'center',
  },

  bodyView: {
    alignItems: 'center',
    paddingVertical: '1%',
    width: '100%',
  },
  saveBtn: {
    width: '100%',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 8,
    shadowColor: '#000000',
    backgroundColor: '#5842f4',
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveTx: {
    fontSize: RFPercentage(3),
    color: 'white',
  },
  dropdownBtn: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 8,
    shadowColor: '#000000',
    backgroundColor: '#ffffff',
    padding: '6%',
    borderRadius: 24,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  messInfoView: {
    width: '94%',
    alignItems: 'center',
  },

  InitialProfileView: {
    width: '100%',
    alignItems: 'center',
    padding: '3%',
  },

  textInputStyle: {
    borderColor: '#595656',
    borderWidth: 1,
    height: 28,
    // width: 35,
    borderRadius: 3,
    paddingHorizontal: '2%',
    paddingVertical: 0,
  },

  viewtextInputStyle: {
    backgroundColor: '#e8eaff',
    flexDirection: 'row',
    borderRadius: 50,
    paddingLeft: '5%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e8eaff',
  },

  modelView: {
    backgroundColor: '#fff',
    width: '90%',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: '10%',
    elevation: 10,
  },

  initialButtonView: {
    paddingTop: '5%',
    alignItems: 'center',
  },

  PasswordInitialButtonView: {
    paddingTop: '5%',
    width: '90%',
  },

  ButtonView: {
    paddingHorizontal: '10%',
    paddingVertical: '4%',
    backgroundColor: '#45ABF6',
    borderRadius: 2,
    alignItems: 'center',
  },

  PasswordButtonView: {
    backgroundColor: '#5842f4',
    borderRadius: 0,
    alignItems: 'center',
    borderRadius: 50,
    paddingVertical: '5%',
  },

  DisableButtonView: {
    paddingVertical: '5%',
    backgroundColor: '#d6d2f4',
    borderRadius: 50,
    alignItems: 'center',
  },

  buttonText: {
    fontSize: RFPercentage(2.5),
    color: '#fff',
  },
});

export default Setting;
