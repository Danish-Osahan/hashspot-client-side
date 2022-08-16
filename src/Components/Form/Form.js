import React, { useState, useEffect } from "react";

import { Typography, Button, TextField, Paper } from "@material-ui/core";
import FileBase64 from "react-file-base64";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { createpost, updatepost } from "../../actions/posts";

const Form = ({ currentid, setcurrentid,mode }) => {
  let light = {
    boxShadow:
      "  -3px -3px 6px #ffffff,3px 3px 6px #00000050, -3px -3px 6px #ffffff,3px 3px 6px #00000050",
    backgroundColor: "#e8e8e8",
    border: "none",
    borderRadius:"15px",
  };
  let dark = {
    boxShadow:
      "-3px -3px 6px #ffffff10,3px 3px 6px #000000, -3px -3px 6px #ffffff10,3px 3px 6px #00000090",
    backgroundColor: "#272727",
    border: "none",
    color: "white",
    borderRadius:"15px",
  };

  let btn_light={
    boxShadow:
    "  -3px -3px 6px #ffffff,3px 3px 6px #00000050, -3px -3px 6px #ffffff,3px 3px 6px #00000050", borderRadius: "10px",marginTop: "10px"
  }
  let btn_dark={
    boxShadow:
    "-3px -3px 6px #ffffff10,3px 3px 6px #000000, -3px -3px 6px #ffffff10,3px 3px 6px #00000090", borderRadius: "10px",marginTop: "10px"
  }

  const post = useSelector((state) =>
    currentid ? state.posts.posts.find((p) => p._id === currentid) : null
  );
  const classes = useStyles();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedfile: "",
  });
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handlesubmit = (e) => {
    e.preventDefault();

    if (currentid) {
      dispatch(
        updatepost(currentid, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createpost({ ...postData, name: user?.result?.name }));
    }
    clear();
  };

  const clear = () => {
    setcurrentid(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedfile: "",
    });
  };
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} style={mode==='Light'?light:dark}>
        <Typography variant="h6" align="center">
          Please Sign In to create a Post and Like other Posts
        </Typography>
      </Paper>
    );
  } 
  
    return (
      <Paper className={classes.paper} elevation={4}  id='form'  style={mode === "Light" ? light : dark}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handlesubmit}
        >
          <Typography id="form_heading" variant="h6">
            {currentid ? "Editing" : "Creating"} a Post
          </Typography>
          {/* <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        /> */}
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Tag"
            fullWidth
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
          />
          <div className={classes.fileInput} >
            <FileBase64
           
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedfile: base64 })
              }
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            style={mode === "Light" ? btn_light : btn_dark}
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
            style={mode === "Light" ? btn_light : btn_dark}
          >
            Clear
          </Button>
        </form>
      </Paper>
    );
  
};

export default Form;
