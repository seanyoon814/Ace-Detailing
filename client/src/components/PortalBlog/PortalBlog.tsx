import "./PortalBlog.css";

import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import backend from "../../constants/backend";

const { apiUrl } = backend;

interface FormDataTarget extends EventTarget {
    elements: {
        title: HTMLInputElement,
        description: HTMLInputElement,
        image: HTMLInputElement
    }
}

async function addBlogPost(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const imageInput = event.currentTarget.elements.namedItem("image") as HTMLInputElement;
    const imageFile = imageInput.files?.[0];

    if (imageFile) {
        const filename = `${Date.now()}_${imageFile.name}`;
        formData.set("image", imageFile, filename);
    }

    try {
        await axios.post(`${apiUrl}/blog/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (error) {
        console.error("Error adding blog post:", error);
    }
}


function BlogForm() {
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