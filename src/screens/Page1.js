//import { useState } from "react"
import { useSelector } from "react-redux"
import { useActionCretor } from "../hooks/useActionsCreator"
import { useSDK } from "@metamask/sdk-react"; 
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import { Wallet, Contract } from "ethers";
import { connectWallet, getContract } from "../util/contract";
import { accountAtom, contractAtom} from '../atoms/contract'
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../const";
import contract from '../artifacts/contracts/VotingSystem.sol/VotingSystem.json';
const abi = contract['abi'];

// const accountAtom = atomWithStorage('walletAddress','');
// const contractAtom = atomWithStorage('contractInstance','');
export default function Page1(){
    //const [account, setAccount] = useState('')
    const currentAccount = localStorage.getItem('address')
    const { addAddress, removeAddress } = useActionCretor();
	const [address, setAddress] = useAtom(accountAtom);
    const [contract, setContract] = useAtom(contractAtom);
    const walletAddress = useSelector(state=> state.wallet_address.address);
    const { sdk, connected, provider } = useSDK();
    //console.log(' wallet address in redux persist store ' + walletAddress);


    const handleWalletConnection = async() =>{
        try{
            const {account, signer, provider} = await connectWallet();
            const readContract = getContract(provider);
            const writecontract = getContract(signer);
            // const account = accounts?.length < 1 ? '' : accounts[0];
            // console.log(readContract);
            // console.log(writecontract);
            const owner = await writecontract.owner();
            console.log(owner);
            console.log(await writecontract.registerStage());

            // const testing = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
            // console.log(testing)


            if(!account || !writecontract) return;
			setAddress(account);
            setContract(writecontract)
            //await sdk.connect();
            
            if(typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'){
                const accounts = await window?.ethereum.request({method: 'eth_requestAccounts'});
                //console.log(accounts);
                localStorage.setItem('address', accounts[0]);
                //setAccount(accounts[0]);
                setAddress(accounts[0]);
				addAddress({address: accounts[0]});
            } else {
                alert('pls install meta mask')
                return(
                    <div>
                        pls install meta mask
                    </div>
                );
            }

        } catch (error){
            console.error(error?.message)
        }
    }

    const handleGetContractData = async() =>{
        if(!contract) return alert('pls connect to meta mask')
        // await contract.register();
        // const response = await contract?.owner();
        const owner = await contract.owner();
        console.log('the owner is ')
        console.log(owner);

        // console.log(response) 
    }

    // window?.ethereum?.on('accountsChanged',(accounts)=>{
    //     console.log(accounts)
    //     localStorage.setItem('address', accounts[0])
    //     addAddress({address: accounts[0]});
    //     //setAccount(accounts?.length < 1 ? '' : accounts[0]);
    // })

	provider?.on('accountsChanged', accounts => {
		localStorage.setItem('address', accounts[0]);
		setAddress(accounts?.length < 1 ? '' : accounts[0]);
		addAddress(accounts[0]);
        if(accounts?.length > 1 )return;
        //setContract(null); 
	});

    if(connected === false){
        return(
            //section>div.slider>div.slide*3>img
            <div>
                <div className="text-xl font-bold">try to connect meta mask</div>
                <div>Wallet Address: (localStorage)</div>
                <div>Wallet Address: (redux persist)</div>
                <button className=" border border-black mx-2 px-3 py-1 rounded-xl" onClick={handleWalletConnection}>connect wallet</button>
            </div>
        );
    }

    return(
        //section>div.slider>div.slide*3>img
        <div>
            <div className="text-xl font-bold">try to connect meta mask</div>
            <div>Wallet Address: {`${currentAccount.substring(0, 15)}........${currentAccount.substring(25, currentAccount?.length)} `} (localStorage)</div>
            <div>Wallet Address: {`${walletAddress.substring(0, 15)}........${walletAddress.substring(25, walletAddress?.length)} `} (redux persist)</div>
			<div>Wallet Address: {`${address.substring(0, 15)}........${address.substring(25, address?.length)} `} (jotai atom)</div>
            <button className=" border border-black mx-2 px-3 py-1 rounded-xl" onClick={handleWalletConnection}>connect wallet</button>
            {/* <button className=" border border-black mx-2 px-3 py-1 rounded-xl" onClick={
                () =>{
                    localStorage.removeItem('address');
                    removeAddress();
                    //setAccount('');
                }
            }>remove wallet</button> */}
            <button onClick={handleGetContractData}>Click here</button>
        </div>
    );
}