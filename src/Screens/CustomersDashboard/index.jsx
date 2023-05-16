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

const quan = [
  {count :1, product_stop: "Not yet decided", weight_stop:"Not yet weighted", taken_at:"--/--/----"},
  {count :2, product_stop: "Not yet decided", weight_stop:"Not yet weighted", taken_at:"--/--/----"},
  {count :3, product_stop: "Not yet decided", weight_stop:"Not yet weighted", taken_at:"--/--/----"},
  {count :4, product_stop: "Not yet decided", weight_stop:"Not yet weighted", taken_at:"--/--/----"},
  {count :5, product_stop: "Not yet decided", weight_stop:"Not yet weighted", taken_at:"--/--/----"},
]

let temperatureData= []
let n=0;
let methaneData = []

function HomeIndex() {
  const { productId } = useParams()
  let [qualityData, setQualityData] = useState(null);
  let [quantityData, setQuantityData] = useState(null);
  let [productData, setProductData] = useState(null);
  const [data, setData] = useState(null)

  const size = window.innerWidth
  
  useEffect(() => {
    fetch(`https://qzcmrn5rh2.execute-api.ap-south-1.amazonaws.com/productDetails/${productId}`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => { 
        elements[0].value = res.products[0].product_type
        elements[1].value = res.products[0].product_name
        elements[2].value = productId
        elements[3].value = res.products[0].weight_
        elements[4].value = res.products[0].price_
        elements[5].value = res.products[0].packaged_date
        elements[6].value = res.products[0].brought_from
        setProductData(res.products[0]);
      })

    fetch(`https://qzcmrn5rh2.execute-api.ap-south-1.amazonaws.com/qualityDetails/${productId}`,{
      method:"GET"
    })
    .then(res=>res.json())
    .then(res=>{
      console.log("here in quality",res.quality_details)
      n=0;
      res.quality_details.map(each=>{
        temperatureData.push(each.temperature);
        n=n+1;
      })
      res.quality_details.map(each=>{
        methaneData.push(each.gas);
      })

      setQualityData(res.quality_details)
    })

    fetch(`https://qzcmrn5rh2.execute-api.ap-south-1.amazonaws.com/quantityDetails/${productId}`,{
      method:"GET"
    })
    .then(res=>res.json())
    .then(res=>{
      console.log(res.quantity_details.length)
      if(res.quantity_details.length>0){
        quan[0].product_stop = res.quantity_details[0].product_stop;
        quan[0].weight_stop = res.quantity_details[0].weight_stop + " Kgs";
        quan[0].taken_at= res.quantity_details[0].taken_at
      }
      if(res.quantity_details.length>1){
        quan[1].product_stop = res.quantity_details[1].product_stop;
        quan[1].weight_stop = res.quantity_details[1].weight_stop + "Kgs";
        quan[1].taken_at= res.quantity_details[1].taken_at
      }
      if(res.quantity_details.length>2){
        quan[2].product_stop = res.quantity_details[2].product_stop;
        quan[2].weight_stop = res.quantity_details[2].weight_stop+ "Kgs";
        quan[2].taken_at= res.quantity_details[2].taken_at
      }
      if(res.quantity_details.length>3){
        quan[3].product_stop = res.quantity_details[3].product_stop;
        quan[3].weight_stop = res.quantity_details[3].weight_stop+ "Kgs";
        quan[3].taken_at= res.quantity_details[3].taken_at
      }
      if(res.quantity_details.length>4){
        quan[4].product_stop = res.quantity_details[4].product_stop;
        quan[4].weight_stop = res.quantity_details[4].weight_stop+ "Kgs";
        quan[4].taken_at= res.quantity_details[4].taken_at
      }
      
      setQuantityData(res.quantity_details)
    })

  }, [])

  console.log(qualityData);
  console.log(quantityData);
  console.log(productData);
  console.log(elements);
  console.log(n)


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
    if (!qualityData) return null
    const  p = temperatureData[0];
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
      labels: ["percentage perished", "percentage usable"],
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
    return (temperatureData ? <div style={{ width: "70%", display: "flex", justifyContent: "space-evenly" }}>
      <div style={{
        width: "40%"
      }}>
        <Line options={options} data={{
          datasets: [{
            data: temperatureData, label: "temerature",
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            fill: true,
          }],
          labels: labelGenerator(n)
        }} />
      </div>
      <div style={{
        width: "40%"
      }}>
        <Line options={options} data={{
          datasets: [{
            data: methaneData, label: "methance conc in ppm",
            borderColor: '#36A2EB',
            backgroundColor: '#36A2EBA0',
            fill: true,
          }],
          labels: labelGenerator(n)
        }} />
      </div>
    </div> : null)
  }
  return (
     size>=700 ? <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
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
         <Timeline.Item bullet={<IconGitBranch size={12} />} title="Reached Stop 1 ">
          <Text color="dimmed" size="sm">{quan[0].weight_stop}</Text>
           <Text color="dimmed" size="sm">{quan[0].product_stop}</Text>
           <Text size="xs" mt={4}>{quan[0].taken_at}</Text>
         </Timeline.Item>

         <Timeline.Item bullet={<IconGitCommit size={12} />} title="Reached Stop 2">
         <Text color="dimmed" size="sm">{quan[1].weight_stop}</Text>
           <Text color="dimmed" size="sm">{quan[1].product_stop}</Text>
           <Text size="xs" mt={4}>{quan[1].taken_at}</Text>
         </Timeline.Item>

         <Timeline.Item title="Reached Stop 3" bullet={<IconGitPullRequest size={12} />}>
         <Text color="dimmed" size="sm">{quan[2].weight_stop}</Text>
           <Text color="dimmed" size="sm">{quan[2].product_stop}</Text>
           <Text size="xs" mt={4}>{quan[2].taken_at}</Text>
         </Timeline.Item>

         <Timeline.Item title="Reached Stop 4" bullet={<IconMessageDots size={12} />}>
         <Text color="dimmed" size="sm">{quan[3].weight_stop}</Text>
           <Text color="dimmed" size="sm">{quan[3].product_stop}</Text>
           <Text size="xs" mt={4}>{quan[3].taken_at}</Text>
         </Timeline.Item>

         <Timeline.Item title="Reached Stop 5" bullet={<IconMessageDots size={12} />}>
         <Text color="dimmed" size="sm"> {quan[4].weight_stop}</Text>
           <Text color="dimmed" size="sm">{quan[4].product_stop}</Text>
           <Text size="xs" mt={4}>{quan[4].taken_at}</Text>
         </Timeline.Item>
       </Timeline>

     </SHomeIndex>

   </div>:<div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
     <h1 style={{ marginTop: "15px" }}>Customers Dashboard</h1>
     {dougnutGenerator()}
     {renderChart()}
     </div>
  )
}

export default HomeIndex