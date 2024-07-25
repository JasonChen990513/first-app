import { useEffect, useState, useMemo, useRef, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//routing locatioon window.location.push(//): we dont do that

// react-router-dom
//yarn add react-router-dom

const initialState= {
	firstName: '', // The first name of the user
	 	lastName: '', // The last name of the user
	 	country: '',
}
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

function ClassRouter() {
	const [names, setNames] = useState([]);
	const [name, setName] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setLoading] = useState(false);
	const [photos, setPhotos] = useState([]);

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

	// useEffect(() => {
	// 	getPhotos();
	// }, []);

	// const getPhotos = async () => {
	// 	setLoading(true);
	// 	try {
	// 		const response = await fetch('https://jsonplaceholder.typicode.com/posts');
	// 		const data = await response.json();
	// 		setPhotos(data);
	// 		console.log(data);
	// 	} catch (error) {
	// 		const errorMessage = error.response.data.message ?? error.message;
	// 		setError(errorMessage);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// };

	// const handleChange = e => {
	// 	const { value } = e.target;
	// 	setName(value);
	// };

	const handleSubmit = e => {
		e.preventDefault();
		setNames(prev => [...prev, name]);
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
	
	// if (isLoading) return 
	// 	<p>loading...</p>;
	// if (error) return <p>{error}</p>;

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
				{/* <label>Add a ddName: </label>
				<input onChange={handleChange} name='nameList' value={name} />
				<button>Submit</button> */}
			</form>
			<button onClick={(e)=>handleReset(e, 'reset')} className=' bg-green-600 rounded-md m-2 px-1'> R Submit</button>
      <div>
    
      </div>
		</div>
	);
}

export default ClassRouter;