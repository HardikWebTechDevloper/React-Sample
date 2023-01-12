/* eslint-disable eqeqeq */ 
import axios from "axios";

const token = () =>{
  let userInfo = JSON.parse(localStorage.getItem("user")); 
  if(userInfo != undefined)  return userInfo.token;  
  return false;
} 


const customInstance = axios.create ({
  baseURL : 'http://localhost:8088/api/',
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token()}`,
  }
})

customInstance.interceptors.response.use(null, (error) => {
  const expErr =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expErr) {
    console.log("Unexpected error : ", error.response); 
  }
  if (error.response) {
    console.log("error happen");
  }
  return Promise.reject(error);
});

export default customInstance;