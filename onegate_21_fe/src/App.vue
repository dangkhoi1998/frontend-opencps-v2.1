<template>
  <v-app class="onegate__fe">
    <v-navigation-drawer app clipped floating width="240"
      :class='{"detail_state": detailState !== 0}' v-if="trangThaiHoSoList.length !== 0 && !viewMobile"
    >
      <content-placeholders class="mt-3" v-if="loading">
        <content-placeholders-text :lines="7" />
      </content-placeholders>
      <v-list v-else class="py-0 nav_trang_thai_ho_so">
        <v-list-group
          v-for="(item, index) in trangThaiHoSoList"
          v-model="item.active"
          :key="index"
          prepend-icon="description"
          :append-icon="item.hasOwnProperty('items') ? '' : ''"
          no-action
          ref="listGroupCustom"
        >
          <v-list-tile slot="activator"
            @click="toTableIndexing(item, index)" >
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              <span v-if="item.hasOwnProperty('counter') && item['counter'] > -1 && item['menuType'] !== 3" class="status__counter_group status__counter">
                {{item.counter}}
              </span>
              <span v-else-if="item['menuType'] !== 3" class="status__counter_group status__counter">
                <v-progress-circular :width="1" :size="16" indeterminate color="red"></v-progress-circular>
              </span>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="item.items && item.items.length > 1" v-for="subItem in item.items" :key="subItem.stepCode"
            v-on:click.native="filterSteps(subItem)"
            :class="{'list__tile--active': String(currentStep) === String(subItem.stepCode)}"
            >
            <v-list-tile-action>
              <v-icon color="primary" v-if="String(currentStep) === String(subItem.stepCode)">play_arrow</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.menuStepName }}</v-list-tile-title>
              <span v-if="subItem.hasOwnProperty('counter') && subItem['counter'] > -1" class="status__counter">
                {{subItem.counter}}
              </span>
              <span v-else class="status__counter">
                <v-progress-circular :width="1" :size="16" indeterminate color="red"></v-progress-circular>
              </span>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <div v-if="trangThaiHoSoList.length !== 0 && viewMobile">
      <div class="row-header mb-2 py-2" style="background-color: #070f52">
        <div class="ml-2 text-bold white--text"> <span>QUẢN LÝ HỒ SƠ</span> </div>
      </div>
      <div style="max-height:200px;overflow:hidden;overflow-y:scroll">
        <content-placeholders class="mt-3" v-if="loading">
          <content-placeholders-text :lines="7" />
        </content-placeholders>
        <v-list v-else class="py-0 nav_trang_thai_ho_so">
          <v-list-group
            v-for="(item, index) in trangThaiHoSoList"
            v-model="item.active"
            :key="index"
            prepend-icon="description"
            :append-icon="item.hasOwnProperty('items') ? '' : ''"
            no-action
            ref="listGroupCustom"
          >
            <v-list-tile slot="activator" class="px-0"
              @click="toTableIndexing(item, index)" >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <span v-if="item.hasOwnProperty('counter') && item['counter'] > -1 && item['menuType'] !== 3" class="status__counter_group status__counter">
                  {{item.counter}}
                </span>
                <span v-else-if="item['menuType'] !== 3" class="status__counter_group status__counter">
                  <v-progress-circular :width="1" :size="16" indeterminate color="red"></v-progress-circular>
                </span>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile class="px-0" v-if="item.items && item.items.length > 1" v-for="subItem in item.items" :key="subItem.stepCode"
              v-on:click.native="filterSteps(subItem)"
              :class="{'list__tile--active': String(currentStep) === String(subItem.stepCode)}"
              >
              <v-list-tile-action>
                <v-icon color="primary" v-if="String(currentStep) === String(subItem.stepCode)">play_arrow</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.menuStepName }}</v-list-tile-title>
                <span v-if="subItem.hasOwnProperty('counter') && subItem['counter'] > -1" class="status__counter">
                  {{subItem.counter}}
                </span>
                <span v-else class="status__counter">
                  <v-progress-circular :width="1" :size="16" indeterminate color="red"></v-progress-circular>
                </span>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </div>
    </div>
    <v-content>
      <router-view></router-view>
      <v-alert class="mx-3" v-if="!loading && trangThaiHoSoList.length === 0" outline color="warning" icon="priority_high" :value="true">
        Bạn không có quyền thao tác!
      </v-alert>
    </v-content>
    <object id="plugin0" type="application/x-cryptolib05plugin" width="0" height="0"></object>
  </v-app>
</template>

