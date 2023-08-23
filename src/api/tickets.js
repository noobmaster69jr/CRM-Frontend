import axios from 'axios'
const BASE_URL = "https://crm-backend-hzhm.onrender.com";

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



// POST API : 
// asking for data in params : title, description
export async function ticketCreation(data) {
    return await axios.post(`${BASE_URL}/crm/api/v1/tickets/`, data, {
        headers: {
            'x-access-token': localStorage.getItem("token")
        }
    })
}