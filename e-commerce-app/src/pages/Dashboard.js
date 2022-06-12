// REACT and HOOKS
import React from 'react';

// local Components
import DashboardSection1 from '../components/sectionComponents/DashboardSection1';
import DashboardSection2 from '../components/sectionComponents/DashboardSection2';
import CreateProduct from '../components/CreateNewProduct';

const Dashboard = () => {
  return (
    <>
      <DashboardSection1 />
      <CreateProduct />
      <DashboardSection2 />
    </>
  );
};

export default Dashboard;
