import React,{useState,useEffect} from 'react';
import Layout from './LayoutT';
import { Link ,useHistory} from 'react-router-dom';
import { Card, Col, Container, Row, Button, Form,Modal} from 'react-bootstrap';
import ButtonLoad from 'react-bootstrap-button-loader';
import { ToastContainer, Zoom, toast} from 'react-toastify';
import logogif from '../../assets/images/gif4.gif';
import firebase from '../../NFTFolder/firebase';
import Compress from "react-image-file-resizer";


const CreateArtists = () => {
    useEffect(() => {
        document.title = "ELEMENT | Create Artists"
    }, [])
    let history=useHistory();
    const[loader, setLoader] = useState(false);
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);
    // const [showTest, setShowTest] = React.useState(false);
    // const [showTestLoading, setshowTestLoading] = React.useState(false);    
    // const [showTestAlert,setshowTestAlert] = React.useState(false);   
    // const [issuesdisplay,setissuesdisplay]=useState(null)         
    const [UserName,setUserName] = useState("");
    // console.log("checkUN",UserName)    
    const [SocialUrl,setSocialUrl] = useState("");
    const [Twitter,setTwitter] = useState("");
    const [Email,setEmail] = useState("");
    const [Bio,setBio] = useState("");    
    const[getIProfile,setgetIProfile]=useState([""]);  
    // console.log("checkprofile",getIProfile)    
    const [Img,setImg] = useState("")    
    const [Imgname,setImgname] = useState("") 
    
    const dbcallProfile=async()=>{            
        let r=[];
        try {         
        firebase.database().ref("userprofile").child(localStorage.getItem('walletAddress')).on("value", (data) => {          
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
            setgetIProfile([""]);  
          }
            setgetIProfile(r);
            setBio(r[0].Bio)
            setEmail(r[0].Email)              
            setUserName(r[0].UserName) 
            setSocialUrl(r[0].Personalsiteurl)   
            setTwitter(r[0].Twittername)       
        });                  
      } catch (error) {
        //console.log('error occured during search', error);    
      }                
    }    
    useEffect(()=>{dbcallProfile()},[])
    const captureFile =async(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        setImgname(file.name)
        let reader = new window.FileReader()
        try{
        Compress.imageFileResizer(file, 500, 500, 'JPEG', 200, 0,
        uri => {          
            setImg(uri)          
        },
        'base64'
        );
        reader.readAsArrayBuffer(file)        
        }catch (err) {      
        }
    };
  
    const CreateArtist = () =>{

        if(UserName === null || UserName === "" || UserName === undefined){
            //alert("please enter profile name")
            //setissuesdisplay("please enter profile name")
            //setissuesdisplay("please enter profile name")
            //setshowTestAlert(true)                                  
            toast.warning(`please enter profile name`,{autoClose:5000})
            handleHideLoad()
        }
        else if(SocialUrl === null || SocialUrl === "" || SocialUrl === undefined){
            // setissuesdisplay("please enter Social URL")
            // setshowTestAlert(true)                                  
            toast.warning(`please enter Social URL`,{autoClose:5000})
            handleHideLoad()
        }
        else if(Email === null || Email === "" || Email === undefined){
            // setissuesdisplay("please enter Social URL")
            // setshowTestAlert(true)                                  
            toast.warning(`please enter Email`,{autoClose:5000})
            handleHideLoad()
        }
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email))){
            toast.warning(`Please Enter Valid E-mail`,{autoClose:5000})            
            handleHideLoad()            
        }
        else if(Twitter === null || Twitter === "" || Twitter === undefined){
            // setissuesdisplay("please enter Social URL")
            // setshowTestAlert(true)                                  
            toast.warning(`please enter Twitter Username`,{autoClose:5000})
            handleHideLoad()
        }
        else if(Bio === "" || Bio === null || Bio === undefined){
            // setissuesdisplay("please enter Bio")
            // setshowTestAlert(true)                                  
            toast.warning(`please enter Bio`,{autoClose:5000})
            handleHideLoad()
        }
        else if(Img === "" || Img === null || Img === undefined){
            // setissuesdisplay("please Upload Image")
            // setshowTestAlert(true)                                  
            toast.warning(`please Upload Image`,{autoClose:5000})
            handleHideLoad()
        }
        else if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === "" || localStorage.getItem("walletAddress") === " " ){
            // setissuesdisplay("please connect your wallet")
            // setshowTestAlert(true)                                  
            toast.warning(`please connect your wallet`,{autoClose:5000})
            handleHideLoad()
        }else if(getIProfile === "" || getIProfile === null || getIProfile === undefined || getIProfile[0] === "" || getIProfile[0] === null || getIProfile[0] === undefined){
            //setshowTestLoading(true)
            toast.dismiss()
            toast.warning(`Artist InProgress`,{autoClose:3000})        
            handleShowLoad()     
            let ref2=firebase.database().ref(`userprofile/${localStorage.getItem('walletAddress')}`);                    
            let dateset=new Date().toDateString();
            ref2.set({
            Imageurl:Img,bgurl:"",
            UserName:UserName,Customurl:"",walletAddress:localStorage.getItem('walletAddress'),
            TimeStamp:dateset,Twittername:Twitter,Personalsiteurl:SocialUrl,Email:Email,Bio:Bio,valid:""})
            .then(async()=>{             
                handleHideLoad()
                //setshowTestLoading(false)  
                //setShowTest(true)
                toast.dismiss()
                toast.success(`Updated Details of The Artist`,{autoClose:5000})
                handleHideLoad()
                await sleep(2000)
                done()
            }).catch((err) => {                                    
                handleHideLoad()
                //setshowTestLoading(false)                     
                // setissuesdisplay("your browser appearing issue")
                // setshowTestAlert(true)                      
                //console.log(err);
                toast.error(`your browser appearing issue`,{autoClose:3000})
                handleHideLoad()
                done()
            });               
        }
        else{
            handleShowLoad()
            toast.dismiss()
            toast.warning(`Artist InProgress`,{autoClose:3000})        
            //setshowTestLoading(true)        
            if(getIProfile[0].bgurl === null || getIProfile[0].bgurl === undefined || getIProfile[0].bgurl === ""){
            let ref2=firebase.database().ref(`userprofile/${localStorage.getItem('walletAddress')}`);        
            let dateset=new Date().toDateString();
            ref2.set({
            Imageurl:Img,bgurl:"",
            UserName:UserName,Customurl:"",WalletAddress:localStorage.getItem("walletAddress"),
            TimeStamp:dateset,Twittername:Twitter,Personalsiteurl:SocialUrl,Email:Email,Bio:Bio,valid:""})
            .then(async()=>{             
                //handleHideLoad()
                //setshowTestLoading(false)  
                //setShowTest(true)
                toast.dismiss()
                toast.success(`Details are updated Successfully`,{autoClose:5000})
                handleHideLoad()
                await sleep(2000)
                done()
            }).catch((err) => {                                    
                handleHideLoad()
                //setshowTestLoading(false)                     
                // setissuesdisplay("your browser appearing issue")
                // setshowTestAlert(true)                      
                toast.error(`your browser appearing issue`,{autoClose:3000})
                handleHideLoad()
                done()
            });   
            }
            else{     
            handleShowLoad()           
            toast.dismiss()
            toast.warning(`Artist InProgress`,{autoClose:3000})        
            let ref2=firebase.database().ref(`userprofile/${localStorage.getItem("walletAddress")}`);  
            let dateset=new Date().toDateString();                        
            ref2.set({
                Imageurl:Img,bgurl:getIProfile[0].bgurl,
                UserName:UserName,Customurl:"",WalletAddress:localStorage.getItem("walletAddress"),
                TimeStamp:dateset,Twittername:Twitter,Personalsiteurl:SocialUrl,Email:Email,Bio:Bio,valid:getIProfile[0].valid})
                .then(async()=>{ 
                    //handleHideLoad()            
                    //setshowTestLoading(false)  
                    //setShowTest(true)
                    toast.dismiss()                    
                    toast.success(`Details are updated Successfully`,{autoClose:5000})
                    handleHideLoad()
                    await sleep(2000)
                    done()
                }).catch((err) => {                                    
                    //setshowTestLoading(false)                     
                    // handleHideLoad()
                    // setissuesdisplay("your browser appearing issue")
                    //setshowTestAlert(true)                      
                    toast.error(`your browser appearing issue`,{autoClose:3000})
                    handleHideLoad()
                    done()
                });                               
            }                                                       
            }    
    }
    // const refreshSale=()=>{
    //     //setshowTestAlert(false)
    //     //history.push('/')
    //     //window.location.reload(false)            
    //   }     
      const done=()=>{    
        history.push("/my-account")
        window.location.reload(false);    
      } 
      const clearImage = () =>{
        setImg("")
      }
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }
  
    return (
        <Layout>
            <Container>
            <ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/>
                <Row className='justify-content-center'>
                    <Col md={10} lg={7}>
                        <Card className='card-dash border-0 d-block'>
                            <div>
                                <h3 className='mb-1'>CBDC Account</h3>
                                <p>Create Profile</p>
                            </div>
                            <hr className='my-4' />

                            <Form>
                                <div className='mb-3'>
                                    <label>Username</label>
                                    {getIProfile === "" || getIProfile === undefined || getIProfile === null || getIProfile[0] === "" || getIProfile[0] === undefined || getIProfile[0] === null ? (
                                        <input type="text" id="inputID" placeholder='Enter the username'  className="form-control form-control-field border-0" onChange={event => setUserName( event.target.value)}/>
                                    ):(
                                        <input type="text" id="inputID" value={UserName}  placeholder='Enter the username' className="form-control form-control-field border-0" onChange={event => setUserName( event.target.value)}/>
                                    )}
                                    
                                </div>
                                <div className='mb-3'>
                                    <label>Social Media link</label>
                                    {getIProfile === "" || getIProfile === undefined || getIProfile === null || getIProfile[0] === "" || getIProfile[0] === undefined || getIProfile[0] === null ? (
                                        <input type="url" id="inputID" placeholder='Enter the Social Media Link' className="form-control form-control-field border-0" onChange={event => setSocialUrl( event.target.value)}/>
                                    ):(
                                        <input type="url" id="inputID" value={SocialUrl} placeholder='Enter the Social Media Link' className="form-control form-control-field border-0" onChange={event => setSocialUrl( event.target.value)}/>
                                    )}                                    
                                </div>
                                <div className='mb-3'>
                                    <label>Twitter UserName</label>
                                    {getIProfile === "" || getIProfile === undefined || getIProfile === null || getIProfile[0] === "" || getIProfile[0] === undefined || getIProfile[0] === null ? (
                                        <input type="url" id="inputID" placeholder='Enter the Twitter Username' className="form-control form-control-field border-0" onChange={event => setTwitter( event.target.value)}/>
                                    ):(
                                        <input type="url" id="inputID" value={Twitter} placeholder='Enter the Twitter Username' className="form-control form-control-field border-0" onChange={event => setTwitter( event.target.value)}/>
                                    )}                                                                        
                                </div>
                                <div className='mb-3'>
                                    <label>Email </label>
                                    {getIProfile === "" || getIProfile === undefined || getIProfile === null || getIProfile[0] === "" || getIProfile[0] === undefined || getIProfile[0] === null ? (
                                        <input type="url" id="inputID" placeholder='Enter the Email' className="form-control form-control-field border-0" onChange={event => setEmail( event.target.value)}/>
                                    ):(
                                        <input type="url" id="inputID" value={Email} placeholder='Enter the Email' className="form-control form-control-field border-0" onChange={event => setEmail( event.target.value)}/>
                                    )}                                                                        
                                    
                                </div>
                                <div className='mb-3'>
                                    <label>Bio</label>
                                    {getIProfile === "" || getIProfile === undefined || getIProfile === null || getIProfile[0] === "" || getIProfile[0] === undefined || getIProfile[0] === null ? (
                                        <textarea rows="2" id="inputID" placeholder='Please write something about yourself' className="form-control form-control-field border-0"  onChange={event => setBio( event.target.value)}/>
                                    ):(
                                        <textarea rows="2" id="inputID" value={Bio} placeholder='Please write something about yourself' className="form-control form-control-field border-0"  onChange={event => setBio( event.target.value)}/>
                                    )}                                                                                                            
                                </div>
                                <div className='mb-3'>
                                    <label>Your avatar</label>
                                    <div className='upload-box text-center'>

                                      {Img === null || Img === "" || Img === undefined ?(
                                        <>
                                        <input id="upload" type="file" hidden onChange = {captureFile}/>
                                        <label htmlFor='upload'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi mb-3 bi-upload" viewBox="0 0 16 16">
                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                                            </svg>
                                            <p id="inputID">Support file : png/img</p>
                                        </label>
                                        </>
                                      ):(
                                        <>
                                        <input id="upload" type="file" hidden onChange = {captureFile}/>
                                        <label htmlFor='Image Uploaded' className='p-2' >                                                                        
                                        <Button variant='link' className='p-0 text-white btn-closeimg' onClick={()=>{clearImage()}}>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi m-0 bi-x-circle-fill" viewBox="0 0 16 16">
                                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                                            </svg>
                                        </Button> 
                                        <img src={Img} alt="Img" className='img-fluid w-100 rounded-16' />            
                                        </label>
                                        </>
                                      )}
                                        
                                    </div>

                                {/* <div className='upload-box text-center'>

                                      {Img === null || Img === "" || Img === undefined ?(
                                        <>
                                        <input id="upload" type="file" hidden onChange = {captureFile}/>
                                        <label htmlFor='upload'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi mb-3 bi-upload" viewBox="0 0 16 16">
                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                                            </svg>
                                            <p>Support file : png/img</p>
                                        </label>
                                        </>
                                      ):(
                                        <>
                                        <input id="upload" type="file" hidden onChange = {captureFile}/>
                                        <label htmlFor='Image Uploaded' className='p-2' >                                
                                        <img src={Img} alt="Img" className='img-fluid w-100 rounded-16' />            
                                        </label>
                                        </>
                                      )}
                                        

                                    </div> */}
                                   
                                    {/* <div className='upload-box text-center'>
                                        <input id="upload" type="file" hidden  onChange = {captureFile}/>
                                        <label htmlFor='upload'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi mb-3 bi-upload" viewBox="0 0 16 16">
                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                                            </svg>
                                            <p>Support file : png/img</p>
                                        </label>
                                    </div> */}
                                </div>
                                
                                <ButtonLoad loading={loader} className='w-100' onClick={()=>{CreateArtist()}}>Create Profile</ButtonLoad>
                            </Form>
                        </Card>
                    </Col>
                </Row>              
            </Container>
        </Layout>
    )
}

export default CreateArtists;