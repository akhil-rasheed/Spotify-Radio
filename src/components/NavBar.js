import React from "react";
import { Nav } from "rsuite";

import "rsuite/styles/index.less"; // or 'rsuite/dist/rsuite.min.css'

const NavBar = () => {
  return (
    <div className="grid place-items-center text-white bg-gray-900 h-20">
      <Nav appearance="tabs">
        <Nav.Item eventKey="home">Home</Nav.Item>
        <Nav.Item eventKey="news">News</Nav.Item>
        <Nav.Item eventKey="solutions">Solutions</Nav.Item>
        <Nav.Item eventKey="products">Products</Nav.Item>
        <Nav.Item eventKey="about">About</Nav.Item>
      </Nav>
    </div>
  );
};

export default NavBar;
