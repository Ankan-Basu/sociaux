import { createContext, FC, useState } from "react";
import ErrorPopup from "~/components/modal/errorPopup";
import ContextProviderProps from "./contextProps";

export const ErrorContext = createContext<any>(null);

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
