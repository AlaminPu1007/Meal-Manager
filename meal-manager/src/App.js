import React,{ useEffect } from 'react';
import AuthenticationScreen from './AuthenticationScreen';
import {Provider as AuthProvider} from './context/AuthContext';
import {Provider as MessProvider} from './context/MessContext';
import {Provider as PreviousMonthProvider} from './context/PreviousMonthContext';
///
import SplashScreen from 'react-native-splash-screen';

const App =()=>{

	useEffect(()=>{
		SplashScreen.hide();
  },[]);
  
		return(
      <PreviousMonthProvider>
      <MessProvider>
      <AuthProvider>
        <AuthenticationScreen/>
      </AuthProvider>
      </MessProvider>
      </PreviousMonthProvider>
		);
}

export default App; 