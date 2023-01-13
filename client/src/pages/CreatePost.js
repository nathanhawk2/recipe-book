import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../utils/mutations";
import auth from "../utils/auth";

export default function CreatePost() {
  const [CreatePost] = useMutation(CREATE_POST);
  const [formData, setFormData] = useState({
    userId: auth.getProfile().data._id
  });

  const handleChange = event => {
    let { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(auth.getProfile());
    console.log(formData);
    try {
      const { data } = await CreatePost({
        variables: { ...formData },
      });
      console.log(data)
      // CreatePost(data)
    } catch (e) {
      console.error(e);
    }

  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '5px' }} className='createPost' >
      <form onSubmit={handleSubmit} style={{ display: 'flex', boxSizing: 'border-box', justifyContent: 'center', flexDirection: 'column' }}>
        <h2 style={{ display: 'flex', justifyContent: 'center', margin: '5px', fontSize: '30px' }} className="header">Create a Post</h2>
        <div style={{ margin: '3px' }}>
          <input
            name="title"
            onChange={handleChange}
            style={{ backgroundColor: 'white', height: '60px', width: '600px', marginRight: '5px', borderRadius: '9px', marginTop: '30px' }} type="text"
            id="title"
            placeholder="Title"
          ></input>
        </div>
        <div>
          Category:
          <select id="catFormSelector" onChange={handleChange} name='category'>
            <option value='Appetizer'>Appetizer</option>
            <option value='Breakfast'>Breakfast</option>
            <option value='Lunch'>Lunch</option>
            <option value='Snacks'>Snacks</option>
            <option value='Dinner'>Dinner</option>
            <option value='Desserts'>Desserts</option>
            <option value='Cocktails'>Cocktails</option>
          </select>
        </div>
        <div style={{ margin: '1px' }}>
          <textarea
            name="body"
            onChange={handleChange}
            style={{ height: '200px', width: '600px', marginRight: '5px', borderRadius: '9px', marginTop: '5px', backgroundColor: 'white' }}
            type="text"
            wrap='hard'
            placeholder="Write here..."
            id="createPost">
          </textarea>
        </div>
        <button className="postBtn " style={{ cursor: 'pointer', marginLeft: '100px', justifyContent: 'center', backgroundColor: '#6ABEA7', width: '400px', height: '40px', borderRadius: '9px', marginTop: '30px', fontWeight: 'bold', color: 'white' }}>Submit Post</button>
      </form>
    </div>
  );
}
