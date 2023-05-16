import { useEffect } from 'react'
import styled from "styled-components"
import { Table, Input, Tooltip ,Button} from '@mantine/core';
import { useState } from 'react';
import { IconBrandTwitter, IconAlertCircle } from '@tabler/icons';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';



const SHomeIndex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:space-around;
  width:100%;
  margin:20px;
`

const elements = [
  { count: 1, transactionDate : '12/03/2022', broughtFrom: "Reliance Pvt.lmd", value:150 , productId:"4587f#"},
  { count: 2, transactionDate : '1/04/2022', broughtFrom: "Swadheshi Pvt.lmd", value:250 , productId:"45987#"},
  { count: 3, transactionDate : '12/04/2022', broughtFrom: "Priya Pvt.lmd", value:230 , productId:"458fw#"},
  { count: 4, transactionDate : '21/05/2022', broughtFrom: "Reliance Pvt.lmd", value:270 , productId:"4557f#"},
  { count: 5, transactionDate : '12/10/2022', broughtFrom: "Priya Pvt.lmd", value:110 , productId:"5522f#"},
  { count: 6, transactionDate : '23/10/2022', broughtFrom: "AMul Pvt.lmd", value:100 , productId:"4588f#" },
  { count: 7, transactionDate : '25/10/2022', broughtFrom: "Reliance Pvt.lmd", value:150 , productId:"4187f#"},
];

function HomeIndex() {
  const navigator = useNavigate();

  const ths = (
    <tr>
      <th>count</th>
      <th>Transaction Date</th>
      <th>Brought From</th>
      <th>value</th>
      <th>ProductId</th>
    </tr>
  );

  const rows = elements.map((element) => (
    <tr key={element.count}>
      <td>{element.count}</td>
      <td>{element.transactionDate}</td>
      <td>{element.broughtFrom}</td>
      <td>{element.value}</td>
      <td><Link to={`/customerDashboard/1`} >{element.productId}</Link></td>
    </tr>
  ));
return (
      <div style={{display:"flex",flexDirection:"column",alignItems:"center", marginTop:"50px"}}>
        <h1 style={{marginBottom:"20px"}}>Distributors Dashboard</h1>
      <Input
      icon={<IconBrandTwitter size={16} />}
      placeholder="Transactions Id"
      rightSection={
        <Tooltip label="This is public" position="top-end" withArrow>
          <div>
            <IconAlertCircle size={18} style={{ display: 'block', opacity: 0.5 }} />
          </div>
        </Tooltip>
      }
    
    />
    
    <Button onClick={()=>navigator("/addProduct")} style={{margin:"10px"}}>Add Product</Button>

    <SHomeIndex>
      <Table striped highlightOnHover withBorder withColumnBorders style={{width:"35%"}}>
      <caption style={{fontWeight:1000}}>Transaction In</caption>
      <thead>{ths}</thead>
      <tbody>{rows}</tbody>
    </Table>
    <Table striped highlightOnHover withBorder withColumnBorders style={{width:"35%"}}>
      <caption style={{fontWeight:1000}}>Transaction Out</caption>
      <thead>{ths}</thead>
      <tbody>{rows}</tbody>
    </Table>
  </SHomeIndex>
    </div>
);
}




export default HomeIndex


