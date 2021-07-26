
import React, { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, MenuItem } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Checkbox from "@material-ui/core/Checkbox";

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;
export default function NestedList() {
  const [openFilter, setOpenFilter] = React.useState(false);
  const [fields, setFields] = useState("");
  const [add, setAdd] = useState(true);
  const [blank, setBlank] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [label, setLabel] = useState("");

  const handleClickOpen = () => {
    setOpenFilter(true);
  };
  const handleClose = () => {
    setOpenFilter(false);
  };
  const top100Films = [{ title: "Asset" }, { title: "Asset's Location" }];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseButton = () => {
    setAnchorEl(null);
  };

  function handleChangePlus(event) {
    setFields(event.target.value);
  }

  function handleAddText() {
    setAdd(false);
  }
  function handleAddDrop() {
    setAdd(true);
  }
  function handleAddBlank() {
    setBlank(true);
  }
  

  const handleClick1 = (e) => {
    console.log(e.target.value);
  };

  

  return (
    <>
      <div class='nav'>
            <input type='checkbox' id='menu' />
            <label for='menu' id='nav-icon'>
              
            </label>

            <div class='multi-level'>
              <div class='item'>
                <input type='checkbox' id='A' />
                <img src='images/Arrow.png' class='arrow' />
                <label for='A'>Asset</label>

                <ul>
                  <li>
                    <label onClick={handleAddDrop}>
                      Name
                    </label>
                  </li>
                  <li>
                    <label onClick={handleAddText}>
                      Description
                    </label>
                  </li>
                  <li>
                    <label onClick={handleAddText}>
                      QR/Bar code
                    </label>
                  </li>
                  <li>
                    <label onClick={handleAddDrop}>
                      Types
                    </label>
                  </li>
                  <li>
                    <label onClick={handleAddDrop}>
                      Parts
                    </label>
                  </li>
                  <li>
                    <label onClick={handleAddText}>
                      Serial Number
                    </label>
                  </li>
                  <li>
                    <label onClick={handleAddText}>
                      Model
                    </label>
                  </li>
                  <li>
                    <label onClick={handleAddText}>
                      Manufacturer
                    </label>
                  </li>
                  <li>
                    <label onClick={handleAddText}>
                      Year
                    </label>
                  </li>
                </ul>
              </div>
              <div class='item'>
                <input type='checkbox' id='B' />
                <img src='images/Arrow.png' class='arrow' />
                <label for='B'>Asset's Location</label>

                <ul>
                  <li>
                    <label onClick={handleAddDrop}>
                      Name
                    </label>
                  </li>
                  <li>
                    <label onClick={handleAddText}>
                      Description
                    </label>
                  </li>
                </ul>
              </div>

              <div class='item'>
                <input type='checkbox' id='C' />
                <img src='images/Arrow.png' class='arrow' />
                <label for='C'>Parent's Asset</label>

                <ul>
                  <li>
                    <label onClick={handleAddDrop}>
                      Name
                    </label>
                  </li>
                  <li>
                    <label onClick={handleAddText}>
                      Description
                    </label>
                  </li>
                  <li>
                    <label onClick={handleAddText}>
                      QR/Bar code
                    </label>
                  </li>
                  <li>
                    <label onClick={handleAddDrop}>
                      Types
                    </label>
                  </li>
                  <li>
                    <label onClick={handleAddDrop}>
                      Parts
                    </label>
                  </li>
                  <li>
                    <label onClick={handleAddText}>
                      Serial Number
                    </label>
                  </li>
                  <li>
                    <label onClick={handleAddText}>
                      Model
                    </label>
                  </li>
                  <li>
                    <label onClick={handleAddText}>
                      Manufacturer
                    </label>
                  </li>
                  <li>
                    <label onClick={handleAddText}>
                      Year
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Select
            id='demo-customized-select'
            disableUnderline
            defaultValue={"{=}is one of"}
            style={{ marginLeft: "3%", marginTop: "2%" }}
          >
            <MenuItem value={"{=}is one of"} onClick={handleAddDrop}>
              {"{=}"}
            </MenuItem>
            <MenuItem value={"{≠}is none of"} onClick={handleAddDrop}>
              {"{≠}"}
            </MenuItem>
            <MenuItem value={"∋ Contains"} onClick={handleAddText}>
              {"∋"}
            </MenuItem>
            <MenuItem value={"∌ doesnot contains"} onClick={handleAddText}>
              {"∌"}
            </MenuItem>
            <MenuItem value={"∃ has any"} onClick={handleAddBlank}>
              {"∃"}
            </MenuItem>
            <MenuItem value={"!∃ has none"} onClick={handleAddBlank}>
              {"!∃"}
            </MenuItem>
          </Select>

          {add ? (
            <div>
              <InputLabel
                id='demo-simple-select-helper-label'
                style={{
                  display: "flex",
                  flexDirection: "column-reverse",
                  position: "relative",
                  left: "-4%",
                  bottom: "-44%",
                }}
              >
                Age
              </InputLabel>
              <Autocomplete
                id='checkboxes-tags-demo'
                options={top100Films}
                multiple
                size='small'
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                renderOption={(option, { selected }) => (
                  <React.Fragment>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      // style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.title}
                  </React.Fragment>
                )}
                style={{ width: 246, marginLeft: 26, marginTop: -6 }}
                renderInput={(params) => (
                  <TextField {...params} variant='outlined' size='small' />
                )}
              />
            </div>
          ) : (
          //  blank?
          //  <TextField style={{display:'none'}} />
          //   :  
            <div>
            <TextField
             id='outlined-basic'
             size='small'
             variant='outlined'
             onChange={(e) => handleChangePlus(e)}
             value={fields}
           />
           </div>
          )}
    
    </>
    
  )
}


