import React from 'react'
import styled from "styled-components"

const SAppDescription = styled.div `
    width: 300px;
    height: 150px;
    text-align:center;
    margin-left:20px;
    margin-top:20px;
`

function AppDescription() {
  return (
    <SAppDescription>
      <h1 style = {{marginBottom:"15px"}}>Welcome Back ...</h1>
      <p>We are here to handle the food services in safe and secure manner :)</p>
      </SAppDescription>
  )
}

export default AppDescription