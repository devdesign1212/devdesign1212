import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '@/Pages/Home';
import LaboratoryGallery from '@/Pages/Home/LaboratoryGallery';
import MainLayout from '@/Pages/Home/MainLayout';
// import { auth } from '@/Services/firebase';

const RouterOutlet: React.FC = () => {
  // const [user, setUser] = useState<any>(null);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(u => setUser(u));
  //   return () => unsubscribe();
  // }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          {/* {user && ( */}
          <Route path="component-lab" element={<LaboratoryGallery />} />
          {/* )} */}
        </Route>
      </Routes>
    </Suspense>
  );
};

export default RouterOutlet;
