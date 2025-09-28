import { Navigate, Route, Routes } from "react-router-dom";
import { BrowserRouter as OriginalBrowserRouter } from 'react-router-dom';

import React, { lazy } from "react";
import LayoutOutlet from "./components/layout/LayoutOutlet";
import ErrorPage from "./components/errorPage/ErrorPage";
import { ThemeProvider } from "./contexts/ThemeProvider";
import "./App.css";

// Lazy-loaded page
const StyleGuide = lazy(() => import("./StyleGuide"));

// components/StrictBrowserRouter.tsx

// Custom wrapper to handle React 19 compatibility
export const BrowserRouter = ({ children }:{ children?: any }) => {
  return (
    <OriginalBrowserRouter>
      {children}
    </OriginalBrowserRouter>
  );
};

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Root layout */}
          <Route element={<LayoutOutlet />}>
            {/* Pages */}
            <Route path="/" element={<StyleGuide />} />
            <Route path="/error" element={<ErrorPage />} />

            {/* Catch-all → redirect to error page */}
            <Route path="*" element={<Navigate replace to="/error" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
