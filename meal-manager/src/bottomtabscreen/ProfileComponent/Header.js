import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from "@up-shared/components";
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

const Header=({ navigation, title, id })=>{

  const menu = useRef();
  const hideMenu = () => menu.current.hide();
  const showMenu = () => menu.current.show();

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
         <Menu ref={menu} button={ 
          <TouchableOpacity activeOpacity={1} onPress={showMenu} style={styles.EditButtonStyle}>
            <View style={styles.EditViewStyle}>
              <Icon
                name="icon_dot"
                size={18}
                color="#212121"
              />
            </View>
          </TouchableOpacity>
          
        }>

        <MenuItem onPress={()=>{ 
          navigation.navigate('Edit Profile'),
          hideMenu() }}>
          Edit Profile
        </MenuItem>

      </Menu>

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
  
  EditButtonStyle:{
    paddingLeft:'3%', 
    alignItems: 'center',
  },

  EditViewStyle:{
    paddingHorizontal: 5, 
    paddingVertical: 2,
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