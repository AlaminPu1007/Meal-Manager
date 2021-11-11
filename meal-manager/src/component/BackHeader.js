import React, { Compoent } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {SafeAreaView } from 'react-native-safe-area-context';
import  AntDesign  from 'react-native-vector-icons/AntDesign';
import { Icon } from "@up-shared/components";

const BackHeader=({navigation, title, id })=>{

	return(
		<View>
			<View style={styles.initialHeaderView}>
			 <View style={styles.headerView}>
			 	<View>
			 		<TouchableOpacity activeOpacity={ 0.5 }
			 			onPress={()=>{ navigation.goBack() }} >
			 			<View>
						 <Icon
								name="icon_back" 
								size={18}
								color="#212121"
							/>
			 				
			 			</View>
			 		</TouchableOpacity>
			 	</View>

			 	<View style={styles.titleView}>
			 		<Text style={styles.titleViewText}> {title} </Text>
			 	</View>

			 	<View>
			 	
			 	</View>

			 </View>
		 </View>
		</View>
	);

}

const styles = StyleSheet.create({

	initialHeaderView:{
		alignItems: 'center', 
		backgroundColor: '#f0f4ff',
	},

	headerView:{
		width: '95%',
		flexDirection: 'row',
		paddingVertical: '4%',
		justifyContent: 'space-between',
	},

	titleView:{
		alignItems: 'center',
	},

	titleViewText:{
		fontSize: 18,
		color: '#242d48',
	},

});

export default BackHeader;