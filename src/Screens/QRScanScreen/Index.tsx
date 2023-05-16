import React, { useState } from 'react';
// import QrReader from 'react-qr-scanner'
import styled from "styled-components"
import { Button, TextInput } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const SApp = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;
  flex-direction:column;
  
  width: 100vw;
  height: 100vh;
`

const delay = 1000;

function QRScanIndex() {

  const [data, setData] = useState('No result');
  const [text, setText] = useState('')
  const [err, setErr] = useState("err")
  const navigator = useNavigate();


  // function handleScan(data){
  //   console.log(data)
  //   if(data){
  //    setData(data.text)
  //   }
  // }
  // function handleError(err){
  //   console.error(err)
  //   setData(err)
  // }

  function handleManually() {
    handleRouteToProductDetails();
  }
  function handleRouteToProductDetails() {
    navigator(`/customerDashboard/${text}`)
  }
  function handleTextChange(e: { target: { value: React.SetStateAction<string>; }; }) {
    setText(e.target.value)
  }
  return (
    <SApp>
      {/* <QrReader
          delay={delay}
          // style={previewStyle}
          onError={(e)=>handleError(e)}
          onScan={(e)=>handleScan(e)}
          legacyMode = {true}
          facingMode = {"rear"}
     /> */}

      {/* <p>Hey customer you can scan the product to build trust on us</p> */}
      <TextInput
        onChange={handleTextChange}
        style={{
          width: "40%",
          textAlign: "center"
        }}
        placeholder="product id"
      />
      <Button
        onClick={handleManually}
        style={{
          margin:"20px",
          display: "block",
          width: "20%",
        }}
      >
        Know Product Details at a scan
      </Button>
    </SApp>
  )
}

export default QRScanIndex