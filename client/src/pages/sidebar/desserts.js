import React from 'react';

function Desserts() {
  const { loading, data } = useQuery(QUERY_USERS);
  const users = data?.users || [];
  const { loading: postsLoading, data: postsData } = useQuery(FETCH_POSTS_QUERY);

  return (
    <div> this is the desserts page </div>
  )
};


export default Desserts;