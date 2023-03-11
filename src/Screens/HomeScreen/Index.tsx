import React from 'react'
import styled from "styled-components"
import AppDescription from './AppDescription'
import UserButtons from './UserButtons'

const SHomeIndex = styled.div`
  display: flex;
  flex-direction: column;
`

function HomeIndex() {
  return (
    <SHomeIndex>
       <AppDescription/>
       <UserButtons/>
    </SHomeIndex>
  )
}

export default HomeIndex