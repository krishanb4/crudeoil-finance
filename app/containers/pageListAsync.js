/* eslint-disable */

import React from "react";
import Loading from "dan-components/Loading";
import loadable from "../utils/loadable";

export const HomePage = loadable(() => import("./LandingPage/HomePage"), {
  fallback: <Loading />,
});

export const Shops = loadable(() => import("./Shop/index"), {
  fallback: <Loading />,
});
// Dashboard
export const PersonalDashboard = loadable(
  () => import("./Dashboard/PersonalDashboard"),
  {
    fallback: <Loading />,
  }
);
export const CrmDashboard = loadable(() => import("./Dashboard/CrmDashboard"), {
  fallback: <Loading />,
});
export const CryptoDashboard = loadable(
  () => import("./Dashboard/CryptoDashboard"),
  {
    fallback: <Loading />,
  }
);

export const SliderPage = loadable(() => import("./LandingPage/SliderPage"), {
  fallback: <Loading />,
});

// Forms
export const ReduxForm = loadable(() => import("./Forms/ReduxForm"), {
  fallback: <Loading />,
});
export const DateTimePicker = loadable(() => import("./Forms/DateTimePicker"), {
  fallback: <Loading />,
});
export const CheckboxRadio = loadable(() => import("./Forms/CheckboxRadio"), {
  fallback: <Loading />,
});
export const Switches = loadable(() => import("./Forms/Switches"), {
  fallback: <Loading />,
});
export const Selectbox = loadable(() => import("./Forms/Selectbox"), {
  fallback: <Loading />,
});
export const Rating = loadable(() => import("./Forms/Rating"), {
  fallback: <Loading />,
});
export const SliderRange = loadable(() => import("./Forms/SliderRange"), {
  fallback: <Loading />,
});
export const Buttons = loadable(() => import("./Forms/Buttons"), {
  fallback: <Loading />,
});
export const ToggleButton = loadable(() => import("./Forms/ToggleButton"), {
  fallback: <Loading />,
});
export const DialButton = loadable(() => import("./Forms/DialButton"), {
  fallback: <Loading />,
});
export const Textbox = loadable(() => import("./Forms/Textbox"), {
  fallback: <Loading />,
});
export const Autocomplete = loadable(() => import("./Forms/Autocomplete"), {
  fallback: <Loading />,
});
export const TextEditor = loadable(() => import("./Forms/TextEditor"), {
  fallback: <Loading />,
});
export const Upload = loadable(() => import("./Forms/Upload"), {
  fallback: <Loading />,
});

// Pages
export const Login = loadable(() => import("./Pages/Users/LoginV3"), {
  fallback: <Loading />,
});
export const ComingSoon = loadable(() => import("./Pages/ComingSoon"), {
  fallback: <Loading />,
});
export const Profile = loadable(() => import("./Pages/UserProfile"), {
  fallback: <Loading />,
});

export const Contact = loadable(() => import("./Pages/Contact"), {
  fallback: <Loading />,
});
export const ResetPassword = loadable(
  () => import("./Pages/Users/ResetPassword"),
  {
    fallback: <Loading />,
  }
);
export const LockScreen = loadable(() => import("./Pages/Users/LockScreen"), {
  fallback: <Loading />,
});
export const TaskBoard = loadable(() => import("./Pages/TaskBoard"), {
  fallback: <Loading />,
});
export const Invoice = loadable(() => import("./Pages/Invoice"), {
  fallback: <Loading />,
});

// Other
export const NotFound = loadable(() => import("./NotFound/NotFound"), {
  fallback: <Loading />,
});
export const NotFoundDedicated = loadable(
  () => import("./Pages/Standalone/NotFoundDedicated"),
  {
    fallback: <Loading />,
  }
);
export const Error = loadable(() => import("./Pages/Error"), {
  fallback: <Loading />,
});
export const Maintenance = loadable(() => import("./Pages/Maintenance"), {
  fallback: <Loading />,
});
export const Parent = loadable(() => import("./Parent"), {
  fallback: <Loading />,
});
export const Settings = loadable(() => import("./Pages/Settings"), {
  fallback: <Loading />,
});
export const HelpSupport = loadable(() => import("./Pages/HelpSupport"), {
  fallback: <Loading />,
});
