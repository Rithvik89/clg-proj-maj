import { Table, Timeline, Text, Center } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { IconGitBranch, IconGitPullRequest, IconGitCommit, IconMessageDots } from '@tabler/icons';
import { useParams } from 'react-router';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const SHomeIndex = styled.div`
  display: flex;
  flex-direction: row;
  padding:100px; 
  justify-content:space-around;
  width : 100%;
`
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    }
  },
  lineTension: 0.4,
  radius: 6,

  responsive: true,
  scales: {
    y: {
      // title: { display: true, text: "Temperature (°C)" }
    },
    x: {
      title: { display: true, text: "Time stamps" }
    }
  },

};

const elements = [
  { count: 1, type: "Product Type", value: 'Fruits', lastUpdate: '12/10/2022' },
  { count: 2, type: "Product Name", value: 'Apple', lastUpdate: '12/10/2022' },
  { count: 3, type: "Product Id", value: '4587f#', lastUpdate: '12/10/2022' },
  { count: 4, type: "Weight", value: '5 Kg', lastUpdate: '15/10/2022' },
  { count: 5, type: "Customer Price", value: '450', lastUpdate: '12/10/2022' },
  { count: 6, type: "Packaged Date", value: '12/10/2022', lastUpdate: '17/10/2022' },
  { count: 7, type: "Owners", value: 'Reliance India Pvt.Lmd', lastUpdate: '12/10/2022' },
];

function HomeIndex() {
  const { productId } = useParams()
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('https://qzcmrn5rh2.execute-api.ap-south-1.amazonaws.com/productDetails', {
      body: JSON.stringify({ productId }),
      method: "POST"
    })
      .then(res => res.json())
      .then(res => { console.log(res.temp); setData(res) })
  }, [])
  const ths = (
    <tr>
      <th>S.No</th>
      <th>Type</th>
      <th>value</th>
      <th>lastUpdate</th>
    </tr>
  );

  const rows = elements.map((element) => (
    <tr key={element.type}>
      <td>{element.count}</td>
      <td>{element.type}</td>
      <td>{element.value}</td>
      <td>{element.lastUpdate}</td>
    </tr>
  ));
  const labelGenerator = (n) => {
    const label = [];
    for (let i = 0; i < n; i++)
      label.push(i);
    return label;
  }
  const dougnutGenerator = () => {
    if (!data) return null
    const { p } = data;
    let color = "rgb(0,255,0)";
    if (p > 60) { //danger
      color = "rgb(255,0,0)";
    } else if (p > 30) {
      color = "rgb(255,255,0)";
    }
    return <div style={{
      width: "20%",
      position: "relative"
    }}><Doughnut data={{
      labels: ["percentage perished", "_"],
      datasets: [
        { data: [p, 100 - p], backgroundColor: [color, "rgba(0,0,0,0.1)"] }
      ]
    }} /><h1 style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      fontSize: "45px"
    }}>{p}%</h1></div>
  }
  function renderChart() {
    return (data ? <div style={{ width: "70%", display: "flex", justifyContent: "space-evenly" }}>
      <div style={{
        width: "40%"
      }}>
        <Line options={options} data={{
          datasets: [{
            data: data.temp, label: "temerature",
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            fill: true,
          }],
          labels: labelGenerator(data.temp.length)
        }} />
      </div>
      <div style={{
        width: "40%"
      }}>
        <Line options={options} data={{
          datasets: [{
            data: data.mq, label: "methance conc in ppm",
            borderColor: '#36A2EB',
            backgroundColor: '#36A2EBA0',
            fill: true,
          }],
          labels: labelGenerator(data.mq.length)
        }} />
      </div>
    </div> : null)
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <h1 style={{ marginTop: "15px" }}>Customers Dashboard</h1>
      {renderChart()}
      {dougnutGenerator()}
      <SHomeIndex>
        <Table striped highlightOnHover withBorder withColumnBorders style={{ width: "50%" }}>
          <caption>Product Details</caption>
          <thead>{ths}</thead>
          <tbody>{rows}</tbody>
        </Table>

        <Timeline active={1} bulletSize={24} lineWidth={2}>
          <Timeline.Item bullet={<IconGitBranch size={12} />} title="Reached Packaging unit">
            <Text color="dimmed" size="sm">Started Packing Phase</Text>
            <Text size="xs" mt={4}>13 days ago</Text>
          </Timeline.Item>

          <Timeline.Item bullet={<IconGitCommit size={12} />} title="Departed">
            <Text color="dimmed" size="sm">Departed from Packaging and processing unit</Text>
            <Text size="xs" mt={4}>11 days ago</Text>
          </Timeline.Item>

          <Timeline.Item title="Reached Distributor Unit 1" bullet={<IconGitPullRequest size={12} />}>
            <Text color="dimmed" size="sm">Reached Distribution unit at Karimnagar</Text>
            <Text size="xs" mt={4}>10 days ago</Text>
          </Timeline.Item>

          <Timeline.Item title="Reached Distributor Unit 2" bullet={<IconMessageDots size={12} />}>
            <Text color="dimmed" size="sm">Reached Distribution unit at LMD colony</Text>
            <Text size="xs" mt={4}>10 days ago</Text>
          </Timeline.Item>

          <Timeline.Item title="Reached Retailer Unit" bullet={<IconMessageDots size={12} />}>
            <Text color="dimmed" size="sm">Reached Ratnadeep SuperMarket</Text>
            <Text size="xs" mt={4}>12 minutes ago</Text>
          </Timeline.Item>
        </Timeline>

      </SHomeIndex>

    </div>
  )
}

export default HomeIndex