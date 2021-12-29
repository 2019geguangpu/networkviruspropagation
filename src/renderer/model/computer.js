import { isTransform, contactInfectionRate } from "../util/rate";
import { EState } from "../util/enum";

import ModelParam from "../util/modelparam";

export class Computer{

    constructor(id, isConnect, state){

        this.id = id;
        this.isConnect = isConnect;
        this.state = state;
    }

    infect(computerNumber, terminalNumber){
        
        // 计算在拓扑关系中，计算机不被已感染计算机感染的概率
        const computerUninfectRate = Math.pow(1 - ModelParam.infectionRate, computerNumber.infected);
        // 在1中去掉topologicalRelationUninfectRate的概率，那么就是这台计算机在拓扑关系中最终的感染概率
        const computerInfectRate = 1 - computerUninfectRate;

        const resultFromComputer = isTransform(computerInfectRate);

        // 计算计算机被已感染智能终端感染的概率
        // 计算在拓扑关系中，计算机不被已感染智能终端感染的概率
        const computerUninfectedByTerminalRate = Math.pow(1 - ModelParam.contactInfectionRate, terminalNumber.latent + terminalNumber.explosive);
        const computerInfectedByTerminalRate = 1 - computerUninfectedByTerminalRate;

        const resultFromTerminal = isTransform(computerInfectedByTerminalRate);

        if(this.state === EState.SUSCEPTIBLE){
            if(resultFromComputer || resultFromTerminal) {
                this.state = EState.INFECTED;
                computerNumber.susceptible --;
                computerNumber.infected ++;
            };
        }
    }

    immunte(computerNumber){
        const result = isTransform(ModelParam.immunteRate);
        if(this.state === EState.INFECTED){
            if(result) {
                this.state = EState.IMMUNTE;
                computerNumber.immunte ++;
                computerNumber.infected --;
            }
        }
    }

    disconnectNetwork(computerMap, computerNumber){
        const result = isTransform(ModelParam.computerNetworkDisconnectRate);
        
        if(result) {
            
            if(this.state === EState.SUSCEPTIBLE) computerNumber.susceptible --;
            else if(this.state === EState.INFECTED) computerNumber.infected --;
            else computerNumber.immunte --;

            this.state = EState.DISCONNECT;
            this.isConnect = false;
            delete computerMap[this.id];
        }
    }
}