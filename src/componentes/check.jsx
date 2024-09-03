import axios from 'axios';
import { useForm } from 'react-hook-form';

const Check = () =>{
    const {register, handleSubmit} = useForm();

    const checkSession = (data) =>{
        axios.get("http://localhost:8080/users/check-session", {}).then((response)=>{
            console.log(response.data);
        }, { withCredentials: true }).catch((error)=>{
            console.log(error)});
    }
    return (
        <div>
            <form onSubmit={handleSubmit(checkSession)}>
                <div>
                    <button type="submit">Checkear sesion activa</button>
                </div>
            </form>
        </div>
    );
};

export default Check;