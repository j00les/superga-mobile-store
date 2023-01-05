import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import { client } from "./src/apis/apollo-client-instance";
import DetailScreen from "./src/screens/DetailScreen";
import HomeScreen from "./src/screens/HomeScreen";

// const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{
              headerShown: false,
              headerLargeStyle: false,
            }}
            name="Details"
            component={DetailScreen}
          />
        </Stack.Navigator>
        <StatusBar showHideTransition={true}></StatusBar>
      </NavigationContainer>
    </ApolloProvider>
  );
}
