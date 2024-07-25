import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useActionCretor } from "../hooks/useActionsCreator";

function Login(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const {addUser} = useActionCretor();
    //const dispatch = useDispatch();
    const navigate = useNavigate();
    const generateToken = () =>{
        let tokenAlp = 'qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPLKJHGFDSAZXCVBNM';
        
        

        let token = '';

        for(let i = 0; i < 20; i++){
            let index = Math.floor( Math.random() * tokenAlp.length);
            token+=tokenAlp[index];
        }
        return token;
    }

    const handleLogin = (e) =>{
        e.preventDefault();
        //dispatch(addUser({name, email, token: generateToken()}));
        addUser({name, email, token: generateToken()});
        navigate('/homepage');
    };

    return(
        <div>
            <div>Pls provide your info to login</div>
            <form onSubmit={handleLogin}>
                <section>
                    <label>
                        Name: <input name="name" type="text" value={name} onChange={e => setName(e.target.value)}/>
                    </label>
                </section>
                <section>
                    <label>
                        Email: <input name="email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    </label>
                </section>
                <button> Login</button>
            </form>
        </div>
    );

}


export default Login;