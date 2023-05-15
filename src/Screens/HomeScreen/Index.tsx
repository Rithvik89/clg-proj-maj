import React from 'react'
import styled from "styled-components"
import AppDescription from './AppDescription'
import UserButtons from './UserButtons'
import SignupSectionIndex from './SignupSection'

const SHomeIndex = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
`

function HomeIndex() {
  return (
    <>
    <SHomeIndex>
       <AppDescription/>
       <UserButtons/>
    </SHomeIndex>
       <SignupSectionIndex/>
    </>

  )
}

export default HomeIndex