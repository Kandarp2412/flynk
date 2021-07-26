import {
  Button,
  Divider,
  InputLabel,
  TextareaAutosize,
  TextField,
  alpha,
  withStyles,
  makeStyles,
  //   Autocomplete
} from '@material-ui/core'
import axios from 'axios'
import './App.css'
import { loadCSS } from 'fg-loadcss'
import Assets from './Assets'
import React, { useEffect, useState, useRef, useContext } from 'react'
import InputBase from '@material-ui/core/InputBase'
import AttachmentIcon from '@material-ui/icons/Attachment'
import Autocomplete from '@material-ui/lab/Autocomplete'
import SearchIcon from '@material-ui/icons/Search'
import { GlobalState } from '../context/GlobalState'
import AddIcon from '@material-ui/icons/Add'

import { useHistory } from 'react-router'
import { useParams } from 'react-router-dom'
import CreatableSelect from 'react-select/creatable'

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
  const [asset, setAsset] = useState([])

  const [location, setLocation] = useState([])

  const [loc_id, setLocid] = useState([])
  const [parentAsset, setparentAsset] = useState([])
  const [parentAssetValue, setParentAssetValue] = useState([])
  const [manu, setmanu] = useState('')
  const [sno, setsno] = useState('')
  const [desc, setdesc] = useState('')
  const teamOptions = ['webbrains', 'team1']
  const [teams, setTeams] = useState(teamOptions)
  const [selectedFile, setSelectedFile] = useState([])
  const {
    asname,
    setasname,
    sysname,
    setsysname,
    teamname,
    setteamname,
    passetname,
    setpassetname,
    assettypename,
    setassettypename,
    name1,
    setName1,
    syscatname,
    setsyscatname,
  } = useContext(GlobalState)
  const options1 = useRef([])
  const optionsys = useRef([])
  const [criticality, setcriticality] = useState('')
  
  const [customData, setcustomData] = useState(false)
  const assettypeOptions = ['Functional', 'Equipment']
  //const [assettype, setAssetType] = useState(assettypeOptions)
  const handleCustomData = () => {
    setcustomData(true)
  }
  const [syscat_id, setSysCatid] = useState([])
  const [syscat, setsyscat] = useState([])
  const [esysname, setesysname] = useState('')
  const [passet_id, setPassetid] = useState([])
  const [name, setname] = useState('')
  const [criti, setcriti] = useState('')
  const [team_id, setteam_id] = useState('')
  const [assetype, setassettype] = useState('')
  const [passetvalue, setpassetvalue] = useState('')
  const nameVal = useRef()
  const desVal = useRef()
  const serialVal = useRef()
  const manuVal = useRef()
  const critiVal = useRef()
  const teamidVal = useRef()
  const assettypeVal = useRef()
  const locVal = useRef()
  const passetVal = useRef()
  const imageVal = useRef()
  const customNameVal = useRef()
  const customValueVal = useRef()
  const customUnitVal = useRef()
  const fileRef = useRef(["png"])
  const [high, sethigh] = useState(true)
  const changeHigh = () => {
    setcriticality('high')
    sethigh(false)
    setmedium(true)
    setlow(true)
  }
  const [low, setlow] = useState(true)
  const changeLow = () => {
    setcriticality('low')
    sethigh(true)
    setmedium(true)
    setlow(false)
  }
  const [medium, setmedium] = useState(true)
  const changeMedium = () => {
    setcriticality('medium')
    sethigh(true)
    setmedium(false)
    setlow(true)
  }
  let high_class = high ? 'primary' : 'high'
  let low_class = low ? 'primary' : 'low'
  let medium_class = medium ? 'primary' : 'medium'
  const [customName,setcustomName]=useState('')
  const [customValue,setcustomValue]=useState('')
  const [customUnit,setcustomUnit]=useState('')
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

  const handlemanu = (e) => {
    const { name, value } = e.target
    manuVal.current = value
    setmanu(manuVal.current)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    nameVal.current = value
    setname(nameVal.current)
  }
  const handleCriti = (e) => {
    const { name, value } = e.target
    critiVal.current = value
    setcriti(critiVal.current)
  }
  const handleTeamid = (e, newValue) => {
    teamidVal.current = newValue
    setteam_id(teamidVal.current)
  }
  const handleAssettype = (e, newValue) => {
    assettypeVal.current = newValue
    setassettype(assettypeVal.current)
  }
  const handlepassetvalue = (e, newValue) => {
    passetVal.current = newValue
    setpassetvalue(passetVal.current)
  }
  const handlecustomvalue = (e) => {
    const { name, value } = e.target
    customValueVal.current = value
    setcustomValue(customValueVal.current)
  }
  const handlecustomname= (e) => {
    const { name, value } = e.target
    customNameVal.current = value
    setcustomName(customNameVal.current)
  }
  const handlecustomunit = (e) => {
    const { name, value } = e.target
    customUnitVal.current = value
    setcustomUnit(customUnitVal.current)
  }
 
  useEffect(() => {
    const headers = {
      'Content-Type': "text/plain",
      };
    axios
      .get(
        `http://demo.travel.webbrainstechnologies.com/api/system_categoeries_view/${sysname}`
      )
      .then((res1) => {
        setesysname(res1.data?.result?.['name'])
        
      },{headers})
      .catch((err1) => console.log(err1))

    axios
      .get(
        `http://demo.travel.webbrainstechnologies.com/api/assets_view/${itemId}`
      )
      .then((res) => {
        setviewdata(res.data.asset)
        customNameVal.current=res.data.asset.asset_custom_data.map(i=>i['custom_name'])
        customValueVal.current=res.data.asset.asset_custom_data.map(i=>i['custom_value'])
        customUnitVal.current=res.data.asset.asset_custom_data.map(i=>i['custom_unit'] )
     
        imageVal.current =res.data.asset.asset_files?.[0]['reference_type_file']
        locVal.current = res.data.asset.location_id['name']
        nameVal.current = res.data.asset.name
        desVal.current = res.data.asset.description
        serialVal.current = res.data.asset.serial_number
        manuVal.current = res.data.asset.manufacturer
        critiVal.current = res.data.asset.criticality
        teamidVal.current = res.data.asset.team_id
        assettypeVal.current = res.data.asset.asset_type_id
        passetVal.current = res.data.asset.parent_asset_name
      },{headers})
      .catch((err2) => console.log(err2))

    axios
      .post('http://demo.travel.webbrainstechnologies.com/api/locations_list')
      .then((res2) => {
        setLocation(res2.data.locations)
        setLocid(res2.data.locations.map((i) => i.id))
        options1.current = res2.data.locations.map((i) => i.name)
      },{headers})
      .catch((err2) => console.log(err2))

    axios
      .post(
        'http://demo.travel.webbrainstechnologies.com/api/system_categoeries_list'
      )
      .then((res3) => {
        setsyscat(res3.data.result)
        setSysCatid(res3.data.result.map((i) => i.id))
        optionsys.current = res3.data.result.map((i) => i.name)
      },{headers})
      .catch((err2) => console.log(err2))

    axios
      .post('http://demo.travel.webbrainstechnologies.com/api/assets_list')
      .then((res3) => {
        setparentAsset(res3.data.result.map((i) => i.name))
        setPassetid(res3.data.result.map((i) => i.id))
      }, {headers})
      .catch((err2) => console.log(err2))
  }, [])
  const [file, setFile] = useState(null)

  
  const handleFile = (e) => {
    const files = e.target.files
    setSelectedFile([...selectedFile, e.target.files])
  }
  let createOption1 = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
  })
  let defaultOptions1 = []

  for (let i of options1.current) {
    defaultOptions1 = [...defaultOptions1, createOption1(i)]
  }
  const handleChangeLocation = (newValue1, actionMeta) => {
    setName1(newValue1.label)

    if (actionMeta.action == 'create-option') {
      setName1(newValue1)
      history.push({
        pathname: '/location/create',
        state: { newValue1: newValue1 },
      })

      setAsset(asset.slice().concat(createOption1(newValue1.value)))
    }
  }

  let createOptionSysCat = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
  })
  let defaultOptionsyscat = []

  for (let i of optionsys.current) {
    defaultOptionsyscat = [...defaultOptionsyscat, createOptionSysCat(i)]
  }
  const handleChangeSysCat = (newValue1, actionMeta) => {
    setsyscatname(newValue1.label)
    if (actionMeta.action == 'create-option') {
      setsyscatname(newValue1)
      history.push({
        pathname: '/asset/categories/create',
        state: { newValue1: newValue1 },
      })

      setAsset(asset.slice().concat(createOptionSysCat(newValue1.value)))
    }
  }
  const [locationstate, setLocationState] = useState({
    isLoading: false,
    options1: defaultOptions1,
    value: undefined,
  })
  const [sysstate, setsysstate] = useState({
    isLoading: false,
    options1: defaultOptionsyscat,
    value: undefined,
  })

  const submit = (e)=>{
    // console.log('h')
    console.log("wef")
    e.preventDefault()
  
    let pid = parentAsset.indexOf(passetvalue)
    let lid = options1.current.indexOf(name1)
    let sid = optionsys.current.indexOf(syscatname)
    
    let formData1 = new FormData()
  
  formData1.append('name',nameVal.current)

    if(file !== null){
      formData1.append('asset_files[]',file)
    }  
    formData1.append('description',desc)
    formData1.append('serial_number',sno)
    formData1.append('manufracturer',manu)
    formData1.append('team_id',team_id)
    formData1.append('asset_type_id',assetype)
    formData1.append('asset_id',itemId)
    
    formData1.append('criticality',criticality)
    formData1.append('parent_asset',passet_id[pid])
    formData1.append('system_categories',syscat_id[sid])
    formData1.append('location_id',loc_id[lid])
    
    formData1.append('customData[0][name]',customName);
    formData1.append('customData[0][value]',customValue);
    formData1.append('customData[0][unit]',customUnit);
  
  axios.post('http://demo.travel.webbrainstechnologies.com/api/assets_update',formData1)
      .then(response => {console.log(response)
       history.push(`/asset/view/${itemId}`)
      })
      .catch(data => console.log(data))
  }
  return (
    <form >
      {/* {console.log("ed")} */}
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
         {console.log(customNameVal,customUnit)} 
          <div style={{display:'flex',height:'5em',marginTop:'3%'}}>
          <svg height="19" width="11" onClick={()=>history.push(`/asset/view/${itemId}`)} style={{position:'relative',top:'15%',left:'2%'}}>
            <path d="M9.5 1.72L1.72 9.5l7.78 7.78" stroke-linecap="round" />
          </svg>
          <h2 style={{ textAlign: 'initial', marginLeft: '20px' }}>
            Edit Asset
          </h2>
          </div>
          
          <Divider />
          <div style={{ height: '380px', overflowY: 'scroll' }}>
            <TextField
              id="standard-basic"
              placeholder="Enter Asset Name"
              style={{ width: '500px', marginBottom: '20px' }}
              name="name"
              value={nameVal.current}
              onChange={(e) => {
                handleChange(e)
              }}
            />

            <div style={{ marginTop: '10px' }}>
              <InputLabel
                shrink
                htmlFor="bootstrap-input"
                style={{
                  marginLeft: '50px',
                  textAlign: 'initial',
                }}
              >
                <b>Location</b>
              </InputLabel>
              <CreatableSelect
                isClearable
                placeholder="start typing"
                defaultInputValue={asname}
                onChange={handleChangeLocation}
                options={defaultOptions1}
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
                <b>Description</b>
              </InputLabel>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                name="description"
                placeholder="Add a Description"
                value={desVal.current}
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

                  textAlign: 'initial',
                }}
              >
                <b>Tag Number</b>
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
                  textAlign: 'initial',
                }}
              >
                <b>Manufacturer</b>
              </InputLabel>
              <BootstrapInput
                name="manufracture"
                id="bootstrap-input"
                value={manuVal.current}
                style={{ width: '500px' }}
                onChange={(e) => {
                  handlemanu(e)
                }}
              />
            </div>

            <div style={{ marginTop: '10px' }}>
              <InputLabel
                shrink
                htmlFor="bootstrap-input"
                style={{
                  marginLeft: '50px',
                  textAlign: 'initial',
                }}
              >
                <b>Teams in charge</b>
              </InputLabel>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <Autocomplete
                  onChange={handleTeamid}
                  size="small"
                  defaultValue={teamname}
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
              
              <p>{imageVal.current}</p> &nbsp;
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
                  onChange={e => setFile(e.target.files[0])}
                  // onChange={handleFile}
                  // assasset_fileset_files
                  // accept="image/png"
                  style={{ color: '#1887fc', opacity: 0 }}
                  ref = {fileRef}
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
                <b>Asset Types</b>
              </InputLabel>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <Autocomplete
                  onChange={handleAssettype}
                  defaultValue={assettypename}
                  size="small"
                  id="controllable-states-demo"
                  options={assettypeOptions}
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
                  textAlign: 'initial',
                }}
              >
                <b>System Categories</b>
              </InputLabel>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                {console.log(esysname)}
                <CreatableSelect
                  isClearable
                  placeholder="start typing"
                  defaultInputValue={esysname}
                  onChange={handleChangeSysCat}
                  options={defaultOptionsyscat}
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
                <b>Parent Asset</b>
              </InputLabel>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <Autocomplete
                  onChange={handlepassetvalue}
                  defaultValue={passetVal.current}
                  size="small"
                  options={parentAsset}
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
              <div style={{ marginTop: '10px' }}>
                <InputLabel
                  shrink
                  htmlFor="bootstrap-input"
                  style={{
                    marginLeft: '50px',
                    textAlign: 'initial',
                  }}
                >
                  <b>Criticality</b>
                </InputLabel>
                <button
                  className={high_class}
                  style={{ width: '100px' }}
                  onClick={changeHigh}
                >
                  High
                </button>
                <button
                  className={low_class}
                  onClick={changeLow}
                  style={{ width: '100px' }}
                >
                  {' '}
                  Low
                </button>
                <button
                  className={medium_class}
                  onClick={changeMedium}
                  style={{ width: '100px' }}
                >
                  Medium
                </button>
              </div>
              <div style={{ padding: '2%' }}>
                <span
                  onClick={handleCustomData}
                  style={{ cursor: 'pointer', marginRight: '70%' }}
                >
                  <AddIcon />
                  custom Data
                </span>
                {customUnitVal.current ||customValueVal.current || customNameVal.current ? (
                  <div>
                    <p style={{ marginRight: '70%' }}>Custom Property</p>
                    <div>
                      <TextField
                        placeholder="Name"
                        defaultValue={customNameVal.current}
                        onChange={(e) => {
                          handlecustomname(e)
                        }}
                        size="small"
                        variant="outlined"
                      />
                      <TextField
                        placeholder="Value"
                        size="small"
                       
                        variant="outlined"
                        defaultValue={customValueVal.current}
                onChange={(e) => {
                  handlecustomvalue(e)
                }}
                        
                      />
                      <TextField
                        placeholder="Unit"
                        size="small"
                        variant="outlined"
                        defaultValue={customUnitVal.current}
                onChange={(e) => {
                  handlecustomunit(e)
                }}
                      />
                      <a onClick={() => setcustomData(false)}>Remove</a>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <Divider style={{ marginTop: '10px' }} />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: '5px', textTransform: 'none' }}
               onClick={submit}
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
    </form>
  )
}

export default EditAsset
