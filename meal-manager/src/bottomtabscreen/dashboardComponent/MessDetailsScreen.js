import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  // TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Context as MessContext} from '../../context/MessContext';
import Header from './Header';
import {Icon} from '@up-shared/components';

let filter = 0;
let AvailableBalance = 0;

const MessDetailsScreen = ({navigation, id}) => {
  // console.log(id);

  const {
    state: {
      OtherCost,
      loading,
      UserID,
      totalCost,
      messMember,
      messMemberMoney,
      mess,
      totalMeal,
    },
  } = useContext(MessContext);

  if (
    loading ||
    messMember === undefined ||
    totalMeal === undefined ||
    totalCost === undefined ||
    messMemberMoney === undefined ||
    OtherCost === undefined
  ) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#2D8575" />
      </View>
    );
  }

  const manager = messMember.find(i => i.user_id == UserID);

  {
    mess ? (filter = mess.find(item => item.id === id)) : null;
  }

  //  console.log(OtherCost,' OtherCost\n');

  var total = 0;

  for (var i = 0; i < messMemberMoney.length; i++) {
    total += messMemberMoney[i].deposit;
  }

  var copyTotalCost = 0;
  // var TotalMillCost = 0;

  /// Calculate meal rate
  for (var k = 0; k < totalCost.length; k++) {
    if (totalCost[k] && totalMeal[k]) {
      copyTotalCost = totalCost[k].sum / totalMeal[k].sum;
      // TotalMillCost = ( (copyTotalCost) * (totalMeal[k].sum) );
    }
  }
  /// Calculate Total ExtraCost
  let TotalExtraCost = 0;

  for (var l = 0; l < OtherCost.length; l++) {
    TotalExtraCost += OtherCost[l].total_amount;
  }

  //Available Balance
  const totalCostSum = totalCost.map(i => i.sum);
  // console.log(total , totalCostSum[0] , TotalExtraCost);
  // totalCostSum && total && TotalExtraCost
  //   ? (AvailableBalance = total - totalCostSum[0] - TotalExtraCost)
  //   : 0;
 AvailableBalance = (total - totalCostSum[0] - TotalExtraCost);

  /// All On Press Function Here

  ///Add Member Function
  const AddMemberFunction = () => {
    navigation.navigate('CreateMember');
  };

  ///Daily Meal Function
  const DailyMealFunction = () => {
    navigation.navigate('DailyMeal');
  };

  ///Deposited Money Function
  const DepositedMoneyFunction = () => {
    navigation.navigate('Deposited Money');
  };

  ///Bazar list Function
  const BazarListFunction = () => {
    navigation.navigate('BazarList');
  };

  ///Fixed Cost Function
  const FixedCostFunction = () => {
    navigation.navigate('Other Costs');
  };

  ///user Mess Function
  const UserMessFunction = id => {
    navigation.navigate('UserMess Info', {id: id});
  };

  return (
    <View style={styles.ViewFlexStyle}>
      {/* Main body */}

      <View style={styles.mainBody}>
        {/* Start Button Area  */}

        <View style={styles.buttonWrap}>
          {manager ? (
            manager.type === 1 ? (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.buttonStyle}
                onPress={AddMemberFunction}>
                <View>
                  <Icon name="icon_member" size={20} color="#000000" />
                </View>
              </TouchableOpacity>
            ) : null
          ) : null}

          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.8}
            onPress={DailyMealFunction}>
            <View>
              <Icon name="icon_meal" size={20} color="#000000" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonStyle}
            onPress={DepositedMoneyFunction}>
            <View>
              <Icon name="icon_deposit" size={20} color="#000000" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.8}
            onPress={BazarListFunction}>
            <View>
              <Icon name="icon_shopping" size={20} color="#000000" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.8}
            onPress={FixedCostFunction}>
            <View>
              <Icon name="icon_extra-cost" size={20} color="#000000" />
            </View>
          </TouchableOpacity>
        </View>
        {/* End Button Area  */}

        {/* Start Mess Total Details  */}
        <View style={styles.totalItemWrap}>
          <View style={styles.itemWrap}>
            <View style={styles.item}>
              <View style={styles.iconWrap}>
                <Icon name="icon_total-deposits" size={16} color="white" />
              </View>
              <Text style={styles.totalText}> Total Deposits : </Text>
            </View>
            <View style={[styles.item, styles.NextItemWidth]}>
              {total ? (
                <Text style={styles.totalText}> {total.toFixed(2)} tk</Text>
              ) : (
                <Text style={styles.totalText}> 0.00 tk</Text>
              )}
            </View>
          </View>

          <View style={styles.itemWrap}>
            <View style={styles.item}>
              <View style={styles.iconWrap}>
                <Icon name="icon_shopping-cost" size={16} color="white" />
              </View>
              <Text style={styles.totalText}> Total Shopping : </Text>
            </View>

            <View style={[styles.item, styles.NextItemWidth]}>
              {totalCost ? (
                totalCost.map(item => {
                  return item.sum ? (
                    <Text key={item.sum} style={styles.totalText}>
                      {' '}
                      {item.sum.toFixed(2)} tk
                    </Text>
                  ) : (
                    <Text key={item.sum} style={styles.totalText}>
                      {' '}
                      00 tk
                    </Text>
                  );
                })
              ) : (
                <Text style={styles.totalText}> 00 tk</Text>
              )}
            </View>
          </View>

          <View style={styles.itemWrap}>
            <View style={styles.item}>
              <View style={styles.iconWrap}>
                <Icon name="icon_total-meals" size={16} color="white" />
              </View>
              <Text style={styles.totalText}> Total Meals : </Text>
            </View>

            <View style={[styles.item, styles.NextItemWidth]}>
              {totalMeal ? (
                totalMeal.map(item => {
                  return item.sum ? (
                    <Text key={item.sum} style={styles.totalText}>
                      {' '}
                      {item.sum}{' '}
                    </Text>
                  ) : (
                    <Text style={styles.totalText}> 00 </Text>
                  );
                })
              ) : (
                <Text style={styles.totalText}> 00 </Text>
              )}
            </View>
          </View>

          <View style={styles.itemWrap}>
            <View style={styles.item}>
              <View style={styles.iconWrap}>
                <Icon name="icon_meal-rate" size={16} color="white" />
              </View>
              <Text style={styles.totalText}> Meal Rate : </Text>
            </View>

            <View style={[styles.item, styles.NextItemWidth]}>
              {copyTotalCost ? (
                copyTotalCost !== Infinity ? (
                  <Text style={styles.totalText}>
                    {' '}
                    {copyTotalCost.toFixed(2)} tk
                  </Text>
                ) : (
                  <Text style={styles.totalText}> 0.00 tk</Text>
                )
              ) : (
                <Text style={styles.totalText}> 0.00 tk</Text>
              )}
            </View>
          </View>

          {/* Start Extra cost field */}

          <View style={styles.itemWrap}>
            <View style={styles.item}>
              <View style={styles.iconWrap}>
                <Icon name="icon_extra-cost" size={16} color="white" />
              </View>
              <Text style={styles.totalText}> Total Fixed Cost : </Text>
            </View>

            <View style={[styles.item, styles.NextItemWidth]}>
              {TotalExtraCost ? (
                <Text style={styles.totalText}>
                  {' '}
                  {TotalExtraCost.toFixed(2)} tk{' '}
                </Text>
              ) : (
                <Text style={styles.totalText}> 00 tk </Text>
              )}
            </View>
          </View>
          {/* End Extra cost field */}

          {/* Mess Available Balance */}
          <View style={styles.itemWrap}>
            <View style={styles.item}>
              <View style={styles.iconWrap}>
                <Icon name="icon_deposit" size={16} color="white" />
              </View>
              <Text style={styles.totalText}> Available Balance : </Text>
            </View>

            <View style={[styles.item, styles.NextItemWidth]}>
              {AvailableBalance ? (
                AvailableBalance !== Infinity ? (
                  <Text style={styles.totalText}>
                    {' '}
                    {AvailableBalance.toFixed(2)} tk
                  </Text>
                ) : (
                  <Text style={styles.totalText}> 0.00 tk</Text>
                )
              ) : (
                <Text style={styles.totalText}> 0.00 tk</Text>
              )}
            </View>
          </View>
          {/* Mess Available Balance */}
        </View>
        {/* End Mess Total Details  */}

        <View style={styles.titleWrap}>
          <Text style={styles.titleText}>Member Info</Text>
          <Text style={styles.titleText}>
            Total Member : {messMember.length}
          </Text>
        </View>

        {/* Start Render Total Member */}
        <View style={styles.MemberInitialView}>
          {messMember.map(item => {
            return (
              <View key={item.email} style={styles.userListWrap}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    UserMessFunction(item.user_id);
                  }}>
                  <View style={styles.userList}>
                    <View style={styles.userIconWrap}>
                      <Icon name="icon_user" size={26} color="white" />
                    </View>
                    <Text style={styles.userTx}> {item.username} </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        {/* End Render Total Member */}
      </View>
      {/* Main body */}
    </View>
  );
};

