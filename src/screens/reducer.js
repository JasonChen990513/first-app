import { useEffect, useState, useMemo, useRef, useReducer } from 'react';


// const initialState= {
// 	firstName: '', // The first name of the user
// 	 	lastName: '', // The last name of the user
// 	 	country: '',
// }
const reducer=(state, action)=>{
	switch(action.type){
		case 'add-form':
            console.log(action.payload);
			return{...state, ...action.payload};
		case 'reset-firstName':
			return {...state, firstName: ""};
		case 'reset-lastName':
			return {...state, lastName: ""};
		case 'reset-country':
			return {...state, country: ""};
		case 'add-default':{
			return {lastName: '123', firstName: "123", country: "123"};
		}
		case 'reset':
			return {firstName: "", lastName: "", country: ""};
		default:
			return state;
	}
}

function Appreducer() {
	const [names, setNames] = useState([]);
	const [name, setName] = useState('');

	/**
	 * The state for personal information.
	 * @type {Object}
	 * @property {string} firstName - The first name of the user.
	 * @property {string} lastName - The last name of the user.
	 * @property {string} country - The country of the user.
	 */
	// Initialize state for personal information
	// const [personalInfo, dispatch] = useReducer(userReducer((prevState, newState) => ({...prevState, ...newState})), {
	// 	firstName: '', // The first name of the user
	// 	lastName: '', // The last name of the user
	// 	Country: '', // The country of the user
	// });

	const [personalInfo, dispatch] = useReducer(reducer, {
		firstName: '', // The first name of the user
		lastName: '', // The last name of the user
		country: '', // The country of the user
	});


	const handleSubmit = e => {
		console.log(1);
		e.preventDefault();
		console.log(2);
		setNames(prev => [...prev, name]);
		console.log(3);
		console.log(names);
		console.log(4);
		setName('');
	};

	const handlePersonalInfo=(e, type)=>{
		const {name, value} = e.target;
        console.log(name);
        console.log(value);
		dispatch({type, payload:{[name]: value}})
		
	}

	const handleReset=()=>{
		dispatch({type: 'reset', payload:{[name]: ''}})
		
	}

	return (
		<div className='App'>
			
			<form onSubmit={handleSubmit} className='flex flex-col gap-2'>
				<section>
					<label>
				First Name: <input name='firstName' onChange={(e)=>handlePersonalInfo(e, 'add-form')} value={personalInfo.firstName} className=' bg-slate-200'/>
			</label>
				</section>
			<section>
				<label>
				Last Name: <input name='lastName'onChange={(e)=>handlePersonalInfo(e, 'add-form')} value={personalInfo.lastName} className=' bg-slate-200'/>
			</label>
			</section>
			<section>
				<label>
				Country: <input name='country'onChange={(e)=>handlePersonalInfo(e, 'add-form')} value={personalInfo.country} className=' bg-slate-200'/>
			</label>
			</section>
			<button className=' text-black text-start w-fit border-2 border-black'>Submit</button>
			</form>
			<button onClick={(e)=>handleReset(e, 'reset')} className=' bg-green-600 rounded-md m-2 px-1'> R Submit</button>
      <div>
    
      </div>
		</div>
	);
}

export default Appreducer;