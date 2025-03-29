import { useNavigate } from "react-router-dom";
import { API_URL } from "./consts";

function LoginComponent() {

    const navigate = useNavigate();

    function handleLogin(event){
        event.preventDefault()
        console.log(event.target[0].value)
        const name = event.target[0].value;

        fetch(API_URL + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "user_name": name
            })
        }).then(res => {
            if (res.status !== 200) {
                throw Error("invalid username")
            }
            return res.json()
    })
        .then(data => {
            sessionStorage.setItem('name', data.username);
            sessionStorage.setItem('id', data.id);
            navigate('/routes', {replace: true});
        })
        .catch(_ => {
            window.alert("Unable to login.");
        })
    }

    return (
        <section className="vh-100" >
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card text-white" style={{"borderRadius":"1em", "backgroundColor":"#0E021D", "borderWidth":"1px", "borderStyle":"solid"}}>
                            <div className="card-body p-5 text-center">

                                <form className="mb-md-5 mt-md-4 pb-5" onSubmit={handleLogin}>

                                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                    <p className="text-white-50 mb-5">Please enter your username</p>

                                    <div data-mdb-input-init className="form-outline form-white mb-4">
                                        <label className="form-label" htmlFor="typeNameX" >Username</label>
                                        <input type="name" id="typeNameX" className="form-control form-control-lg" style={{"background":"transparent", "color":"white"}}/>
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