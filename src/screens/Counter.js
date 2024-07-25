import { useActionCretor } from "../hooks/useActionsCreator";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { UserContext } from "../context/userContext";


const Counter = () =>{
	const count = useSelector(state => state.counter.count);
    const { increaseCount, decreaseCount} = useActionCretor();
    const {state, dispatch} =  useContext(UserContext);

    // localStorage.setItem("myCat", "Tom");
    // const cat = localStorage.getItem("myCat");
    // localStorage.removeItem("myCat");

    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    console.log(name)
    const isNull = (name && email) === null;
    console.log(isNull)

    let renderNameandEmail = 
        <div>
            <div>{name}</div>
            <div>{email}</div>
        </div>;

    if(isNull){
        renderNameandEmail = 
        <div>
            <div>{state.name}</div>
            <div>{state.email}</div>
        </div>;
    }

    return(
        <div>
            <div>counter</div>
            <div>{count}</div>
            <button onClick={increaseCount}>+++</button>
            <button onClick={decreaseCount}>---</button>

            <div>
                {renderNameandEmail}
                <button
				onClick={() =>
					dispatch({ type: 'add-user', payload: { name: 'JasonChen', email: '654321@gmail.com' } })
				}
                >
                    update state manually
                </button>
            </div>
        </div>
    )
}

export default Counter;