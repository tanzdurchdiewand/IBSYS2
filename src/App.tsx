import { PersistGate } from "redux-persist/lib/integration/react";
import { Provider as ReduxProvider } from "react-redux";
import { persistor, store } from "./redux/store";
import AppRouter from "./routes";

function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRouter />
      </PersistGate>
    </ReduxProvider>
  );
}

export default App;
