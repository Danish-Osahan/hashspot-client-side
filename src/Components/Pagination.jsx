import React,{useEffect} from "react";
import {Pagination,PaginationItem} from '@material-ui/lab'
import {Link} from 'react-router-dom'
import { useDispatch,useSelector } from "react-redux";
import { getposts } from "../actions/posts";


import  useStyles from './styles'

const Paginate=({page,mode})=>{
  
   const {numberOfPages}=useSelector((state)=>state.posts)

     const classes=useStyles()
     const dispatch= useDispatch();
     useEffect(()=>{
        if(page) dispatch(getposts(page))
        // eslint-disable-next-line
     },[page])
     return(
        <Pagination 
      //   style={mode==='Light'?light:dark}
        classes={{ul:classes.ul}}
        count={numberOfPages}
        page={Number(page)|| 1}
        variant="outlined"
        color="primary"
        renderItem={(item)=>(
            <PaginationItem {...item} component={Link}  to={`/posts?page=${item.page}`}/>
        )}
        />
     )
}
export default Paginate