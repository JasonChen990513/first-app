import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { addUser, removeUser } from '../store/userSlice';
import { increaseCount, decreaseCount} from '../store/counterSlice';
import { addAddress, removeAddress } from "../store/walletAddressSlice";

export const useActionCretor = () =>{
    const dispatch = useDispatch();

    return bindActionCreators({addUser, increaseCount, decreaseCount, addAddress, removeAddress}, dispatch);
}




