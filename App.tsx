import React from 'react';
import type {PropsWithChildren} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from "./src/screens/Home";
import Success from "./src/screens/Success";

type SectionProps = PropsWithChildren<{
  title: string;
}>;
function App(): JSX.Element {
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name={"Home"} component={Home} />
        <Stack.Screen name={"Success"} component={Success} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
