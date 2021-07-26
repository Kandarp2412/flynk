import {
  Button,
  Divider,
  InputLabel,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  TextareaAutosize,
} from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchIcon from '@material-ui/icons/Search'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CameraAltIcon from '@material-ui/icons/CameraAlt'
import Meters from './Meters'
import AddIcon from '@material-ui/icons/Add'
import { useHistory } from 'react-router'
import { useContext } from 'react'
import Store, { GlobalState } from '../../context/GlobalState'
import AttachmentIcon from '@material-ui/icons/Attachment'
function MeterView() {
  const history = useHistory()
  const { record, setrecord, trigger, settrigger } = useContext(GlobalState)

  const [vendors, setVendors] = useState([])
  const [location, setLocation] = useState([])
  const [selectedFile, setSelectedFile] = useState([])
  const teamOptions = ['webbrains', 'team1']
  const [teams, setTeams] = useState(teamOptions)
  const [parentAsset, setparentAsset] = useState([])

  const handleFile = (e) => {
    const files = e.target.files
    setSelectedFile([...selectedFile, e.target.files])
  }
  const handleClose = () => {
    setrecord(false)
  }
  const handleRecord = () => {
    setrecord(true)
    // history.push('/meters/record/create')
  }
  const handleCloseTrigger = () => {
    settrigger(false)
  }
  const handleOpenTrigger = () => {
    console.log('hj')
    settrigger(true)
  }
  useEffect(() => {
    axios
      .post('http://demo.travel.webbrainstechnologies.com/api/vendors_list')
      .then((res1) => {
        setVendors(res1.data.vendors)
      })
      .catch((err1) => console.log(err1))

    axios
      .post('http://demo.travel.webbrainstechnologies.com/api/locations_list')
      .then((res2) => {
        setLocation(res2.data.locations)
        // console.log(res2.data.locations.map((i) => console.log(i.name)));
        // options1.current = res2.data.locations.map((i) => i.name)
      })
      .catch((err2) => console.log(err2))

    axios
      .post('http://demo.travel.webbrainstechnologies.com/api/assets_list')
      .then((res3) => {
        setparentAsset(res3.data.result)
      })
      .catch((err2) => console.log(err2))
  }, [])

  return (
    <div className="row">
      <div className="col-lg-6">
        <Meters />
      </div>
      <div className="col-lg-5">
        <div
          style={{
            border: '1px solid lightgrey',
            width: '600px',
            marginTop: '27%',
          }}
        >
          <h2 style={{ textAlign: 'initial', marginLeft: '20px' }}>Name</h2>

          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleRecord}
            style={{
              backgroundColor: ' #fff',
              borderColor: '#1887fc',
              color: '#1887fc',
              fill: 'currentColor',
              height: '2.5em',
              position: 'relative',
              marginTop: '-9%',
              top: '19%',
              left: '19%',
            }}
          >
            <AddIcon />
            Record Reading
          </Button>
          {record ? (
            <Dialog
              open={record}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {'Meter Reading'}
              </DialogTitle>
              <Divider />
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <div>
                    <label>Submit New Meter Value</label>
                    <input type="number" step="any" placeholder="0" />
                    <span>Miles</span>
                    <div style={{ marginTop: '30px' }}>
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
                          style={{ opacity: 0 }}
                        />
                      </Button>
                    </div>
                  </div>
                </DialogContentText>
              </DialogContent>
              <Divider />
              <DialogActions>
                <Button color="primary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button color="primary" autoFocus onClick={handleClose}>
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          ) : null}
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{
              backgroundColor: ' #fff',
              borderColor: '#1887fc',
              color: '#1887fc',
              fill: 'currentColor',
              height: '2.5em',
              position: 'relative',
              marginTop: '-9%',
              left: '20%',
              top: '19%',
            }}
            startIcon={
              <svg height="16" width="16">
                <path d="M12.1 2.4a1.15 1.15 0 011.24 1.88l-.72.72L11 3.38l.72-.72c.1-.11.23-.2.37-.25zm-1.85 1.73l-5.6 5.59 1.63 1.62 5.6-5.59-1.63-1.62zm-4.72 7.96l-1.62-1.62-.7.7-.6 2.23 2.22-.61.7-.7zm7-11.09a2.47 2.47 0 00-1.74.72l-8.64 8.64a.66.66 0 00-.17.29l-.96 3.52a.66.66 0 00.81.8l3.52-.95a.66.66 0 00.3-.17l8.63-8.64A2.47 2.47 0 0012.53 1z" />
              </svg>
            }
          >
            Edit
          </Button>
          <Divider />
          <div style={{ marginTop: '15px' }}>
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
              <span>
                Would you like to create a work order to read this meter?
                <Button>Create Meter Reading Work Order</Button>
              </span>
            </Button>
          </div>
          <Divider />
          <div style={{ marginTop: '15px' }}>
            <InputLabel
              shrink
              htmlFor="bootstrap-input"
              style={{
                marginLeft: '50px',
                textAlign: 'initial',
              }}
            >
              <b>Reading History</b>
            </InputLabel>
            <InputLabel
              shrink
              htmlFor="bootstrap-input"
              style={{
                marginLeft: '50px',
                textAlign: 'initial',
                backgroundColor: '#f9fafb',
                textTransform: 'none',
                border: '1px dashed #a5a5ff',
                width: '500px',
                height: '80px',
                color: '#677888',
                alignItems: 'center',
              }}
            >
              <b> No Readings Yet</b>
            </InputLabel>
          </div>
          <Divider />
          <div style={{ marginTop: '10px' }}>
            <InputLabel
              shrink
              htmlFor="bootstrap-input"
              style={{
                marginLeft: '50px',
                textAlign: 'initial',
              }}
            >
              <b>Work Order Triggers</b>
            </InputLabel>
            <span>Set automatic Work Orders based on Meter values</span>
            <br />
            <span
              style={{ cursor: 'pointer', color: '#1887fc' }}
              onClick={handleOpenTrigger}
            >
              <AddIcon /> New Work Order Trigger
            </span>
          </div>
          {trigger ? (
            <div>
              <Dialog
                open={trigger}
                onClose={handleCloseTrigger}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {'New Work Order Trigger'}
                </DialogTitle>
                <Divider />
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <div>
                      <div style={{ marginTop: '10px' }}>
                        <InputLabel
                          shrink
                          htmlFor="bootstrap-input"
                          style={{
                            marginLeft: '10px',
                            textAlign: 'initial',
                          }}
                        >
                          <b>When Meter Reading</b>
                        </InputLabel>
                        <div style={{ position: 'relative' }}>
                          <Autocomplete
                            size="small"
                            onChange={(event, value) => setVendorValue(value)}
                            id="controllable-states-demo"
                            options={vendors.map((i) => i['name'])}
                            style={{ width: 250 }}
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
                        <InputLabel shrink htmlFor="bootstrap-input">
                          <b>Value</b>
                        </InputLabel>
                        <div
                          style={{
                            position: 'relative',
                            display: 'inline-block',
                          }}
                        >
                          <input type="number" step="any" placeholder="0" />
                          <span>Feet</span>
                        </div>
                      </div>
                      <TextField
                        id="standard-basic"
                        placeholder="What needs to be done"
                        style={{ width: '500px', marginBottom: '20px' }}
                        name="name"
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
                          // defaultValue={inputs.description}
                          // onChange={handleChange}
                          style={{
                            width: '500px',
                            border: '1px solid lightgrey',
                            borderRadius: '4px',
                          }}
                        />
                      </div>
                      <div>
                      <InputLabel
                          shrink
                          htmlFor="bootstrap-input"
                          style={{
                            textAlign: 'initial',
                          }}
                        >
                          <b>Procedure</b>
                        </InputLabel>
                        <svg height="16" width="16">
                          <path d="M4.403 3.875c0-.483.391-.875.875-.875h8.847a.875.875 0 110 1.75H5.278a.875.875 0 01-.875-.875zm0 4.083c0-.483.391-.875.875-.875h8.847a.875.875 0 110 1.75H5.278a.875.875 0 01-.875-.875zm-2.528 3.209a.875.875 0 000 1.75h.008a.875.875 0 100-1.75h-.008zm3.403 0a.875.875 0 000 1.75h8.847a.875.875 0 100-1.75H5.278zM1.875 7.083a.875.875 0 100 1.75h.008a.875.875 0 000-1.75h-.008zm0-4.083a.875.875 0 100 1.75h.008a.875.875 0 000-1.75h-.008z" />
                        </svg>
                        <p>Create or attach new Form,Procedure or Checklist</p>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ textTransform: 'none' }}
                          
                        >
                          <AddIcon />
                          Add Procedure
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
                          <b>Assign To</b>
                        </InputLabel>
                        <div
                          style={{
                            position: 'relative',
                            display: 'inline-block',
                          }}
                        >
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
                          <b> Asset</b>
                        </InputLabel>
                        <div
                          style={{
                            position: 'relative',
                            display: 'inline-block',
                          }}
                        >
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
                              InputProps={{
                                ...params.InputProps,
                                type: 'search',
                              }}
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
                          <b>Parts</b>
                        </InputLabel>
                        <div
                          style={{
                            position: 'relative',
                            display: 'inline-block',
                          }}
                        >
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
                          <b>Vendors</b>
                        </InputLabel>
                        <div
                          style={{
                            position: 'relative',
                            display: 'inline-block',
                          }}
                        >
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
                    </div>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button color="primary" onClick={handleCloseTrigger}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    autoFocus
                    onClick={handleCloseTrigger}
                  >
                    create
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default MeterView
