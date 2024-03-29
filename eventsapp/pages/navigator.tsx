import * as React from "react";
import { Image } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./login/login";
import Register from "./register/register";
import SplashScreen from "./splashScreen";
import MainScreen from "./main/main";
import MapScreen from "./map/map";
import EventDetails from "./eventDetails/eventDetails";
import AddEventScreen from "./addEvent/addEvent"

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


const Stack = createNativeStackNavigator();

function CustomTabBarIcon({ image, focused }) {
  const isFocused = useIsFocused();

  return (
    <Image
      source={{ uri: image }}
      style={{ width: isFocused ? 32 : 24, height: isFocused ? 32 : 24 }}
    />
  );
}

function MainStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{
          headerShown: false }}
      />
      <Stack.Screen name="EventDetails" component={EventDetails} />
      <Stack.Screen name="AddEventScreen" component={AddEventScreen} />
    </Stack.Navigator>
  );
}
function EventDetailsStackScreen() {
  return (
      <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
      >
        <Stack.Screen
            name="EventDetails"
            component={EventDetails}
            options={{
              headerShown: false }}
        />
        <Stack.Screen name="AddEventScreen" component={AddEventScreen} />
      </Stack.Navigator>
  );
}
function MapStackScreen() {
  return (
      <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
      >
        <Stack.Screen
            name="Main"
            component={MapScreen}
            options={{
              headerShown: false }}
        />
        <Stack.Screen name="EventDetails" component={EventDetails} />
      </Stack.Navigator>
  );
}

export default function Navigator() {
  const dispatch = useDispatch();

  const Tab = createBottomTabNavigator();
  const { token } = useSelector((state: RootState) => state.user);


  return (
    <>
      {token != null ? (
        // No token found
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "Sign in",

            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              title: "Register",
            }}
          />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={{
            unmountOnBlur: true,
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
              height:60,
              borderRadius:20,
              marginHorizontal:20,
              marginBottom:5,
              position:"absolute",
              borderWidth:2,
              borderColor:'#C5C5C5',
              zIndex:3,
              elevation: 3,
            }
          }}
          initialRouteName="Main"

        >
          <Tab.Screen
            name="SplashScr"
            component={SplashScreen}
            options={{
             unmountOnBlur: true,
              tabBarIcon: ({ focused }) => (
                <CustomTabBarIcon
                  image={
                    "https://cdn-icons-png.flaticon.com/512/3884/3884339.png"
                  }
                  focused={focused}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Main"
            component={MainStackScreen}
            options={{
              unmountOnBlur: true,
              tabBarIcon: ({ focused }) => (
                <CustomTabBarIcon
                  image={
                    "https://cdn-icons-png.flaticon.com/512/3884/3884324.png"
                  }
                  focused={focused}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Map"
            component={MapStackScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <CustomTabBarIcon
                  image={
                    "https://cdn-icons-png.flaticon.com/512/3884/3884303.png"
                  }
                  focused={focused}
                />
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </>
  );
}
