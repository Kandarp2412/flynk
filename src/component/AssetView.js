import React, { useEffect, useState,useContext } from 'react'
import { alpha, makeStyles } from '@material-ui/core/styles'
import {
  Divider,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import moment from 'moment'
import { GlobalState } from '../context/GlobalState'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import axios from 'axios'
import './AssetView.css'
import { useParams } from 'react-router-dom'
import { loadCSS } from 'fg-loadcss'
import { useHistory } from 'react-router'
import Assets from './Assets'

const ITEM_HEIGHT = 48
const drawerWidth = 235

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '15ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },

  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}))

function AssetView() {
  const history = useHistory()

  useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    )

    return () => {
      node.parentNode.removeChild(node)
    }
  }, [])

  let { itemId } = useParams()
  const { asname,setasname,sysname,setsysname,
    teamname,setteamname,passetname,setpassetname,
    assettypename,setassettypename} = useContext(GlobalState)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const [data, setdata] = useState([])
  const [del, setdel] = useState(false)
  const [edit, setedit] = useState(false)
  const [newAsset, setnewAsset] = useState(false)
  const [restore, setrestore] = useState(false)
  const [loc, setLoc] = useState([])
  const [syscat, setsyscat] = useState([])
  const [syscatname, setsyscatname] = useState([])
  const [deldata, setdeldata] = useState([])
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleDelete = () => {
    setdel(true)
  }
  const handleCancel = () => {
    setdel(false)
  }
  const handleNewAsset = () => {
    setnewAsset(true)
    history.push('/asset/create')
  }
  const handleok = () => {
    setdel(false)
    axios
      .get(
        `http://demo.travel.webbrainstechnologies.com/api/assets_delete/${data.id}`
      )
      .then((res1) => {
        setdeldata(res1.status)
        console.log(res1.status)
        setrestore(true)
      },{headers})
      .catch((err1) => console.log(err1))
    setAnchorEl(null)
  }
  const handleEdit = () => {
    setedit(true)
    history.push(`/asset/edit/${itemId}`)
  }

  useEffect(() => {
    const headers = {
      'Content-Type': "text/plain",
      };
    axios
      .get(
        `http://demo.travel.webbrainstechnologies.com/api/assets_view/${itemId}`
      )
      .then((res) => {
        setdata(res.data.asset)
       setLoc(res.data.asset['location_id'])
       setasname(res.data.asset.location_id['name'])
       setassettypename(res.data.asset.asset_type_id)
       setteamname(res.data.asset.team_id)
       setsysname(res.data.asset['system_categories'])
       setsyscat(res.data.asset.system_categories)
       setpassetname(res.data.asset['parent_asset_name'])
        localStorage.setItem('Asset_Name', res.data.asset.name)
        localStorage.setItem('Asset_id', res.data.asset.id)
        // localStorage.setItem("Asset_Img", res.data.asset.asset_image);
        localStorage.setItem('Asset_Description', res.data.asset.description)
        localStorage.setItem('Asset_SerialNumber', res.data.asset.serial_number) 
        localStorage.setItem('Asset_Manufacturer', res.data.asset.manufacturer)
        localStorage.setItem('Asset_Parent', res.data.asset.parent_asset_name)
        localStorage.setItem('Asset_LocationId', res.data.asset.location_id)
        localStorage.setItem('System Category',res.data.result.system_categories)
         
      },{headers})
      .catch((err2) => console.log(err2))

      axios
      .get(
        `http://demo.travel.webbrainstechnologies.com/api/system_categoeries_view/${syscat}`,
     
      )
      .then((res) => {
      setsyscatname(res.data?.result?.['name'])
      console.log('viewsys',res.data.result['name'])
      },{headers : {
        'Content-Type': "text/plain",
        }})
      .catch((err2) => console.log(err2))


  }, [])
  const handleRestore = () => {
    const headers = {
      'Content-Type': "text/plain",
      };
    axios
      .post(`http://demo.travel.webbrainstechnologies.com/api/assets_create`, {
        name: localStorage.getItem('Asset_Name'),
        manufracture: localStorage.getItem('Asset_Manufacturer'),
        location_id: localStorage.getItem('Asset_LocationId'),
        description: localStorage.getItem('Asset_Description'),
        serial_number: localStorage.getItem(' Asset_SerialNumber'),
        parent_asset: localStorage.getItem('Asset_Parent'),
      })
      .then((res1) => {
        console.log(res1)
      },{headers})
      .catch((err1) => console.log(err1))
    setAnchorEl(null)
  }

  return (
    <div className="row">
      <div className="col-lg-6">
        <Assets />
      </div>
      <div className="col-lg-5">
       
        <div
          style={{
            border: '1px solid lightgrey',
            width: '600px',
            marginTop: '27%',
          }}
        >
          <div style={{ display: 'flex', height: '5em' }}>
            <h2 style={{ textAlign: 'initial', marginLeft: '20px' }}>
              {data?.name}
            </h2>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleEdit}
              style={{
                backgroundColor: ' #fff',
                borderColor: '#1887fc',
                color: '#1887fc',
                fill: 'currentColor',
                height: '2.5em',
                position: 'relative',
                left: '51%',
                top: '28%',
              }}
              startIcon={
                <svg height="16" width="16">
                  <path d="M12.1 2.4a1.15 1.15 0 011.24 1.88l-.72.72L11 3.38l.72-.72c.1-.11.23-.2.37-.25zm-1.85 1.73l-5.6 5.59 1.63 1.62 5.6-5.59-1.63-1.62zm-4.72 7.96l-1.62-1.62-.7.7-.6 2.23 2.22-.61.7-.7zm7-11.09a2.47 2.47 0 00-1.74.72l-8.64 8.64a.66.66 0 00-.17.29l-.96 3.52a.66.66 0 00.81.8l3.52-.95a.66.66 0 00.3-.17l8.63-8.64A2.47 2.47 0 0012.53 1z" />
                </svg>
              }
            >
              Edit
            </Button>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
              style={{ position: 'relative', left: '51%' }}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch',
                },
              }}
            >
              <MenuItem onClick={handleNewAsset}>Copy to New Asset</MenuItem>
              <MenuItem onClick={handleClose}>Copy to New Order</MenuItem>
              {restore ? (
                <MenuItem onClick={handleRestore}>Restore</MenuItem>
              ) : (
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              )}
            </Menu>
          </div>
          <Divider />
          <div style={{ height: '380px', overflowY: 'scroll' }}>
          <div style={{ display: 'flex', height: '20%' }}>
            <p>
              {' '}
              <b style={{marginLeft:'10%'}}>Description</b>{' '}
              <span style={{position:'relative',top:'9%'}}>{data?.description}</span>&nbsp;
            </p>
            </div>
            <Divider />
            <div style={{ display: 'flex', height: '40%' }}>
              <p>
                {' '}
                <b style={{marginLeft:'10%'}}> Tag Number</b>{' '}
                <span  style={{position:'relative',top:'9%'}}>{data?.serial_number}</span> &nbsp;
              </p>
             
              <p>
                {' '}
                <b  style={{position:'relative',left:'92%'}}>Manufracture</b>{' '}
                <span  style={{position:'relative',top:'20%',left:'44%'}}>{data?.manufacturer}</span>&nbsp;
              </p>
    
              <p >
                {' '}
                <b style={{position:'relative',left:'130%'}}>Teams in Charge</b>{' '}
                <span  style={{position:'relative',top:'24%',left:'78%'}}>{data?.team_id}</span> &nbsp;
              </p>
             
              <p>
                {' '}
                <b style={{position:'relative',right:'330%',top:'56%'}}>Criticality</b>{' '}
                <span style={{position:'relative',top:'76%',right:'391%'}}>{data?.criticality}</span> &nbsp;
              </p>
            </div>

            <Divider />
            <div style={{ display: 'flex' }}>
              <p>
                {' '}
                <b style={{position:'relative',left:'26%'}}>Parent Asset</b>{' '}
              </p>
              <span>{data?.parent_asset_name}</span>&nbsp;
              <p>
                {' '}
                <b style={{marginLeft:"171%"}}>Location</b>{' '}
              </p>
              <span  style={{position: "relative",lineHeight: '5em', left: "8%"}}>{loc['name']}</span>&nbsp;
            </div>

            <Divider />
            <div style={{ display: 'flex' }}>
              <p>
                {' '}
                <b style={{position: "relative", left: "10%"}}>System Category</b>{' '}
                <span  style={{position: "relative", left: "-42%",top:'43%'}}>{syscatname}</span>&nbsp;
              </p>
              <p>
                {' '}
                <b style={{position: "relative", left: "39%"}}>Group</b>{' '}
                <span  style={{position: "relative", left: "-10%",top:'43%'}}>{loc['name']}</span>&nbsp;
              </p>

              <p>
                {' '}
                <b  style={{position: "relative",top:'-34%',left:'83%'}}>Asset Type</b>{' '}
                <span  style={{position: "relative", left: "26%",lineHeight:'5em'}}>{data?.asset_type_id}</span>&nbsp;
              </p>
            

            </div>
            <Divider/>
            <div style={{ display: 'flex' }}>
              <p>
                {' '}
                <b style={{position: "relative",left:'12%'}}>Attached Files</b>{' '}
              </p>
              <p  style={{position: "relative", left: "-15%",lineHeight:'5em'}}>{data?.asset_files?.[0]['reference_type_file']}</p> &nbsp;
            </div>
            <div style={{ display: 'flex' }}>
              <p>
                {' '}
                <b style={{position: "relative",left:'12%',display:'flex'}}>Custom Data</b>{' '}
              </p>
              <p >{data?.asset_custom_data?.map((i)=>{
                
                return(
                  <div>
                    
                <p style={{position: "relative",left:'12%'}}>{i?.custom_name}</p>
                <p>{i?.custom_value}</p>
                <p>{i?.custom_unit}</p>
                  </div>
                 
                )
                
              })}</p> &nbsp;
            </div>
            <Divider />
            <div>
            <span>{`Created By User on  ${moment(data?.created_at).format('DD/MM/YYYY ,h:mm:ss a')}`}</span>
              <br></br>
              <span>{`Last updated on  ${moment(data?.updated_at).format('DD/MM/YYYY ,h:mm:ss a')}`}</span>
            </div>
          </div>
          {del ? (
            <Dialog
              open={del}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{'Flynlk'}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {`Are you sure you want to delete ${data.name}?`}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancel} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleok} color="primary" autoFocus>
                  ok
                </Button>
              </DialogActions>
            </Dialog>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default AssetView