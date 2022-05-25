import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Diary, Home } from "./components";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={() => ({
            tabBarLabelStyle: {
              fontSize: 20,
            },
          })}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              tabBarIcon: () => null,
            }}
          />
          <Tab.Screen
            name="Diary"
            component={Diary}
            options={{
              headerShown: false,
              tabBarIcon: () => null,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
