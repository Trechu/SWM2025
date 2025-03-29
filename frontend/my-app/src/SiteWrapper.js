import NavbarComponent from "./Navbar";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Wrapper = (props) => {
  const Component = props.component;

  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = sessionStorage.getItem('name');
    if (!storedName) {
      navigate("/login", {replace: true});
    }
  });

  return (
    <div>
      <NavbarComponent />
      <Component />
    </div>
  );
};

export default Wrapper;
