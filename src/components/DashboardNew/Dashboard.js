import React, {useState, useEffect} from 'react';
import { Card, Col, Container, OverlayTrigger, Row, Tooltip, ProgressBar ,Table,Button,Dropdown} from 'react-bootstrap';

import { Link } from 'react-router-dom';
import ReactDomServer from 'react-dom/server';
import ReactPaginate from "react-paginate";

import Clock from '../../assets/images/Clock.svg';
import Layout from './LayoutT';
// import PieChartYesNo from './snippets/PieChartYesNo';
// import PieChart from './snippets/PieChart';
import blackicon from "../../assets/images/blacklogo.png";
import web3 from '../../web3';
import { contracts } from './contractAddress';
import {blackabi, blackstake,elementabi,elementstake} from './abi';
import { data } from 'flickity';
// import AreaChartBlack from './snippets/AreaChartBlack'
const Blackdashboard = () => {

    useEffect(() => {
        document.title = "BlackCollateral | DashBoard"
    }, [])
    
   
    const[blacklockstatus,setblacklockstatus]= useState();
    const [blackbalance,setblackbalance] = useState(0);
    const[flagTimer, setFlagTimer] = useState(false);
    const[secondsContract, setSecondsContract] = useState();
    const[totalsupply,setTotalsupply]= useState();
    const[burnfee,setTotalBurnFee]= useState();
    const[taxfee,setTotalTaxFee]= useState();
    const[treasuryfee,setTotalTreasuryFee]=useState();
    const[liquidityFee,setTotalLiquidityFee]=useState();
     const[locktime,setLocktime]= useState();
    const[currentPage,setcurrentPage]= useState(0);
    const[filtdata,setfiltdata]= useState([]);;
    const[Option,setOption]= useState();
    const[pageSize,setpageSize]= useState(4);
    const[filtdata3,setfiltdata3]= useState([]);
    const[filtdata2,setfiltdata2]= useState([]);
    const[datas,setdatas]= useState([]);
    // console.log("datasvalue",datas);
    const[values,setvalues]= useState([]);;
    const[Posts,setPosts]= useState();
    const[ad,setad]= useState();
    const[con,setcon]= useState();
    const[pagesCount,setpagesCount]= useState(0);
    const[pagesCountlist,setpagesCountlist]= useState("");
    const[Loading,setLoading]= useState(false);
    const[datastore,setstoredata]= useState([]);
  
    const [count,setcount] = useState(0);
    // const [eligible,setEligible] = useState(0);
    // const [noteligible,setNotEligible] = useState(0);
    // const [currentItems, setCurrentItems] = useState(null);
      const [pageCountlisting, setPageCountlisting] = useState([]);

    const [pageNumber, setPageNumber] = useState(0);
    const [pagesVisited, setpagesVisited] = useState(0);
    const usersPerPage = 5;
    
    // const pagesVisited = pageNumber * usersPerPage;
console.log("pgv",pagesVisited);
        //start time vote
        const[date,setdate]= useState("");
        const[time,settime]= useState("");
        const[day,setTime4]= useState("");
        const[hour,setTim1]= useState("");
        const[min,setTim2]= useState("");
        const[sec,setTim3]= useState("");
        const[lock,setlock]= useState(""); 
    
     
    
     
    
     
    
       
        useEffect(() => {
            const Blackdisplay = async () => {
                const blackcontract = new web3.eth.Contract(blackabi, contracts.black.address);
                if(localStorage.getItem("walletAddress")>0){
                    const accounts =  await web3.eth.getAccounts();
                const blacklockstatus = await blackcontract.methods._isFrozen(accounts[0]).call(); 
                const blacklockedtime = await blackcontract.methods._secondsLeft(accounts[0]).call(); 
                if(flagTimer === false)
                {  
                    //  console.log("inside flag", blacklockedtime, flagTimer);
                    setSecondsContract((new Date().getTime() / 1000) + parseInt(blacklockedtime));
                    setFlagTimer(true);
                }
                // console.log("blacklockedtime",blacklockedtime);
                // console.log("blacklockstatus",blacklockstatus);
                if(blacklockstatus==true){
                    setblacklockstatus(true);
                    setLocktime(blacklockedtime);
                }
                else{
                    setblacklockstatus(false);
                }
                setblackbalance(await blackcontract.methods.balanceOf(accounts[0]).call()); 
                setTotalsupply(await blackcontract.methods.totalSupply().call());
                setTotalBurnFee(await blackcontract.methods.totalBurn().call());   
                setTotalTaxFee(await blackcontract.methods.totalTax().call());  
                setTotalTreasuryFee(await blackcontract.methods.balanceOf(contracts.BlackTreasury.address).call()); 
                setTotalLiquidityFee(await blackcontract.methods.balanceOf(contracts.black.address).call()); 
                }
            };
        
            Blackdisplay();
          }, [blacklockstatus, flagTimer, secondsContract]);
        
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
         }
        
        const starttime = async () => {
      if(secondsContract)
      {
            var us=  parseInt(secondsContract);
            // var us= 1656142329;
            // console.log("us -", secondsContract)
            var ff=new Date(us);
        setdate(ff.toDateString());
        var hours = ff.getHours();
          var minutes = ff.getMinutes();
          var ampm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          minutes = minutes < 10 ? '0'+minutes : minutes;
          settime( hours + ':' + minutes + ' ' + ampm);
        //settime(lock);
        var countDowndate = us * 1000;
        // console.log(countDowndate);
        // var countDownDate = new Date().getTime() + (lock * 1000);
        //alert(time);
            var x = setInterval(function() {
               var now = new Date().getTime();
              var distance = countDowndate - now;
            //    console.log("-------------------now", distance);
             //  //console.log(now);
              // Time calculations for days, hours, minutes and seconds
             var days = Math.floor(distance / (1000 * 60 * 60 * 24));
              var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
              var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
            //    //console.log("date e", day);
            //    //console.log("hour e", hour);
            //    //console.log("min e", minutes);
            //    //console.log("sec e", seconds);
        
              // Output the result in an element with id="demo"
             // document.getElementById("demo").innerHTML = hours + "h "
             // + minutes + "m " + seconds + "s ";
                setTime4(days);
                setTim1(hours);
                setTim2(minutes);
                setTim3(seconds);
     
            
            
              // If the count down is over, write some text 
              if (distance < 0) {
                    clearInterval(x);
                    setlock(false);
        
                   //  //console.log('CountDown Finished');
                }
                else{
                 setlock(true);
                }
        
            
              
            }, 1000);
           
        
        }
        }

        useEffect(async() => {
            await starttime();
        }, [day, hour, min, sec, lock, secondsContract])
    


        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
         }
         let countlist=0;
         
        let pageCount;
  const transactiondisplay= async()=>{
        const blackcontract = new web3.eth.Contract(blackabi, contracts.black.address);
        const account = await web3.eth.getAccounts();
        setLoading(true);
        // console.log("walletconncted",localStorage.getItem("wallet"))
        if(localStorage.getItem("walletAddress")>0){
            let response;
            // if(contracts.black.address === null || contracts.black.address === "" || contracts.black.address === undefined || contracts.black.address===" "){
            //     response = await fetch("https://api-rinkeby.etherscan.io/api?module=account&action=tokentx&address= 0x7665e51367B4105C681E578454De77BdbDd8dCFD &startblock=0&endblock=250000000000&sort=desc&apikey=YourApiKeyToken");
            //     console.log("check1")  
            // }
            //   else{
            //     console.log("contracts.black.address",contracts.black.address)  
            //     response = await fetch("https://api-rinkeby.etherscan.io/api?module=account&action=tokentx&address="+contracts.black.address+"&startblock=0&endblock=250000000000&sort=desc&apikey=YourApiKeyToken"); 
                
            //     console.log("response",response) ; 
                
            // }

            if(contracts.black.address === null || contracts.black.address === "" || contracts.black.address === undefined || contracts.black.address===" "){
                response = await fetch(" https://api-testnet.bscscan.com/api?module=account&action=txlist&address="+contracts.black.address+"&startblock=0&endblock=250000000000&sort=desc&apikey=YourApiKeyToken");
              }
              else{
                response = await fetch("https:/api-testnet.bscscan.com/api?module=account&action=tokentx&address="+account[0]+"&startblock=0&endblock=250000000000&sort=desc&apikey=YourApiKeyToken"); 
              }
            const data = await response.json();

            // console.log("data1",data);
        //    const data = await response.json();
           //console.log("data",data);
           //console.log("response",response);
            //var assign= data.result; 
           
            setdatas(data.result);
            setPosts(data.result);
            let countlist=0;
            let storedata=[];
            data.result.forEach((b)=>{
                let r=[];
                if(parseInt(b.from) === parseInt(account[0]) && parseInt(b.contractAddress)===parseInt(contracts.black.address)){
                    // r.push(b);
                    // console.log("datasearch",b.from);
                    // setPageCountlisting(b);
                   
                   console.log("pagecountlistB",b);
                     countlist=countlist +1;
                     
                    // setcount(count +1)
                    storedata.push(b);
                }
              
               
            })
            setstoredata(storedata);
            setpagesCountlist(countlist);
            console.log("storedata",storedata);
            console.log("pagecountlist",countlist);

            Object.keys(datas).map((k)=>{
                // console.log("datasfrom",datas[k].from);
           
                
            })
            // setState({setLoading:false});
            var coun  = 0;
           
        //    console.log("datas",datas);
           
           var myName = account[0];
           const myadd = '"' + myName + '"';       
           
           var myna = parseInt(account[0]);
            setad(myna);
            // console.log("ad",myna);
           
           
            for(var i = 0;i < datas.length;i++){ 
           
            let ad = parseInt(datas[i].from);
            
            const ad1 = '"' +  datas[i].from + '"';
            const myadd = '"' + myName + '"';
           
            var compareNum =0;
            // if(this.state.datas[i].timeStamp >= dates){
    
                 if( myna == ad){
                    coun = coun + 1 ;
                    console.log("equal",coun);
                     }
           
            // }
        }
        if(coun < 0){
           setcon("Nil");
            }
            else{
            setcon(coun);
            }
            
            
            
        //  setcount(count1);
            
    
         
         
           
          datas.map((a)=>{            
                if(parseInt(a.from)===ad){
                    setvalues(parseInt(a.from));
                    // console.log("ab",a.from);
                   
                }
    
            })
            
            //const filtdatatime=data.result.filter((a)=>parseInt(a.from)===this.state.setad);
               //filtdatatime.map((a)=> console.log("console time",new Date(a.timeStamp * 1000).toGMTString()) )           
                //this.setState({timestore:a.timeStamp})
                //console.log("filterdtime",filtdatatime);      
                 
               const filtdata=data.result.filter((a)=>parseInt(a.from)===ad);
            //    console.log("filterddata",filtdata);  
                setfiltdata(filtdata) ;
    
               const filtdata2=data.result.filter((a)=>parseInt(a.from)===parseInt(contracts.black.address));
            //    console.log("filterddata2",filtdata2);  
            setfiltdata2(filtdata2);
            //    this.setState({cart: [this.state.filtdata, this.state.input]});
    
            const filtdata3=filtdata2.filter((a)=>parseInt(a.to)===ad);
            
            setfiltdata3(filtdata3); 
            //  console.log("countcheck",count)
        
        // let pagesCount = Math.ceil(datas.length / pageSize);
        
        //pageCount = Math.ceil(countlist / usersPerPage);
        setpagesCount(Math.ceil(countlist / usersPerPage));
        console.log("pageCount",countlist)
        }
      }
    
      useEffect(()=>{transactiondisplay()},[])
     
      const changeSelectOptionHandler = (event) => {
        setOption(event.target.value);
       }; 

   
   
     const changePage = ( selected ) => {
       setPageNumber(selected);
       console.log("pgv23",pagesVisited,pagesCountlist);
       if((pagesVisited + 5)  >= pagesCountlist){

       }else{
        setpagesVisited((pagesVisited +  selected));
        console.log("pgv2",selected,usersPerPage);
       }
       
     };
     const pagedecrease = ( selected ) => {
        // setpagesCount(Math.ceil(countlist / usersPerPage));
        console.log("data",pagesVisited)
        if((pagesVisited) < usersPerPage){
            // setpagesVisited(selected * usersPerPage);   
        }else{
            setpagesVisited((pagesVisited - selected));

        }
       
      };
 

      

      
    return (
          
            <Layout>
          
                <Row className='mx-lg-5 custom-card-h mx-md-3 mx-2'>
                    <Col md={6}>
                        <Card className="card-dash border-0 mb-4" style={{minHeight: '166px'}}>
                            <small className="text-md mb-20 font-semibold leading-7 text-purple" color="#f5584b">Wallet Status <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                      Your Wallet Lock Status
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger></small>            
                            <div className="d-flex mt-5 align-items-baseline">
                            {/* <h3 className="font-weight-bold">{blacklockstatus == true ? (<>Wallet Locked you need to wait for <br></br><div className='text-center pt-3'> {day}d : {hour}h : {min}m : {sec}s</div> </>):(<>Not Locked</>)}</h3> */}

                            <div className="clock d-flex align-items-center justify-content-center flex-column">
                                <img src={Clock} className='clock-circle' alt="Clock" />

                                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 7.59041V8.41262C14 8.51027 13.9779 8.60793 13.9653 8.70874C13.8211 10.1601 13.2212 11.5286 12.2516 12.6182C11.2079 13.8247 9.77661 14.63 8.20359 14.8958C7.94212 14.943 7.67436 14.9682 7.40974 15.0029H6.58753L6.45522 14.9808C6.1402 14.9367 5.82518 14.9115 5.53851 14.8454C3.8984 14.5089 2.44015 13.5789 1.44322 12.2338C0.823699 11.4422 0.38762 10.523 0.166445 9.54238C-0.0547308 8.5618 -0.0554882 7.54435 0.164227 6.56344C0.488479 4.90971 1.41732 3.43615 2.76946 2.43035C4.17144 1.3399 5.94392 0.840255 7.70901 1.03795C9.16385 1.17244 10.5363 1.77356 11.6216 2.75167C12.8245 3.79603 13.6274 5.2258 13.8929 6.79655C13.937 7.05802 13.9653 7.32579 14 7.59041ZM13.0549 8.00309C13.0549 6.80206 12.6987 5.62802 12.0312 4.62953C11.3638 3.63104 10.4151 2.85298 9.30534 2.3938C8.19555 1.93462 6.9745 1.81496 5.79669 2.04995C4.61887 2.28495 3.53723 2.86405 2.68864 3.71396C1.84005 4.56388 1.26263 5.64642 1.02947 6.8246C0.79631 8.00278 0.917875 9.22365 1.37878 10.3327C1.83969 11.4418 2.61923 12.3892 3.61876 13.0551C4.61829 13.721 5.79288 14.0754 6.99391 14.0736C8.60342 14.0711 10.1463 13.4308 11.2847 12.293C12.4231 11.1552 13.0642 9.6126 13.0675 8.00309H13.0549Z" fill="#CF92FF"/>
                                    <path d="M6.53434 8.42469V3.58595C6.52091 3.46939 6.55162 3.35202 6.62042 3.25698C6.68923 3.16193 6.79113 3.0961 6.90606 3.07246C6.97094 3.05878 7.038 3.0592 7.10271 3.07367C7.16741 3.08815 7.22826 3.11635 7.28112 3.15637C7.33399 3.19639 7.37764 3.2473 7.40913 3.30565C7.44062 3.364 7.45921 3.42844 7.46365 3.49459C7.46365 3.54185 7.46365 3.59225 7.46365 3.64265V7.48592H7.62746H10.3902C10.5091 7.469 10.6301 7.49801 10.7284 7.56706C10.8267 7.63611 10.895 7.74002 10.9194 7.85765C10.9324 7.91662 10.9335 7.97757 10.9227 8.03697C10.912 8.09638 10.8895 8.15306 10.8567 8.20374C10.8239 8.25442 10.7814 8.29809 10.7316 8.33223C10.6818 8.36637 10.6257 8.3903 10.5666 8.40264C10.508 8.40901 10.4488 8.40901 10.3902 8.40264C9.14902 8.40264 7.90573 8.40264 6.66035 8.40264L6.53434 8.42469Z" fill="#CF92FF"/>
                                </svg>
                                <p>{lock == true ?(<>Wallet <br />unlocks in</>):(<></>)}</p>
                                <p>{lock == true ? (<>{day}d:{hour}h:{min}m:{sec}s</>):(<>Not Locked</>)}</p>
                            </div>
                                
                            </div>
                        </Card>

                        <Card className="card-dash border-0 mb-4" style={{minHeight: '166px'}}>
                            <small className="text-md mb-20 font-semibold leading-7 text-purple"color="#f5584b">Black Balance 
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        Your Black Token Balance
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger></small>            
                            <div className="d-flex mt-5 align-items-baseline">
                            <h3 className="font-weight-bold">{blackbalance===""||blackbalance===null||blackbalance===undefined ?( 0):( <h4> {parseFloat((blackbalance)/1000000000).toFixed(2)}</h4>)}</h3>
                                
                            </div>
                        </Card>
                        <Card className="card-dash border-0 mb-4" style={{minHeight: '166px'}}>
                            <small className="text-md mb-20 font-semibold leading-7 text-purple" color="#f5584b">Total Supply
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        Black Token total supply
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger></small>            
                            <div className="d-flex mt-5 align-items-baseline">
                            <h3 className="font-weight-bold">{totalsupply===""||totalsupply===null||totalsupply===undefined ?( 0):( <h4> {parseFloat((totalsupply)/1000000000).toFixed(2)}</h4>)}</h3>
                                
                            </div>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple" color="#f5584b">Tax Fee
                            <OverlayTrigger
                                        key="right"
                                        placement="right"
                                        overlay={
                                            <Tooltip id={`tooltip-right`}>
                                                Total Tax Fee Collected. 
                                                {/* where the USDC while minting EINR is stored. */}
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z"  fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#7a7229"></path></svg>
                                    </OverlayTrigger>
                            </div>
                            </Col>
                            </Row>
                            <Row className='mt-2'>
                              <Col>
                              <div className='mb-20'>
                                <h6 className='sub-heading mb-0'>
                                    Balance
                                </h6>
                                <h4 className='mb-0'><img src={blackicon} alt="logo" className='me-2 avatar-pic'  />{parseFloat((parseFloat(taxfee)/1000000000)) ? parseFloat((parseFloat(taxfee)/1000000000).toFixed(2)).toLocaleString() : "0"}</h4>                                
                            </div>
                              </Col>
                              <Col>
                              <div className='mb-20 pt-sm-3'>
                                            <div className="text-sm d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="#7a7229" x="0" y="0" width="16" height="16"></rect></svg>
                                                Tax Fee Percentage 

                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                             % of Tax Fee Detected For Transaction
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                   
                                                    </OverlayTrigger>
                                            </div>
                                            4%
                                        </div>
                              </Col>
                            </Row>
                            
                         
                            
                        </Card> 
                        <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple" color="#f5584b">Burn Fee
                            <OverlayTrigger
                                        key="right"
                                        placement="right"
                                        overlay={
                                            <Tooltip id={`tooltip-right`}>
                                                Total Burn Fee Collected. 
                                                {/* where the USDC while minting EINR is stored. */}
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                    </OverlayTrigger>
                            </div>
                            </Col>
                            <Col>
                          
                            </Col>
                            </Row>
                            <Row className='mt-2'>
                              <Col>
                              <div className='mb-20'>
                                <h6 className='sub-heading mb-0'>
                                    Balance
                                </h6>
                                <h4 className='mb-0'><img src={blackicon} alt="logo" className='me-2 avatar-pic'  />{parseFloat((parseFloat(burnfee)/1000000000)) ? parseFloat((parseFloat(burnfee)/1000000000).toFixed(2)).toLocaleString() : "0"}</h4>                                
                            </div>
                              </Col>
                              <Col>
                              <div className='mb-20 pt-sm-3'>
                                            <div className="text-sm d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="#dc143c" x="0" y="0" width="16" height="16"></rect></svg>
                                                Burn Fee Percentage 

                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                             % of Burn Fee Detected For Transaction
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                   
                                                    </OverlayTrigger>
                                            </div>
                                            4%
                                        </div>
                              </Col>
                            </Row>
                            
                         
                            
                        </Card> 
                        <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple" color="#f5584b">Treasury Fee
                            <OverlayTrigger
                                        key="right"
                                        placement="right"
                                        overlay={
                                            <Tooltip id={`tooltip-right`}>
                                                Total Treasury Fee Collected. 
                                                {/* where the USDC while minting EINR is stored. */}
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                    </OverlayTrigger>
                            </div>
                            </Col>
                            <Col>
                          
                            </Col>
                            </Row>
                            <Row className='mt-2'>
                              <Col>
                              <div className='mb-20'>
                                <h6 className='sub-heading mb-0'>
                                    Balance
                                </h6>
                                <h4 className='mb-0'><img src={blackicon} alt="logo" className='me-2 avatar-pic'  />{parseFloat((parseFloat(treasuryfee)/1000000000)) ? parseFloat((parseFloat(treasuryfee)/1000000000).toFixed(2)).toLocaleString() : "0"}</h4>                                
                            </div>
                              </Col>
                              <Col>
                              <div className='mb-20 pt-sm-3'>
                                            <div className="text-sm d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="#2C3862" x="0" y="0" width="16" height="16"></rect></svg>
                                                Treasury Fee Percentage 

                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                             % of Treasury Fee Detected For Transaction
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                   
                                                    </OverlayTrigger>
                                            </div>
                                            1%
                                        </div>
                              </Col>
                            </Row>
                            
                         
                            
                        </Card>  
                        <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple" color="#f5584b">Liquidity Fee
                            <OverlayTrigger
                                        key="right"
                                        placement="right"
                                        overlay={
                                            <Tooltip id={`tooltip-right`}>
                                                Total Liquidity Fee Collected. 
                                                {/* where the USDC while minting EINR is stored. */}
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                    </OverlayTrigger>
                            </div>
                            </Col>
                            <Col>
                          
                            </Col>
                            </Row>
                            <Row className='mt-2'>
                              <Col>
                              <div className='mb-20'>
                                <h6 className='sub-heading mb-0'>
                                    Balance
                                </h6>
                                <h4 className='mb-0'><img src={blackicon} alt="logo" className='me-2 avatar-pic'  />{parseFloat((parseFloat(liquidityFee)/1000000000)) ? parseFloat((parseFloat(liquidityFee)/1000000000).toFixed(2)).toLocaleString() : "0"}</h4>                                
                            </div>
                              </Col>
                              <Col>
                              <div className='mb-20 pt-sm-3'>
                                            <div className="text-sm d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="#3766d5" x="0" y="0" width="16" height="16"></rect></svg>
                                                Liquidity Fee Percentage 

                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                             % of Tax Fee Detected For Transaction
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                   
                                                    </OverlayTrigger>
                                            </div>
                                            1%
                                        </div>
                              </Col>
                            </Row>
                            
                         
                            
                        </Card>  
                    </Col> 
                </Row>
                <Container fluid>
                <Card className="card-dash border-0 mb-4">
                <h2 className="h3 text-uppercase mb-40">Transactions</h2>
                   
                    <div className="table-group-outer table-group-lg">       
                       


                        {
                           
                           datas === undefined || datas === null || datas === "" || localStorage.getItem("walletAddress")===null|| localStorage.getItem("walletAddress")===""? (
                           //    <h6 style={{cursor:"pointer", fontWeight: "600" }} >hello</h6>
                           <>  
<div className="table-group-head">
                        <div className="table-group-tr">
                               <div className="table-group-th">Transaction</div>
                               <div className="table-group-th">Amount</div>
                               <div className="table-group-th">Address</div>
                               <div className="table-group-th">Transaction hash/timestamp</div>
                               </div>
                           </div>
                           </>
                       ):(<>
                       {datas[0] === undefined || datas[0] === null || datas[0] === "" ||datas[0].length===0||datas[0].length===1?(<>
                       
                        {/* <h6 style={{cursor:"pointer", fontWeight: "600" }} >hello</h6> */}
                       
                       
                       </>):(<>
                       
                      
                     
                        <div className="table-group-head">
                        <div className="table-group-tr">
                               <div className="table-group-th">Transaction</div>
                               <div className="table-group-th">Amount</div>
                               <div className="table-group-th">Address</div>
                               <div className="table-group-th">Transaction hash/timestamp</div>
                               </div>
                           </div>
                           <div className="table-group-head">
                           {
                            //  datas.slice(currentPage *pageSize, (currentPage + 1) * pageSize)
                                
                            datastore.slice(pagesVisited, pagesVisited + usersPerPage).map((a) =>
                               {
                            
                              
                              
                                  return (

                                   <>
                                   {/* {(parseInt(a.from) === parseInt(localStorage.getItem("walletAddress"))) && parseInt(a.contractAddress)===parseInt(contracts.black.address)?( */}
                                   
                                    <div className="table-group-tr">
                                    {/* {console.log("a.from",a.from)}  */}
                                  
                                <div className="table-group-th">
    
                                     <div className="d-flex">
                                         <img
                                             left
                                             width="30%"
                                             height="30%"
                                             style={{
                                                 margin: "auto",
                                                 marginRight: "5px",
                                                 marginLeft: "5px",
                                             }}
                                             src={blackicon}
                                             alt="Card image cap"
                                         />
                                         
                                         <div className="pl-2 pr-2">
                                             
                                             {
                                                 a.from === contracts.black.address ?(
                                                     
                                                 <h6 style={{ fontWeight: "600" }}>withdraw</h6>):
                                                 (
                                               <h6 style={{ fontWeight: "600" }}>Black Transfer</h6>
                                                 )
                                             }
                                             {/* <h6 style={{ fontWeight: "600" }}></h6> */}
                                             <div
                                                 className="mb-0 text-muted"
                                                 style={{ fontSize: "12px", fontWeight: "600" }}
                                             >
                                                 {a.tokenName}
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                                 <div className="table-group-th">
                                     <div className="d-flex justify-content-left">
                                         <div className="table-group-td">
                                        
                                             <h6 style={{ fontWeight: "600", color: '#00d395' }}>{parseFloat(a.value/1000000000).toFixed(3)}</h6>
                                            
                                         </div>
                                     </div>
                                 </div>
    
                                 <div className="table-group-td" style={{ verticalAlign: "middle" }}>
                                     {/* <Link to="https://app.barnbridge.com/">
                                         <h6 style={{ fontWeight: "600" }}>{a.from.slice(0,32)}</h6>
                                     </Link> */}
                                               <Link>
                                                 <h6 style={{cursor:"pointer", fontWeight: "600" }} onClick={e => window.open("https://testnet.bscscan.com/address/"+a.to)}>{a.to.slice(0,52)}</h6>
                                                 </Link>
                                 </div>
                                 <div className="table-group-th">
                                     <div className="d-flex justify-content-left">
                                         <div className=" align-items-baseline">
                                             {/* <Link to={"https://bscscan.com/tx/"+a.hash}> */}
                                                 {/* <h6 style={{ fontWeight: "600" }}>{a.hash.slice(0,32)}</h6> */}
                                                 <Link>
                                                 <h6 style={{cursor:"pointer", fontWeight: "600" }} onClick={e => window.open("https://testnet.bscscan.com/tx/"+a.hash)}>{a.hash.slice(0,32)}</h6>
                                                 </Link>
                                             {/* </Link>                        */}
                                              <div
                                                 className="mb-0 text-muted"
                                                 style={{ fontSize: "12px", fontWeight: "600" }}
                                             >
                                                 {new Date(a.timeStamp * 1000).toGMTString()}
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                                 </div>
                                 
                                  {/* ):(<><h1>Hello</h1></>)}  */}
                                
                                 
                                   
                                   
                                   
                                   </>
    
    
                                  )
                                 
                                 
                                 
                                //  </>):(<>
                                //  return(  <h6 style={{cursor:"pointer", fontWeight: "600" }} >hello</h6>)
                                
                                 
                                 
                                //  </>)}
                                 
                              }
                               
                           ) 
                           }
                           
                           </div>
                       
                       </>)}
                         


                      
                      </>)
                  }
                          
                          

                      
                            
                    
                        
                          </div>
                    
                
                    
            
                    {/* <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pagesCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      /> */}
     
     
       <div className="pagination-footer d-flex align-items-center justify-content-between">
       <p>showing {pagesVisited}-{pagesVisited +5} from {parseFloat(pagesCountlist/5).toFixed(0)} Page</p>
                <div className="d-flex pagination align-items-center">
               

                    <Button variant='page' onClick={()=>{pagedecrease(5)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                    </Button>
                    <Button variant='page' onClick={()=>{changePage(5)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </Button>
                </div>
            </div>



     
                </Card>
              
                
            </Container>
           
            </Layout>
    );
};

export default Blackdashboard;