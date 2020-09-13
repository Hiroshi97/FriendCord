import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import {  Redirect, useHistory } from 'react-router-dom';
import { logout } from '../../actions/auth.action';

export default function Logout() {
    const dispatch = useDispatch();
    useEffect(()=> {
        localStorage.clear();
        dispatch(logout());
    }, [])

    return (<Redirect to={{pathname: '/'}} />);
}
