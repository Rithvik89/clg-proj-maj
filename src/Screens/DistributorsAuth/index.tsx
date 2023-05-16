import { Button, TextInput } from '@mantine/core';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components"
import { IconEye, IconEyeOff } from '../../Atoms/Icons';
import IconWrapper from '../../Atoms/IconWrapper';
import { useCookies } from 'react-cookie';

const SHomeIndex = styled.div`
  display: flex;
  flex-direction: column;
  padding:10%
`

function HomeIndex() {
    const [credentials, setCredentials] = useState({ email: "", password: "", role:"distributor"  });
    const [showPassword, setShowPassword] = useState(false);
    const [token, setToken] = useCookies(['token'])
    const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
    const navigator = useNavigate();

    function handleLogin() {
      console.log(credentials)
      fetch("https://qzcmrn5rh2.execute-api.ap-south-1.amazonaws.com/roleBasedAuth", {
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
        navigator("/distributorsDashboard")
    }


  return (
    <SHomeIndex>
       <h1 >Distributors Authentication</h1>
       <TextInput
              placeholder="Enter Distributors ID"
              style={{ width: "100%", marginTop: "20px" }}
              label="Distributors ID"
              type={"email"}
              onChange={(e) => {
                setCredentials((p) => {
                  return { ...p, email: e.target.value };
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
                credentials.email.length === 0 ||
                credentials.password.length === 0 
              }
              onClick={handleLogin}
              style={{
                marginTop: "20px",
                marginBottom: "10px",
                display: "block",
                width: "100%",
              }}
            >
              Sign In
            </Button>
    </SHomeIndex>
  )
}

export default HomeIndex