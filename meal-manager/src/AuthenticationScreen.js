import React, {useContext, useEffect, useState} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {navigationRef} from './RootNavigation';
import NetInfo from '@react-native-community/netinfo';

/// Custome icon
import {Icon} from '@up-shared/components';
///navigation staff

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {Context as AuthContext} from './context/AuthContext';
import {Context as MessContext} from './context/MessContext';

// AuthenticationScreen staff
import SignInScreen from './AuthScreen/SignInScreen';
import SignUpScreen from './AuthScreen/SignUpScreen';
import ForgotScreen from './AuthScreen/ForgotScreen';
import Verification from './AuthScreen/Verification';

//Drawer Staff
import {DrawerContent} from './drawerscreen/DrawerContent';

//BottomTab Staff
import DashboardScreen from './bottomtabscreen/DashboardScreen';
import NotificationScreen from './bottomtabscreen/NotificationScreen';
import ProfileScreen from './bottomtabscreen/ProfileScreen';

///InfoStack screen
import CreateMessScreen from './otherScreen/CreateMessScreen';
import MessDetailsScreen from './bottomtabscreen/dashboardComponent/MessDetailsScreen';
import CreateMemberScreen from './bottomtabscreen/dashboardComponent/CreateMemberScreen';
import DepositedMoney from './bottomtabscreen/dashboardComponent/DepositedMoney';
import CreateMoney from './bottomtabscreen/dashboardComponent/depositMoneyComponent/CreateMoney';

/// previous month screen
import PreviousMonth from './bottomtabscreen/dashboardComponent/PreviousMonth';

///verification member email
import MemberVerification from './bottomtabscreen/dashboardComponent/CreateMemberComponent/MemberVerification';

import BazarListScreen from './bottomtabscreen/dashboardComponent/BazarListScreen';
import CreateBazar from './bottomtabscreen/dashboardComponent/BazarListComponent/CreateBazar';

import MemberProfileScreen from './bottomtabscreen/dashboardComponent/MemberProfileScreen';
// import UserProfileScreen from './bottomtabscreen/dashboardComponent/memberprofilecomponent/UserProfileScreen';

import DailyMealScreen from './bottomtabscreen/dashboardComponent/DailyMealScreen';
//// MessDetailsComponent
import UserMessInformation from './bottomtabscreen/dashboardComponent/MessDetailsComponent/UserMessInformation';

import PreviousInfo from './bottomtabscreen/dashboardComponent/PreviousMonthComponent/PreviousInfo';
import History from './bottomtabscreen/dashboardComponent/History';

import Setting from './bottomtabscreen/dashboardComponent/Setting';
///Other Costs Component
import OtherCosts from './bottomtabscreen/dashboardComponent/OtherCosts';
import CreateOtherCosts from './bottomtabscreen/dashboardComponent/OtherCostsComponent/CreateOtherCosts';

import HistoryMessDetails from './bottomtabscreen/dashboardComponent/HistoryComponent/HistoryMessDetails';
/// previous month create all page
import PDepositedCreate from './bottomtabscreen/dashboardComponent/PreviousMonthComponent/PreviousCreate/PDepositedCreate';
import PBazarCreate from './bottomtabscreen/dashboardComponent/PreviousMonthComponent/PreviousCreate/PBazarCreate';
import PExtraCosts from './bottomtabscreen/dashboardComponent/PreviousMonthComponent/PreviousCreate/PExtraCosts';
import AddPreviousOtherCost from './bottomtabscreen/dashboardComponent/PreviousMonthComponent/PreviousCreate/PExtraCostComponent/AddPreviousOtherCost';
import PMealCreate from './bottomtabscreen/dashboardComponent/PreviousMonthComponent/PreviousCreate/PMealCreate';
////
import PCreateBazar from './bottomtabscreen/dashboardComponent/PreviousMonthComponent/PreviousCreate/PBazarComponent/PCreateBazar';
///
import CreateMealModal from './bottomtabscreen/dashboardComponent/PreviousMonthComponent/PreviousCreate/PMealComponent/CreateMealModal';

//
import HomeIconWithBadge from './component/HomeIconWithBadge';

