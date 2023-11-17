let escrow = `#pragma version 6
gtxn 0 Sender
addr Address
==
assert
gtxn 1 XferAsset
int AssetID
==
assert
int 1
return`

export default escrow