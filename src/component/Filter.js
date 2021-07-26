import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import InputLabel from "@material-ui/core/InputLabel";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, Menu, MenuItem } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Checkbox from "@material-ui/core/Checkbox";
import { UncontrolledCollapse, CardBody, Card } from "reactstrap";

import Icon from "@material-ui/core/Icon";
import "./Filter.css";
// import "./Filter.scss";
import List from "./List";

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;
export default function CustomizedDialogs() {
  const [openFilter, setOpenFilter] = React.useState(false);
  const [fields, setFields] = useState("");
  const [add, setAdd] = useState(true);
  const [blank, setBlank] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [label, setLabel] = useState("");
  const [addplus, setaddplus] = useState(false);

  const handleClickOpen = () => {
    setOpenFilter(true);
  };
  const handleAddPlus = () => {
    setaddplus(true);
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
    <div style={{ display: "flex" }}>
      <Button
        variant='outlined'
        color='primary'
        style={{ textTransform: "none" }}
        onClick={handleClickOpen}
      >
        <Icon
          className='fa fa-filter'
          fontSize='small'
          style={{ marginRight: "11%", height: "7%" }}
        />
        Filter
      </Button>

      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={openFilter}
        fullWidth
        maxWidth='sm'
      >
        <MuiDialogTitle
          id='customized-dialog-title'
          style={{ marginTop: "-2%" }}
        >
          {openFilter ? (
            <IconButton
              aria-label='close'
              style={{ position: "absolute", right: "0%", marginTop: "-2%" }}
              onClick={handleClose}
            >
              {/* <CloseIcon /> */}
            </IconButton>
          ) : null}
        </MuiDialogTitle>

        <MuiDialogContent style={{ display: "flex" }}>
          <div class='nav'>
            <input type='checkbox' id='menu' />
            <label
              for='menu'
              id='nav-icon'
              style={{ color: "black", width: "50", fontSize: "14px" }}
            >
              Asset
            </label>

            <div
              class='multi-level'
              style={{ height: "200px", color: "black" }}
            >
              <div class='item'>
                <input type='checkbox' id='A' />
                <img src='images/Arrow.png' class='arrow' />
                <label for='A'>Asset</label>

                <ul>
                  <li>
                    <label onClick={handleAddDrop}>Name</label>
                  </li>
                  <li>
                    <label onClick={handleAddText}>Description</label>
                  </li>
                  <li>
                    <label onClick={handleAddText}>QR/Bar code</label>
                  </li>
                  <li>
                    <label onClick={handleAddDrop}>Types</label>
                  </li>
                  <li>
                    <label onClick={handleAddDrop}>Parts</label>
                  </li>
                  <li>
                    <label onClick={handleAddText}>Serial Number</label>
                  </li>
                  <li>
                    <label onClick={handleAddText}>Model</label>
                  </li>
                  <li>
                    <label onClick={handleAddText}>Manufacturer</label>
                  </li>
                  <li>
                    <label onClick={handleAddText}>Year</label>
                  </li>
                </ul>
              </div>
              <div class='item'>
                <input type='checkbox' id='B' />
                <img src='images/Arrow.png' class='arrow' />
                <label for='B'>Asset's Location</label>

                <ul>
                  <li>
                    <label onClick={handleAddDrop}>Name</label>
                  </li>
                  <li>
                    <label onClick={handleAddText}>Description</label>
                  </li>
                </ul>
              </div>

              <div class='item'>
                <input type='checkbox' id='C' />
                <img src='images/Arrow.png' class='arrow' />
                <label for='C'>Parent's Asset</label>

                <ul>
                  <li>
                    <label onClick={handleAddDrop}>Name</label>
                  </li>
                  <li>
                    <label onClick={handleAddText}>Description</label>
                  </li>
                  <li>
                    <label onClick={handleAddText}>QR/Bar code</label>
                  </li>
                  <li>
                    <label onClick={handleAddDrop}>Types</label>
                  </li>
                  <li>
                    <label onClick={handleAddDrop}>Parts</label>
                  </li>
                  <li>
                    <label onClick={handleAddText}>Serial Number</label>
                  </li>
                  <li>
                    <label onClick={handleAddText}>Model</label>
                  </li>
                  <li>
                    <label onClick={handleAddText}>Manufacturer</label>
                  </li>
                  <li>
                    <label onClick={handleAddText}>Year</label>
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
                  left: "14%",
                  bottom: "-41%",
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

          <IconButton
            aria-label='close'
            onClick={handleClose}
            style={{
              position: "absolute",
              right: "0%",
              marginTop: "-2%",
              marginRight: "3%",
            }}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogContent>
        <MuiDialogActions>
          {addplus ? <List /> : null}
          <Button
            autoFocus
            onClick={handleAddPlus}
            style={{ position: "relative", right: 262 }}
          >
            <Icon
              className='fa fa-plus-circle'
              fontSize='small'
              style={{ color: "GrayText" }}
            />
          </Button>
          <Button style={{ color: "#1887fc" }} onClick={handleClose}>
            Clear All
          </Button>

          <Button
            style={{ color: "#1887fc", borderStyle: "none" }}
            onClick={handleClose}
          >
            Discard
          </Button>

          <Button
            autoFocus
            onClick={handleClose}
            style={{ color: "#fff", backgroundColor: "#1887fc" }}
          >
            Apply
          </Button>
        </MuiDialogActions>
      </Dialog>
    </div>
  );
}
