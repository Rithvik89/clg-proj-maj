import { Button, TextInput } from '@mantine/core';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components"
import { IconEye, IconEyeOff } from '../../Atoms/Icons';
import IconWrapper from '../../Atoms/IconWrapper';

const SHomeIndex = styled.div`
  display: flex;
  flex-direction: column;
  padding:10%
`

function SignupSectionIndex() {
  const [credentials, setCredentials] = useState({ user_name: "", password: "",designation:""});
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [token, setToken] = useCookies(['token'])
  const navigator = useNavigate();

  function handleLogin() {
    fetch("https://qzcmrn5rh2.execute-api.ap-south-1.amazonaws.com/customerDetails", {
      body: JSON.stringify(credentials),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST"
    })
      .then(res => res.json())
      .then(({ token, match }) => {
        if (!token) return alert("creds are not correct")
        setToken('token', token)
        handleRouteToProfile();
      })

  }
  function handleRouteToProfile() {
    navigator("/retailersDashboard")
  }

  return (
    <SHomeIndex>
      <h1 >Create New Account</h1>
      <TextInput
        placeholder="Enter Username"
        style={{ width: "100%", marginTop: "20px" }}
        label="User Name"
        // type={"email"}
        onChange={(e) => {
          setCredentials((p) => {
            return { ...p, user_name: e.target.value };
          });
        }}
      />
       <TextInput
        placeholder="Enter Designation"
        style={{ width: "100%", marginTop: "20px" }}
        label="Designation"
        // type={"email"}
        onChange={(e) => {
          setCredentials((p) => {
            return { ...p, designation: e.target.value };
          });
        }}
      />
      
      <TextInput
        placeholder="Enter password"
        type={showPassword ? "text" : "password"}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleLogin();
          }
        }}
        rightSection={
          credentials.password.length > 0 && (
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                setShowPassword((p) => !p);
              }}
            >
              <IconWrapper>
                {showPassword ? IconEyeOff : IconEye}
              </IconWrapper>
            </div>
          )
        }
        style={{ width: "100%", marginTop: "20px" }}
        label="Password"
        onChange={(e) => {
          setCredentials((p) => {
            return { ...p, password: e.target.value };
          });
        }}
      />
      <Button
        variant="subtle"
        compact
        style={{
          margin: "5px",
        }}
        onClick={() => {
          setForgotPasswordModal(true);
        }}
      >
        Forgot password?
      </Button>

      <Button
        disabled={
          credentials.user_name.length === 0 ||
          credentials.password.length === 0  || 
          credentials.designation.length === 0
        }
        onClick={handleLogin}
        style={{
          marginTop: "20px",
          marginBottom: "10px",
          display: "block",
          width: "100%",
        }}
      >
        Sign Up
      </Button>
    </SHomeIndex>
  )
}

export default SignupSectionIndex


