<template>
  <div id="container">
    <div class="head">
      <el-button type="info" plain @click="modifyParam()">修改参数</el-button>
      <el-button type="primary" plain @click="start()">开始</el-button>
      <el-button type="success" plain @click="suspend()">暂停</el-button>
      <el-button type="danger" plain @click="stop()">结束</el-button>
    </div>

    <div class="body">
      <div class="count">
        <div class="individuals">
          <span>易感计算机</span
          ><span class="sum">{{ computerNumber.susceptible }}</span
          ><span>个</span>
        </div>
        <div class="individuals">
          <span>已感染计算机</span
          ><span class="sum">{{ computerNumber.infected }}</span
          ><span>个</span>
        </div>
        <div class="individuals">
          <span>治愈计算机</span
          ><span class="sum">{{ computerNumber.immunte }}</span
          ><span>个</span>
        </div>
        <div class="individuals">
          <span>易感智能终端</span
          ><span class="sum">{{ terminalNumber.susceptible }}</span
          ><span>个</span>
        </div>
        <div class="individuals">
          <span>潜伏态智能终端</span
          ><span class="sum">{{ terminalNumber.latent }}</span
          ><span>个</span>
        </div>
        <div class="individuals">
          <span>爆发态智能终端</span
          ><span class="sum">{{ terminalNumber.explosive }}</span
          ><span>个</span>
        </div>
      </div>

      <div class="chart">
        <my-chart></my-chart>
      </div>
      <div class="graphic">
        <div
          class="computerImg"
          v-for="(computer, index) in computers"
          :key="index + 'computer'"
        >
          <template v-if="computer.state === EState.SUSCEPTIBLE">
            <img src="@/assets/s_computer.svg" alt="这是一张易感计算机图片" />
          </template>
          <template v-else-if="computer.state === EState.INFECTED">
            <img src="@/assets/i_computer.svg" alt="这是一张已感染计算机图片" />
          </template>
          <template v-else-if="computer.state === EState.IMMUNTE">
            <img src="@/assets/r_computer.svg" alt="这是一张治愈计算机图片" />
          </template>
        </div>

        <div
          class="terminalImg"
          v-for="(terminal, index) in terminals"
          :key="index + 'terminal'"
        >
          <template v-if="terminal.state === EState.SUSCEPTIBLE">
            <img src="@/assets/s_terminal.svg" alt="这是一张易感智能终端图片" />
          </template>
          <template v-else-if="terminal.state === EState.LATENT">
            <img
              src="@/assets/l_terminal.svg"
              alt="这是一张潜伏态智能终端图片"
            />
          </template>
          <template v-else-if="terminal.state === EState.EXPLOSIVE">
            <img
              src="@/assets/b_terminal.svg"
              alt="这是一张爆发态智能终端图片"
            />
          </template>
        </div>
      </div>
    </div>

    <param-dialog></param-dialog>
  </div>
</template>

<script>
import { Computer } from "@/model/computer.js";
import { Terminal } from "@/model/terminal.js";
import { EState, EEvent, ECommand } from "@/util/enum";
import paramdialog from "../../components/param_dialog.vue";
import Event from "@/util/event.js";
import ModelParam from "@/util/modelparam.js";
import mychart from "@/components/chart/index.vue";

