import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '@/Pages/Home';
import MainLayout from '@/Pages/Home/MainLayout';
import { useTranslation } from 'react-i18next';
import LaboratoryGallery from '@/Pages/Home/ComponentList';

const RouterOutlet: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Suspense fallback={<div>{t('buttons.loading')}</div>}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route
            path="component-lab/:componentId?"
            element={<LaboratoryGallery />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default RouterOutlet;
