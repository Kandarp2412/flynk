
 import React, { useEffect, useState } from 'react'
 import { alpha, makeStyles } from '@material-ui/core/styles'
 import {
   Divider,
   InputLabel,
   Button,
   IconButton,
   Menu,
   MenuItem,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   Toolbar,CssBaseline,ListItemText,
 
   AppBar,Typography,Drawer,InputBase,List,ListItem
   //   Autocomplete
 } from '@material-ui/core'
 import QRCode from 'qrcode.react'
 import NewAsset from './NewAsset'
 import VendorList from './VendorList'
 import Filter from './Filter'

 import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
 import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
 import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
 import SpeedOutlinedIcon from '@material-ui/icons/SpeedOutlined';
 import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
 import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
 import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
 import MoreVertIcon from '@material-ui/icons/MoreVert'
 import axios from 'axios'
 import './AssetView.css'
 import {useParams} from "react-router-dom";
 import AddIcon from '@material-ui/icons/Add'
 import Icon from '@material-ui/core/Icon';
 import ListItemIcon from '@material-ui/core/ListItemIcon'
 import { loadCSS } from 'fg-loadcss';
 import {useHistory} from 'react-router'
 import InboxIcon from '@material-ui/icons/MoveToInbox'
 import SearchIcon from '@material-ui/icons/Search'


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
    // vertical padding + font size from searchIcon
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
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}))
function VendorView() {
  const classes = useStyles()
  const [flag,setFlag]=useState(false)
  const [listView,setListView]=useState(false)

  const handleSideBar=(e,text)=>{
      console.log(text)
  }

  const handleNewAssets =()=>{
    //   console.log(flag)
      setFlag(!flag)
      console.log(flag)
  }
  useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);
  
  let { itemId } = useParams();
  const history = useHistory()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const [data, setdata] = useState([])
  const [del, setdel] = useState(false)
  const [edit, setedit] = useState(false)
  const [newAsset, setnewAsset] = useState(false)
  const [input,setinput]=useState({
    des:false,
    
  })
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
    history.push('/location/create')
  }
  const handleok = () => {
    setdel(false)
    axios
    .get(`http://demo.travel.webbrainstechnologies.com/api/vendors_delete/${data.id}`)
    .then((res1) => {
      setdeldata(res1.status)
      console.log(res1.status)
      
      history.push('/vendor/list')
      
    })
    .catch((err1) => console.log(err1))

    
    
  }
  const handleEdit = () => {
    setedit(true)
    history.push(`/vendor/edit/${itemId}`)
   
  }

  useEffect(() => {
   
    axios
      .get(`http://demo.travel.webbrainstechnologies.com/api/vendors_view/${itemId}`)
      .then((res) => {
        console.log(res.data)
        setdata(res.data.vendor)
      })
      .catch((err2) => console.log(err2))

  }, [])

  return (
    <div className="row"> 
       <div className={classes.root}>
    <CssBaseline />
    <AppBar
      position="fixed"
      className={classes.appBar}
      style={{ backgroundColor: 'white', boxShadow: 'none' }}
    >
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" noWrap style={{ color: 'black' }}>
          Assets
        </Typography>
        <div style={{ display: 'flex' }}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon style={{ color: 'grey' }} />
            </div>
            <InputBase
              placeholder="Search Assets"
              style={{
                border: '1px solid lightgrey',
                color: 'black',
                marginRight: '15px',
              }}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              style={{ textTransform: 'none' }}
              onClick={handleNewAssets}
            >
              <AddIcon />
              New Asset
            </Button>
          </div>
        </div>
      </Toolbar>
    </AppBar>
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
          {/* <li style={{marginTop:"10px"}}>Work order</li>
          <li style={{marginTop:"10px"}}>Reporting</li>
          <li style={{marginTop:"10px"}}>Requests</li>
          <li style={{marginTop:"10px"}}>Assets</li>
          <li style={{marginTop:"10px"}}>Messages</li> */}
        {['Work Order', 'Reporting', 'Requests', 'Assets','Messages'].map((text, index) => (
          <ListItem button key={text} name={text} onClick={e=>handleSideBar(e,text)}>
            <ListItemIcon>
              {index % 5 === 0 ? <InboxIcon style={{marginLeft:"20px"}}/> :null}
              {index % 5 === 1 ? <AssessmentOutlinedIcon style={{marginLeft:"20px"}} /> :null}
              {index % 5 === 2 ? <InboxIcon style={{marginLeft:"20px"}}/> :null}
              {index % 5 === 3 ?  
<svg height="16" width="16" fill="gray" style={{marginLeft:"20px "}}>
<path d="M8 5a2 2 0 100-4 2 2 0 000 4zM.5 11h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm6 0a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-3zm9 0h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zM2.7 10V8.4h4.6V10h1.4V8.4h4.6V10h1.4V7.7A.7.7 0 0014 7H8.7V6H7.3v1H2a.7.7 0 00-.7.7V10h1.4z" />

</svg>:null}
              {index % 5 === 4 ? <Icon className="fa fa-comments" fontSize="small" style={{marginLeft:"20px"}}  />:null}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Categories', 'Parts Inventory', 'Procedure Library','Meters','Locations','Teams/Users'].map((text, index) => (
          <ListItem button key={text} name={text} onClick={e=>handleSideBar(e,text)}>
            <ListItemIcon>
              {index % 6 === 0 ? <LocalOfferOutlinedIcon style={{marginLeft:"20px"}}/> : null}
              {index % 6 === 1 ? <SettingsOutlinedIcon style={{marginLeft:"20px"}}/> : null}
              {index % 6 === 2 ? <ListOutlinedIcon style={{marginLeft:"20px"}}/> : null}
              {index % 6 === 3 ? <SpeedOutlinedIcon style={{marginLeft:"20px"}}/> : null}
              {index % 6 === 4 ? <LocationOnOutlinedIcon style={{marginLeft:"20px"}}/> : null}
              {index % 6 === 5 ? <GroupOutlinedIcon style={{marginLeft:"20px"}}/> : null}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Typography paragraph style={{ textAlign: 'initial' }}>
        <Filter />
      </Typography>
     <div >
      {flag? 
          <div  style={{position:'relative',left:'40%'}}>
              <NewAsset />
              </div>
              :
              (
                <div style={{ border: '1px solid lightgrey', width: '600px',position:'relative',left:'72%' }}>
              <div style={{ display: 'flex', height: '5em' }}>
                {console.log(data.location)}
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
                    left: '63%',
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
                  style={{ position: 'relative', left: '62%' }}
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
                  <MenuItem onClick={handleDelete}>Delete</MenuItem>
                 
                  <MenuItem onClick={handleClose}>Use in New Order</MenuItem>
                </Menu>
              </div>
              <Divider />
              <div style={{ height: '200px', overflowY: 'scroll' }}>
                <InputLabel>
                  {' '}
                  <b>Description</b>{' '}
                </InputLabel>
                <p>{data.description}</p>
                
                <Divider />
          
                  <InputLabel >
                    {' '}
                    <b>Vendor Contact List</b>{' '}
                  </InputLabel>
                  <table>
                  <tr>
                    <th>FULL Name</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                  </tr>
                 <tbody>
                 <tr>
                   {/* <td>{ <div>
                    <input
                          type='radio'
                          name='radio'
                         value={color}
                        />
                      
                   </div>
                   }{name}
                   </td>
                 
                   <td>{role}</td>
                   <td>{email}</td>
                   <td>{phone}</td> */}
                 </tr>
                 </tbody>
                </table>
                <Divider />
                <div style={{ display: 'flex' }}>
                  <InputLabel>
                    {' '}
                    <b>Location</b>{' '}
                  </InputLabel>
                  <p id="model">{data.location?.map(i=>i['name'])}</p> &nbsp;
                  <InputLabel>
                    {' '}
                    <b>Asset</b>{' '}
                  </InputLabel>
                  {/* <p id="model">{data.vendor?.map(i=>i['name'])}</p> &nbsp; */}
                </div>
        
                <Divider />
                <div>
                  <span>Created By User on Date,time</span>
                  <br></br>
                  <span>Last updated on Date,time</span>
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
       )}
       </div>
       </main>
 </div>
 <div  style={{position:'relative',left:'-47%',marginTop:'11%'}}>
 <VendorList/>
 </div>
     
     </div>
 )}

export default VendorView
