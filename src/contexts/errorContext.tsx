import { createContext, type FC, useState } from "react";
import ErrorPopup from "~/components/modal/errorPopup";
import type ContextProviderProps from "./contextProps";

export type ErrorContextType = {
  errorDisplay: boolean,
  setErrorDisplay: React.Dispatch<React.SetStateAction<boolean>>,
        errorMessage: string, 
        setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
        errorType: 'simple' | 'redirect' | 'logout' | 'redirectLogin' | undefined, 
        setErrorType: React.Dispatch<React.SetStateAction<'simple' | 'redirect' | 'logout' | 'redirectLogin' | undefined>>,
}
export const ErrorContext = createContext<ErrorContextType | null>(null);

const ErrorContextProvider: FC<ContextProviderProps> = ({
  children,
  additionVals = undefined,
}) => {
  const [errorDisplay, setErrorDisplay] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorType, setErrorType] = useState<'simple' | 'redirect' | 'logout' | 'redirectLogin'>();

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
