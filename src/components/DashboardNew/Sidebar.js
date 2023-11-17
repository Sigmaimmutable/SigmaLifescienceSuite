import React from 'react';
import { Badge, Button, Dropdown } from 'react-bootstrap';
// import { ScrollArea } from 'react-nano-scrollbar';
import {
    NavLink as Link
  } from "react-router-dom";

import Private from '../../assets/images/icons/private.png';
import Account from '../../assets/images/icons/account.png';
import Analytics from '../../assets/images/icons/analytics.png';
import global from '../../assets/images/icons/global-navigation.png';
import Faucet from '../../assets/images/icons/faucet.png';
import GenerateDid from '../../assets/images/icons/freezing.png';
import node from '../../assets/images/icons/network-connection.png';
import region from '../../assets/images/icons/placeholder.png';
import Kyc from '../../assets/images/icons/kyc.png';
import create from '../../assets/images/icons/page.png';
import superUser from '../../assets/images/icons/rating.png';
import admin from '../../assets/images/icons/setting.png';
import multi from '../../assets/images/icons/connection.png';
import second from '../../assets/images/icons/bookmark.png';
import Saas from '../../assets/images/icons/saas.png';
import StablecoinHub from '../../assets/images/icons/stablecoin-hub.png';
import StableSwap from '../../assets/images/icons/stable-swap.png';
import multisig from '../../assets/images/icons/social-media.png';
import transaction from '../../assets/images/icons/transaction.svg';
import addressbook from '../../assets/images/icons/addressbook.svg';

