import { useEffect } from "react";
import { useState } from "react";
//import { Link, useHistory } from "react-router-dom";

import {  Col, Container,Row,Button,Card} from "reactstrap";
//import Layout from '../components/Layouts/Layout';
//import Layout from '../components/Dashboard/Layout';
import Layout from '../components/DashboardNew/LayoutT';
import firebase from '../NFTFolder/firebase'
//import Modald from "../ModalD";
//import FolowStepsd from "../FolowStepsd";
//import FolowStepsdcopy from "../FolowStepsdcopy";
//import axios from 'axios';
//import config from '../configurl'
import Tokensredirect from "./Tokensredirect";

const View = () => {
    //let history = useHistory();        
    const [CurrentExit,setCurrentExit] = useState([]);  
    const[getIProfile,setgetIProfile]=useState([""]);
    console.log("valuemulti",getIProfile);
    const[transactioncount,settransactioncount]=useState("");
    console.log("transacount1",transactioncount);
    const[owner3,setOwner3]=useState([]);
    const[pagesCountlist,setpagesCountlist]= useState("");

    const [pageNumber, setPageNumber] = useState(0);
    const [pagesVisited, setpagesVisited] = useState(0);
    const[pageSize,setPageSize]=useState(5);
    
    console.log("pagesize",pageSize);
    const usersPerPage = 5; 
    //console.log("DataEx",CurrentExit)   
    // useEffect(() => {
    //     document.getElementById("header-title").innerText = "VIEW D-ID";
    // } )           
 
    const decrementSize=()=>{
        if(pageSize >= 10){
        setPageSize(pageSize-2)
        }        
    }
      
    const dbcallProfile=async()=>{            
        if(localStorage.getItem("walletAddress")  === null || localStorage.getItem("walletAddress")  === "" || localStorage.getItem("walletAddress")  === " " || localStorage.getItem("wallet") === undefined || localStorage.getItem("walletAddress") === ''){
        }
        else{
            // firebase.auth().signInAnonymously().then(async(response)=>{           
            const hasRestaurant = await firebase.database()
            .ref(`CreatedTokens/${localStorage.getItem('walletAddress')}`)
            .orderByKey().limitToFirst(1).once('value')
            .then(res => res.exists());              
            if(hasRestaurant)
            {
                let r=[];
                let countlist=0;
            try {    
            // firebase.auth().signInAnonymously().then((response)=>{           
            firebase.database().ref("CreatedTokens").child(localStorage.getItem('walletAddress')).on("value", (data) => {          
                if (data) {  
                    try{
                    let datavar=data.val()
                    console.log("datascheck1",datavar);
                    Object.keys(datavar).map((m)=>{
                      console.log("datascheck",datavar[m]);
                      countlist=countlist +1;
                      r.push({
                        keyId:datavar[m].keyId,
                        Owner:datavar[m].Owner,
                        TokenAddress:datavar[m].TokenAddress,
                        Tokenname:datavar[m].Tokenname,
                        TokenSymbol:datavar[m].TokenSymbol,
                        Totalsupply:datavar[m].Totalsupply,
                        Minted:datavar[m].Minted,
                        Burned:datavar[m].Burned
                      })                
  
  
                    })
                   
                  
                }   catch(e){                      
                }                 
                }
                else{
                setgetIProfile([""]);  
                }
                r.reverse();
                setgetIProfile(r);
                //setpagesCountlist(countlist);
  
            });         
            // })         
            } catch (error) {            
            }                
            }else{
                setgetIProfile([""]);  
            }  
            // })          
        }        
    }    
    useEffect(()=>{dbcallProfile()},[])

    return (
        <Layout>
        <div className="justify-content-center">  
        {localStorage.getItem('walletAddress') === null || localStorage.getItem('walletAddress') === undefined || localStorage.getItem('walletAddress') === "" ? (
        <Container fluid>           
        <Row className="justify-content-center">
            <Col xl="8" lg="8" md="10" sm="12">
                      <center>
                    <h4 className="mb-3">Please connect your wallet</h4>                                                                                                        
                      </center>
            </Col>
        </Row>
        </Container>          
      ):( 
          <Container fluid="md">                  
          
          <Container fluid>
                <Card className="card-dash border-0 mb-4">
                <h2 className="h3 text-uppercase mb-40">Tokens</h2>
                   
                    <div className="table-group-outer table-group-lg">       
                       


                        {
                           
                         localStorage.getItem("walletAddress")===null|| localStorage.getItem("walletAddress")===""? (
                          
                           <>  
                   <div className="table-group-head">
                        <div className="table-group-tr">
                        <div className="table-group-th">s.no</div>
                               <div className="table-group-th">Token Address</div>
                               <div className="table-group-th">Name</div>
                               <div className="table-group-th">Symbol</div>
                               <div className="table-group-th">Balance </div>
                               {/* <div className="table-group-th">Transaction hash/timestamp</div> */}
                               </div>
                           </div>
                           </>
                       ):(<>
                      
                
                     
                        <div className="table-group-head">
                        <div className="table-group-tr">
                               <div className="table-group-th">s.no</div>
                               <div className="table-group-th">Token Address</div>
                               <div className="table-group-th">Name</div>
                               <div className="table-group-th">Symbol</div>
                               <div className="table-group-th">Balance</div>
                               </div>
                           </div>
                          { getIProfile === null || getIProfile ==="" || getIProfile ===undefined ?(<>
                           
                           
                           
                           </>):(<>
                            { getIProfile[0] === null || getIProfile[0] ==="" || getIProfile[0] ===undefined ?(<>
                           
                           
                           
                           </>):(<>
                             {getIProfile.map((x,y)=>{
                               if(y<pageSize)
                               return(
                               <Tokensredirect x={x} y={y}/>
                               )

                             })
                             }
                           
                           
                           
                           
                           </>)}
                           
                           
                           
                           
                           </>)}
                          
                       
                         


                      
                      </>)
                  }
                          
                          

                      
                            
                    
                        
                          </div>
                    
                
                    
            
     
                          {getIProfile.length <= 5 ? (
                                <></>
                            ):(
                                <div className='pagination justify-content-end d-flex align-items-center'>                              
                                <Button variant='page' onClick={()=>{decrementSize()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </Button>
                                <Button variant='page' onClick={()=>{setPageSize(pageSize+2)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </Button>
                            </div>

                            
                            ) }



     
                </Card>
              
                
            </Container>
                
          </Container>
      )}        
                {/* </section> */}
        </div>
        </Layout>
    );
}

export default View;