import React, { useState,useEffect } from "react";
import {  Button, Toolbar, Typography, Avatar } from "@mui/material";
import useStyles from "./styles";
// import icon_1 from "../../images/icon_1.png";
import icon2 from "../../images/icon2.png";
import decode from 'jwt-decode'
import { Link , useNavigate,useLocation} from "react-router-dom";
import { useDispatch } from "react-redux";
import Switchmode from "../Switch/Switchmode";


const Navbar = ({changemode,mode}) => {
  const classes = useStyles();

  const [user,setuser]=useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const location=useLocation()

  let light={
    boxShadow:
    "  -3px -3px 6px #ffffff,3px 3px 6px #00000050, -3px -3px 6px #ffffff,3px 3px 6px #00000050",
  }
  let dark={
    boxShadow:
    "-3px -3px 9px #ffffff10,3px 3px 9px #000000, -3px -3px 9px #ffffff10,3px 3px 9px #00000090",
  }

  // console.log(user)

  const logout=()=>{
    dispatch({type:'LOGOUT'})
    navigate("/auth")
    setuser(null)
   }

  useEffect(()=>{
    const token=user?.token
    if(token){
      const decodedToken=decode(token)
      if(decodedToken.exp*1000<new Date().getTime()) logout()
    }
    setuser(JSON.parse(localStorage.getItem('profile')))
    // eslint-disable-next-line
  },[location])
  
  
  
  return (
    <nav id="navbar" className="navbar navbar-expand-lg " style={mode==='Light'?light:dark}>
      <div className="container-fluid">
        <Link className="navbar-brand" id="brand" to="/">
          <h4 id="heading">Hashspot</h4><img
          className={classes.image}
          src={icon2}
          alt="Hashspot"
          height="60px"
        />
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <Toolbar >
            {user ? (
              <div className={classes.profile}>
                <Avatar
                  className={classes.purple}
                  alt={user.result.name}
                  src={user.result.imageUrl}
                >
                  {user.result.name.charAt(0)}
                </Avatar>
                <Typography className={classes.userName} variant="h6">
                  {user.result.name}
                </Typography>
                <Button
                  variant="contained"
                  // className={classes.purple}
                  color="secondary"
                  style={{borderRadius: "10px"}}
                  onClick={logout}
                >Logout</Button>
              </div>
            ) : (
              <Button
                variant="contained"
                component={Link}
                to="/auth"
                color="primary"
                style={{borderRadius: "10px"}}
                // className={classes.purple}
               
              >
                Sign In
              </Button>
            )}
          </Toolbar>
         <Switchmode changemode={changemode}/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
