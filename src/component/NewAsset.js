import {
  Button,
  Divider,
  InputLabel,
  TextareaAutosize,
  TextField,
  InputBase,
  alpha,
  withStyles,
} from '@material-ui/core'
import CreatableSelect from 'react-select/creatable'
import axios from 'axios'
import './App.css'
import Assets from './Assets'
import React, { useEffect, useState, useRef, useContext } from 'react'
import AttachmentIcon from '@material-ui/icons/Attachment'
import Autocomplete from '@material-ui/lab/Autocomplete'
import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/Add'
import { useHistory } from 'react-router'
import { GlobalState } from '../context/GlobalState'

import  img from "../img/view2.png"
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

function NewAsset() {
  const { name1, setName1, syscatname, setsyscatname,customName, setCustomName,
    customValue, setCustomValue,
    customUnit, setCustomUnit } = useContext(GlobalState)
  const history = useHistory()
  const [asset, setAsset] = useState([])
  const [location, setLocation] = useState([])
  const [parentAsset, setparentAsset] = useState([])
  const [parentAssetValue, setParentAssetValue] = useState([])
  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    manufracture: '',
    serial_number: '',
  })
  const teamOptions = ['webbrains', 'team1']
  const [teams, setTeams] = useState(teamOptions)
  const assettypeOptions = ['Functional', 'Equipment']
  const [assettype, setAssetType] = useState(assettypeOptions)
  const [selectedFile, setSelectedFile] = useState()
  
  const options = useRef([])
  const options1 = useRef([])
  const optionsys = useRef([])

  const [customData, setcustomData] = useState([{
  name: 'jui',
  value: '1',
  unit: '1',
  }])
  // const [customName, setCustomName] = useState('')
  // const [customValue, setCustomValue] = useState('')
  // const [customUnit, setCustomUnit] = useState('')
  const [nameError, setnameError] = useState('')
  const [loc_id, setLocid] = useState([])
  const [syscat_id, setSysCatid] = useState([])
  const [passet_id, setPassetid] = useState([])
  const [syscat, setsyscat] = useState([])
  const [criticality, setcriticality] = useState('')
  const [customDataFlag, setcustomDataFlag] = useState(false)
  const [high, sethigh] = useState(true)
  const[teamvalue,setteamvalue]=useState('')
  const[assettypevalue,setassettypevalue]=useState('')

  const fileRef = useRef(["png"])

  const [name, setUser] = useState('')
  const [file, setFile] = useState(null)

 

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
  let createOption = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
  })

  let defaultOptions = []

  

  for (let i of options.current) {
    defaultOptions = [...defaultOptions, createOption(i)]
  }

  useEffect(() => {
    const headers = {
      'Content-Type': "text/plain",
      };
      
    axios
      .post('http://demo.travel.webbrainstechnologies.com/api/locations_list')
      .then((res2) => {
        setLocation(res2.data.locations)
        setLocid(res2.data.locations.map((i) => i.id))
        options1.current = res2.data.locations.map((i) => i.name)
      },{headers})
      .catch((err2) => console.log(err2))

    axios
      .post('http://demo.travel.webbrainstechnologies.com/api/assets_list')
      .then((res3) => {
        
        setparentAsset(res3.data.result.map((i) => i.name))
        setPassetid(res3.data.result.map((i) => i.id))
      },{headers})
      .catch((err2) => console.log(err2))

    axios
      .post(
        'http://demo.travel.webbrainstechnologies.com/api/system_categoeries_list',
      )
      .then((res3) => {
        setsyscat(res3.data.result)
        setSysCatid(res3.data.result.map((i) => i.id))
        optionsys.current = res3.data.result.map((i) => i.name)
      },{headers})
      .catch((err2) => console.log(err2))

      let name="j.png"
      let path = "/kl"

  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setInputs({
      ...inputs,
      [name]: value,
    })
  }
  const handleCustom = (e) => {
    const { name, value } = e.target
    
    setcustomData({
      ...customData,
      [name]: value})
    console.log(customData)
  }
  
  const handleCustomData = () => {
    setcustomDataFlag(true)
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
    // console.log(`action: ${actionMeta.action}`)
    if (actionMeta.action == 'create-option') {
      setName1(newValue1)
      history.push({
        pathname: '/location/create',
        state: { newValue1: newValue1 },
      })

      setAsset(asset.slice().concat(createOption(newValue1.value)))
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

      setAsset(asset.slice().concat(createOption(newValue1.value)))
    }
  }
  const [state, setState] = useState({
    isLoading: false,
    options: defaultOptions,
    value: undefined,
  })
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
    e.preventDefault()
    console.log(e)
    if (name === '') {
      setnameError('You need to provide a name for your asset.')
      return true
    } else {
      setnameError('')
    }
    
     let pid = parentAsset.indexOf(parentAssetValue)
     let lid = options1.current.indexOf(name1)
     let sid = optionsys.current.indexOf(syscatname)
    
    let formData1 = new FormData()
   console.log(customData)
  formData1.append('name',name)

    if(file !== null){
      formData1.append('asset_files[]',file)
    }  
    formData1.append('description',inputs.description)
    formData1.append('serial_number',inputs.serial_number)
    formData1.append('manufracturer',inputs.manufracture)
    formData1.append('team_id',teamvalue)
    formData1.append('asset_type_id',assettypevalue)
    formData1.append('manufracturer',inputs.manufracture)
    formData1.append('criticality',criticality)
    formData1.append('parent_asset',passet_id[pid])
    formData1.append('system_categories',syscat_id[sid])
    formData1.append('location_id',loc_id[lid])
    console.log(customUnit,customValue,customName);
    formData1.append('customData[0][name]',customName);
    formData1.append('customData[0][value]',customValue);
    formData1.append('customData[0][unit]',customUnit);
  
  axios.post('http://demo.travel.webbrainstechnologies.com/api/assets_create',formData1)
      .then(response => {console.log(response)
        history.push({
          pathname: '/view',
        })
      })
      .catch(data => console.log(data));
  }



  return (
    <form onSubmit={submit}>

    <div className="row">
      <div className="col-lg-6">
       
        <Assets />
      </div>
      <div className="col-lg-5">
        <div
          style={{
            border: '1px solid lightgrey',
            marginTop: '27%',
            width: '600px',
          }}
        >
        
          <h2 style={{ textAlign: 'initial', marginLeft: '20px' }}>
            New Asset
          </h2>
          <Divider />
          <div style={{ height: '380px', overflowY: 'scroll' }}>
            <TextField
              id="standard-basic"
              placeholder="Enter Asset Name"
              style={{ width: '500px', marginBottom: '20px' }}
              name="asset_name"
              defaultValue={name}
              onChange={e=>setUser(e.target.value)}
            />
            <p
              style={{
                color: 'red',
                marginLeft: '-39%',
                position: 'relative',
                top: '-4%',
              }}
            >
              {nameError}
            </p>

           

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
              <div
                style={{ position: 'relative', width: '87%', marginLeft: '6%' }}
              >
                <CreatableSelect
                  isClearable
                  placeholder="start typing"
                  defaultInputValue={name1.label}
                  onChange={handleChangeLocation}
                  options={defaultOptions1}
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
                <b>Description</b>
              </InputLabel>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                name="description"
                placeholder="Add a Description"
                defaultValue={inputs.description}
                onChange={handleChange}
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
                defaultValue={inputs.serial_number}
                onChange={handleChange}
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
                defaultValue={inputs.manufracture}
                style={{ width: '500px' }}
                onChange={handleChange}
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
                  onChange={(e, newValue) => {
                    setteamvalue(newValue)
                  }}
                  size="small"
                  options={teamOptions.map(i=>i)}
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
                <CreatableSelect
                  isClearable
                  placeholder="start typing"
                  defaultInputValue={syscatname}
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
                {/* <form encType="multipart/form-data" action=""> */}
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
                {/* </form> */}
              
              </Button>
            
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
                <b>Asset Types</b>
              </InputLabel>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <Autocomplete
                  onChange={(e, newValue) => {
                    setassettypevalue(newValue)
                  }}
                  size="small"
                  options={assettypeOptions.map(i=>i)}
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
                <b>Group</b>
              </InputLabel>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <Autocomplete
                  onChange={(e, newValue) => {
                    setAssetType(newValue)
                  }}
                  size="small"
                  multiple={true}
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
            <div style={{ marginTop: '10px' }}>
              <InputLabel
                shrink
                htmlFor="bootstrap-input"
                style={{
                  marginLeft: '50px',
                  textAlign: 'initial',
                }}
              >
                <b>Parent Asset</b>
              </InputLabel>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <Autocomplete
                  onChange={(event, newValue) => {
                    setParentAssetValue(newValue)
                  }}
                  size="small"
                  id="controllable-states-demo"
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



              <div style={{ padding: '2%' }}>
                <span
                  onClick={handleCustomData}
                  style={{ cursor: 'pointer', marginRight: '70%' }}
                >
                  <AddIcon />
                  custom Data
                </span>

          
               {customDataFlag?
               (<div>
                <p style={{ marginRight: '70%' }}>Custom Property</p>
                <div>
                  <TextField
                    placeholder="Name"
                    name="customData[0][name]"
                   //onChange={handleCustom}
                    onChange={e=>setCustomName(e.target.value)}
                    size="small"
                    variant="outlined"
                  />
                  <TextField
                    placeholder="Value"
                    name="customData[0][value]"
                    size="small"
                    onChange={e=>setCustomValue(e.target.value)}
                    variant="outlined"
                    //onChange={e=>setcustomData({...customData,[e.target.name]:e.target.value})}
                  />
                  <TextField
                    placeholder="Unit"
                    size="small"
                    name="customData[0][unit]"
                    variant="outlined"
                    onChange={e=>setCustomUnit(e.target.value)}
                    //onChange={handleCustom}
                    // onChange={e=>setcustomData({...customData,[e.target.name]:e.target.value})}
                  />
                  <a onClick={() => setcustomDataFlag(false)}>Remove</a>
                </div>
              </div>
            )
               :null}
                  
              </div>
            </div>
          </div>
          <Divider style={{ marginTop: '10px' }} />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ margin: '5px', textTransform: 'none' }}
              // onClick={handleCreateClick}
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
   </form>

  
  )
}

export default NewAsset