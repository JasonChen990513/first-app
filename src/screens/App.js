import React from 'react';
import { useState, useEffect, useMemo } from 'react';
//import './index.css';
import {Export1} from '../components/component.js';
import Export2 from '../components/component.js';
import Post from './Post.js';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Page1 from './Page1.js';
import Appreducer from './reducer.js';
import NotFound from './notfound.js';
import '../index.js';
import ClassRouter from '../ClassRouter.js';
import { createBrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
function App() {

	const user = useSelector((state)=>(state.user));
	console.log(user);
	
	return(
	//   <Router>
	// 	  <nav className='flex gap-2 mx-2'>
	// 		  <Link to= '/'>post</Link>
	// 		  <Link to = '/p1'>page1</Link>
	// 		  <Link to = '/reducer'>Reducer</Link>
	// 		  <Link to = '/router'>Router</Link>
	// 	  </nav>
	// 	  <Routes>
	// 		  <Route path='/' element={<Post/>}/>
	// 		  <Route path='/p1' element={<Page1/>}/>
	// 		  <Route path='/reducer' element={<Appreducer/>}/>
	// 		  <Route path='/router' element={<ClassRouter/>}/>
	// 		  <Route path='/*' element={<NotFound/>}/>
	// 	  </Routes>
	//   </Router>
	<div>
		<div>homepage</div>
		<div> {user.name} is your name and email is {user.email}</div>
		<div> Token is {user.token}</div>
	</div>


	);
  }


export default App;

// export default function App(){
//     const name = 'Jason';
//     return(
      
//       <div>
//         My name is:
//         <h1>{name} and now is {new Date().toLocaleTimeString()}</h1>
//         <input maxLength={5} autoFocus></input>
//         <meter optimum={100}></meter>
//         <Export1 />
//         <Export2 />

//       </div>
//     )     
  
// }


// function App(){
//   const [names, setNames] = useState([]);
//   const [name, setName] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [photo, setPhoto] = useState();
//   //const [obj, setObj] = useState({name: 'jason', age:25})
//   useEffect(()=>{
//     console.log('run effect');
//   },[]);

//   //const memoizedObj = useMemo(()=> obj, [obj])

//   const getPhoto = async() =>{
//     try{
//       const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//       const data = await response.json();
//       setPhoto(data);

//     }catch(error){
//       const errorMessage = error.response.data.message ?? error.Message;
//       setError(errorMessage)
//     }finally{
//       setIsLoading(false)
//     }
//   }

//   const handlechange = (e) =>{
//     const {value} = e.target;
//     setName(value);
//   }

//   const handleSubmit = (event) =>{
//     event.preventDefault();
//     console.log('pass')
//     //setNames(prev=>[...prev, name]);
//     setNames([...names, name]);
//     setName('');
//   }

//   if(isLoading) return<p>Loading</p>;
//   if(error) return <p>{error}</p>;

// 	return(
// 		<div>
// 			<form onSubmit={handleSubmit}>
//         <label>Add a Name:</label>
// 				<input onChange={handlechange} name='testing'/>
//         <button>Submit</button>
// 			</form>
//       <section>
//         <ui>
//           {names?.map(name=>(
//             <li>{name}</li>
//           ))}
//         </ui>
//       </section>
// 		</div>
// 	)
// }
// function App() {
// // 	const [names, setNames] = useState([]);
// // 	const [name, setName] = useState('');
// // 	const [error, setError] = useState('');
// // 	const [isLoading, setLoading] = useState(false);
// // 	const [photos, setPhotos] = useState([]);
// //   const [posts, setPosts] = useState([]);
// //   let data;

// // 	useEffect(() => {
// // 		getPhotos();
// // 	}, []);

// // 	const getPhotos = async () => {
// // 		setLoading(true);
// // 		try {
// // 			const response = await fetch('https://jsonplaceholder.typicode.com/posts');
// // 			data = await response.json();
// //       console.log( data);
// //       setPosts(data);
// // 			//setPhotos(data);
// // 		} catch (error) {
// // 			const errorMessage = error.response.data.message ?? error.message;
// // 			setError(errorMessage);
// // 		} finally {
// // 			setLoading(false);
// // 		}
// // 	};

// //   const renderAllGuide = posts?.map((data, index)=>{
// //     return(
// //       <div key={index}  className='flex flex-col gap-2'>
// //         <div>Post ID {data.id}</div>
// //         <div>User ID {data.userId}</div>
// //         <div>Title {data.title}</div>
// //       </div>
// //       );
// //   })

// 	// const handleChange = e => {
// 	// 	const { value } = e.target;
// 	// 	setName(value);
// 	// };

// 	// const handleSubmit = e => {
// 	// 	e.preventDefault();
// 	// 	setNames(prev => [...prev, name]);
// 	// 	setName('');
// 	// };

// 	// if (isLoading) return <p>loading...</p>;
// 	// if (error) return <p>{error}</p>;

// 	// return (
// 	// 	<div className='App'>
// 	// 		<form onSubmit={handleSubmit}>
// 	// 			<label>Add a Name: </label>
// 	// 			<input onChange={handleChange} name='nameList' value={name} />
// 	// 			<button>Submit</button>
// 	// 		</form>
// 	// 	</div>
// 	// );

//   return(
// 	// <div>
// 	// 	<div>
// 	// 		<button className=' border-2 border-black'> back</button>
// 	// 	</div>
// 	// 	<div className=' flex flex-col'>
//     //   		{renderAllGuide}
//     // 	</div>
// 	// </div>
// 	<Post/>

//   );
// }



//export default App;
//export name must be same
//but the call here can put what you want
 