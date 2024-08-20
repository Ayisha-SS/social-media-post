 // Fetch the post data based on the model name
  // useEffect(() => {
  //   console.log('Model Name:', modelName);
  //   console.log('Post ID:',  id );

  //   const fetchPost = async () => {
  //     try {
  //       const apiUrl = modelName === 'createpost'
  //         ? `http://localhost:8000/api/v1/createpost/view/${ id }/`
  //         : `http://localhost:8000/api/v1/posts/view/${ id }/`;

  //         console.log("Fetching from URL:", apiUrl); // Log API URL

  //       const response = await axios.get(apiUrl);
  //       setViews(response.data.data);
  //     } catch (error) {
  //       console.error('Error fetching the post:', error);
  //     }
  //   };
  //   fetchPost();
  // }, [ id , modelName]);




    // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const token = Cookies.get('auth_token');

  //       const [postsResponse, createPostResponse] = await Promise.all([
  //         axios.get('http://localhost:8000/api/v1/posts/', {
  //           headers: { Authorization: `Bearer ${token}` }
  //         }),
  //         axios.get('http://localhost:8000/api/v1/createpost/', {
  //           headers: { Authorization: `Bearer ${token}` }
  //         })
  //       ]);

  //       const formattedCreatePostResponse = { data: createPostResponse.data };
  //       const allPosts = [...postsResponse.data.data, ...formattedCreatePostResponse.data];
  //       setPosts(allPosts);

  //     } catch (error) {
  //       console.error('Error fetching the posts:', error);
  //       setError(error);
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const token = Cookies.get('auth_token');
  
  //       const [postsResponse, createPostResponse] = await Promise.all([
  //         axios.get('http://localhost:8000/api/v1/posts/', {
  //           headers: { Authorization: `Bearer ${token}` }
  //         }),
  //         axios.get('http://localhost:8000/api/v1/createpost/', {
  //           headers: { Authorization: `Bearer ${token}` }
  //         })
  //       ]);
  
  //       const formattedCreatePostResponse = createPostResponse.data.map(post => ({
  //         ...post,
  //         source: 'createpost'
  //       }));
  //       const allPosts = [
  //         ...postsResponse.data.data.map(post => ({ ...post, source: 'posts' })),
  //         ...formattedCreatePostResponse
  //       ];
  
  //       setPosts(allPosts);
  
  //     } catch (error) {
  //       console.error('Error fetching the posts:', error);
  //       setError(error);
  //     }
  //   };
  
  //   fetchPosts();
  // }, []);
