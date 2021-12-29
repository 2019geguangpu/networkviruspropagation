<template>
  <div class="container">
    <el-dialog title="修改系统参数" :visible.sync="dialogVisible" width="50%">
      <div class="body">
        <div id="regenerate"></div>
        <div class="paramform">
          <el-form
            label-position="right"
            label-width="80px"
            :model="modelParam"
          >
            <el-col :span="12">
              <el-form-item label="计算机出生数量" id="computerborn_number">
                <el-input v-model="modelParam.computerBornNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="计算机感染率" id="infect_rate">
                <el-input v-model="modelParam.infectionRate"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="计算机免疫率" id="immunte_rate">
                <el-input v-model="modelParam.immunteRate"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="计算机断网率"
                id="computernetworkdisconnect_rate"
              >
                <el-input
                  v-model="modelParam.computerNetworkDisconnectRate"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="智能终端的出生数量" id="terminalborn_number">
                <el-input v-model="modelParam.terminalBornNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="智能终端断网率"
                id="terminalnetworkdisconnect_rate"
              >
                <el-input
                  v-model="modelParam.terminalNetworkDisconnectRate"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="智能终端病毒爆发的概率" id="explosive_rate">
                <el-input v-model="modelParam.explosiveRate"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="智能终端与计算机的接触感染率"
                id="contactinfection_rate"
              >
                <el-input v-model="modelParam.contactInfectionRate"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="智能终端治愈的概率" id="curerate_rate">
                <el-input v-model="modelParam.cureRate"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </div>

        <div>
          <span
            >基本再生数<span id="computeR0"></span>：{{
              regenerateNumber
            }}</span
          >
          <el-button type="text" @click="computeR0()">计算</el-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ModelParam, { setModelParam } from "@/util/modelparam.js";
import { EEvent } from "@/util/enum.js";
import Event from "@/util/event.js";
import Latex from "@/util/latex.js";
export default {
  methods: {
    sure() {
      setModelParam(this.modelParam);
      this.dialogVisible = false;
    },
    computeR0() {

      this.regenerateNumber =
        (Math.pow(+this.modelParam.contactInfectionRate, 2) +
          (+this.modelParam.terminalNetworkDisconnectRate *
            +this.modelParam.infectionRate *
            +this.modelParam.computerBornNumber) /
            +this.modelParam.computerNetworkDisconnectRate) /
        (+this.modelParam.terminalNetworkDisconnectRate *
          (+this.modelParam.computerNetworkDisconnectRate +
            +this.modelParam.immunteRate));

      this.regenerateNumber = Number(this.regenerateNumber).toFixed(2);
    },
    openDialog() {
      this.dialogVisible = true;

      this.$nextTick(() => {
        let regenerateDiv = document.getElementById("regenerate");
        let computeR0Span = document.getElementById("computeR0");

        let bornRateFormItem = document.getElementById("computerborn_number");
        let infectRateFormItem = document.getElementById("infect_rate");
        let immunteRateFormItem = document.getElementById("immunte_rate");
        let networkDisconnectRateFormItem = document.getElementById(
          "computernetworkdisconnect_rate"
        );
        let terminalBornNumberFormItem = document.getElementById(
          "terminalborn_number"
        );
        let terminalNetworkDisconnectRateFormItem = document.getElementById(
          "terminalnetworkdisconnect_rate"
        );
        let explosiveRateFormItem = document.getElementById("explosive_rate");
        let contactInfectionRateFormItem = document.getElementById(
          "contactinfection_rate"
        );
        let cureRateFormItem = document.getElementById("curerate_rate");

        Latex.render(
          "R_0 = \\frac{\\beta_2^2+ \\mu_2\\beta_1N^*}{\\mu_2(\\mu_1+\\sigma_1)}",
          regenerateDiv,
          {
            throwOnError: false,
            output: "html",
          }
        );

        Latex.render("R_0", computeR0Span, {
          throwOnError: false,
          output: "html",
        });

        Latex.render("\\lambda_1", bornRateFormItem.firstChild, {
          throwOnError: false,
          output: "html",
        });

        Latex.render("\\beta_1", infectRateFormItem.firstChild, {
          throwOnError: false,
          output: "html",
        });

        Latex.render("\\sigma_1", immunteRateFormItem.firstChild, {
          throwOnError: false,
          output: "html",
        });

        Latex.render("\\mu_1", networkDisconnectRateFormItem.firstChild, {
          throwOnError: false,
          output: "html",
        });

        Latex.render("\\lambda_2", terminalBornNumberFormItem.firstChild, {
          throwOnError: false,
          output: "html",
        });

        Latex.render(
          "\\mu_2",
          terminalNetworkDisconnectRateFormItem.firstChild,
          {
            throwOnError: false,
            output: "html",
          }
        );

        Latex.render("\\gamma", explosiveRateFormItem.firstChild, {
          throwOnError: false,
          output: "html",
        });

        Latex.render("\\beta_2", contactInfectionRateFormItem.firstChild, {
          throwOnError: false,
          output: "html",
        });

        Latex.render("\\sigma_2", cureRateFormItem.firstChild, {
          throwOnError: false,
          output: "html",
        });

        regenerateDiv = null;
        computeR0Span = null;

        bornRateFormItem = null;
        infectRateFormItem = null;
        immunteRateFormItem = null;
        networkDisconnectRateFormItem = null;
        terminalBornNumberFormItem = null;
        terminalNetworkDisconnectRateFormItem = null;
        explosiveRateFormItem = null;
        contactInfectionRateFormItem = null;
        cureRateFormItem = null;
      });
    },
  },
  mounted() {
    Event.$on(EEvent.DIALOG_VISIBLE, this.openDialog);
  },

  beforeDestroy() {
    Event.$off(EEvent.DIALOG_VISIBLE, this.openDialog);
  },
  data() {
    return {
      modelParam: {
        computerNetworkDisconnectRate: ModelParam.computerNetworkDisconnectRate,
        infectionRate: ModelParam.infectionRate,
        immunteRate: ModelParam.immunteRate,
        terminalNetworkDisconnectRate: ModelParam.terminalNetworkDisconnectRate,
        explosiveRate: ModelParam.explosiveRate,
        cureRate: ModelParam.cureRate,
        contactInfectionRate: ModelParam.contactInfectionRate,
        computerBornNumber: ModelParam.computerBornNumber,
        terminalBornNumber: ModelParam.terminalBornNumber,
      },
      dialogVisible: false,
      regenerateNumber: 0,
    };
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
}

.body {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
}
.paramform {
  width: 100%;
}
#regenerate {
  margin-bottom: 1rem;
}
</style>