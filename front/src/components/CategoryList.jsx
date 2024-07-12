import Category from "./Category";
import {useState, useEffect} from 'react'
function CategoryList() {
  const [data, setData] = useState([])  
  const [data1, setData1] = useState([])  
  const [data2, setData2] = useState([])  
  const [data3, setData3] = useState([])  
    
  useEffect(() => {
    // fetch data with axios setData(data)
    // fetch data with axios setData1(data)
    // fetch data with axios setData2(data)
    // fetch data with axios setData3(data)
    
  },[])
    return ( <>
    <div>
        <Category data={drinksData}/>
        <Category data={}/>
        <Category data={}/>
        <Category data={}/>
    </div>
    </> );
}

export default CategoryList;