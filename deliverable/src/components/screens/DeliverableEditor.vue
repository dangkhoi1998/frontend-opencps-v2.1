<template>
  <div v-scroll="onScroll">
    <v-form ref="form" v-model="valid" lazy-validation>
      <div class="row-header no__hidden_class">
        <div class="background-triangle-big"> <span>{{items[index] !== undefined ? items[index]['typeName'] : ''}}</span> </div>
        <div class="layout row wrap header_tools row-blue">
          <div class="flex pl-3 text-ellipsis text-bold" style="position: relative;">
            {{deName}}
          </div>
          <div class="flex xs4 sm2 text-right" style="margin-left: auto;">
            <v-btn icon class="my-0 mx-0 btn-border-left">
              <v-icon size="16">more_vert</v-icon>
            </v-btn>
            <v-btn icon class="ml-0 btn-border-left mr-3 my-0" @click="backToList" active-class="temp_active">
              <v-icon size="16">reply</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
      <bbat-table-editor-component-simple v-if="showComponent" ref="bbatFormSimple" :id="id" :datainput="detail"></bbat-table-editor-component-simple>
      <v-tabs
        icons-and-text centered
        v-model="active"
      >
        <v-tabs-slider></v-tabs-slider>
    
        <v-tab
          href="#tab-1"
          :key="1"
          v-if="String(id) !== '0'"
        >
          <v-btn flat class="px-0 py-0 mx-0 my-0">
            XEM GIẤY PHÉP
          </v-btn>
        </v-tab>
        <v-tab
          href="#tab-2"
          :key="2"
        >
          <v-btn flat class="px-0 py-0 mx-0 my-0">
            FORM NHẬP GIẤY PHÉP
          </v-btn>
        </v-tab>
        <v-tab
          href="#tab-3"
          :key="3"
        >
          <v-btn flat class="px-0 py-0 mx-0 my-0">
            TẢI GIẤY PHÉP TỪ MÁY TÍNH
          </v-btn>
        </v-tab>
        <v-tab :key="4" href="#tab-4" 
          v-if="String(id) !== '0'"> 
          <v-btn flat class="px-0 py-0 mx-0 my-0">
            LỊCH SỬ CẬP NHẬT GIẤY PHÉP
          </v-btn>
        </v-tab>

        <v-tabs-items reverse-transition="fade-transition" transition="fade-transition">
          <v-tab-item
            value="tab-1"
            :key="1"
            reverse-transition="fade-transition" transition="fade-transition"
            v-if="String(id) !== '0'"
          >
            <view-pdf v-if="showComponent" :id="id" :datainput="detail"></view-pdf>
          </v-tab-item>
          <v-tab-item
            value="tab-2"
            :key="2"
            reverse-transition="fade-transition" transition="fade-transition"
          >
            <bbat-table-editor-component v-if="showComponent" ref="bbatForm" :id="id" :datainput="detail['formData']"></bbat-table-editor-component>
          </v-tab-item>

          <v-tab-item
            value="tab-3"
            :key="3"
            reverse-transition="fade-transition" transition="fade-transition"
          >
            <attached-file-template ref="attachedObj" :pk="id" :auto="String(id) === '0' ? false : true"></attached-file-template>
          </v-tab-item>
          <v-tab-item
            value="tab-4"
            :key="4"
            reverse-transition="fade-transition" transition="fade-transition"
            v-if="String(id) !== '0'"
          >
            <view-logs v-if="showComponent" :id="id" :datainput="detail"></view-logs>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
      <v-layout row wrap :class='{"fix_tool_bottom": offsetCheck > 300}'>
        <v-flex xs12 class="text-right pt-0 ml-1 px-0 pr-1">
          <v-progress-linear v-if="loading" :indeterminate="true" class="my-0" color="blue darken-3"></v-progress-linear>
          <v-btn v-if="String(id) === '0'" color="teal darken-3" class="mr-0" dark  v-on:click.native="saveToData(-1)"
            :loading="loading"
            :disabled="loading"
          >Ghi lại và thêm mới</v-btn>
          <v-btn color="blue darken-3" class="mr-0" dark  v-on:click.native="saveToData(0)"
            :loading="loading"
            :disabled="loading"
          >Ghi lại</v-btn>
          <v-btn color="red darken-3" class="mr-0" dark v-on:click.native="backToList">
            <v-icon>reply</v-icon> &nbsp;
            Quay lại
          </v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </div>
</template>

