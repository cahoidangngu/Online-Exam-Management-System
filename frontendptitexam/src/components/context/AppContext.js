import React, { createContext, useContext, useEffect, useState } from "react";
import Stomp from "stompjs";
import { showCart } from "../service/CartService";

const AppContext = createContext();

export function useWebSocket() {
  return useContext(AppContext).webSocket;
}

const AppProvider = ({ children }) => {
  const [isFlag, setIsFlag] = useState(true);
  const idAccount = localStorage.getItem("account");
  const [checkLogin, setCheckLogin] = useState(false);

  const toggleFlag = () => {
    setIsFlag((prevFlag) => !prevFlag);
  };

  const login = () => {
    setCheckLogin(false);
  };

  const logout = () => {
    setCheckLogin(true);
  };

  const appContextValue = {
    isFlag,
    toggleFlag,
    checkLogin,
    login,
    logout,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
