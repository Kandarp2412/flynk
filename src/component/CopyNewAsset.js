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
import {
  alpha,
  ThemeProvider,
  withStyles,
  makeStyles,
  createTheme,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { BuildOutlined, SettingsInputComponent } from '@material-ui/icons'
import { result } from 'lodash'
import { createFilterOptions } from '@material-ui/lab/Autocomplete'
import { useHistory } from 'react-router'
import { useParams } from 'react-router-dom'

const filter = createFilterOptions()

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
  let { itemId } = useParams()
  console.log(itemId)

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

  const nameVal = useRef()
  const desVal = useRef()
  const yearVal = useRef()
  const serialVal = useRef()
  const modelVal = useRef()
  const manuVal = useRef()
  const qrVal = useRef()

  useEffect(() => {
    axios
      .get(
        `http://demo.travel.webbrainstechnologies.com/api/assets_view/${itemId}`,
      )
      .then((res) => {
        console.log(res.data)
        setviewdata(res.data.asset)
        nameVal.current = res.data.asset.name
        desVal.current = res.data.asset.description
        qrVal.current = res.data.asset.qr_barcode
        manuVal.current = res.data.asset.manufracture
        modelVal.current = res.data.asset.model
        yearVal.current = res.data.asset.year
        serialVal.current = res.data.asset.serial_number
      })
      .catch((err2) => console.log(err2))

    //  axios
    // .post('http://demo.travel.webbrainstechnologies.com/api/assets_update')
    // .then((res1) => {
    //   console.log(res1)
    // })
    // .catch((err1) => console.log(err1))
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

  const handlesno = (e) => {
    const { name, value } = e.target
    serialVal.current = value
    setsno(serialVal.current)
  }
  const handleyear = (e) => {
    const { name, value } = e.target
    yearVal.current = value
    setyear(yearVal.current)
  }
  const handledesc = (e) => {
    const { name, value } = e.target
    desVal.current = value
    setdesc(desVal.current)
  }
  const handlemodel = (e) => {
    const { name, value } = e.target
    modelVal.current = value
    setmodel(modelVal.current)
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

  // function handleAssetType(){
  //    axios
  //     .post('http://demo.travel.webbrainstechnologies.com/api/assetTypes_create',{
  //       name:assetTypes
  //     })
  //     .then((res3) => {
  //      console.log(res3)
  //     })
  //     .catch((err2) => console.log(err2))

  // }

  function handleUpdate() {
    axios
    .post('http://demo.travel.webbrainstechnologies.com/api/assets_create', {
      
      name: name,
        manufracture: manu,
        year: year,
        model: model,
        serial_number: sno,
        description: desc,
       

    })
    .then((res) => console.log('result', res))
    .catch((err) => console.log(err))
  }

  const handleQRInput = (e) => {
    console.log(e.target.value)
    setQRInput(e.target.value)
    setQRInputOpen(true)
    console.log(qrInputOpen)
    if (e.target.value === '') {
      setQRInputOpen(false)
    }
    console.log(qrInputOpen)
  }

  const handleFile = (e) => {
    const files = e.target.files
    setSelectedFile([...selectedFile, e.target.files])
  }
  const handleQRCode = () => {
    setOpen(!open)
    console.log(open)
  }

  return (
    <div style={{ border: '1px solid lightgrey', width: '600px' }}>
      {console.log(nameVal.current)}
      <h2 style={{ textAlign: 'initial', marginLeft: '20px' }}>New Asset</h2>
      <Divider />
      <div style={{ height: '380px', overflowY: 'scroll' }}>
        <TextField
          id="standard-basic"
          label="Enter Asset Name"
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
            <b>Location</b>
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
            <b>Serial Number</b>
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
            <b>Model</b>
          </InputLabel>
          <BootstrapInput
            name="model"
            id="bootstrap-input"
            value={modelVal.current}
            style={{ width: '500px' }}
            onChange={(e) => {
              handlemodel(e)
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
              // fontWeight: '900px',
              textAlign: 'initial',
            }}
          >
            <b>Year</b>
          </InputLabel>
          <BootstrapInput
            name="year"
            value={yearVal.current}
            onChange={(e) => {
              handleyear(e)
            }}
            id="bootstrap-input"
            style={{ width: '500px' }}
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

        <div>
          {open ? (
            <div>
              <InputLabel
                shrink
                htmlFor="bootstrap-input"
                style={{
                  marginLeft: '50px',
                  // fontWeight: '900px',
                  textAlign: 'initial',
                }}
              >
                <b>QR/Bar code</b>
              </InputLabel>
              <BootstrapInput
                value=""
                id="bootstrap-input"
                disabled="true"
                placeholder="Barcode will be generated"
                style={{ width: '500px' }}
              />
              <h6
                style={{
                  //   fontSize: '10px',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  marginLeft: '50px',
                }}
              >
                or &ensp;
                <h6
                  onClick={(e) => handleQRCode()}
                  style={{ cursor: 'pointer', color: 'blue' }}
                >
                  Input Manually
                </h6>
                <QRCode
                  style={{
                    height: 112,
                    width: 112,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    marginTop: '18px',
                    marginLeft: '-153px',
                  }}
                  id="123456"
                  value={qrcode}
                  size={200}
                  level={'H'}
                  includeMargin={true}
                />
              </h6>
            </div>
          ) : (
            <div>
              <InputLabel
                shrink
                htmlFor="bootstrap-input"
                style={{
                  marginLeft: '50px',
                  // fontWeight: '900px',
                  textAlign: 'initial',
                }}
              >
                <b>QR/Bar code</b>
              </InputLabel>
              <BootstrapInput
                value={qrInput}
                id="bootstrap-input"
                onChange={(e) => handleQRInput(e)}
                style={{ width: '500px' }}
              />

              <h6
                style={{
                  //   fontSize: '10px',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  marginLeft: '50px',
                }}
              >
                or &ensp;
                <h6
                  onClick={(e) => handleQRCode()}
                  style={{ cursor: 'pointer', color: 'blue' }}
                >
                  Generate code
                </h6>
                {qrInputOpen ? (
                  <QRCode
                    id="qrCodeEl"
                    size={150}
                    value={qrInput}
                    style={{
                      height: 112,
                      width: 112,
                      display: 'flex',
                      justifyContent: 'flex-start',
                      marginTop: '22px',
                      marginLeft: '-135px',
                    }}
                  />
                ) : null}
              </h6>
            </div>
          )}
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
            <b>Asset Types</b>
          </InputLabel>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <Autocomplete
              // onChange={(event, newValue) => {
              //   if (typeof newValue === "string") {

              //     setAssetTypes(
              //        newValue
              //     );
              //   } else if (newValue && newValue.inputValue) {

              //     // Create a new value from the user input
              //     setAssetTypes(
              //        newValue.inputValue
              //   );
              //   } else {
              //    setAssetTypes(newValue)

              //   }
              // }}
              // filterOptions={(options, params) => {
              //   const filtered = filter(options, params);

              //  // Suggest the creation of a new value
              //   if (params.inputValue !== "") {

              //     <Button onClick={()=>console.log('jjj')}>

              //       {filtered.push(
              //       params.inputValue
              //     )}

              //   </Button>
              //   }

              //   return filtered
              // }}

              onChange={(event, value) => setAssetTypes(value)}
              multiple={true}
              size="small"
              id="controllable-states-demo"
              options={asset.map((i) => i['name'])}
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
            <b>Parent Asset</b>
          </InputLabel>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <Autocomplete
              onChange={(event, newValue) => {
                setParentAssetValue(newValue)
              }}
              size="small"
              multiple={true}
              id="controllable-states-demo"
              options={parentAsset.map((i) => i['name'])}
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
      </div>
      <Divider style={{ marginTop: '10px' }} />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: '5px', textTransform: 'none' }}
          onClick={handleUpdate}
        >
          Create
        </Button>
      </div>
    </div>
  )
}

export default NewAsset
