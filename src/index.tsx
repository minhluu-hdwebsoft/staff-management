import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "modules/Auth/Context";
import authProvider from "modules/Auth/defaultAuthProvider";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";
import { CustomRouter } from "./components/common/CustomRouter";
import { ModalCustomProvider } from "./hooks/useModal";
// import { AuthProvider } from "./modules/Auth/context2";
import reportWebVitals from "./reportWebVitals";
import { theme } from "./theme";
import history from "./utils/history";
import "./utils/i18n.ts";
import "./utils/yupGlobal";

ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <CustomRouter history={history}>
        {/* <AuthProvider> */}
        <AuthContextProvider authProvider={authProvider}>
          <ModalCustomProvider>
            <App />
          </ModalCustomProvider>
        </AuthContextProvider>
        {/* </AuthProvider> */}
      </CustomRouter>
    </ChakraProvider>
  </Provider>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
