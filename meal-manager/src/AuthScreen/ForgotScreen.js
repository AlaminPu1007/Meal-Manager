import React, {useEffect, useContext, useState} from 'react';
import {
  Image,
  Dimensions,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Context as AuthContext} from '../context/AuthContext';
import NetInfo from '@react-native-community/netinfo';
import Header from './Header';

const windowWidth = Dimensions.get('window').width;
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

console.disableYellowBox = true;

const ForgotScreen = ({navigation}) => {
  const {
    state: {verificationErrorOccur, emailEmpty, loading},
    ForgotPassword,
    ClearErrorMessage,
    LoginNetWrokErrorsolve,
  } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [checkNetConnetion, setCheckNetConnetion] = useState(true);
  //// Text Input Fill to button Active
  const [EmailFill, setEmailFill] = useState('');

  useEffect(() => {
    {
      EmailFill == false
        ? (ClearErrorMessage(), LoginNetWrokErrorsolve())
        : null;
    }
  }, [EmailFill]);

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      navigation.addListener('blur', () => {
        ClearErrorMessage();
        LoginNetWrokErrorsolve();
        setEmail('');
        setEmailFill('');
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

  ///All On Press Function Here

  const ForgetFunction = () => {
    ForgotPassword(email);
  };

  return (
    <SafeAreaView style={styles.flexStyle}>
      {/* Header Part */}
      <Header title="Forgot Password" />
      {/* Header Part */}
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

            {/* Main Body Part */}

            <View style={styles.mainBody}>
              <View style={styles.profileWrap}>
                <Image
                  source={require('../drawerscreen/images/profile_bg.png')}
                  style={styles.ImageStyle}
                />
              </View>
              <Text style={styles.forgotTex}>
                Enter the verification code we just send you on your email
                address.
              </Text>
              <View style={styles.formWrap}>
                <TextInput
                  style={
                    emailEmpty || (EmailFill !== '' ? !EmailFill : null)
                      ? [styles.inputStyle, styles.ErrorColor]
                      : styles.inputStyle
                  }
                  value={email}
                  onChangeText={text => {
                    if (text.length == 0) {
                      setEmailFill(false);
                    } else {
                      setEmailFill(true);
                    }
                    setEmail(text);
                  }}
                  placeholder="E-mail"
                  placeholderTextColor="#000"
                  autoCorrect={false}
                  autoFocus={true}
                  keyboardType="email-address"
                />

                {verificationErrorOccur ? (
                  <View style={styles.ErrorMessageViewStyle}>
                    <Text style={styles.ErrorMessageTextStyle}>
                      {verificationErrorOccur}{' '}
                    </Text>
                  </View>
                ) : null}

                {EmailFill ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={ForgetFunction}
                    style={styles.signButton}>
                    {loading ? (
                      <ActivityIndicator size="small" color="#FFF" />
                    ) : (
                      <Text style={styles.btnTx}> Send </Text>
                    )}
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    disabled={true}
                    style={styles.signDeActiveButton}>
                    <Text style={styles.DeActiveBtnTx}> Send </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {/* Main Body Part */}
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

  ErrorColor: {
    borderColor: 'red',
  },

  ErrorMessageViewStyle: {
    width: '95%',
    paddingTop: '3%',
    marginLeft: '1%',
  },

  ErrorMessageTextStyle: {
    color: 'red',
  },

  bodyView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  mainBody: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#fff',
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
    paddingLeft: 0,
    alignItems: 'center',
    width: '80%',
    maxWidth: 500,
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
    borderColor: '#e8eaff',
    borderWidth: 1,
  },
  signButton: {
    color: '#ffffff',
    marginTop: 40,
    height: 56,
    backgroundColor: '#5842f4',
    borderRadius: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTx: {
    color: '#ffffff',
    fontSize: 18,
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
});
export default ForgotScreen;
