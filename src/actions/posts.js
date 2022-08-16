import * as api from "../api";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKEPOST,
  FETCH_BY_SEARCH,
  START_LOADING,END_LOADING,
  FETCH_POST,
  FETCH_BY_CREATOR
} from "../constants/actiontypes";

// Action creators

export const getpost = (id) => async (dispatch) => {
  try {
    dispatch({type:START_LOADING})
    const { data } = await api.fetchpost(id);
    //  console.log(data);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({type:END_LOADING})
  } catch (error) {
    console.log(error);
  }
};

export const getposts = (page) => async (dispatch) => {
  try {
    dispatch({type:START_LOADING})
    const { data } = await api.fetchposts(page);
    //  console.log(data);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({type:END_LOADING})
  } catch (error) {
    console.log(error);
  }
};


export const getpostsbysearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({type:START_LOADING})
    const { data:{data} } = await api.fetchpostsbysearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({type:END_LOADING})
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const getPostsByCreator = (name) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchPostsByCreator(name);

    dispatch({ type: FETCH_BY_CREATOR, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createpost = (post) => async (dispatch) => {
  try {
    dispatch({type:START_LOADING})
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
    dispatch({type:END_LOADING})
  } catch (error) {
    console.log(error);
  }
};

export const updatepost = (id, post) => async (dispatch) => {
  try {
    dispatch({type:START_LOADING})
    const { data } = await api.updatedpost(id, post);
    dispatch({ type: UPDATE, payload: data });
    dispatch({type:END_LOADING})
  } catch (error) {
    console.log(error);
  }
};

export const deletepost = (id) => async (dispatch) => {
  try {
    await api.deletepost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likepost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  try {
    const { data } = await api.likepost(id, user?.token);
    dispatch({ type: LIKEPOST, payload: data });
  } catch (error) {
    console.log(error);
  }
};