const Sidebar = ({activeClass, handleLink}) => {
    const location = window.location.pathname;
    const device = window.innerWidth;
    // console.log(device)
    const handleSide = () => handleLink()
    return (
        <div className={`side-navigation ${activeClass}`}>
            <ul className='side-navigation-list list-unstyled'>
                <li>
                <Dropdown>
                        {device > 1199 && activeClass ? (
                            <Dropdown.Toggle onClick={handleSide} variant='transparent' className="noarrow" id="dropdown-basic">
                                <img src={StablecoinHub} alt="Stablecoin Hub" />
                            </Dropdown.Toggle>
                        ) : (
                            //className={`noarrow ${location === "/dashboard" ? 'active' : '' }`}
                            <Dropdown.Toggle  variant='transparent' className="noarrow" id="dropdown-basic">
                                <img src={StablecoinHub} alt="Stablecoin Hub" /> Sandbox
                            </Dropdown.Toggle>
                        )}
                        {/* ${ */}
                        {/* ${location === "/dashboard" || location === "/bond" || location === "/mint" || location === "/redeem" || location === "/buyback" || location === "/recollateralize" ? 'd-block' : ''} */}

                        {device > 1199 && activeClass ? null : (
                            <Dropdown.Menu show={location === "/dashboard" || location === "/bond" || location === "/mint" || location === "/redeem" || location === "/buyback" || location === "/recollateralize" || location === "/mint-asset" || location === "/create-asset" || location === "/freeze-asset" || location === "/viewkyc" || location ===  "/dashboardd" || location ===  "/mint-burn-asset" ? true : false} as="ul" className={`list-unstyled position-relative mb-0 p-0 ${location === "/dashboard" || location === "/bond" || location === "/mint" || location === "/redeem" || location === "/buyback" || location === "/recollateralize" || location === "/mint-asset" || location === "/create-asset" || location === "/freeze-asset" || location === "/viewkyc" || location ===  "/dashboardd" || location ===  "/mint-burn-asset" ? 'd-block' : ''}`} style={{minWidth: 'auto'}}>
                    <Dropdown>
                        {device > 1199 && activeClass ? (
                            <Dropdown.Toggle onClick={handleSide} variant='transparent' className="noarrow" id="dropdown-basic">
                                <img src={superUser} alt="Stablecoin Hub" />
                            </Dropdown.Toggle>
                        ) : (
                            //className={`noarrow ${location === "/dashboard" ? 'active' : '' }`}
                            <Dropdown.Toggle  variant='transparent' className="noarrow" id="dropdown-basic">
                                <img src={superUser} alt="Stablecoin Hub" /> Super user access
                            </Dropdown.Toggle>
                        )}
                        {/* ${ */}
                        {/* ${location === "/dashboard" || location === "/bond" || location === "/mint" || location === "/redeem" || location === "/buyback" || location === "/recollateralize" ? 'd-block' : ''} */}

                        {device > 1199 && activeClass ? null : (
                            <Dropdown.Menu show={location === "/dashboard" || location === "/bond" || location === "/mint" || location === "/redeem" || location === "/buyback" || location === "/recollateralize" ? true : false} as="ul" className={`list-unstyled position-relative mb-0 p-0 ${location === "/dashboard" || location === "/bond" || location === "/mint" || location === "/redeem" || location === "/buyback" || location === "/recollateralize" ? 'd-block' : ''}`} style={{minWidth: 'auto'}}>
                                <li><Link to="/dashboard" activeClassName='active'><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49967 15H9.16634V16.6667H10.833V15H12.4997V16.6667H13.333C13.7932 16.6667 14.1663 17.0398 14.1663 17.5C14.1663 17.9602 13.7932 18.3333 13.333 18.3333H6.66634C6.2061 18.3333 5.83301 17.9602 5.83301 17.5C5.83301 17.0398 6.2061 16.6667 6.66634 16.6667H7.49967V15Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3.33366 5L3.33366 11.6667C3.33366 12.5871 4.07985 13.3333 5.00033 13.3333L15.0003 13.3333C15.9208 13.3333 16.667 12.5871 16.667 11.6667L16.667 5C16.667 4.07953 15.9208 3.33333 15.0003 3.33333L5.00033 3.33333C4.07985 3.33333 3.33366 4.07953 3.33366 5ZM1.66699 11.6667C1.66699 13.5076 3.15938 15 5.00033 15L15.0003 15C16.8413 15 18.3337 13.5076 18.3337 11.6667L18.3337 5C18.3337 3.15905 16.8413 1.66667 15.0003 1.66667L5.00033 1.66667C3.15938 1.66667 1.66699 3.15905 1.66699 5L1.66699 11.6667Z" fill="currentColor"></path><path d="M5.83333 5C5.3731 5 5 5.3731 5 5.83333C5 6.29357 5.3731 6.66667 5.83333 6.66667H11.6667C12.1269 6.66667 12.5 6.29357 12.5 5.83333C12.5 5.3731 12.1269 5 11.6667 5H5.83333Z" fill="currentColor"></path><path d="M5.83333 8.33333C5.3731 8.33333 5 8.70643 5 9.16667C5 9.6269 5.3731 10 5.83333 10H7.5C7.96024 10 8.33333 9.6269 8.33333 9.16667C8.33333 8.70643 7.96024 8.33333 7.5 8.33333H5.83333Z" fill="currentColor"></path></svg> Dashboard</Link></li>
                                <li><Link  to="/bond" activeClassName='active'><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.66634 2.5C2.12658 2.5 2.49967 2.8731 2.49967 3.33333V15C2.49967 15.4602 2.87277 15.8333 3.33301 15.8333H18.333C18.7932 15.8333 19.1663 16.2064 19.1663 16.6667C19.1663 17.1269 18.7932 17.5 18.333 17.5H3.33301C1.9523 17.5 0.833008 16.3807 0.833008 15V3.33333C0.833008 2.8731 1.2061 2.5 1.66634 2.5Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17.0805 4.27596C17.4801 4.5043 17.6189 5.01334 17.3906 5.41294L14.7351 10.06C14.1439 11.0946 12.9045 11.5682 11.7739 11.1913L9.17267 10.3242C8.84146 10.2138 8.47653 10.3216 8.25843 10.5942L5.65108 13.8534C5.36357 14.2128 4.83916 14.2711 4.47978 13.9835C4.12039 13.696 4.06212 13.1716 4.34963 12.8122L6.95698 9.55306C7.61129 8.73518 8.70607 8.41187 9.69972 8.74309L12.301 9.61018C12.6778 9.7358 13.091 9.57796 13.288 9.23306L15.9435 4.58604C16.1718 4.18644 16.6809 4.04761 17.0805 4.27596Z" fill="currentColor"></path></svg> Bond</Link></li>
                                <li><Link to="/mint" activeClassName='active'><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M0 405.3V448c0 35.3 86 64 192 64s192-28.7 192-64v-42.7C342.7 434.4 267.2 448 192 448S41.3 434.4 0 405.3zM320 128c106 0 192-28.7 192-64S426 0 320 0 128 28.7 128 64s86 64 192 64zM0 300.4V352c0 35.3 86 64 192 64s192-28.7 192-64v-51.6c-41.3 34-116.9 51.6-192 51.6S41.3 334.4 0 300.4zm416 11c57.3-11.1 96-31.7 96-55.4v-42.7c-23.2 16.4-57.3 27.6-96 34.5v63.6zM192 160C86 160 0 195.8 0 240s86 80 192 80 192-35.8 192-80-86-80-192-80zm219.3 56.3c60-10.8 100.7-32 100.7-56.3v-42.7c-35.5 25.1-96.5 38.6-160.7 41.8 29.5 14.3 51.2 33.5 60 57.2z"></path></svg> Federal reserve mint factory</Link></li>
                                <li><Link  to="/redeem" activeClassName='active'><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path fill-rule="nonzero" d="M5 9a1 1 0 0 1 1 1 6.97 6.97 0 0 1 4.33 1.5h2.17c1.333 0 2.53.58 3.354 1.5H19a5 5 0 0 1 4.516 2.851C21.151 18.972 17.322 21 13 21c-2.79 0-5.15-.603-7.06-1.658A.998.998 0 0 1 5 20H2a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h3zm1.001 3L6 17.022l.045.032C7.84 18.314 10.178 19 13 19c3.004 0 5.799-1.156 7.835-3.13l.133-.133-.12-.1a2.994 2.994 0 0 0-1.643-.63L19 15h-2.111c.072.322.111.656.111 1v1H8v-2l6.79-.001-.034-.078a2.501 2.501 0 0 0-2.092-1.416L12.5 13.5H9.57A4.985 4.985 0 0 0 6.002 12zM4 11H3v7h1v-7zm14-6a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-7-5a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path></g></svg> Redeem</Link></li>
                                <li><Link  to="/buyback" activeClassName='active'><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M254.47 53.094s-4.808 37.12-49.5 49.5c-44.695 12.38-129.282 0-129.282 0L61.343 115.78l8.187 9.157-1.093 2.876-51.843 137.312L16 266.72v1.717c0 18.897 8.253 34.243 20.344 44 12.09 9.758 27.563 14.31 42.937 14.313 15.376.003 30.878-4.556 42.97-14.313 12.092-9.756 20.344-25.094 20.344-44v-1.843l-.688-1.688L86.97 130.28c23.946-3.003 80.866-8.54 115.5 1.532 23.064 6.71 36.151 20.345 43.436 31.97L210.78 354.468l21.407 30.31c-17.75 7.75-32.593 24.84-37.562 51.345-56.076 6.195-95.47 20.74-95.47 37.688h311.876c0-16.947-39.392-31.493-95.467-37.688-4.91-26.6-19.57-44.112-37.188-51.906l21-29.75L264 162.28c7.457-11.275 20.388-24.045 42.47-30.468 34.955-10.167 92.615-4.42 116.155-1.437l-50.875 134.75-.625 1.594v1.717c0 18.897 8.253 34.243 20.344 44 12.09 9.758 27.593 14.31 42.967 14.313 15.375.003 30.877-4.556 42.97-14.313 12.09-9.756 20.343-25.094 20.343-44v-1.843l-.688-1.688L441 127.562l-.938-2.28 8.782-8.438-15.594-14.25s-84.556 12.38-129.25 0-49.53-49.5-49.53-49.5zM77.53 156.656l44.22 108.375H36.594L77.53 156.657zm355.158 0l44.218 108.375H391.72l40.967-108.374z"></path></svg> Buyback</Link></li>
                                <li><Link  to="/recollateralize" activeClassName='active'><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M254.47 53.094s-4.808 37.12-49.5 49.5c-44.695 12.38-129.282 0-129.282 0L61.343 115.78l8.187 9.157-1.093 2.876-51.843 137.312L16 266.72v1.717c0 18.897 8.253 34.243 20.344 44 12.09 9.758 27.563 14.31 42.937 14.313 15.376.003 30.878-4.556 42.97-14.313 12.092-9.756 20.344-25.094 20.344-44v-1.843l-.688-1.688L86.97 130.28c23.946-3.003 80.866-8.54 115.5 1.532 23.064 6.71 36.151 20.345 43.436 31.97L210.78 354.468l21.407 30.31c-17.75 7.75-32.593 24.84-37.562 51.345-56.076 6.195-95.47 20.74-95.47 37.688h311.876c0-16.947-39.392-31.493-95.467-37.688-4.91-26.6-19.57-44.112-37.188-51.906l21-29.75L264 162.28c7.457-11.275 20.388-24.045 42.47-30.468 34.955-10.167 92.615-4.42 116.155-1.437l-50.875 134.75-.625 1.594v1.717c0 18.897 8.253 34.243 20.344 44 12.09 9.758 27.593 14.31 42.967 14.313 15.375.003 30.877-4.556 42.97-14.313 12.09-9.756 20.343-25.094 20.343-44v-1.843l-.688-1.688L441 127.562l-.938-2.28 8.782-8.438-15.594-14.25s-84.556 12.38-129.25 0-49.53-49.5-49.53-49.5zM77.53 156.656l44.22 108.375H36.594L77.53 156.657zm355.158 0l44.218 108.375H391.72l40.967-108.374z"></path></svg> Recollateralize</Link></li>
                            </Dropdown.Menu>
                        )}
                    </Dropdown>
                    <Dropdown>
                        {device > 1199 && activeClass ? (
                            <Dropdown.Toggle onClick={handleSide} variant='transparent' className="noarrow" id="dropdown-basic">
                                <img src={admin} alt="Stablecoin Hub" />
                            </Dropdown.Toggle>
                        ) : (
                            //className={`noarrow ${location === "/dashboard" ? 'active' : '' }`}
                            <Dropdown.Toggle  variant='transparent' className="noarrow" id="dropdown-basic">
                                <img src={admin} alt="Stablecoin Hub" /> Admin
                            </Dropdown.Toggle>
                        )}
                        {/* ${ */}
                        {/* ${location === "/dashboard" || location === "/bond" || location === "/mint" || location === "/redeem" || location === "/buyback" || location === "/recollateralize" ? 'd-block' : ''} */}

                        {device > 1199 && activeClass ? null : (
                            <Dropdown.Menu show={location === "/mint-asset" || location === "/create-asset" || location === "/freeze-asset" || location === "/viewkyc" || location ===  "/dashboardd" || location ===  "/mint-burn-asset" ? true : false} as="ul" className={`list-unstyled position-relative mb-0 p-0 ${location === "/mint-asset" || location === "/create-asset" || location === "/freeze-asset" || location === "/viewkyc" || location ===  "/dashboardd" || location ===  "/mint-burn-asset" ? 'd-block' : ''}`} style={{minWidth: 'auto'}}>
                <li>
                    <Dropdown>
                        {device > 1199 && activeClass ? (
                            <Dropdown.Toggle onClick={handleSide} variant='transparent' className={`noarrow`} id="dropdown-basic">
                                <svg width="24" height="24" className='ms-0' fill='currentColor' viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g id="sprout" transform="translate(-49.874 -14.287)"><path id="Path_5" data-name="Path 5" d="M123.9,42.355V35.841c3.63-.24,10.153-1.326,14.655-5.828,6.4-6.4,5.9-16.892,5.874-17.335a2.556,2.556,0,0,0-2.411-2.411c-.443-.025-10.936-.526-17.335,5.874a16.521,16.521,0,0,0-1.816,2.165,23.98,23.98,0,0,0-5.993-11.27C109.231-.609,96.652-.008,96.121.022A2.556,2.556,0,0,0,93.71,2.433c-.029.532-.631,13.11,7.013,20.754,5.6,5.6,13.847,6.775,18.067,6.991V42.355a22.731,22.731,0,0,1,5.112,0Z" transform="translate(-20.875 22)"></path><path id="Path_6" data-name="Path 6" d="M130.26,344.721a16.633,16.633,0,0,0-5.217.837,23.327,23.327,0,0,0-42.912,0,16.66,16.66,0,0,0-21.874,15.82v6.669a3.32,3.32,0,0,0,3.32,3.32H143.6a3.32,3.32,0,0,0,3.32-3.32v-6.669a16.676,16.676,0,0,0-16.657-16.657Z" transform="translate(-3.116 -264.181)"></path></g></svg>
                            </Dropdown.Toggle>
                        ):(
                            <Dropdown.Toggle variant='transparent' className={`noarrow`} id="dropdown-basic">
                                <svg width="24" height="24" className='ms-0' fill='currentColor' viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g id="sprout" transform="translate(-49.874 -14.287)"><path id="Path_5" data-name="Path 5" d="M123.9,42.355V35.841c3.63-.24,10.153-1.326,14.655-5.828,6.4-6.4,5.9-16.892,5.874-17.335a2.556,2.556,0,0,0-2.411-2.411c-.443-.025-10.936-.526-17.335,5.874a16.521,16.521,0,0,0-1.816,2.165,23.98,23.98,0,0,0-5.993-11.27C109.231-.609,96.652-.008,96.121.022A2.556,2.556,0,0,0,93.71,2.433c-.029.532-.631,13.11,7.013,20.754,5.6,5.6,13.847,6.775,18.067,6.991V42.355a22.731,22.731,0,0,1,5.112,0Z" transform="translate(-20.875 22)"></path><path id="Path_6" data-name="Path 6" d="M130.26,344.721a16.633,16.633,0,0,0-5.217.837,23.327,23.327,0,0,0-42.912,0,16.66,16.66,0,0,0-21.874,15.82v6.669a3.32,3.32,0,0,0,3.32,3.32H143.6a3.32,3.32,0,0,0,3.32-3.32v-6.669a16.676,16.676,0,0,0-16.657-16.657Z" transform="translate(-3.116 -264.181)"></path></g></svg> Minter
                            </Dropdown.Toggle>
                        )}
                        {/* ${location === "/launchpad" ? 'd-block' : ''} */}
                        {/* href="#" */}
                        {/* <Badge className='badge2'>Upcoming</Badge> */}
                        {device > 1199 && activeClass ? null : (
                            <Dropdown.Menu show={location === "/mint-asset" || location === "/create-asset" || location === "/freeze-asset" || location === "/viewkyc" || location ===  "/dashboardd" || location ===  "/mint-burn-asset" ? true : false} as="ul" className={`list-unstyled position-relative mb-0 p-0 ${location === "/mint-asset" || location === "/create-asset" || location === "/freeze-asset" || location === "/viewkyc" || location ===  "/dashboardd" || location ===  "/mint-burn-asset" ? 'd-block' : ''}`} style={{minWidth: 'auto'}}>
                                 {/* <li><Link to="/launchpad"><svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.66634 2.5C2.12658 2.5 2.49967 2.8731 2.49967 3.33333V15C2.49967 15.4602 2.87277 15.8333 3.33301 15.8333H18.333C18.7932 15.8333 19.1663 16.2064 19.1663 16.6667C19.1663 17.1269 18.7932 17.5 18.333 17.5H3.33301C1.9523 17.5 0.833008 16.3807 0.833008 15V3.33333C0.833008 2.8731 1.2061 2.5 1.66634 2.5Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17.0805 4.27596C17.4801 4.5043 17.6189 5.01334 17.3906 5.41294L14.7351 10.06C14.1439 11.0946 12.9045 11.5682 11.7739 11.1913L9.17267 10.3242C8.84146 10.2138 8.47653 10.3216 8.25843 10.5942L5.65108 13.8534C5.36357 14.2128 4.83916 14.2711 4.47978 13.9835C4.12039 13.696 4.06212 13.1716 4.34963 12.8122L6.95698 9.55306C7.61129 8.73518 8.70607 8.41187 9.69972 8.74309L12.301 9.61018C12.6778 9.7358 13.091 9.57796 13.288 9.23306L15.9435 4.58604C16.1718 4.18644 16.6809 4.04761 17.0805 4.27596Z" fill="currentColor"></path></svg> Launchpad</Link></li>  */}
                                {/* <li><Link to="/dashboardd"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49967 15H9.16634V16.6667H10.833V15H12.4997V16.6667H13.333C13.7932 16.6667 14.1663 17.0398 14.1663 17.5C14.1663 17.9602 13.7932 18.3333 13.333 18.3333H6.66634C6.2061 18.3333 5.83301 17.9602 5.83301 17.5C5.83301 17.0398 6.2061 16.6667 6.66634 16.6667H7.49967V15Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3.33366 5L3.33366 11.6667C3.33366 12.5871 4.07985 13.3333 5.00033 13.3333L15.0003 13.3333C15.9208 13.3333 16.667 12.5871 16.667 11.6667L16.667 5C16.667 4.07953 15.9208 3.33333 15.0003 3.33333L5.00033 3.33333C4.07985 3.33333 3.33366 4.07953 3.33366 5ZM1.66699 11.6667C1.66699 13.5076 3.15938 15 5.00033 15L15.0003 15C16.8413 15 18.3337 13.5076 18.3337 11.6667L18.3337 5C18.3337 3.15905 16.8413 1.66667 15.0003 1.66667L5.00033 1.66667C3.15938 1.66667 1.66699 3.15905 1.66699 5L1.66699 11.6667Z" fill="currentColor"></path><path d="M5.83333 5C5.3731 5 5 5.3731 5 5.83333C5 6.29357 5.3731 6.66667 5.83333 6.66667H11.6667C12.1269 6.66667 12.5 6.29357 12.5 5.83333C12.5 5.3731 12.1269 5 11.6667 5H5.83333Z" fill="currentColor"></path><path d="M5.83333 8.33333C5.3731 8.33333 5 8.70643 5 9.16667C5 9.6269 5.3731 10 5.83333 10H7.5C7.96024 10 8.33333 9.6269 8.33333 9.16667C8.33333 8.70643 7.96024 8.33333 7.5 8.33333H5.83333Z" fill="currentColor"></path></svg> Dashboard </Link></li> */}
                                <li><Link  to="/create-asset"><img src={create} alt="Kyc" /> Create Asset </Link></li>
                                <li><Link  to="/mint-burn-asset"><img src={Kyc} alt="Kyc" /> Mint / Burn Asset </Link></li>
                                <li><Link  to="/freeze-asset"><img src={GenerateDid} alt="GenerateDid" /> Freeze Asset </Link></li>
                                <li><Link to="/viewkyc"><img src={addressbook} alt="Auction" /> View Tokens</Link></li>
                                <li><Link disabled to="/launchpad"><svg xmlns="http://www.w3.org/2000/svg" class="dark-theme-white-10 me-2 ms-0" width="20" height="20" viewBox="0 0 24 24"><path d="M4 8v12h20v-12h-20zm10 10c-2.209 0-4-1.792-4-4s1.791-4 4-4 4 1.792 4 4-1.791 4-4 4zm.2-2.021v.421h-.4v-.399c-.413-.007-.843-.105-1.2-.291l.183-.657c.383.148.892.306 1.289.216.46-.104.555-.577.047-.805-.373-.172-1.512-.322-1.512-1.297 0-.546.415-1.034 1.193-1.141v-.426h.4v.407c.289.008.614.058.978.168l-.146.659c-.307-.107-.646-.206-.977-.185-.596.035-.649.551-.232.767.684.321 1.577.561 1.577 1.418 0 .687-.537 1.053-1.2 1.145zm7.8-8.979h-19v11h-1v-12h20v1zm-2-2h-19v11h-1v-12h20v1z"/></svg>Taxing</Link></li>

                            </Dropdown.Menu>
                        )}
                    </Dropdown>
                </li>
                            </Dropdown.Menu>
                        )}
                    </Dropdown>
                            </Dropdown.Menu>
                        )}
                    </Dropdown>
                </li>

                {/* <li>
                    <Dropdown>
                        {device > 1199 && activeClass ? (
                        <Dropdown.Toggle onClick={handleSide} variant='transparent' className={`noarrow ${location === "/swap" ? 'active' : '' }`} id="dropdown-basic">
                            <img src={ZeroFeeExchange} alt="ZeroFeeExchange" />
                        </Dropdown.Toggle>
                        ) : (
                            <Dropdown.Toggle variant='transparent' className={`noarrow ${location === "/swap" ? 'active' : '' }`} id="dropdown-basic">
                                <img src={ZeroFeeExchange} alt="ZeroFeeExchange" /> Zero- Fee Exchange
                            </Dropdown.Toggle>
                        )}
                        {/* {location === "/swap" || location === "/swap" || location === "/pool" ? 'd-block' : ''} 
                        {device > 1199 && activeClass ? null : (
                            <Dropdown.Menu show={location === "/swap" || location === "/stableswap" || location === "/pool" ? true : false} as="ul" className={`list-unstyled position-relative mb-0 p-0 ${location === "/swap" || location === "/swap" || location === "/pool" ? 'd-block' : ''}`} style={{minWidth: 'auto'}}>
                                {/* <li><Link to="/swap" activeClassName='active'><svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                        viewBox="0 0 776 774" style={{enableBackground: "new 0 0 776 774"}}>
                                    <g>
                                        <path fill="currentColor" d="M596.9,436.4l3-6.6c4-8.7,6.9-20.1,8.3-32.2c1.9-17.1-1.7-41.4-8.5-56.8l-2.5-5.5l26.4-26.4
                                            c14.5-14.5,26.4-26.8,26.4-27.4c0-0.6-9.6-10.6-21.3-22.3c-11.7-11.6-21.4-21.1-21.7-21c-0.3,0-12.2,12-26.5,26.5
                                            C566.2,279.1,554,291,553.4,291c-0.6,0-3.9-1.2-7.4-2.6c-11.6-4.7-23-6.7-39-6.7c-30-0.1-54.3,9-81.1,30.3
                                            c-7.1,5.7-29.8,26.1-34.3,30.9l-2.9,3l-13.1-12.1c-44.7-41.3-74.9-55.4-111.1-51.9c-13.9,1.3-24.8,3.9-34.7,8.3l-7,3.1l-26.6-26.6
                                            L169.5,240l-21.8,21.7L126,283.5l26.6,26.6l26.7,26.7l-3.7,8.5c-11.1,25.9-11,60.2,0.3,86.7l2.8,6.5l-26.6,26.8L125.5,492
                                            l21.8,21.7l21.7,21.8l26.3-26.3c14.4-14.4,26.7-26.2,27.3-26.2c0.6,0,3.9,1.2,7.4,2.6c11.6,4.7,23,6.7,39,6.7
                                            c20.6,0.1,35.2-3.3,53.3-12.3c15.5-7.8,28-17.2,51.2-38.7l14-13l13.4,12.4c32.7,30.2,55,44,80.5,49.8c19.6,4.4,46,1.8,64.4-6.5
                                            c3.5-1.7,7-3,7.6-3c0.6,0,12.9,11.8,27.3,26.2l26.3,26.3l21.7-21.8l21.8-21.7l-26.8-26.8L596.9,436.4z M337.9,398.4
                                            c-14.6,14-25.6,22.5-36.1,28c-12.1,6.5-18,7.9-30.2,7.4c-8.8-0.3-10.9-0.8-16.7-3.6c-13.3-6.4-22.8-19.8-25-35.5
                                            c-3.4-23.4,9.7-45.3,31.6-52.9c6.5-2.2,20.3-2.3,27.6-0.2c13.5,4,25.7,12.5,46.1,32.3l14.1,13.6L337.9,398.4z M519.3,430.3
                                            c-5.8,2.7-8.2,3.2-16.4,3.5c-20.3,0.9-34.2-6.7-62.1-33.7l-14.1-13.6l11.4-10.9c20-19.1,36.4-30.3,49.9-34.1c3.7-1,8.9-1.4,16-1.2
                                            c9.4,0.3,11.2,0.6,17.1,3.5c4.3,2,8.5,5.2,12.2,9.1C556,376.7,548.7,416.4,519.3,430.3z"/>
                                        <path d="M761.4,316.5c-20.5-106.9-84.3-198.6-177.4-255C538.5,34,486.2,16,432,9.5c-12.9-1.6-57.3-2.8-68.5-1.9
                                            C283.1,14.1,211.9,41.5,152,89.3C72.5,152.6,22.9,241.9,10.3,344c-2.4,20.3-2.4,65.7,0,86C22.9,532.1,72.5,621.4,152,684.7
                                            c54.9,43.8,120.9,71.1,193,80c20.3,2.4,65.7,2.4,86,0c55.5-6.8,107.2-24.5,153-52.2c93.1-56.4,156.9-148.1,177.4-255
                                            c4.8-24.9,6-39.8,6-70.5S766.2,341.4,761.4,316.5z M628.7,511.7L607,533.5l-26.3-26.3C566.3,492.8,554,481,553.4,481
                                            c-0.6,0-4.1,1.3-7.6,3c-18.4,8.3-44.8,10.9-64.4,6.5c-25.5-5.8-47.8-19.6-80.5-49.8l-13.4-12.4l-14,13
                                            c-23.2,21.5-35.7,30.9-51.2,38.7c-18.1,9-32.7,12.4-53.3,12.3c-16,0-27.4-2-39-6.7c-3.5-1.4-6.8-2.6-7.4-2.6
                                            c-0.6,0-12.9,11.8-27.3,26.2L169,535.5l-21.7-21.8L125.5,492l26.6-26.7l26.6-26.8l-2.8-6.5c-11.3-26.5-11.4-60.8-0.3-86.7l3.7-8.5
                                            l-26.7-26.7L126,283.5l21.7-21.8l21.8-21.7l26.7,26.7l26.6,26.6l7-3.1c9.9-4.4,20.8-7,34.7-8.3c36.2-3.5,66.4,10.6,111.1,51.9
                                            l13.1,12.1l2.9-3c4.5-4.8,27.2-25.2,34.3-30.9c26.8-21.3,51.1-30.4,81.1-30.3c16,0,27.4,2,39,6.7c3.5,1.4,6.8,2.6,7.4,2.6
                                            c0.6,0,12.8-11.9,27.1-26.3c14.3-14.5,26.2-26.5,26.5-26.5c0.3-0.1,10,9.4,21.7,21c11.7,11.7,21.3,21.7,21.3,22.3
                                            c0,0.6-11.9,12.9-26.4,27.4l-26.4,26.4l2.5,5.5c6.8,15.4,10.4,39.7,8.5,56.8c-1.4,12.1-4.3,23.5-8.3,32.2l-3,6.6l26.8,26.8
                                            l26.8,26.8L628.7,511.7z" fill='transparent'/>
                                        <path d="M289.1,341.6c-7.3-2.1-21.1-2-27.6,0.2c-21.9,7.6-35,29.5-31.6,52.9c2.2,15.7,11.7,29.1,25,35.5c5.8,2.8,7.9,3.3,16.7,3.6
                                            c12.2,0.5,18.1-0.9,30.2-7.4c10.5-5.5,21.5-14,36.1-28l11.4-10.9l-14.1-13.6C314.8,354.1,302.6,345.6,289.1,341.6z"/>
                                        <path d="M521.1,343.8c-5.9-2.9-7.7-3.2-17.1-3.5c-7.1-0.2-12.3,0.2-16,1.2c-13.5,3.8-29.9,15-49.9,34.1l-11.4,10.9l14.1,13.6
                                            c27.9,27,41.8,34.6,62.1,33.7c8.2-0.3,10.6-0.8,16.4-3.5c29.4-13.9,36.7-53.6,14-77.4C529.6,349,525.4,345.8,521.1,343.8z"/>
                                    </g>
                                    </svg> ASA Swap</Link></li> 
                                    <li><Link to="/stableswap"  activeClassName='active'><img src={StableSwap} alt="StableSwap" /> Stable Swap<Badge className='badge1'>New!</Badge></Link></li>
                                <li><Link to="/pool" activeClassName='active'><svg viewBox="0 0 100 50" width="20" height="20" color="text" xmlns="http://www.w3.org/2000/svg" class="sc-bdfBwQ bVWwBE"><path id="Path_2687" data-name="Path 2687" d="M165.144,38.289A19.144,19.144,0,1,0,146,19.144,19.167,19.167,0,0,0,165.144,38.289Zm0,0" transform="translate(-120.59)"></path><path id="Path_2688" data-name="Path 2688" d="M90,191.962h15.012A24.56,24.56,0,0,1,98.325,185H90Zm0,0" transform="translate(-74.336 -152.803)"></path><path id="Path_2689" data-name="Path 2689" d="M335.746,191.962h15.012V185h-8.325A24.56,24.56,0,0,1,335.746,191.962Zm0,0" transform="translate(-277.313 -152.803)"></path><path id="Path_2690" data-name="Path 2690" d="M68.78,95a24.349,24.349,0,0,1-1.151,10.442H78.666v17.4H10.442v-17.4H21.48A24.354,24.354,0,0,1,20.329,95H0v38.289H89.109V95Zm0,0" transform="translate(0 -78.466)"></path></svg> LP Pool</Link></li>
                            </Dropdown.Menu>
                        )}
                    </Dropdown>
                </li> */}
 
                {/* <li>
                    <Dropdown>
                        {device > 1199 && activeClass ? (
                            <Dropdown.Toggle onClick={handleSide} variant='transparent' className={`noarrow`} id="dropdown-basic">
                                <svg width="20" height="22" className='ms-0' viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.77 12.04a.47.47 0 0 0-.51.1l-.95.92a.46.46 0 0 0 0 .65c.19.18.49.18.67 0l.13-.13a3.73 3.73 0 0 1-3.76 3.5H5.47c-.26 0-.47.2-.47.46 0 .25.21.46.47.46h1.88c2.54 0 4.6-1.97 4.7-4.43l.15.14c.18.18.48.18.66 0a.46.46 0 0 0 0-.65l-.94-.92a.47.47 0 0 0-.15-.1Z" fill="currentColor" stroke="currentColor" stroke-width=".5"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M9 10c-1.77 0-3.35.06-4.64.15a2.38 2.38 0 0 0-2.25 2.22C2.04 13.24 2 14.15 2 15c0 .85.04 1.76.1 2.63a2.38 2.38 0 0 0 2.26 2.22 73.54 73.54 0 0 0 9.28 0 2.38 2.38 0 0 0 2.25-2.22c.07-.87.11-1.78.11-2.63 0-.85-.04-1.76-.1-2.63a2.38 2.38 0 0 0-2.26-2.22A73.54 73.54 0 0 0 9 10ZM4.23 8.15a4.38 4.38 0 0 0-4.12 4.08C.05 13.13 0 14.09 0 15c0 .91.05 1.88.11 2.77a4.38 4.38 0 0 0 4.12 4.08 75.54 75.54 0 0 0 9.54 0 4.38 4.38 0 0 0 4.12-4.08 39.18 39.18 0 0 0 0-5.54 4.38 4.38 0 0 0-4.12-4.08 75.55 75.55 0 0 0-9.54 0Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M4 5a5 5 0 0 1 10 0v4a1 1 0 1 1-2 0V5a3 3 0 1 0-6 0v4a1 1 0 1 1-2 0V5Z" fill="currentColor"></path></svg>
                            </Dropdown.Toggle>
                        ):(
                            <Dropdown.Toggle variant='transparent' className={`noarrow`} id="dropdown-basic">
                                <svg width="20" height="22" className='ms-0' viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.77 12.04a.47.47 0 0 0-.51.1l-.95.92a.46.46 0 0 0 0 .65c.19.18.49.18.67 0l.13-.13a3.73 3.73 0 0 1-3.76 3.5H5.47c-.26 0-.47.2-.47.46 0 .25.21.46.47.46h1.88c2.54 0 4.6-1.97 4.7-4.43l.15.14c.18.18.48.18.66 0a.46.46 0 0 0 0-.65l-.94-.92a.47.47 0 0 0-.15-.1Z" fill="currentColor" stroke="currentColor" stroke-width=".5"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M9 10c-1.77 0-3.35.06-4.64.15a2.38 2.38 0 0 0-2.25 2.22C2.04 13.24 2 14.15 2 15c0 .85.04 1.76.1 2.63a2.38 2.38 0 0 0 2.26 2.22 73.54 73.54 0 0 0 9.28 0 2.38 2.38 0 0 0 2.25-2.22c.07-.87.11-1.78.11-2.63 0-.85-.04-1.76-.1-2.63a2.38 2.38 0 0 0-2.26-2.22A73.54 73.54 0 0 0 9 10ZM4.23 8.15a4.38 4.38 0 0 0-4.12 4.08C.05 13.13 0 14.09 0 15c0 .91.05 1.88.11 2.77a4.38 4.38 0 0 0 4.12 4.08 75.54 75.54 0 0 0 9.54 0 4.38 4.38 0 0 0 4.12-4.08 39.18 39.18 0 0 0 0-5.54 4.38 4.38 0 0 0-4.12-4.08 75.55 75.55 0 0 0-9.54 0Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M4 5a5 5 0 0 1 10 0v4a1 1 0 1 1-2 0V5a3 3 0 1 0-6 0v4a1 1 0 1 1-2 0V5Z" fill="currentColor"></path></svg> Yield Farming
                            </Dropdown.Toggle>
                        )}
                        {/* ${location === "/stake" || location === "/farm" ? 'd-block' : ''} 
                        {device > 1199 && activeClass ? null : (
                            <Dropdown.Menu show={location === "/stake" || location === "/farm" ? true : false} as="ul" className={`list-unstyled position-relative mb-0 p-0 ${location === "/stake" || location === "/farm" ? 'd-block' : ''}`} style={{minWidth: 'auto'}}>
                                <li><Link to="/stake" activeClassName='active'><svg stroke="currentColor" fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M15.91 13.34l2.636-4.026-.454-.406-3.673 3.099c-.675-.138-1.402.068-1.894.618-.736.823-.665 2.088.159 2.824.824.736 2.088.665 2.824-.159.492-.55.615-1.295.402-1.95zm-3.91-10.646v-2.694h4v2.694c-1.439-.243-2.592-.238-4 0zm8.851 2.064l1.407-1.407 1.414 1.414-1.321 1.321c-.462-.484-.964-.927-1.5-1.328zm-18.851 4.242h8v2h-8v-2zm-2 4h8v2h-8v-2zm3 4h7v2h-7v-2zm21-3c0 5.523-4.477 10-10 10-2.79 0-5.3-1.155-7.111-3h3.28c1.138.631 2.439 1 3.831 1 4.411 0 8-3.589 8-8s-3.589-8-8-8c-1.392 0-2.693.369-3.831 1h-3.28c1.811-1.845 4.321-3 7.111-3 5.523 0 10 4.477 10 10z"/></svg> Stake</Link></li>
                                <li><Link to="/farm" activeClassName='active'><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M528 336c-48.6 0-88 39.4-88 88s39.4 88 88 88 88-39.4 88-88-39.4-88-88-88zm0 112c-13.23 0-24-10.77-24-24s10.77-24 24-24 24 10.77 24 24-10.77 24-24 24zm80-288h-64v-40.2c0-14.12 4.7-27.76 13.15-38.84 4.42-5.8 3.55-14.06-1.32-19.49L534.2 37.3c-6.66-7.45-18.32-6.92-24.7.78C490.58 60.9 480 89.81 480 119.8V160H377.67L321.58 29.14A47.914 47.914 0 0 0 277.45 0H144c-26.47 0-48 21.53-48 48v146.52c-8.63-6.73-20.96-6.46-28.89 1.47L36 227.1c-8.59 8.59-8.59 22.52 0 31.11l5.06 5.06c-4.99 9.26-8.96 18.82-11.91 28.72H22c-12.15 0-22 9.85-22 22v44c0 12.15 9.85 22 22 22h7.14c2.96 9.91 6.92 19.46 11.91 28.73l-5.06 5.06c-8.59 8.59-8.59 22.52 0 31.11L67.1 476c8.59 8.59 22.52 8.59 31.11 0l5.06-5.06c9.26 4.99 18.82 8.96 28.72 11.91V490c0 12.15 9.85 22 22 22h44c12.15 0 22-9.85 22-22v-7.14c9.9-2.95 19.46-6.92 28.72-11.91l5.06 5.06c8.59 8.59 22.52 8.59 31.11 0l31.11-31.11c8.59-8.59 8.59-22.52 0-31.11l-5.06-5.06c4.99-9.26 8.96-18.82 11.91-28.72H330c12.15 0 22-9.85 22-22v-6h80.54c21.91-28.99 56.32-48 95.46-48 18.64 0 36.07 4.61 51.8 12.2l50.82-50.82c6-6 9.37-14.14 9.37-22.63V192c.01-17.67-14.32-32-31.99-32zM176 416c-44.18 0-80-35.82-80-80s35.82-80 80-80 80 35.82 80 80-35.82 80-80 80zm22-256h-38V64h106.89l41.15 96H198z"></path></svg> Farm</Link></li>
                            </Dropdown.Menu>
                        )}
                    </Dropdown>
                </li> */}



                <li>
                    <Dropdown>
                        {device > 1199 && activeClass ? (
                            <Dropdown.Toggle onClick={handleSide} variant='transparent' className={`noarrow`} id="dropdown-basic">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="ms-0" viewBox="0 0 16 16">
                                    <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2zM3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.389.389 0 0 0-.029-.518z"/>
                                    <path fill-rule="evenodd" d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.945 11.945 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0z"/>
                                </svg>
                            </Dropdown.Toggle>
                        ):(
                            <Dropdown.Toggle variant='transparent' className={`noarrow`} id="dropdown-basic">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="ms-0" viewBox="0 0 16 16">
                                    <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2zM3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.389.389 0 0 0-.029-.518z"/>
                                    <path fill-rule="evenodd" d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.945 11.945 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0z"/>
                                </svg> Dashboard
                            </Dropdown.Toggle>
                        )}
                        {/* ${location === "/stake" || location === "/farm" ? 'd-block' : ''}  */}
                        {device > 1199 && activeClass ? null : (
                            <Dropdown.Menu show={location === "/node-status" || location === "/validators" || location === "/transations" || location === "/blocks" ? true : false} as="ul" className={`list-unstyled position-relative mb-0 p-0 ${location === "/stake" || location === "/validators" || location === "/transations" || location === "/blocks" ? 'd-block' : ''}`} style={{minWidth: 'auto'}}>
                                <li><Link to="/node-status" activeClassName='active'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-diagram-3-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5v-1zm-6 8A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5v-1zm6 0A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5v-1zm6 0a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1z"/>
                                    </svg> Node Status</Link></li>
                                <li><Link to="/validators" activeClassName='active'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-activity" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"/>
                                </svg> Validators</Link></li>
                                <li><Link to="/transations" activeClassName='active'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-sliders2-vertical" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M0 10.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1H3V1.5a.5.5 0 0 0-1 0V10H.5a.5.5 0 0 0-.5.5ZM2.5 12a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5Zm3-6.5A.5.5 0 0 0 6 6h1.5v8.5a.5.5 0 0 0 1 0V6H10a.5.5 0 0 0 0-1H6a.5.5 0 0 0-.5.5ZM8 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2A.5.5 0 0 0 8 1Zm3 9.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1H14V1.5a.5.5 0 0 0-1 0V10h-1.5a.5.5 0 0 0-.5.5Zm2.5 1.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5Z"/>
                                    </svg> Transactions</Link></li>
                                <li><Link to="/blocks" activeClassName='active'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-back" viewBox="0 0 16 16">
                                    <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z"/>
                                    </svg> Blocks</Link></li>
                            </Dropdown.Menu>
                        )}
                    </Dropdown>
                </li>

                <li>
                    <Dropdown>
                        {device > 1199 && activeClass ? (
                            <Dropdown.Toggle onClick={handleSide} variant='transparent' className={`noarrow`} id="dropdown-basic">
                                <img src={Private}/>
                            </Dropdown.Toggle>
                        ):(
                            <Dropdown.Toggle variant='transparent' className={`noarrow`} id="dropdown-basic">
                                {/* <svg width="24" height="24" className='ms-0' fill='currentColor' viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g id="sprout" transform="translate(-49.874 -14.287)"><path id="Path_5" data-name="Path 5" d="M123.9,42.355V35.841c3.63-.24,10.153-1.326,14.655-5.828,6.4-6.4,5.9-16.892,5.874-17.335a2.556,2.556,0,0,0-2.411-2.411c-.443-.025-10.936-.526-17.335,5.874a16.521,16.521,0,0,0-1.816,2.165,23.98,23.98,0,0,0-5.993-11.27C109.231-.609,96.652-.008,96.121.022A2.556,2.556,0,0,0,93.71,2.433c-.029.532-.631,13.11,7.013,20.754,5.6,5.6,13.847,6.775,18.067,6.991V42.355a22.731,22.731,0,0,1,5.112,0Z" transform="translate(-20.875 22)"></path><path id="Path_6" data-name="Path 6" d="M130.26,344.721a16.633,16.633,0,0,0-5.217.837,23.327,23.327,0,0,0-42.912,0,16.66,16.66,0,0,0-21.874,15.82v6.669a3.32,3.32,0,0,0,3.32,3.32H143.6a3.32,3.32,0,0,0,3.32-3.32v-6.669a16.676,16.676,0,0,0-16.657-16.657Z" transform="translate(-3.116 -264.181)"></path></g></svg> */}
                                <img src={Private}/> Polygon Edge
                            </Dropdown.Toggle>
                        )}
                        {/* ${location === "/launchpad" ? 'd-block' : ''} */}
                        {/* href="#" */}
                        {/* <Badge className='badge2'>Upcoming</Badge> */}
                        {device > 1199 && activeClass ? null : (
                            <Dropdown.Menu show={location === "/launchapaddeploy" || location === "/launchapaddeploy" || location === "/launchpad" || location === "/viewkyc" || location ===  "/dashboardd" ? true : false} as="ul" className={`list-unstyled position-relative mb-0 p-0 ${location === "/launchpad" || location === "/launchpad" || location === "/launchpad" || location === "/viewkyc" || location ===  "/dashboardd" ? 'd-block' : ''}`} style={{minWidth: 'auto'}}>
                                {/* <li><Link to="/launchapaddeploy"><svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.66634 2.5C2.12658 2.5 2.49967 2.8731 2.49967 3.33333V15C2.49967 15.4602 2.87277 15.8333 3.33301 15.8333H18.333C18.7932 15.8333 19.1663 16.2064 19.1663 16.6667C19.1663 17.1269 18.7932 17.5 18.333 17.5H3.33301C1.9523 17.5 0.833008 16.3807 0.833008 15V3.33333C0.833008 2.8731 1.2061 2.5 1.66634 2.5Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17.0805 4.27596C17.4801 4.5043 17.6189 5.01334 17.3906 5.41294L14.7351 10.06C14.1439 11.0946 12.9045 11.5682 11.7739 11.1913L9.17267 10.3242C8.84146 10.2138 8.47653 10.3216 8.25843 10.5942L5.65108 13.8534C5.36357 14.2128 4.83916 14.2711 4.47978 13.9835C4.12039 13.696 4.06212 13.1716 4.34963 12.8122L6.95698 9.55306C7.61129 8.73518 8.70607 8.41187 9.69972 8.74309L12.301 9.61018C12.6778 9.7358 13.091 9.57796 13.288 9.23306L15.9435 4.58604C16.1718 4.18644 16.6809 4.04761 17.0805 4.27596Z" fill="currentColor"></path></svg> Configuration</Link></li> */}
                                
                                
                                <Dropdown>
                        {device > 1199 && activeClass ? (
                            <Dropdown.Toggle onClick={handleSide} variant='transparent' className={`noarrow`} id="dropdown-basic">
                                <svg width="24" height="24" className='ms-0' fill='currentColor' viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g id="sprout" transform="translate(-49.874 -14.287)"><path id="Path_5" data-name="Path 5" d="M123.9,42.355V35.841c3.63-.24,10.153-1.326,14.655-5.828,6.4-6.4,5.9-16.892,5.874-17.335a2.556,2.556,0,0,0-2.411-2.411c-.443-.025-10.936-.526-17.335,5.874a16.521,16.521,0,0,0-1.816,2.165,23.98,23.98,0,0,0-5.993-11.27C109.231-.609,96.652-.008,96.121.022A2.556,2.556,0,0,0,93.71,2.433c-.029.532-.631,13.11,7.013,20.754,5.6,5.6,13.847,6.775,18.067,6.991V42.355a22.731,22.731,0,0,1,5.112,0Z" transform="translate(-20.875 22)"></path><path id="Path_6" data-name="Path 6" d="M130.26,344.721a16.633,16.633,0,0,0-5.217.837,23.327,23.327,0,0,0-42.912,0,16.66,16.66,0,0,0-21.874,15.82v6.669a3.32,3.32,0,0,0,3.32,3.32H143.6a3.32,3.32,0,0,0,3.32-3.32v-6.669a16.676,16.676,0,0,0-16.657-16.657Z" transform="translate(-3.116 -264.181)"></path></g></svg>
                            </Dropdown.Toggle>
                        ):(
                            <Dropdown.Toggle variant='transparent' className={`noarrow`} id="dropdown-basic">
                                <svg xmlns="http://www.w3.org/2000/svg" className='ms-0' fill='currentColor' width="24" height="24" viewBox="0 0 24 24"><path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z"/></svg> Smart contract
                            </Dropdown.Toggle>
                        )}
                        {/* ${location === "/launchpad" ? 'd-block' : ''} */}
                        {/* href="#" */}
                        {/* <Badge className='badge2'>Upcoming</Badge> */}
                        {device > 1199 && activeClass ? null : (
                            <Dropdown.Menu show={location === "/launchapaddeploy" || location === "/launchapaddeploy" || location === "/deploy-list" || location === "/deploy" || location ===  "/deploy" ? true : false} as="ul" className={`list-unstyled position-relative mb-0 p-0 ${location === "/launchapaddeploy" || location === "/deploy-list" || location === "/deploy" || location === "/deploy" || location ===  "/deploy" ? 'd-block' : ''}`} style={{minWidth: 'auto'}}>
                                <li><Link to="/launchapaddeploy"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49967 15H9.16634V16.6667H10.833V15H12.4997V16.6667H13.333C13.7932 16.6667 14.1663 17.0398 14.1663 17.5C14.1663 17.9602 13.7932 18.3333 13.333 18.3333H6.66634C6.2061 18.3333 5.83301 17.9602 5.83301 17.5C5.83301 17.0398 6.2061 16.6667 6.66634 16.6667H7.49967V15Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3.33366 5L3.33366 11.6667C3.33366 12.5871 4.07985 13.3333 5.00033 13.3333L15.0003 13.3333C15.9208 13.3333 16.667 12.5871 16.667 11.6667L16.667 5C16.667 4.07953 15.9208 3.33333 15.0003 3.33333L5.00033 3.33333C4.07985 3.33333 3.33366 4.07953 3.33366 5ZM1.66699 11.6667C1.66699 13.5076 3.15938 15 5.00033 15L15.0003 15C16.8413 15 18.3337 13.5076 18.3337 11.6667L18.3337 5C18.3337 3.15905 16.8413 1.66667 15.0003 1.66667L5.00033 1.66667C3.15938 1.66667 1.66699 3.15905 1.66699 5L1.66699 11.6667Z" fill="currentColor"></path><path d="M5.83333 5C5.3731 5 5 5.3731 5 5.83333C5 6.29357 5.3731 6.66667 5.83333 6.66667H11.6667C12.1269 6.66667 12.5 6.29357 12.5 5.83333C12.5 5.3731 12.1269 5 11.6667 5H5.83333Z" fill="currentColor"></path><path d="M5.83333 8.33333C5.3731 8.33333 5 8.70643 5 9.16667C5 9.6269 5.3731 10 5.83333 10H7.5C7.96024 10 8.33333 9.6269 8.33333 9.16667C8.33333 8.70643 7.96024 8.33333 7.5 8.33333H5.83333Z" fill="currentColor"></path></svg> Deploy </Link></li>
                                {/* <li><Link to="/deploy-list"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49967 15H9.16634V16.6667H10.833V15H12.4997V16.6667H13.333C13.7932 16.6667 14.1663 17.0398 14.1663 17.5C14.1663 17.9602 13.7932 18.3333 13.333 18.3333H6.66634C6.2061 18.3333 5.83301 17.9602 5.83301 17.5C5.83301 17.0398 6.2061 16.6667 6.66634 16.6667H7.49967V15Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3.33366 5L3.33366 11.6667C3.33366 12.5871 4.07985 13.3333 5.00033 13.3333L15.0003 13.3333C15.9208 13.3333 16.667 12.5871 16.667 11.6667L16.667 5C16.667 4.07953 15.9208 3.33333 15.0003 3.33333L5.00033 3.33333C4.07985 3.33333 3.33366 4.07953 3.33366 5ZM1.66699 11.6667C1.66699 13.5076 3.15938 15 5.00033 15L15.0003 15C16.8413 15 18.3337 13.5076 18.3337 11.6667L18.3337 5C18.3337 3.15905 16.8413 1.66667 15.0003 1.66667L5.00033 1.66667C3.15938 1.66667 1.66699 3.15905 1.66699 5L1.66699 11.6667Z" fill="currentColor"></path><path d="M5.83333 5C5.3731 5 5 5.3731 5 5.83333C5 6.29357 5.3731 6.66667 5.83333 6.66667H11.6667C12.1269 6.66667 12.5 6.29357 12.5 5.83333C12.5 5.3731 12.1269 5 11.6667 5H5.83333Z" fill="currentColor"></path><path d="M5.83333 8.33333C5.3731 8.33333 5 8.70643 5 9.16667C5 9.6269 5.3731 10 5.83333 10H7.5C7.96024 10 8.33333 9.6269 8.33333 9.16667C8.33333 8.70643 7.96024 8.33333 7.5 8.33333H5.83333Z" fill="currentColor"></path></svg> Deployed List </Link></li> */}
                            </Dropdown.Menu>
                        )}
                    </Dropdown>
                                
                                {/* <li><a  href="https://testserver1.stasisonline.in/" target="_blank" rel="noreferrer"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49967 15H9.16634V16.6667H10.833V15H12.4997V16.6667H13.333C13.7932 16.6667 14.1663 17.0398 14.1663 17.5C14.1663 17.9602 13.7932 18.3333 13.333 18.3333H6.66634C6.2061 18.3333 5.83301 17.9602 5.83301 17.5C5.83301 17.0398 6.2061 16.6667 6.66634 16.6667H7.49967V15Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3.33366 5L3.33366 11.6667C3.33366 12.5871 4.07985 13.3333 5.00033 13.3333L15.0003 13.3333C15.9208 13.3333 16.667 12.5871 16.667 11.6667L16.667 5C16.667 4.07953 15.9208 3.33333 15.0003 3.33333L5.00033 3.33333C4.07985 3.33333 3.33366 4.07953 3.33366 5ZM1.66699 11.6667C1.66699 13.5076 3.15938 15 5.00033 15L15.0003 15C16.8413 15 18.3337 13.5076 18.3337 11.6667L18.3337 5C18.3337 3.15905 16.8413 1.66667 15.0003 1.66667L5.00033 1.66667C3.15938 1.66667 1.66699 3.15905 1.66699 5L1.66699 11.6667Z" fill="currentColor"></path><path d="M5.83333 5C5.3731 5 5 5.3731 5 5.83333C5 6.29357 5.3731 6.66667 5.83333 6.66667H11.6667C12.1269 6.66667 12.5 6.29357 12.5 5.83333C12.5 5.3731 12.1269 5 11.6667 5H5.83333Z" fill="currentColor"></path><path d="M5.83333 8.33333C5.3731 8.33333 5 8.70643 5 9.16667C5 9.6269 5.3731 10 5.83333 10H7.5C7.96024 10 8.33333 9.6269 8.33333 9.16667C8.33333 8.70643 7.96024 8.33333 7.5 8.33333H5.83333Z" fill="currentColor"></path></svg> Deploy </a></li> */}
                                <li><Link to="/sidechain"><svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.66634 2.5C2.12658 2.5 2.49967 2.8731 2.49967 3.33333V15C2.49967 15.4602 2.87277 15.8333 3.33301 15.8333H18.333C18.7932 15.8333 19.1663 16.2064 19.1663 16.6667C19.1663 17.1269 18.7932 17.5 18.333 17.5H3.33301C1.9523 17.5 0.833008 16.3807 0.833008 15V3.33333C0.833008 2.8731 1.2061 2.5 1.66634 2.5Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17.0805 4.27596C17.4801 4.5043 17.6189 5.01334 17.3906 5.41294L14.7351 10.06C14.1439 11.0946 12.9045 11.5682 11.7739 11.1913L9.17267 10.3242C8.84146 10.2138 8.47653 10.3216 8.25843 10.5942L5.65108 13.8534C5.36357 14.2128 4.83916 14.2711 4.47978 13.9835C4.12039 13.696 4.06212 13.1716 4.34963 12.8122L6.95698 9.55306C7.61129 8.73518 8.70607 8.41187 9.69972 8.74309L12.301 9.61018C12.6778 9.7358 13.091 9.57796 13.288 9.23306L15.9435 4.58604C16.1718 4.18644 16.6809 4.04761 17.0805 4.27596Z" fill="currentColor"></path></svg> Polygon Edge</Link></li>

                                {/* <li><Link to="/dashboarduserdetails"><svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.66634 2.5C2.12658 2.5 2.49967 2.8731 2.49967 3.33333V15C2.49967 15.4602 2.87277 15.8333 3.33301 15.8333H18.333C18.7932 15.8333 19.1663 16.2064 19.1663 16.6667C19.1663 17.1269 18.7932 17.5 18.333 17.5H3.33301C1.9523 17.5 0.833008 16.3807 0.833008 15V3.33333C0.833008 2.8731 1.2061 2.5 1.66634 2.5Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17.0805 4.27596C17.4801 4.5043 17.6189 5.01334 17.3906 5.41294L14.7351 10.06C14.1439 11.0946 12.9045 11.5682 11.7739 11.1913L9.17267 10.3242C8.84146 10.2138 8.47653 10.3216 8.25843 10.5942L5.65108 13.8534C5.36357 14.2128 4.83916 14.2711 4.47978 13.9835C4.12039 13.696 4.06212 13.1716 4.34963 12.8122L6.95698 9.55306C7.61129 8.73518 8.70607 8.41187 9.69972 8.74309L12.301 9.61018C12.6778 9.7358 13.091 9.57796 13.288 9.23306L15.9435 4.58604C16.1718 4.18644 16.6809 4.04761 17.0805 4.27596Z" fill="currentColor"></path></svg> Dashboard</Link></li> */}

                                <li><Link disabled to="/launchpad"><img src={multi} alt="Kyc" /> Multi tenant controller </Link></li>
                                {/*  */}
                                <Dropdown>
                        {device > 1199 && activeClass ? (
                            <Dropdown.Toggle onClick={handleSide} variant='transparent' className={`noarrow`} id="dropdown-basic">
                                <img src={StableSwap}/>
                            </Dropdown.Toggle>
                        ):(
                            <Dropdown.Toggle variant='transparent' disabled className={`noarrow`} id="dropdown-basic">
                                <img src={StableSwap}/> Transmuter
                            </Dropdown.Toggle>
                        )}

                        {device > 1199 && activeClass ? null : (
                            <Dropdown.Menu show={location === "/dashboardAMM" || location === "/stableswap" || location === "/liquidity" || location === "/viewkyc" || location ===  "/dashboardd" ? true : false} as="ul" className={`list-unstyled position-relative mb-0 p-0 ${location === "/dashboardAMM" || location === "/stableswap" || location === "/liquidity" || location === "/viewkyc" || location ===  "/dashboardd" ? 'd-block' : ''}`} style={{minWidth: 'auto'}}>
                                <li><Link disabled to="/dashboardAMM"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49967 15H9.16634V16.6667H10.833V15H12.4997V16.6667H13.333C13.7932 16.6667 14.1663 17.0398 14.1663 17.5C14.1663 17.9602 13.7932 18.3333 13.333 18.3333H6.66634C6.2061 18.3333 5.83301 17.9602 5.83301 17.5C5.83301 17.0398 6.2061 16.6667 6.66634 16.6667H7.49967V15Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3.33366 5L3.33366 11.6667C3.33366 12.5871 4.07985 13.3333 5.00033 13.3333L15.0003 13.3333C15.9208 13.3333 16.667 12.5871 16.667 11.6667L16.667 5C16.667 4.07953 15.9208 3.33333 15.0003 3.33333L5.00033 3.33333C4.07985 3.33333 3.33366 4.07953 3.33366 5ZM1.66699 11.6667C1.66699 13.5076 3.15938 15 5.00033 15L15.0003 15C16.8413 15 18.3337 13.5076 18.3337 11.6667L18.3337 5C18.3337 3.15905 16.8413 1.66667 15.0003 1.66667L5.00033 1.66667C3.15938 1.66667 1.66699 3.15905 1.66699 5L1.66699 11.6667Z" fill="currentColor"></path><path d="M5.83333 5C5.3731 5 5 5.3731 5 5.83333C5 6.29357 5.3731 6.66667 5.83333 6.66667H11.6667C12.1269 6.66667 12.5 6.29357 12.5 5.83333C12.5 5.3731 12.1269 5 11.6667 5H5.83333Z" fill="currentColor"></path><path d="M5.83333 8.33333C5.3731 8.33333 5 8.70643 5 9.16667C5 9.6269 5.3731 10 5.83333 10H7.5C7.96024 10 8.33333 9.6269 8.33333 9.16667C8.33333 8.70643 7.96024 8.33333 7.5 8.33333H5.83333Z" fill="currentColor"></path></svg> Dashboard </Link></li>
                                <li><Link disabled to="/stableswap"><img src={StableSwap} alt="GenerateDid" /> Public bridge </Link></li>
                                <li><Link disabled to="/liquidity"><svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.66634 2.5C2.12658 2.5 2.49967 2.8731 2.49967 3.33333V15C2.49967 15.4602 2.87277 15.8333 3.33301 15.8333H18.333C18.7932 15.8333 19.1663 16.2064 19.1663 16.6667C19.1663 17.1269 18.7932 17.5 18.333 17.5H3.33301C1.9523 17.5 0.833008 16.3807 0.833008 15V3.33333C0.833008 2.8731 1.2061 2.5 1.66634 2.5Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17.0805 4.27596C17.4801 4.5043 17.6189 5.01334 17.3906 5.41294L14.7351 10.06C14.1439 11.0946 12.9045 11.5682 11.7739 11.1913L9.17267 10.3242C8.84146 10.2138 8.47653 10.3216 8.25843 10.5942L5.65108 13.8534C5.36357 14.2128 4.83916 14.2711 4.47978 13.9835C4.12039 13.696 4.06212 13.1716 4.34963 12.8122L6.95698 9.55306C7.61129 8.73518 8.70607 8.41187 9.69972 8.74309L12.301 9.61018C12.6778 9.7358 13.091 9.57796 13.288 9.23306L15.9435 4.58604C16.1718 4.18644 16.6809 4.04761 17.0805 4.27596Z" fill="currentColor"></path></svg> Liquidity </Link></li>
                                {/* <li><Link to="/viewkyc"><img src={Auction} alt="Auction" /> View DID</Link></li>  */}
                            </Dropdown.Menu>
                        )}
                    </Dropdown>
                                {/*  */}
                                {/* <li><Link disabled to="/launchpad"><img src={StableSwap} alt="GenerateDid" /> Transmuter </Link></li> */}
                                <li><Link disabled to="/launchpad"><img src={second} alt="Particiapte" /> Secondary regulators </Link></li> 
                                <li><Link disabled to="/launchpad"><img src={global} alt="Kyc" /> Global regulators </Link></li>
                                <li><Link disabled to="/launchpad"><img src={region} alt="GenerateDid" /> Regional regulators </Link></li>
                                <li><Link disabled to="/launchpad"><img src={node} alt="Particiapte" /> Nodes </Link></li> 
                                {/* <li><Link to="/viewkyc"><img src={Auction} alt="Auction" /> View DID</Link></li>  */}
                            </Dropdown.Menu>
                        )}
                    </Dropdown>
                </li>

                <li>
                    <Dropdown>
                        {device > 1199 && activeClass ? (
                            <Dropdown.Toggle onClick={handleSide} variant='transparent' className={`noarrow`} id="dropdown-basic">
                                <img src={multisig}/>
                            </Dropdown.Toggle>
                        ):(
                            <Dropdown.Toggle variant='transparent' className={`noarrow`} id="dropdown-basic">
                                {/* <svg width="24" height="24" className='ms-0' fill='currentColor' viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g id="sprout" transform="translate(-49.874 -14.287)"><path id="Path_5" data-name="Path 5" d="M123.9,42.355V35.841c3.63-.24,10.153-1.326,14.655-5.828,6.4-6.4,5.9-16.892,5.874-17.335a2.556,2.556,0,0,0-2.411-2.411c-.443-.025-10.936-.526-17.335,5.874a16.521,16.521,0,0,0-1.816,2.165,23.98,23.98,0,0,0-5.993-11.27C109.231-.609,96.652-.008,96.121.022A2.556,2.556,0,0,0,93.71,2.433c-.029.532-.631,13.11,7.013,20.754,5.6,5.6,13.847,6.775,18.067,6.991V42.355a22.731,22.731,0,0,1,5.112,0Z" transform="translate(-20.875 22)"></path><path id="Path_6" data-name="Path 6" d="M130.26,344.721a16.633,16.633,0,0,0-5.217.837,23.327,23.327,0,0,0-42.912,0,16.66,16.66,0,0,0-21.874,15.82v6.669a3.32,3.32,0,0,0,3.32,3.32H143.6a3.32,3.32,0,0,0,3.32-3.32v-6.669a16.676,16.676,0,0,0-16.657-16.657Z" transform="translate(-3.116 -264.181)"></path></g></svg> */}
                                <img src={multisig}/> Multisig
                            </Dropdown.Toggle>
                        )}
                        {/* ${location === "/launchpad" ? 'd-block' : ''} */}
                        {/* href="#" */}
                        {/* <Badge className='badge2'>Upcoming</Badge> */}
                        {device > 1199 && activeClass ? null : (
                            <Dropdown.Menu show={location === "/create-multisig" || location === "/launchpad" || location === "/launchpad" || location === "/viewkyc" || location ===  "/dashboardd" ? true : false} as="ul" className={`list-unstyled position-relative mb-0 p-0 ${location === "/create-multisig" || location === "/launchpad" || location === "/launchpad" || location === "/viewkyc" || location ===  "/dashboardd" ? 'd-block' : ''}`} style={{minWidth: 'auto'}}>
                                {/* <li><Link disabled to="/launchpad"><svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.66634 2.5C2.12658 2.5 2.49967 2.8731 2.49967 3.33333V15C2.49967 15.4602 2.87277 15.8333 3.33301 15.8333H18.333C18.7932 15.8333 19.1663 16.2064 19.1663 16.6667C19.1663 17.1269 18.7932 17.5 18.333 17.5H3.33301C1.9523 17.5 0.833008 16.3807 0.833008 15V3.33333C0.833008 2.8731 1.2061 2.5 1.66634 2.5Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17.0805 4.27596C17.4801 4.5043 17.6189 5.01334 17.3906 5.41294L14.7351 10.06C14.1439 11.0946 12.9045 11.5682 11.7739 11.1913L9.17267 10.3242C8.84146 10.2138 8.47653 10.3216 8.25843 10.5942L5.65108 13.8534C5.36357 14.2128 4.83916 14.2711 4.47978 13.9835C4.12039 13.696 4.06212 13.1716 4.34963 12.8122L6.95698 9.55306C7.61129 8.73518 8.70607 8.41187 9.69972 8.74309L12.301 9.61018C12.6778 9.7358 13.091 9.57796 13.288 9.23306L15.9435 4.58604C16.1718 4.18644 16.6809 4.04761 17.0805 4.27596Z" fill="currentColor"></path></svg> Configuration</Link></li>
                                <li><Link disabled to="/launchpad"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49967 15H9.16634V16.6667H10.833V15H12.4997V16.6667H13.333C13.7932 16.6667 14.1663 17.0398 14.1663 17.5C14.1663 17.9602 13.7932 18.3333 13.333 18.3333H6.66634C6.2061 18.3333 5.83301 17.9602 5.83301 17.5C5.83301 17.0398 6.2061 16.6667 6.66634 16.6667H7.49967V15Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3.33366 5L3.33366 11.6667C3.33366 12.5871 4.07985 13.3333 5.00033 13.3333L15.0003 13.3333C15.9208 13.3333 16.667 12.5871 16.667 11.6667L16.667 5C16.667 4.07953 15.9208 3.33333 15.0003 3.33333L5.00033 3.33333C4.07985 3.33333 3.33366 4.07953 3.33366 5ZM1.66699 11.6667C1.66699 13.5076 3.15938 15 5.00033 15L15.0003 15C16.8413 15 18.3337 13.5076 18.3337 11.6667L18.3337 5C18.3337 3.15905 16.8413 1.66667 15.0003 1.66667L5.00033 1.66667C3.15938 1.66667 1.66699 3.15905 1.66699 5L1.66699 11.6667Z" fill="currentColor"></path><path d="M5.83333 5C5.3731 5 5 5.3731 5 5.83333C5 6.29357 5.3731 6.66667 5.83333 6.66667H11.6667C12.1269 6.66667 12.5 6.29357 12.5 5.83333C12.5 5.3731 12.1269 5 11.6667 5H5.83333Z" fill="currentColor"></path><path d="M5.83333 8.33333C5.3731 8.33333 5 8.70643 5 9.16667C5 9.6269 5.3731 10 5.83333 10H7.5C7.96024 10 8.33333 9.6269 8.33333 9.16667C8.33333 8.70643 7.96024 8.33333 7.5 8.33333H5.83333Z" fill="currentColor"></path></svg> Deploy </Link></li> */}
                                <li><Link to="/create-multisig"><img src={multi} alt="multisig" /> Create Multisig </Link></li>
                                <li><Link to="/multisig-wallets"><img src={addressbook} alt="multisig" />Multisigwallets </Link></li>
                                <li><Link to="/multisig-transaction"><img src={transaction} alt="multisig" />Transaction </Link></li>

                                {/* <li><Link disabled to="/launchpad"><img src={StableSwap} alt="GenerateDid" /> Transmuter </Link></li> */}
                                {/* <li><Link disabled to="/launchpad"><img src={second} alt="Particiapte" /> Secondary regulators </Link></li> 
                                <li><Link disabled to="/launchpad"><img src={global} alt="Kyc" /> Global regulators </Link></li>
                                <li><Link disabled to="/launchpad"><img src={region} alt="GenerateDid" /> Regional regulators </Link></li>
                                <li><Link disabled to="/launchpad"><img src={node} alt="Particiapte" /> Nodes </Link></li>  */}
                                {/* <li><Link to="/viewkyc"><img src={Auction} alt="Auction" /> View DID</Link></li>  */}
                            </Dropdown.Menu>
                        )}
                    </Dropdown>
                </li>

                <li>
                    <Dropdown>
                        {device > 1199 && activeClass ? (
                            <Dropdown.Toggle onClick={handleSide} variant='transparent' className={`noarrow`} id="dropdown-basic">
                                <img src={GenerateDid}/>
                            </Dropdown.Toggle>
                        ):(
                            <Dropdown.Toggle variant='transparent' className={`noarrow`} id="dropdown-basic">
                                {/* <svg width="24" height="24" className='ms-0' fill='currentColor' viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g id="sprout" transform="translate(-49.874 -14.287)"><path id="Path_5" data-name="Path 5" d="M123.9,42.355V35.841c3.63-.24,10.153-1.326,14.655-5.828,6.4-6.4,5.9-16.892,5.874-17.335a2.556,2.556,0,0,0-2.411-2.411c-.443-.025-10.936-.526-17.335,5.874a16.521,16.521,0,0,0-1.816,2.165,23.98,23.98,0,0,0-5.993-11.27C109.231-.609,96.652-.008,96.121.022A2.556,2.556,0,0,0,93.71,2.433c-.029.532-.631,13.11,7.013,20.754,5.6,5.6,13.847,6.775,18.067,6.991V42.355a22.731,22.731,0,0,1,5.112,0Z" transform="translate(-20.875 22)"></path><path id="Path_6" data-name="Path 6" d="M130.26,344.721a16.633,16.633,0,0,0-5.217.837,23.327,23.327,0,0,0-42.912,0,16.66,16.66,0,0,0-21.874,15.82v6.669a3.32,3.32,0,0,0,3.32,3.32H143.6a3.32,3.32,0,0,0,3.32-3.32v-6.669a16.676,16.676,0,0,0-16.657-16.657Z" transform="translate(-3.116 -264.181)"></path></g></svg> */}
                                <img src={GenerateDid}/>IPFS
                            </Dropdown.Toggle>
                        )}
                        {/* ${location === "/launchpad" ? 'd-block' : ''} */}
                        {/* href="#" */}
                        {/* <Badge className='badge2'>Upcoming</Badge> */}
                        {device > 1199 && activeClass ? null : (
                            <Dropdown.Menu show={location === "/create-multisig" || location === "/launchpad" || location === "/launchpad" || location === "/viewkyc" || location ===  "/dashboardd" ? true : false} as="ul" className={`list-unstyled position-relative mb-0 p-0 ${location === "/create-multisig" || location === "/launchpad" || location === "/launchpad" || location === "/viewkyc" || location ===  "/dashboardd" ? 'd-block' : ''}`} style={{minWidth: 'auto'}}>
                                {/* <li><Link disabled to="/launchpad"><svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.66634 2.5C2.12658 2.5 2.49967 2.8731 2.49967 3.33333V15C2.49967 15.4602 2.87277 15.8333 3.33301 15.8333H18.333C18.7932 15.8333 19.1663 16.2064 19.1663 16.6667C19.1663 17.1269 18.7932 17.5 18.333 17.5H3.33301C1.9523 17.5 0.833008 16.3807 0.833008 15V3.33333C0.833008 2.8731 1.2061 2.5 1.66634 2.5Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17.0805 4.27596C17.4801 4.5043 17.6189 5.01334 17.3906 5.41294L14.7351 10.06C14.1439 11.0946 12.9045 11.5682 11.7739 11.1913L9.17267 10.3242C8.84146 10.2138 8.47653 10.3216 8.25843 10.5942L5.65108 13.8534C5.36357 14.2128 4.83916 14.2711 4.47978 13.9835C4.12039 13.696 4.06212 13.1716 4.34963 12.8122L6.95698 9.55306C7.61129 8.73518 8.70607 8.41187 9.69972 8.74309L12.301 9.61018C12.6778 9.7358 13.091 9.57796 13.288 9.23306L15.9435 4.58604C16.1718 4.18644 16.6809 4.04761 17.0805 4.27596Z" fill="currentColor"></path></svg> Configuration</Link></li>
                                <li><Link disabled to="/launchpad"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49967 15H9.16634V16.6667H10.833V15H12.4997V16.6667H13.333C13.7932 16.6667 14.1663 17.0398 14.1663 17.5C14.1663 17.9602 13.7932 18.3333 13.333 18.3333H6.66634C6.2061 18.3333 5.83301 17.9602 5.83301 17.5C5.83301 17.0398 6.2061 16.6667 6.66634 16.6667H7.49967V15Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3.33366 5L3.33366 11.6667C3.33366 12.5871 4.07985 13.3333 5.00033 13.3333L15.0003 13.3333C15.9208 13.3333 16.667 12.5871 16.667 11.6667L16.667 5C16.667 4.07953 15.9208 3.33333 15.0003 3.33333L5.00033 3.33333C4.07985 3.33333 3.33366 4.07953 3.33366 5ZM1.66699 11.6667C1.66699 13.5076 3.15938 15 5.00033 15L15.0003 15C16.8413 15 18.3337 13.5076 18.3337 11.6667L18.3337 5C18.3337 3.15905 16.8413 1.66667 15.0003 1.66667L5.00033 1.66667C3.15938 1.66667 1.66699 3.15905 1.66699 5L1.66699 11.6667Z" fill="currentColor"></path><path d="M5.83333 5C5.3731 5 5 5.3731 5 5.83333C5 6.29357 5.3731 6.66667 5.83333 6.66667H11.6667C12.1269 6.66667 12.5 6.29357 12.5 5.83333C12.5 5.3731 12.1269 5 11.6667 5H5.83333Z" fill="currentColor"></path><path d="M5.83333 8.33333C5.3731 8.33333 5 8.70643 5 9.16667C5 9.6269 5.3731 10 5.83333 10H7.5C7.96024 10 8.33333 9.6269 8.33333 9.16667C8.33333 8.70643 7.96024 8.33333 7.5 8.33333H5.83333Z" fill="currentColor"></path></svg> Deploy </Link></li> */}
                                <li><Link to="/uploadkyc"><img src={create} alt="multisig" /> Upload </Link></li>
                                <li><Link to="/viewkycdetails"><img src={Kyc} alt="multisig" />Reports </Link></li>
                                {/* <li><Link to="/multisig-transaction"><img src={transaction} alt="multisig" />Pin </Link></li> */}

                                {/* <li><Link disabled to="/launchpad"><img src={StableSwap} alt="GenerateDid" /> Transmuter </Link></li> */}
                                {/* <li><Link disabled to="/launchpad"><img src={second} alt="Particiapte" /> Secondary regulators </Link></li> 
                                <li><Link disabled to="/launchpad"><img src={global} alt="Kyc" /> Global regulators </Link></li>
                                <li><Link disabled to="/launchpad"><img src={region} alt="GenerateDid" /> Regional regulators </Link></li>
                                <li><Link disabled to="/launchpad"><img src={node} alt="Particiapte" /> Nodes </Link></li>  */}
                                {/* <li><Link to="/viewkyc"><img src={Auction} alt="Auction" /> View DID</Link></li>  */}
                            </Dropdown.Menu>
                        )}
                    </Dropdown>
                </li>


                {/* <li>
                    <Dropdown>
                        {device > 1199 && activeClass ? (
                            <Dropdown.Toggle disabled onClick={handleSide} variant='transparent' className='noarrow' id="dropdown-basic">
                                <img src={RiskFreeLending} alt="RiskFreeLending" />
                            </Dropdown.Toggle>
                        ):(
                            <Dropdown.Toggle  variant='transparent' className='noarrow' id="dropdown-basic">
                                <img src={RiskFreeLending} alt="RiskFreeLending" /> Risk-Free Lending <Badge className='badge2'>Upcoming</Badge>
                            </Dropdown.Toggle>
                        )}
                          {device > 1199 && activeClass ? null : (
                            <Dropdown.Menu show={location === "/market" || location === '/deposit' || location === '/borrow' || location === '/vault' ? true : false} as="ul" className={`list-unstyled position-relative mb-0 p-0  ${location === "/market" || location === '/deposit' ? 'd-block' : ''}`} style={{minWidth: 'auto'}}>
                                <li><Link to="/market"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.66634 2.5C2.12658 2.5 2.49967 2.8731 2.49967 3.33333V15C2.49967 15.4602 2.87277 15.8333 3.33301 15.8333H18.333C18.7932 15.8333 19.1663 16.2064 19.1663 16.6667C19.1663 17.1269 18.7932 17.5 18.333 17.5H3.33301C1.9523 17.5 0.833008 16.3807 0.833008 15V3.33333C0.833008 2.8731 1.2061 2.5 1.66634 2.5Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17.0805 4.27596C17.4801 4.5043 17.6189 5.01334 17.3906 5.41294L14.7351 10.06C14.1439 11.0946 12.9045 11.5682 11.7739 11.1913L9.17267 10.3242C8.84146 10.2138 8.47653 10.3216 8.25843 10.5942L5.65108 13.8534C5.36357 14.2128 4.83916 14.2711 4.47978 13.9835C4.12039 13.696 4.06212 13.1716 4.34963 12.8122L6.95698 9.55306C7.61129 8.73518 8.70607 8.41187 9.69972 8.74309L12.301 9.61018C12.6778 9.7358 13.091 9.57796 13.288 9.23306L15.9435 4.58604C16.1718 4.18644 16.6809 4.04761 17.0805 4.27596Z" fill="currentColor"></path></svg> 
                                Market</Link></li>
                                <li><Link to="/deposit"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1508_43789)"><path fill-rule="evenodd" clip-rule="evenodd" d="M19 20C19.5523 20 20 19.5523 20 19C20 18.4477 19.5523 18 19 18L18 18L18 4C18 1.79086 16.2091 -3.31408e-07 14 -5.24537e-07L6 -1.22392e-06C3.79086 -1.41705e-06 2 1.79086 2 4L2 18L1 18C0.447716 18 1.35705e-07 18.4477 8.74228e-08 19C3.91405e-08 19.5523 0.447716 20 1 20L19 20ZM4 18L16 18L16 4C16 2.89543 15.1046 2 14 2L6 2C4.89543 2 4 2.89543 4 4L4 18Z" fill="currentColor"></path><path d="M9.29289 14.7071C9.68342 15.0976 10.3166 15.0976 10.7071 14.7071L13.7071 11.7071C14.0976 11.3166 14.0976 10.6834 13.7071 10.2929C13.3166 9.90237 12.6834 9.90237 12.2929 10.2929L11 11.5858L11 6C11 5.44772 10.5523 5 10 5C9.44772 5 9 5.44772 9 6L9 11.5858L7.70711 10.2929C7.31658 9.90237 6.68342 9.90237 6.29289 10.2929C5.90237 10.6834 5.90237 11.3166 6.29289 11.7071L9.29289 14.7071Z" fill="currentColor"></path></g><defs><clipPath id="clip0_1508_43789"><rect width="20" height="20" fill="white" transform="translate(20 20) rotate(-180)"></rect></clipPath></defs></svg> Deposit</Link></li>
                                <li><Link to="#"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49967 15H9.16634V16.6667H10.833V15H12.4997V16.6667H13.333C13.7932 16.6667 14.1663 17.0398 14.1663 17.5C14.1663 17.9602 13.7932 18.3333 13.333 18.3333H6.66634C6.2061 18.3333 5.83301 17.9602 5.83301 17.5C5.83301 17.0398 6.2061 16.6667 6.66634 16.6667H7.49967V15Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3.33366 5L3.33366 11.6667C3.33366 12.5871 4.07985 13.3333 5.00033 13.3333L15.0003 13.3333C15.9208 13.3333 16.667 12.5871 16.667 11.6667L16.667 5C16.667 4.07953 15.9208 3.33333 15.0003 3.33333L5.00033 3.33333C4.07985 3.33333 3.33366 4.07953 3.33366 5ZM1.66699 11.6667C1.66699 13.5076 3.15938 15 5.00033 15L15.0003 15C16.8413 15 18.3337 13.5076 18.3337 11.6667L18.3337 5C18.3337 3.15905 16.8413 1.66667 15.0003 1.66667L5.00033 1.66667C3.15938 1.66667 1.66699 3.15905 1.66699 5L1.66699 11.6667Z" fill="currentColor"></path><path d="M5.83333 5C5.3731 5 5 5.3731 5 5.83333C5 6.29357 5.3731 6.66667 5.83333 6.66667H11.6667C12.1269 6.66667 12.5 6.29357 12.5 5.83333C12.5 5.3731 12.1269 5 11.6667 5H5.83333Z" fill="currentColor"></path><path d="M5.83333 8.33333C5.3731 8.33333 5 8.70643 5 9.16667C5 9.6269 5.3731 10 5.83333 10H7.5C7.96024 10 8.33333 9.6269 8.33333 9.16667C8.33333 8.70643 7.96024 8.33333 7.5 8.33333H5.83333Z" fill="currentColor"></path></svg> Dashboard <Badge>Upcoming</Badge></Link></li>
                                <li><Link to="#"><img src={Lend} alt="Lend" /> Lend<Badge>Upcoming</Badge></Link></li>
                                <li><Link to="/borrow"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1519_70814)"><path fill-rule="evenodd" clip-rule="evenodd" d="M19 20C19.5523 20 20 19.5523 20 19C20 18.4477 19.5523 18 19 18L18 18L18 4C18 1.79086 16.2091 -3.31408e-07 14 -5.24537e-07L6 -1.22392e-06C3.79086 -1.41705e-06 2 1.79086 2 4L2 18L1 18C0.447716 18 1.35705e-07 18.4477 8.74228e-08 19C3.91405e-08 19.5523 0.447716 20 1 20L19 20ZM4 18L16 18L16 4C16 2.89543 15.1046 2 14 2L6 2C4.89543 2 4 2.89543 4 4L4 18Z" fill="currentColor"></path><path d="M10.7071 5.29289C10.3166 4.90237 9.68342 4.90237 9.29289 5.29289L6.29289 8.29289C5.90237 8.68342 5.90237 9.31658 6.29289 9.70711C6.68342 10.0976 7.31658 10.0976 7.70711 9.70711L9 8.41421V14C9 14.5523 9.44772 15 10 15C10.5523 15 11 14.5523 11 14V8.41421L12.2929 9.70711C12.6834 10.0976 13.3166 10.0976 13.7071 9.70711C14.0976 9.31658 14.0976 8.68342 13.7071 8.29289L10.7071 5.29289Z" fill="currentColor"></path></g><defs><clipPath id="clip0_1519_70814"><rect width="24" height="24" fill="white" transform="translate(20 20) rotate(-180)"></rect></clipPath></defs></svg> Borrowed</Link></li>
                                <li><Link to="#"><svg width="20" height="20" focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-testid="SavingsIcon"><path d="M19.83 7.5l-2.27-2.27c.07-.42.18-.81.32-1.15.08-.18.12-.37.12-.58 0-.83-.67-1.5-1.5-1.5-1.64 0-3.09.79-4 2h-5C4.46 4 2 6.46 2 9.5S4.5 21 4.5 21H10v-2h2v2h5.5l1.68-5.59 2.82-.94V7.5h-2.17zM13 9H8V7h5v2zm3 2c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path></svg> Vault<Badge>Upcoming</Badge></Link></li>
                            </Dropdown.Menu>
                        )}
                    </Dropdown>
                </li> */}

                {/* <li>
                    <Dropdown>
                        {device > 1199 && activeClass ? (
                            <Dropdown.Toggle onClick={handleSide} variant='transparent' className={`noarrow`} id="dropdown-basic">
                                <img src={NftMarketplace} alt="NftMarketplace" />
                            </Dropdown.Toggle>
                        ):(
                            <Dropdown.Toggle variant='transparent' className={`noarrow`} id="dropdown-basic">
                                <img src={NftMarketplace} alt="NftMarketplace" /> NFT Market<Badge className='badge1'>New!</Badge>
                            </Dropdown.Toggle>
                        )}
                        {/* ${location === "/hot-collections" || location === "/genesis-market" || location === "/my-NFT" ? 'd-block' : ''} 
                        {device > 1199 && activeClass ? null : (
                            <Dropdown.Menu show={location === "/hot-collections" || location === "/genesis-market" || location === "/my-NFT" || location === "/top-collections" || location === "/top-categories" || location === "/NFT-details"  || location === "/my-NFTcopyy" || location === "/my-NFTcopy" ? true : false} as="ul" className={`list-unstyled position-relative mb-0 p-0 ${location === "/hot-collections" || location === "/genesis-market" || location === "/my-NFT"|| location === "/top-collections" || location === "/top-categories" || location === "/my-NFTcopy" || location === "/my-NFTcopyy" ? 'd-block' : ''}`} style={{minWidth: 'auto'}}>
                                <li><Link to="/hot-collections" activeClassName='active'><img src={HotCollections} alt="HotCollections" /> Premium Listings<Badge className='badge1'>New!</Badge></Link></li>
                                <li><Link to="/top-collections" activeClassName='active'><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.66634 2.5C2.12658 2.5 2.49967 2.8731 2.49967 3.33333V15C2.49967 15.4602 2.87277 15.8333 3.33301 15.8333H18.333C18.7932 15.8333 19.1663 16.2064 19.1663 16.6667C19.1663 17.1269 18.7932 17.5 18.333 17.5H3.33301C1.9523 17.5 0.833008 16.3807 0.833008 15V3.33333C0.833008 2.8731 1.2061 2.5 1.66634 2.5Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17.0805 4.27596C17.4801 4.5043 17.6189 5.01334 17.3906 5.41294L14.7351 10.06C14.1439 11.0946 12.9045 11.5682 11.7739 11.1913L9.17267 10.3242C8.84146 10.2138 8.47653 10.3216 8.25843 10.5942L5.65108 13.8534C5.36357 14.2128 4.83916 14.2711 4.47978 13.9835C4.12039 13.696 4.06212 13.1716 4.34963 12.8122L6.95698 9.55306C7.61129 8.73518 8.70607 8.41187 9.69972 8.74309L12.301 9.61018C12.6778 9.7358 13.091 9.57796 13.288 9.23306L15.9435 4.58604C16.1718 4.18644 16.6809 4.04761 17.0805 4.27596Z" fill="currentColor"></path></svg> Hot NFTs<Badge className='badge1'>New!</Badge></Link></li>
                                <li><Link to="/top-categories" activeClassName='active'>
                                    {/* <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.66634 2.5C2.12658 2.5 2.49967 2.8731 2.49967 3.33333V15C2.49967 15.4602 2.87277 15.8333 3.33301 15.8333H18.333C18.7932 15.8333 19.1663 16.2064 19.1663 16.6667C19.1663 17.1269 18.7932 17.5 18.333 17.5H3.33301C1.9523 17.5 0.833008 16.3807 0.833008 15V3.33333C0.833008 2.8731 1.2061 2.5 1.66634 2.5Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17.0805 4.27596C17.4801 4.5043 17.6189 5.01334 17.3906 5.41294L14.7351 10.06C14.1439 11.0946 12.9045 11.5682 11.7739 11.1913L9.17267 10.3242C8.84146 10.2138 8.47653 10.3216 8.25843 10.5942L5.65108 13.8534C5.36357 14.2128 4.83916 14.2711 4.47978 13.9835C4.12039 13.696 4.06212 13.1716 4.34963 12.8122L6.95698 9.55306C7.61129 8.73518 8.70607 8.41187 9.69972 8.74309L12.301 9.61018C12.6778 9.7358 13.091 9.57796 13.288 9.23306L15.9435 4.58604C16.1718 4.18644 16.6809 4.04761 17.0805 4.27596Z" fill="currentColor">
                                            </path>
                                    </svg>  
                                    <img src={Kyc} alt="Kyc" />
                                    Top Artists<Badge className='badge1'>New!</Badge></Link></li>
                                <li><Link to="/genesis-market" activeClassName='active'><img src={GenesisMarket} alt="GenesisMarket" /> Genesis Market<Badge className='badge1'>New!</Badge></Link></li>
                                <li><Link to="/my-NFT" activeClassName='active'><img src={MyNFT} alt="MyNFT" /> My Profile<Badge className='badge1'>New!</Badge></Link></li>
                                <li><a   href="#" disabled><img src={Auction} alt="Auction" /> Auction <Badge className='badge2'>Upcoming</Badge></a></li>
                            </Dropdown.Menu>
                        )}
                    </Dropdown>
                </li> */}
                
                {/* <li><Link to="/homePageNft" activeClassName='active'><svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.66634 2.5C2.12658 2.5 2.49967 2.8731 2.49967 3.33333V15C2.49967 15.4602 2.87277 15.8333 3.33301 15.8333H18.333C18.7932 15.8333 19.1663 16.2064 19.1663 16.6667C19.1663 17.1269 18.7932 17.5 18.333 17.5H3.33301C1.9523 17.5 0.833008 16.3807 0.833008 15V3.33333C0.833008 2.8731 1.2061 2.5 1.66634 2.5Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17.0805 4.27596C17.4801 4.5043 17.6189 5.01334 17.3906 5.41294L14.7351 10.06C14.1439 11.0946 12.9045 11.5682 11.7739 11.1913L9.17267 10.3242C8.84146 10.2138 8.47653 10.3216 8.25843 10.5942L5.65108 13.8534C5.36357 14.2128 4.83916 14.2711 4.47978 13.9835C4.12039 13.696 4.06212 13.1716 4.34963 12.8122L6.95698 9.55306C7.61129 8.73518 8.70607 8.41187 9.69972 8.74309L12.301 9.61018C12.6778 9.7358 13.091 9.57796 13.288 9.23306L15.9435 4.58604C16.1718 4.18644 16.6809 4.04761 17.0805 4.27596Z" fill="currentColor"></path></svg> NFT MARKETPLACE</Link></li> */}
                <li>
                    <Link to="/faucet" activeClassName='active'><img src={Faucet} alt="Faucet" /> {device > 1199 && activeClass ? '' : 'Faucet'}</Link>
                </li>
                <li><Link to="/analytics" activeClassName='active'><img src={Analytics} alt="Analytics" /> {device > 1199 && activeClass ? '' : 'Analytics'}</Link></li>
                <li><a href="#" disabled><img src={Saas} alt="Saas" /> {device > 1199 && activeClass ? '' : 'SaaS'} <Badge className='badge2'>Upcoming</Badge> </a></li>
                <li><Link to="/bridge"><svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="currentColor" stroke-width="0" width="20" height="20" viewBox="0 0 24 24"><path d="M24 18h-4v-14h-14v-4h-2v4h-4v2h4v14h14v4h2v-4h4v-2zm-18 0v-12h12v12h-12z"/></svg> {device > 1199 && activeClass ? '' : 'Bridge'}</Link></li>
                <li><Link to="/dashboarduserdetails"><img src={Account} alt="Account" /> {device > 1199 && activeClass ? '' : 'Account'}</Link></li>
                {/* <Badge className='badge2'> Upcoming </Badge> */}
                <li><a href="https://forms.gle/22EfArfhp9bjuVUs8" target="_blank" rel="noopener noreferrer">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.562 4.14787C11.5104 3.94967 12.4896 3.94967 13.438 4.14787L15.121 2.46387L16.536 3.87887L15.486 4.92887C16.7223 5.64066 17.7129 6.71175 18.326 7.99987H21V9.99987H18.93C18.976 10.3269 19 10.6599 19 10.9999V11.9999H21V13.9999H19V14.9999C19 15.3399 18.976 15.6729 18.93 15.9999H21V17.9999H18.326C17.7586 19.1975 16.8629 20.2095 15.7431 20.9181C14.6232 21.6267 13.3252 22.0029 12 22.0029C10.6748 22.0029 9.37677 21.6267 8.25692 20.9181C7.13707 20.2095 6.24138 19.1975 5.674 17.9999H3V15.9999H5.07C5.023 15.6686 4.99961 15.3344 5 14.9999V13.9999H3V11.9999H5V10.9999C5 10.6599 5.024 10.3269 5.07 9.99987H3V7.99987H5.674C6.28697 6.71138 7.27751 5.63993 8.514 4.92787L7.464 3.87787L8.88 2.46487L10.563 4.14887L10.562 4.14787ZM12 5.99987C10.6739 5.99987 9.40215 6.52665 8.46447 7.46433C7.52678 8.40202 7 9.67379 7 10.9999V14.9999C7 16.3259 7.52678 17.5977 8.46447 18.5354C9.40215 19.4731 10.6739 19.9999 12 19.9999C13.3261 19.9999 14.5979 19.4731 15.5355 18.5354C16.4732 17.5977 17 16.3259 17 14.9999V10.9999C17 9.67379 16.4732 8.40202 15.5355 7.46433C14.5979 6.52665 13.3261 5.99987 12 5.99987ZM9 13.9999H15V15.9999H9V13.9999ZM9 9.99987H15V11.9999H9V9.99987Z" />
                </svg>
                {device > 1199 && activeClass ? '' : 'Report a Bug'}</a></li>
            </ul>
            
            {device > 1199 && activeClass ? null : (<>
                <hr />
                <div className="d-flex side-social align-items-center justify-content-around">
                    {/* <a href="https://www.reddit.com/r/ElementFi/" target="_blank" rel="noopener noreferrer">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 16C3.5816 16 0 12.4184 0 8C0 3.5816 3.5816 0 8 0C12.4184 0 16 3.5816 16 8C16 12.4184 12.4184 16 8 16ZM13.336 8C13.3278 7.77482 13.2546 7.55682 13.1252 7.3723C12.9959 7.18777 12.816 7.0446 12.6071 6.96004C12.3982 6.87548 12.1694 6.85314 11.9481 6.89571C11.7268 6.93829 11.5226 7.04397 11.36 7.2C10.4499 6.58137 9.38016 6.2396 8.28 6.216L8.8 3.72L10.512 4.08C10.5324 4.26919 10.6195 4.44492 10.7577 4.57567C10.896 4.70641 11.0763 4.7836 11.2663 4.79338C11.4563 4.80315 11.6436 4.74488 11.7946 4.62901C11.9455 4.51315 12.0502 4.34728 12.0898 4.16118C12.1295 3.97508 12.1015 3.78094 12.011 3.6136C11.9204 3.44627 11.7731 3.3167 11.5956 3.24815C11.4181 3.1796 11.222 3.17656 11.0425 3.23958C10.8629 3.3026 10.7117 3.42755 10.616 3.592L8.656 3.2C8.62394 3.19297 8.59081 3.19237 8.55852 3.19823C8.52623 3.2041 8.49543 3.21632 8.4679 3.23418C8.44037 3.25204 8.41665 3.27518 8.39813 3.30227C8.37961 3.32937 8.36665 3.35986 8.36 3.392L7.768 6.168C6.65431 6.18479 5.56982 6.52682 4.648 7.152C4.52467 7.03596 4.37759 6.94813 4.21694 6.89458C4.0563 6.84104 3.88593 6.82307 3.71764 6.84191C3.54936 6.86075 3.38719 6.91597 3.24236 7.00372C3.09753 7.09146 2.97352 7.20966 2.87891 7.3501C2.78431 7.49054 2.72137 7.64987 2.69446 7.81706C2.66755 7.98424 2.67732 8.15528 2.72308 8.31831C2.76884 8.48134 2.84951 8.63248 2.95949 8.76124C3.06947 8.89 3.20613 8.99331 3.36 9.064C3.35099 9.18116 3.35099 9.29884 3.36 9.416C3.36 11.208 5.448 12.664 8.024 12.664C10.6 12.664 12.688 11.208 12.688 9.416C12.697 9.29884 12.697 9.18116 12.688 9.064C12.8854 8.96588 13.051 8.81389 13.1657 8.62561C13.2804 8.43732 13.3394 8.22043 13.336 8ZM5.336 8.8C5.336 8.58783 5.42029 8.38434 5.57031 8.23431C5.72034 8.08429 5.92383 8 6.136 8C6.34817 8 6.55166 8.08429 6.70169 8.23431C6.85171 8.38434 6.936 8.58783 6.936 8.8C6.936 9.01217 6.85171 9.21566 6.70169 9.36569C6.55166 9.51571 6.34817 9.6 6.136 9.6C5.92383 9.6 5.72034 9.51571 5.57031 9.36569C5.42029 9.21566 5.336 9.01217 5.336 8.8ZM9.984 11C9.41642 11.4277 8.71809 11.6454 8.008 11.616C7.29791 11.6454 6.59958 11.4277 6.032 11C5.99798 10.9586 5.9806 10.9059 5.98323 10.8524C5.98586 10.7988 6.00832 10.7481 6.04623 10.7102C6.08415 10.6723 6.13481 10.6499 6.18837 10.6472C6.24193 10.6446 6.29455 10.662 6.336 10.696C6.81698 11.0488 7.40409 11.2266 8 11.2C8.59664 11.2324 9.18649 11.0603 9.672 10.712C9.69246 10.6891 9.71742 10.6706 9.74532 10.6578C9.77322 10.6449 9.80346 10.6379 9.83418 10.6372C9.86489 10.6366 9.89541 10.6422 9.92385 10.6538C9.95229 10.6655 9.97803 10.6828 9.99948 10.7048C10.0209 10.7268 10.0376 10.753 10.0485 10.7817C10.0594 10.8104 10.0643 10.8411 10.0628 10.8718C10.0614 10.9025 10.0536 10.9325 10.0401 10.9601C10.0265 10.9876 10.0074 11.0121 9.984 11.032V11ZM9.84 9.632C9.68178 9.632 9.5271 9.58508 9.39554 9.49718C9.26398 9.40927 9.16145 9.28433 9.1009 9.13815C9.04035 8.99197 9.0245 8.83111 9.05537 8.67593C9.08624 8.52074 9.16243 8.3782 9.27431 8.26631C9.3862 8.15443 9.52874 8.07824 9.68393 8.04737C9.83911 8.0165 9.99997 8.03235 10.1461 8.0929C10.2923 8.15345 10.4173 8.25598 10.5052 8.38754C10.5931 8.5191 10.64 8.67377 10.64 8.832C10.6443 8.9404 10.6266 9.04854 10.5878 9.14987C10.5491 9.25119 10.4901 9.34357 10.4145 9.42139C10.339 9.49922 10.2484 9.56086 10.1482 9.60256C10.0481 9.64427 9.94048 9.66517 9.832 9.664L9.84 9.632Z" fill="currentColor"></path></svg>
                    </a>
                    <a href="https://medium.com/@elementdefi" target="_blank" rel="noopener noreferrer">
                        <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.068 4.99828C10.068 7.61208 7.96349 9.73109 5.3674 9.73109C2.77132 9.73109 0.666992 7.61272 0.666992 4.99828C0.666992 2.38383 2.77147 0.265625 5.3674 0.265625C7.96333 0.265625 10.068 2.38447 10.068 4.99828ZM15.2246 4.99828C15.2246 7.45885 14.1722 9.45336 12.8743 9.45336C11.5763 9.45336 10.524 7.45821 10.524 4.99828C10.524 2.53834 11.5763 0.54319 12.8743 0.54319C14.1722 0.54319 15.2246 2.53834 15.2246 4.99828ZM17.3337 4.99828C17.3337 7.20284 16.9635 8.98985 16.507 8.98985C16.0505 8.98985 15.6804 7.2022 15.6804 4.99828C15.6804 2.79436 16.0505 1.0067 16.5072 1.0067C16.9638 1.0067 17.3337 2.79388 17.3337 4.99828Z" fill="currentColor"></path></svg>
                    </a>
                    <a href="https://t.me/ElementDeFi" target="_blank" rel="noopener noreferrer">
                        <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.2712 0.677924L1.23028 5.32214C0.408471 5.65186 0.413345 6.11023 1.08049 6.31462L4.08353 7.25194L5.23257 10.7748C5.37226 11.1604 5.3034 11.3133 5.70829 11.3133C6.02076 11.3133 6.15937 11.1708 6.3334 11.0008C6.44407 10.8925 7.10115 10.2537 7.83484 9.54035L10.9586 11.8483C11.5334 12.1654 11.9484 12.0011 12.0915 11.3145L14.142 1.65177C14.352 0.810101 13.8212 0.428326 13.2712 0.677924ZM4.55483 7.03659L11.3237 2.76606C11.6616 2.56113 11.9714 2.67131 11.7171 2.89712L5.92113 8.12651L5.69546 10.5335L4.55483 7.03659Z" fill="currentColor"></path></svg>
                    </a>
                    <a href="https://twitter.com/ElementDeFi" target="_blank" rel="noopener noreferrer">
                        <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.4769 3.74036C14.4826 3.8861 14.4845 4.03178 14.4845 4.17752C14.4845 8.59602 11.3763 13.6969 5.69243 13.6969C3.94646 13.6969 2.32296 13.1405 0.955078 12.1932C1.19688 12.2197 1.44244 12.2396 1.69178 12.2396C3.13943 12.2396 4.47277 11.7029 5.5304 10.802C4.17822 10.7821 3.03643 9.80829 2.64265 8.48341C2.83169 8.52315 3.02637 8.54308 3.22546 8.54308C3.5062 8.54308 3.77877 8.50338 4.04004 8.42389C2.62505 8.11916 1.55926 6.76781 1.55926 5.14482C1.55926 5.12495 1.55926 5.11829 1.55926 5.10504C1.97629 5.35014 2.45359 5.50243 2.96043 5.5223C2.13015 4.91948 1.58437 3.89271 1.58437 2.73344C1.58437 2.12399 1.73636 1.54764 2.00391 1.0508C3.52755 3.07788 5.80549 4.40941 8.37357 4.54853C8.32082 4.30342 8.2938 4.04513 8.2938 3.78678C8.2938 1.93856 9.67738 0.441406 11.3844 0.441406C12.2731 0.441406 13.0757 0.845555 13.6391 1.49475C14.3444 1.34901 15.0051 1.07081 15.603 0.686588C15.3713 1.46827 14.882 2.12396 14.2427 2.53467C14.8682 2.45518 15.4648 2.27645 16.0182 2.01148C15.603 2.68054 15.0805 3.27003 14.4769 3.74036Z" fill="currentColor"></path></svg>
                    </a>
                    <a href="https://discord.com/invite/urquv6EWYs" target="_blank" rel="noopener noreferrer">
                        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.3712 10C11.3712 10 10.9346 9.4881 10.5707 9.0357C12.1596 8.59525 12.766 7.61905 12.766 7.61905C12.2688 7.9405 11.7957 8.1667 11.3712 8.32145C10.7648 8.57145 10.1826 8.7381 9.61253 8.83335C8.44813 9.04765 7.38077 8.9881 6.47112 8.82145C5.77974 8.6905 5.18542 8.5 4.68813 8.30955C4.40917 8.2024 4.10594 8.07145 3.80272 7.9048C3.76633 7.88095 3.72994 7.86905 3.69356 7.84525C3.6693 7.83335 3.65717 7.82145 3.64504 7.80955C3.42672 7.6905 3.30543 7.60715 3.30543 7.60715C3.30543 7.60715 3.88762 8.55955 5.428 9.0119C5.06413 9.4643 4.61536 10 4.61536 10C1.93485 9.91665 0.916016 8.1905 0.916016 8.1905C0.916016 4.3572 2.66259 1.25008 2.66259 1.25008C4.40917 -0.035615 6.07086 9.89305e-05 6.07086 9.89305e-05L6.19214 0.142955C4.00891 0.761995 3.0022 1.70247 3.0022 1.70247C3.0022 1.70247 3.26904 1.55961 3.71781 1.35723C5.01562 0.79771 6.04658 0.64295 6.47112 0.607235C6.54388 0.59533 6.60454 0.583425 6.6773 0.583425C7.41715 0.48819 8.25405 0.46438 9.12737 0.559615C10.2796 0.69057 11.5168 1.0239 12.7782 1.70247C12.7782 1.70247 11.82 0.809615 9.75804 0.190573L9.92784 9.89305e-05C9.92784 9.89305e-05 11.5895 -0.035615 13.3361 1.25008C13.3361 1.25008 15.0827 4.3572 15.0827 8.1905C15.0827 8.1905 14.0517 9.91665 11.3712 10ZM5.73123 4.44053C5.03987 4.44053 4.49407 5.03575 4.49407 5.76195C4.49407 6.48815 5.052 7.08335 5.73123 7.08335C6.4226 7.08335 6.96837 6.48815 6.96837 5.76195C6.98051 5.03575 6.4226 4.44053 5.73123 4.44053ZM10.1583 4.44053C9.46697 4.44053 8.92114 5.03575 8.92114 5.76195C8.92114 6.48815 9.47911 7.08335 10.1583 7.08335C10.8497 7.08335 11.3955 6.48815 11.3955 5.76195C11.3955 5.03575 10.8497 4.44053 10.1583 4.44053Z" fill="currentColor"></path></svg>
                    </a>
                    <a href="https://github.com/BosonLabs/" target="_blank" rel="noopener noreferrer">
                    <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" fill="currentColor"/></svg>
                    </a> */}
                    <a href="https://www.linkedin.com/company/elementcbdc/" target="_blank" rel="noopener noreferrer">
                        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px"><path fill="currentColor" d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M9,17H6.477v-7H9V17z M7.694,8.717c-0.771,0-1.286-0.514-1.286-1.2s0.514-1.2,1.371-1.2c0.771,0,1.286,0.514,1.286,1.2S8.551,8.717,7.694,8.717z M18,17h-2.442v-3.826c0-1.058-0.651-1.302-0.895-1.302s-1.058,0.163-1.058,1.302c0,0.163,0,3.826,0,3.826h-2.523v-7h2.523v0.977C13.93,10.407,14.581,10,15.802,10C17.023,10,18,10.977,18,13.174V17z"></path></svg>
                    </a>
                </div>
            </>)}
        </div>
    );
};

export default Sidebar;
