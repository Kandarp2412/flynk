import {
    Button,
    Divider,
    InputLabel,
    TextareaAutosize,
    TextField,
    //   Autocomplete
  } from '@material-ui/core'
  import axios from 'axios'
  import './App.css'
  import React, { useEffect, useState, useRef } from 'react'
  import CameraAltIcon from '@material-ui/icons/CameraAlt'
  import InputBase from '@material-ui/core/InputBase'
  import AttachmentIcon from '@material-ui/icons/Attachment'
  import QRCode from 'qrcode.react'
  import Autocomplete from '@material-ui/lab/Autocomplete'
  import SearchIcon from '@material-ui/icons/Search'
  import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import SpeedOutlinedIcon from '@material-ui/icons/SpeedOutlined';
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
  import {
    alpha,
    ThemeProvider,
    withStyles,
    makeStyles,
    createTheme,
    AppBar,Drawer,Typography,Toolbar,ListItem,ListItemText,List,CssBaseline
  } from '@material-ui/core'
  import AddIcon from '@material-ui/icons/Add'
  import InboxIcon from '@material-ui/icons/MoveToInbox'
  import ListItemIcon from '@material-ui/core/ListItemIcon'
  import { loadCSS } from 'fg-loadcss';
import Icon from '@material-ui/core/Icon';
  import { BuildOutlined, SettingsInputComponent } from '@material-ui/icons'
  import { result } from 'lodash'
  import { createFilterOptions } from '@material-ui/lab/Autocomplete'
  import { useHistory } from 'react-router'
  import { useParams } from 'react-router-dom'
  import NewLocation from './NewLocation'
import Filter from './Filter'
;
import LocationList from './LocationList';
  
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
  
  function EditLocation() {
    let { itemId } = useParams()
    console.log(itemId)
    const classes = useStyles()
    const [flag,setFlag]=useState(false)
    const [listView,setListView]=useState(false)
    const handleSideBar=(e,text)=>{
        console.log(text)
    }
  
    const handleNewAssets =()=>{
      //   console.log(flag)
      // history.push('/asset/create')
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
    const [name, setname] = useState('')
  const vendorVal=useRef()
    const nameVal = useRef()
    const desVal = useRef()
    const teamVal = useRef()
    const serialVal = useRef()
    
  
    useEffect(() => {
      axios
        .get(
          ` http://demo.travel.webbrainstechnologies.com/api/locations_view/${itemId}`,
        )
        .then((res) => {
          console.log('k',res.data.result)
          setviewdata(res.data.result)
          nameVal.current = res.data.result.name
          desVal.current = res.data.result.description
          serialVal.current = res.data.result.address
          teamVal.current = res.data.result.team_id
          vendorVal.current = res.data.result.vendor_id
        })
        .catch((err2) => console.log(err2))
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
  
     
    }, [])
  
    const handlesno = (e) => {
      const { name, value } = e.target
      serialVal.current = value
      setsno(serialVal.current)
    }
    
    const handledesc = (e) => {
      const { name, value } = e.target
      desVal.current = value
      setdesc(desVal.current)
    }
   
  
    const handleChange = (e) => {
      const { name, value } = e.target
      nameVal.current = value
      setname(nameVal.current)
    }
  
   
  
    function handleUpdate() {
      axios
        .post('http://demo.travel.webbrainstechnologies.com/api/locations_update', {
          name: name,
          address: sno,
          description: desc,
          location_id: itemId,
          team_id:teamVal.current,
          vendor_id:vendorVal.current
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
   

  
    return (
      
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
       <div className="row">
        {flag? 
            <div className="col-lg-7">
            <NewLocation />
         </div>
                
            :
    <div style={{ border: '1px solid lightgrey', width: '600px' , }}>
        {console.log(teamVal.current)}
        <h2 style={{ textAlign: 'initial', marginLeft: '20px' }}>Edit Location</h2>
        <Divider />
        <div style={{ height: '380px', overflowY: 'scroll' }}>
          <TextField
            id="standard-basic"
            label="Enter Location Name"
            style={{ width: '500px', marginBottom: '20px' }}
            name="name"
            // value={name}
            value={nameVal.current}
            onChange={(e) => {
              handleChange(e)
            }}
          />
          {/* <Divider /> */}
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
            <label style={{ color: '#1887fc', position: 'relative', top: 21 }}>
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
              //   onChange={handleChange}
              onChange={(e) => {
                handledesc(e)
              }}
              style={{
                width: '500px',
                border: '1px solid lightgrey',
                borderRadius: '4px',
              }}
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
              <b>Address</b>
            </InputLabel>
            <BootstrapInput
              name="serial_number"
              id="bootstrap-input"
              style={{ width: '500px' }}
              value={serialVal.current}
              onChange={(e) => {
                handlesno(e)
              }}
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
              <b>Teams in charge</b>
            </InputLabel>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <Autocomplete
                onChange={(e, newValue) => {
                  setTeams(newValue)
                }}
                size="small"
                multiple={true}
                id="controllable-states-demo"
                options={teamOptions}
                style={{ width: 500 }}
                renderInput={(params) => (
                  <>
                    <SearchIcon
                      color="disabled"
                      style={{
                        position: 'absolute',
                        top: 15,
                        width: 20,
                        height: 20,
                      }}
                    />
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
                width: '150px',
                textTransform: 'none',
                justifyContent: 'flex-start',
                marginLeft: '50px',
                color: '#1887fc',
                borderColor: '#1887fc',
              }}
            >
              <AttachmentIcon style={{ color: '#1887fc ' }} />
              Attach files
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
              <b>Vendors</b>
            </InputLabel>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <Autocomplete
                size="small"
                onChange={(event, value) => setVendorValue(value)}
                multiple={true}
                id="controllable-states-demo"
                options={vendors.map((i) => i['name'])}
                style={{ width: 500 }}
                renderInput={(params) => (
                  <>
                    <SearchIcon
                      color="disabled"
                      style={{
                        position: 'absolute',
                        top: 15,
                        width: 20,
                        height: 20,
                      }}
                    />
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
              <b>Parent Location</b>
            </InputLabel>
            <Autocomplete
              freeSolo
              size="small"
              id="free-solo-2-demo"
              disableClearable
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
        </div>
      </div>     
            }
              <LocationList/>
            </div>
          
                 
      </main>
    </div>
      
    )
  }
  
  export default EditLocation
  