<script>
  import { isMobile } from 'mobile-device-detect'
  export default {
    data: () => ({
      isCallBack: true,
      trangThaiHoSoList: [],
      loading: true,
      currentStep: '0',
      counterData: [],
      detailState: 0
    }),
    computed: {
      currentIndex () {
        return this.$store.getters.index
      },
      activeGetCounter () {
        return this.$store.getters.activeGetCounter
      },
      viewMobile () {
        return isMobile
      },
      pathLanding () {
        return isMobile ? '/m/danh-sach-ho-so' : '/danh-sach-ho-so'
      }
    },
    created () {
      var vm = this
      vm.$nextTick(function () {
        vm.loading = true
        vm.$store.dispatch('loadMenuConfigToDo').then(function (result) {
          vm.loading = false
          if (result) {
            vm.trangThaiHoSoList = result
            let currentParams = vm.$router.history.current.params
            if (Array.isArray(vm.trangThaiHoSoList) && vm.trangThaiHoSoList.length > 0) {
              if (!currentParams.hasOwnProperty('index') && !currentParams.hasOwnProperty('serviceCode')) {
                vm.trangThaiHoSoList[0]['active'] = true
               vm.$router.push({
                  path: vm.pathLanding + '/0',
                  query: {
                    q: vm.trangThaiHoSoList[0]['queryParams']
                  }
                })
              } else {
                vm.trangThaiHoSoList[currentParams.index]['active'] = true
              }
            }
            vm.loadingCounter()
            vm.loading = false
          }
        })
      })
    },
    updated () {
      var vm = this
      vm.$nextTick(function () {
        let currentParams = vm.$router.history.current.params
        if (currentParams.hasOwnProperty('index') && vm.isCallBack) {
          vm.isCallBack = false
          vm.$store.commit('setIndex', currentParams.index)
          if (currentParams.hasOwnProperty('id')) {
            vm.detailState = 1
          } else {
            vm.detailState = 0
          }
        }
      })
    },
    watch: {
      '$route': function (newRoute, oldRoute) {
        let vm = this
        let currentParams = newRoute.params
        let currentQuery = newRoute.query
        if (currentQuery.hasOwnProperty('step')) {
          vm.currentStep = String(currentQuery.step)
          console.log('currentStep', String(currentQuery.step))
        } else {
          vm.currentStep = '0'
        }
        if (currentQuery.hasOwnProperty('recount')) {
          vm.loadingCounter()
        }
        if (currentParams.hasOwnProperty('id')) {
          vm.detailState = 1
        } else {
          vm.detailState = 0
        }
      },
      activeGetCounter (val) {
        var vm = this
        setTimeout(function () {
          vm.loadingCounter()
        }, 300)
      }
    },
    methods: {
      toTableIndexing (item, index) {
        let vm = this
        this.$store.commit('setIndex', index)
       vm.$router.push({
          path: vm.pathLanding + '/' + index,
          query: {
            renew: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
            q: item.queryParams
          }
        })
      },
      filterSteps (item) {
        let vm = this
        let currentQuery = vm.$router.history.current.query
        let currentParams = vm.$router.history.current.params
        console.log('currentParams', currentParams)
        console.log('currentQuery', currentQuery)
        let queryString = vm.trangThaiHoSoList[currentParams.index].queryParams
        console.log('queryString++++++1111111+++++', queryString)
        /* test Local */
        /* let queryString = this.trangThaiHoSoList[0].queryParams */
        if (currentQuery !== null && currentQuery !== undefined) {
          let coma = queryString.lastIndexOf('=')
          if (coma > 0) {
            queryString = queryString.substr(0, coma + 1)
          }
        }
        vm.currentStep = String(item.stepCode)
        // if (vm.currentStep) {
        //   let urls = queryString.split("?")
        //   if (urls !== null && urls.length !== 0) {
        //     for (var i = 0; i < urls.length; i++) {
        //       if (urls[i].indexOf('step') > 0) {
        //         urls.splice(i, 1)
        //       }
        //     }
        //   }
        // }
        console.log('queryString++++++++22222222+++', queryString)
       vm.$router.push({
          path: vm.pathLanding + '/' + currentParams.index,
          query: {
            renew: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
            q: queryString + item.stepCode,
            step: item.stepCode
          }
        })
      },
      loadingCounter () {
        let vm = this
        let filter = {
          originality: vm.getOriginality()
        }
        vm.$store.dispatch('loadingCounterHoSo', filter).then(function (result) {
          vm.counterData = result.data
          for (let key in vm.trangThaiHoSoList) {
            vm.trangThaiHoSoList[key]['counter'] = 0
            if (vm.trangThaiHoSoList[key].hasOwnProperty('items')) {
              let parentCount = 0
              for (let keyChild in vm.trangThaiHoSoList[key].items) {
                vm.trangThaiHoSoList[key].items[keyChild]['counter'] = 0
                for (let countKey in vm.counterData) {
                  if (String(vm.counterData[countKey].stepCode) === String(vm.trangThaiHoSoList[key].items[keyChild].stepCode)) {
                    let countCurrent = vm.counterData[countKey].totalCount
                    vm.trangThaiHoSoList[key].items[keyChild]['counter'] = countCurrent
                    parentCount = parentCount + countCurrent
                    break
                  }
                }
              }
              vm.trangThaiHoSoList[key]['counter'] = parentCount
            } else {
              if (vm.trangThaiHoSoList[key].queryParams.indexOf('step') >= 0) {
                let stepParent = vm.trangThaiHoSoList[key].queryParams.split('step=')
                let countParent = 0
                for (let countKey in vm.counterData) {
                  if (String(vm.counterData[countKey].stepCode) === String(stepParent[1])) {
                    let countParent = vm.counterData[countKey].totalCount
                    break
                  }
                }
                vm.trangThaiHoSoList[key]['counter'] = countParent
              } else {
                let filter = {
                  queryParams: vm.trangThaiHoSoList[key].queryParams
                }
                vm.$store.dispatch('loadingCounterNotStep', filter).then(function (result) {
                  vm.trangThaiHoSoList[key]['counter'] = result.total
                }).catch(function () {
                  vm.trangThaiHoSoList[key]['counter'] = 0
                })
              }
            }
          }
          vm.loading = false
        })
      }
    }
  }
</script>
