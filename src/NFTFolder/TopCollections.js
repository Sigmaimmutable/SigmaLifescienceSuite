import React,{useState,useEffect} from 'react';
import {Dropdown,DropdownButton} from 'react-bootstrap';
import {
    Link
  } from "react-router-dom";
//import CollectionItem from '../Snippets/CollectionItem';
import moment from 'moment';
import firebase from "./firebase";
import CollectionItemCopy from './CollectionItemCopy';
import { DateTime } from "luxon";
//import { months } from 'moment';
const TopCollections = () => {
    
    const dateOptions = ["1", "7", "30"];
    const [date, setDate] = useState(dateOptions[0]);    
    const[getIb,setgetIb]=useState([]);
    console.log("TopCollection",getIb)  
    const[getdays,setgetdays]=useState('day');  
    console.log("TimeDb",getIb)      
    const handleSelect=(e)=>{        
        if(e==="7" || e=== "30"){
          setgetdays('days')
        }
        else{
          setgetdays('day')
        }
        setDate(e)
    }
    //buyers
    const dbcallalgobuy=async()=>{        
      let req = [];
      firebase.database().ref("imagerefexploreoneAlgos").on("value", (data) => {      
        if (data) {
          data.forEach((d) => {          
            const a=d.val();
              Object.keys(a).map(async(b)=>{                  
                        req.push({
                          Assetid:a[b].Assetid,
                          Imageurl:a[b].Imageurl,
                          NFTPrice:a[b].NFTPrice,
                          EscrowAddress:a[b].EscrowAddress,
                          keyId:a[b].keyId,
                          NFTName:a[b].NFTName,
                          userSymbol:a[b].userSymbol,
                          Ipfsurl:a[b].Ipfsurl,
                          ownerAddress:a[b].ownerAddress,
                          previousoaddress:a[b].previousoaddress,
                          TimeStamp:a[b].TimeStamp,
                          NFTDescription:a[b].NFTDescription,
                          HistoryAddress:a[b].HistoryAddress,
                          Appid:a[b].Appid,
                          valid:a[b].valid,
                          CreatorAddress:a[b].CreatorAddress 
                      })                    
              })            
          });        
          setgetIb(req)              
        }          
      });
    }  
    useEffect(()=>{dbcallalgobuy()},[])

    const filterdata=()=>{            
      var dt = DateTime.local();    
      var dtone = DateTime.local().minus({weeks:1});    
      var dtfour = DateTime.local().minus({weeks:4});    
      let currentdate=dt.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY).replaceAll(',','');
      if(date === '1')
      {
            let data = getIb.filter((val)=>{                    
            //var dt22 = DateTime.local().minus({weeks:4});    
            //var dt3=dt22.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY).replaceAll(',','');
            //let currentdate=moment().format('ddd MMM DD YYYY')     
            //let createddate=moment(val.TimeStamp).format('ddd MMM DD YYYY')
            if(currentdate=== val.TimeStamp){
              let datas=getIb.sort((a,b)=>{                
                  return parseInt(b.NFTPrice) - parseInt(a.NFTPrice)
              })            
              return datas;            
            }
      })          
      return data;
      }   
      else if(date === '7') {            
          let data = getIb.filter((val)=>{           
          let weekdates = dtone.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY).replaceAll(',','');
          //let weekdates=moment().subtract(parseInt(date),"days").format('ddd MMM DD YYYY')                                
          //if(moment(val.TimeStamp).endOf(weekdates)){        
            if(val.TimeStamp > weekdates){        
              let datas=getIb.sort((a,b)=>{                      
                return parseInt(b.NFTPrice) - parseInt(a.NFTPrice)                
              })
              return datas;
          }                        
        })        
        return data;            
      }
      else if(date === '30'){
        //let month=moment().subtract(1, 'months');        
        //let monthend=month.format('ddd MMM DD YYYY')      
        let weekdates4 = dtfour.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY).replaceAll(',','');
        let datamonth = getIb.filter((val)=>{                        
        //if(moment(val.TimeStamp).endOf(monthend)){        
        if(val.TimeStamp > weekdates4){              
              let datass=getIb.sort((a,b)=>{                      
                return parseInt(b.NFTPrice) - parseInt(a.NFTPrice)                
          })
            return datass;
          }                        
        })
        return datamonth;
      }
    }
    useEffect(()=>{filterdata()},[])

    return (
        <div className='mb-36'>
            <div className="mb-32 d-flex align-items-center">
                <div className='h2 d-flex align-items-center'>
                    Top Collections in

                    &nbsp;{date} {getdays}
                    <DropdownButton className='title-dropdown ms-2' onSelect={handleSelect}>                        
                            <Dropdown.Item eventKey="1">1 day                                 
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="7">7 days</Dropdown.Item>
                            <Dropdown.Item eventKey="30">30 days</Dropdown.Item>                        
                    </DropdownButton>
                    <Dropdown>                                                                        
                    </Dropdown>
                </div>                
            </div>
            <div className="">
              <ul className='collection-list list-unstyled flex-wrap m-0 d-flex align-items-start'>
            {getIb.map((x, index) => (     
                <li className='mb-3'>                    
                    <CollectionItemCopy Imageurl={x.Imageurl} verify={true} count={index + 1} title={x.NFTName} amount={x.NFTPrice} appid={x.Appid} assetid={x.Assetid} escrowaddress={x.EscrowAddress} historyaddress={x.HistoryAddress} imageurl={x.Imageurl} ipfsurl={x.Ipfsurl} nftdescription={x.NFTDescription} TimeStamp={x.TimeStamp} keyId={x.keyId} ownerAddress={x.ownerAddress} previousaddress={x.previousaddress} userSymbol={x.userSymbol} dataall={x} Assetid={x.Assetid}/>                       
                </li>                                 
            ))}
            </ul>
            </div>                    
            {/* <Link to="/" className='btn d-block mt-4 d-sm-none ms-auto btn-white'>Sign in</Link> */}
        </div>
    );
};

export default TopCollections;