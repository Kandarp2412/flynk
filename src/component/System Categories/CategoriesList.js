import React, { useEffect, useState, useContext } from "react";
import { Divider,} from "@material-ui/core";
import { GlobalState } from "../../context/GlobalState";
import axios from "axios";
import "../AssetView.css";
import { useHistory } from "react-router";


function CategoriesList() {
  const history = useHistory();

  const { Data, setData,  } = useContext(GlobalState);

  useEffect(() => {
    axios
      .post("http://demo.travel.webbrainstechnologies.com/api/system_categoeries_list")
      .then((res) => {
          
        setData(res.data.result);
        
      })
      .catch((err2) => console.log(err2));
  }, []);

  

  function handleClick(itemId) {
    console.log(itemId);
    history.push({
      pathname: `/asset/categories/view/${itemId}`,
     
    });
  }

  return (
    <div>
      <div>
        <div
          className='col-sm-4'
          style={{
            display: "flex",
            overflowY: "scroll",
            // flexDirection:"column",
            alignItems: "center",
            border: "1px solid lightgrey",
            height: "500px",
            minWidth: "30vw",
          }}
        >
          {Data && Data.length > 0 ? (
            <div>
              {Data.map((item) => {
               
                return (
                  <div>
                    <div
                      onClick={() => handleClick(item["id"])}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        
                        alt='abc'
                        height='40'
                        width='40'
                      ></img>
                      <br></br>
                      <span>{item["name"]}</span>
                      
                    </div>
                    
                    <Divider variant='fullWidth' />
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <h6 style={{ fontSize: "14px" }}>
                How can we break it if we don't know what it is?
              </h6>
              <a href='#' style={{ fontSize: "14px" }}>
                Start adding the asstes you're in charge of maintaining
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoriesList;

{
  /* <a>
                    <span></span>
                </a>
                <svg height="16" width="16" style={{transform:'rotate(90deg)'}}>
                  <path d="M10.994 6.369a.875.875 0 01-1.238 0L6 2.612 2.244 6.37A.875.875 0 111.006 5.13L5.381.756a.875.875 0 011.238 0l4.375 4.375a.875.875 0 010 1.238z" />
                </svg> */
}
