import axios from 'axios'
const BASE_URL = "http://localhost:3002";

export const fetchTicket = async (data)=>{
    return await axios.get(`${BASE_URL}/crm/api/tickets`, 
    {
        headers:{
            'x-access-token': localStorage.getItem('token')
        }
    },{
        userId: localStorage.getItem('userId')
    }
    );
}