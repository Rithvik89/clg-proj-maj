import { useEffect } from 'react'
import styled from "styled-components"
import { Table, Input, Tooltip } from '@mantine/core';
import { useState } from 'react';
import { IconBrandTwitter, IconAlertCircle } from '@tabler/icons';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';


const SHomeIndex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:space-around;
  width:100%;
  margin:20px;
`

function HomeIndex() {
  const [{ token }] = useCookies(['token']);
  const [data, setData] = useState(null)
  console.log(token);

  useEffect(() => {
    fetch("http://localhost:5000/retailersDashboard", {
      body: JSON.stringify({ token: token }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST"
    }).then(res => res.json())
      .then(res => setData(res))
  }, [])
  const ths = (
    <tr>
      <th>count</th>
      <th>Transaction Date</th>
      <th>Brought From</th>
      <th>value</th>
      <th>ProductId</th>
    </tr>
  );

  const renderData = () => {
    if (!data) return null;
    const rowsIn = data?.in.map((element) => (
      <tr key={element.count}>
        <td>{element.count}</td>
        <td>{(new Date(element.transactionDate)).toDateString()}</td>
        <td>{element.broughtFrom}</td>
        <td>{element.value}</td>
        <td><Link to={`/customerDashboard/${element.productId}`} >{element.productId}</Link></td>
      </tr>
    ));
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
        <h1 style={{ marginBottom: "20px" }}>Retailer Dashboard</h1>
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
        <SHomeIndex>
          <Table striped highlightOnHover withBorder withColumnBorders style={{ width: "35%" }}>
            <caption style={{ fontWeight: 1000 }}>Transaction In</caption>
            <thead>{ths}</thead>
            <tbody>{rowsIn}</tbody>
          </Table>
          <Table striped highlightOnHover withBorder withColumnBorders style={{ width: "35%" }}>
            <caption style={{ fontWeight: 1000 }}>Transaction Out</caption>
            <thead>{ths}</thead>
            <tbody>{rowsIn}</tbody>
          </Table>
        </SHomeIndex>
      </div>
    )
  }
  return renderData();
}



export default HomeIndex


