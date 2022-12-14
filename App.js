// import { createAppContainer } from 'react-navigation';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { FaBeer } from 'react-icons/fa';
import Icon from 'react-native-vector-icons/AntDesign';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Explore from './src/screens/Explore';
import Diagnose from './src/screens/Diagnose';
import Search from './src/screens/Search';
import ImageScreen from './src/screens/ImageScreen';
import PlantDetailsScreen from './src/screens/PlantDetailsScreen';
import PlantSearchScreen from './src/screens/PlantSearchScreen';
// import SquareScreen from './src/screens/SquareScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
    }}>
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 27,
        backgroundColor: 'white',
      }}>
      {children}
    </View>
  </TouchableOpacity>
);
const Home = () => {
  return (
    <Tab.Navigator
      style={{
        backgroundColor: 'rgb(249,247,245)',
      }}
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          borderRadius: 35,
          height: 90,
          paddingBottom: 40,
          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        style={{
          backgroundColor: 'rgb(249,247,245)',
        }}
        name='Explore'
        component={Explore}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 10,
              }}>
              <Image
                source={require('./assets/explore.png')}
                resizeMode='contain'
                style={{
                  width: 27,
                  height: 27,
                  tintColor: focused ? 'rgb(61,99,87)' : '#96AC9B',
                }}
              />
              <Text
                style={{
                  fontSize: 10,

                  color: focused ? 'rgb(61,99,87)' : '#96AC9B',
                }}>
                Explore
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name='Diagnose'
        component={Diagnose}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 10,
              }}>
              {/* <FaBeer /> */}
              <Image
                source={require('./assets/diagnose.png')}
                resizeMode='contain'
                style={{
                  width: 27,
                  height: 27,
                  tintColor: focused ? 'rgb(61,99,87)' : '#96AC9B',
                  stroke: 40,
                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: focused ? 'rgb(61,99,87)' : '#96AC9B',
                }}>
                Diagnose
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name='Search'
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 10,
              }}>
              {/* <FaBeer /> */}
              <Image
                source={require('./assets/search.png')}
                resizeMode='contain'
                style={{
                  width: 27,
                  height: 27,
                  tintColor: focused ? 'rgb(61,99,87)' : '#96AC9B',
                  fontSize: 10,
                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: focused ? 'rgb(61,99,87)' : '#96AC9B',
                }}>
                Search
              </Text>
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
          name='Reminders'
          component={PlantScreen}
          initialRouteName='Plant'
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('./assets/capture.png')}
                resizeMode='contain'
                style={{
                  width: 27,
                  height: 27,
                  // tintColor: focused ? '#96AC9B' : '#96AC9B',
                  fontSize: 10,
                }}
              />
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        /> */}
      <Tab.Screen
        name='Reminders'
        component={ImageScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 10,
              }}>
              <Image
                source={require('./assets/reminders.png')}
                resizeMode='contain'
                style={{
                  width: 27,
                  height: 27,
                  tintColor: focused ? 'rgb(61,99,87)' : '#96AC9B',
                  fontSize: 10,
                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: focused ? 'rgb(61,99,87)' : '#96AC9B',
                }}>
                Reminders
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name='Image'
        component={ImageScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 10,
              }}>
              <Image
                source={require('./assets/plant.png')}
                resizeMode='contain'
                style={{
                  width: 27,
                  height: 27,
                  tintColor: focused ? 'rgb(61,99,87)' : '#96AC9B',
                  fontSize: 10,
                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: focused ? 'rgb(61,99,87)' : '#96AC9B',
                }}>
                My Garden
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default function App() {
  return (
    <NavigationContainer
      style={{
        backgroundColor: 'rgb(249,247,245)',
      }}>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen
          name='PlantScreen'
          component={PlantScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='SearchInputScreen'
          component={SearchInputScreen}
          options={{
            title: 'Search',
            headerLeft: () => (
              <Icon
                // onPress={() => navigate}
                color='#000'
                name='close'
                size={17}
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
// const navigator = createStackNavigator(
//   {
//     Home: Explore,
//     Components: ComponentsScreen,
//     List: ListScreen,
//     Image: ImageScreen,
//     Plant: PlantScreen,
//     Square: SquareScreen,
//   },
//   {
//     initialRouteName: 'Plant',
//     defaultNavigationOptions: {
//       title: 'App',
//     },
//   }
// );

// export default createAppContainer(MyTabs);
