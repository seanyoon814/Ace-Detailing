import "./PortalBlog.css";

import { useEffect } from "react";
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

interface FormDataTarget extends EventTarget {
    elements: {
        title: HTMLInputElement,
        description: HTMLInputElement,
        image: HTMLInputElement
    }
}


function BlogForm() {
    const token = useSelector(selectCurrentToken);
    const [sendCheckToken] = useCheckTokenMutation();
    const [sendLogout, {isError}] = useSendLogoutMutation();
    const maxRetryAttempts = 1;
    async function authCheckBeforePost(formData:FormData , token: string, retries: number){
        try{
            await sendCheckToken(token);
            
            const err = await axios.post(`${apiUrl}/blog/`, formData, {
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            toast.success("Blog post added successfully.");
        } catch (error){
            if(error.response && error.response.status === 403 && retries < maxRetryAttempts){
                const newToken = selectCurrentToken(store.getState());
                authCheckBeforePost(formData, newToken, retries+1);
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
        authCheckBeforePost(formData, token, 0);
    }
    
    
    return (
        <div className="container-fluid">
            <div className="row justify-content-center" style={{marginTop:'10vh'}}>
                <div className="col-12">
                    <form onSubmit={addBlogPost} encType="multipart/form-data">
                        <label htmlFor="title">
                            Title: <input name="title" type="text" placeholder="" />
                        </label>
                        <br />
                        <label htmlFor="desc">
                            Description: <input name="description" type="text" placeholder="" />
                        </label>
                        <br />
                        <label htmlFor="image">
                            Image: <input name="image" type="file" accept="image/*" />
                        </label>
                        <br/>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BlogForm;