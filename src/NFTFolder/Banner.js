import React,{useEffect,useContext,useState} from 'react';
import Flickity from 'react-flickity-component'
import ImageCard from './ImageCard';
import VideoCard from './VideoCard';
//import SlidesCard from '../Snippets/SliderCard';
import {Row, Col} from 'react-bootstrap';
import { DataContext } from './DataContext';
import fireDb from "./firebase";
const axios = require('axios');

const Banner = () => {  
    //const[getI,setgetI]=React.useState([]);     
    //const{getBosonData}=useContext(DataContext);   
    //const{getBosonDatavideo}=useContext(DataContext);       
    //console.log("BosonDatavideo",getBosonDatavideo)  
    const flickityOptions = {
        initialIndex: 0,
        groupCells: true,
        pageDots: false,
        contain: true
    }
    const[getExploreDate,setExploreData]=useState([]);
    console.log("printExplore",getExploreDate)    
    
    const dbcallExplore=async(index)=>{
      let req=[]
      fireDb.database().ref("imagerefexploreoneAlgos").on("value", (data) => {
        if (data) {
          data.forEach((d) => {                
            let value=d.val();            
            Object.keys(value).map(async(k)=>{                                        
              req.push(            
              {
                Assetid:value[k].Assetid,
                Imageurl:value[k].Imageurl,
                NFTPrice:value[k].NFTPrice,
                EscrowAddress:value[k].EscrowAddress,
                keyId:value[k].keyId,
                NFTName:value[k].NFTName,
                userSymbol:value[k].userSymbol,
                Ipfsurl:value[k].Ipfsurl,
                ownerAddress:value[k].ownerAddress,
                previousoaddress:value[k].previousoaddress,
                TimeStamp:value[k].TimeStamp,
                NFTDescription:value[k].NFTDescription,
                HistoryAddress:value[k].HistoryAddress,
                Appid:value[k].Appid,
                valid:value[k].valid,
                CreatorAddress:value[k].CreatorAddress
              })                              
            })                                                  
            });                  
            setExploreData(req);
          }          
        });                  
        
    }    
    useEffect(()=>{dbcallExplore()},[])
    // const dbcallsaleal=async(index)=>{        
    //       axios({
    //         method: 'get',
    //         url:`${configfile['firebaseurl']}/imagerefAlgo.json`,        
    //         responseType: 'stream'
    //       })
    //         .then(function (response) {
    //         let req = [];        
    //         req.push(response.data)
    //         let req2 =[];
    //         req.forEach((l) => {              
            
    //           Object.keys(l).map(async(k)=>{                                                        
    //             const a=l[k];
    //             //if()
    //             Object.keys(a).map(async(b)=>{                 
    //             if(a[b].CreatorAddress === "ANKBCHX6ZBRY6K563HBY2BOGOLFMYSQBI3BRDJEJJGNGG6DAGG3GNKQNQU")   {                            
    //             req2.push({                      
    //               Assetid:a[b].Assetid,
    //               Imageurl:a[b].Imageurl,
    //               NFTPrice:a[b].NFTPrice,
    //               EscrowAddress:a[b].EscrowAddress,
    //               keyId:a[b].keyId,
    //               NFTName:a[b].NFTName,
    //               userSymbol:a[b].userSymbol,
    //               Ipfsurl:a[b].Ipfsurl,
    //               ownerAddress:a[b].ownerAddress,
    //               previousoaddress:a[b].previousoaddress,
    //               TimeStamp:a[b].TimeStamp,
    //               NFTDescription:a[b].NFTDescription,
    //               HistoryAddress:a[b].HistoryAddress,
    //               Appid:a[b].Appid,
    //               valid:a[b].valid,
    //               CreatorAddress:a[b].CreatorAddress 
    //               })
    //             }else{
    //                 req.push("")
    //             }   
    //             })                                                                                                                                
    //           })                                                                     
    //         });                        
    //         setgetI(req2)  
    //         });                    
    //   //} 
    // }
    // useEffect(()=>{dbcallsaleal()},[])
    return (
        
        <div className='mb-36'>
            <Flickity
                className={'d-none d-md-block carousel'} // default ''
                elementType={'div'} // default 'div'
                options={flickityOptions} // takes flickity options {}
                disableImagesLoaded={false} // default false
                reloadOnUpdate // default false
                static // default false
            >

               {getExploreDate.map((x, index) => {
                // console.log("logo",x)
                return(  
                    <>                                                            
                    <div className='carousel-cell carousel-cell-20'>                    
                    {x.valid === "video" ?(<VideoCard title={x.NFTName} description={x.NFTDescription} url={x.Imageurl} dataall={x} ownerAddress={x.ownerAddress}/>):(
                    <ImageCard title={x.NFTName} description={x.NFTDescription} subtitle="Blazing Futures ꜩ" image={x.Imageurl} dataall={x} ownerAddress={x.ownerAddress}/>
                    )}
                    </div>
                    </>
                )})}                                                
            </Flickity>                  
            <Flickity
            className={'carousel'} // default ''
            elementType={'div'} // default 'div'
            options={flickityOptions} // takes flickity options {}
            disableImagesLoaded={false} // default false
            reloadOnUpdate // default false
            static // default false
            >            
            {getExploreDate.map((x, index) => {
                return(                    
                <div className="d-md-none">    
                <div className='carousel-cell carousel-cell-20'>                    
                <ImageCard title={x.NFTName} description={x.NFTDescription} subtitle="Blazing Futures ꜩ" image={x.Imageurl} dataall={x} ownerAddress={x.ownerAddress}/>
                &nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                </div>                                   
                )           
            })} 
            
            </Flickity>                
        </div>
    );
};

export default Banner;