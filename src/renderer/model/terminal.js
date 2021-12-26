import {
    EState
} from "../util/enum";
import {
    isTransform,
    contactInfectionRate
} from "../util/rate";

const networkDisconnectRate = 0.5;
const explosiveRate = 0.5;
const cureRate = 0.3;

export class Terminal {


    constructor(id, isConnect, state) {

        this.isConnect = isConnect;
        this.id = id;
        this.state = state;
    }

    latent(computerNumber, terminalNumber) {

        if (this.state === EState.SUSCEPTIBLE) {

            const terminalUninfectRate = Math.pow(1 - contactInfectionRate, computerNumber.infected);
            const terminalInfectRate = 1 - terminalUninfectRate;
            const result = isTransform(terminalInfectRate);
            if (result) {
                this.state = EState.LATENT;
                terminalNumber.susceptible--;
                terminalNumber.latent ++;
            };
        }
    }

    explosive(terminalNumber) {

        if (this.state === EState.LATENT) {

            const result = isTransform(explosiveRate);
            if (result) {
                this.state = EState.EXPLOSIVE;
                terminalNumber.latent --;
                terminalNumber.explosive ++;
            };
        }
    }

    disconnectNetwork(terminalMap, terminalNumber) {

        const result = isTransform(networkDisconnectRate);
        if (result) {

            if (this.state === EState.SUSCEPTIBLE) terminalNumber.susceptible --;
            else if (this.state === EState.LATENT) terminalNumber.latent --;
            else terminalNumber.explosive --;

            this.state = EState.DISCONNECT;
            this.isConnect = false;
            delete terminalMap[this.id];
        };
    }

    cure(computerNumber, terminalNumber) {

        if (this.state === EState.LATENT || this.state === EState.EXPLOSIVE) {

            const terminalUncureRate = Math.pow(1 - cureRate, computerNumber.immunte);
            const terminalCureRate = 1 - terminalUncureRate;
            const result = isTransform(terminalCureRate);

            if (result) {

                if (this.state === EState.LATENT) terminalNumber.latent --;
                else if (this.state === EState.EXPLOSIVE) terminalNumber.explosive --;

                this.state = EState.SUSCEPTIBLE;
                terminalNumber.susceptible ++;
            };
        }
    }
}