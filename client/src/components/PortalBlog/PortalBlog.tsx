import "./PortalBlog.css";

import { ReactEventHandler, useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import backend from "../../constants/backend";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { useCheckTokenMutation } from "../../features/auth/authApiSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import httpClient from "../../features/httpClient";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice"; 
import { store } from "../../store";
const { apiUrl } = backend;

interface Post {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    createdAt: Date;
  }
  
interface FormDataTarget extends EventTarget {
    elements: {
        title: HTMLInputElement,
        description: HTMLInputElement,
        image: HTMLInputElement
    }
}


function BlogForm() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const result = await axios.get(`${apiUrl}/blog/`);
            const postsWithDate = result.data.map(post => ({
            ...post,
            createdAt: new Date(post.createdAt)
            }));
            setPosts(postsWithDate);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, []);
    const token = useSelector(selectCurrentToken);
    const [sendCheckToken] = useCheckTokenMutation();
    const [sendLogout, {isError}] = useSendLogoutMutation();
    const maxRetryAttempts = 1;
    async function authCheckBeforePost(formData:FormData, token: string, retries: number, id: FormDataEntryValue | null){
        try{
            await sendCheckToken(token);
            if(id !== null){
                console.log("Deleting post")
                const id = formData.get('postId');
                const response = await axios.delete(`${apiUrl}/blog/delete/${id}`,{headers:{'Authorization': `Bearer ${token}`}});
                toast.success("Blog post deleted successfully.");
            }else{
                console.log("Adding post")    
                const err = await axios.post(`${apiUrl}/blog/`, formData, {
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    }
                });
                toast.success("Blog post added successfully.");
            }

        } catch (error){
            console.log("error",error)
            console.log("error.response",error.response)
            if(error.response && error.response.status === 403 && retries < maxRetryAttempts){
                const newToken = selectCurrentToken(store.getState());
                authCheckBeforePost(formData, newToken, retries+1,id);
            } else {
                console.log("Error:", error);
                toast.error("Login Expired. Redirecting to login page...")
                sendLogout();
                navigate('/user');
            }
        }
    }
    
    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            // console.log("IN PORTAL BLOG Error checking token:", error);
            toast.error("Token Invalid. Please log in again.");
            navigate('/user');
        }
    },[token])

    async function addBlogPost(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    
        const formData = new FormData(event.currentTarget);
        const imageInput = event.currentTarget.elements.namedItem("image") as HTMLInputElement;
        const imageFile = imageInput.files?.[0];
    
        if (imageFile) {
            const filename = `${Date.now()}_${imageFile.name}`;
            formData.set("image", imageFile, filename);
        }
        // await sendCheckToken(token)
        authCheckBeforePost(formData, token, 0,null);
    }

    const deleteBlogPost = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const formData = new FormData(event.currentTarget);
        const id = formData.get('postId');
        // authCheckBeforePost(formData, token, 0,id);
        try {
            const response = await axios.delete(`${apiUrl}/blog/delete/${id}`, {headers:{'Authorization': `Bearer ${token}`}});
            console.log(response.data); // Assuming the response contains data
        } catch (error) {
            console.error('Error deleting blog post:', error);
        }
    };
    
    return (
            <div className="row justify-content-center" style={{marginTop:'10vh'}}>
                <div className="admin-containers col-4 pt-3 pb-3" style={{background:'#2b2c2e', borderRadius:'20px'}}>
                    <h1 className="paragraph-noanim instrument-sans">Add a Blog Post</h1>
                    <form onSubmit={addBlogPost} encType="multipart/form-data">
                        <label htmlFor="title">
                            Title:<br/> <textarea name="title" placeholder="Enter title.." />
                        </label>
                        <br />
                        <label htmlFor="description">
                            Description:<br/> <textarea className="imageField" name="description" placeholder="Enter description.."/>
                        </label>
                        <br />
                        <label htmlFor="image">
                            Image:<br/> <input name="image" type="file" accept="image/*" />
                        </label>
                        <br/>
                        <button className="btn btn-danger"type="submit">Submit</button>
                    </form>
                </div>
                <div className="col-4 pt-3 pb-3 ml-3" style={{background:'#2b2c2e', borderRadius:'20px'}}>
                    <h1 className="paragraph-noanim instrument-sans">Delete a Blog Post</h1>
                    <form onSubmit={deleteBlogPost} encType="multipart/form-data">
                        <select name="postId">
                            {posts.map(post => (
                                <option key={post._id} value={post._id}>{post.title}</option>
                            ))}
                        </select><br/>
                        <button type="submit" className="btn btn-danger">Delete</button>
                    </form>
                </div>
            </div>
    );
}

export default BlogForm;