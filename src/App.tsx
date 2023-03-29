import React from 'react';
import {
  createBrowserRouter,
  Outlet,
  Route,
RouterProvider,
} from "react-router-dom";
import Dashboard from './components/Dashboard';
import Result from './components/Result';

let router = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
  },
  {
    path: "/results/:teamAbbreviation",
    Component: Result,
  }
]);
export default function App() {
  return (
    <div className="container py-3">
  <header>
    <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
        <span className="fs-4">NBA Score Tracking App</span>
    </div>
  </header>

  <main>
  <RouterProvider router={router}  />
  </main>
</div>
  )
}
