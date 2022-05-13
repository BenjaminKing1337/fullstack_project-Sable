import axios from 'axios'

// global prefix
axios.defaults.baseURL = "http://localhost:4000/";
// axios.defaults.baseURL = "https://sableplan.herokuapp.com/";


// //to globalise token application
// axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");