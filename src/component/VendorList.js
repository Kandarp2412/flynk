import React, { useEffect, useState } from 'react'
import {
  Divider,
  InputLabel,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar
  //   Autocomplete
} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import './AssetView.css'
import AssetView from './AssetView'
import {useHistory} from 'react-router'
import assetList from './asset_list.png'


function VendorList() {
  const history = useHistory()
  const [listData, setListData] = useState([])
  const [loc, setLoc] = useState([])
  const [noasset, setNoAsset] = useState('')

  
  useEffect(() => {
    axios
      .post(' http://demo.travel.webbrainstechnologies.com/api/vendors_list')
      .then((res) => {
        setListData(res.data.vendors)
        console.log(res.data.vendors)
        //etLoc(res.data.locations.map((i) => i['location_id']))
      })
      .catch((err2) => console.log(err2))

    
  }, [])
  function handleClick(itemId){
    console.log(itemId)
    history.push({
      pathname:`/vendor/view/${itemId}`,
      
    })
  
  }
  

  return (
    <div>
    
    <div >
    <div
      className="col-sm-4"
      style={{
          display:'flex',
          
          // flexDirection:"column",
        alignItems:"center",
        border: '1px solid lightgrey',
        height: '500px',
        overflowY: "scroll",
        minWidth: '30vw',
      }}
    >
      
      {listData && listData.length > 0 ? (
        <div>
          
          {listData.map((item) => {
            return (
              <div onClick={()=>handleClick(item['id'])}>
                
                <span >
                <Avatar>H</Avatar>
                <br></br>
                <span>{item['name']}</span>
                
                </span>
                
               <Divider/>
                
              </div>
            )
          })}
        </div>
      ) : (
        
         <div>
              <h6 style={{ fontSize: '14px' }}>
                How can we break it if we don't know what it is?
              </h6>
              <a href="#" style={{ fontSize: '14px' }}>
                Start adding the asstes you're in charge of maintaining
              </a>
            </div>
      )}
 
    </div>
  </div>
  </div>
    
  )
}

export default VendorList

 {/* <a>
                    <span></span>
                </a>
                <svg height="16" width="16" style={{transform:'rotate(90deg)'}}>
                  <path d="M10.994 6.369a.875.875 0 01-1.238 0L6 2.612 2.244 6.37A.875.875 0 111.006 5.13L5.381.756a.875.875 0 011.238 0l4.375 4.375a.875.875 0 010 1.238z" />
                </svg> */}
