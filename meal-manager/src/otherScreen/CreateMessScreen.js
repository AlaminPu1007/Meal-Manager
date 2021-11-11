import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput,ActivityIndicator, Text, StyleSheet, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
import {SafeAreaView } from 'react-native-safe-area-context';
import {Context as MessContext} from '../context/MessContext';
import BackHeader from '../component/BackHeader';
import NetInfo from '@react-native-community/netinfo';
import NoNetConnection from './NoNetConnection';

console.disableYellowBox = true;

var filter = 0;

const CreateMessScreen=({ navigation, route })=>{
 
  const { ID } = route.params; 

	const { state, state:{ loading, bazarCreateSuccess, mess, messEmpty, messCreateProblem }, 
    CreateMess, EditMess, clearMessError, fetchMess  } = useContext(MessContext);

    const [ checkNetConnetion, setCheckNetConnetion ] = useState(true);
    const [ MessNameFill, setMessNameFill ]=useState('');

useEffect(()=>{

  { bazarCreateSuccess === 'Mess Edited successfully' ? 
    ( fetchMess(), ToastAndroid.show( bazarCreateSuccess, ToastAndroid.SHORT), navigation.goBack() ) : 
    null 
  }

  {
    MessNameFill === false ? ( clearMessError() ) :  null
  }

},[ bazarCreateSuccess, MessNameFill ]);


	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
  const [ id, setId ] = useState('');

  useEffect(()=>{

    let unmounted = false;

		if(!unmounted){
  
      navigation.addListener('blur' ,()=>{
        ClearInput();
        clearMessError();
      });
  
      NetInfo.addEventListener(state => {
        {!unmounted ? setCheckNetConnetion(	state.isConnected ) : null};
        state.isConnected === true ? 
        (
          clearMessError()
        )
         : null
      });

		}

		return ()=>{
			unmounted = true;
		}

  },[checkNetConnetion]);

  {
    mess ? filter = mess.find(i=>i.id === mess[0].id): null
  }

{
  ID === 2?
  (
    useEffect(()=>{
      { filter ?  setName(filter.name) : null };
      { filter ?  setDescription(filter.description) : null };
      { filter ?  setId(filter.id) : null };
      { filter ?  setMessNameFill(filter.name) : setMessNameFill('') };
    },[filter])
  ): null
}

const ClearInput=()=>{
  setName(''),
  setDescription('')
};

if(!checkNetConnetion){
  return <NoNetConnection/> ;
}

	return (
    <SafeAreaView style={{flex: 1}}>
      {/*Start Header Area*/}
      <View>
        <BackHeader
          navigation={navigation}
          title={ID === 2 ? 'Edit Mess' : ' Create Mess '}
        />
      </View>
      {/*End Header Area*/}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1, backgroundColor: '#f0f4ff'}}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center',
              paddingVertical: '5%',
            }}>
            <View style={styles.modelView}>
              <View style={{width: '90%'}}>
                <View style={{paddingVertical: '5%'}}>
                  <View>
                    <TextInput
                      style={
                        messEmpty ||
                        (MessNameFill !== '' ? !MessNameFill : null)
                          ? [styles.textInputStyle, {borderColor: 'red'}]
                          : styles.textInputStyle
                      }
                      placeholder="Mess Name*"
                      placeholderTextColor="#adadad"
                      multiline={true}
                      autoFocus={true}
                      value={name}
                      onChangeText={text => {
                        if (text.length == 0) {
                          setMessNameFill(false);
                        } else {
                          setMessNameFill(true);
                        }
                        setName(text);
                      }}
                    />
                  </View>
                  <View>
                    {messEmpty ? (
                      <Text style={{color: 'red'}}>{messEmpty}</Text>
                    ) : null}
                  </View>
                </View>

                <View style={{paddingVertical: 5}}>
                  <View>
                    <TextInput
                      style={[
                        styles.textInputStyle,
                        {height: 100, textAlignVertical: 'top'},
                      ]}
                      placeholder="Description Optional*"
                      placeholderTextColor="#adadad"
                      multiline={true}
                      autoCorrect={false}
                      value={description}
                      onChangeText={text => {
                        setDescription(text);
                      }}
                    />
                  </View>
                  <View style={{paddingTop: '2%'}}>
                    {messCreateProblem ? (
                      <Text style={{color: 'red'}}>{messCreateProblem}</Text>
                    ) : null}
                  </View>
                </View>

                {MessNameFill ? (
                  ID === 2 ? (
                    <View style={styles.initialButtonView}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          EditMess({id, name, description});
                        }}>
                        <View style={styles.ButtonView}>
                          {loading ? (
                            <ActivityIndicator size="small" color="#FFF" />
                          ) : (
                            <Text style={styles.buttonText}> Edit </Text>
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={styles.initialButtonView}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          CreateMess({name, description});
                        }}>
                        <View style={styles.ButtonView}>
                          {loading ? (
                            <ActivityIndicator size="small" color="#FFF" />
                          ) : (
                            <Text style={styles.buttonText}> Create </Text>
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>
                  )
                ) : ID === 2 ? (
                  <View style={styles.initialButtonView}>
                    <TouchableOpacity disabled={true}>
                      <View style={styles.DisableButtonView}>
                        <Text style={styles.buttonText}> Edit </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.initialButtonView}>
                    <TouchableOpacity disabled={true}>
                      <View style={styles.DisableButtonView}>
                        <Text style={styles.buttonText}> Create </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

	modelView:{
    backgroundColor: '#fff',
    width: '90%',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: '8%',
    elevation: 10,
  },

  textInputStyle:{
  	borderColor:'#dbdbdb',
  	borderWidth:1,
  	height:40,
  	borderRadius:5,
  	paddingHorizontal:'2%',
  	paddingVertical: 0,
  },

  initialButtonView:{
  	paddingTop: '5%',
  	alignItems: 'center',
  },

  ButtonView:{
  	paddingHorizontal: '12%',
  	paddingVertical: '3%',
  	backgroundColor: '#5842f4', 
  	borderRadius: 8,
  },

  DisableButtonView:{
  	paddingHorizontal: '12%',
  	paddingVertical: '3%',
  	backgroundColor: '#d6d2f4', 
  	borderRadius: 8,
  },

  buttonText:{ 
  	fontSize: 15,
  	color: '#fff',
 	},

});

export default CreateMessScreen;