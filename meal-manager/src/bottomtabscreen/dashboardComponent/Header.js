import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Icon } from "@up-shared/components";

const Header=({ title, navigation })=>{ 

	return(
		<View style={styles.header}>
			<View style={styles.titleWrap}>

				<TouchableOpacity activeOpacity={ 0.5 }
					onPress={()=>{navigation.openDrawer()}} >
						<View>
							<Icon
								name="icon_menu" 
								size={18}
								color="#212121"
							/>
 			 			</View>
				</TouchableOpacity>

				<Text style={styles.title}>{title}</Text>

				<Text/>

			</View>
		</View>
	);

}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#f0f4ff',
        paddingVertical: '3.5%',
				shadowOpacity: 0,
				alignItems: 'center',
    },
    titleWrap: {
        width: '95%',
				alignItems: 'center',
				justifyContent: 'space-between',
				flexDirection: 'row',
    },
    title: {
        color: '#242d48',
        fontSize: 20,
    },
})

export default Header;
