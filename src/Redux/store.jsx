import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import AuthSlice from "./AuthSlice";
import CommonSlice from "./CommonSlice";
import LeadsSlice from "./LeadsSlice";
import ProductSlice from "./ProductSlice";
import PersonSlice from "./PersonSlice";
import DealSlice from "./DealSlice";
import WebFormSlice from "./WebFormSlice";
import OrganizationSlice from "./organizationSlice";
import ActivitySlice from "../Components/Activitys/ActivitySlice";
import ProjectSlice from "./ProjectSlice";
import TaskSlice from "./TaskSlice";
import TemplateSlice from "./TemplateSlice";
import ChatSlice from "./ChatSlice";
import SettingSlice from "./SettingSlice";
import CustomizeFieldSlice from "./CustomizeFieldSlice";
import EmailSlice from "./EmailSlice";
import UserSlice from "./UserSlice";
import SideBarSlice from "./SideBarSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, AuthSlice),
  common: CommonSlice,
  leads: LeadsSlice,
  Product: ProductSlice,
  Person: PersonSlice,
  Deal: DealSlice,
  WebForm: WebFormSlice,
  organization: OrganizationSlice,
  Activity: ActivitySlice,
  Project: ProjectSlice,
  Tasks: TaskSlice,
  Templates: TemplateSlice,
  Chat: ChatSlice,
  Settings: SettingSlice,
  Filde: CustomizeFieldSlice,
  Email:EmailSlice,
  UserRole:UserSlice,
  Sidebar: SideBarSlice,

});

const persisteRoot = rootReducer;

export const store = configureStore({
  reducer: { root: persisteRoot },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
