import React, {useState, useContext, useEffect, useRef} from 'react';
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
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import {Context as MessContext} from '../../context/MessContext';
import {Context as AuthContext} from '../../context/AuthContext';
import BackHeader from '../../component/BackHeader';
import NoNetConnection from '../../otherScreen/NoNetConnection';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useIsFocused} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImageZoom from 'react-native-image-pan-zoom';
import Menu, {MenuItem} from 'react-native-material-menu';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const OsVer = Platform.constants['Release'];

// console.log(parseInt(OsVer));
// console.log(parseInt(OsVer) >= 6);

const EditProfileScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  /// material menu
  const menu = useRef();
  const hideMenu = () => menu.current.hide();
  const showMenu = () => menu.current.show();

  const {
    state: {
      bazarCreateSuccess,
      loading,
      messMember,
      UserID,
      userprofile,
      profileImage,
      userEmpty,
      errorMessage,
      imageLoading,
      EditMemberLoading,
      ImageErrorMessage,
    },
    fetchMemberProfile,
    ClearErrorMessage,
    UploadImage,
    EditMessMember,
    FetchImage,
  } = useContext(MessContext);
  ///Auth Context
  const {
    state: {token},
  } = useContext(AuthContext);

  useEffect(() => {
    {
      isFocused
        ? bazarCreateSuccess == 'image updated successfully'
          ? (ToastAndroid.show(bazarCreateSuccess, ToastAndroid.SHORT),
            FetchImage())
          : null
        : null;
    }

    {
      isFocused
        ? bazarCreateSuccess == 'Edited Successfully'
          ? (ToastAndroid.show(bazarCreateSuccess, ToastAndroid.SHORT),
            UserID ? fetchMemberProfile(UserID) : null)
          : null
        : null;
    }
  }, [bazarCreateSuccess]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      {
        UserID ? fetchMemberProfile(UserID) : null;
      }
    });
  }, [UserID]);

  const [checkNetConnetion, setCheckNetConnetion] = useState(true);
  ///User TextInput Info
  ///username, email, profile_pic_url
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [profile_pic_url] = useState('member image');
  const [ImageUrl, setImageUrl] = useState('');
  const [id, setId] = useState('');
  ///TextInput Fill
  const [UserNameFill, setUserNameFill] = useState('');
  const [OpenModal, setOpenModal] = useState(false);

  const UserInfo = UserID ? userprofile.find(i => i.id == UserID) : null;

  useEffect(() => {
    {
      UserInfo
        ? (setUserName(UserInfo.username), setUserNameFill(true))
        : setUserName('');
    }
    {
      UserInfo ? setEmail(UserInfo.email) : setEmail('');
    }
    {
      UserInfo ? setId(UserInfo.id) : setId('');
    }
  }, [UserInfo]);

  // console.log(profileImage);

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      navigation.addListener('blur', () => {
        ClearTextInput();
        ClearErrorMessage();
      });

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
  }, [checkNetConnetion]);

  const ClearTextInput = () => {
    setUserNameFill('');
  };

  if (!checkNetConnetion) {
    return <NoNetConnection />;
  }

  /* Open Mobile Image Library */
  const OpenLibrary = async () => {
    /// options
    const options = {
      title: 'Select Avatar',
      customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      cameraType: 'front',
      selectionLimit: 1,
      maxWidth: 1100,
      maxHeight: 1100,
      quality: 1,
      includeBase64: true,
    };
    /// options

    try {
      launchImageLibrary(options, response => {
        if (response.didCancel) {
          // console.log('User cancelled image picker');
        } else if (response.error) {
          // console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          // console.log('User tapped custom button: ', response.customButton);
        } else {
          setImageUrl(response);
          //  console.log(response,'outside\n');

          /// get image type
          var parts = response.assets[0].fileName.split('.');
          //get the last part
          var extension = parts[parts.length - 1];

          if (
            extension == 'png' ||
            extension == 'PNG' ||
            extension == 'jpg' ||
            extension == 'jpeg' ||
            extension == 'JPEG' ||
            extension == 'JPG'
          ) {
            if (response.assets[0].fileSize <= 1000000) {
              UploadImage({response: response.assets[0], token});
            } else {
              alert('maximum size is 1 mb');
            }
          } else {
            alert('This format is not supported');
          }
        }
      });
    } catch (err) {
      // console.log(err.message,'galery image\n');
    }
  };
  /* Open Mobile Image Library */

  /* Open Mobile Camera */
  const OpenCamera = async () => {
    /// options
    const options = {
      title: 'Select Avatar',
      customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      cameraType: 'front',
      selectionLimit: 1,
      maxWidth: 1100,
      maxHeight: 1100,
      quality: 1,
      includeBase64: true,
      saveToPhotos: true,
    };

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      // console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('Camera permission given');
        launchCamera(options, response => {
          if (response.didCancel) {
            // console.log('User cancelled image picker');
          } else if (response.error) {
            // console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            // console.log('User tapped custom button: ', response.customButton);
          } else {
            // console.log(response, 'camera');
            setImageUrl(response);
            // console.log(response, 'outside\n');

            /// get image type
            var parts = response.assets[0].fileName ? response.assets[0].fileName.split('.') : null;
            //get the last part
            var extension = parts ? parts[parts.length - 1] : null;

            if (
              extension == 'png' ||
              extension == 'PNG' ||
              extension == 'jpg' ||
              extension == 'jpeg' ||
              extension == 'JPEG' ||
              extension == 'JPG'
            ) {
              if (response.assets[0].fileSize <= 1000000) {
                UploadImage({response: response.assets[0], token});
              } else {
                alert('maximum size is 1 mb');
              }
            } else {
              alert('This format is not supported');
            }
          }
        });
      } else {
        // console.log('Camera permission denied');
        alert('Camera permission denied');
      }
    } catch (err) {
      // console.log(err.message);
    }
  };
  /* Open Mobile Camera */

  ////All On Press Function
  const OnPressUpload = async () => {
    EditMessMember({username, email, profile_pic_url, id});
  };

  ///Modal Function
  const ModalFunction = () => {
    setOpenModal(!OpenModal);
  };

  return (
    <SafeAreaView style={styles.flexStyle}>
      <TouchableOpacity style={styles.flexStyle} activeOpacity={1}>
        {/*Start Header Area*/}
        <View>
          <BackHeader navigation={navigation} title="Edit Profile" />
        </View>
        {/*End Header Area*/}
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ScrollViewStyle}>
          <View style={styles.BodyFlexStyle}>
            {/* Body Area */}
            <View style={styles.MainBodyView}>
              {/* Image View Style */}
              <View style={styles.ImageView}>
                {/* Start Image Area */}

                <View style={styles.profileTop}>
                  <View style={styles.profileArea}>
                    <View>
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={ModalFunction}>
                        {imageLoading ? (
                          <ActivityIndicator
                            size="large"
                            color="#5842f4"
                            style={styles.ImageStyle}
                          />
                        ) : profileImage ? (
                          profileImage.length ? (
                            <Image
                              source={{uri: profileImage}}
                              style={styles.ImageStyle}
                            />
                          ) : (
                            <Image
                              source={require('../../drawerscreen/images/profile_bg.png')}
                              style={styles.ImageStyle}
                            />
                          )
                        ) : (
                          <Image
                            source={require('../../drawerscreen/images/profile_bg.png')}
                            style={styles.ImageStyle}
                          />
                        )}
                      </TouchableOpacity>
                    </View>

                    {/* Edit Profile Icon View */}
                    <View style={styles.EditIconView}>
                      <View>
                        <Menu
                          ref={menu}
                          button={
                            <TouchableOpacity
                              activeOpacity={1}
                              onPress={showMenu}>
                              <View>
                                <Feather
                                  name="camera"
                                  size={25}
                                  // color="#f3f6ff"
                                  color="#ddd"
                                />
                              </View>
                            </TouchableOpacity>
                          }>
                          {/* {parseInt(OsVer) >= 6 ? ( */}
                          <MenuItem
                            onPress={() => {
                              hideMenu(), OpenCamera();
                            }}>
                            Take photo
                          </MenuItem>
                          {/* ) : null} */}

                          <MenuItem
                            onPress={() => {
                              hideMenu(), OpenLibrary();
                            }}>
                            Choose from Library
                          </MenuItem>
                        </Menu>
                      </View>
                      {/* Show menu */}
                    </View>
                    {/* Edit Profile Icon View */}
                  </View>
                </View>

                {ImageErrorMessage ? (
                  <View style={styles.ErrorViewStyle}>
                    <Text style={styles.ErrorViewTextStyle}>
                      {' '}
                      {ImageErrorMessage}{' '}
                    </Text>
                  </View>
                ) : null}

                {/* Text Input Area */}
                <View style={styles.TextInputInitialView}>
                  <View style={styles.FirstTextInputView}>
                    <TextInput
                      style={
                        userEmpty ||
                        (UserNameFill !== '' ? !UserNameFill : null)
                          ? [styles.TextInputStyle, styles.ErrorStyle]
                          : styles.TextInputStyle
                      }
                      placeholder="Name"
                      placeholderTextColor="#212121"
                      value={username}
                      autoCorrect={false}
                      onChangeText={text => {
                        if (text.length == 0) {
                          setUserNameFill(false);
                        } else {
                          setUserNameFill(true);
                        }
                        setUserName(text);
                      }}
                    />
                  </View>

                  <View style={styles.FirstTextInputView}>
                    <TextInput
                      style={styles.TextInputStyle}
                      placeholder="E-Mail"
                      placeholderTextColor="#212121"
                      value={email}
                      autoCorrect={false}
                      editable={false}
                    />
                  </View>

                  {errorMessage ? (
                    <View style={styles.ErrorViewStyle}>
                      <Text style={styles.ErrorViewTextStyle}>
                        {' '}
                        {errorMessage}{' '}
                      </Text>
                    </View>
                  ) : null}

                  {/* Button View */}
                  <View style={styles.InitialButtonView}>
                    {UserNameFill ? (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.saveBtn}
                        onPress={OnPressUpload}>
                        {EditMemberLoading ? (
                          <ActivityIndicator size="small" color="#FFF" />
                        ) : (
                          <Text style={styles.saveTx}> Update </Text>
                        )}
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.saveBtn, styles.DisableButtonColor]}>
                        <Text style={[styles.saveTx, styles.DisableTextColor]}>
                          Update
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  {/* Button View */}
                </View>
                {/* Text Input Area */}

                {/* Start Image Area */}
              </View>
              {/* Image View Style */}
            </View>
            {/* Body Area */}

            {/*Start Delete Modal Area*/}
            <View style={styles.flexStyle}>
              <Modal
                animationType="slide"
                transparent={false}
                visible={OpenModal}>
                <TouchableOpacity
                  style={styles.ModalViewStyle}
                  onPress={ModalFunction}>
                  <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.ModalScrollViewStyle}
                    showsVerticalScrollIndicator={false}>
                    <TouchableWithoutFeedback>
                      <View style={styles.modelView}>
                        <View style={styles.CancelIconStyle}>
                          <MaterialIcons
                            name="cancel"
                            size={25}
                            color="#FF6666"
                            onPress={ModalFunction}
                          />
                        </View>
                        <View style={styles.ModalImageView}>
                          <ImageZoom
                            cropWidth={windowWidth * 0.9}
                            cropHeight={windowHeight * 0.7}
                            imageWidth={windowWidth * 0.9}
                            imageHeight={windowHeight * 0.6}>
                            {profileImage ? (
                              profileImage.length ? (
                                <Image
                                  source={{uri: profileImage}}
                                  style={styles.ModalImageStyle}
                                />
                              ) : (
                                <Image
                                  source={require('../../drawerscreen/images/profile_bg.png')}
                                  style={styles.ModalImageStyle}
                                />
                              )
                            ) : (
                              <Image
                                source={require('../../drawerscreen/images/profile_bg.png')}
                                style={styles.ModalImageStyle}
                              />
                            )}
                          </ImageZoom>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </ScrollView>
                </TouchableOpacity>
              </Modal>
            </View>
            {/* End Modal View */}
          </View>
        </ScrollView>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexStyle: {
    flex: 1,
  },

  ScrollViewStyle: {
    flexGrow: 1,
  },

  BodyFlexStyle: {
    flex: 1,
    backgroundColor: '#f0f4ff',
    paddingBottom: '2%',
  },

  MainBodyView: {
    flex: 1,
  },

  ImageView: {
    flex: 1,
    // backgroundColor: '#5842f4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileTop: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileArea: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  ImageStyle: {
    resizeMode: 'cover',
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
    borderRadius: 1000,
  },

  ModalImageStyle: {
    resizeMode: 'cover',
    width: windowWidth * 0.9,
    height: windowHeight * 0.6,
    borderWidth: 1,
  },

  ModalImageView: {
    flex: 1,
  },

  TextInputInitialView: {
    // borderWidth: 1,
    width: '100%',
    alignItems: 'center',
  },

  FirstTextInputView: {
    width: '80%',
    paddingTop: '2%',
  },

  TextInputStyle: {
    borderWidth: 1,
    paddingVertical: 0,
    height: 50,
    backgroundColor: '#e8eaff',
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: '#e8eaff',
    paddingLeft: 20,
  },

  ErrorStyle: {
    borderColor: 'red',
  },

  InitialButtonView: {
    width: '100%',
    alignItems: 'center',
    marginTop: '5%',
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
    padding: '3%',
    borderRadius: 20,
    alignItems: 'center',
  },

  DisableButtonColor: {
    backgroundColor: '#d6d2f4',
  },

  DisableTextColor: {
    color: '#999',
  },

  saveTx: {
    fontSize: RFPercentage(2.5),
    color: 'white',
  },

  EditIconView: {
    width: windowWidth * 0.3,
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 12,
    left: 8,
  },

  ///Modal Style

  modelView: {
    width: '100%',
    alignItems: 'center',
    marginVertical: '2%',
  },

  CancelIconStyle: {
    alignItems: 'flex-end',
    width: '100%',
  },

  ModalViewStyle: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: '#f3f6ff',
  },

  ModalScrollViewStyle: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default EditProfileScreen;
