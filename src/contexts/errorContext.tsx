import React, { createContext, FC, useState } from "react";
import ErrorPopup from "~/components/modal/errorPopup";
import ContextProviderProps from "./contextProps";

export type ErrorContextType = {
  errorDisplay: boolean,
  setErrorDisplay: React.Dispatch<React.SetStateAction<boolean>>,
        errorMessage: string, 
        setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
        errorType: 'simple' | 'redirect' | 'logout' | undefined, 
        setErrorType: React.Dispatch<React.SetStateAction<'simple' | 'redirect' | 'logout' | undefined>>,
}
export const ErrorContext = createContext<ErrorContextType | null>(null);

const ErrorContextProvider: FC<ContextProviderProps> = ({
  children,
  additionVals = undefined,
}) => {
  const [errorDisplay, setErrorDisplay] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorType, setErrorType] = useState<'simple' | 'redirect' | 'logout'>();

  return (
    <ErrorContext.Provider
      value={{
        errorDisplay, setErrorDisplay,
        errorMessage, setErrorMessage,
        errorType, setErrorType,
        ...additionVals,
      }}
    >
      {children}
      <ErrorPopup 
      display={errorDisplay} 
      setDisplay={setErrorDisplay} 
      message={errorMessage} 
      type={errorType} 
      />
    </ErrorContext.Provider>
  );
};

export default ErrorContextProvider;
