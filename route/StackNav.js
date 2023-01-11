import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Logger from '../screens/Logger';
import Results from '../screens/Results';

const Stack = createNativeStackNavigator();

const StackNav = () => {
    return (
            <NavigationContainer theme={DarkTheme}>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Logger" component={Logger} />
            <Stack.Screen name="Results" component={Results} />
            </Stack.Navigator>
        </NavigationContainer>
     );
}
 
export default StackNav;