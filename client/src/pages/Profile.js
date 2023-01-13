// Node Modules
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// Utilities
import Auth from '../utils/auth';
import { FETCH_USER_POST_QUERY, QUERY_USERS, QUERY_USER, QUERY_ME, FETCH_POSTS_QUERY } from '../utils/queries';
// Components
// eslint-disable-next-line
import UserList from '../components/UserList';
import { Card } from 'semantic-ui-react'




const Profile = () => {
  const { id } = useParams();

  const { loading: postsLoading, data: postsData } = useQuery(FETCH_POSTS_QUERY);
  const posts = postsData?.getPosts || [];
  // Get current user
  const { loading, data, error } = useQuery(id ? QUERY_USER : QUERY_ME, {
    variables: { id },
  });

  // Get a list of all users
  // eslint-disable-next-line¸
  const { usersLoading, data: usersData } = useQuery(QUERY_USERS);

  const user = data?.me || data?.user || {};
  // eslint-disable-next-line
  const users = usersData?.users || [];

  if (error) console.log(error);
  if (postsLoading) {
    return (
      <div>Loading Posts...</div>
    )
  }

  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === id) {
    return <Navigate to="/me" replace />;
  }

  if (loading) {
    return <h4>Loading...</h4>;
  }

  if (!user.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  
  // function ProfilePosts (props) {
  //   const { userPosts, data: usersPosts } = useQuery(FETCH_USER_POST_QUERY)
  //   const userPost = usersPosts?.GetUserPosts || [];
        
  //   return (
  //     <div className='cardContainer'>
  //       {data.posts.map((post) => (
  //         <Card fluid key={post._id} id='card'>
  //           <Card.Content>
  //           <Card.Header>{post.title}</Card.Header>
  //             <Card.Description></Card.Description>
  //           </Card.Content>
  //           {post.body}
  //         </Card>
  //       ))}
  //     </div>
  //   );
  // }

  const renderCurrentUserInfo = () => {
    if (id) return null;
    return (
      <div >
        <ul className='m-3 col' style={{ padding: '6px', listStyle: "none" }}>
          <li style={{ textTransform: 'uppercase' }}>Username: {user.username}</li>
          <li style={{ textTransform: 'uppercase' }}>Email: {user.email}</li>
        </ul>
      </div>
    )
  }

  const renderUserPosts = () => {
    return (
      <div className='cardContainer'>
        {posts.map((post) => (
          <Card fluid key={user.id} id='card'>
            <Card.Content>
              <Card.Header className='postTitle'>{post.title}</Card.Header>
              <Card.Description></Card.Description>
              <Card.Meta></Card.Meta>
            </Card.Content>
            {post.body}
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className='m-3'>
      <div className=' container m-3' style={{ margin: '5px' }}>
        <h2 className='container ' tyle={{ padding: '5px' }}>
          Viewing {id ? `${user.username}'s` : 'your'} profile
        </h2>
        {renderCurrentUserInfo()}
      </div>
      <div className='' style={{}}>
        <h1 className='' style={{ display: 'flex', justifyContent: 'center' }}>Bio</h1>
        <p style={{ display: 'inline-block', justifyContent: 'center', textAlign: 'center', padding: '20px', marginLeft: '500px', marginRight: '500px', backgroundColor: 'white', borderRadius: '8px' }}></p>
      </div>
      <div>
        <h1 style={{ display: 'flex', justifyContent: 'center', margin: '30px' }}>Recent Posts</h1>
        <div>
          {renderUserPosts()}
          {/* post should render here */}
          {/* {ProfilePosts()} */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
