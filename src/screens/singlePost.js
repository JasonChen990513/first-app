import { useEffect, useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";

const SinglePost = () =>{

    const { userId, id, title, body } = useLoaderData();

    return(
        <div className='flex flex-col gap-3'>
            <div>userId: {userId}</div>
            <div>PostId: {id}</div>
            <div>{title}</div>
            <div>{body}</div>
        </div>
    );

}

export default SinglePost;

