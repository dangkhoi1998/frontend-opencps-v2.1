<template>
  <div style="height: 100%; background-color: #ffff; padding-top: 20px;">
    <v-layout row wrap>
      <v-flex xs12 sm12 class="text-xs-center" style="margin-bottom: 20px;">
        <h3 class="text-xs-center mt-2" style="color:#065694">CÂU HỎI KHẢO SÁT</h3>
      </v-flex>
      <v-flex xs12 sm2>
      </v-flex>
      <v-flex xs12 sm8>
        <v-layout row wrap>
          <v-flex xs12 sm12>
            <div v-for="(item, index) in votingItems" style="margin-bottom: 5px;" :key="index">
              <div class="text-bold primary--text">{{index + 1}}. {{ item.subject }}</div>
              <div class="ml-4">
                <v-radio-group v-model="item.selected" column class="mt-1">
                  <v-radio :label="itemChoise" :value="indexChoise + 1" v-for="(itemChoise, indexChoise) in item['choices']" :key="'rd' + indexChoise">
                  </v-radio>
                </v-radio-group>
              </div>
              <!-- <div class="mt-3 ml-4 mr-3" v-if="item.commentable">
                <v-text-field
                v-model="item['comment']"
                label="Ý kiến khác"
                multi-line
                rows="2"
                ></v-text-field>
              </div> -->
            </div>
            <v-flex xs12 sm12 class="mb-3 mt-3" v-if="showCaptcha">
              <captcha ref="captcha"></captcha>
            </v-flex>
            <v-flex xs12 sm12 class="text-xs-center mt-2">
              <v-btn @click="doVottingResultSubmit" color="primary" :loading="btnLoading" :disabled="btnLoading">
                <v-icon>save</v-icon>&nbsp;
                Gửi đánh giá
              </v-btn>
              <v-btn class="ml-3" @click="showVotingResult" color="primary" :loading="btnLoading" :disabled="btnLoading">
                <v-icon>bookmark</v-icon>&nbsp;
                Xem kết quả đánh giá
              </v-btn>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm2>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog_voting_result" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title class="pl-5">Kết quả đánh giá</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="dialog_voting_result = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-layout wrap>
            <v-flex xs12 sm1></v-flex>
            <v-flex xs12 sm10 class="pl-4">
              <v-card flat class="py-1" v-if="Array.isArray(votingItems) && votingItems.length > 0">
                <div v-for="(item, index) in votingItems" :key="index">
                  <div class="text-bold primary--text">
                    {{index + 1}}. {{ item.subject }}
                    <i style="color:#ad1717"> (Số lượt đánh giá: {{item.answersCount}})</i>
                  </div>
                  <v-card flat class="pl-2">
                    <v-card-text class="px-2 py-1 pr-0">
                      <div v-for="(itemChoise, indexChoise) in item['choices']" :key="'rd' + indexChoise">
                        <v-layout wrap class="mb-2">
                          <div class="flex xs6 sm8 pr-2">{{itemChoise}} <span class="text-bold" :style="'color:' + barColor[indexChoise]">({{item.answers[indexChoise]}})</span> </div>
                          <progress-bar v-if="item.answersCount > 0" class="flex xs6 sm4" size="16" :spacing="1" bar-transition="all 1s ease"
                          :val="getPercent(item.answers, indexChoise)" :text="getPercent(item.answers, indexChoise) !== 0 ? getPercent(item.answers, indexChoise) + '%' : ''" 
                          text-position="inside" bg-color="#e0e0e0" :bar-color="barColor[indexChoise]" text-fg-color="#fff" style="z-index:10000">
                          </progress-bar>
                        </v-layout>
                      </div>
                    </v-card-text>
                  </v-card>
                </div>
              </v-card>
              <div class="px-3" v-else>
                <v-alert outline color="warning" icon="priority_high" :value="true">
                  Không có câu hỏi khảo sát
                </v-alert>
              </div>
              <v-flex xs12 sm12 class="mt-4 text-xs-right">
                <v-btn @click="dialog_voting_result = false" color="primary">
                  <v-icon size="16">reply</v-icon>&nbsp;
                  Quay lại 
                </v-btn>
              </v-flex>
            </v-flex>
            <v-flex xs12 sm1></v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import Vue from 'vue'
import Captcha from './Captcha.vue'
import toastr from 'toastr'
import ProgressBar from 'vue-simple-progress'
Vue.use(toastr)
toastr.options = {
  'closeButton': true,
  'timeOut': '5000'
}
export default {
  props: ['index'],
  components: {
    'captcha': Captcha,
    ProgressBar
  },
  data: () => ({
    votingItems: [],
    btnLoading: false,
    showCaptcha: false,
    barColor: ['#5cb85c', '#f0ad4e', '#d9534f', '#2e4fc8', '#2ec8bad9', '#142f14'],
    dialog_voting_result: false
  }),
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  created () {
    var vm = this
    console.log('landing---------')
    vm.$nextTick(function () {
      vm.$store.dispatch('loadVoting', {
        className: 'survey',
        classPk: 0
      }).then(result => {
        vm.votingItems = result
        console.log(vm.votingItems)
      }).catch(xhr => {
      })
    })
  },
  watch: {
  },
  methods: {
    viewListEmployee (item) {
     this.$router.push({
        path: '/danh-sach-can-bo/' + item.itemCode,
        query: {
          itemName: item.itemName
        }
      })
    },
    doVottingResultSubmit: function () {
      var vm = this
      if (vm.$refs.captcha) {
        if (!vm.$refs.captcha.checkValidCaptcha()) {
          toastr.error('Mã captcha không đúng. Vui lòng kiểm tra lại')
          return
        }
      } else {
        vm.showCaptcha = true
        return
      }
      vm.btnLoading = true
      let arrAction = []
      for (var key in vm.votingItems) {
        vm.votingItems[key]['className'] = 'survey'
        vm.votingItems[key]['classPk'] = 0
        arrAction.push(vm.$store.dispatch('submitVoting', vm.votingItems[key]))
      }
      Promise.all(arrAction).then(results => {
        toastr.success('Yêu cầu của bạn được thực hiện thành công.')
        vm.btnLoading = false
        if (vm.$refs.captcha) {
          vm.$refs.captcha.makeRandomString()
        }
      }).catch(xhr => {
        toastr.error('Yêu cầu của bạn thực hiện thất bại.')
        vm.btnLoading = false
      })
    },
    showVotingResult () {
      let vm = this
      vm.$store.dispatch('loadVoting', {
        className: 'survey',
        classPk: 0
      }).then(result => {
        vm.votingItems = result
        vm.dialog_voting_result = true
        console.log(vm.votingItems)
      }).catch(xhr => {
      })
      
    },
    getPercent (answers, index) {
      let totalVoted = 0
      let percent = 0
      for (var i = 0; i < answers.length; i++) {
        totalVoted += answers[i]
      }
      percent = ((answers[index] / totalVoted) * 100).toFixed(1)
      return percent
    }
  },
  filters: {
  }
}
</script>
