import React from 'react';

import AppNavigator from './navigation/AppNavigator'; // Import navigator utama kita
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
