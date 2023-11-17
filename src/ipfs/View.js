import { useEffect } from "react";
import { useState } from "react";
//import { Link, useHistory } from "react-router-dom";
import { Col, Container,  Row, Table } from "reactstrap";
//import Layout from '../components/Layouts/Layout';
//import Layout from '../components/Dashboard/Layout';
import Layout from '../components/DashboardNew/LayoutT';
import fireDb from '../NFTFolder/firebase'
//import Modald from "../ModalD";
//import FolowStepsd from "../FolowStepsd";
//import FolowStepsdcopy from "../FolowStepsdcopy";
//import axios from 'axios';
//import config from '../configurl'
const View = () => {
    //let history = useHistory();        
    const [CurrentExit,setCurrentExit] = useState([]);   
    //console.log("DataEx",CurrentExit)   
    // useEffect(() => {
    //     document.getElementById("header-title").innerText = "VIEW D-ID";
    // } )           
    const dbcallalgo=async()=>{
        //console.log("inside dbcallalgo function")  
        let req = [];
        if(localStorage.getItem("walletAddress")  === null || localStorage.getItem("walletAddress")  === "" || localStorage.getItem("walletAddress")  === " " || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){
        }
        else{      
          try{        
          fireDb.auth().signInAnonymously().then((response)=>{      
          fireDb.database().ref("kycplainjson").child(localStorage.getItem("walletAddress")).on("value", (data) => {
            if (data) {            
              data.forEach((d) => {                
                let value=d.val();              
                req.push(            
                  {
                  "dbkey":value.dbkey,
                  "createdDate": value.createdDate,"Name": value.Name,
                  "proofType": value.proofType,"algoAddress": value.algoAddress,
                  "ProofNumber": value.ProofNumber,"selfiePath": value.selfiePath,            
                  "kycStatus":value.kycStatus,"reviewedBy": value.reviewedBy,"approvedBy": value.approvedBy,"submittedDate": value.submittedDate,
                  "reviewedDate": value.reviewedDate,"approvedDate": value.approvedDate,"identity":value.identity,            
                  "citizenship": value.citizenship,
                  "base64Image": value.base64Image,
                  "assetId": value.assetId,
                  "address": value.address,
                  "dob":value.dob,
                  "email": value.email,
                  "phoneNumber":value.phoneNumber,
                  "ipfslink":value.ipfslink
                })                
                setCurrentExit(req);               
                });        
              }              
              //setCurrentExit(false);
          });
          })
          }catch{          
          }                  
          }        
    }      
    useEffect(()=>{dbcallalgo()},[])


    return (
        <Layout>
        <div className="justify-content-center">  
        <Container fluid>           
                        <Row className="justify-content-center">
                            <Col xl="8" lg="8" md="10" sm="12">
                                <div className="card-bond">
                                    <div className="p-3 card-bond-inner">
                                    <h4 className="mb-3">YOUR D-ID</h4>                                                                
                                    {CurrentExit === "" || CurrentExit === null || CurrentExit === undefined ? (
                                    <Container fluid>           
                                    <Row className="justify-content-center">
                                        <Col xl="8" lg="8" md="10" sm="12">
                                            <div className="card-bond">
                                                <div className="p-3 card-bond-inner">
                                                  <center>
                                                <h4 className="mb-3">Please upload KYC details</h4>                                                                                                        
                                                  </center>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                  </Container>            
                                    ):(
                                    <>
                                    {CurrentExit[0] === "" || CurrentExit[0] === null || CurrentExit[0] === undefined ? (
                                    <Container fluid>           
                                    <Row className="justify-content-center">
                                        <Col xl="8" lg="8" md="10" sm="12">
                                            <div className="card-bond">
                                                <div className="p-3 card-bond-inner">
                                                  <center>
                                                  <h4 className="mb-3">Please upload KYC details</h4>                                                                                                        
                                                  </center>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    </Container>                                    
                                    ):(
                                    <>
                            {CurrentExit[0].assetId === null || CurrentExit[0].assetId === "" || CurrentExit[0].assetId === undefined || CurrentExit[0].assetId === "null"?(
                              <Container fluid>           
                              <Row className="justify-content-center">
                                  <Col xl="8" lg="8" md="10" sm="12">
                                      <div className="card-bond">
                                          <div className="p-3 card-bond-inner">
                                            <center>
                                          <h4 className="mb-3">Your KYC Details Pending </h4>                                                                                                        
                                            </center>
                                          </div>
                                      </div>
                                  </Col>
                              </Row>
                              </Container>                                        
                            ):(
                            <Table responsive className="mt-3 text-white">
                            <thead>
                                <tr>
                                    <th>Your Id</th>
                                    {CurrentExit === null || CurrentExit === undefined || CurrentExit === "" || CurrentExit[0] === null || CurrentExit[0] === "" || CurrentExit[0] === undefined ? (
                                                <td> - </td>
                                    ):(                                                
                                        <>
                                        {CurrentExit[0].assetId === null || CurrentExit[0].assetId === undefined || CurrentExit[0].assetId === "" ? (
                                            <>
                                                <td> - </td>
                                            </>
                                            ):(
                                                <td>{CurrentExit[0].assetId}</td>
                                            )}
                                            </>
                                    )}                                            
                                    </tr>
                                    <tr>
                                    <th>Your Name</th>
                                    {CurrentExit === null || CurrentExit === undefined || CurrentExit === "" || CurrentExit[0] === null || CurrentExit[0] === "" || CurrentExit[0] === undefined ? (
                                                <td> - </td>
                                    ):(                                                
                                        <>
                                        {CurrentExit[0].Name === null || CurrentExit[0].Name === undefined || CurrentExit[0].Name === "" ? (
                                            <>
                                                <td> - </td>
                                            </>
                                            ):(
                                                <td>{CurrentExit[0].Name}</td>
                                            )}
                                            </>
                                    )}                                            
                                    </tr>
                                    <tr>
                                    <th>Your Citizenship</th>
                                    {CurrentExit === null || CurrentExit === undefined || CurrentExit === "" ? (
                                                <td> - </td>
                                    ):(                                                
                                        <>
                                        {CurrentExit === null || CurrentExit === undefined || CurrentExit === "" || CurrentExit[0] === null || CurrentExit[0] === "" || CurrentExit[0] === undefined ? (
                                            <>
                                                <td> - </td>
                                            </>
                                            ):(
                                                <td>{CurrentExit[0].citizenship}</td>
                                            )}
                                            </>
                                    )}                                                                                        
                                    {/* <th>Your Email</th> */}
                                </tr>
                            </thead>
                            <tbody className="text-start">
                                <tr>                                                                                                                                                                                   
                                </tr>
                            </tbody>
                        </Table>
                          )}                             
                                    </>
                                    )} 
                                    </>
                                    )} 
                                        
                                    </div>
                                </div>
                            </Col>
                        </Row>
        </Container>            
                {/* </section> */}
        </div>
        </Layout>
    );
}

export default View;