import {
  Button,
  Divider,
  InputLabel,
  TextareaAutosize,
  TextField,
  //   Autocomplete
} from "@material-ui/core";
import axios from "axios";
import "./App.css";
import React, { useContext, useEffect, useState,useRef } from "react";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import InputBase from "@material-ui/core/InputBase";
import AttachmentIcon from "@material-ui/icons/Attachment";
import QRCode from "qrcode.react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import {
  alpha,

  withStyles,

} from "@material-ui/core";

import Location from "./Location";
import { useHistory, useParams } from "react-router";
import { GlobalState } from "../context/GlobalState";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    marginTop: "-25px",
    // width: 'auto',
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

function NewLocation() {
  let history = useHistory();
  let { name1 } = useContext(GlobalState);
  const [location, setLocation] = useState([]);
  const [loc, setLoc] = useState([]);
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    address: "",
  });
  const teamOptions = ["webbrains", "team1"];
  const [teams, setTeams] = useState(teamOptions);
  const [selectedFile, setSelectedFile] = useState([]);

  const [vendorValue, setVendorValue] = useState([]);
  const [vendors, setVendors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  useEffect(() => {
    const headers = {
      'Content-Type': "text/plain",
      };
    axios
      .post("http://demo.travel.webbrainstechnologies.com/api/locations_list")
      .then((res2) => {
        setLocation(res2.data.locations);
      },{headers})
      .catch((err2) => console.log(err2));

    axios
      .post("http://demo.travel.webbrainstechnologies.com/api/vendors_list")
      .then((res1) => {
        setVendors(res1.data.vendors);
      },{headers})
      .catch((err1) => console.log(err1));
  }, []);

  function handleCreateClick() {
    const headers = {
      'Content-Type': "text/plain",
      };
    axios
      .post(
        " http://demo.travel.webbrainstechnologies.com/api/locations_create",
        {
          name: name1.label,
          address: inputs.address,
          description: inputs.description,
          // vendor_id:vendorValue,
          // parent_location:loc
        }
      )
      .then((res) => {
        console.log("result", res);
        history.push("/asset/create");
      },{headers})
      .catch((err) => console.log(err));
  }

  const handleFile = (e) => {
    const files = e.target.files;
    setSelectedFile([...selectedFile, e.target.files]);
  };
  const options1 = useRef([] )
  let createOption1 = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
  })
  let defaultOptions1 = []

  for (let i of options1.current) {
    defaultOptions1 = [...defaultOptions1, createOption1(i)]
  }

  return (
    <div className="row">
      <div className="col-lg-6">
        <Location/>
      </div>
     
      <div className="col-lg-5">
        <div
          style={{
            border: '1px solid lightgrey',
            marginTop: '27%',
            width: '600px',
          }}
        >
          {console.log(name1)}
      <h2 style={{ textAlign: "initial", marginLeft: "20px" }}>New Location</h2>
      <Divider />
      <div style={{ height: "380px", overflowY: "scroll" }}>
        <TextField
          id='standard-basic'
          label='Enter Location Name'
          style={{ width: "500px", marginBottom: "20px" }}
          name='name'
          defaultValue={name1.label}
          onChange={handleChange}
        />

        <Button
          variant='contained'
          component='label'
          style={{
            backgroundColor: "#e1f8ff",
            textTransform: "none",
            border: "1px dashed #a5a5ff",
            width: "500px",
            height: "80px",
            color: "#6464f3",
          }}
        >
          <CameraAltIcon
            style={{
              display: "grid",
              color: "#1887fc ",
              position: "relative",
              left: 62,
              bottom: 10,
            }}
          />
          <label style={{ color: "#1887fc", position: "relative", top: 21 }}>
            Add or drag pictures
          </label>
          <input
            type='file'
            multiple
            accept='image/png, image/gif, image/jpeg'
            onChange={handleFile}
            style={{ opacity: 0 }}
          />
        </Button>
        <div style={{ marginTop: "10px" }}>
          <InputLabel
            shrink
            htmlFor='bootstrap-input'
            style={{
              marginLeft: "50px",
              // fontWeight: '900px',
              textAlign: "initial",
            }}
          >
            <b>Address</b>
          </InputLabel>
          <BootstrapInput
            name='address'
            id='bootstrap-input'
            style={{ width: "500px" }}
            defaultValue={inputs.address}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <InputLabel
            shrink
            htmlFor='bootstrap-input'
            style={{
              marginLeft: "50px",
              // fontWeight: '900px',
              textAlign: "initial",
            }}
          >
            <b>Description</b>
          </InputLabel>
          <TextareaAutosize
            aria-label='minimum height'
            minRows={3}
            name='description'
            placeholder='Add a Description'
            defaultValue={inputs.description}
            onChange={handleChange}
            style={{
              width: "500px",
              border: "1px solid lightgrey",
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <InputLabel
            shrink
            htmlFor='bootstrap-input'
            style={{
              marginLeft: "50px",
              // fontWeight: '900px',
              textAlign: "initial",
            }}
          >
            <b>Teams in charge</b>
          </InputLabel>
          <div style={{ position: "relative", display: "inline-block" }}>
            <Autocomplete
              onChange={(e, newValue) => {
                setTeams(newValue);
              }}
              size='small'
              multiple={true}
              id='controllable-states-demo'
              options={teamOptions}
              style={{ width: 500 }}
              renderInput={(params) => (
                <>
                  <SearchIcon
                    color='disabled'
                    style={{
                      position: "absolute",
                      top: 15,
                      width: 20,
                      height: 20,
                    }}
                  />
                  <TextField
                    placeholder='Start typing...'
                    {...params}
                    variant='outlined'
                  />
                </>
              )}
            />
          </div>
        </div>

        <div style={{ marginTop: "10px" }}>
          <InputLabel
            shrink
            htmlFor='bootstrap-input'
            style={{
              marginLeft: "50px",
              // fontWeight: '900px',
              textAlign: "initial",
            }}
          >
            <b>Files</b>
          </InputLabel>
          <Button
            variant='outlined'
            type='button'
            style={{
              width: "150px",
              textTransform: "none",
              justifyContent: "flex-start",
              marginLeft: "50px",
              color: "#1887fc",
              borderColor: "#1887fc",
            }}
          >
            <AttachmentIcon style={{ color: "#1887fc " }} />
            Attach files
            <input
              type='file'
              multiple
              onChange={handleFile}
              style={{ color: "#1887fc", opacity: 0 }}
            />
          </Button>
        </div>

        <div style={{ marginTop: "10px" }}>
          <InputLabel
            shrink
            htmlFor='bootstrap-input'
            style={{
              marginLeft: "50px",
              // fontWeight: '900px',
              textAlign: "initial",
            }}
          >
            <b>Vendors</b>
          </InputLabel>
          <div style={{ position: "relative", display: "inline-block" }}>
            <Autocomplete
              size='small'
              onChange={(event, value) => setVendorValue(value)}
              multiple={true}
              id='controllable-states-demo'
              options={vendors.map((i) => i["name"])}
              style={{ width: 500 }}
              renderInput={(params) => (
                <>
                  <SearchIcon
                    color='disabled'
                    style={{
                      position: "absolute",
                      top: 15,
                      width: 20,
                      height: 20,
                    }}
                  />
                  <TextField
                    placeholder='Start typing...'
                    {...params}
                    variant='outlined'
                  />
                </>
              )}
            />
          </div>
        </div>
        <div style={{ marginTop: "10px" }}>
          <InputLabel
            shrink
            htmlFor='bootstrap-input'
            style={{
              marginLeft: "50px",
              // fontWeight: '900px',
              textAlign: "initial",
            }}
          >
            <b>Parent Location</b>
          </InputLabel>
          <div style={{ position: "relative", display: "inline-block" }}>
            <Autocomplete
              freeSolo
              size='small'
              id='free-solo-2-demo'
              disableClearable
              multiple
              options={location.map((i) => i["name"])}
              onChange={(event, value) => setLoc(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder='Start typing...'
                  margin='normal'
                  variant='outlined'
                  InputProps={{ ...params.InputProps, type: "search" }}
                />
              )}
            />
          </div>
        </div>
      </div>
      <Divider style={{ marginTop: "10px" }} />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant='contained'
          color='primary'
          style={{ margin: "5px", textTransform: "none" }}
          onClick={handleCreateClick}
        >
          Create
        </Button>
      </div>
    </div>
    </div>
    </div>
  );
}

export default NewLocation
