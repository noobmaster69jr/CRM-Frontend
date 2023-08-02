import { useState } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { userSignin, userSignup } from "../api/auth";
import {useNavigate} from 'react-router-dom'

// signup : userid, username, email, password
// login: userid, password





function Login() {
  const [showSignup, setShowSignup] = useState(false);
  const [userType, setUserType] = useState("CUSTOMER");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
const [message, setMessage] = useState("");

const navigate = useNavigate();

  const updateData = (e)=>{
    if(e.target.id === "userid"){
      setUserId(e.target.value)
    }else if(e.target.id === "password"){
      setPassword(e.target.value)
    }else if(e.target.id === "email"){
      setEmail(e.target.value)
    }else if(e.target.id === "username"){
      setUsername(e.target.value)
    }
  }

  const toggleSignup = () => {
    setShowSignup(!showSignup);
  };

  const handleSelect = (e) => {
    setUserType(e);
  };

  const signinFn = (e)=>{
    e.preventDefault()
    
    const data = {
      userId: userId,
      password: password
    }
    
    userSignin(data).then((response) => {
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("userTypes", response.data.userTypes);
      localStorage.setItem("userStatus", response.data.userStatus);
      localStorage.setItem("token", response.data.accessToken);
      
      if (response.data.userTypes === "CUSTOMER")
        navigate('/customer')
      else if (response.data.userTypes === "ENGINEER")
        navigate("/engineer");
      else if (response.data.userTypes === "ADMIN")
        navigate("/admin")
      else navigate("/")
 
    }).catch ((error) => {
         console.log(error);
         setMessage(error.response.data.message);
    })

  }

  const signupFn = (e) =>{
    e.preventDefault()

    const data = {
      userId: userId, 
      password: password,
      name: username,
      userType: userType,
      email: email
    }

     userSignup(data).then((response) => console.log(response)).catch((err) =>{
      console.log(err)
     })
  }

  return (
    <div className="bg-info d-flex justify-content-center align-items-center vh-100 ">
      <div
        className="card p-3 rounded-4 shadow-lg"
        style={{ width: 20 + "rem" }}
      >
        <h4 className="text-center text-info">
          {showSignup ? "Sign Up" : "Log In"}
        </h4>

        <form onSubmit={showSignup ? signupFn : signinFn}>
          <div className="input-group">
            <input
              type="text"
              className="form-control m-1"
              placeholder="User Id"
              value={userId}
              id="userid"
              onChange={updateData}
            />
          </div>
          {showSignup && (
            <>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control m-1"
                  placeholder="Username"
                  value={username}
                  id="username"
                  onChange={updateData}
                />
              </div>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control m-1"
                  placeholder="Email"
                  value={email}
                  id="email"
                  onChange={updateData}
                />
              </div>
              <div className="d-flex justify-content-between m-1">
                <span className="my-1">User Types</span>
                <DropdownButton
                  align="end"
                  title={userType}
                  id="userType"
                  variant="light"
                  onSelect={handleSelect}
                >
                  <Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
                  <Dropdown.Item eventKey="ENGINEER">ENGINEER</Dropdown.Item>
                </DropdownButton>
              </div>
            </>
          )}
          <div className="input-group">
            <input
              type="password"
              className="form-control m-1"
              placeholder="Password"
              value={password}
              id="password"
              onChange={updateData}
            />
          </div>

          <div className="input-group">
            <input
              type="submit"
              className="btn btn-info fw-bolder form-control m-1 text-white"
              value={showSignup ? "Sign Up" : "Log In "}
            />
          </div>

          <div className="m-1 text-center text-primary clickable" onClick={toggleSignup}>
            {showSignup
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </div>

          <div className="text-center text-danger">{message}</div>
        </form>
      </div>
    </div>
  );
}

export default Login;
