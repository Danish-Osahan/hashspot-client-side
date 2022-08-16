import React, { useState } from "react";
import useStyles from "./styles";
import { Container, Grow, Grid } from "@mui/material";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { getpostsbysearch } from "../../actions/posts";
import { useDispatch } from "react-redux";
import Pagination from "../Pagination";
import { Paper, AppBar, Button, TextField } from "@material-ui/core";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = ({ mode }) => {
  const [currentid, setcurrentid] = useState(null);
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const classes = useStyles();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  // useEffect(() => {
  //   dispatch(getposts());
  // }, [currentid, dispatch]);

  const handlekeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPosts();
    }
  };
  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };
  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const searchPosts = () => {
    if (search.trim() || tags) {
      dispatch(getpostsbysearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };
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
    // backgroundColor: "#1E2127",
    border: "none",
    borderRadius: "15px",
    // color: "white",
  };
  let btn_light={
    boxShadow:
    "  -3px -3px 6px #ffffff,3px 3px 6px #00000050, -3px -3px 6px #ffffff,3px 3px 6px #00000050",marginTop: "8px", borderRadius: "10px"
  }
  let btn_dark={
    boxShadow:
    "-3px -3px 6px #ffffff10,3px 3px 6px #000000, -3px -3px 6px #ffffff10,3px 3px 6px #00000090",marginTop: "8px", borderRadius: "10px"
  }
  return (
    <Grow in>
      <Container maxWidth="xl" style={{ marginTop:'20px'}} >
        <Grid
          className={classes.gridContainer}
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          id="home"
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts id='posts' setcurrentid={setcurrentid} mode={mode} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              // color="inherit"
              style={mode === "Light" ? light : dark}
              id="search"
            >
              <TextField
                name="search"
                variant="outlined" 
                label="Search Posts"
                onKeyPress={handlekeyPress}
                fullWidth
                style={{ marginTop: "5px" }}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <ChipInput
                style={{ margin: "10px 0px" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPosts}
                className="button"
                variant="contained"
                color="primary"
               
                style={mode === "Light" ? btn_light : btn_dark}
              >
                Search
              </Button>
            </AppBar>
            <Form
              currentid={currentid}
              setcurrentid={setcurrentid}
              mode={mode}
              id='form'
            />
            {!searchQuery && !tags.length && (
              <Paper
                elevation={6}
                id="paginate"
                className={classes.pagination}
                style={mode === "Light" ? light : dark}
              >
                <Pagination  page={page} mode={mode} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
