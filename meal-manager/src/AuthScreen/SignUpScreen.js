import React, {useContext, useState, useEffect} from 'react';
import {
  Dimensions,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Context as AuthContext} from '../context/AuthContext';
import Header from './Header';
import NetInfo from '@react-native-community/netinfo';
import {Icon} from '@up-shared/components';

const windowWidth = Dimensions.get('window').width;
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

console.disableYellowBox = true;

const SignUpScreen = ({navigation}) => {
  const {
    state: {
      errorMessage,
      loading,
      userEmpty,
      emailEmpty,
      passwordEmpty,
      confirmPasswordEmpty,
    },
    SignUp,
    ClearErrorMessage,
    ClearLoginMessage,
    clearLoginItem,
    LoginNetWrokErrorsolve,
  } = useContext(AuthContext);

  const [username, setName] = useState('');
  const [Temail, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [secureText, setsecureText] = useState(true);
  const [confirmSecureText, setconfirmSecureText] = useState(true);
  const [profile_pic_url, setProfile_pic_url] = useState('member image');
  const [checkNetConnetion, setCheckNetConnetion] = useState(true);
  //// Text Input Fill to button Active
  const [EmailFill, setEmailFill] = useState('');
  const [PassWordFill, setPassWordFill] = useState('');
  const [ConfirmPassWordFill, setConfirmPassWordFill] = useState('');
  const [NameFill, setNameFill] = useState('');

  useEffect(() => {
    {
      NameFill == false ||
      ConfirmPassWordFill == false ||
      PassWordFill == false ||
      EmailFill == false
        ? (ClearErrorMessage(), ClearLoginMessage())
        : null;
    }
  }, [NameFill, ConfirmPassWordFill, PassWordFill, EmailFill]);

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      navigation.addListener('blur', () => {
        clearInput();
        ClearErrorMessage();
        ClearLoginMessage();
        clearLoginItem();
      });

      NetInfo.addEventListener(state => {
        {
          !unmounted ? setCheckNetConnetion(state.isConnected) : null;
        }
        state.isConnected === true ? LoginNetWrokErrorsolve() : null;
      });
    }

    return () => {
      unmounted = true;
    };
  }, [checkNetConnetion]);

  const clearInput = () => {
    return (
      setName(''),
      setEmail(''),
      setpassword(''),
      setconfirmPassword(''),
      setsecureText(true),
      setconfirmSecureText(true),
      setEmailFill(''),
      setNameFill(''),
      setPassWordFill(''),
      setConfirmPassWordFill('')
    );
  };

  //// All On Press Function Here
  ///Password Secure text
  const PasswordSecureText = () => {
    setsecureText(!secureText);
  };

  ///Confirm Password Secure Text
  const ConfirmPasswordSecureText = () => {
    setconfirmSecureText(!confirmSecureText);
  };

  ///Sign Up Function
  const SignUpFunction = () => {
    SignUp({username, Temail, password, confirmPassword, profile_pic_url});
  };

  ///Login Page
  const LoginPage = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.flexStyle}>
      <View>
        <Header title="Sign Up" />
      </View>
      <View style={styles.ViewFlexStyle}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ScrollViewStyle}>
          <View style={styles.BodyFlexStyle}>
            {/* Start net connection error show */}
            {!checkNetConnetion ? (
              <View style={styles.NonetConnectionView}>
                <View style={styles.netConnectionRowView}>
                  <View style={styles.netActivityIndicatorStyle}>
                    <ActivityIndicator size="small" color={'#FF6666'} />
                  </View>
                  <View>
                    <Text style={styles.NonetConnectionTextStyle}>
                      No internet connection
                    </Text>
                  </View>
                </View>
              </View>
            ) : null}
            {/* End net connection error show */}

            <View style={styles.mainContain}>
              <Image
                source={require('../drawerscreen/images/sign_in.png')}
                style={styles.ImageStyle}
              />
              <View style={styles.formWrap}>
                <TextInput
                  placeholder="Name"
                  placeholderTextColor="#000"
                  style={
                    userEmpty || (NameFill !== '' ? !NameFill : null)
                      ? [styles.inputStyle, styles.ErrorColor]
                      : styles.inputStyle
                  }
                  value={username}
                  onChangeText={text => {
                    if (text.length == 0) {
                      setNameFill(false);
                    } else {
                      setNameFill(true);
                    }
                    setName(text);
                  }}
                  autoCorrect={false}
                  autoFocus={true}
                  onSubmitEditing={() => {
                    firstTextInput.focus();
                  }}
                  returnKeyType="next"
                />

                <TextInput
                  style={
                    emailEmpty || (EmailFill !== '' ? !EmailFill : null)
                      ? [styles.inputStyle, styles.ErrorColor]
                      : styles.inputStyle
                  }
                  ref={input => {
                    firstTextInput = input;
                  }}
                  value={Temail}
                  onChangeText={text => {
                    if (text.length == 0) {
                      setEmailFill(false);
                    } else {
                      setEmailFill(true);
                    }
                    setEmail(text);
                  }}
                  placeholderTextColor="#000"
                  placeholder="E-mail"
                  autoCorrect={false}
                  keyboardType="email-address"
                  onSubmitEditing={() => {
                    secondTextInput.focus();
                  }}
                  blurOnSubmit={false}
                  returnKeyType="next"
                />

                <View
                  style={
                    passwordEmpty ||
                    (PassWordFill !== '' ? !PassWordFill : null)
                      ? [styles.PasswordInputStyle, styles.ErrorColor]
                      : styles.PasswordInputStyle
                  }>
                  <TextInput
                    style={styles.ConfirmTextInputStyle}
                    ref={input => {
                      secondTextInput = input;
                    }}
                    value={password}
                    onChangeText={text => {
                      if (text.length == 0) {
                        setPassWordFill(false);
                      } else {
                        setPassWordFill(true);
                      }
                      setpassword(text);
                    }}
                    placeholderTextColor="#000"
                    placeholder="Password"
                    secureTextEntry={secureText}
                    autoCorrect={false}
                    onSubmitEditing={() => {
                      thirdTextInput.focus();
                    }}
                    blurOnSubmit={false}
                    returnKeyType="next"
                  />

                  <View style={styles.SecureTextViewStyle}>
                    {secureText ? (
                      <View>
                        <TouchableOpacity
                          activeOpacity={0.5}
                          onPress={PasswordSecureText}>
                          <Icon
                            name="icon_eye-close"
                            size={18}
                            color="#a4a4a4"
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View>
                        <TouchableOpacity
                          activeOpacity={0.5}
                          onPress={PasswordSecureText}>
                          <Icon name="icon_eye" size={15} color="#a4a4a4" />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>

                <View
                  style={
                    confirmPasswordEmpty ||
                    (ConfirmPassWordFill !== ''
                      ? !ConfirmPassWordFill || password !== confirmPassword
                      : null)
                      ? [styles.PasswordInputStyle, styles.ErrorColor]
                      : styles.PasswordInputStyle
                  }>
                  <TextInput
                    style={styles.ConfirmTextInputStyle}
                    ref={input => {
                      thirdTextInput = input;
                    }}
                    placeholderTextColor="#000"
                    value={confirmPassword}
                    onChangeText={text => {
                      if (text.length == 0) {
                        setConfirmPassWordFill(false);
                      } else {
                        setConfirmPassWordFill(true);
                      }
                      setconfirmPassword(text);
                    }}
                    mode="outlined"
                    placeholder="Confirm password"
                    secureTextEntry={confirmSecureText}
                    autoCorrect={false}
                    returnKeyType="done"
                  />

                  <View style={styles.SecureTextViewStyle}>
                    {confirmSecureText ? (
                      <View>
                        <TouchableOpacity
                          activeOpacity={0.5}
                          onPress={ConfirmPasswordSecureText}>
                          <Icon
                            name="icon_eye-close"
                            size={18}
                            color="#a4a4a4"
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View>
                        <TouchableOpacity
                          activeOpacity={0.5}
                          onPress={ConfirmPasswordSecureText}>
                          <Icon name="icon_eye" size={15} color="#a4a4a4" />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>

                {!errorMessage ? null : (
                  <View style={styles.ErrorMessageView}>
                    <Text style={styles.ErrorMessageTextStyle}>
                      {errorMessage}
                    </Text>
                  </View>
                )}

                {NameFill &&
                EmailFill &&
                PassWordFill &&
                ConfirmPassWordFill &&
                password == confirmPassword ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={SignUpFunction}
                    style={styles.signButton}>
                    {loading ? (
                      <ActivityIndicator size="small" color="#FFF" />
                    ) : (
                      <Text style={styles.btnTx}> Sign Up </Text>
                    )}
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    disabled={true}
                    style={styles.signDeActiveButton}>
                    <Text style={styles.DeActiveBtnTx}> Sign Up </Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity activeOpacity={0.5} onPress={LoginPage}>
                  <Text style={styles.haveTx}>
                    Have not any account? Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
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
    backgroundColor: '#fff',
  },

  NonetConnectionView: {
    position: 'absolute',
    zIndex: 1,
    alignItems: 'center',
    width: '100%',
  },

  netConnectionRowView: {
    flexDirection: 'row',
    paddingTop: '2%',
  },

  netActivityIndicatorStyle: {
    paddingHorizontal: '2%',
  },

  NonetConnectionTextStyle: {
    color: 'red',
  },

  ImageStyle: {
    resizeMode: 'contain',
    width: windowWidth * 0.5,
    height: windowWidth * 0.5,
  },

  ErrorColor: {
    borderColor: 'red',
  },

  SecureTextViewStyle: {
    width: '15%',
    alignItems: 'center',
  },

  ConfirmTextInputStyle: {
    width: '85%',
    paddingVertical: 0,
  },

  ErrorMessageView: {
    paddingTop: '4%',
    marginLeft: '4%',
    width: '100%',
  },

  ErrorMessageTextStyle: {
    color: 'red',
    fontSize: RFPercentage(2.5),
  },

  mainContain: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#fff',
  },
  formWrap: {
    paddingLeft: 0,
    alignItems: 'center',
    width: '80%',
    maxWidth: 500,
  },

  PasswordInputStyle: {
    backgroundColor: '#e8eaff',
    marginLeft: 0,
    borderRadius: 15,
    // borderBottomWidth: 0,
    paddingLeft: 20,
    height: 56,
    width: '100%',
    marginTop: '10%',
    borderWidth: 1,
    borderColor: '#e8eaff',
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputStyle: {
    backgroundColor: '#e8eaff',
    marginLeft: 0,
    borderRadius: 15,
    paddingVertical: 0,
    paddingLeft: 20,
    height: 56,
    width: '100%',
    marginTop: '10%',
    borderWidth: 1,
    borderColor: '#e8eaff',
  },

  btnTx: {
    color: '#ffffff',
    fontSize: RFPercentage(2.8),
    padding: 50,
  },

  signDeActiveButton: {
    marginTop: 20,
    height: 56,
    backgroundColor: '#d6d2f4',
    borderRadius: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  DeActiveBtnTx: {
    color: '#FFF',
    fontSize: RFPercentage(2.8),
    padding: 50,
  },

  signButton: {
    color: '#ffffff',
    marginTop: 20,
    height: 56,
    backgroundColor: '#5842f4',
    borderRadius: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  haveTx: {
    color: '#655e8f',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
  },
});
export default SignUpScreen;
