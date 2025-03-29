import { useNavigate } from "react-router-dom";

function LoginComponent() {

    const navigate = useNavigate();

    function handleLogin(event){
        event.preventDefault()
        console.log(event.target[0].value)
        const name = event.target[0].value;
        sessionStorage.setItem('name', name);
        navigate('/routes', {replace: true});
    }

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{"borderRadius":"1em"}}>
                            <div className="card-body p-5 text-center">

                                <form className="mb-md-5 mt-md-4 pb-5" onSubmit={handleLogin}>

                                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                    <p className="text-white-50 mb-5">Please enter your username</p>

                                    <div data-mdb-input-init className="form-outline form-white mb-4">
                                        <label className="form-label" htmlFor="typeNameX">Username</label>
                                        <input type="name" id="typeNameX" className="form-control form-control-lg" />
                                    </div>

                                    <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginComponent;