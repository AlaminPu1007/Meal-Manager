import React, { useState, useContext, useEffect } from 'react';
import { View, Text} from 'react-native';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import { Context as MessContext } from '../context/MessContext';
import { Icon } from "@up-shared/components";

let notifiL = [];

const HomeIconWithBadge=( props ) =>{

  const { state: { notificationList, } } = useContext(MessContext);

  const [ copy, setCopy ]= useState('');

  { 
    notificationList ? 
    (
      notifiL = notificationList.filter(i=>i.is_seen === 0)
    )
    : null
  }

useEffect(()=>{
  {
    notifiL ? setCopy(notifiL.length)  : setCopy(0)
  }
},[ notifiL, notificationList ]);

  const IconWithBadge=({ name, badgeCount, color, size })=> {

  return (
    <View style={{ width: 24, height: 24, margin: 5 }}>
      <Icon name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
           position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 30,
            width: 18,
            height: 18,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 11, fontWeight: 'bold' }}>
           {copy}
          </Text>
        </View>
      )}
    </View>
  );
}
 
   return <IconWithBadge {...props}  badgeCount={ copy } />;
}

export default HomeIconWithBadge;