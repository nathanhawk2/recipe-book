import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../../utils/queries';
import { FETCH_POSTS_QUERY } from '../../utils/queries';

function Snacks() {
  const { loading, data } = useQuery(QUERY_USERS);
  const users = data?.users || [];
  const { loading: postsLoading, data: postsData } = useQuery(FETCH_POSTS_QUERY);

  return (
    <div> this is the snacks page </div>
  )
};


export default Snacks;