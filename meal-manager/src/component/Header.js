import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from "@up-shared/components";

const Header=({ navigation, title, id })=>{

	return(
		<View>
			<View style={styles.initialHeaderView}>
			 <View style={styles.headerView}>
			 	<View>
			 		<TouchableOpacity activeOpacity={ 0.5 }
			 			onPress={()=>{ navigation.openDrawer() }} >
			 			<View>
						 <Icon
								name="icon_menu" 
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

export default Header;