<script>
  import { BbatTableEditorComponent, BbatTableEditorComponentSimple, ViewPdf, ViewLogs, AttachedFileTemplate } from '@/components'

  export default {
    props: ['index', 'id'],
    components: {
      BbatTableEditorComponentSimple,
      BbatTableEditorComponent,
      ViewPdf,
      ViewLogs,
      AttachedFileTemplate
    },
    data () {
      return {
        offsetTop: 0,
        offsetCheck: 400,
        deName: '',
        valid: false,
        active: 0,
        loading: false,
        dataSocket: {},
        tempCounter: 0,
        detail: {},
        showComponent: false
      }
    },
    created () {
      var vm = this
      vm.$nextTick(function () {
        setTimeout(() => {
          let formId = vm.items[vm.index]['formScriptFileId']
          vm.deName = ''
          vm.$store.dispatch('getContentFile', formId)
          vm.showComponent = false
          vm.$store.dispatch('getDeliverableById', vm.id).then(function (result) {
            vm.detail = result
            vm.deName = vm.detail['deliverableName']
            vm.showComponent = true
          })
          vm.$store.dispatch('getContentFileSimple')
          vm.tempCounter = vm.pullCounter
          vm.$socket.onmessage = function (data) {
            let dataObj = eval('( ' + data.data + ' )')
            vm.dataSocket[dataObj.respone] = dataObj[dataObj.respone]
            console.log('vm.dataSocket', vm.dataSocket)
            vm.$store.commit('setdataSocket', vm.dataSocket)
            if (dataObj['type'] === 'api' && dataObj['status'] === '200') {
              vm.tempCounter = vm.tempCounter - 1
              if (vm.tempCounter < 0) {
                vm.tempCounter = 0
              }
              vm.$store.commit('setpullCounter', vm.tempCounter)
            }
          }
        }, 100)
      })
    },
    watch: {
      '$route': function (newRoute, oldRoute) {
        let vm = this
        if (vm.isConnected) {
          vm.isConnected = false
          let formId = vm.items[vm.index]['formScriptFileId']
          vm.deName = ''
          vm.$store.dispatch('getContentFile', formId)
          vm.showComponent = false
          vm.$store.dispatch('getDeliverableById', vm.id).then(function (result) {
            vm.detail = result
            vm.deName = vm.detail['deliverableName']
            vm.showComponent = true
          })
          vm.$store.dispatch('getContentFileSimple')
          vm.tempCounter = vm.pullCounter
          vm.$socket.onmessage = function (data) {
            let dataObj = eval('( ' + data.data + ' )')
            vm.dataSocket[dataObj.respone] = dataObj[dataObj.respone]
            console.log('vm.dataSocket', vm.dataSocket)
            vm.$store.commit('setdataSocket', vm.dataSocket)
            if (dataObj['type'] === 'api' && dataObj['status'] === '200') {
              vm.tempCounter = vm.tempCounter - 1
              if (vm.tempCounter < 0) {
                vm.tempCounter = 0
              }
              vm.$store.commit('setpullCounter', vm.tempCounter)
            }
          }
        }
      }
    },
    computed: {
      items () {
        return this.$store.getters.getDeliverableTypes
      },
      pullCounter: {
        // getter
        get: function() {
          return this.$store.getters.pullCounter
        },
        // setter
        set: function(newValue) {
          this.$store.commit('setpullCounter', newValue)
        }
      },
      isConnected: {
        // getter
        get: function() {
          return this.$store.getters.getisConnected
        },
        // setter
        set: function(newValue) {
          this.$store.commit('setisConnected', newValue)
        }
      }
    },
    methods: {
      onScroll (e) {
        this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
        this.offsetCheck = document.getElementsByTagName('BODY')[0].offsetHeight - this.offsetTop
        console.log('this.offsetCheck', this.offsetCheck)
      },
      goBack () {
        window.history.back()
      },
      backToList () {
        let vm = this
        console.log('backToList')
        let current = vm.$router.history.current
        let newQuery = current.query
        let currentPath = current.path
        let queryString = '?'
        newQuery['state_change'] = '0'
        newQuery['renew'] = ''
        for (let key in newQuery) {
          if (newQuery[key] !== '' && newQuery[key] !== 'undefined' && newQuery[key] !== undefined) {
            queryString += key + '=' + newQuery[key] + '&'
          }
        }
        queryString += 'renew=' + Math.floor(Math.random() * (100 - 1 + 1)) + 1
        vm.$router.push({
          path: '/danh-sach-giay-to/' + vm.index + queryString
        })
      },
      saveToData (cmd) {
        let vm = this
        if (vm.$refs.form.validate()) {
          vm.loading = true
          let bbatFormSimple = vm.$refs.bbatFormSimple
          let bbatForm = vm.$refs.bbatForm
          let submitDataObject = {}
          if (bbatFormSimple !== null && bbatFormSimple !== undefined && bbatFormSimple !== 'undefined') {
            submitDataObject = bbatFormSimple.data
          }
          if (bbatForm !== null && bbatForm !== undefined && bbatForm !== 'undefined') {
            submitDataObject['formData'] = {}
            console.log('bbatForm', bbatForm.data)
            submitDataObject['formData'] = bbatForm.data
          }
          submitDataObject['deliverableType'] = vm.items[vm.index]['typeCode']
          console.log('submitDataObject', submitDataObject)
          if (cmd === -1) {
            vm.detail = {}
          } else {
            vm.$store.dispatch('createDeliverable', submitDataObject).then(function (data) {
              vm.loading = false
              if (String(vm.id) === '0') {
                vm.$refs.attachedObj.doUploadLate(data['createDeliverable']['deliverableId'])
              }
              vm.backToList()
            })
          }
        }
      }
    }
  }
</script>
