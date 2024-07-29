import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../const";
import contract from '../artifacts/contracts/VotingSystem.sol/VotingSystem.json';

const abi = contract['abi'];

export const connectWallet = async() =>{
    //let provider = null;
    // let signer = null;
    let account = '';
    //6.13.1
    const provider = new ethers.BrowserProvider(window.ethereum)
    //5.7
    //const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send('eth_requestAccounts');
    account = accounts?.length > 0 ? accounts[0] : '';
    const signer = await provider?.getSigner();

    return{account, signer ,provider}
}



export const getContract = (signer) =>{
    return new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
}