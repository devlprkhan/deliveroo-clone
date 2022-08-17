import { StatusBar } from "expo-status-bar";
import { TailwindProvider } from "tailwindcss-react-native";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import HomeScreen from "./screens/HomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import BasketScreen from "./screens/BasketScreen";
import PreparingOrderScreen from "./screens/PreparingOrderScreen";
import DeliveryScreen from "./screens/DeliveryScreen";

// Redux Store
import { Provider } from "react-redux";
import { store } from "./store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <TailwindProvider>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Restaurant" component={RestaurantScreen} />
            <Stack.Screen
              name="Basket"
              component={BasketScreen}
              options={{presentation: "modal", headerShown: false }}
            />
            <Stack.Screen
              name="PreparingOrder"
              component={PreparingOrderScreen}
              options={{presentation: "fullScreenModal", headerShown: false}}
            />
            <Stack.Screen
              name="Delivery"
              component={DeliveryScreen}
              options={{presentation: "fullScreenModal", headerShown: false}}
            />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </TailwindProvider>
      </Provider>
    </NavigationContainer>
  );
}
