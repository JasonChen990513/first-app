import { useAtom } from 'jotai';
import { connectWallet, getContract } from '../util/contract';
import { accountAtom, contractAtom } from '../atoms/contract';
import { useEffect, useState } from 'react';
import { useSDK } from "@metamask/sdk-react"; 


// async function testingRegister(){
//     const {signer} = await connectWallet();
//     const writeContract = getContract(signer);
//     //await contract.register();
//     try{
//         await writeContract.register();
//     } catch(error){
//         //console.log(error);
//         alert(error);
//     }

// }
//testingRegister();

function ConnectContract(){
    const [address, setAddress] = useAtom(accountAtom);
    const [contract, setContract] = useAtom(contractAtom);
    const [registerList, setRegisterList] = useState([]);
    const [nomineeList, setNomineeList] = useState([]);
    const [owner, setOwner] = useState('');
    const [stage, setStage] = useState('');
    const [result, setResult] = useState('');
    const [renew, setRenew] = useState(false);
    const [getVote, setGetVote] = useState('');
    const { provider } = useSDK();

    useEffect(()=>{
        async function ConnectWellet(){
            //connect to the voting contract
            let writeContract;
            try{
                const {account, signer} = await connectWallet();
                writeContract = getContract(signer);
                //console.log(account);
                setAddress(account);
                setContract(writeContract);
            } catch(error){
                console.error(error?.message)
            }

            try {
                setOwner(await writeContract.owner()); 
            } catch (error) {
                alert(error)
            }

            //get the stage
            try {
                if(await writeContract.registerStage()){
                    setStage('Register');
                }else if(await writeContract.nominateStage()){
                    setStage('Nominate');
                }else if(await writeContract.voteStage()){
                    setStage('Voting');
                }
            } catch (error) {
                
            }


            // get the register list 
            let Registerlist;
            try{
                Registerlist = await writeContract.getRegisterAcc();
            } catch(error){
                alert(error);
            }

            // get the register list 
            let Nominatedlist;
            try{
                Nominatedlist = await writeContract.getNominatedAcc();
            } catch(error){
                //console.log(error);
                alert(error);
            }

            //get winer
            try{
                const Winer = await writeContract.getWiner();
                const vote = await writeContract.highestVote();
                setResult(Winer);
                //console.log(' highest vote ' + vote)
                setGetVote(vote.toString());
            } catch(error){
                //console.log(error);
                alert(error);
            }



            // Listen to the event
            const eventListener = (winerAddress) => {
                setResult(winerAddress.toString());
                setRenew(!renew);
            };

            const stageEventListener = (Stage) => {

                console.log('this is value')
                console.log(Stage)
                if(Stage.toString() === 'toNominateStage'){
                    console.log('Now is Nominate Stage')
                }
                if(Stage.toString() === 'toVoteStage'){
                    console.log('Now is Voting Stage')
                }
                
                setRenew(!renew);
            };

            //set the event listener
            writeContract.on('showWiner', eventListener);
            writeContract.on('systemInfo', stageEventListener);

            //set the info from smart contrat
            setRegisterList(Registerlist);
            setNomineeList(Nominatedlist);


            // Clean up the event listener
            return () => {
                writeContract.off('showWiner', eventListener);
                writeContract.off('systemInfo', stageEventListener);
            };
        }
        


        ConnectWellet();
        //GetRegisterList();
    },[renew]);

    //call the smart contract function
    const register = async() =>{
        await contract.register();
        try{
            await contract.register();
        } catch(err){
            console.log(err);
            //alert(err);
        }
    }

    // get the register list information
    const GetRegisterList = async() =>{
        let list;
        try{
            list = await contract.getRegisterAcc();
        } catch(error){
            //console.log(error);
            alert(error);
        }
       setRegisterList(list)
    }

    // get the nominate list information    
    const NominateeList = async() =>{
        let list;
        try{
            list = await contract.getNominatedAcc();
        } catch(error){
            //console.log(error);
            alert(error);
        }
        setNomineeList(list)
    }

    //call smart contract nominate function
    const Nominate = async(index) =>{
        try{
            await contract.nominate(registerList[index]);
            console.log(registerList[index])
        } catch(error){
            //console.log(error);
            alert(error);
        }
    }

    //call smart contract voting function
    const Vote = async(index) =>{
        try{
            await contract.vote(nomineeList[index]);
            console.log(nomineeList[index])
        } catch(error){
            //console.log(error);
            alert(error);
        }
    }

    //call smart contract function to change to nominate stage 
    const ToNominate = async() =>{
        try {
            await contract.toNominateStage();
        } catch (error) {
            alert(error);
        }
       
    }
    //call smart contract function to change to voting stage 
    const ToVoting = async() =>{
        try {
            await contract.toVoteStage();
        } catch (error) {
            alert(error);
        }
    }
    // call reset function
    const Reset = async() =>{
        //await contract.reset();
        try {
            await contract.reset();
        } catch (error) {
            console.log(error.message)
        }
    }
    // when the wallet change, reset the address and refresh the page
    provider?.on('accountsChanged', accounts => {
		localStorage.setItem('address', accounts[0]);
		setAddress(accounts?.length < 1 ? '' : accounts[0]);
        setRenew(!renew);
	});

    

    return(
    <div className='p-3'>
        <div>Connect to Contract</div>
        <div>Owner is {owner}</div>    
        <div>Stage is {stage}</div>
        <div>Current user address is {address}</div>

        <section>
            <div>-------------------------------------------------------------</div>
            <div>
                { (stage === "Register") && <div>
                    <button className='  border-2 border-black rounded-2xl px-2 py-1' onClick={register}>Register</button>
                    <div>Register List</div>
                    <div>
                        <ul>
                        {registerList.length === 0 ? (
                        <li>No addresses found</li>
                            ) : (
                                registerList.map((address, index) => (
                                <li key={index}>{address}</li>
                            ))
                            )}
                        </ul>
                    </div>
                    <button className='  border-2 border-black rounded-2xl px-2 py-1' onClick={GetRegisterList}>Get Register list </button>
                </div> }
                { (stage === "Nominate") && <div>
                    <div>Choose who to be nominees</div>
                    <div>
                        <ul className=' flex gap-3'>
                        {registerList.length === 0 ? (
                        <li>No registed addresses found</li>
                            ) : (
                                registerList.map((address, index) => (
                                <button key={index} className='  border-2 border-black rounded-2xl px-2 py-1' onClick={()=>{Nominate(index)}}>{index+1}. {address}</button>
                            ))
                            )}
                        </ul>
                    </div>
                    <div>Nominated List</div>
                    <div>
                        <ul>
                        {nomineeList.length === 0 ? (
                        <li>No addresses found</li>
                            ) : (
                                nomineeList.map((address, index) => (
                                <li key={index}>{address}</li>
                            ))
                            )}
                        </ul>
                    </div>
                    <button className='  border-2 border-black rounded-2xl px-2 py-1' onClick={NominateeList}>Get Nominated list </button>
                </div> }
                { (stage === "Voting") && <div>
                    <div>Vote to who?</div>
                    <div>
                        <ul className=' flex gap-3'>
                        {nomineeList.length === 0 ? (
                        <li>No registed addresses found</li>
                            ) : (
                                nomineeList.map((address, index) => (
                                <button key={index} className='  border-2 border-black rounded-2xl px-2 py-1' onClick={()=>{Vote(index)}}>{index+1}. {address}</button>
                            ))
                            )}
                        </ul>
                    </div>
                </div> }
            </div>
            <div>-------------------------------------------------------------</div>
        </section>
        <br/>
        <br/>
        <p>below is for testing</p>
        <button className='  border-2 border-black rounded-2xl px-2 py-1' onClick={register}>Register</button>
        <div>Register List</div>
        <div>
            <ul>
            {registerList.length === 0 ? (
            <li>No addresses found</li>
                ) : (
                    registerList.map((address, index) => (
                    <li key={index}>{address}</li>
                ))
                )}
            </ul>
        </div>
        <button className='  border-2 border-black rounded-2xl px-2 py-1' onClick={GetRegisterList}>Get Register list </button>
        <br/>
        <br/>
        <div>Choose who to be nominees</div>
        <div>
            <ul className=' flex gap-3'>
            {registerList.length === 0 ? (
            <li>No registed addresses found</li>
                ) : (
                    registerList.map((address, index) => (
                    <button key={index} className='  border-2 border-black rounded-2xl px-2 py-1' onClick={()=>{Nominate(index)}}>{index+1}. {address}</button>
                ))
                )}
            </ul>
        </div>
        <div>Nominated List</div>
        <div>
            <ul>
            {nomineeList.length === 0 ? (
            <li>No addresses found</li>
                ) : (
                    nomineeList.map((address, index) => (
                    <li key={index}>{address}</li>
                ))
                )}
            </ul>
        </div>
        <button className='  border-2 border-black rounded-2xl px-2 py-1' onClick={NominateeList}>Get Nominated list </button>

        <br/>
        <br/>
        <div>Vote to who?</div>
        <div>
            <ul className=' flex gap-3'>
            {nomineeList.length === 0 ? (
            <li>No registed addresses found</li>
                ) : (
                    nomineeList.map((address, index) => (
                    <button key={index} className='  border-2 border-black rounded-2xl px-2 py-1' onClick={()=>{Vote(index)}}>{index+1}. {address}</button>
                ))
                )}
            </ul>
        </div>


        <br/>
        <br/>
        <div className='flex gap-2'>
            <button className='  border-2 border-black rounded-2xl px-2 py-1' onClick={ToNominate}>To Nominate Stage</button>
            <button className='  border-2 border-black rounded-2xl px-2 py-1' onClick={ToVoting}>To Voting Stage</button>
            <button className='  border-2 border-black rounded-2xl px-2 py-1' onClick={Reset}>Reset</button>
        </div>
        
        <br/>
        <br/>
        <div>winer is {result} get {getVote} votes</div>
        
    </div>

    )
}

export default ConnectContract;