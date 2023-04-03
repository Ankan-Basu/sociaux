import { createContext, FC, useState } from "react";
import ErrorPopup from "~/components/modal/errorPopup";
import ContextProviderProps from "./contextProps";

export const ErrorContext = createContext<any>(null);

const ErrorContextProvider: FC<ContextProviderProps> = ({
  children,
  additionVals = undefined,
}) => {
  const [display, setDisplay] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<'simple' | 'redirect' | 'logout'>();

  return (
    <ErrorContext.Provider
      value={{
        display, setDisplay,
        message, setMessage,
        ...additionVals,
      }}
    >
      {children}
      <ErrorPopup 
      display={display} 
      setDisplay={setDisplay} 
      message={message} 
      type={type} 
      />
    </ErrorContext.Provider>
  );
};

export default ErrorContextProvider;
