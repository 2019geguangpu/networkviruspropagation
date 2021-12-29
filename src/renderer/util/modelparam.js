const modelParam = {

    computerNetworkDisconnectRate : 0.2,
    infectionRate : 0.6,
    immunteRate : 0.6,
    terminalNetworkDisconnectRate: 0.5,
    explosiveRate: 0.5,
    cureRate: 0.6,
    contactInfectionRate: 0.2,
    computerBornNumber: 30,
    terminalBornNumber: 30,
}

export const setModelParam = (newModelParam) => {

    modelParam.computerNetworkDisconnectRate = newModelParam.computerNetworkDisconnectRate;
    modelParam.infectionRate = newModelParam.infectionRate;
    modelParam.immunteRate = newModelParam.immunteRate;
    modelParam.terminalNetworkDisconnectRate = newModelParam.terminalNetworkDisconnectRate;
    modelParam.explosiveRate = newModelParam.explosiveRate;
    modelParam.cureRate = newModelParam.cureRate;
    modelParam.contactInfectionRate = newModelParam.contactInfectionRate;
    modelParam.computerBornNumber = newModelParam.computerBornNumber;
    modelParam.terminalBornNumber = newModelParam.terminalBornNumber;
}


export default modelParam;