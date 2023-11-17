// import firebase from "firebase";
import object from 'ipfs-api/src/object';
import fireDb from './firebase';

export const postdata =async(asid1,asid2,asid3,name1,name2,escaddress,tvl,vl,fee,addr)=>{
    // let ref2=fireDb.database().ref(`createLiquidity/${localStorage.getItem('walletAddress')}`);                    
    fireDb.auth().signInAnonymously().then((response)=>{
    let ref2=fireDb.database().ref(`createLpPair/${addr}`);                    
    let dateset=new Date().toDateString();
    const db = ref2.push().key;
    
    ref2.child(db).set({
        id:db,
    AssetId1:asid1,AssetId2:asid2,AssetId3:asid3,AssetName1:name1,AssetName2:name2,escrow:escaddress,tvl:tvl,
volume:vl,fees:fee,address:addr,multipleusers:[""]})
    .then(()=>{             
       console.log("created")
    }).catch((err) => {                                                        
        console.log(err);
    });
})
}

export const deletedata =async(id,add)=>{

    fireDb.auth().signInAnonymously().then((response)=>{
        fireDb.database().ref(`createLpPair/${add}`).child(id).remove().then(()=>{
            console.log("Removed")
        })                   
    })
}

export const getpostdata = async(addr)=>{
    fireDb.auth().signInAnonymously().then((response)=>{
        let r=[];
        console.log("data")  
        try {         
        fireDb.database().ref("createLpPair").child(addr).on("value", (data) => {          
          if (data) { 
            data.forEach((d) => {                
                let value=d.val();   
                        
              r.push({
                id:value.id,
    AssetId1:value.AssetId1,AssetId2:value.AssetId2,AssetId3:value.AssetId3,
    AssetName1:value.AssetName1,AssetName2:value.AssetName2,escrow:value.escrow,tvl:value.tvl,
volume:value.volume,fees:value.fees,address:value.address,multipleusers:value.multipleusers
              })   
            })             
          }
          else{
              
          }
          console.log("getpostdata",r)  
        });                  
      } catch (error) {
        //console.log('error occured during search', error);    
      }    
    })            
   
}
export const getpostdatafilter = async(id1,id2,tvl,vl,fees)=>{
    let r=[];
    fireDb.auth().signInAnonymously().then((response)=>{
       
        console.log("data")  
        try {         
        fireDb.database().ref("createLpPair").on("value", (data) => {          
          if (data) { 
            data.forEach((d) => { 
                console.log("value",d.val())                
                let value=d.val();  
                 Object.keys(value).map(async(k)=>{                    
                    if(value[k].AssetId1 === id1 && value[k].AssetId2 === id2){
                        console.log("value",value[k].AssetId1) 
                        r.push({
                            id:value[k].id,
                AssetId1:value[k].AssetId1,AssetId2:value[k].AssetId2,AssetId3:value[k].AssetId3,
                AssetName1:value[k].AssetName1,AssetName2:value[k].AssetName2,escrow:value[k].escrow,tvl:tvl,
            volume:vl,fees:fees,address:value[k].address,multipleusers:value[k].multipleusers
                          })
                          console.log("FilterPost3",r) 
                          //getpostdatafilterwithupdate(r[0],value[k].id)
                    }
                 })    
                })
                            
          }
          else{
              
          }
         
           
        });                  
      } catch (error) {
        //console.log('error occured during search', error);    
      } 
      console.log("data",r[0],r) 
     
    })            
       
}
export const getpostdatafilterwithupdate = async(dval)=>{
    fireDb.auth().signInAnonymously().then((response)=>{
        let r=[];
        console.log("data") 
        let ref2=fireDb.database().ref(`createLpPair/${dval.address}`);   
        ref2.child(dval.id).update(dval)
        .then(()=>{             
           console.log("updated")
        }).catch((err) => {                                                        
            console.log(err);
        });    
    })            
   
}
export const getmultiplefilter = async(id1,id2,tvl,vl,fees,multiple)=>{
    let r=[];
    fireDb.auth().signInAnonymously().then(async(response)=>{       
        console.log("data")  
        try {         
        fireDb.database().ref("createLpPair").on("value", (data) => {          
          if (data) { 
            data.forEach((d) => { 
                console.log("value",d.val())                
                let value=d.val();  
                 Object.keys(value).map(async(k)=>{
                    // console.log("value",value[k].AssetId1) 
                    if(value[k].AssetId1 === id1 && value[k].AssetId2 === id2){
                        console.log("values1",value[k].AssetId1)
                        console.log("values2",value[k].AssetId2)
                        // let multi = [];
                        // multi.push(value[k].multipleusers)
                        // multi.push(multiple)
                        // let setname = new Set()
                        // if(value[k].multipleusers){
                        //     setname.add(value[k].multipleusers)
                        // }
                        
                        // setname.add(multiple)
                        let uniqueChars1;
                        if(value[k].multipleusers === 0 || value[k].multipleusers=== "" || value[k].multipleusers === undefined || value[k].multipleusers === null || value[k].multipleusers === 'undefined'){
                            uniqueChars1 = multiple;
                        }
                        else{
                            //slet allarr22=value[k].multipleusers.concat(multiple)
                            let a= [];
                            a.push(value[k].multipleusers)
                            a.push(multiple)
                            uniqueChars1 = a
                            console.log("Arraya",a)
                        }
                        console.log("uni1",uniqueChars1);
                        //console.log("multi",multiple)                                                                       
                        r.push({
                            id:value[k].id,
                            AssetId1:value[k].AssetId1,AssetId2:value[k].AssetId2,AssetId3:value[k].AssetId3,
                            AssetName1:value[k].AssetName1,AssetName2:value[k].AssetName2,escrow:value[k].escrow,tvl:tvl,
                            volume:vl,fees:fees,address:value[k].address,multipleusers:uniqueChars1
                          }) 
                          console.log("rdatafinal",r)
                          
                          
                    }
                 })    
                })
                            
          }
          else{
              
          }
         
           
        });  
        await getpostdatafilterwithupdate(r[0])                
      } catch (error) {
        //console.log('error occured during search', error);    
      } 
    //   console.log("data",r[0],r) 
     
    })            
       
}

export const getAllData = async()=>{
  let r=[];
  fireDb.auth().signInAnonymously().then(async(response)=>{       
      console.log("data")  
      try {         
      fireDb.database().ref("createdLpPairs").on("value", (data) => {          
        if (data) { 
          data.forEach((d) => { 
              console.log("value",d.val())                
              let value=d.val();  
               Object.keys(value).map(async(k)=>{
                  console.log("value",value)                                                       
                      r.push({
                          id:value[k].id,
                          AssetId1:value[k].AssetId1,AssetId2:value[k].AssetId2,AssetId3:value[k].AssetId3,
                          AssetName1:value[k].AssetName1,AssetName2:value[k].AssetName2,escrow:value[k].escrow,tvl:value[k].escrow,
                          volume:value[k].volume,fees:value[k].fees,address:value[k].address,multipleusers:value[k].multipleusers
                        }) 
              console.log("rdatafinal",r.reverse()) 
              })                          
        })        
      }         
      });        
    } catch (error) {      
    }      
  })            
     
}


