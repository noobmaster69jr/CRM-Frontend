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


// PUT API : passing the id of the ticket and the new updated data 

export async function ticketUpdation(id, selectedCurrTicket) {
    return await axios.put(`${BASE_URL}/crm/api/tickets/${id}`, selectedCurrTicket, {
        headers: {
            'x-access-token': localStorage.getItem("token")
        }
    }, {
        "userId": localStorage.getItem("userId")
    })
}