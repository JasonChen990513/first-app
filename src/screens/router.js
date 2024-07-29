import { createBrowserRouter,NavLink, Outlet  } from "react-router-dom";
import Post from "./Post";
import App from "./App";
import SinglePost from "./singlePost";
import Appreducer from "./reducer";
import Login from "./Login";
import Counter from "./Counter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import '../index.css';
import Page1 from "./Page1";
import Next from "./next";
import ConnectContract from "./connectContract";


const queryClient = new QueryClient();

export const Root = () => {
	return (
		<header>
			<nav className=" flex gap-2 justify-center">
				<NavLink to='/homepage' style={({ isActive }) => (isActive ? { color: 'red' } : {})}>
					Home
				</NavLink>
				<NavLink to='/posts' style={({ isActive }) => (isActive ? { color: 'red' } : {})}>
					Posts
				</NavLink>
        <NavLink to='/reducer' className={({ isActive }) => (isActive ? 'text-red-500' : '')}>
					Reducder
				</NavLink>
        <NavLink to='/login' className={({ isActive }) => (isActive ? 'text-red-500' : '')}>
					Login
				</NavLink>
        <NavLink to='/counter' className={({ isActive }) => (isActive ? 'text-red-500' : '')}>
					Counter
				</NavLink>
        <NavLink to='/p1' className={({ isActive }) => (isActive ? 'text-red-500' : '')}>
					Meta Mask
				</NavLink>
        <NavLink to='/connectContract' className={({ isActive }) => (isActive ? 'text-red-500' : '')}>
          ConnectContract
				</NavLink>
        <NavLink to='/next' className={({ isActive }) => (isActive ? 'text-red-500' : '')}>
          Next
				</NavLink>
			</nav>
			<Outlet />
		</header>
	);
};

 const Router = createBrowserRouter([
    {
      path: "/",
      element: <QueryClientProvider client={queryClient}>
         <Root />
      </QueryClientProvider>,
      children:[
        {
          index: true,
          element: <App />,
        },
        {
          path: "posts",
          element: <Post />,
        },
        {
          path: "counter",
          element: <Counter />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "homepage",
          element: <App />,
        },
        {
          path: "reducer",
          element: <Appreducer />,
        },
        {
          path: "p1",
          element: <Page1 />,
        },
        {
          path: "connectContract",
          element: <ConnectContract />,
        },
        {
          path: "next",
          element: <Next />,
        },
        {
          path: '/posts/:postId',
          element: <SinglePost />,
          loader: async ({ request, params }) => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`, {
              signal: request.signal,
            });
            const post = await response.json();
            return post;
          },
        },
      ]
    },

  ]);


  export default Router;