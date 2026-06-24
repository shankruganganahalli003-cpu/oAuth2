import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";
import { store, persistor } from "./redux/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
   

<GoogleOAuthProvider clientId="951092080585-0o3ojukllnmit07qroln51g2rut2j19l.apps.googleusercontent.com">
  <App />
</GoogleOAuthProvider>
          <Toaster position="top-center" reverseOrder={false} />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);