// src/components/Home.js
import React from 'react';
import UserTable from './UserTable';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div>
        <Navbar/>
      <UserTable />
    </div>
  );
};

export default Home;
