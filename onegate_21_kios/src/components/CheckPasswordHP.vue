<template>
  <div class="py-0" style="width: 80%; margin:auto">
    <v-card>
      <v-layout wrap class="wrap-password px-0 py-0">
        <div style="width: calc(100% - 150px)">
          <v-layout wrap class="text-xs-center">
            <v-flex xs12 class="pr-2">
              <div class="input-border input-group input-group--placeholder input-group--text-field primary--text">
                <div class="input-group__input">
                  <input id="passCheck" class="kios-input" data-layout="normal" @keyup.enter="submitPass" @focus="show" aria-label="Số hồ sơ" placeholder="Nhập mã tra cứu" type="text">
                  <i @click="clear('passCheck')" aria-hidden="true" class="icon material-icons input-group__append-icon input-group__icon-cb input-group__icon-clearable">clear</i>
                </div>
                <div class="mt-2" v-if="!validPass">
                  <div class="input-group__messages" style="color:red">* Mã tra cứu là bắt buộc</div>
                </div>
              </div>
            </v-flex>
          </v-layout>
        </div>
        <div class="text-center" style="width: 150px;margin-top:12px">
          <v-btn color="primary"
            :loading="loadingTable"
            :disabled="loadingTable"
            @click="submitPass"
            class="kios-btn"
          >
            <v-icon size="20">search</v-icon>
            &nbsp;
            Tra Cứu
            <span slot="loader">Loading...</span>
          </v-btn>
        </div>
        <div class="text-center text-bold mt-3" style="color:#065694">
          <p class="mb-1">Mã tra cứu là dãy số gồm 4 ký tự được in trên</p>
          <p class="mb-1">GIẤY TIẾP NHẬN HỒ SƠ VÀ HẸN TRẢ KẾT QUẢ, </p>
          <P>NỘI DUNG EMAIL THÔNG BÁO TIẾP NHẬN HỒ SƠ</P>
        </div>
      </v-layout>
    </v-card>

    <v-dialog v-model="dialogError" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Bạn không có quyền truy cập hồ sơ 
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="dialogError = false">Đồng ý</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn class="back-btn" @click="goBack" fab color="primary">
      <v-icon dark>arrow_back</v-icon>
    </v-btn>
  </div>
</template>

<script>
import router from '@/router'
import Vue from 'vue/dist/vue.min.js'
import toastr from 'toastr'
import $ from 'jquery'
Vue.use(toastr)
export default {
  props: [],
  components: {},
  data: () => ({
    loading: false,
    loadingAction: false,
    dialogError: false,
    valid: false,
    passCheck: '',
    validPass: true,
    targetCheckPass: ''
  }),
  computed: {
    filterDossierKey () {
      return this.$store.getters.getFilterDossierKey
    },
    dossierDetail () {
      return this.$store.getters.getDetailDossier
    },
    applicantIdNoSearch () {
      return this.$store.getters.getApplicantIdNoSearch
    },
    dossierNoSearch () {
      return this.$store.getters.getDossierNoSearch
    },
    fullScreen () {
      return this.$store.getters.getFullScreen
    }
  },
  created () {
    let vm = this
    vm.$nextTick(function () {
      vm.$store.commit('setFullScreen', true)
      let inputs = document.querySelectorAll('input')
      inputs[0].focus()
      $('#passCheck').val('')
      let current = vm.$router.history.current
      let newQuery = current.query
      vm.targetCheckPass = newQuery['target']
    })
  },
  watch: {},
  methods: {
    doLoadingDataHoSo () {
      let vm = this
      vm.dossierList = []
      vm.loadingTable = true
      vm.$store.dispatch('loadingDataHoSo', vm.filterDossierKey).then(function (result) {
        vm.loadingTable = false
        vm.dossierList = result.data
        vm.dossierItemTotal = result.total
        vm.totalPages = Math.ceil(result.total / 15)
      }).catch(reject => {
        vm.loadingTable = false
        vm.dossierList = []
        vm.dossierItemTotal = 0
      })
    },
    submitPass () {
      var vm = this
      if ($('#passCheck').val() !== '') {
        vm.validPass = true
        if (vm.targetCheckPass === 'tracuuhoso') {
          let payload = {
            dossierNo: vm.filterDossierKey.dossierNo ? vm.filterDossierKey.dossierNo : '',
            applicantIdNo: vm.filterDossierKey.applicantIdNo ? vm.filterDossierKey.applicantIdNo : '',
            secretCode: $('#passCheck').val()
          }
          vm.$store.commit('setFilterDossierKey', payload)
          let newQuery = {
            keyword: vm.filterDossierKey.dossierNo,
            applicantIdNo: vm.filterDossierKey.applicantIdNo
          }
          let queryString = '?'
          for (let key in newQuery) {
            if (newQuery[key] !== '' && newQuery[key] !== 'undefined' && newQuery[key] !== undefined && newQuery[key] !== null) {
              queryString += key + '=' + newQuery[key] + '&'
            }
          }
          vm.$router.push({
            path: '/tra-cuu-ho-so' + queryString,
            query: {
              renew: Math.floor(Math.random() * (100 - 1 + 1)) + 1
            }
          })
        } else {
          console.log('vm.dossierDetail', vm.dossierDetail)
          let filter = {
            password: $('#passCheck').val(),
            dossierId: vm.dossierDetail.dossierId
          }
          vm.$store.dispatch('getDossierDetailPass', filter).then(function (result) {
            vm.loading = false
            vm.dialogCheckPass = false
            if (result.status && result.status.toString() === '203') {
              // vm.dialogError = true
              toastr.error('Mã tra cứu không chính xác. Vui lòng thử lại.')
            } else if (result.status && result.status.toString() === '200') {
              vm.clearDialog()
              vm.$store.commit('setDossierDetail', result.data)
              let queryString = '?keyword=' + vm.dossierNoSearch + '&applicantIdNo=' + vm.applicantIdNoSearch + '&detail=true'
              vm.$router.push({
                path: '/tra-cuu-ho-so-homepage' + queryString
              })
            }
          }).catch(function (reject) {
            vm.dialogCheckPass = false
            vm.loading = false
            toastr.error('Lỗi hệ thống')
            console.log('reject', reject)
          })
        }
      } else {
        console.log('run validPass false')
        // vm.validPass = false
      }
    },
    viewDetail (item) {
      var vm = this
      vm.dossierDetail = item
      vm.dialogCheckPass = true
      // router.push('/tra-cuu-ho-so/' + item.dossierId)
    },
    clearDialog () {
      $('#passCheck').val('')
      this.validPass = true
    },
    clear (id) {
      $(`#${id}`).val('')
    },
    goBack () {
      window.history.back()
    }
  }
}
</script>
