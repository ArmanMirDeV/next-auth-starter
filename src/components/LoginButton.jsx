"use client"
import {  signIn } from "next-auth/react"

import React from 'react'

const LoginButton = () => {
  return (
   <button onClick={()=> signIn()} className='btn' >
    LogIn Now
   </button>
  )
}

export default LoginButton