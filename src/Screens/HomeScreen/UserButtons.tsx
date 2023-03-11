import React from 'react'
import { Card, Button } from '@mantine/core'
import styled from "styled-components"
import {useNavigate, createSearchParams} from "react-router-dom"

const SUserButtons = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 250px;
    height: 275px;
`

function UserButtons() {
   const navigate = useNavigate();
  
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder mt={20} style={{display:"flex",justifyContent:"space-around"}}>
        <SUserButtons>        
            <Button size='md' onClick={()=>navigate("/retailersAuth")}>Retailers</Button>
            <Button size='md'onClick={()=>navigate("/distributorsAuth")}>Distributors</Button>
            <Button size='md' onClick={()=>navigate("/qrScan")}>Customers</Button>
         </SUserButtons>

    </Card>
  )
}

export default UserButtons