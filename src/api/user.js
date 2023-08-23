import axios from "axios";
const BASE_URL = "https://crm-backend-hzhm.onrender.com";
export async function getAllUser(userId) {
  return await axios.get(
    `${BASE_URL}/crm/api/users/${userId}`,
    {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    },
    {
      userId: localStorage.getItem("userId"),
    }
  );
}

export async function userUpdation(userId, selectedCurrUser) {
  return await axios.put(
    `${BASE_URL}/crm/api/users/${userId} `,
    selectedCurrUser,
    {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    },
    {
      userId: localStorage.getItem("userId"),
    }
  );
}
