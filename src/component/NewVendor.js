import {
  Avatar,
  Button,
  Divider,
  InputLabel,
  TextareaAutosize,
  TextField,
  //   Autocomplete
} from '@material-ui/core'
import axios from 'axios'
import '../App.css'
import AddIcon from '@material-ui/icons/Add'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import React, { useEffect, useState } from 'react'
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
import { SettingsInputComponent } from '@material-ui/icons'
import { result } from 'lodash'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import CloseIcon from '@material-ui/icons/Close'
import Sidebar from './Sidebar'
import './vendor.css'
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // width:"720px"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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

function NewVendor() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [extension, setExtension] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setExtension(false)
  }
  const [color, setColor] = useState('')
  // const [open, setOpen] = useState(false);
  const [qrInput, setQRInput] = useState('')
  const [qrInputOpen, setQRInputOpen] = useState(false)
  const [asset, setAsset] = useState([])
  const [vendors, setVendors] = useState([])
  const [location, setLocation] = useState([])
  const [loc, setLoc] = useState([])
  const [assetTypes, setAssetTypes] = useState([])
  const [vendorValue, setVendorValue] = useState([])
  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    year: '',
    model: '',
    manufracture: '',
    serial_number: '',
  })
  const teamOptions = ['webbrains', 'team1']
  const [vendorName, setVendorName] = useState('')
  const [selectedFile, setSelectedFile] = useState([])
  const [asseteColor, setAssetColor] = useState('')
  const [description, setDescription] = useState('')
  const [location1, setLocation1] = useState('')
  const [assetName, setAssetName] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [phone, setPhone] = useState('')
  const [extensionName, setExtensionName] = useState('')

  const parent = [
    'Real estate management',
    'Occupancy management',
    'Maintenance management',
    'Asset management',
  ]
  const [value, setValue] = useState(parent)
  const [inputValue, setInputValue] = useState('')
  const [table, setTable] = useState(false)

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setInputs({
  //     ...inputs,
  //     [name]: value,
  //   });
  // };

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

  const handleFile = (e) => {
    const files = e.target.files
    setSelectedFile([...selectedFile, e.target.files])
  }

  return (
    <div
      style={{
        border: '1px solid lightgrey',

        //   marginLeft: "200px",
      }}
    >
      <h2 style={{ textAlign: 'initial', marginLeft: '20px' }}>New Vendor</h2>
      <Divider />
      <div style={{ height: '380px', overflowY: 'scroll' }}>
        <TextField
          id="standard-basic"
          label="Enter Vendor Name"
          style={{ width: '500px', marginBottom: '20px' }}
          name="name"
          defaultValue={vendorName}
          onChange={(e) => setVendorName(e.target.value)}
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

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '20px',
            marginLeft: '40px',
            marginBottom: '20px',
          }}
        >
          <label class="container">
            ""
            <input
              type="radio"
              name="radio"
              onClick={(e) => setAssetColor('blue')}
            />
            <span class="check"></span>
          </label>
          <label class="container">
            OBC
            <input
              type="radio"
              name="radio"
              onClick={(e) => setAssetColor('green')}
            />
            {console.log(color)}
            <span class="check" style={{ backgroundColor: 'green' }}></span>
          </label>
          <label class="container">
            SC
            <input
              type="radio"
              name="radio"
              onClick={(e) => setAssetColor('orange')}
            />
            <span class="check" style={{ backgroundColor: 'orange' }}></span>
          </label>
          <label class="container">
            ST
            <input
              type="radio"
              name="radio"
              onClick={(e) => setAssetColor('red')}
            />
            <span class="check" style={{ backgroundColor: 'red' }}></span>
          </label>
          <label class="container">
            ST
            <input
              type="radio"
              name="radio"
              onClick={(e) => setAssetColor('lightgreen')}
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
              onClick={(e) => setAssetColor('pink')}
            />
            <span class="check" style={{ backgroundColor: 'pink' }}></span>
          </label>
          <label class="container">
            ST
            <input
              type="radio"
              name="radio"
              onClick={(e) => setAssetColor('violet')}
            />
            <span class="check" style={{ backgroundColor: 'violet' }}></span>
          </label>
          <label class="container">
            ST
            <input
              type="radio"
              name="radio"
              onClick={(e) => setAssetColor('orange')}
            />
            <span class="check" style={{ backgroundColor: 'orange' }}></span>
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
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: '500px',
              border: '1px solid lightgrey',
              borderRadius: '4px',
            }}
          />
        </div>
        <div>
          <span style={{ float: 'left', color: '#757575', marginLeft: '50px' }}>
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
                  <div className="col-sm-6" style={{ float: 'right' }}>
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
                            onChange={(e) => setExtensionName(e.target.value)}
                            id="outlined-secondary"
                            placeholder="Extension"
                            variant="outlined"
                            color="secondary"
                            style={{ width: '300px', marginTop: '-30px' }}
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
                          <input type="radio" name="radio" value={color} />
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
          <div style={{ position: 'relative', display: 'inline-block' }}>
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
          onClick={handleCreateClick}
        >
          Create
        </Button>
        {/* </div>
          </div> */}
      </div>
    </div>
  )
}

export default NewVendor
