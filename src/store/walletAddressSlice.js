import { createSlice } from "@reduxjs/toolkit";


const addressSlice = createSlice({
    name: 'wallwt_address',
    initialState:{
        address: '',
    },
    reducers:{
        addAddress: (state, action)=>{
            //const accounts = await window?.ethereum.request({method: 'eth_requestAccounts'});
            state.address = action.payload.address;
        },
        removeAddress:(state)=>{
            state.address="";
        }
    }

})
export const { addAddress, removeAddress } = addressSlice.actions;
export default addressSlice.reducer;