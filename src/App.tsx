import { PersistGate } from "redux-persist/lib/integration/react";
import { Provider as ReduxProvider } from "react-redux";
import { persistor, store } from "./redux/store";
import AppRouter from "./routes";
import { LocaleProvider } from "./locals/locales";

function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LocaleProvider>
          <AppRouter />
        </LocaleProvider>
      </PersistGate>
    </ReduxProvider>
  );
}

export default App;
