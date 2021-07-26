import {
  Button,
  Divider,
  InputLabel,
  TextareaAutosize,
  TextField,
  List,
  ListItemText,
  AppBar,
  Typography,
  ListItem,
  alpha,
  ThemeProvider,
  withStyles,
  makeStyles,
  createTheme,
  CssBaseline,
  Toolbar,
  Drawer,
  //   Autocomplete
} from '@material-ui/core'
import Modal from '@material-ui/core/Modal'
import Icon from '@material-ui/core/Icon'
import Vendor from './Vendor'
import VendorList from './VendorList'
import Filter from './Filter'
import axios from 'axios'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import './App.css'
import { loadCSS } from 'fg-loadcss'
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined'
import SpeedOutlinedIcon from '@material-ui/icons/SpeedOutlined'
import ListOutlinedIcon from '@material-ui/icons/ListOutlined'
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import { Avatar,} from '@material-ui/core'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import CloseIcon from '@material-ui/icons/Close'
import React, { useEffect, useState, useRef } from 'react'
import CameraAltIcon from '@material-ui/icons/CameraAlt'
import InputBase from '@material-ui/core/InputBase'
import AttachmentIcon from '@material-ui/icons/Attachment'
import QRCode from 'qrcode.react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import SearchIcon from '@material-ui/icons/Search'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import AddIcon from '@material-ui/icons/Add'
import { BuildOutlined, SettingsInputComponent } from '@material-ui/icons'
import { result } from 'lodash'
import { createFilterOptions } from '@material-ui/lab/Autocomplete'
import { useHistory } from 'react-router'
import { useParams } from 'react-router-dom'
import Sidebar from './Sidebar'
import AssetList from './AssetList'
import { isNullableTypeAnnotation } from '@babel/types'

const filter = createFilterOptions()
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

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    marginTop: '-25px',
    // width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase)

