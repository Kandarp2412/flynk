// import { alpha, makeStyles } from "@material-ui/core/styles";
// import Drawer from "@material-ui/core/Drawer";
// import { loadCSS } from "fg-loadcss";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import List from "@material-ui/core/List";
// import Typography from "@material-ui/core/Typography";
// import Divider from "@material-ui/core/Divider";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import Button from "@material-ui/core/Button";
// import AddIcon from "@material-ui/icons/Add";
// import SearchIcon from "@material-ui/icons/Search";
// import InputBase from "@material-ui/core/InputBase";
// import AssessmentOutlinedIcon from "@material-ui/icons/AssessmentOutlined";
// import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
// import SpeedOutlinedIcon from "@material-ui/icons/SpeedOutlined";
// import ListOutlinedIcon from "@material-ui/icons/ListOutlined";
// import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
// import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
// import { useState, useEffect } from "react";
// import { useHistory } from "react-router";
// import NewMeters from "./NewMeters";
// import Filter from '../Filter'
// import AssetList from "../AssetList";


// const drawerWidth = 235;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//   },
//   appBar: {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: drawerWidth,
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//   },

//   search: {
//     position: "relative",
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//     "&:hover": {
//       backgroundColor: alpha(theme.palette.common.white, 0.25),
//     },
//     marginLeft: 0,
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       marginLeft: theme.spacing(1),
//       width: "auto",
//     },
//   },
//   searchIcon: {
//     padding: theme.spacing(0, 2),
//     height: "100%",
//     position: "absolute",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   inputRoot: {
//     color: "inherit",
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       width: "15ch",
//       "&:focus": {
//         width: "20ch",
//       },
//     },
//   },
//   // necessary for content to be below app bar
//   toolbar: theme.mixins.toolbar,
//   content: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.default,
//     padding: theme.spacing(3),
//   },
// }));
// function Meters(props) {
//   const history = useHistory();
//   const classes = useStyles();


//   useEffect(() => {
//     const node = loadCSS(
//       "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
//       document.querySelector("#font-awesome-css")
//     );

//     return () => {
//       node.parentNode.removeChild(node);
//     };
//   }, []);

//   const [meterFlag,setMeterFlag]=useState(false)
//   const handleNewMeters = () => {
  
//     setMeterFlag(!meterFlag);
//     console.log(meterFlag);
//   };

  
//   return (
//     <div className={classes.root}   >
//       <CssBaseline />
//       <AppBar
//         position='fixed'
//         className={classes.appBar}
//         style={{ backgroundColor: "white", boxShadow: "none" }}
//       >
//         <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
//           <Typography variant='h6' noWrap style={{ color: "black" }}>
//            <b>Meters</b> 
//           </Typography>
//           <div style={{ display: "flex" }}>
//             <div className={classes.search}>
//               <div className={classes.searchIcon}>
//                 <SearchIcon style={{ color: "grey" }} />
//               </div>
//               <InputBase
//                 placeholder='Search Meters'
                
//                 style={{
//                   border: "1px solid lightgrey",
//                   color: "black",
//                   marginRight: "15px",
//                 }}
//                 classes={{
//                   root: classes.inputRoot,
//                   input: classes.inputInput,
//                 }}
//                 inputProps={{ "aria-label": "search" }}
//               />
//             </div>
//             <div>
//               <Button
//                 variant='contained'
//                 color='primary'
//                 style={{ textTransform: "none" }}
//                onClick={()=>  history.push('/meters/create')}
//               >
//                 <AddIcon />
//                 New Meters
//               </Button>
//             </div>
//           </div>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         className={classes.drawer}
//         variant='permanent'
//         classes={{
//           paper: classes.drawerPaper,
//         }}
//         anchor='left'
//       >
//         <div className={classes.toolbar} />
//         <Divider />
//         <List>
         
//           {["Analytic Dashboard","asset", "Maintenance", "Materails",].map(
//             (text, index) => (
//               <ListItem
//                 button
//                 key={text}
//                 name={text}
//                 onClick={(e) => handleSideBar(e, text)}
//               >
//                 <ListItemIcon>
//                   {index % 5 === 0 ? (
//                     <InboxIcon style={{ marginLeft: "20px" }} />
//                   ) : null}
//                   {index % 5 === 1 ? (
//                     <AssessmentOutlinedIcon style={{ marginLeft: "20px" }} />
//                   ) : null}
//                   {index % 5 === 2 ? (
//                     <InboxIcon style={{ marginLeft: "20px" }} />
//                   ) : null}
//                   {index % 5 === 3 ? (
//                     <svg
//                       height='16'
//                       width='16'
//                       fill='gray'
//                       style={{ marginLeft: "20px " }}
//                     >
//                       <path d='M8 5a2 2 0 100-4 2 2 0 000 4zM.5 11h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm6 0a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-3zm9 0h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zM2.7 10V8.4h4.6V10h1.4V8.4h4.6V10h1.4V7.7A.7.7 0 0014 7H8.7V6H7.3v1H2a.7.7 0 00-.7.7V10h1.4z' />
//                     </svg>
//                   ) : null}
                 
//                 </ListItemIcon>
//                 <ListItemText primary={text} />
//               </ListItem>
//             )
//           )}
//         </List>
//         <Divider />
//         <List>
//           {[
//             "Work Orders",
//             "Request",
//             "Files & Documents",
//             "Poeple&Teams",
            
//           ].map((text, index) => (
//             <ListItem
//               button
//               key={text}
//               name={text}
//               onClick={(e) => handleSideBar(e, text)}
//             >
//               <ListItemIcon>
//                 {index % 6 === 0 ? (
//                   <LocalOfferOutlinedIcon style={{ marginLeft: "20px" }} />
//                 ) : null}
//                 {index % 6 === 1 ? (
//                   <SettingsOutlinedIcon style={{ marginLeft: "20px" }} />
//                 ) : null}
//                 {index % 6 === 2 ? (
//                   <ListOutlinedIcon style={{ marginLeft: "20px" }} />
//                 ) : null}
//                 {index % 6 === 3 ? (
//                   <SpeedOutlinedIcon style={{ marginLeft: "20px" }} />
//                 ) : null}
//                 {index % 6 === 4 ? (
//                   <LocationOnOutlinedIcon style={{ marginLeft: "20px" }} />
//                 ) : null}
               
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>
//       <main className={classes.content}>
//         <div className={classes.toolbar} />
//         <Typography paragraph style={{ textAlign: "initial" }}>
//           <Filter />
//         </Typography>
//             <AssetList />
         
//               {meterFlag?
//                <NewMeters />
//               :null}
//       </main>
//     </div>
//   );
// }

// export default Meters;
