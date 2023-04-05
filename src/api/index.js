import axios from 'axios';
// const axios = require('axios').default;

// const API=axios.create({ baseURL:'http://localhost:5000'})
const API=axios.create({ baseURL:'https://hashspot-api.onrender.com'})
// const API=axios.create({ baseURL:'https://hashspot.herokuapp.com/'})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    } 
   return req
})
// const url='http://localhost:5000/posts'

// Api for fetching the posts 
export  const fetchposts=(page)=>API.get(`/posts?page=${page}`)

export  const fetchpost=(id)=>API.get(`/posts/${id}`)

export const fetchpostsbysearch=(searchQuery)=>API.get(`/posts/search?searchQuery=${searchQuery.search||'none'}&tags=${searchQuery.tags}`)


export const fetchPostsByCreator = (name) => API.get(`/posts/creator?name=${name}`);
// API for creating the posts
export const createPost=(newpost)=>API.post('/posts',newpost)

// API for updating Post
export const updatedpost=(id,updatedpost)=>API.patch(`/posts/${id}`,updatedpost)

// API for deleting Post
export const deletepost=(id)=>API.delete(`/posts/${id}`)

// API for liked posts

export const likepost=(id)=>API.patch(`/posts/${id}/likepost`)

// API for sigin

export const  signin=(formdata)=>API.post(`/user/signin`,formdata)

// API for sigip

export const  signup=(formdata)=>API.post(`/user/signup`,formdata)