export default {
  components: {
    ParamDialog: paramdialog,
    MyChart: mychart,
  },
  created() {
    this.initComputerMapAndTerminalMap();
  },
  computed: {
    computers: (v) => {
      const result = [];

      const indexes = Reflect.ownKeys(v.computerMap);

      const iterateIndexes = (index) => {
        result.push(v.computerMap[index]);
      };

      indexes.forEach(iterateIndexes);
      return result;
    },
    terminals: (v) => {
      const result = [];
      const indexes = Reflect.ownKeys(v.terminalMap);

      const iterateIndexes = (index) => {
        result.push(v.terminalMap[index]);
      };

      indexes.forEach(iterateIndexes);
      return result;
    },
  },
  mounted() {
    console.log("初始化远程计算机的数量、状态", this.computerMap);
    console.log("初始化远程计算机的数量、状态", this.terminalMap);
  },
  data() {
    return {
      computerMap: {},
      terminalMap: {},
      computerNumber: {
        susceptible: 500,
        infected: 300,
        immunte: 200,
      },
      terminalNumber: {
        susceptible: 500,
        latent: 300,
        explosive: 200,
      },
      EState: EState,
      timer: "",
      interval: 1000,
      serialNumber: 1,
      timerCounter: 0,
    };
  },

  methods: {
    modifyParam() {
      Event.$emit(EEvent.DIALOG_VISIBLE);
    },
    resetComputerAndTerminalNumber() {
      this.computerNumber = {
        susceptible: 500,
        infected: 300,
        immunte: 200,
      };

      this.terminalNumber = {
        susceptible: 500,
        latent: 300,
        explosive: 200,
      };
    },
    initComputerMapAndTerminalMap() {
      if (this) {
        for (let i = 0; i < this.computerNumber.susceptible; i++) {
          const computer = new Computer(
            this.serialNumber,
            true,
            this.EState.SUSCEPTIBLE
          );
          this.$set(this.computerMap, this.serialNumber++, computer);
        }

        for (let i = 0; i < this.computerNumber.infected; i++) {
          const computer = new Computer(
            this.serialNumber,
            true,
            this.EState.INFECTED
          );
          this.$set(this.computerMap, this.serialNumber++, computer);
        }

        for (let i = 0; i < this.computerNumber.immunte; i++) {
          const computer = new Computer(
            this.serialNumber,
            true,
            this.EState.IMMUNTE
          );
          this.$set(this.computerMap, this.serialNumber++, computer);
        }

        for (let i = 0; i < this.terminalNumber.susceptible; i++) {
          const terminal = new Terminal(
            this.serialNumber,
            true,
            this.EState.SUSCEPTIBLE
          );

          this.$set(this.terminalMap, this.serialNumber++, terminal);
        }

        for (let i = 0; i < this.terminalNumber.latent; i++) {
          const terminal = new Terminal(
            this.serialNumber,
            true,
            this.EState.LATENT
          );
          this.$set(this.terminalMap, this.serialNumber++, terminal);
        }

        for (let i = 0; i < this.terminalNumber.explosive; i++) {
          const terminal = new Terminal(
            this.serialNumber,
            true,
            this.EState.EXPLOSIVE
          );
          this.$set(this.terminalMap, this.serialNumber++, terminal);
        }
      } else {
        throw new Error("请注意this");
      }
    },
    sendBarnRoomsNumberToChart(command) {
      Event.$emit(
        EEvent.SET_CHART_DATA,
        command,
        this.timerCounter++,
        this.computerNumber,
        this.terminalNumber
      );
    },
    start() {
      console.log("开始演化");

      if (this.timer) return;

      const handler = () => {

        this.sendBarnRoomsNumberToChart(ECommand.NO_COMMAND);

        const iterateComputers = (computer) => {
          if (computer.isConnect) {
            if (computer.state === EState.SUSCEPTIBLE) {
              //
              computer.infect(this.computerNumber, this.terminalNumber);
            } else if (computer.state === EState.INFECTED) {
              computer.immunte(this.computerNumber);
            }

            computer.disconnectNetwork(this.computerMap, this.computerNumber);
          }
        };

        this.computers.forEach(iterateComputers);

        if (this == window) console.log("作用域已是全局！！！！！");
        for (let i = 0; i < ModelParam.computerBornNumber; i++) {
          const computer = new Computer(
            this.serialNumber,
            true,
            this.EState.SUSCEPTIBLE
          );

          this.$set(this.computerMap, this.serialNumber++, computer);
          this.computerNumber.susceptible++;
        }

        const iterateTerminals = (terminal) => {
          if (terminal.isConnect) {
            if (terminal.state === EState.SUSCEPTIBLE) {
              terminal.latent(this.computerNumber, this.terminalNumber);
            } else if (terminal.state === EState.LATENT) {
              // 同一时刻，智能终端只能被治愈或者进入爆发态
              terminal.explosive(this.terminalNumber);
              if (terminal.state === EState.LATENT) {
                terminal.cure(this.computerNumber, this.terminalNumber);
              }
            } else if (terminal.state === EState.EXPLOSIVE) {
              terminal.cure(this.computerNumber, this.terminalNumber);
            }

            // 所有智能终端在任一时刻都可能会断开网络
            terminal.disconnectNetwork(this.terminalMap, this.terminalNumber);
          }
        };

        this.terminals.forEach(iterateTerminals);

        for (let i = 0; i < ModelParam.terminalBornNumber; i++) {
          const terminal = new Terminal(
            this.serialNumber,
            true,
            this.EState.SUSCEPTIBLE
          );

          this.$set(this.terminalMap, this.serialNumber++, terminal);
          this.terminalNumber.susceptible++;
        }
      };

      this.timer = window.setInterval(handler, this.interval);
    },
    suspend() {
      console.log("演化暂停！");
      if (!this.timer) return;
      window.clearInterval(this.timer);
      this.timer = null;
      this.sendBarnRoomsNumberToChart(ECommand.NO_COMMAND);
    },
    stop() {
      console.log("结束演化");
      if (!this.timer) return;
      window.clearInterval(this.timer);
      this.timer = null;
      this.sendBarnRoomsNumberToChart(ECommand.STOP);
      this.computers.splice(0, this.computers.length);
      this.terminals.splice(0, this.terminals.length);
      this.computerMap = {};
      this.terminalMap = {};
      this.resetComputerAndTerminalNumber();
      this.serialNumber = 0;
      this.initComputerMapAndTerminalMap();
    },
  },
};
</script>

<style scoped>
#container {
  display: flex;
  height: 100%;
  width: 100%;
  flex-flow: column nowrap;
  align-content: space-around;
}
.head {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
}

.body {
  margin-top: 1rem;
  width: 100%;
  display: flex;
  flex-flow: column wrap;
}

.count {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}
.individuals {
  font-size: 1.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
}

.sum {
  font-weight: 700;
  color: crimson;
}

.graphic {
  display: flex;
  width: 100%;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
}
.chart {
  width: 100%;
  margin-top: 1rem;
}
</style>