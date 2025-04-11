import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screenMapping } from './screenMapping';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GameIntroScreen">
        {screenMapping.map((item, index) => {
            return (
                <Stack.Screen key={index} name={item.screenName} component={item.screenComponent} options={{ headerShown: false }}
                />
            )
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AppNavigation
