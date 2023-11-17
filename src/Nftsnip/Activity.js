import React,{useEffect} from 'react';
import {Row, Col} from 'react-bootstrap'
import {
    Link
  } from "react-router-dom";
//import Filter from './filters';
import Activity1 from '../NftCards/Activity1';
import firebase from '../NFTFolder/firebase';

const Activity = ({other,ownersend}) => {
        
    const[getImgreffalgo,setgetImgreffalgo]=React.useState([]);    
    const dbcallalgo=async()=>{        
        let req = [];
        if(other === "other" && ownersend !== null){
            firebase.database().ref("activitytable").child(ownersend).on("value", (data) => {
                if (data) {
                  data.forEach((d) => {
                    //console.log("keycheck",d.key)
                    let value=d.val();
                    req.push(            
                      {
                      Assetid:value.Assetid,
                      Imageurl:value.Imageurl,
                      NFTPrice:value.NFTPrice,
                      EscrowAddress:value.EscrowAddress,
                      keyId:value.keyId,
                      NFTName:value.NFTName,
                      userSymbol:value.userSymbol,
                      Ipfsurl:value.Ipfsurl,
                      ownerAddress:value.ownerAddress,
                      previousoaddress:value.previousoaddress,
                      TimeStamp:value.TimeStamp,
                      NFTDescription:value.NFTDescription,
                      HistoryAddress:value.HistoryAddress,
                      Appid:value.Appid,
                      valid:value.valid,
                      CreatorAddress:value.CreatorAddress  
                      }          
                    )                
                  });        
                }
                setgetImgreffalgo(req);
              });                    
        }
        else if(other === "local" && ownersend === null){
            if(localStorage.getItem("wallet")  === null || localStorage.getItem("wallet")  === "" || localStorage.getItem("wallet")  === " " || localStorage.getItem("wallet") === 'undefined' || localStorage.getItem("wallet") === ''){
            }
            else{
              let getalgo=localStorage.getItem("wallet");    
              firebase.database().ref("activitytable").child(getalgo).on("value", (data) => {
                if (data) {
                  data.forEach((d) => {
                    //console.log("keycheck",d.key)
                    let value=d.val();
                    req.push(            
                      {
                      Assetid:value.Assetid,
                      Imageurl:value.Imageurl,
                      NFTPrice:value.NFTPrice,
                      EscrowAddress:value.EscrowAddress,
                      keyId:value.keyId,
                      NFTName:value.NFTName,
                      userSymbol:value.userSymbol,
                      Ipfsurl:value.Ipfsurl,
                      ownerAddress:value.ownerAddress,
                      previousoaddress:value.previousoaddress,
                      TimeStamp:value.TimeStamp,
                      NFTDescription:value.NFTDescription,
                      HistoryAddress:value.HistoryAddress,
                      Appid:value.Appid,
                      valid:value.valid,
                      CreatorAddress:value.CreatorAddress  
                      }          
                    )                
                  });        
                }
                setgetImgreffalgo(req);
              });                  
            }        
        }        
    }      
    useEffect(()=>{dbcallalgo()},[])
    return (
        <div className='mb-4'>
          {getImgreffalgo[0] === null || getImgreffalgo[0] === "" || getImgreffalgo[0] === undefined ? (
            <div className="no-found py-5p text-center">
                        <h2>Nothing to look at</h2>
                        {/* <p className="lead mb-4">Subscribe to authors and come back to see <br />NFTs from your favorite artists</p> */}
                        <Link to="/profile" className='btn btn-grad'>Browse marketplace</Link>
            </div>
           ):(             
            <Row>
                <Col md="8" lg="9">                              
          {getImgreffalgo.map((x, index) => {                                    
                                    return(  
                                    <>
                                    <Col md={7}>
                                    <Activity image={x.Imageurl} dataall={x}/>  
                                    </Col>                    
                                    </>
                    )})}                    
                </Col>                
            </Row>
          )}
        </div>
    );
};

export default Activity;