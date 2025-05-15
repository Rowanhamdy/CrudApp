import React, { useCallback, useEffect } from 'react'
import Layout from './Components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { deletePosts, fetchPosts } from './Store/postSlice';
import Dashboard from './Pages/Dashboard';
import Loading from './Components/Loading/Loading';

export default function App() {
  const dispatch = useDispatch();
  const { records ,loading ,error} = useSelector((state) => state.posts);
  const {isLoggedIn} = useSelector((state) => state.auth);
  
  useEffect(() =>{
    dispatch(fetchPosts())
  },[dispatch])

  const deleteRecord = useCallback((id) =>{
    dispatch(deletePosts(id))
  },[dispatch])

  return <>
  <Loading  loading ={loading}error={error} >
  <Dashboard records={records} deleteRecord={deleteRecord} isLoggedIn={isLoggedIn}/>

  </Loading>
  </>
}
