import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Context as AuthContext} from '../context/AuthContext';
import NetInfo from '@react-native-community/netinfo';
import profileBg from '../drawerscreen/images/profile_bg.png';
import Header from './Header';

const windowWidth = Dimensions.get('window').width;
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

console.disableYellowBox = true;

const Verification = ({navigation}) => {
  const {
    state,
    state: {
      reSendLoading,
      loading,
      verificationErrorOccur,
      resendVerificationId,
      successMessage,
      verifyEmail,
      verifyPass,
    },
    ReSendVerificationCode,
    EmailVerify,
    clearResendProblemOccur,
    LoginNetWrokErrorsolve,
  } = useContext(AuthContext);

  const [token, setToken] = useState('');

  const [firstTextInput, setFirstTextInput] = useState('');
  const [secondTextInput, setSecondTextInput] = useState('');
  const [thirdTextInput, setThirdTextInput] = useState('');
  const [fourTextInput, setFourTextInput] = useState('');
  const [FiveTextInput, setFiveTextInput] = useState('');
  const [sixTextInput, setSixTextInput] = useState('');
  /// TextInput Fill
  const [firstTextInputFill, setFirstTextInputFill] = useState('');
  const [secondTextInputFill, setSecondTextInputFill] = useState('');
  const [thirdTextInputFill, setThirdTextInputFill] = useState('');
  const [fourTextInputFill, setFourTextInputFill] = useState('');
  const [FiveTextInputFill, setFiveTextInputFill] = useState('');
  const [sixTextInputFill, setSixTextInputFill] = useState('');

  const [email, setverifyEmail] = useState('');
  const [password, setverifyPass] = useState('');

  const [id, setVerificationID] = useState('');
  const [checkNetConnetion, setCheckNetConnetion] = useState(true);

  useEffect(() => {
    verifyEmail ? setverifyEmail(verifyEmail) : null;
    verifyEmail ? setverifyPass(verifyPass) : null;

    resendVerificationId ? setVerificationID(resendVerificationId) : null;
  }, [verifyEmail, resendVerificationId]);

  useEffect(() => {
    {
      successMessage
        ? ToastAndroid.show(successMessage, ToastAndroid.SHORT)
        : null;
    }
  }, []);

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      navigation.addListener('blur', () => {
        clearResendProblemOccur();
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

  /// All On Press Function Here
  /// Verify Function
  const VerifyFunction = () => {
    EmailVerify({
      firstTextInput,
      secondTextInput,
      thirdTextInput,
      fourTextInput,
      FiveTextInput,
      sixTextInput,
      email,
      password,
    });
  };

  /// Verify Later function
  const ResendFunction = () => {
    ReSendVerificationCode(id);
  };

  /// Focus Next Text Input

  const FocusSecondTextInput = () => {
    firstTextInput1.focus();
  };

  const FocusThirdTextInput = () => {
    secondtextInput.focus();
  };

  const FocusFourthTextInput = () => {
    thirdtextInput.focus();
  };

  const FocusFiveTextInput = () => {
    fourtextInput.focus();
  };

  const FocusSixTextInput = () => {
    fivetextInput.focus();
  };

  return (
    <SafeAreaView style={styles.flexStyle}>
      {/* Header Area */}
      <Header title="Verification " />
      {/* Header Area */}
      <View style={styles.ViewFlexStyle}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ScrollViewStyle}>
          <View style={styles.bodyView}>
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

            {/* Main Body  */}

            <View style={styles.mainBody}>
              <View style={styles.profileWrap}>
                <Image source={profileBg} style={styles.ImageStyle} />
              </View>
              <Text style={styles.forgotTex}>
                Enter the verification code we just send you on your email
                address.
              </Text>
              <View style={styles.formWrap}>
                <View regular style={styles.item}>
                  <TextInput
                    style={styles.inputStyle}
                    maxLength={1}
                    value={firstTextInput}
                    onChangeText={text => {
                      if (text.length == 0) {
                        setFirstTextInputFill(false);
                      } else {
                        setFirstTextInputFill(true), FocusSecondTextInput();
                      }
                      setFirstTextInput(text);
                    }}
                    autoCorrect={false}
                    autoFocus={true}
                    onSubmitEditing={FocusSecondTextInput}
                    returnKeyType="next"
                  />
                </View>

                <View regular style={styles.item}>
                  <TextInput
                    style={styles.inputStyle}
                    maxLength={1}
                    value={secondTextInput}
                    onChangeText={text => {
                      if (text.length == 0) {
                        setSecondTextInputFill(false);
                      } else {
                        setSecondTextInputFill(true), FocusThirdTextInput();
                      }
                      setSecondTextInput(text);
                    }}
                    autoCorrect={false}
                    autoFocus={false}
                    ref={input => {
                      firstTextInput1 = input;
                    }}
                    onSubmitEditing={FocusThirdTextInput}
                    blurOnSubmit={false}
                    returnKeyType="next"
                  />
                </View>

                <View regular style={styles.item}>
                  <TextInput
                    style={styles.inputStyle}
                    maxLength={1}
                    value={thirdTextInput}
                    onChangeText={text => {
                      if (text.length == 0) {
                        setThirdTextInputFill(false);
                      } else {
                        setThirdTextInputFill(true), FocusFourthTextInput();
                      }
                      setThirdTextInput(text);
                    }}
                    autoCorrect={false}
                    autoFocus={false}
                    ref={input => {
                      secondtextInput = input;
                    }}
                    onSubmitEditing={FocusFourthTextInput}
                    blurOnSubmit={false}
                    returnKeyType="next"
                  />
                </View>

                <View regular style={styles.item}>
                  <TextInput
                    style={styles.inputStyle}
                    maxLength={1}
                    value={fourTextInput}
                    onChangeText={text => {
                      if (text.length == 0) {
                        setFourTextInputFill(false);
                      } else {
                        setFourTextInputFill(true), FocusFiveTextInput();
                      }
                      setFourTextInput(text);
                    }}
                    autoCorrect={false}
                    autoFocus={false}
                    ref={input => {
                      thirdtextInput = input;
                    }}
                    onSubmitEditing={FocusFiveTextInput}
                    blurOnSubmit={false}
                    returnKeyType="next"
                  />
                </View>

                <View regular style={styles.item}>
                  <TextInput
                    style={styles.inputStyle}
                    maxLength={1}
                    value={FiveTextInput}
                    onChangeText={text => {
                      if (text.length == 0) {
                        setFiveTextInputFill(false);
                      } else {
                        setFiveTextInputFill(true), FocusSixTextInput();
                      }
                      setFiveTextInput(text);
                    }}
                    autoCorrect={false}
                    autoFocus={false}
                    ref={input => {
                      fourtextInput = input;
                    }}
                    onSubmitEditing={FocusSixTextInput}
                    blurOnSubmit={false}
                    returnKeyType="next"
                  />
                </View>

                <View regular style={styles.item}>
                  <TextInput
                    style={styles.inputStyle}
                    maxLength={1}
                    value={sixTextInput}
                    onChangeText={text => {
                      if (text.length == 0) {
                        setSixTextInputFill(false);
                      } else {
                        setSixTextInputFill(true);
                      }
                      setSixTextInput(text);
                    }}
                    autoCorrect={false}
                    autoFocus={false}
                    ref={input => {
                      fivetextInput = input;
                    }}
                    blurOnSubmit={false}
                    returnKeyType="done"
                  />
                </View>
              </View>

              {verificationErrorOccur ? (
                <View style={styles.ErrorMessageView}>
                  <Text style={styles.ErrorMessageTextStyle}>
                    {verificationErrorOccur}
                  </Text>
                </View>
              ) : null}

              <View style={styles.btnWrap}>
                <TouchableOpacity activeOpacity={0.5} onPress={ResendFunction}>
                  <Text style={styles.haveTx}>
                    If you didn’t receive a code! Resend
                  </Text>
                </TouchableOpacity>

                {firstTextInputFill &&
                secondTextInputFill &&
                thirdTextInputFill &&
                fourTextInputFill &&
                FiveTextInputFill &&
                sixTextInputFill ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={VerifyFunction}
                    style={styles.signButton}>
                    {loading ? (
                      <ActivityIndicator size="small" color="#FFF" />
                    ) : (
                      <Text style={styles.btnTx}> Verify </Text>
                    )}
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    disabled={true}
                    style={styles.signDeActiveButton}>
                    <Text style={styles.DeActiveBtnTx}> Verify </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {/* Main Body  */}
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
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
  },

  ErrorMessageView: {
    paddingTop: '4%',
    marginLeft: '4%',
    width: '100%',
  },

  ErrorMessageTextStyle: {
    color: 'red',
    fontSize: RFPercentage(2.5),
    textAlign: 'center',
  },

  bodyView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0f4ff',
  },

  mainBody: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#f0f4ff',
    paddingBottom: '3%',
  },
  profileWrap: {
    alignItems: 'center',
    marginTop: '4%',
    marginBottom: '5%',
  },
  forgotTex: {
    fontSize: RFPercentage(3),
    textAlign: 'center',
    width: '80%',
  },
  formWrap: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: 35,
    height: 35,
    backgroundColor: 'white',
    shadowColor: '#edf2fc',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 10,
    marginLeft: 13,
    alignItems: 'center',
  },
  btnWrap: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
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
  btnTx: {
    color: '#ffffff',
    fontSize: RFPercentage(3),
    padding: 50,
    padding: '10%',
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
    color: '#b4a8ff',
    fontSize: RFPercentage(3.2),
    marginTop: 40,
    marginTop: '10%',
    marginBottom: '5%',
    textAlign: 'center',
  },
  inputStyle: {
    textAlign: 'center',
  },
});
export default Verification;
