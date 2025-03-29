import NavbarComponent from "./Navbar";

const Wrapper = (props) => {
    const Component = props.component;
    return (
      <div>
        <NavbarComponent />
        <Component />
      </div>
    );
};

export default Wrapper;
