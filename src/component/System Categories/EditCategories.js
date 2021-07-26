import {
    Button,
    Divider,
    InputLabel,
    TextareaAutosize,
    TextField,
    alpha,
    withStyles,
    makeStyles,
    //   Autocomplete
  } from '@material-ui/core'
  import axios from 'axios'
  import '../App.css'
  import { loadCSS } from 'fg-loadcss'
  import React, { useEffect, useState, useRef } from 'react'
  import InputBase from '@material-ui/core/InputBase'
  import Categories from './Categories'
  import { createFilterOptions } from '@material-ui/lab/Autocomplete'
  import { useHistory } from 'react-router'
  import { useParams } from 'react-router-dom'

  
  const filter = createFilterOptions()
  const drawerWidth = 235
  
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
  
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '15ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
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
  
  function EditCategories() {
    let { itemId } = useParams()
    const history = useHistory()

    useEffect(() => {
      const node = loadCSS(
        'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
        document.querySelector('#font-awesome-css'),
      )
  
      return () => {
        node.parentNode.removeChild(node)
      }
    }, [])

    const nameVal = useRef()
    const desVal = useRef()
    const [name, setname] = useState('')
    const [desc, setdesc] = useState('')
    const handledesc = (e) => {
        const { name, value } = e.target
        desVal.current = value
        setdesc(desVal.current)
      }
      const handleChange = (e) => {
        const { name, value } = e.target
        nameVal.current = value
        setname(nameVal.current)
      }

  
    useEffect(() => {
      axios
        .get(
          `http://demo.travel.webbrainstechnologies.com/api/system_categoeries_view/${itemId}`,
        )
        .then((res) => {
            console.log(res.data.result)
           nameVal.current = res.data.result.name
          desVal.current = res.data.result.description
        })
        .catch((err2) => console.log(err2))
    }, [])
  
   
  
    function handleUpdate() {
      const headers = {
        'Content-Type': "text/plain",
        };
      axios
        .post('http://demo.travel.webbrainstechnologies.com/api/system_categoeries_update', {
          name: nameVal.current, 
          description: desc,
          id:itemId
        })
        .then((res3) => {
          console.log(res3.status)
        //    if(res3.status === 200)
        //      history.push(`view/${itemId}`)
        },{headers})
        .catch((err2) => console.log(err2))
    }
  
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
            placeholder="Enter Asset Name"
            style={{ width: '500px', marginBottom: '20px',marginTop:'4%' }}
            name="name"
            value={nameVal.current}
            onChange={(e) => {
              handleChange(e)
            }}
          />
         
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
              value={desVal.current}
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
        </div>
        <Divider style={{ marginTop: '10px' }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: '5px', textTransform: 'none' }}
            onClick={handleUpdate}
          >
            Update
          </Button>
        </div>
      </div>
      </div>
      </div>
    )
  }
  
  export default EditCategories
  