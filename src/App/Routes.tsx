import React, { Suspense } from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import Dashboard from '@/Pages/Home/Dashboard';

const RouterOutlet: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="/" element={<Outlet />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default RouterOutlet;
