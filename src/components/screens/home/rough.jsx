


// useEffect(() => {
//     if (location.state?.newPost) {
//       setPosts((prevPosts) => [...prevPosts, location.state.newPost]);
//     } else {
//       axios.get('http://localhost:8000/api/v1/posts/')
//         .then(response => {
//           setPosts(response.data.data);
//         })
//         .catch(error => {
//           console.error('Error fetching the posts:', error);
//         });
//     }
//   }, [location]);



    // useEffect(() => {
  //   axios.get('http://localhost:8000/api/v1/posts/')
  //     .then(response => {
  //       setPosts(response.data.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching the posts:', error);
  //     });
  // }, []);


  // const fetchPosts = async () => {
  //   try {
  //     const response = await axiosInstance.get('http://localhost:8000/api/v1/createpost/', {
  //       params: {
  //         created_by: Cookies.get('username'), // or any other way to get the current user's username
  //       },
  //     });
  //     console.log('API Response:', response.data);
  //     setPosts(response.data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('Error fetching posts:', error);
  //     console.error('Error response:', error.response);
  //     setLoading(false);
  //   }
  // };