import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  TextInput,
  ActivityIndicator,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Image, 
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Context as AuthContext} from '../context/AuthContext';
import NetInfo from '@react-native-community/netinfo';
import Feather from 'react-native-vector-icons/Feather';
import {Icon} from '@up-shared/components';

import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
// import { Icon } from "@up-shared/components";
import Header from './Header';

const windowWidth = Dimensions.get('window').width;

console.disableYellowBox = true;

const SignInScreen = ({navigation}) => {
  const {
    state: {
      signInloading,
      successMessage,
      login_email,
      errorMessageSignIn,
      loading,
      emailEmpty,
      passwordEmpty,
    },
    SignInMethod,
    ClearErrorMessage,
    AutomaticSignin,
    ClearLoginMessage,
    clearLoginItem,
    LoginNetWrokErrorsolve,
  } = useContext(AuthContext);

  const [Temail, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [secureText, setsecureText] = useState(true);
  const [checkNetConnetion, setCheckNetConnetion] = useState(true);
  //// Text Input Fill to button Active
  const [EmailFill, setEmailFill] = useState('');
  const [PassWordFill, setPassWordFill] = useState('');
  const [firstLoading, setFirstloading] = useState(true);

  useEffect(() => {

    setTimeout(function() {
      setFirstloading(false);
    }, 1000);

    AutomaticSignin();


    let unmounted = false;

    if (!unmounted) {
      navigation.addListener('focus', () => {
        clearLoginItem();
      });

      navigation.addListener('blur', () => {
        clearInput();
        ClearErrorMessage();
        ClearLoginMessage();
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
      setEmail(''),
      setpassword(''),
      setsecureText(true),
      setEmailFill(''),
      setPassWordFill('')
    );
  };

  useEffect(() => {
    {
      login_email ? setEmail(login_email) : null;
    }

    successMessage
      ? ToastAndroid.show(successMessage, ToastAndroid.SHORT)
      : null;

    {
      EmailFill == false || PassWordFill == false
        ? (ClearErrorMessage(), ClearLoginMessage())
        : null;
    }
  }, [login_email, successMessage, EmailFill, PassWordFill]);

  
  if (signInloading || firstLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#2D8575" />
      </View>
    );
  }

  ///// All On Press function here

  ///forget password function
  const ForgetPage = () => {
    navigation.navigate('Forgot');
  };

  /// Sign In Function
  const SignInFunction = () => {
    SignInMethod({Temail, password});
  };

  ////Sign Up Function
  const SignUpFunction = () => {
    navigation.navigate('SignUp');
  };

  ////Secure Text Entry Function for Password

  const SecureTextEntryFunction = () => {
    setsecureText(!secureText);
  };

  return (
    <SafeAreaView style={styles.flexStyle}>
      {/* Header Area */}
      <Header title=" Sign In" />
      {/* Header Area */}
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
                    <ActivityIndicator size="small" color="#FF6666" />
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

            {/* Body Area */}
            <View style={styles.mainContain}>
              <Image
                source={require('../drawerscreen/images/sign_in.png')}
                style={styles.ImageStyle}
              />

              <View style={styles.formWrap}>
                <TextInput
                  style={
                    emailEmpty || (EmailFill !== '' ? !EmailFill : null)
                      ? [styles.inputStyle, styles.ErrorColor]
                      : styles.inputStyle
                  }
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
                    style={styles.passwordTextInput}
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
                    returnKeyType="done"
                  />

                  <View style={{width: '15%', alignItems: 'center'}}>
                    {secureText ? (
                      <View>
                        <TouchableOpacity
                          activeOpacity={0.5}
                          onPress={SecureTextEntryFunction}>
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
                          onPress={SecureTextEntryFunction}>
                          <Icon name="icon_eye" size={15} color="#a4a4a4" />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>

                {!errorMessageSignIn ? null : (
                  <View style={styles.ErrorMessageView}>
                    <Text style={styles.ErrorMessageTextStyle}>
                      {errorMessageSignIn}
                    </Text>
                  </View>
                )}

                <View style={styles.ForgerPassViewStyle}>
                  <TouchableOpacity activeOpacity={0.5} onPress={ForgetPage}>
                    <Text style={styles.forgotPassword}>Forgot Password</Text>
                  </TouchableOpacity>
                </View>

                {PassWordFill && EmailFill ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={SignInFunction}
                    style={styles.signButton}>
                    {loading ? (
                      <ActivityIndicator size="small" color="#FFF" />
                    ) : (
                      <Text style={styles.btnTx}> Login </Text>
                    )}
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    disabled={true}
                    // onPress={}
                    style={styles.signDeActiveButton}>
                    <Text style={styles.DeActiveBtnTx}> Login </Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={SignUpFunction}>
                  <Text style={styles.haveTx}>
                    Have not any account? SignUp
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Body Area */}
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

  ForgerPassViewStyle: {
    width: '100%',
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

  ErrorMessageView: {
    width: '100%',
    paddingTop: '3%',
  },

  ErrorMessageTextStyle: {
    color: 'red',
    fontSize: RFPercentage(2.5),
  },

  ErrorColor: {
    borderColor: 'red',
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
    paddingLeft: 20,
    height: 56,
    width: '100%',
    marginTop: '10%',
    borderWidth: 1,
    borderColor: '#e8eaff',
    flexDirection: 'row',
    alignItems: 'center',
  },

  passwordTextInput: {
    width: '85%',
    paddingVertical: 0,
  },

  inputStyle: {
    backgroundColor: '#e8eaff',
    marginLeft: 0,
    borderRadius: 15,
    paddingLeft: 20,
    height: 56,
    width: '100%',
    marginTop: '10%',
    borderWidth: 1,
    borderColor: '#e8eaff',
    // color: 'red',
    paddingVertical: 0,
  },
  forgotPassword: {
    color: '#655e8f',
    fontSize: RFPercentage(3),
    marginTop: 20,
  },

  btnTx: {
    color: '#ffffff',
    fontSize: RFPercentage(2.8),
    padding: 50,
  },

  signButton: {
    marginTop: 20,
    height: 56,
    backgroundColor: '#5842f4',
    borderRadius: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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

  haveTx: {
    color: '#655e8f',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
  },
});
export default SignInScreen;
