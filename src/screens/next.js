// import { useState, useEffect } from "react";
// import { Contract, Wallet, ethers } from "ethers";
// import { JsonRpcProvider } from "ethers";

//     // useEffect( ()=>{

//     //     const checkNode = async () => {
//     //         try{
//     //             //connect to the contract
//     //             const contract_address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
//     //             const contract_abi = [{"inputs":[],"name":"a","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hi","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"max","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"test","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"input","type":"string"}],"name":"testset","outputs":[],"stateMutability":"nonpayable","type":"function"}];
//     //             const provider = new JsonRpcProvider('http://127.0.0.1:8545');
//     //             const contract = new Contract(contract_address, contract_abi, provider);
//     //             const wallet = new Wallet('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', provider);
//     //             const write_contract = new Contract(contract_address, contract_abi, wallet);
//     //             //read the data from contract
//     //             const hi = await contract.hi();
//     //             const a = await contract.a();
//     //             const max = await contract.max();
        
//     //             console.log(hi)
//     //             console.log(a.toString())
//     //             console.log(max.toString())
        
//     //             await write_contract.testset('testing')
//     //             console.log(hi)
        
//     //         } catch(e){
//     //             console.error('Error connecting to the Ethereum node:', e);
//     //         }
//     //     }
//     //     checkNode();


//     // },[])



// async function Next(){


//     return(
//         <div>
//             <div>Next page</div>
//             {/* <div>{hi}</div>
//             <div>{a.toString()}</div>
//             <div>{max.toString()}</div> */}
//         </div>

//     )
// }

// export default Next;

function Next(){
    return(<div>this is Next page</div>)
}

export default Next;