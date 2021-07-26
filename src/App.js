import './App.css'
import Meters from './component/Meters/Meters'
import Assets from './component/Assets'
import Location from './component/Location'
import NewLocation from './component/NewLocation'
import AssetView from './component/AssetView'
import SubAssetView from './component/SubAssetView'
import AssetList from './component/AssetList'
import LocationList from './component/LocationList'
import EditAsset from './component/EditAsset'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NewCategories from './component/System Categories/NewCategories'
import NewAsset from './component/NewAsset'
import LocationView from './component/LocationView'
import EditLocation from './component/EditLocation'
import Vendor from './component/Vendor'
import VendorView from './component/VendorView'
import EditVendor from './component/EditVendor'
import VendorList from './component/VendorList'
import { useHistory } from 'react-router'
// import "./component/Filter.scss";

import Store, { GlobalState } from './context/GlobalState'
import ViewAsset from './component/ViewAsset'
import { useState } from 'react'
import NewMeters from './component/Meters/NewMeters'
import MeterView from './component/Meters/MeterView'
import RecordReading from './component/Meters/RecordReading'
import Categories from './component/System Categories/Categories'
import CategoriesView from './component/System Categories/CategoriesView'
import CategoriesList from './component/System Categories/CategoriesList'
import EditCategories from './component/System Categories/EditCategories'

function App() {
  const history = useHistory()
  const [customName, setCustomName] = useState('')
  const [customValue, setCustomValue] = useState('')
  const [customUnit, setCustomUnit] = useState('')
  const [name1, setName1] = useState('')
  const [assetListName, setAssetListName] = useState([])
  const [assetSearchName, setAssetSearchName] = useState([])
  const [flag, setFlag] = useState(false)
  const [Data, setData] = useState([])
  const [record,setrecord]=useState(false)
  const [trigger,settrigger]=useState(false)
   const [syscatname, setsyscatname] = useState('')
   const [asname,setasname]=useState('')
   const [sysname,setsysname]=useState('')
   const [teamname,setteamname]=useState('')
   const [assettypename,setassettypename]=useState('')
   const [passetname,setpassetname]=useState('')
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          {/* <Store> */}
          <GlobalState.Provider
            value={{
              name1, setName1,
              assetListName,setAssetListName,
              assetSearchName,setAssetSearchName,
              flag,setFlag,
              Data,setData,
              record,setrecord,
              trigger,settrigger,
              syscatname,setsyscatname,
              asname,setasname,
              sysname,setsysname,
              teamname,setteamname,
              assettypename,setassettypename,
              passetname,setpassetname,
              customName, setCustomName,
              customValue, setCustomValue,
              customUnit, setCustomUnit
            }}
          >
            <Route exact path="/">
              <Assets />
            </Route>
            <Route exact path="/asset/view/:itemId">
              <AssetView />
            </Route>
            <Route exact path="/asset/edit/:itemId">
              <EditAsset />
            </Route>
            <Route exact path="/asset/list">
              <AssetList />
            </Route>
            <Route exact path="/asset/create">
              <NewAsset />
            </Route>
            <Route exact path="/asset/categories">
              <Categories />
            </Route>
            <Route exact path="/asset/categories/create">
              <NewCategories />
            </Route>
            <Route exact path="/asset/categories/view/:itemId">
              <CategoriesView />
            </Route>
            <Route exact path="/asset/categories/edit/:itemId">
              <EditCategories />
            </Route>
            <Route exact path="/asset/categories/list">
              <CategoriesList />
            </Route>
            <Route exact path="/subasset/:itemId">
              <SubAssetView />
            </Route>
            <Route exact path="/asset">
              <Assets />
            </Route>
            <Route exact path="/location">
              <Location />
            </Route>
            <Route exact path="/location/list">
              <LocationList />
            </Route>
            <Route exact path="/location/create">
              <NewLocation />
            </Route>
            <Route exact path="/location/view/:itemId">
              <LocationView />
            </Route>
            <Route exact path="/location/edit/:itemId">
              <EditLocation />
            </Route>
            <Route exact path="/vendor">
              <Vendor />
            </Route>
            <Route exact path="/vendor/list">
              <VendorList />
            </Route>
            <Route exact path="/vendor/view/:itemId">
              <VendorView />
            </Route>
            <Route exact path="/vendor/edit/:itemId">
              <EditVendor />
            </Route>
            <Route exact path="/view">
              <ViewAsset />
            </Route>
            <Route exact path="/meters">
              <Meters />
            </Route>
            <Route exact path="/meters/create">
              <NewMeters />
            </Route>
            <Route exact path="/meters/view">
              <MeterView />
            </Route>
            <Route exact path="/meters/record/create">
              <RecordReading />
            </Route>
          </GlobalState.Provider>
        </Switch>
      </Router>
    </div>
  )
}

export default App
