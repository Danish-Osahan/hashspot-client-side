import React from "react";
import Post from "./Post/Post";

import useStyles from "./styles";

import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import Loader from "../../Loader";

const Posts = ({ setcurrentid, mode }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  const light = {
    color: "black",
  };

  const dark = {
    color: "white",
  };

  const classes = useStyles();
  // console.log(posts);
  if (!posts.length && !isLoading)
    return <h2 style={mode === "Light" ? light : dark}>No posts</h2>;
  return isLoading ? (
    <Loader />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      id="post"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setcurrentid={setcurrentid} mode={mode} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
