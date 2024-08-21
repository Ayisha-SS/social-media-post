import { createContext, useState } from 'react';

const LikedPostsContext = createContext();

const LikedPostsProvider = ({ children }) => {
  const [likedPosts, setLikedPosts] = useState({});
  const [likeCount, setLikeCount] = useState(0)

  // const handleLike = (postId) => {
  //   setLikedPosts((prevLikedPosts) => ({
  //     ...prevLikedPosts,
  //     [postId]: !prevLikedPosts[postId],
  //   }));
  //   setLikeCount((prevLikeCount) => prevLikeCount + (likedPosts[postId] ? -1 : 1));
  // };
  // const handleLike = (postId) => {
  //   setLikedPosts((likedPosts) => ({ // renamed the parameter to likedPosts
  //     ...likedPosts,
  //     [postId]: !likedPosts[postId],
  //   }));
  //   setLikeCount((prevCount) => prevCount + (likedPosts[postId] ? -1 : 1));
  // };

  const handleLike = (postId) => {
    setLikedPosts((prevLikedPosts) => {
      const currentLikes = prevLikedPosts[postId] || 0;
      return {
        ...prevLikedPosts,
        [postId]: currentLikes === 0 ? 1 : 0,
      };
    });
  };

  return (
    <LikedPostsContext.Provider value={{ likedPosts,  handleLike }}>
      {children}
    </LikedPostsContext.Provider>
  );
};

export { LikedPostsProvider, LikedPostsContext };