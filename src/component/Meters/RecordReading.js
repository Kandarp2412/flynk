import {
  Button,Divider,
  Dialog,DialogActions,DialogTitle,DialogContent,DialogContentText
  //   Autocomplete
} from '@material-ui/core'

import CameraAltIcon from '@material-ui/icons/CameraAlt'
import Meters from './Meters'
import { useContext } from "react";
import Store, { GlobalState } from "../../context/GlobalState"


function RecordReading() {
    const {
       record,setrecord
      } = useContext(GlobalState);
   const handleClose=()=>{
       setrecord(false)
   }
  return (
    <div className="row">
      <div className="col-lg-6">
        <Meters />
      </div>
      <div className="col-lg-5">
    
        <Dialog
          open={record}
         onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Meter Reading'}</DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
             <div>
                 <label>Submit New Meter Value</label>
                 <input type="number" step="any" placeholder="0"/>
                 <span>Miles</span>

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
             </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleClose}>
              Cancel
            </Button>
            <Button  color="primary" autoFocus onClick={handleClose}>
              ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

export default RecordReading
