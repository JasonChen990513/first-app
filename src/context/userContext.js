import { createContext, useReducer } from "react";


export const UserContext = createContext({});

const reducer = (state, action) =>{
    switch(action.type){

        case 'add-user':
            localStorage.setItem('name', action.payload.name);
            localStorage.setItem('email', action.payload.email)
            return {...state, ...action.payload}
        default:
            return state;
    }
}




export const CustomProvider = ({children}) =>{
    const [state, dispatch] = useReducer(reducer, {name: 'jason', email:'123546@gmai.com'});


    return (<UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>);
}

