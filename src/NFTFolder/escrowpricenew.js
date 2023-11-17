const datanewprice=`#pragma version 5
    txn OnCompletion
    int OptIn
    ==
    bnz finished
    gtxn 1 TypeEnum
    int NoOp
    ==
    gtxna 1 ApplicationArgs 0
    byte "createlisting"
    ==
    bnz createlisting
    gtxn 1 ApplicationArgs 0
    byte "Buynow"
    ==
    bnz buynow




    buynow:
    global GroupSize
    int 7
    ==
    assert
    gtxn 1 OnCompletion
    int NoOp
    ==
    assert
    gtxn 1 ApplicationID
    int AppID  //appid
    ==
    assert
    gtxn 3 XferAsset
    int AssId //assertid
    ==
    assert
    gtxn 1 RekeyTo
    global ZeroAddress
    ==
    gtxn 0 RekeyTo
    global ZeroAddress
    ==
    &&
    bnz finished



    createlisting:
    global GroupSize
    int 4
    ==
    assert
    gtxn 1 TypeEnum
    int appl
    ==
    assert
    //gtxn 4 TypeEnum
    //int AssetConfig
    //==
    //assert
    gtxn 1 ApplicationID
    int AppID  //appid
    ==
    assert
    gtxn 3 XferAsset
    int AssId //assertid
    ==
    assert
    b finished

    finished:
    int 1
    return

    fail:
    int 0
    return`;
export default datanewprice;


//escrow.teal