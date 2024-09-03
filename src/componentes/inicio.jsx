import { Link } from "react-router-dom";

const Inicio = ()=>{
    return(
        <div>
            <Link to="/users"><button>Login</button></Link>
            <Link to="/check"><button>Check sesión</button></Link>
        </div>
    )
};

export default Inicio;