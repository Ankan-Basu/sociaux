import { type ObjectId } from "mongoose";
import { createContext, type FC, useState } from "react";
import { type IFriendReqItem } from "~/server/db/models/FriendReq";
import { type INotifItem } from "~/server/db/models/Notification";
import type ContextProviderProps from "./contextProps";

export interface INotifItemHydrated extends INotifItem {
  _id?: ObjectId;
}

export interface IFriendReqItemHydrated extends IFriendReqItem {
  _id?: ObjectId;
}

export type NotifContextType = {
  state: number | undefined;
  setState: React.Dispatch<React.SetStateAction<number | undefined>>;
  notifSelected?: boolean, 
  setNotifSelected?: React.Dispatch<React.SetStateAction<boolean>>,
  friendReqSelected?: boolean, 
  setFriendReqSelected?: React.Dispatch<React.SetStateAction<boolean>>,
  mobileNotifSelected?: boolean, 
  setMobileNotifSelected?: React.Dispatch<React.SetStateAction<boolean>>,
  notifList?: Array<INotifItemHydrated| INotifItem>, 
  setNotifList?: React.Dispatch<React.SetStateAction<Array<INotifItemHydrated | INotifItem>>>,
  friendReqList?: Array<IFriendReqItemHydrated>, 
  setFriendReqList?: React.Dispatch<React.SetStateAction<Array<IFriendReqItemHydrated>>>
}

export const NotifContext = createContext<NotifContextType | null>(null);

const NotifContextProvider: FC<ContextProviderProps> = ({
  children,
  additionVals,
}) => {
  const [state, setState] = useState<number>();

  return (
    <NotifContext.Provider
      value={{
        state, setState,
        ...additionVals,
      }}
    >
      {children}
    </NotifContext.Provider>
  );
};

export default NotifContextProvider;
