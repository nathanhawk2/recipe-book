// Node Modules
import React from 'react';
import { useQuery } from '@apollo/client';
// Utilities
// import AuthService from '../utils/auth';
import { QUERY_USERS } from '../utils/queries';
// Components
import { Grid, Card } from 'semantic-ui-react';
import { FETCH_POSTS_QUERY } from '../utils/queries';
import Auth from '../utils/auth'


const Home = () => {
  const { loading, data } = useQuery(QUERY_USERS);
  // eslint-disable-next-line
  const users = data?.users || [];
  // eslint-disable-next-line
  const { loading: postsLoading, data: postsData } = useQuery(FETCH_POSTS_QUERY);

  // const search = () => {
  //   var input, filter, li, a, i, txtValue;
  //   input = document.getElementById('searchInput');
  //   filter = input.value.toUpperCase();

  //   for (i = 0; i < li.length; i++) {
  //     a = li[i].getElementsByTagName("a")[0];
  //     txtValue = a.textContent || a.innerText;
  //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
  //       li[i].style.display = "";
  //     } else {
  //       li[i].style.display = "none";
  //     }
  //   }
  // };



  const posts = postsData?.getPosts || [];
  return (
    <main className='col' style={{ margin: '10px', backgroundColor: '' }}>
      <div className="" style={{ display: 'flex', justifyContent: 'center' }}></div>
      <div style={{ display: 'flex', fontFamily: 'Josefin Sans, sansSerif, semiBold', fontSize: '50px', textDecoration: '', textTransform: 'uppercase' }} className='container'></div>
      <div>
        <Grid columns={4}>
          <Grid.Row className="page-title">
            <h1 className="recent">All Recipes</h1>
          </Grid.Row>
          <Grid.Row>
            {loading ? (
              <h1>Loading posts..</h1>
            ) : (
              <div className='cardContainer'>
                {posts.map((post) => (
                  <Card fluid key={post.id} id='card'>
                    <Card.Content>
                      <Card.Header className='postTitle'>
                        {post.title}
                      </Card.Header>
                        <div className='postUser'>
                          from {Auth.getProfile().data.username}
                        </div>
                      <Card.Description className='postBody'>
                        {post.body}
                      </Card.Description>
                    </Card.Content>
                  </Card>
                ))}
              </div>
            )}
          </Grid.Row>
        </Grid>
      </div>
    </main>
  );
};

export default Home;
