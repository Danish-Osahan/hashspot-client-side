import * as api from "../api";
import { AUTH } from "../constants/actiontypes";

export const signin=(formdata,navigate)=>async (dispatch)=>{
 try {
    const {data}=await api.signin(formdata)

    dispatch({type:AUTH, data})
    navigate('/')
 } catch (error) {
    console.log(error)
    alert("Please Enter Valid Password and Email Address")
 }
}

export const signup=(formdata,navigate)=>async (dispatch)=>{
 try {
   const {data}=await api.signup(formdata)
   dispatch({type:AUTH, data})
   navigate('/')
 } catch (error) {
   console.log(error)
   alert("Check your credentials")
 }
}