const AuthStack = createStackNavigator();
const InfoStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const InfoStackScreen = () => {
  return (
    <SafeAreaProvider>
      <InfoStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        // initialRouteName="Member Verification"
      >
        <InfoStack.Screen name="Dashboard" component={DashboardScreen} />
        <InfoStack.Screen name="CreateMess" component={CreateMessScreen} />
        <InfoStack.Screen name="MessDetails" component={MessDetailsScreen} />
        <InfoStack.Screen name="Previous Month" component={PreviousMonth} />
        <InfoStack.Screen
          name="CreateMember"
          component={CreateMemberScreen}
        />
        <InfoStack.Screen name="Deposited Money" component={DepositedMoney} />
        <InfoStack.Screen name="Create Money" component={CreateMoney} />
        <InfoStack.Screen name="BazarList" component={BazarListScreen} />
        <InfoStack.Screen name="Create Bazar" component={CreateBazar} />

        <InfoStack.Screen name="DailyMeal" component={DailyMealScreen} />

        <InfoStack.Screen
          name="Member Profile"
          component={MemberProfileScreen}
        />
        {/* <InfoStack.Screen name="User Profile" component={UserProfileScreen} /> */}

        <InfoStack.Screen
          name="UserMess Info"
          component={UserMessInformation}
        />
        <InfoStack.Screen name="Previous Info" component={PreviousInfo} />

        <InfoStack.Screen name="History" component={History} />
        <InfoStack.Screen
          name="History Mess"
          component={HistoryMessDetails}
        />

        <InfoStack.Screen name="PMeal Create" component={PMealCreate} />
        <InfoStack.Screen name="PCreate Bazar" component={PCreateBazar} />

        <InfoStack.Screen
          name="CreateMeal Modal"
          component={CreateMealModal}
        />

        <InfoStack.Screen
          name="PDeposited Create"
          component={PDepositedCreate}
        />
        <InfoStack.Screen name="PBazar Create" component={PBazarCreate} />
        <InfoStack.Screen name="PExtra Costs" component={PExtraCosts} />
        <InfoStack.Screen
          name="PExtra Costs Add"
          component={AddPreviousOtherCost}
        />

        <InfoStack.Screen
          name="Member Verification"
          component={MemberVerification}
        />

        <InfoStack.Screen name="Setting" component={Setting} />

        <InfoStack.Screen name="Other Costs" component={OtherCosts} />
        <InfoStack.Screen
          name="Create OtherCosts"
          component={CreateOtherCosts}
        />
      </InfoStack.Navigator>
    </SafeAreaProvider>
  );
};
/// Profile Component
import EditProfileScreen from './bottomtabscreen/ProfileComponent/EditProfileScreen';

const ProfileStackScreen = () => {
  return (
    <SafeAreaProvider>
      <ProfileStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        // initialRouteName="Edit Profile"
      >
        <ProfileStack.Screen name="Profile" component={ProfileScreen} />
        <ProfileStack.Screen
          name="Edit Profile"
          component={EditProfileScreen}
        />
      </ProfileStack.Navigator>
    </SafeAreaProvider>
  );
};

console.disableYellowBox = true;

const MyTabs = () => {
  const [checkNetConnetion, setCheckNetConnetion] = useState(true);

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      NetInfo.addEventListener(state => {
        {
          !unmounted ? setCheckNetConnetion(state.isConnected) : null;
        }
      });
    }

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <SafeAreaProvider>
      <Tab.Navigator
        lazy={false}
        // initialRouteName="Notification"
        tabBarOptions={{
          activeTintColor: '#5842f4',
          inactiveTintColor: '#bac5e9',
          style: {zIndex: 1},
          labelPosition: 'below-icon',
          keyboardHidesTabBar: true,
          showLabel: false,
          style: {
            backgroundColor: checkNetConnetion ? '#FFF' : '#182238',
          },
        }}>
        <Tab.Screen
          name="Home"
          component={InfoStackScreen}
          options={{
            // tabBarVisible : checkNetConnetion ? true : false ,
            tabBarIcon: ({color, size}) => (
              <Icon name="icon_home" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            // tabBarVisible : checkNetConnetion ? true : false ,
            tabBarIcon: ({focused, color, size}) => {
              return (
                <HomeIconWithBadge
                  name="icon_notification-stock"
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileStackScreen}
          options={{
            // tabBarVisible : checkNetConnetion ? true : false ,
            tabBarIcon: ({color, size}) => (
              <Icon name="icon_profile" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

//drawerContent={props=><DrawerContent {...props} />}

const MyDrawer = () => {
  const {fetchMess, fetchMessMember} = useContext(MessContext);
  const {AutomaticSignin} = useContext(AuthContext);
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsInitialRender(false), 1100);
    AutomaticSignin();
    fetchMess();
    fetchMessMember();
  }, []);

  return (
    <SafeAreaProvider>
      <Drawer.Navigator //drawerType = 'back' //remove for flash open screen
        // overlayColor="#ddd" //left portion color
        drawerStyle={{width: isInitialRender ? 0 : '70%'}}
        drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={MyTabs} />
      </Drawer.Navigator>
    </SafeAreaProvider>
  );
};

const AuthenticationScreen = () => {
  const {
    state: {token},
    AutomaticSignin,
  } = useContext(AuthContext);
  // const { fetchMess } = useContext(MessContext);

  useEffect(() => {
    AutomaticSignin();
    // fetchMess();
  }, []);

  return (
    <SafeAreaProvider>
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        //  initialRouteName="Verification"
      >
        <AuthStack.Screen name="SignIn" component={SignInScreen} />
        <AuthStack.Screen name="SignUp" component={SignUpScreen} />
        <AuthStack.Screen name="Forgot" component={ForgotScreen} />
        <AuthStack.Screen name="Verification" component={Verification} />
      </AuthStack.Navigator>
    </SafeAreaProvider>
  );
};

export default ({navigation}) => {
  const {
    state: {token},
    AutomaticSignin,
  } = useContext(AuthContext);
  const {fetchMess, AppVersionCheck} = useContext(MessContext);

  useEffect(() => {
    AutomaticSignin();
    fetchMess();
    AppVersionCheck();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      {token ? <MyDrawer /> : <AuthenticationScreen />}
    </NavigationContainer>
  );
};
