const dataelem = `#pragma version 5

txn TypeEnum
int axfer
==
bnz success
global GroupSize
int 7
==
assert
gtxn 1 ApplicationID
int AppID
==
assert
gtxn 2 Sender
gtxn 6 AssetReceiver
==
assert
int 0
gtxn 5 Amount
gtxn 6 AssetAmount
==
assert
gtxn 3 AssetReceiver
gtxn 6 AssetReceiver
==
assert
gtxn 6 XferAsset
int elemId //elem
==
bnz success
bz failed

failed:
int 0
return

success:
int 1
return`;
export default dataelem;


//sample.teal