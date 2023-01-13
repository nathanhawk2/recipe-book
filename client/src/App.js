import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import Create from './pages/CreatePost'
import Post from './pages/Post';

// sidebar to navigate to different pages
import Apps from './pages/sidebar/appetizers'
import Breakfast from './pages/sidebar/breakfast'
import Lunch from './pages/sidebar/lunch'
import Snacks from './pages/sidebar/snacks'
import Dinner from './pages/sidebar/dinner'
import Desserts from './pages/sidebar/desserts'
import Cocktails from './pages/sidebar/cocktails'

import './index.css'

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className='vh-100'>
      <ApolloProvider client={client} style={{}}>
        <Router>
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              {/* put in between the name? */}
              {/* this is where the side bar needs to show up to direct, this is the layout page */}
              <Route path="/login" element={<Login />} ></Route>
              <Route path="/signup" element={<Signup />} ></Route>
              <Route path="/create" element={<Create />} ></Route>
              <Route path="/me" element={<Profile />} ></Route>
              <Route path="/users/:id" element={<Profile />} ></Route>
              <Route path='/posts/:id' element={<Post />} ></Route>
              <Route path='/appetizers' element={<Apps />} ></Route>
              <Route path='/breakfast' element={<Breakfast />} ></Route>
              <Route path='/lunch' element={<Lunch />} ></Route>
              <Route path='/snacks' element={<Snacks />} ></Route>
              <Route path='/dinner' element={<Dinner />} ></Route>
              <Route path='/desserts' element={<Desserts />} ></Route>
              <Route path='/cocktails' element={<Cocktails />} ></Route>
            </Routes>
            <Footer />
          </>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;