const styles = StyleSheet.create({
  ViewFlexStyle: {
    flex: 1,
    backgroundColor: '#f0f4ff',
  },

  NextItemWidth: {
    width: '25%',
  },

  MemberInitialView: {
    width: '100%',
    alignItems: 'center',
  },

  mainBody: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#f0f4ff',
  },
  buttonStyle: {
    backgroundColor: '#ffffff',
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    height: 34,
    paddingHorizontal: '3%',
    shadowColor: '#edf2fc',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 6,
  },
  btnTx: {
    color: '#000000',
    fontSize: RFPercentage(2),
  },
  totalItemWrap: {
    backgroundColor: '#ffffff',
    borderRadius: 50,
    padding: '6%',
    marginTop: '5%',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 8,
    shadowColor: '#000000',
    width: '100%',
  },
  itemWrap: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 40,
    marginTop: 8,
  },
  iconWrap: {
    width: 30,
    height: 30,
    backgroundColor: '#8395ff',
    borderRadius: 6,
    shadowColor: '#edf2fc',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 6,
    marginRight: '8%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalText: {
    fontSize: RFPercentage(2.4),
    color: '#242d48',
  },
  titleWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '6%',
    marginBottom: '6%',
    width: '100%',
    padding: '3%',
  },
  titleText: {
    fontSize: RFPercentage(2.8),
    color: '#000000',
    fontWeight: 'bold',
  },
  userListWrap: {
    width: '80%',
  },
  userList: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: '4%',
    marginBottom: '6%',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 5,
    shadowColor: '#000000',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  userIconWrap: {
    width: 54,
    height: 54,
    borderRadius: 26,
    backgroundColor: '#5842f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userTx: {
    fontSize: 18,
    color: '#242d48',
    marginLeft: '5%',
    fontWeight: '900',
  },
});

export default MessDetailsScreen;
