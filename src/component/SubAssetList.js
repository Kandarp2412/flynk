import React, { useEffect, useState } from 'react'
import {
  Divider,
  InputLabel,
  Button,
  IconButton,
  Menu,
  MenuItem,
  //   Autocomplete
} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import './AssetView.css'
import AssetView from './AssetView'
import {useHistory} from 'react-router'
import assetList from './asset_list.png'
import Sidebar from './Sidebar'

function SubAssetList() {
  const history = useHistory()
  const [listData, setListData] = useState([])
  const [loc, setLoc] = useState([])
  const [noasset, setNoAsset] = useState('')
  
  useEffect(() => {
    axios
      .post('http://demo.travel.webbrainstechnologies.com/api/assets_list')
      .then((res) => {
          console.log(res.data.result)
        setListData(res.data.result)
        
        setLoc(res.data.result.map((i) => i['location_id']))
      })
      .catch((err2) => console.log(err2))

  }, [])
  
  function handleClick(itemId){
    console.log(itemId)
    history.push({
      pathname:`/asset/view/${itemId}`,
      // state: { itemId: itemId }
    })
  
  }
  
  return (
    <div>
    
    <div >
    <div
      className="col-sm-4"
      style={{
          display:'flex',
          overflowY: "scroll",
          // flexDirection:"column",
        alignItems:"center",
        border: '1px solid lightgrey',
        height: '500px',
        minWidth: '30vw',
        
      }}
    >
      
      {listData && listData.length > 0 ? (
        <div>
          
          {listData.map((item) => {
           console.log(item)
            return (
              <div onClick={()=>handleClick(item['id'])}>
                
                <span >
                <img src={assetList} alt="abc" height="40" width="40"></img>
                <br></br>
                <span>{item['name']}</span>
                <svg height="16" width="16">
                  <path d="M12.55 1.98a6.77 6.77 0 10-9.57 9.57l4.2 4.21a.8.8 0 001.14 0l4.23-4.25a6.74 6.74 0 000-9.53zm-1.14 8.4l-3.64 3.65-3.65-3.66a5.15 5.15 0 117.3 0zm-2.3-2.33a1.86 1.86 0 11.54-1.3c-.01.5-.22.96-.57 1.3h.04z" />
                </svg>
                </span>
                {/* <span>{item.parent_asset.length-1 }</span> */}


              
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

export default SubAssetList

