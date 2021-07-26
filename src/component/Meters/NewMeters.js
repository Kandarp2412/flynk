import {
  Button,
  Divider,
  InputLabel,
  TextField,
  //   Autocomplete
} from '@material-ui/core'
import axios from 'axios'
import React, { useState ,useEffect} from 'react'
import CameraAltIcon from '@material-ui/icons/CameraAlt'
import AttachmentIcon from '@material-ui/icons/Attachment'
import Autocomplete from '@material-ui/lab/Autocomplete'
import SearchIcon from '@material-ui/icons/Search'
import Meters from './Meters'

function NewMeters() {
  const teamOptions = ['Miles(mi)', 'Feet(ft)']
  const [teams, setTeams] = useState(teamOptions)
  const [parentAsset, setparentAsset] = useState([])
  const [parentAssetValue, setParentAssetValue] = useState([])
  const [hour, sethour] = useState(false)
  const [day, setday] = useState(false)
  const [week, setweek] = useState(false)
  const [month, setmonth] = useState(false)
  const [year, setyear] = useState(false)

  const handlehour =()=>{
      sethour(true)
      setday(false)
      setweek(false)
      setmonth(false)
      setyear(false)
  }
  const handleday =()=>{
    sethour(false)
      setday(true)
      setweek(false)
      setmonth(false)
      setyear(false)
}
const handleweek =()=>{
    sethour(false)
    setday(false)
    setweek(true)
    setmonth(false)
    setyear(false)
}
const handlemonth =()=>{
    sethour(false)
      setday(false)
      setweek(false)
      setmonth(true)
      setyear(false)
}
const handleyear=()=>{
    sethour(false)
      setday(false)
      setweek(false)
      setmonth(false)
      setyear(true)
}
  

  useEffect(() => {
      
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
          <h2 style={{ textAlign: 'initial', marginLeft: '20px' }}>
            New Asset
          </h2>
          <Divider />
          <div style={{ height: '380px', overflowY: 'scroll' }}>
            <TextField
              id="standard-basic"
              placeholder="Enter Meter Name"
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
                style={{ color: '#1887fc', position: 'relative', top: 21 }}
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
                <b>Measurement Unit(required)</b>
              </InputLabel>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <Autocomplete
                  onChange={(e, newValue) => {
                    setTeams(newValue)
                  }}
                  size="small"
                  id="controllable-states-demo"
                  options={teamOptions}
                  style={{ width: 500 }}
                  renderInput={(params) => (
                    <TextField
                      placeholder="Start typing..."
                      {...params}
                      variant="outlined"
                    />
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
                <b>Assign to</b>
              </InputLabel>
              <input type="radio" name="assign" defaultValue="Asset" />Asset
              <input type="radio" name="assign"  value="Location"/>Location
              <input type="radio" name="assign"  value="Functional"/>Functional
              <div style={{ position: 'relative', display: 'inline-block' }}>
              <Autocomplete
              onChange={(event, newValue) => {
                setParentAssetValue(newValue)
              }}
              size="small"
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
                <b>Reading Frequency</b>
              </InputLabel>
              <div>
              <Button
              variant="contained"
              color="primary" size="small" >
              None
            </Button>
            <Button
              variant="contained"
              color="primary" size="small" onClick={handlehour} >
              Hour
            </Button>
            <Button
              variant="contained"
              color="primary" size="small" onClick={handleday}>
              Day
            </Button>
            <Button
              variant="contained"
              color="primary" size="small"onClick={handleweek} >
              Week
            </Button>
            <Button
              variant="contained"
              color="primary" size="small" onClick={handlemonth} >
              Month
            </Button>
            <Button
              variant="contained"
              color="primary" size="small" onClick={handleyear}>
              Year
            </Button>
            {hour?
            <div>
            <span>Every</span>
            <input type="number" step="any" placeholder="0"/>
            <span>Hour</span>
            </div>
            :null}
            {day?
            <div>
            <span>Every</span>
            <input type="number" step="any" placeholder="0"/>
            <span>Day</span>
            </div>
            :null}
            {week?
            <div>
            <span>Every</span>
            <input type="number" step="any" placeholder="0"/>
            <span>Week</span>
            </div>
            :null}
            {month?
            <div>
            <span>Every</span>
            <input type="number" step="any" placeholder="0"/>
            <span>Month</span>
            </div>
            :null}
            {year?
            <div>
            <span>Every</span>
            <input type="number" step="any" placeholder="0"/>
            <span>Year</span>
            </div>
            :null}
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
                  style={{ color: '#1887fc', opacity: 0 }}
                />
              </Button>
            </div>
          </div>
          <Divider style={{ marginTop: '10px' }} />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: '5px', textTransform: 'none' }}
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewMeters
