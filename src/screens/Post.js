// import React from 'react';
// import { useState, useEffect } from 'react';
// import '../index.css';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import apiCall from '../util/apiCall'
// import { useQuery } from '@tanstack/react-query';

// function Post() {
// 	const [error, setError] = useState('');
// 	const [isLoading, setLoading] = useState(false);
//     const [posts, setPosts] = useState([]);
//     //const [homepage, setHomepage] = useState(true);
//     const [displayPost, setDisplayPost] = useState(<div>default</div>)
//     let postData;
//     let singlePost = <div>default</div>;

//     const {isPending, isError, data, Error, status} = useQuery({
//         queryKey: 'get-post',
//         queryFn: ()=> apiCall.get('/posts'),
//     });
//     if (isPending) {
//         console.log('loading');
//     }

//     if (isError) {
//         console.log(Error.message);
//     }
//     console.log('this is useQuery data');
//     console.log(data?.data);
//     console.log(status);
//     console.log(isPending);
//     //testing purpose
//     // console.log(singlePost.props.children);
//     // console.log(displayPost.props.children);
//     // console.log(singlePost.props.children === displayPost.props.children)
//     // const isHomepage = singlePost.props.children === displayPost.props.children;

// 	useEffect(() => {
// 		getposts();
// 	}, []);

// 	const getposts = async () => {
// 		setLoading(true);
// 		try {
// 			const response = await fetch('https://jsonplaceholder.typicode.com/posts');
// 			postData = await response.json();
//             const postsas = await apiCall.get('/posts');
//             // console.log(postsas);
//             // console.log(postData);
//             setPosts(postsas.data);
// 			//setPhotos(data);
// 		} catch (error) {
// 			const errorMessage = error.response.data.message ?? error.message;
// 			setError(errorMessage);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

//     const handleButtonClick = () =>{
//         setDisplayPost(<div>default</div>);
//         //setHomepage(true);
//     }
//     //get the target post and display it
//     const  handlePostClick = async (id) =>{
//         let post;
//         try {
//             setLoading(true);
// 			const response = await fetch('https://jsonplaceholder.typicode.com/posts/' + id);
// 		    post = await response.json();
//             console.log(post);
// 			//setPhotos(data);
// 		} catch (error) {
// 			const errorMessage = error.response.data.message ?? error.message;
// 			setError(errorMessage);
// 		} finally {
// 			setLoading(false);
// 		}
//         console.log(post);
//         singlePost = 
//             <div className='flex flex-col gap-3'>
//                     <div>userId: {post.userId}</div>
//                     <div>PostId: {post.id}</div>
//                     <div>{post.title}</div>
//                     <div>{post.body}</div>
//             </div>;

//         setDisplayPost(singlePost);
//         //setHomepage(false);
//     }
//     //display all post id and title
//     const renderAllGuide = posts?.map((data, index)=>{
//         return(
//         <div key={index}  className=' cursor-pointer' onClick={()=>{handlePostClick(data.id)}}>
//             <Link to={`/posts/${data.id}`} className='flex gap-2'>
//                 <div>Post ID {data.id}</div>
//                 <div>Title {data.title}</div>
//             </Link>
//         </div>
//         );
//     })

   

//     if (isLoading) return <p>loading...</p>;
//     if (error) return <p>{error}</p>;

//     //according to the homepage to decide which page should be display
//     // return(
//     //     <div>
//     //         <div>
//     //             <button className=' border-2 border-black' onClick={()=>{handleButtonClick()}}> back</button>
//     //         </div>
//     //         {
//     //             homepage && 
//     //             <div>

//     //                 <div className=' flex flex-col'>
//     //                     {renderAllGuide}
//     //                 </div>
//     //             </div>
//     //         }
//     //         {
//     //             !homepage && <div>{displayPost}</div>
//     //         }
//     //     </div>
//     // );
//     return(
//         <div>
//             <div>
//                 <button className=' border-2 border-black' onClick={()=>{handleButtonClick()}}> back</button>
//             </div>
//             <div className=' flex flex-col'>
//                 {renderAllGuide}
//             </div>
//             {/* {
//                 isHomepage && 
//                 <div>

//                     <div className=' flex flex-col'>
//                         {renderAllGuide}
//                     </div>
//                 </div>
//             }
//             {
//                 !isHomepage && <div>{displayPost}</div>
//             } */}
//         </div>
//     );
// }

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import apiCall from '../util/apiCall';

function Post() {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const queryClient = useQueryClient();

	const postMutation = useMutation({
		mutationFn: body => apiCall.post('/posts', body),
		mutationKey: 'create-post',
		onSuccess: () => {
			queryClient.refetchQueries('get-posts');
			setBody('');
			setTitle('');
		},
		onError: error => {
			alert(error.response?.data?.message ?? error?.message);
		},
	});

	const { data, isLoading, error, isError } = useQuery({
		queryKey: ['get-posts'],
		queryFn: () => apiCall.get('/posts'),
		retry: 0,
		refetchOnWindowFocus: false,
	});

	const errorMessage = error?.response?.data?.message ?? error?.message;


	const handleSubmit = e => {
		e.preventDefault();
		postMutation.mutate({ body, title, userId: 1 });
	};

	if (isLoading) return <p>loading...</p>;
	if (isError) return <p>{errorMessage}</p>;

	return (
		<section className='App'>
			<h1>Create a Post</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Title
					<input value={title} name='title' onChange={e => setTitle(e.target.value)} className='border'/>
				</label>
				<br />
				<label>
					Post
					<textarea value={body} name='body' onChange={e => setBody(e.target.value)} className='border'></textarea>
				</label>
				<br />
				<button disabled={postMutation.isPending} className='border-2 border-black rounded-lg px-2'> {postMutation.isPending ? 'Creating...' : 'Create Post'}</button>
			</form>
			<h1 className='heading'>List of Posts</h1>
			<ol className='list'>
				{data?.data?.length > 0 &&
					data?.data?.map(({ title, id }) => (
						<li key={id}>
							<Link to={`/posts/${id}`}>{id}. {title}</Link>
						</li>
					))}
			</ol>
		</section>
	);
}


export default Post;