function EditAsset() {
  let { itemId } = useParams()
  console.log(itemId)
  const [extension, setExtension] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [phone, setPhone] = useState('')
  const [extensionName, setExtensionName] = useState('')

  const classes = useStyles()
  const [flag, setFlag] = useState(false)
  const [listView, setListView] = useState(false)

  const handleSideBar = (e, text) => {
    console.log(text)
  }
  const handleClose = () => {
    setOpen(false)
    setExtension(false)
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

  const history = useHistory()
  const [viewdata, setviewdata] = useState([])
  const [open, setOpen] = useState(false)
  const [qrInput, setQRInput] = useState('')
  const [qrInputOpen, setQRInputOpen] = useState(false)
  const [asset, setAsset] = useState([])
  const [vendors, setVendors] = useState([])
  const [location, setLocation] = useState([])
  const [loc, setLoc] = useState([])
  const [assetTypes, setAssetTypes] = useState([])
  const [vendorValue, setVendorValue] = useState([])
  const [parentAsset, setparentAsset] = useState([])
  const [parentAssetValue, setParentAssetValue] = useState([])
  const [year, setyear] = useState('')
  const [model, setmodel] = useState('')
  const [manu, setmanu] = useState('')
  const [sno, setsno] = useState('')
  const [desc, setdesc] = useState('')
  const teamOptions = ['webbrains', 'team1']
  const [teams, setTeams] = useState(teamOptions)
  const [selectedFile, setSelectedFile] = useState([])
  const [qrcode, setQR] = useState(Math.random)

  const parent = [
    'Real estate management',
    'Occupancy management',
    'Maintenance management',
    'Asset management',
  ]
  const [value, setValue] = useState(parent)
  const [inputValue, setInputValue] = useState('')


  const [vendorName, setVendorName] = useState('')
  const [asseteColor, setAssetColor] = useState('')
  const [description, setDescription] = useState('')
  const nameVal = useRef()
  const colorVal = useRef()
  const desVal = useRef()
  
  const handledesc = (e) => {
    const { name, value } = e.target
    desVal.current = value
    setDescription(desVal.current)
  }
  
  const handlecolor = (e) => {
    const { name, value } = e.target
    colorVal.current = value
    setAssetColor(colorVal.current)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    nameVal.current = value
    setVendorName(nameVal.current)
  }

  useEffect(() => {
    axios
      .get(
        `http://demo.travel.webbrainstechnologies.com/api/vendors_view/${itemId}`,
      )
      .then((res) => {
        console.log(res.data.vendor)
        setviewdata(res.data.vendor)
        nameVal.current = res.data.vendor.name
        desVal.current = res.data.vendor.description
        colorVal.current= res.data.vendor.vendor_color
        
      })
      .catch((err2) => console.log(err2))

    axios
      .post('http://demo.travel.webbrainstechnologies.com/api/assetTypes_list')
      .then((res) => {
        setAsset(res.data.result)
      })
      .catch((err) => console.log(err))

    axios
      .post('http://demo.travel.webbrainstechnologies.com/api/vendors_list')
      .then((res1) => {
        setVendors(res1.data.vendors)
      })
      .catch((err1) => console.log(err1))

    axios
      .post('http://demo.travel.webbrainstechnologies.com/api/locations_list')
      .then((res2) => {
        console.log(res2)
        setLocation(res2.data.locations)
      })
      .catch((err2) => console.log(err2))

    axios
      .post('http://demo.travel.webbrainstechnologies.com/api/assets_list')
      .then((res3) => {
        setparentAsset(res3.data.result)
      })
      .catch((err2) => console.log(err2))
  }, [])

  function handleUpdate() {
    axios
      .post('http://demo.travel.webbrainstechnologies.com/api/assets_update', {
        name: vendorName,
        vendor_color: asseteColor,
        description: description,
        // asset_id: itemId,
      })
      .then((res3) => {
        console.log(res3)
      })
      .catch((err2) => console.log(err2))
  }

  const handleFile = (e) => {
    const files = e.target.files
    setSelectedFile([...selectedFile, e.target.files])
  }
  const [table, setTable] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const [color, setColor] = useState('')
  const handleExtension = () => {
    setExtension(true)
  }

  const handleContactCreate = () => {
    console.log(name)
    setTable(true)
  }

  function handleCreateClick() {
    console.log(selectedFile)
    axios
      .post(
        'http://demo.travel.webbrainstechnologies.com/api/vendor_contacts_create',
        {
          vendor_id: 20,
          name: name,
          role_area: role,
          email: email,
          phone_number: phone,
          phone_extension: extensionName,
        },
      )
      .then((res) => {
        console.log(res)
        axios
          .post(
            ' http://demo.travel.webbrainstechnologies.com/api/vendors_create',
            {
              name: vendorName,
              vendor_color: asseteColor,
              description: description,
            },
          )

          .then((res1) => console.log(res1))
          .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))
  }



  return (
    <div>
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
          <div className="row">
            {flag ? (
              <div className="col-lg-7">
                <Vendor />
              </div>
            ) : (
              <div
                style={{
                  border: '1px solid lightgrey',
                  width: '600px',
                 
                }}
              >

                <h2 style={{ textAlign: 'initial', marginLeft: '20px' }}>
                  New Vendor
                </h2>
                <Divider />
                <div style={{ height: '500px', overflowY: 'scroll' }}>
                  <TextField
                    id="standard-basic"
                    label="Enter Vendor Name"
                    style={{ width: '500px', marginBottom: '20px' }}
                    name="name"
                    value={nameVal.current}
                    onChange={(e) => {handleChange(e) }}
                  />
                  
                  <Button
                    variant="contained"
                    component="label"
                    style={{
                      backgroundColor: '#e1f8ff',
                      textTransform: 'none',
                      border: '1px dashed #a5a5ff',
                      width: '500px',
                      height: '80px',
                      color: '#6464f3',
                    }}
                  >
                    <CameraAltIcon
                      style={{
                        display: 'grid',
                        color: '#1887fc ',
                        position: 'relative',
                        left: 62,
                        bottom: 10,
                      }}
                    />
                    <label
                      style={{
                        color: '#1887fc',
                        position: 'relative',
                        top: 21,
                      }}
                    >
                      Add or drag pictures
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/png, image/gif, image/jpeg"
                      onChange={handleFile}
                      style={{ opacity: 0 }}
                    />
                  </Button>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      marginTop: '20px',
                      marginLeft: '40px',
                      marginBottom: '20px',
                    }}
                  >
                    <label className="container">
                      ""
                      <input
                        type="radio"
                        name="radio"
                        onClick={(e) => {handlecolor(e) }}
                      />
                      <span className="check"></span>
                    </label>
                    <label className="container">
                      OBC
                      <input
                        type="radio"
                        name="radio"
                        onClick={(e) => {handlecolor(e) }}
                      />
                     
                      <span
                        className="check"
                        style={{ backgroundColor: 'green' }}
                      ></span>
                    </label>
                    <label class="container">
                      SC
                      <input
                        type="radio"
                        name="radio"
                        onClick={(e) => {handlecolor(e) }}
                      />
                      <span
                        class="check"
                        style={{ backgroundColor: 'orange' }}
                      ></span>
                    </label>
                    <label class="container">
                      ST
                      <input
                        type="radio"
                        name="radio"
                        onClick={(e) => {handlecolor(e) }}
                      />
                      <span
                        class="check"
                        style={{ backgroundColor: 'red' }}
                      ></span>
                    </label>
                    <label class="container">
                      ST
                      <input
                        type="radio"
                        name="radio"
                        onClick={(e) => {handlecolor(e) }}
                      />
                      <span
                        class="check"
                        style={{ backgroundColor: 'lightgreen' }}
                      ></span>
                    </label>
                    <label class="container">
                      ST
                      <input
                        type="radio"
                        name="radio"
                        onClick={(e) => {handlecolor(e) }}
                      />
                      <span
                        class="check"
                        style={{ backgroundColor: 'pink' }}
                      ></span>
                    </label>
                    <label class="container">
                      ST
                      <input
                        type="radio"
                        name="radio"
                        onClick={(e) => {handlecolor(e) }}
                      />
                      <span
                        class="check"
                        style={{ backgroundColor: 'violet' }}
                      ></span>
                    </label>
                    <label class="container">
                      ST
                      <input
                        type="radio"
                        name="radio"
                        onClick={(e) => {handlecolor(e) }}
                      />
                      <span
                        class="check"
                        style={{ backgroundColor: 'orange' }}
                      ></span>
                    </label>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <InputLabel
                      shrink
                      htmlFor="bootstrap-input"
                      style={{
                        marginLeft: '50px',
                        // fontWeight: '900px',
                        textAlign: 'initial',
                      }}
                    >
                      <b>Description</b>
                    </InputLabel>
                    <TextareaAutosize
                      aria-label="minimum height"
                      minRows={3}
                      name="description"
                      placeholder="Add a Description"
                     value={desVal.current}
                      onChange={(e) => {handledesc(e) }}
                      style={{
                        width: '500px',
                        border: '1px solid lightgrey',
                        borderRadius: '4px',
                      }}
                    />
                  </div>
                  <div>
                    <span
                      style={{
                        float: 'left',
                        color: '#757575',
                        marginLeft: '50px',
                      }}
                    >
                      Vendors Contact List
                    </span>
                    <br />
                    <div
                      onClick={handleOpen}
                      style={{
                        display: 'flex',
                        color: 'blue',
                        marginLeft: '40px',
                        marginTop: '10px',
                        marginBottom: '10px',
                        cursor: 'pointer',
                      }}
                    >
                      <AddCircleOutlineIcon />
                      New Contact
                    </div>

                    <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      className={classes.modal}
                      open={open}
                      onClose={handleClose}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500,
                      }}
                    >
                      <Fade in={open}>
                        <div className={classes.paper}>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <h2 id="transition-modal-title">New Contact</h2>
                            <CloseIcon
                              onClick={handleClose}
                              style={{ cursor: 'pointer' }}
                            />
                          </div>
                          <Divider />
                          <Avatar
                            style={{
                              marginLeft: 'auto',
                              marginRight: 'auto',
                              marginTop: '20px',
                              marginBottom: '20px',
                              height: '80px',
                              width: '80px',
                              fontSize: '45px',
                              backgroundColor: color,
                            }}
                          ></Avatar>
                          <p id="transition-modal-description">Contact Info</p>
                          <div className="row">
                            <div className="col-sm-6">
                              <p id="transition-modal-description">Full Name</p>
                              <br />
                              <TextField
                                onChange={(e) => setName(e.target.value)}
                                id="outlined-secondary"
                                placeholder="Name"
                                variant="outlined"
                                color="secondary"
                                style={{ width: '300px', marginTop: '-30px' }}
                              />

                              <p
                                id="transition-modal-description"
                                style={{ marginTop: '10px' }}
                              >
                                Email
                              </p>
                              <br />
                              <TextField
                                onChange={(e) => setEmail(e.target.value)}
                                id="outlined-secondary"
                                placeholder="Email"
                                variant="outlined"
                                color="secondary"
                                style={{ width: '300px', marginTop: '-30px' }}
                              />
                            </div>
                            <div
                              className="col-sm-6"
                              style={{ float: 'right' }}
                            >
                              <p id="transition-modal-description">Role/Area</p>
                              <br />
                              <TextField
                                onChange={(e) => setRole(e.target.value)}
                                id="outlined-secondary"
                                placeholder="Role/Area"
                                variant="outlined"
                                color="secondary"
                                style={{ width: '300px', marginTop: '-30px' }}
                              />
                              <p
                                id="transition-modal-description"
                                style={{ marginTop: '10px' }}
                              >
                                Phone Number
                              </p>
                              <br />
                              <TextField
                                onChange={(e) => setPhone(e.target.value)}
                                id="outlined-secondary"
                                placeholder="Phone Number"
                                variant="outlined"
                                color="secondary"
                                style={{ width: '300px', marginTop: '-30px' }}
                              />
                              <p
                                id="transition-modal-description"
                                style={{
                                  marginTop: '10px',
                                  color: 'blue',
                                  // display: "flex",
                                  cursor: 'pointer',
                                }}
                                onClick={handleExtension}
                              >
                                {extension === true ? (
                                  <>
                                    <p
                                      id="transition-modal-description"
                                      style={{ marginTop: '10px' }}
                                    >
                                      Extension
                                    </p>
                                    <br />
                                    <TextField
                                      onChange={(e) =>
                                        setExtensionName(e.target.value)
                                      }
                                      id="outlined-secondary"
                                      placeholder="Extension"
                                      variant="outlined"
                                      color="secondary"
                                      style={{
                                        width: '300px',
                                        marginTop: '-30px',
                                      }}
                                    />
                                  </>
                                ) : (
                                  <>
                                    {' '}
                                    <AddIcon />
                                    Add Phone Extension
                                  </>
                                )}
                              </p>
                            </div>
                            {/* <div> */}
                            <p>Contact Color</p>
                            <br />
                            {/* </div> */}
                            <div style={{ display: 'flex' }}>
                              <label class="container">
                                ""
                                <input
                                  type="radio"
                                  name="radio"
                                  onClick={(e) => setColor('blue')}
                                />
                                <span class="check"></span>
                              </label>
                              <label class="container">
                                OBC
                                <input
                                  type="radio"
                                  name="radio"
                                  onClick={(e) => setColor('green')}
                                />
                                {console.log(color)}
                                <span
                                  class="check"
                                  style={{ backgroundColor: 'green' }}
                                ></span>
                              </label>
                              <label class="container">
                                SC
                                <input
                                  type="radio"
                                  name="radio"
                                  onClick={(e) => setColor('orange')}
                                />
                                <span
                                  class="check"
                                  style={{ backgroundColor: 'orange' }}
                                ></span>
                              </label>
                              <label class="container">
                                ST
                                <input
                                  type="radio"
                                  name="radio"
                                  onClick={(e) => setColor('red')}
                                />
                                <span
                                  class="check"
                                  style={{ backgroundColor: 'red' }}
                                ></span>
                              </label>
                              <label class="container">
                                ST
                                <input
                                  type="radio"
                                  name="radio"
                                  onClick={(e) => setColor('lightgreen')}
                                />
                                <span
                                  class="check"
                                  style={{ backgroundColor: 'lightgreen' }}
                                ></span>
                              </label>
                              <label class="container">
                                ST
                                <input
                                  type="radio"
                                  name="radio"
                                  onClick={(e) => setColor('pink')}
                                />
                                <span
                                  class="check"
                                  style={{ backgroundColor: 'pink' }}
                                ></span>
                              </label>
                              <label class="container">
                                ST
                                <input
                                  type="radio"
                                  name="radio"
                                  onClick={(e) => setColor('violet')}
                                />
                                <span
                                  class="check"
                                  style={{ backgroundColor: 'violet' }}
                                ></span>
                              </label>
                              <label class="container">
                                ST
                                <input
                                  type="radio"
                                  name="radio"
                                  onClick={(e) => setColor('orange')}
                                />
                                <span
                                  class="check"
                                  style={{ backgroundColor: 'orange' }}
                                ></span>
                              </label>
                            </div>
                          </div>
                          <div style={{ display: 'flex', float: 'right' }}>
                            <Button color="primary">cancel</Button>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleContactCreate()}
                            >
                              Create
                            </Button>
                          </div>
                        </div>
                      </Fade>
                    </Modal>
                    {table ? (
                      <div>
                        <table>
                          <tr>
                            <th>FULL Name</th>
                            <th>Role</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                          </tr>
                          <tbody>
                            <tr>
                              <td>
                                {
                                  <div>
                                    <input
                                      type="radio"
                                      name="radio"
                                      value={color}
                                    />
                                  </div>
                                }
                                {name}
                              </td>

                              <td>{role}</td>
                              <td>{email}</td>
                              <td>{phone}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ) : null}
                    {/* </Button> */}
                  </div>
                  <Divider />
                  <div style={{ marginTop: '10px' }}>
                    <InputLabel
                      shrink
                      htmlFor="bootstrap-input"
                      style={{
                        marginLeft: '50px',
                        // fontWeight: '900px',
                        textAlign: 'initial',
                      }}
                    >
                      <b>Files</b>
                    </InputLabel>
                    <Button
                      variant="outlined"
                      type="button"
                      style={{
                        width: '180px',
                        textTransform: 'none',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        marginLeft: '50px',
                        color: '#1887fc',
                        borderColor: '#1887fc',
                      }}
                    >
                      <AttachmentIcon style={{ color: '#1887fc ' }} />
                      Attachfiles
                      <input
                        type="file"
                        multiple
                        onChange={handleFile}
                        style={{ color: '#1887fc', opacity: 0 }}
                      />
                    </Button>
                  </div>

                  <div style={{ marginTop: '10px' }}>
                    <InputLabel
                      shrink
                      htmlFor="bootstrap-input"
                      style={{
                        marginLeft: '50px',
                        // fontWeight: '900px',
                        textAlign: 'initial',
                      }}
                    >
                      <b>Location</b>
                    </InputLabel>
                    <Autocomplete
                      freeSolo
                      id="free-solo-2-demo"
                      disableClearable
                      size="small"
                      multiple
                      style={{ width: '86%', marginLeft: 39 }}
                      options={location.map((i) => i['name'])}
                      onChange={(event, value) => setLoc(value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Start typing..."
                          margin="normal"
                          variant="outlined"
                          InputProps={{ ...params.InputProps, type: 'search' }}
                        />
                      )}
                    />
                  </div>

                  <div style={{ marginTop: '10px' }}>
                    <InputLabel
                      shrink
                      htmlFor="bootstrap-input"
                      style={{
                        marginLeft: '50px',
                        // fontWeight: '900px',
                        textAlign: 'initial',
                      }}
                    >
                      <b>Asset </b>
                    </InputLabel>
                    <div
                      style={{ position: 'relative', display: 'inline-block' }}
                    >
                      <Autocomplete
                        onChange={(event, value) => setAssetTypes(value)}
                        multiple={true}
                        size="small"
                        id="controllable-states-demo"
                        options={asset.map((i) => i['name'])}
                        style={{ width: 500 }}
                        renderInput={(params) => (
                          <>
                            {/* <SearchIcon
                      color='disabled'
                      style={{
                        marginRight: "5px",
                        position: "absolute",
                        top: 15,
                        width: 20,
                        height: 20,
                      }}
                    /> */}
                            <TextField
                              placeholder="Start typing..."
                              {...params}
                              variant="outlined"
                            />
                          </>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <Divider style={{ marginTop: '10px' }} />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ margin: '5px', textTransform: 'none' }}
                    onClick={handleUpdate}
                  >
                    Update
                  </Button>
                  {/* </div>
          </div> */}
                </div>
              </div>
            )}
             <VendorList />
          </div>
         
        </main>
      </div>
    </div>
  )
}

export default EditAsset
