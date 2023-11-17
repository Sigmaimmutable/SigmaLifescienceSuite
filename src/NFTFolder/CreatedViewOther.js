import React, { useState} from "react";
//,useEffect
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import AllIcon from '../assets/images/cate-all-icon.svg';
import {Dropdown, Row, Col} from 'react-bootstrap';
//, Button,Modal,Form, InputGroup
//import Card from '../../Snippets/Card';
//import MyAlgoConnect from '@randlabs/myalgo-connect';

import {
    Link
  } from "react-router-dom";
//import CardCreate from "../../Snippets/Card";
import CardCreateOtherView from "./CardCreateOtherView";
import AlgoIcon from '../assets/images/Algo.png';
const animatedComponents = makeAnimated();


const CreatedViewOther = (data) => {        
    //console.log("getdata",data.data)
    const[getcategory,setcategory]=useState("All");
    const[getsaletype,setsaletype]=useState("Fixed price");
    const[getprice1,setprice1]=useState(0);
    const[getprice2,setprice2]=useState(0);
    const[getrecent,setrecent]=useState("Recently added");            
    const colourStyles = {
        option: (styles, { isFocused }) => {
          // const color = chroma(data.color);
        //   console.log({ data, isDisabled, isFocused, isSelected });
          return {
            ...styles,
            backgroundColor: isFocused ? "rgba(4, 4, 5, 0.05)" : null,
          };
        }
    };

    const CategoryOptions = [
        { value: 'all', label: 'All', icon: AllIcon },
        // { value: 'art', label: '🌈  Art' },
        { value: 'photography', label: '📸  Photography' },
        // { value: 'games', label: '🕹  Games' },
        // { value: 'metaverses', label: '👾  Metaverses' },
        // { value: 'music', label: '🎵  Music' },
        // { value: 'domains', label: '🏷  Domains' },
        // { value: 'deFi', label: '💰  DeFi' },
        // { value: 'memes', label: '🤡  Memes' },
        // { value: 'punks', label: '🤘  Punks' },
        // { value: 'NSFW', label: '🔞  NSFW' }
    ]

    // const CategoryCollections = [
    //     { value: 'CloneX', label: 'CloneX', icon: 'https://img.rarible.com/prod/image/upload/t_avatar_preview/prod-collections/0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b/avatar/QmTNRdwYvd5nsMVoUGX4Gu2ZWwgbKbu9NNdxDLtcwEE8Kr' },
    //     { value: 'BoredApeYachtClub', label: 'BoredApeYachtClub', icon: 'https://img.rarible.com/prod/image/upload/t_avatar_preview/prod-collections/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/avatar/QmfNrXe67J4t1EvXLxPhxTavQCLryurWFj1DDRKkjNQqit' },
    //     { value: 'Sandbox', label: "Sandbox's LANDs", icon: 'https://img.rarible.com/prod/image/upload/t_avatar_preview/prod-collections/0x50f5474724e0ee42d9a4e711ccfb275809fd6d4a/avatar/QmWSu76RE2jsun8Ch8f3Kzz3MuXr7ZhcbbVL1EKxDKsQ8V' },
    //     { value: 'RTFKT', label: "RTFKT - CloneX Mintvial", icon: 'https://img.rarible.com/prod/image/upload/t_avatar_preview/prod-collections/0x348fc118bcc65a92dc033a951af153d14d945312/avatar/QmeafNY1zRxZFTthLNybGqJ1VjJSK8j9dsWtH4n5zAxRUC' },
    //     { value: 'Town', label: "Town Star", icon: 'https://img.rarible.com/prod/image/upload/t_avatar_preview/prod-collections/0xc36cf0cfcb5d905b8b513860db0cfe63f6cf9f5c/avatar/QmS9ef63XhCJtuzoieomgRpPj6TyHWesgWe22RVeFnxhyg' },
    //     { value: 'MutantApeYachtClub', label: "MutantApeYachtClub", icon: 'https://img.rarible.com/prod/image/upload/t_avatar_preview/prod-collections/0x60e4d786628fea6478f785a6d7e704777c86a7c6/avatar/QmaoafyjBy97NKEPZzAD3FK8RcwCJHb263dDJbhCaXPWpo' },
    //     { value: 'Wizards', label: "Wizards & Dragons Game", icon: 'https://img.rarible.com/prod/image/upload/t_avatar_preview/prod-collections/0x999e88075692bcee3dbc07e7e64cd32f39a1d3ab/avatar/QmWKGKEsP2ZfE8VSXXz5t8Vr2jjrPUnKzfiBmNUEvPsrbL' },
    //     { value: 'adidas', label: "adidas Originals: Into the Metaverse", icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScyNCcgaGVpZ2h0PScyNCcgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6cmdiYSgyNDYsMjQ2LDI0NiwxKTsnPjxnIHN0eWxlPSdmaWxsOnJnYmEoMTgwLDM4LDIxNywxKTsgc3Ryb2tlOnJnYmEoMTgwLDM4LDIxNywxKTsgc3Ryb2tlLXdpZHRoOjAuMTI7Jz48cmVjdCAgeD0nMTEnIHk9JzcnIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nMTEnIHk9JzknIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nMTEnIHk9JzExJyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzExJyB5PScxMycgd2lkdGg9JzInIGhlaWdodD0nMicvPjxyZWN0ICB4PScxMScgeT0nMTUnIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nOScgeT0nOScgd2lkdGg9JzInIGhlaWdodD0nMicvPjxyZWN0ICB4PScxMycgeT0nOScgd2lkdGg9JzInIGhlaWdodD0nMicvPjxyZWN0ICB4PSc5JyB5PScxMScgd2lkdGg9JzInIGhlaWdodD0nMicvPjxyZWN0ICB4PScxMycgeT0nMTEnIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nOScgeT0nMTUnIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nMTMnIHk9JzE1JyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzcnIHk9JzcnIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nMTUnIHk9JzcnIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nNycgeT0nOScgd2lkdGg9JzInIGhlaWdodD0nMicvPjxyZWN0ICB4PScxNScgeT0nOScgd2lkdGg9JzInIGhlaWdodD0nMicvPjxyZWN0ICB4PSc3JyB5PScxMycgd2lkdGg9JzInIGhlaWdodD0nMicvPjxyZWN0ICB4PScxNScgeT0nMTMnIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nNycgeT0nMTUnIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nMTUnIHk9JzE1JyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PC9nPjwvc3ZnPg==' },
    //     { value: 'Wolf', label: "Wolf Game", icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScyNCcgaGVpZ2h0PScyNCcgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6cmdiYSgyNDYsMjQ2LDI0NiwxKTsnPjxnIHN0eWxlPSdmaWxsOnJnYmEoMjE3LDM4LDYwLDEpOyBzdHJva2U6cmdiYSgyMTcsMzgsNjAsMSk7IHN0cm9rZS13aWR0aDowLjEyOyc+PHJlY3QgIHg9JzExJyB5PSc3JyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzExJyB5PSc5JyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzExJyB5PScxMScgd2lkdGg9JzInIGhlaWdodD0nMicvPjxyZWN0ICB4PScxMScgeT0nMTUnIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nOScgeT0nOScgd2lkdGg9JzInIGhlaWdodD0nMicvPjxyZWN0ICB4PScxMycgeT0nOScgd2lkdGg9JzInIGhlaWdodD0nMicvPjxyZWN0ICB4PSc5JyB5PScxMScgd2lkdGg9JzInIGhlaWdodD0nMicvPjxyZWN0ICB4PScxMycgeT0nMTEnIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nOScgeT0nMTMnIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nMTMnIHk9JzEzJyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzcnIHk9JzcnIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nMTUnIHk9JzcnIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nNycgeT0nMTMnIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nMTUnIHk9JzEzJyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzcnIHk9JzE1JyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzE1JyB5PScxNScgd2lkdGg9JzInIGhlaWdodD0nMicvPjwvZz48L3N2Zz4=' },
    //     { value: 'Ape', label: "Ape Kids Club (AKC)", icon: 'https://img.rarible.com/prod/image/upload/t_avatar_preview/prod-collections/0x9bf252f97891b907f002f2887eff9246e3054080/avatar/QmZSMxe1Qhvv1modvYWgBVieAgETnmzSAkTQFNPHsCakJ1' },
    //     { value: 'Art', label: "Art Blocks Factory", icon: 'https://img.rarible.com/prod/image/upload/t_avatar_preview/prod-collections/0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270/avatar/QmcJMTboitFVH7TxZAxpNjhnBfREHLtw2ow8cuAoeV7yxr' },
    //     { value: 'Crypto', label: "Crypto Bull Society", icon: 'https://img.rarible.com/prod/image/upload/t_avatar_preview/prod-collections/0x469823c7b84264d1bafbcd6010e9cdf1cac305a3/avatar/QmYwz4J2hVwQEv1B1nZiWsGFKUw8m2Y439Zv78itjVAZxK' },
    //     { value: 'Chain', label: "Chain Runners", icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScyNCcgaGVpZ2h0PScyNCcgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6cmdiYSgyNDYsMjQ2LDI0NiwxKTsnPjxnIHN0eWxlPSdmaWxsOnJnYmEoMjE3LDM4LDIwNCwxKTsgc3Ryb2tlOnJnYmEoMjE3LDM4LDIwNCwxKTsgc3Ryb2tlLXdpZHRoOjAuMTI7Jz48cmVjdCAgeD0nMTEnIHk9JzcnIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nMTEnIHk9JzknIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nOScgeT0nMTEnIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nMTMnIHk9JzExJyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzknIHk9JzEzJyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzEzJyB5PScxMycgd2lkdGg9JzInIGhlaWdodD0nMicvPjxyZWN0ICB4PSc5JyB5PScxNScgd2lkdGg9JzInIGhlaWdodD0nMicvPjxyZWN0ICB4PScxMycgeT0nMTUnIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nNycgeT0nOScgd2lkdGg9JzInIGhlaWdodD0nMicvPjxyZWN0ICB4PScxNScgeT0nOScgd2lkdGg9JzInIGhlaWdodD0nMicvPjxyZWN0ICB4PSc3JyB5PScxMScgd2lkdGg9JzInIGhlaWdodD0nMicvPjxyZWN0ICB4PScxNScgeT0nMTEnIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48L2c+PC9zdmc+' },
    //     { value: 'Neo', label: "Neo Tokyo: Outer Identities", icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScyNCcgaGVpZ2h0PScyNCcgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6cmdiYSgyNDYsMjQ2LDI0NiwxKTsnPjxnIHN0eWxlPSdmaWxsOnJnYmEoMTY5LDIxNywzOCwxKTsgc3Ryb2tlOnJnYmEoMTY5LDIxNywzOCwxKTsgc3Ryb2tlLXdpZHRoOjAuMTI7Jz48cmVjdCAgeD0nMTEnIHk9JzcnIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nMTEnIHk9JzknIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nMTEnIHk9JzExJyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzExJyB5PScxNScgd2lkdGg9JzInIGhlaWdodD0nMicvPjxyZWN0ICB4PSc5JyB5PScxMScgd2lkdGg9JzInIGhlaWdodD0nMicvPjxyZWN0ICB4PScxMycgeT0nMTEnIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nOScgeT0nMTMnIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nMTMnIHk9JzEzJyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzknIHk9JzE1JyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzEzJyB5PScxNScgd2lkdGg9JzInIGhlaWdodD0nMicvPjxyZWN0ICB4PSc3JyB5PSc3JyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzE1JyB5PSc3JyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzcnIHk9JzknIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nMTUnIHk9JzknIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nNycgeT0nMTEnIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nMTUnIHk9JzExJyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzcnIHk9JzE1JyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzE1JyB5PScxNScgd2lkdGg9JzInIGhlaWdodD0nMicvPjwvZz48L3N2Zz4=' },
    //     { value: 'Doodles', label: "Doodles", icon: 'https://img.rarible.com/prod/image/upload/t_avatar_preview/prod-collections/0x8a90cab2b38dba80c64b7734e58ee1db38b8992e/avatar/QmVqUTEU7NCjGBYzswoeb5vK6HoQ12YJhM1k3QNYDzmGty' },
    //     { value: 'VOX', label: "VOX Series 1", icon: 'https://img.rarible.com/prod/image/upload/t_avatar_preview/prod-collections/0xad9fd7cb4fc7a0fbce08d64068f60cbde22ed34c/avatar/QmRzEASVDqSuLeZGvVJeSnvzs8eBexYiSDXd9nuFhVYh7L' },
    //     { value: 'JRNY', label: "JRNY NFT Club", icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScyNCcgaGVpZ2h0PScyNCcgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6cmdiYSgyNDYsMjQ2LDI0NiwxKTsnPjxnIHN0eWxlPSdmaWxsOnJnYmEoMzgsMjE3LDE3MiwxKTsgc3Ryb2tlOnJnYmEoMzgsMjE3LDE3MiwxKTsgc3Ryb2tlLXdpZHRoOjAuMTI7Jz48cmVjdCAgeD0nMTEnIHk9JzcnIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nMTEnIHk9JzknIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nMTEnIHk9JzExJyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzExJyB5PScxNScgd2lkdGg9JzInIGhlaWdodD0nMicvPjxyZWN0ICB4PSc5JyB5PSc5JyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzEzJyB5PSc5JyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzknIHk9JzEzJyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzEzJyB5PScxMycgd2lkdGg9JzInIGhlaWdodD0nMicvPjxyZWN0ICB4PSc3JyB5PSc5JyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzE1JyB5PSc5JyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzcnIHk9JzEzJyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzE1JyB5PScxMycgd2lkdGg9JzInIGhlaWdodD0nMicvPjwvZz48L3N2Zz4=' },
    //     { value: 'Wolf', label: "Wolf Game", icon: 'https://img.rarible.com/prod/image/upload/t_avatar_preview/prod-collections/0x7f36182dee28c45de6072a34d29855bae76dbe2f/avatar/Qmc8Ucb4dYeidyfGfsRNtE3EyLo7DFyDx2UvpiZPsMfQnn' },
    // ]

    const saleTypeOptions = [
        // { value: 'auction', label: 'Timed auction' },
        { value: 'price', label: 'Fixed price' },
        // { value: 'sale', label: 'Not for sale' },
        // { value: 'offers', label: 'Open for offers' }
    ]

    const PriceList = [
        { value: 'algo', label: 'ALGO', icon:AlgoIcon },
        // { value: 'WETH', label: 'WETH', icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScyNCcgaGVpZ2h0PScyNCcgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6cmdiYSgyNDYsMjQ2LDI0NiwxKTsnPjxnIHN0eWxlPSdmaWxsOnJnYmEoMTU4LDM4LDIxNywxKTsgc3Ryb2tlOnJnYmEoMTU4LDM4LDIxNywxKTsgc3Ryb2tlLXdpZHRoOjAuMTI7Jz48cmVjdCAgeD0nMTEnIHk9JzcnIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nMTEnIHk9JzknIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nMTEnIHk9JzExJyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzExJyB5PScxMycgd2lkdGg9JzInIGhlaWdodD0nMicvPjxyZWN0ICB4PScxMScgeT0nMTUnIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nOScgeT0nNycgd2lkdGg9JzInIGhlaWdodD0nMicvPjxyZWN0ICB4PScxMycgeT0nNycgd2lkdGg9JzInIGhlaWdodD0nMicvPjxyZWN0ICB4PSc5JyB5PSc5JyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzEzJyB5PSc5JyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzknIHk9JzExJyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzEzJyB5PScxMScgd2lkdGg9JzInIGhlaWdodD0nMicvPjxyZWN0ICB4PSc3JyB5PSc5JyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzE1JyB5PSc5JyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzcnIHk9JzExJyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzE1JyB5PScxMScgd2lkdGg9JzInIGhlaWdodD0nMicvPjwvZz48L3N2Zz4=' },
        // { value: 'FLOW', label: 'FLOW', icon: 'https://raw.githubusercontent.com/rarible/public-assets/main/tokens/FLOW.png' },
        // { value: 'FUSD', label: 'FUSD', icon: 'https://raw.githubusercontent.com/rarible/public-assets/main/tokens/FUSD.png' },
        // { value: 'XTZ', label: 'XTZ', icon: 'https://raw.githubusercontent.com/rarible/public-assets/main/tokens/XTZ.png' },
        // { value: 'DAI', label: 'DAI', icon: 'https://raw.githubusercontent.com/rarible/public-assets/main/tokens/DAI.png' },
        // { value: 'USDC', label: 'USDC', icon: 'https://raw.githubusercontent.com/rarible/public-assets/main/tokens/USDC.png' },
        // { value: 'RARI', label: 'RARI', icon: 'https://raw.githubusercontent.com/rarible/public-assets/main/tokens/RARI.png' },
        // { value: 'ASH', label: 'ASH', icon: 'https://raw.githubusercontent.com/rarible/public-assets/main/tokens/ASH.png' },
        // { value: 'ATRI', label: 'ATRI', icon: 'https://raw.githubusercontent.com/rarible/public-assets/main/tokens/ASH.png' },
        // { value: 'FIRST', label: 'FIRST', icon: 'https://raw.githubusercontent.com/rarible/public-assets/main/tokens/ATRI.png' },
        // { value: 'ABST', label: 'ABST', icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScyNCcgaGVpZ2h0PScyNCcgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6cmdiYSgyNDYsMjQ2LDI0NiwxKTsnPjxnIHN0eWxlPSdmaWxsOnJnYmEoMTIxLDIxNywzOCwxKTsgc3Ryb2tlOnJnYmEoMTIxLDIxNywzOCwxKTsgc3Ryb2tlLXdpZHRoOjAuMTI7Jz48cmVjdCAgeD0nMTEnIHk9JzcnIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nMTEnIHk9JzknIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nMTEnIHk9JzE1JyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzknIHk9JzknIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nMTMnIHk9JzknIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nOScgeT0nMTEnIHdpZHRoPScyJyBoZWlnaHQ9JzInLz48cmVjdCAgeD0nMTMnIHk9JzExJyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzknIHk9JzEzJyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzEzJyB5PScxMycgd2lkdGg9JzInIGhlaWdodD0nMicvPjxyZWN0ICB4PSc3JyB5PSc5JyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzE1JyB5PSc5JyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzcnIHk9JzE1JyB3aWR0aD0nMicgaGVpZ2h0PScyJy8+PHJlY3QgIHg9JzE1JyB5PScxNScgd2lkdGg9JzInIGhlaWdodD0nMicvPjwvZz48L3N2Zz4=' },
        // { value: 'ADORs', label: 'ADORs', icon: 'https://raw.githubusercontent.com/rarible/public-assets/main/tokens/ADORs.png' },
        // { value: 'elem', label: 'ELEM', icon: 'https://raw.githubusercontent.com/rarible/public-assets/main/tokens/ARKE.png' },
    ]

    const filterdata=()=>{
        let dateset=new Date().toDateString();
        let today= new Date();
        let weekdate=new Date(today.getFullYear(), today.getMonth(), today.getDate()-3).toDateString();
        //console.log("DateExplore",weekdate)
        //console.log("DateExplore2",dateset)
        if(getprice1 > 0  && getprice2 > 0){          
          let datas=data.data.filter((val)=> (val.NFTPrice)/1000000 >= getprice1 && (val.NFTPrice)/1000000 <= getprice2)
          //console.log("filtercall1",datas)
          return datas;
        }
        if(getrecent === "Recently added"){
            let datas=data.data.filter((val)=> (val.TimeStamp) >= weekdate || (val.TimeStamp) <= dateset)
            //console.log("filtercall12",datas)
            return datas;        
        }
        if(getrecent === "Low to High"){
          let datas=data.data.sort((a,b)=>{ return parseInt((a.NFTPrice)/1000000) - parseInt((b.NFTPrice)/1000000)})
          //console.log("filtercall1",datas)
          return datas;
        }
        if(getrecent ===  "High to Low"){
          let datas=data.data.sort((a,b)=>{ return parseInt((b.NFTPrice)/1000000) - parseInt((a.NFTPrice)/1000000)})
          //console.log("filtercall1",datas)
          return datas;
        }
        return data.data
    }

    return (
        <div className='mb-4'>            
            <div className='d-flex mb-4 filter-list flex-wrap align-items-center'>
                {/* <div className="filter-item filter-category">
                    <Select
                        styles={colourStyles}
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        defaultValue={[colourOptions[4], colourOptions[5]]}
                        placeholder="Category"
                        options={CategoryOptions}
                        onChange={setcategory}
                        formatOptionLabel={option => (
                            <div className="custom-select-option d-flex align-items-center">
                                {option.icon && <img src={option.icon} alt="icon" />}
                                {option.label}
                            </div>
                        )}
                    />
                </div> */}
                {/* <div className="filter-item filter-sale-type">
                    <Select
                        styles={colourStyles}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        defaultValue={[colourOptions[4], colourOptions[5]]}
                        placeholder="Sale Type"
                        isMulti
                        options={saleTypeOptions}
                        onChange={setsaletype}
                        formatOptionLabel={option => (
                            <div className="custom-select-option d-flex align-items-center">
                                {option.icon && <img src={option.icon} alt="icon" />}
                                {option.label}
                            </div>
                        )}
                    />
                </div> */}

                {/* <div className="filter-dropdown">
                    <Dropdown className='dropdown-noarrow'>
                        <Dropdown.Toggle variant="outline-gray">
                            <svg viewBox="0 0 10 16" fill="none" width="16" height="16" xlmns="http://www.w3.org/2000/svg" className="me-1"><path fillRule="evenodd" clip-rule="evenodd" d="M4.99992 0.333313C5.36811 0.333313 5.66659 0.63179 5.66659 0.99998V2.66665H8.33325C8.70144 2.66665 8.99992 2.96512 8.99992 3.33331C8.99992 3.7015 8.70144 3.99998 8.33325 3.99998H5.66659V7.33331H6.66659C7.46224 7.33331 8.2253 7.64938 8.78791 8.21199C9.35052 8.7746 9.66659 9.53766 9.66659 10.3333C9.66659 11.129 9.35052 11.892 8.78791 12.4546C8.2253 13.0172 7.46224 13.3333 6.66659 13.3333H5.66659V15C5.66659 15.3682 5.36811 15.6666 4.99992 15.6666C4.63173 15.6666 4.33325 15.3682 4.33325 15V13.3333H0.999919C0.631729 13.3333 0.333252 13.0348 0.333252 12.6666C0.333252 12.2985 0.631729 12 0.999919 12H4.33325V8.66665H3.33325C2.5376 8.66665 1.77454 8.35058 1.21193 7.78797C0.649323 7.22536 0.333252 6.4623 0.333252 5.66665C0.333252 4.871 0.649323 4.10793 1.21193 3.54533C1.77454 2.98272 2.5376 2.66665 3.33325 2.66665H4.33325V0.99998C4.33325 0.63179 4.63173 0.333313 4.99992 0.333313ZM4.33325 3.99998H3.33325C2.89122 3.99998 2.4673 4.17557 2.15474 4.48814C1.84218 4.8007 1.66659 5.22462 1.66659 5.66665C1.66659 6.10867 1.84218 6.5326 2.15474 6.84516C2.4673 7.15772 2.89122 7.33331 3.33325 7.33331H4.33325V3.99998ZM5.66659 8.66665V12H6.66659C7.10861 12 7.53254 11.8244 7.8451 11.5118C8.15766 11.1993 8.33325 10.7753 8.33325 10.3333C8.33325 9.89128 8.15766 9.46736 7.8451 9.1548C7.53254 8.84224 7.10861 8.66665 6.66659 8.66665H5.66659Z" fill="#828282" ></path></svg>
                            Price
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='price-dropdown'>
                            <div className="filter-item mb-3">
                            <Select
                                styles={colourStyles}
                                closeMenuOnSelect={true}
                                components={animatedComponents}
                                defaultValue={[PriceList[0]]}
                                placeholder="Category"
                                options={PriceList}
                                formatOptionLabel={option => (
                                    <div className="custom-select-option d-flex align-items-center">
                                        {option.icon && <img src={option.icon} alt="icon" />}
                                        {option.label}
                                    </div>
                                )}
                            />
                            </div>
                            <Row className='gx-2'>
                                <Col>
                                <input type="text" placeholder='From' className='form-control' onChange={event => setprice1(event.target.value)} />
                                </Col>
                                <Col>
                                <input type="text" placeholder='To' className='form-control' onChange={event => setprice2(event.target.value)}/>
                                </Col>
                            </Row>

                            <Dropdown.Divider className='my-3' />
                            <Row className='gx-2'>
                                <Col>
                                    <Button variant='default' className='w-100'>Clear</Button>
                                </Col>
                                <Col>
                                    <Button variant='default' className='w-100' disabled>Apply</Button>
                                </Col>
                            </Row>
                        </Dropdown.Menu>
                    </Dropdown>
                </div> */}

                {/* <div className="filter-dropdown ms-auto">
                    <Dropdown className='dropdown-noarrow'>
                        <Dropdown.Toggle variant="outline-gray">
                            <div className="btn-lagend">Sort</div>
                        <svg viewBox="0 0 14 10" fill="none" width="16" height="16" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL me-2 sc-hKwDye jsnDXb sc-egiyK fFvuv"><path fillRule="evenodd" clip-rule="evenodd" d="M0.333252 0.99998C0.333252 0.63179 0.631729 0.333313 0.999919 0.333313H12.9999C13.3681 0.333313 13.6666 0.63179 13.6666 0.99998C13.6666 1.36817 13.3681 1.66665 12.9999 1.66665H0.999919C0.631729 1.66665 0.333252 1.36817 0.333252 0.99998ZM1.66659 4.99998C1.66659 4.63179 1.96506 4.33331 2.33325 4.33331H11.6666C12.0348 4.33331 12.3333 4.63179 12.3333 4.99998C12.3333 5.36817 12.0348 5.66665 11.6666 5.66665H2.33325C1.96506 5.66665 1.66659 5.36817 1.66659 4.99998ZM2.99992 8.99998C2.99992 8.63179 3.2984 8.33331 3.66659 8.33331H10.3333C10.7014 8.33331 10.9999 8.63179 10.9999 8.99998C10.9999 9.36817 10.7014 9.66665 10.3333 9.66665H3.66659C3.2984 9.66665 2.99992 9.36817 2.99992 8.99998Z" fill="currentColor"></path></svg>

                        Recently added  
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='dropdown-menu-right link-flex'>
                            <Dropdown.ItemText>Sort by</Dropdown.ItemText>
                            <Dropdown.Item onClick={event => setrecent("Recently added")}>
                            Recently added
                            <svg viewBox="0 0 14 11" fill="none" width="12" height="12" xlmns="http://www.w3.org/2000/svg" className="sc-bdvvtL sc-hKwDye jVZlpM"><path d="M1 5L5 9L13 1" stroke="#0066ff" strokeWidth="2" strokeLinecap="round"></path></svg>
                            </Dropdown.Item>
                            <Dropdown.Item onClick={event => setrecent("Low to High")}>
                            Price: Low to High
                            </Dropdown.Item>
                            <Dropdown.Item onClick={event => setrecent("High to Low")}>
                            Price: High to Low
                            </Dropdown.Item>
                            <Dropdown.Item onClick={event => setrecent("Auction ending soon")}>
                            Auction ending soon
                        </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div> */}
            </div>

            {data.data[0] === null || data.data[0] === "" || data.data[0] === undefined ? (
            <div className="no-found py-5p text-center">
                        <h2>Nothing to look at</h2>
                        {/* <p className="lead mb-4">Subscribe to authors and come back to see <br />NFTs from your favorite artists</p> */}
                        <Link to="/profile" className='btn btn-grad'>Browse marketplace</Link>
            </div>
           ):(
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6">
            {data.data.map((x, index) => {
                // console.log("xvalue",x)
                return(  
                    <>
                    {/* onClick={()=>getprice(x)} */}
                    <div className='col mb-4' >
                    <CardCreateOtherView img={x.Imageurl} 
                    title={x.NFTName} count="401" subTitle={`<span>Highest bid</span> <span>1/1</span>`} 
                    linkText={parseFloat(x.NFTPrice/1000000)} dataall={x}
                    Assetid={x.Assetid}
                    />
                    </div>                    
                    </>                                                                                          
              )})}                                                                      
            </div>                                        
            )}

            
        </div>
    );
};

export default CreatedViewOther;