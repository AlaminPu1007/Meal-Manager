import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Header=({title })=>{

	return(
	<View style={styles.header}>
      <View style={styles.titleWrap}>
          <Text style={styles.title}>{title}</Text>
      </View>
    </View>
	); 

}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#f0f4ff',
        height: 50,
        shadowOpacity: 0,
        width: '100%',
    },
    titleWrap: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#242d48',
        fontSize: 20,
    }
})

export default Header;
