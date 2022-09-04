import React, { useState } from "react";
// import {  useEffect } from "react";
import {
  Paper,
  Container,
  Button,
  Grid,
  Typography,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./input";
// import { GoogleLogin } from "react-google-login";
// import Icon from "./Icon";
// import { gapi } from "gapi-script";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";

const initialstate = {
  firstname: "",
  lastname: "",
  password: "",
  email: "",
  confirmpassword: "",
};
const Auth = ({ mode }) => {
  let light = {
    boxShadow:
      "  -3px -3px 6px #ffffff,3px 3px 6px #00000050, -3px -3px 6px #ffffff,3px 3px 6px #00000050",
    backgroundColor: "#e8e8e8",
    border: "none",
    borderRadius: "15px",
  };
  let dark = {
    boxShadow:
      "-3px -3px 6px #ffffff10,3px 3px 6px #000000, -3px -3px 6px #ffffff10,3px 3px 6px #00000090",
    backgroundColor: "#272727",
    border: "none",
    borderRadius: "15px",
    // color: "white",
  };
  // useEffect(() => {
  //   function start() {
  //     gapi.client.init({
  //       clientId:"302201485310-nmfjadp96qrl9ll5r88ouvfsildmd7hl.apps.googleusercontent.com",
  //       scope: 'email',
  //       plugin_name: "chat"
  //     });
  //   }
  //   gapi.load('client:auth2', start);
  // }, []);
  // window.gapi.load("client:auth2", () => {
  //   window.gapi.client.init({
  //     clientId: "302201485310-nmfjadp96qrl9ll5r88ouvfsildmd7hl.apps.googleusercontent.com",
  //     plugin_name: "chat",
  //   });
  // });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formdata, setformdata] = useState(initialstate);
  const [isSignup, setisSignup] = useState(false);
  const classes = useStyles();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formdata, navigate));
    } else {
      dispatch(signin(formdata, navigate));
    }
  };
  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const [showPassword, setShowpassword] = useState(false);

  const handleShowPassword = () => {
    setShowpassword((prevShowpassword) => !prevShowpassword);
  };
  
  const switchMode = () => {
    setisSignup((previsSignup) => !previsSignup);
    setShowpassword(false);
  };

  // const googlesucces = async (res) => {
  //   // console.log(res);
  //   const result = res?.profileObj;
  //   const token = res?.tokenId;
  //   // console.log(result)
  //   // console.log(token)
  //   let data = { result, token };
  //   try {
  //     dispatch({ type: "AUTH", data });
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const googlefailure = (error) => {
  //   console.log(error);
  //   console.log("Google sign in unsuccessfull");
  // };
  // const googleError = () => alert('Google Sign In was unsuccessful. Try again later')
  // const googleError = () =>
  //   console.log("Google Sign In was unsuccessful. Try again later");

  let btn_light = {
    boxShadow:
      "  -3px -3px 6px #ffffff,3px 3px 6px #00000050, -3px -3px 6px #ffffff,3px 3px 6px #00000050",
    borderRadius: "10px",
  };
  let btn_dark = {
    boxShadow:
      "-3px -3px 6px #ffffff10,3px 3px 6px #000000, -3px -3px 6px #ffffff10,3px 3px 6px #00000090",
    borderRadius: "10px",

    
  };
  return (
    <Container component="main" maxWidth="xs" >
      <Paper
        className={classes.paper}
        elevation={3}
        style={mode === "Light" ? light : dark}
      >
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} id="form">
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstname"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastname"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmpassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <Button
            id="signup"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            style={mode === "Light" ? btn_light : btn_dark}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          {/* <GoogleLogin
            clientId="302201485310-nmfjadp96qrl9ll5r88ouvfsildmd7hl.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
                id="google"
                style={mode === "Light" ? btn_light : btn_dark}
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googlesucces}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          /> */}
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
