import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '@/Pages/Home';
import LaboratoryGallery from '@/Pages/Home/LaboratoryGallery';
import MainLayout from '@/Pages/Home/MainLayout';

const RouterOutlet: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="component-lab" element={<LaboratoryGallery />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default RouterOutlet;
