import { alpha, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import FilterListIcon from "@material-ui/icons/FilterList";
import AssessmentOutlinedIcon from "@material-ui/icons/AssessmentOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import SpeedOutlinedIcon from "@material-ui/icons/SpeedOutlined";
import ListOutlinedIcon from "@material-ui/icons/ListOutlined";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import Icon from "@material-ui/core/Icon";
import { useState, useEffect, useContext } from "react";
import { loadCSS } from "fg-loadcss";
import NewAsset from "./NewAsset";
import { GlobalState } from "../context/GlobalState";

const drawerWidth = 235;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "15ch",
      "&:focus": {
        width: "20ch",
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
}));
function Sidebar() {
  const {
    assetSearchName,
    setAssetSearchName,
    assetListName,
    setAssetListName,
    Data,
    setData,
  } = useContext(GlobalState);
  const classes = useStyles();
  const [flag, setFlag] = useState(false);

  const handleSideBar = (e, text) => {
    console.log(text);
  };

  const handleNewAssets = () => {
    //   console.log(flag)
    setFlag(!flag);
    console.log(flag);
  };
  useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  const handleAssetSearch = (e) => {
    console.log(e.target.value);
    setAssetSearchName(e.target.value);

    if (assetSearchName.length < 1) {
      setData(assetListName);
    } else
      setData(assetListName.filter((i) => i["name"].includes(assetSearchName)));
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={classes.appBar}
        style={{ backgroundColor: "white", boxShadow: "none" }}
      >
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant='h6' noWrap style={{ color: "black" }}>
            Assets
          </Typography>
          <div style={{ display: "flex" }}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon style={{ color: "grey" }} />
              </div>
              <InputBase
                placeholder='Search Assets…'
                style={{
                  border: "1px solid lightgrey",
                  color: "black",
                  marginRight: "15px",
                }}
                onChange={(e) => handleAssetSearch(e)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div>
              <Button
                variant='contained'
                color='primary'
                style={{ textTransform: "none" }}
                onClick={handleNewAssets}
              >
                <AddIcon />
                New Asset
              </Button>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor='left'
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {/* <li style={{marginTop:"10px"}}>Work order</li>
            <li style={{marginTop:"10px"}}>Reporting</li>
            <li style={{marginTop:"10px"}}>Requests</li>
            <li style={{marginTop:"10px"}}>Assets</li>
            <li style={{marginTop:"10px"}}>Messages</li> */}

          {["Work Order", "Reporting", "Requests", "Assets", "Messages"].map(
            (text, index) => (
              <ListItem
                button
                key={text}
                name={text}
                onClick={(e) => handleSideBar(e, text)}
              >
                <ListItemIcon>
                  {index % 5 === 0 ? (
                    <InboxIcon style={{ marginLeft: "20px" }} />
                  ) : null}
                  {index % 5 === 1 ? (
                    <AssessmentOutlinedIcon style={{ marginLeft: "20px" }} />
                  ) : null}
                  {index % 5 === 2 ? (
                    <InboxIcon style={{ marginLeft: "20px" }} />
                  ) : null}
                  {index % 5 === 3 ? (
                    <AssessmentOutlinedIcon style={{ marginLeft: "20px" }} />
                  ) : null}
                  {index % 5 === 4 ? (
                    <Icon
                      className='fa fa-comments'
                      fontSize='small'
                      style={{ marginLeft: "20px" }}
                    />
                  ) : null}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
        <Divider />
        <List>
          {[
            "Categories",
            "Parts Inventory",
            "Procedure Library",
            "Meters",
            "Locations",
            "Teams/Users",
          ].map((text, index) => (
            <ListItem
              button
              key={text}
              name={text}
              onClick={(e) => handleSideBar(e, text)}
            >
              <ListItemIcon>
                {index % 6 === 0 ? (
                  <LocalOfferOutlinedIcon style={{ marginLeft: "20px" }} />
                ) : null}
                {index % 6 === 1 ? (
                  <SettingsOutlinedIcon style={{ marginLeft: "20px" }} />
                ) : null}
                {index % 6 === 2 ? (
                  <ListOutlinedIcon style={{ marginLeft: "20px" }} />
                ) : null}
                {index % 6 === 3 ? (
                  <SpeedOutlinedIcon style={{ marginLeft: "20px" }} />
                ) : null}
                {index % 6 === 4 ? (
                  <LocationOnOutlinedIcon style={{ marginLeft: "20px" }} />
                ) : null}
                {index % 6 === 5 ? (
                  <GroupOutlinedIcon style={{ marginLeft: "20px" }} />
                ) : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph style={{ textAlign: "initial" }}>
          <Button
            variant='outlined'
            color='primary'
            style={{ textTransform: "none" }}
          >
            <Icon
              className='fa fa-filter'
              style={{ marginRight: "9px", height: "16px" }}
            />
            Filter
          </Button>
        </Typography>
        {/* <Typography paragraph>
          <div className="row">
            <div
              className="col-sm-4"
              style={{
                  display:'flex',
                  justifyContent:"center",
                  flexDirection:"column",
                alignItems:"center",
                border: '1px solid lightgrey',
                minHeight: '380px',
                minWidth: '30vw',
                // boxShadow:"2px 2px 6px lightgrey"
              }}
            >
              <h6 style={{fontSize:"14px"}}>How can we break it if we don't know what it is?</h6>
              <a href="#" style={{fontSize:"14px"}}>Start adding the asstes you're in charge of maintaining</a>
            </div>
          </div>
        </Typography> */}
      </main>
    </div>
  );
}

export default Sidebar;
