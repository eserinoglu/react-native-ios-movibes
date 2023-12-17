import "react-native-gesture-handler";
import AppNavigation from "./src/navigation/AppNavigation";
import { QueryClient, QueryClientProvider } from "react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { UserProvider } from "./src/context/UserContext";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <UserProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <AppNavigation />
        </QueryClientProvider>
      </GestureHandlerRootView>
    </UserProvider>
  );
}
