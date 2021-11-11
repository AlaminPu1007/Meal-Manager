import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Image,
  TextInput,
  ActivityIndicator,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import {Context as MessContext} from '../../context/MessContext';
import Header from '../../component/Header';
import NetInfo from '@react-native-community/netinfo';
import NoNetConnection from '../../otherScreen/NoNetConnection';
import BackGroundImage from '../../drawerscreen/images/sign_in.png';
import {Icon} from '@up-shared/components';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

const windowWidth = Dimensions.get('window').width;

console.disableYellowBox = true;

let filter = 0;

const CreateMemberScreen = ({navigation}) => {
  const {
    state: {
      loading,
      messMember,
      userEmpty,
      emailEmpty,
      passwordEmpty,
      confirmPasswordEmpty,
      errorMessage,
    },
    CreateMessMember,
    fetchMessMember,
    ClearErrorMessage,
  } = useContext(MessContext);

  const [checkNetConnetion, setCheckNetConnetion] = useState(true);

  useEffect(() => {
    // fetchMessMember();

    let unmounted = false;

    if (!unmounted) {
      navigation.addListener('blur', () => {
        ClearData();
        ClearErrorMessage();
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

  const [username, setName] = useState('');
  const [Temail, setEmail] = useState('');

  const [password, setpassword] = useState('');
  const [secureText, setsecureText] = useState(true);

  const [confirmPassword, setconfirmPassword] = useState('');
  const [confirmSecureText, setconfirmSecureText] = useState(true);

  const [profile_pic_url] = useState('member image');
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
        ? ClearErrorMessage()
        : null;
    }
  }, [NameFill, ConfirmPassWordFill, PassWordFill, EmailFill]);

  const ClearData = () => {
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

  {
    filter = messMember.find(i => i.hostel_id === messMember[0].hostel_id);
  }

  const [hostel_id] = useState(filter.hostel_id);

  if (!checkNetConnetion) {
    return <NoNetConnection />;
  }

  if (messMember === undefined) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#2D8575" />
      </View>
    );
  }

  //All On Press Function Here
  const CreateMemberFunction = () => {
    CreateMessMember({
      username,
      Temail,
      password,
      confirmPassword,
      profile_pic_url,
      hostel_id,
    });
  };

  //Confirm Password Secure Text Entry Function
  const ConfirmPassSecureFunction = () => {
    setconfirmSecureText(!confirmSecureText);
  };

  //Password Secure Text Entry Funcion
  const PasswordSecureFunction = () => {
    setsecureText(!secureText);
  };

  return (
    <SafeAreaView style={styles.SafeAreaViewStyle}>
      {/*Start Header Area*/}
      <View>
        <Header navigation={navigation} title="Add Member" />
      </View>
      {/*End Header Area*/}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewStyle}>
        <View style={styles.ViewStyle}>
          {/*start body part*/}

          {/*start signUp  part*/}
          <View style={styles.mainContain}>
            <Image source={BackGroundImage} style={styles.ImageStyle} />
            <View style={styles.formWrap}>
              <TextInput
                style={
                  userEmpty || (NameFill !== '' ? !NameFill : null)
                    ? [styles.inputStyle, styles.ErrorBorderStyle]
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
                placeholderTextColor="#000" 
                placeholder="Name"
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
                    ? [styles.inputStyle, styles.ErrorBorderStyle]
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
                  passwordEmpty || (PassWordFill !== '' ? !PassWordFill : null)
                    ? [styles.PasswordInputStyle, styles.ErrorBorderStyle]
                    : styles.PasswordInputStyle
                }>
                <TextInput
                  style={styles.TextInputWidthStyle}
                  ref={input => {
                    secondTextInput = input;
                  }}
                  label="password"
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

                <View style={styles.ConFimView}>
                  {secureText ? (
                    <View>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={PasswordSecureFunction}>
                        <Icon name="icon_eye-close" size={18} color="#a4a4a4" />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={PasswordSecureFunction}>
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
                    ? [styles.PasswordInputStyle, styles.ErrorBorderStyle]
                    : styles.PasswordInputStyle
                }>
                <TextInput
                  style={styles.TextInputWidthStyle}
                  ref={input => {
                    thirdTextInput = input;
                  }}
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
                  placeholderTextColor="#000" 
                  placeholder="Confirm password"
                  secureTextEntry={confirmSecureText}
                  autoCorrect={false}
                  returnKeyType="done"
                />

                <View style={styles.ConFimView}>
                  {confirmSecureText ? (
                    <View>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={ConfirmPassSecureFunction}>
                        <Icon name="icon_eye-close" size={18} color="#a4a4a4" />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={ConfirmPassSecureFunction}>
                        <Icon name="icon_eye" size={15} color="#a4a4a4" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>

              {!errorMessage ? null : (
                <View style={styles.ErrorView}>
                  <Text style={styles.ErrorTextStyle}>{errorMessage}</Text>
                </View>
              )}

              {NameFill &&
              EmailFill &&
              PassWordFill &&
              ConfirmPassWordFill &&
              password == confirmPassword ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={CreateMemberFunction}
                  style={styles.signButton}>
                  {loading ? (
                    <ActivityIndicator size="small" color="#FFF" />
                  ) : (
                    <Text style={styles.btnTx}> Save </Text>
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  disabled={true}
                  style={styles.signDeActiveButton}>
                  <Text style={styles.DeActiveBtnTx}> Save </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          {/*End signUp part*/}

          {/*End Body Area*/}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContain: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#f0f4ff',
  },

  SafeAreaViewStyle: {
    flex: 1,
  },

  ScrollViewStyle: {
    flexGrow: 1,
  },

  ImageStyle: {
    resizeMode: 'contain',
    width: windowWidth * 0.5,
    height: windowWidth * 0.5,
  },

  ViewStyle: {
    flex: 1,
    paddingBottom: '2%',
  },

  ErrorBorderStyle: {
    borderColor: 'red',
  },

  ErrorView: {
    paddingTop: '4%',
    marginLeft: '4%',
    width: '100%',
  },

  ErrorTextStyle: {
    color: 'red',
  },

  ConFimView: {
    width: '15%',
    alignItems: 'center',
  },

  TextInputWidthStyle: {
    width: '85%',
    paddingVertical: 0,
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
});

export default CreateMemberScreen;
