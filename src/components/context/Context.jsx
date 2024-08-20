import { createContext, useState } from 'react';

const LikedPostsContext = createContext();

const LikedPostsProvider = ({ children }) => {
  const [likedPosts, setLikedPosts] = useState({});

  const handleLike = (postId) => {
    setLikedPosts((prevLikedPosts) => ({
      ...prevLikedPosts,
      [postId]: !prevLikedPosts[postId],
    }));
  };

  return (
    <LikedPostsContext.Provider value={{ likedPosts, handleLike }}>
      {children}
    </LikedPostsContext.Provider>
  );
};

export { LikedPostsProvider, LikedPostsContext };