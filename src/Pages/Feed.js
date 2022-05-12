import React, { useState, useEffect } from 'react';
import '../App.css';

//API
import { getPostsFromAPi } from '../Services/Api';

//Components
import Post from '../Components/Post';
import Categories from '../Components/Categories';

function Feed() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);
  
  const getPosts = async () => {
    const response = await getPostsFromAPi();
    if(response.data.error){
      console.log(response.data.error)
    }else{
      setPosts(response.data)
    }
  };

  const categoryFilter = async (category) => {
    const response = await getPostsFromAPi();
    console.log(category)
    const updatedPosts = response.data.filter(post => post.category === String(category));
    setPosts(updatedPosts)
  }

  return (
    <div className="p-5 mt-3">
      <div className="my-4">
        <Categories  categoryFilter={categoryFilter}  />
      </div>
      <div className="d-flex flex-column gap-2">
        {
          posts.map((post) =>
          <Post post={post} key={post.id}/>
          )
        }
      </div>
    </div>
  )
}

export default Feed;
