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
  import axios from 'axios'

  import '../App.css'
  import React, { useEffect, useState, useRef, useContext } from 'react'
  import { useHistory } from 'react-router'
  import { GlobalState } from "../../context/GlobalState"
 import Categories from './Categories'
  
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
  
  function NewCategories() {
  
    const history = useHistory()
    const [nameError, setnameError] = useState('')
    const [inputs, setInputs] = useState({
      name: '',
      description: '',
    })
    const handleChange = (e) => {
      const { name, value } = e.target
      setInputs({
        ...inputs,
        [name]: value,
      })
    }
   
  
    function handleCreateClick() {
      if (inputs.name === '') {
        setnameError('You need to provide a name for your category.')
        return true
      } else {
        setnameError('')
      }

      const headers = {
        'Content-Type': "text/plain",
        };
      axios
        .post('http://demo.travel.webbrainstechnologies.com/api/system_categoeries_create', {
          name: inputs.name,
          description: inputs.description,
        })
        .then((res) => {
          console.log('result', res)
          history.push({
            pathname: '/asset/create',
          },{headers})
        })
        .catch((err) => console.log(err))
    }
    let { syscatname } = useContext(GlobalState);
    return (
      <div className="row">
      <div className="col-lg-6">
          <Categories />
        </div>
        <div className="col-lg-5">
      <div style={{ border: '1px solid lightgrey' ,marginTop: '27%',width:'600px'}}>
     
        <h2 style={{ textAlign: 'initial', marginLeft: '20px' }}>New Category</h2>
        <Divider />
        <div style={{ height: '200px', overflowY: 'scroll' }}>
          <TextField
            id="standard-basic"
            placeholder="Enter System Category Name"
            style={{ width: '500px', marginBottom: '20px',marginTop:'4%' }}
            name="name"
            defaultValue={syscatname}
            onChange={handleChange}
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
        </div>
      </div>
      </div>
      </div>
    )
  }
  
  export default NewCategories
  