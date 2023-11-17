import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Button} from 'react-bootstrap';
import Logo from '../../assets/images/algorand-logo.png';
import configfile from '../../NFTFolder/config.json'
import firebase from '../../NFTFolder/firebase';
const GExploreTab = ({x})=>{
    const[getIProfile1,setgetIProfile1]=useState([""]);       
    // console.log("checkprofile1",getIProfile1)
    const[getIProfile2,setgetIProfile2]=useState([""]);       

    const dbcallProfile=async()=>{            
        let r=[];
        try {    
            if(x.ownerAddress === "" || x.ownerAddress === undefined || x.ownerAddress === null)        {
                setgetIProfile1([""]);  
            }
            else{
                firebase.auth().signInAnonymously().then((response)=>{           
                    firebase.database().ref("userprofile").child(x.ownerAddress).on("value", (data) => {          
                      if (data) {                      
                          r.push({
                            Bio:data.val().Bio,
                            Customurl: data.val().Customurl,
                            Email: data.val().Email,
                            Imageurl:data.val().Imageurl,
                            Personalsiteurl: data.val().Personalsiteurl,
                            TimeStamp: data.val().TimeStamp,
                            Twittername: data.val().Twittername,
                            UserName: data.val().UserName,
                            WalletAddress: data.val().walletAddress,
                            bgurl:data.val().bgurl,
                            valid:data.val().valid
                          })                
                      }
                      else{
                        setgetIProfile1([""]);  
                      }
                      setgetIProfile1(r);
                    });         
                    })         
            }
        
      } catch (error) {
        //console.log('error occured during search', error);    
      }                
    }    
    useEffect(()=>{dbcallProfile()},[])

    const dbcallProfile2=async()=>{            
        let r=[];
        try {    
            if(x.ownerAddress === "" || x.ownerAddress === undefined || x.ownerAddress === null)        {
                setgetIProfile2([""]);  
            }
            else{
                firebase.auth().signInAnonymously().then((response)=>{           
                    firebase.database().ref("userprofile").child(x.previousoaddress).on("value", (data) => {          
                      if (data) {                      
                          r.push({
                            Bio:data.val().Bio,
                            Customurl: data.val().Customurl,
                            Email: data.val().Email,
                            Imageurl:data.val().Imageurl,
                            Personalsiteurl: data.val().Personalsiteurl,
                            TimeStamp: data.val().TimeStamp,
                            Twittername: data.val().Twittername,
                            UserName: data.val().UserName,
                            WalletAddress: data.val().walletAddress,
                            bgurl:data.val().bgurl,
                            valid:data.val().valid
                          })                
                      }
                      else{
                        setgetIProfile2([""]);  
                      }
                      setgetIProfile2(r);
                    });         
                    })         
            }
        
      } catch (error) {
        //console.log('error occured during search', error);    
      }                
    }    
    useEffect(()=>{dbcallProfile2()},[])
                        return(
                                <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>
                                    <Card className='card-dash p-3 d-block border-0'>  
                                    <div>
                                    {getIProfile1 === null || getIProfile1 === undefined || getIProfile1 === ""  ? (
                                        <img src={Logo}  alt="logo" className='me-2 avatar-pic' />                                            
                                        ):(
                                            <>
                                            {getIProfile1[0].Imageurl === null || getIProfile1[0].Imageurl === undefined || getIProfile1[0].Imageurl === ""  ? (
                                                <img src={Logo}  alt="logo" className='me-2 avatar-pic' />                                                
                                            ):(
                                                
                                                <Link to={{
                                                    pathname: "/my-NFTcopy",            
                                                    state:{allData:x}                                                
                                                }}>
                                                <img src={getIProfile1[0].Imageurl}  alt="logo" className='me-2 avatar-pic' />                                                
                                                </Link>
                                            )}                                            
                                            </>
                                        )}
                                        {/* {getIProfile2 === null || getIProfile2 === undefined || getIProfile2 === "" ? (
                                            <img src={Logo}  alt="logo" className='me-2 avatar-pic' />
                                            
                                        ):(
                                            <>
                                            {getIProfile2[0].Imageurl === null || getIProfile2[0].Imageurl === undefined || getIProfile2[0].Imageurl === "" ? (
                                                <img src={Logo}  alt="logo" className='me-2 avatar-pic' />                                                
                                            ):(
                                                <>
                                                <img src={getIProfile2[0].Imageurl}  alt="logo" className='me-2 avatar-pic' />                                                
                                                </>
                                            )}                                    
                                            </>                                            
                                        )}                                     */}
                                        </div>
                                        <br/>                                                                    
                                        <div className='card-img text-center mb-2'>
                                            {/* <Link to="/NFT-details"> */}
                                                <img src={x.Imageurl} alt="image" className='img-fluid' />
                                            {/* </Link> */}
                                        </div>
                                        <div className='d-flex mb-2 justify-content-between flex-wrap align-items-center'>
                                            {/* <h6 className='subheading'>Images</h6> */}
                                            {/* <Badge bg="purple">Image</Badge> */}
                                        </div>
                                        {/* <h6 className='mb-2'>{x.NFTName} <br /><span className='text-success'><h6>{x.SocialLink.slice(0,18)}</h6></span></h6> */}
                                        <h6 className='mb-2'>{x.NFTName} <br /><span className='text-success'><h6>
                                            {x.SocialLink === null || x.SocialLink === undefined || x.SocialLink === "" ? ( 
                                                <>{configfile.nullvalue}</>
                                            ):( 
                                                <>
                                                {x.SocialLink.slice(0,18)}
                                                </>
                                            )}                                            
                                            </h6></span></h6>
                                        {/* <ButtonLoad loading={loader} variant='default' className='btn-count float-end' onClick={()=>{addLiked(x)}}>  
                                        <svg viewBox="0 0 17 16" fill="none" width="16" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye bZjZGw"><path d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z" stroke="currentColor" strokeWidth="2"></path></svg>                    
                                        </ButtonLoad>                     */}
                                        <h4 className='d-flex mb-3 align-items-center'><img src={Logo} alt="logo" className='me-2 avatar-pic' /> {x.NFTPrice/1000000}</h4> 
                                        {x.NFTPrice === "" || x.NFTPrice === null || x.NFTPrice === undefined ?(
                                            <>                                                                                        
                                            <Button variant="blue" className='w-100' s>Buy NFT</Button>                                        
                                            </>
                                        ):(
                                            <Link to={{
                                                pathname: "/NFT-details",            
                                                state:{allData:x}                                                
                                            }}><Button variant="blue" className='w-100'>Buy NFT</Button></Link>
                                        )} 
                                    </Card>
                                    </Col>
    );
}

export default GExploreTab;