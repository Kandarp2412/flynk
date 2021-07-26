import React, { useEffect, useState } from 'react'
import { alpha, makeStyles } from '@material-ui/core/styles'
import {
  Divider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Toolbar,
  CssBaseline,
  ListItemText,
  AppBar,
  Typography,
  Drawer,
  InputBase,
  List,
  ListItem,
  TextField,
  //   Autocomplete
} from '@material-ui/core'
import NewAsset from './NewAsset'
import AssetList from './AssetList'
import Filter from './Filter'
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined'
import SpeedOutlinedIcon from '@material-ui/icons/SpeedOutlined'
import ListOutlinedIcon from '@material-ui/icons/ListOutlined'
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import axios from 'axios'
import './AssetView.css'
import { useParams } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import Icon from '@material-ui/core/Icon'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { loadCSS } from 'fg-loadcss'
import { useHistory } from 'react-router'
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

function SubAssetView() {
  const history = useHistory()
  const classes = useStyles()
  const [flag, setFlag] = useState(false)
  const [listView, setListView] = useState(false)

  const handleSideBar = (e, text) => {
    console.log(text)
  }

  const handleNewAssets = () => {
    //   console.log(flag)
    // history.push('/asset/create')
    setFlag(!flag)
    console.log(flag)
  }
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

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const [data, setdata] = useState([])
  const [del, setdel] = useState(false)
  const [edit, setedit] = useState(false)
  const [newAsset, setnewAsset] = useState(false)
  const [restore, setrestore] = useState(false)
  const [input, setinput] = useState({
    des: false,
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
    history.push('/asset/create')
  }
  const [view,setview]=useState(false)
  const [subasset, setSubAsset] = useState('')
  const handleok = (e) => {
    
    axios
      .post("http://demo.travel.webbrainstechnologies.com/api/assets_create", {
        name: subasset,
        
      })
      .then((res) => {
        console.log("result", res);
     history.push('./view')
        
      })
      .catch((err) => console.log(err))
  }

 
  useEffect(() => {
    axios
      .get(
        `http://demo.travel.webbrainstechnologies.com/api/assets_view/${itemId}`,
      )
      .then((res) => {
       
        setdata(res.data.asset)
      })
      .catch((err2) => console.log(err2))
  }, [])

  return (
    <div className='row'>
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
            {['Work Order', 'Reporting', 'Requests', 'Assets', 'Messages'].map(
              (text, index) => (
                <ListItem
                  button
                  key={text}
                  name={text}
                  onClick={(e) => handleSideBar(e, text)}
                >
                  <ListItemIcon>
                    {index % 5 === 0 ? (
                      <InboxIcon style={{ marginLeft: '20px' }} />
                    ) : null}
                    {index % 5 === 1 ? (
                      <AssessmentOutlinedIcon style={{ marginLeft: '20px' }} />
                    ) : null}
                    {index % 5 === 2 ? (
                      <InboxIcon style={{ marginLeft: '20px' }} />
                    ) : null}
                    {index % 5 === 3 ? (
                      <svg
                        height="16"
                        width="16"
                        fill="gray"
                        style={{ marginLeft: '20px ' }}
                      >
                        <path d="M8 5a2 2 0 100-4 2 2 0 000 4zM.5 11h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm6 0a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-3zm9 0h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zM2.7 10V8.4h4.6V10h1.4V8.4h4.6V10h1.4V7.7A.7.7 0 0014 7H8.7V6H7.3v1H2a.7.7 0 00-.7.7V10h1.4z" />
                      </svg>
                    ) : null}
                    {index % 5 === 4 ? (
                      <Icon
                        className="fa fa-comments"
                        fontSize="small"
                        style={{ marginLeft: '20px' }}
                      />
                    ) : null}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ),
            )}
          </List>
          <Divider />
          <List>
            {[
              'Categories',
              'Parts Inventory',
              'Procedure Library',
              'Meters',
              'Locations',
              'Teams/Users',
            ].map((text, index) => (
              <ListItem
                button
                key={text}
                name={text}
                onClick={(e) => handleSideBar(e, text)}
              >
                <ListItemIcon>
                  {index % 6 === 0 ? (
                    <LocalOfferOutlinedIcon style={{ marginLeft: '20px' }} />
                  ) : null}
                  {index % 6 === 1 ? (
                    <SettingsOutlinedIcon style={{ marginLeft: '20px' }} />
                  ) : null}
                  {index % 6 === 2 ? (
                    <ListOutlinedIcon style={{ marginLeft: '20px' }} />
                  ) : null}
                  {index % 6 === 3 ? (
                    <SpeedOutlinedIcon style={{ marginLeft: '20px' }} />
                  ) : null}
                  {index % 6 === 4 ? (
                    <LocationOnOutlinedIcon style={{ marginLeft: '20px' }} />
                  ) : null}
                  {index % 6 === 5 ? (
                    <GroupOutlinedIcon style={{ marginLeft: '20px' }} />
                  ) : null}
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
          <div>
            {flag ? (
              <div style={{ position: 'relative', left: '40%' }}>
                <NewAsset />
              </div>
            ) : (
              <div
                style={{
                  border: '1px solid lightgrey',
                  width: '600px',
                  position: 'relative',
                  left: '72%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ display: 'flex', height: '5em' }}>
                  <h2 style={{ textAlign: 'initial', marginLeft: '20px' }}>
                    {data?.name}
                  </h2>
                </div>
                <span style={{marginRight:'85%'}}>SubAssets</span>
                <svg
                  height="16"
                  width="16"
                  fill="gray"
                  style={{ marginLeft: '20px ' }}
                >
                  <path d="M8 5a2 2 0 100-4 2 2 0 000 4zM.5 11h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm6 0a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-3zm9 0h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zM2.7 10V8.4h4.6V10h1.4V8.4h4.6V10h1.4V7.7A.7.7 0 0014 7H8.7V6H7.3v1H2a.7.7 0 00-.7.7V10h1.4z" />
                </svg>
                <span onClick={handleDelete} style={{ cursor: 'pointer',marginRight:'76%',color:'#1887fc' }}>
                  <AddIcon /> Create sub asset
                </span>
                <span onClick={console.log('h')}>{subasset}</span>
                {del ? (
                  <div>
                    <Dialog
                      open={del}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {'New Sub Asset'}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          <TextField
                            id="standard-basic"
                            label="Sub Asset Name"
                            name="name"
                            defaultValue={subasset}
                          onChange={(e)=>setSubAsset(e.target.value)}
                          />
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCancel} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={handleok} color="primary" >
                          Create Sub Asset
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                ) : null}
               
              </div>
            )}
          </div>
        </main>
      </div>
      <div style={{position:'relative',left:'-47%',marginTop:'11%'}}>
        <AssetList />
      </div>
    </div>
  )
}

export default SubAssetView
