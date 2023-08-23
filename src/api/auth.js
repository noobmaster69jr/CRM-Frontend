import axios from "axios";
const BASE_URL = "https://crm-backend-hzhm.onrender.com";
//"http://localhost:3002";

/*
SIGNUP: 
POST : api 
url : /crm/api/v1/auth/signup
data : userid, email, name, pw
 */

export async function userSignup(data) {
  return await axios.post(`${BASE_URL}/crm/api/auth/signup`, data);
}

/*
SIGNIN: 
POST : api 
url : /crm/api/v1/auth/signin
data : userid, pw
 */

export async function userSignin(data) {
  return await axios.post(`${BASE_URL}/crm/api/auth/signin`, data);
}
