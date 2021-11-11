import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Modal,
  Dimensions,
  ActivityIndicator,
  ToastAndroid,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import {Context as MessContext} from '../context/MessContext';
import Header from './ProfileComponent/Header';
import NoNetConnection from '../otherScreen/NoNetConnection';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Icon} from '@up-shared/components';
import {useIsFocused} from '@react-navigation/native';
// import DefaultImage from '../drawerscreen/images/profile_bg.png';

console.disableYellowBox = true;

const windowWidth = Dimensions.get('window').width;

const ProfileScreen = ({navigation}) => {
  const isFocused = useIsFocused();

  const {
    state: {
      bazarCreateSuccess,
      loading,
      messMember,
      mess,
      UserID,
      userprofile,
      bazarList,
      meals,
      messMemberMoney,
      userEmpty,
      emailEmpty,
      passwordEmpty,
      confirmPasswordEmpty,
      errorMessage,
      profileImage,
      OtherCost,
      totalCost,
      totalMeal,
    },
    fetchMemberProfile,
    ChangesPassword,
    ClearErrorMessage,
  } = useContext(MessContext);

  // console.log(profileImage,'profile page\n');

  const [checkNetConnetion, setCheckNetConnetion] = useState(true);
  const [DeleteModal, setDeleteModal] = useState(false);
  ///TextInput Fill
  const [CurrentPasswordFill, setCurrentPasswordFill] = useState('');
  const [PassWordFill, setPassWordFill] = useState('');
  const [ConfirmPassWordFill, setConfirmPassWordFill] = useState('');

  useEffect(() => {
    navigation.addListener('focus', () => {
      ToastAndroid.show(' Profile ', ToastAndroid.SHORT);
    });
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      {
        UserID ? fetchMemberProfile(UserID) : null;
      }
    });
  }, [UserID]);

  useEffect(() => {
    {
      isFocused
        ? bazarCreateSuccess
          ? (ToastAndroid.show(bazarCreateSuccess, ToastAndroid.SHORT),
            setDeleteModal(false),
            ClearTextInput())
          : null
        : null;
    }
    {
      CurrentPasswordFill == false ||
      ConfirmPassWordFill == false ||
      PassWordFill == false
        ? ClearErrorMessage()
        : null;
    }
  }, [
    bazarCreateSuccess,
    CurrentPasswordFill,
    ConfirmPassWordFill,
    PassWordFill,
  ]);

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      navigation.addListener('blur', () => {
        ClearErrorMessage();
        ClearTextInput();
        // setCheckNetConnetion(	true );
      });

      DeleteModal === false ? (ClearErrorMessage(), ClearTextInput()) : null;

      NetInfo.addEventListener(state => {
        {
          !unmounted
            ? setCheckNetConnetion(state.isConnected)
            : setCheckNetConnetion(true);
        }
      });
    }

    return () => {
      unmounted = true;
    };
  }, [checkNetConnetion, DeleteModal]);

  const [currentPassword, setcurrentPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const [SecureTextEntry, setsecureTextEntry] = useState(true);
  const [ConfirmSecureTextEntry, setConfirmsecureTextEntry] = useState(true);
  const [CurrentPassSecureText, setCurrentPassSecureText] = useState(true);

  const ClearTextInput = () => {
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

  // console.log(OtherCost,'extra cost\n');

  if (
    bazarList === undefined ||
    meals === undefined ||
    messMemberMoney === undefined ||
    OtherCost === undefined ||
    profileImage === undefined
  ) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#2D8575" />
      </View>
    );
  }

  const memberBazarList = UserID
    ? bazarList.filter(i => i.user_id == UserID)
    : 0;
  const memberMeals = UserID ? meals.filter(i => i.user_id == UserID) : 0;
  const memberDeposited = UserID
    ? messMemberMoney.filter(i => i.id == UserID)
    : 0;

  const ExtraCost = UserID ? OtherCost.filter(i => i.user_id == UserID) : 0;

  // console.log(ExtraCost);

  if (!checkNetConnetion) {
    return <NoNetConnection />;
  }

  var totalBazar = 0;

  for (var i = 0; i < memberBazarList.length; i++) {
    totalBazar += memberBazarList[i].total_amount;
  }

  var totalMealUser = 0;

  for (var i = 0; i < memberMeals.length; i++) {
    totalMealUser +=
      memberMeals[i].dinner + memberMeals[i].lunch + memberMeals[i].breakfast;
  }

  var totalDeposited = 0;

  for (var i = 0; i < memberDeposited.length; i++) {
    totalDeposited += memberDeposited[i].deposit;
  }
  //Total Extra Cost
  var totalExtraCost = 0;

  for (var i = 0; i < ExtraCost.length; i++) {
    totalExtraCost += ExtraCost[i].total_amount;
  }
  //start Calculate Total Expanse
  var MealRate = 0;
  /// Calculate meal rate
  for (var k = 0; k < totalCost.length; k++) {
    if (totalCost[k] && totalMeal[k]) {
      MealRate = totalCost[k].sum / totalMeal[k].sum;
    }
  }
  /// Calculate Total ExtraCost
  let TotalExtraCost = 0;

  for (var l = 0; l < OtherCost.length; l++) {
    TotalExtraCost += OtherCost[l].total_amount;
  }

  const TotalExpense =
    totalMealUser * MealRate + TotalExtraCost / messMember.length;

  //Calculate Total Expanse end

  //Start calculate meal expense share
    //Meal Expense Share = meal rate *  total user meal
    const Meal_Expense_Share = MealRate * totalMealUser;
  //End calculate meal expense share

  //Start Calculate Fixed cost share
    //Fixed cost share = Total mess fixed cost / total mess member
    const Fixed_Cost_Share = TotalExtraCost/messMember.length;
  //End Calculate Fixed cost share

  //Calculate Available balance
  const AvailableBalance =
    totalDeposited - TotalExpense > 0 ? totalDeposited - TotalExpense : 0;
  // console.log(AvailableBalance);
  //Calculate Due Balance
  const TotalDue =
    TotalExpense - totalDeposited > 0 ? TotalExpense - totalDeposited : 0;

  if (userprofile === undefined) {
    return <Text> something went wrong!... </Text>;
  }

  ///All On Press Function Here

  //Change Password Function
  const ChangePasswordFunction = () => {
    ChangesPassword({currentPassword, newPassword, confirmPassword});
  };

  //Change Password Modal
  const ChangePasswordModalFunction = () => {
    setDeleteModal(!DeleteModal);
  };

  ///Pass word secure text enty
  const PassowrdSecureTextFunction = () => {
    setsecureTextEntry(!SecureTextEntry);
  };

  const CurrentPassowrdSecureTextFunction = () => {
    setCurrentPassSecureText(!CurrentPassSecureText);
  };

  /// Confirm Secure Text Enty Function
  const ConfirmSecureTextFunction = () => {
    setConfirmsecureTextEntry(!ConfirmSecureTextEntry);
  };

  return (
    <SafeAreaView style={styles.flexStyle}>
      {/*Start Header Area*/}
      <View>
        <Header navigation={navigation} title="My Profile" />
      </View>
      {/*End Header Area*/}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewStyle}>
        <View style={styles.BodyFlexStyle}>
          {!userprofile.length && !mess.length ? (
            <View style={styles.noUserFountView}>
              <Text style={styles.IconTextStyle}>
                {' '}
                We couldn't find any information to your account.{' '}
              </Text>
            </View>
          ) : (
            <View style={styles.profileWrap}>
              <View style={styles.profileTop}>
                <View style={styles.profileArea}>
                  {profileImage ? (
                    profileImage.length ? (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('Edit Profile')}>
                        <Image
                          source={{uri: profileImage}}
                          style={styles.ImageStyle}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('Edit Profile')}>
                        <Image
                          source={require('../drawerscreen/images/profile_bg.png')}
                          style={styles.ImageStyle}
                        />
                      </TouchableOpacity>
                    )
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => navigation.navigate('Edit Profile')}>
                      <Image
                        source={require('../drawerscreen/images/profile_bg.png')}
                        style={styles.ImageStyle}
                      />
                    </TouchableOpacity>
                  )}
                  {userprofile
                    ? userprofile.map(item => {
                        return (
                          <View key={item.email}>
                            <Text style={styles.nameTx}>{item.username}</Text>
                            <Text style={styles.emailTx}>{item.email}</Text>
                          </View>
                        );
                      })
                    : null}
                </View>
              </View>
              <View style={styles.profileButtom}>
                <View style={styles.totalItemWrap}>
                  {/* Total Deposits */}
                  <View style={styles.itemWrap}>
                    <View style={styles.item}>
                      <View style={styles.iconWrap}>
                        <Icon
                          name="icon_total-deposits"
                          size={14}
                          color="#ffffff"
                        />
                      </View>
                      <Text style={styles.totalText}>Total Deposits</Text>
                    </View>
                    <View style={[styles.item, styles.ItemWidthStyle]}>
                      {totalDeposited ? (
                        <Text style={styles.totalText}>
                          : {totalDeposited} tk
                        </Text>
                      ) : (
                        <Text style={styles.totalText}>: 0.00 tk</Text>
                      )}
                    </View>
                  </View>
                  {/* Total Deposits */}
                  {/* Total shopping cost */}
                  {/* <View style={styles.itemWrap}>
                    <View style={styles.item}>
                      <View style={styles.iconWrap}>
                        <Icon
                          name="icon_shopping-cost"
                          size={14}
                          color="#ffffff"
                        />
                      </View>
                      <Text style={styles.totalText}>Total Shopping</Text>
                    </View>
                    <View style={[styles.item, styles.ItemWidthStyle]}>
                      {totalBazar ? (
                        <Text style={styles.totalText}>
                          : {totalBazar} tk
                        </Text>
                      ) : (
                        <Text style={styles.totalText}>: 0.00 tk</Text>
                      )}
                    </View>
                  </View> */}
                  {/* Total shopping cost */}
                  {/* Total Extra Costs cost */}
                  {/* <View style={styles.itemWrap}>
                    <View style={styles.item}>
                      <View style={styles.iconWrap}>
                        <Icon
                          name="icon_extra-cost"
                          size={14}
                          color="#ffffff"
                        />
                      </View>
                      <Text style={styles.totalText}>Total Fixed Cost</Text>
                    </View>
                    <View style={[styles.item, styles.ItemWidthStyle]}>
                      {totalExtraCost ? (
                        <Text style={styles.totalText}>
                          : {totalExtraCost} tk
                        </Text>
                      ) : (
                        <Text style={styles.totalText}>: 0.00 tk</Text>
                      )}
                    </View>
                  </View> */}
                  {/* Total Extra Costs cost */}
                  <View style={styles.itemWrap}>
                    <View style={styles.item}>
                      <View style={styles.iconWrap}>
                        <Icon
                          name="icon_total-meals"
                          size={14}
                          color="#ffffff"
                        />
                      </View>
                      <Text style={styles.totalText}>Total Meals</Text>
                    </View>
                    <View style={[styles.item, styles.ItemWidthStyle]}>
                      {totalMealUser ? (
                        <Text style={styles.totalText}>
                          : {totalMealUser}
                        </Text>
                      ) : (
                        <Text style={styles.totalText}>: 0 </Text>
                      )}
                    </View>
                  </View>
                  {/* Total Extra Costs cost */}
                  {/* Meal Rate */}
                  <View style={styles.itemWrap}>
                    <View style={styles.item}>
                      <View style={styles.iconWrap}>
                        <Icon
                          name="icon_meal-rate"
                          size={14}
                          color="#ffffff"
                        />
                      </View>
                      <Text style={styles.totalText}>Meal Rate</Text>
                    </View>
                    <View style={[styles.item, styles.ItemWidthStyle]}>
                      {MealRate ? (
                        <Text style={styles.totalText}>
                          : {MealRate.toFixed(2)} tk
                        </Text>
                      ) : (
                        <Text style={styles.totalText}>: 0.00 tk </Text>
                      )}
                    </View>
                  </View>
                  {/* Meal Rate*/}
                  {/* Meal Expense Share */}
                  <View style={styles.itemWrap}>
                    <View style={styles.item}>
                      <View style={styles.iconWrap}>
                        <Icon name="icon_deposit" size={14} color="#ffffff" />
                      </View>
                      <Text style={styles.totalText}>Meal Expense Share</Text>
                    </View>
                    <View style={[styles.item, {width: '25%'}]}>
                      {Meal_Expense_Share ? (
                        <Text style={styles.totalText}>
                          : {Meal_Expense_Share.toFixed(2)} tk
                        </Text>
                      ) : (
                        <Text style={styles.totalText}>: 0.00 tk </Text>
                      )}
                    </View>
                  </View>
                  {/* Meal Expense Share */}

                  {/*  Fixed cost share */}
                  <View style={styles.itemWrap}>
                    <View style={styles.item}>
                      <View style={styles.iconWrap}>
                        <Icon
                          name="icon_total-deposits"
                          size={14}
                          color="#ffffff"
                        />
                      </View>
                      <Text style={styles.totalText}> Fixed Cost Share</Text>
                    </View>
                    <View style={[styles.item, {width: '25%'}]}>
                      {Fixed_Cost_Share ? (
                        <Text style={styles.totalText}>
                          : {Fixed_Cost_Share.toFixed(2)} tk
                        </Text>
                      ) : (
                        <Text style={styles.totalText}>: 0.00 tk </Text>
                      )}
                    </View>
                  </View>
                  {/*  Fixed cost share */}
                  {/* Total Expenses */}
                  <View style={styles.itemWrap}>
                    <View style={styles.item}>
                      <View style={styles.iconWrap}>
                        <Icon
                          name="icon_extra-cost"
                          size={14}
                          color="#ffffff"
                        />
                      </View>
                      <Text style={styles.totalText}>Total Expense</Text>
                    </View>
                    <View style={[styles.item, styles.ItemWidthStyle]}>
                      {TotalExpense ? (
                        <Text style={styles.totalText}>
                          : {TotalExpense.toFixed(2)} tk
                        </Text>
                      ) : (
                        <Text style={styles.totalText}>: 0.00 tk </Text>
                      )}
                    </View>
                  </View>
                  {/* Total Expenses */}
                  {/* Available Balance */}
                  <View style={styles.itemWrap}>
                    <View style={styles.item}>
                      <View style={styles.iconWrap}>
                        <Icon name="icon_deposit" size={14} color="#ffffff" />
                      </View>
                      <Text style={styles.totalText}>Available Balance</Text>
                    </View>
                    <View style={[styles.item, styles.ItemWidthStyle]}>
                      {AvailableBalance ? (
                        <Text style={styles.totalText}>
                          : {AvailableBalance.toFixed(2)} tk
                        </Text>
                      ) : (
                        <Text style={styles.totalText}>: 0.00 tk </Text>
                      )}
                    </View>
                  </View>
                  {/* Available Balance */}
                  {/* Total Due */}
                  <View style={styles.itemWrap}>
                    <View style={styles.item}>
                      <View style={styles.iconWrap}>
                        <Icon
                          name="icon_meal-rate"
                          size={14}
                          color="#ffffff"
                        />
                      </View>
                      <Text style={styles.totalText}>Total Due</Text>
                    </View>
                    <View style={[styles.item, styles.ItemWidthStyle]}>
                      {TotalDue ? (
                        <Text style={styles.totalText}>
                          : {TotalDue.toFixed(2)} tk
                        </Text>
                      ) : (
                        <Text style={styles.totalText}>: 0.00 tk </Text>
                      )}
                    </View>
                  </View>
                  {/* Total Due */}
                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.saveBtn}
                  onPress={ChangePasswordModalFunction}>
                  <Text style={styles.saveTx}> Change Password </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/*Start Delete Modal Area*/}
          <View style={styles.flexStyle}>
            <Modal
              animationType="slide"
              transparent={false}
              visible={DeleteModal}>
              <TouchableOpacity
                style={styles.ModalViewStyle}
                onPress={ChangePasswordModalFunction}>
                <ScrollView
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={styles.ModalScrollViewStyle}
                  showsVerticalScrollIndicator={false}>
                  <TouchableWithoutFeedback>
                    <View style={styles.modelView}>
                      <View style={styles.ModalFirstViewStyle}>
                        <View style={styles.ModalSecondViewStyle}>
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
                                  onPress={CurrentPassowrdSecureTextFunction}>
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
                                  onPress={PassowrdSecureTextFunction}>
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
                                  onPress={ConfirmSecureTextFunction}>
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
                            <View style={styles.ErrorViewStyle}>
                              <Text style={styles.ErrorViewTextStyle}>
                                {' '}
                                {errorMessage}{' '}
                              </Text>
                            </View>
                          ) : null}
                        </View>

                        <View style={styles.ButtonViewStyle}>
                          {CurrentPasswordFill &&
                          PassWordFill &&
                          ConfirmPassWordFill &&
                          newPassword == confirmPassword ? (
                            <View style={styles.ButtonAlignDesign}>
                              <TouchableOpacity
                                activeOpacity={0.5}
                                style={styles.initialButtonView}
                                onPress={ChangePasswordFunction}>
                                <View
                                  style={[
                                    styles.ButtonView,
                                    styles.SaveButtonHorizontalPadding,
                                  ]}>
                                  {loading ? (
                                    <ActivityIndicator
                                      size="small"
                                      color="#FFF"
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
                                style={styles.initialButtonView}
                                disabled={true}>
                                <View
                                  style={[
                                    styles.DisableButtonView,
                                    styles.SaveButtonHorizontalPadding,
                                  ]}>
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
                              style={styles.initialButtonView}>
                              <View
                                style={[
                                  styles.ButtonView,
                                  styles.CancelButtonBackground,
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexStyle: {
    flex: 1,
  },

  ViewFlexStyle: {
    flex: 1,
  },

  ScrollViewStyle: {
    flexGrow: 1,
  },

  BodyFlexStyle: {
    flex: 1,
  },

  noUserFountView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ImageStyle: {
    resizeMode: 'cover',
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
    borderRadius: 1000,
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

  IconTextStyle: {
    paddingHorizontal: 15,
    // fontSize:16,
    textAlign: 'left',
    color: '#444',
  },

  modelView: {
    backgroundColor: '#fff',
    width: '90%',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: '10%',
  },

  ModalViewStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f0f4ff',
  },

  ModalScrollViewStyle: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ModalFirstViewStyle: {
    width: '90%',
    paddingVertical: '5%',
    alignItems: 'center',
  },

  ModalSecondViewStyle: {
    width: '80%',
    paddingVertical: '2%',
    alignItems: 'center',
  },

  ModalInputViewStyle: {
    paddingVertical: '4%',
    width: '100%',
  },

  InputTextView: {
    paddingVertical: '1%',
  },

  InputTextViewTextStyle: {
    color: '#555',
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

  PasswordTextInputStyle: {
    paddingVertical: 0,
    height: 28,
    borderWidth: 0,
  },

  SecureTextViewStyle: {
    width: '20%',
    alignItems: 'center',
  },

  ConfirmSecureTextViewStyle: {
    width: '20%',
    alignItems: 'center',
  },

  SecureTextButtonViewStyle: {
    width: '100%',
    padding: '2%',
    alignItems: 'center',
  },

  ErrorViewStyle: {
    width: '100%',
    alignItems: 'center',
    marginTop: '2%',
  },

  ErrorViewTextStyle: {
    color: 'red',
    fontSize: RFPercentage(2.4),
    textAlign: 'center',
  },

  ButtonViewStyle: {
    width: '100%',
    paddingBottom: '3%',
  },

  ButtonAlignDesign: {
    alignItems: 'center',
  },

  initialButtonView: {
    paddingTop: '5%',
    width: '90%',
  },

  ButtonView: {
    paddingVertical: '5%',
    backgroundColor: '#5842f4',
    borderRadius: 0,
    alignItems: 'center',
    borderRadius: 50,
  },

  CancelButtonBackground: {
    backgroundColor: '#FF3860',
  },

  SaveButtonHorizontalPadding: {
    paddingHorizontal: '14%',
  },

  DisableButtonView: {
    paddingVertical: '5%',
    backgroundColor: '#d6d2f4',
    borderRadius: 50,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
  },

  ErrorBorderStyle: {
    borderColor: 'red',
  },

  profileWrap: {
    flex: 1,
  },
  profileTop: {
    backgroundColor: '#5842f4',
    height: windowWidth * 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileButtom: {
    backgroundColor: '#f0f4ff',
    width: '100%',
    alignItems: 'center',
  },
  profileArea: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  nameTx: {
    fontSize: RFPercentage(3),
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    marginTop: 14,
  },
  emailTx: {
    fontSize: RFPercentage(2),
    textAlign: 'center',
    color: 'white',
    fontWeight: '400',
    marginTop: 3,
  },
  totalItemWrap: {
    backgroundColor: '#ffffff',
    borderRadius: 50,
    padding: 26,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 8,
    shadowColor: '#000000',
    width: '100%',
    top: -44,
    left: 0,
  },
  itemWrap: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // height: 50,
    paddingTop: '3%',
    marginTop: 0,
    // borderWidth: 1,
  },

  ItemWidthStyle: {
    width: '25%',
  },

  iconWrap: {
    width: 30,
    height: 30,
    backgroundColor: '#8395ff',
    borderRadius: 6,
    shadowColor: '#edf2fc',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 6,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalText: {
    fontSize: RFPercentage(2.5),
    color: '#242d48',
  },
  saveBtn: {
    width: '80%',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 8,
    shadowColor: '#000000',
    backgroundColor: '#5842f4',
    padding: '4%',
    borderRadius: 20,
    alignItems: 'center',
    top: -14,
  },
  saveTx: {
    fontSize: RFPercentage(2.5),
    color: 'white',
  },
});

export default ProfileScreen;
