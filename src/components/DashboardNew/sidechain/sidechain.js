import React, { useEffect, useState } from 'react';
import './sidechain.css';
import { TextField } from "@mui/material";
import { Tooltip, Spin, Result, Checkbox } from 'antd';
import { BlockOutlined } from "@ant-design/icons";
import ButtonLoad from 'react-bootstrap-button-loader';
import { BscdeployPost,Bscdeploydata} from '../../../API/ApiFunctions';
// import Layout from './LayoutT';
function App() {
    const validators = [
        "0x08fAe3885E299c24ff9841478EB946f41023aC69",
        "0x751AAca849b09A3e347bBfe125cF18423cc24B40",
        "0xa6fF33E3250Cc765052AC9D7f7dFebDa183C4b9b",
        "0x49c0f7c8c11a4c80dc6449efe1010bb166818da8",
        "0x8e1ea6eaa09c3b40f4a51fcd056a031870a0549a"
    ];
    const treasury = [
        "0xF866198EBe1d4A38D3156069e93BC02aB478E94C",
        "0x7AccE35b1c85e5d219E2Df62c0FFa248583130Cc"
    ];
    const initialAllocation = [
        "0xF866198EBe1d4A38D3156069e93BC02aB478E94C",
        "0x7AccE35b1c85e5d219E2Df62c0FFa248583130Cc"
    ];
    const [initialStakes, setInitialStakes] = useState(validators.map(i => ({
        address: i.toLowerCase(),
        value: 1000
    })));
    const [systemTreasury, setSystemTreasury] = useState(treasury.map(i => ({
        address: i.toLowerCase(),
        value: 50
    })));
    const [faucet, setFaucet] = useState(initialAllocation.map(i => ({
        address: i.toLowerCase(),
        value: 1000000
    })));
    const [consensusParams, setConsensusParams] = useState({
        activeValidatorsLength: 5,
        epochBlockInterval: 100,
        felonyThreshold: 10,
        validatorJailEpochLength: 2,
        misdemeanorThreshold: 10,
        undelegatePeriod: 2,
        minValidatorStakeAmount: 30,
        minStakingAmount: 10,
    });
    const [chainId, setChainId] = useState(15000);
    const [votingPeriod, setVotingPeriod] = useState(60);
    const [isV2, setIsV2] = useState(false);
    const consensusInputs = [
        {
            key: "activeValidatorsLength",
            label: "Minimum Number of Active Validators",
            helperText: "Minimum number of active validators on the network",
            toolTip: "Your network can have a minimum amount of validators. More validators means more decentralization. We suggest the minimum amount of validators not lower than 5 to maintain network availability and throughput.",
            disabled: true
        },
        {
            key: "epochBlockInterval",
            label: "Epoch Length",
            helperText: "Length of the epoch in blocks",
            toolTip: "Length of an epoch, specified in blocks produced on the network. An epoch is a variable used in the calculatation of important blockchain events, such as gas consumption, rewards claiming period, duration of validator penalty, and so on. An optimal epoch length is very important.We suggest the length of 1 day(86400 / 3=28800, where 3s is constant block production time on BNB Chain)."
        },
        {
            key: "misdemeanorThreshold",
            label: "Validator Misdemeanor Threshold",
            helperText: "Number of missed blocks for a validator to be penalized",
            toolTip: "Number of missed blocks for a validator to lose their rewards for the current epoch. A validator may sometimes miss blocks due to network hiccups or going offline. It is part of the incentive scheme to keep the network stable and protected from malicious intents."
        },
        {
            key: "felonyThreshold",
            label: "Validator Felony Threshold",
            helperText: "Number of missed blocks for a validator to be jailed",
            toolTip: "Number of missed blocks for a validator to go to jail for N subsequent epochs. The duration of jail time is set via Validator Jail Length. A validator may sometimes miss blocks due to network hiccups or going offline. It is part of the incentive scheme to keep the network stable and protected from malicious intents."
        },
        {
            key: "validatorJailEpochLength",
            label: "Validator Jail Length",
            helperText: "Jail time duration for a validator",
            toolTip: "Duration of jail time in epochs. A validator who missed N number of blocks set via Validator Felony Threshold An optimal epoch time is 1 day (28800). A validator may sometimes miss blocks due to network hiccups or going offline. It is part of the incentive scheme to keep the network stable and protected from malicious intents."
        },
        {
            key: "undelegatePeriod",
            label: "Undelegate Period",
            helperText: "Number of epochs before allowing to claim rewards",
            toolTip: "Number of epochs that should pass before users are able to claim their rewards. An optimal epoch time is 1 day(28800). It is part of the incentive scheme to keep the network stable and protected from malicious intents."
        },
        {
            key: "minValidatorStakeAmount",
            label: "Validator's Minimum Stake Amount",
            helperText: "Minimum amount of tokens to create a validator",
            toolTip: "Minimum amount of tokens in ether (1018) to create a validator. The stake is locked and secures the validator's position, and protects network from malicious validators, as a validator may lose their stake for misbehaving.",
        },
        {
            key: "minStakingAmount",
            label: "User's Minimum Stake Amount",
            helperText: "Minimum amount of tokens to create a delegated stake",
            toolTip: "Minimum amount of tokens in ether (1018) to stake with a chosen validator. Ordinary users may not have enough tokens or hardware power to create a validator, but they still can stake with a validator and receive a portion of that validator's rewards. This is called delegated staking."
        },
    ];
    const chainInput = {
        key: "chainId",
        label: "Chain ID",
        helperText: "Unique Chain ID of your project",
        toolTip: "Hand-entered unique ID of your project."
    };
    const votingPeriodInput = {
        key: "votingPeriod",
        label: "Governance Voting Period",
        helperText: "Default voting period for proposed changes to governance",
        toolTip: "Network users are able to propose changes to the governance rules. Each proposal lives a limited time span to be voted for. After a defined period they get stale and are discarded."
    };
    const [isSpinning, setSpinning] = useState(false);
    const loaderText = [
        "",
        "Creating geneis configuration...",
        "Creating Instance...",
        "Creating blockchain genesis file...",
        "Deploying blockchain...",
        "Initializing blockchain...",
        "Setting up lockchain",
        "Trasferring initial funds to given addresses..."
    ];
    const [textCount, setTextCount] = useState(0);
    const textTime = [
        30000,
        30000,
        60000,
        60000,
        30000,
        30000,
        30000
    ];
    useEffect(() => {
        if (textCount === loaderText.length)
            setTextCount(0);
        const intervalId = setInterval(() => {
            setTextCount((prev) => prev + 1);
        }, textTime[textCount]);
        return () => clearInterval(intervalId);
        // eslint-disable-next-line
    }, [textCount]);
    const [response, setResponse] = useState([]);
    const sendData = async () => {
        try {
            setSpinning(true);
            setTextCount(prev => prev + 1);
            const body = JSON.stringify({ consensusParams, initialStakes, systemTreasury, faucet, chainId, votingPeriod, isV2 });
            let responseData = await fetch( "https://testserver1.stasisonline.in/api/bnb", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accet': 'application/json',
                },
                body
            });
            const result = await responseData.json();
            setResponse(result.data);
            setSpinning(false);
            // await setUserID();
            await BscdeployPost();
            await Bscdeploydata(result.data);
        }
        catch (err) {
            console.log(err);
        }
    };
    const responseData = () => (React.createElement("div", null,
        React.createElement("p", { className: 'text-center' }, "It will take 3 - 5 minutes to initialize the blockchain. Follow the below given steps to add your chain in metamask wallet."),
        React.createElement("p", { className: 'text-center' },
            "Open Metamask -> Settings -> Networks and Add Network. ",
            React.createElement("br", null),
            " Use any Network name and Currency symbol."),
        React.createElement("div", { className: 'd-flex justify-content-center' },
            React.createElement("ul", { className: 'coins' }, response.map((value, key) => (React.createElement("li", { className: 'text-start mb-2', key: key },
                value[0],
                ": ",
                value[1])))))));
    const handleFieldChange = (index, fieldType, setFieldType, value, changeIn) => {
        const fieldValues = fieldType.map((item, i) => ((i === index) ? Object.assign(Object.assign({}, item), { [changeIn]: value }) : item));
        setFieldType(fieldValues);
    };
    const addField = (fieldType, setFieldType) => {
        const value = [...fieldType, {
                address: "0x",
                amount: 1000
            }];
        setFieldType(value);
    };
    const removeField = (index, fieldType, setFieldType) => {
        const value = fieldType.filter((item, i) => index !== i);
        setFieldType(value);
    };
    const dynamicFields = ({ fieldName, tooltip, helperText, textLabel, amountLabel, index, value, fieldType, setFieldType, disabled }) => {
        return (React.createElement(Tooltip, { title: tooltip },
            React.createElement("div", { className: 'd-flex justify-content-start align-items-baseline' },
                React.createElement(TextField, { key: value.address, id: "outlined-text-input", label: textLabel, type: "text", className: "m-3 col-6", onChange: e => handleFieldChange(index, fieldType, setFieldType, e.target.value, "address"), defaultValue: value.address, helperText: fieldType.length === index + 1 ? helperText : "", disabled: disabled }),
                React.createElement(TextField, { key: value.address + " -" + index, id: "outlined-text-input", label: amountLabel, type: "text", className: "me-3 col-3", onChange: e => handleFieldChange(index, fieldType, setFieldType, e.target.value, "value"), defaultValue: value["value"] }),
                fieldName !== "Faucet" && ((fieldType.length > 1 && fieldType.length === index + 1) ? (React.createElement("div", { className: 'd-flex' },
                    React.createElement("button", {className: 'sbtn me-2', onClick: () => removeField(index, fieldType, setFieldType) }, "Delete"),
                    fieldName !== "Genesis Validators" && (React.createElement("button", { className: 'sbtn', onClick: () => addField(fieldType, setFieldType) }, "Add")))) : (fieldType.length === 1 && fieldName !== "Genesis Validators") ?
                    (React.createElement("div", { className: 'd-flex' },
                        React.createElement("button", { className: 'sbtn', onClick: () => addField(fieldType, setFieldType) }, "Add"))) : (React.createElement("div", { className: 'd-flex' },
                    React.createElement("button", { className: 'sbtn', onClick: () => removeField(index, fieldType, setFieldType) }, "Delete")))))));
    };
    const handleOnChange = (key, value) => {
        consensusParams[key] = value;
        setConsensusParams(consensusParams);
    };
    const fieldParams = [
        {
            name: "Genesis Validators",
            tooltip: `Initial set of validators that run when your start your BNB Sidechain instance.
        Add, remove, or update with any validator addresses of your choice.`,
            helperText: "List of genesis validator addresses",
            textLabel: "Genesis Validator - ",
            amountLabel: "Stake Amount - ",
            fieldType: initialStakes,
            setFieldType: setInitialStakes,
            disabled: true
        },
        {
            name: "System Treasury",
            tooltip: `Treasury reward distribution scheme allows you to set up what addresses receive which % of the system treasury assets.
                      System treasury is a fund that accumulates 1/16 from the validators rewards, which are formed from the transaction execution costs.
                      Treasury can use these assets for the system needs, such as bridging cost coverage`,
            helperText: "Reward distribution scheme for system treasury",
            textLabel: "System Treasury - ",
            amountLabel: "Distribution share in % - ",
            fieldType: systemTreasury,
            setFieldType: setSystemTreasury,
            disabled: false
        },
        {
            name: "Faucet",
            tooltip: `Allocation scheme setting what address receives which number of tokens when the BNB Sidechain instance starts.
        These addresses are usually testnet faucets, system funds, and other necessary system tools. remove the given address and please put your own to recieve the funds in your account`,
            helperText: "Map of initial balances for faucet and other system needs",
            textLabel: "Recipient Address - ",
            amountLabel: "Initial Amount - ",
            fieldType: faucet,
            setFieldType: setFaucet,
            disabled: true
        }
    ];

    return (
      
        React.createElement("div", null,
        React.createElement("header", { className: 'App-header' }),
        (response.length <= 0) ? (React.createElement(Spin, { spinning: isSpinning, style: { color: "#f3ba2c" }, size: "large", tip: loaderText[textCount] },
            React.createElement("div", { className: 'border br6 border-radius shadow col-11 mt-3 m-auto' },
                React.createElement("h5", { className: 'm-2 mb-3 coins' },
                    React.createElement("b", { className: 'text-decoration-underline' }, "Consensus Configurations")),
                React.createElement("div", { className: 'm-3' },
                    React.createElement(Tooltip, { title: chainInput.toolTip },
                        React.createElement(TextField, { key: chainInput.key, id: "outlined-text-input", label: chainInput.label, type: "text", className: "mt-3 me-3", onChange: (e) => setChainId(Number(e.target.value)), defaultValue: chainId, helperText: chainInput.helperText })),
                    consensusInputs.map(item => {
                        var _a;
                        return (React.createElement(Tooltip, { title: item.toolTip },
                            React.createElement(TextField, { key: item.key, id: "outlined-text-input", label: item.label, type: "text", className: "mt-3 me-3", onChange: (e) => handleOnChange(item.key, Number(e.target.value)), defaultValue: consensusParams[item.key], helperText: item.helperText, disabled: (_a = item.disabled) !== null && _a !== void 0 ? _a : false })));
                    }),
                    React.createElement(Tooltip, { title: votingPeriodInput.toolTip },
                        React.createElement(TextField, { key: votingPeriodInput.key, id: "outlined-text-input", label: votingPeriodInput.label, type: "text", className: "mt-3 me-3", onChange: (e) => setVotingPeriod(Number(e.target.value)), defaultValue: votingPeriod, helperText: votingPeriodInput.helperText })))),
            fieldParams.flatMap((fieldData) => (React.createElement("div", { className: 'row border br6 border-radius shadow col-11 mt-3 m-auto' },
                React.createElement("h5", { className: 'm-2 mb-3 coins' },
                    React.createElement("b", { className: 'text-decoration-underline' }, fieldData.name)),
                fieldData.fieldType.map((data, i) => (dynamicFields({
                    fieldName: fieldData.name,
                    tooltip: `Allocation scheme setting what address receives which number of tokens when the BNB Sidechain instance starts.
        These addresses are usually testnet faucets, system funds, and other necessary system tools. remove the given address and please put your own to recieve the funds in your account`,
                    helperText: "Map of initial balances for faucet and other system needs",
                    textLabel: "Recipient Address - " + (i + 1),
                    amountLabel: "Initial Amount - " + (i + 1),
                    index: i,
                    value: data,
                    fieldType: fieldData.fieldType,
                    setFieldType: fieldData.setFieldType,
                    disabled: fieldData.disabled
                })))))),
            React.createElement("div", { className: 'col-11 d-flex justify-content-end m-auto my-3' },
                React.createElement(Checkbox, { style: { fontSize: 16, fontWeight: "bold" }, checked: isV2, onChange: () => setIsV2(!isV2) },
                    React.createElement(Tooltip, { title: `v1 deploys all nodes and validators in the same instance. Where as v2 deploys in different instances (2) for now.` }, `Using ${isV2 ? "version 2" : "version 1"}`))),
            React.createElement("div", { className: 'col-11 d-flex justify-content-end m-auto my-3' },
                React.createElement("button", { className: 'sbtn', onClick: sendData }, "Create Blockchain")))) : (React.createElement(Result, { icon: React.createElement(BlockOutlined, { style: { color: "#dc3545" } }), title: "Your blockchain is up and running!", extra: responseData() })),
        React.createElement("footer", { className: 'App-header' }))
        
    );
}
export default App;