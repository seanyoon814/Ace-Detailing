import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import httpClient from '../../features/httpClient';
import backend from '../../constants/backend';

interface Post {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
}

const { apiUrl } = backend;

function AdminBlog(): JSX.Element {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await httpClient.get<Post[]>('http://localhost:5000/blog/');
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

  return (
    <div>
      <div id='hidden'></div>
      <Header />
      <div className='container-fluid' style={{marginTop: '30vh'}}>
        {posts.map(post => (
            <div key={post._id} className='row justify-content-center' style={{borderTop:'1px solid white', borderBottom:'1px solid white'}}>
                <div className='col-4 text-center'>
                    {post.imageUrl? (
                        <img src={post.imageUrl} className='img-fluid'></img>
                    ) : <div>&nbsp;</div>}
                </div>
                <div className='col-8 text-center'>
                    <div className='col-12'>
                        <h1 className='header garmond'><i>{post.title}</i></h1>
                        <p className='paragraph-noanim instrument-sans'>{post.createdAt.toLocaleString()}</p>
                    </div>
                    <p className='paragraph-noanim insturment-sans'>{post.description}</p>
                </div>
            </div>
        ))}
        
      </div>
      <Footer />
    </div>
  );
}

export default AdminBlog;
