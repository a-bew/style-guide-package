import { Suspense } from "react";
import ErrorBoundary from "../errorPage/ErrorBoundary";
import {  Outlet } from 'react-router-dom';
import PageLoading from "../loading/PageLoading";

const LayoutOutlet = () => {

  return (
    <Suspense fallback={
      <PageLoading type='large' />
    }>
      <ErrorBoundary reloadOnReset>


        <Outlet />
      </ErrorBoundary>

      
    </Suspense>
  )
}

export default LayoutOutlet;