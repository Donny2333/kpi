import echarts from 'echarts'

export default angular
  .module('KPIApp.controllers', [])
  .controller('AppController', function(
    $scope,
    $timeout,
    Service,
    EChartsFactory,
    uuid
  ) {
    var vm = ($scope.vm = {
      check: 0,
      selected: {},
      docks: [
        {
          id: 0,
          name: '容器',
          template: require('../tpls/containers.html')
        },
        {
          id: 1,
          name: '组件',
          template: require('../tpls/items.html')
        }
      ],
      templates: [
        {
          id: uuid.simple(),
          name: '12',
          category: 'container',
          divide: '12',
          columns: [[]],
          image: './images/div12.png'
        },
        {
          id: uuid.simple(),
          name: '6:6',
          category: 'container',
          divide: '6:6',
          columns: [[], []],
          image: './images/div66.png'
        },
        {
          id: uuid.simple(),
          name: '8:4',
          category: 'container',
          divide: '8:4',
          columns: [[], []],
          image: './images/div84.png'
        },
        {
          id: uuid.simple(),
          name: '4:8',
          category: 'container',
          divide: '4:8',
          columns: [[], []],
          image: './images/div48.png'
        },
        {
          id: uuid.simple(),
          name: '4:4:4',
          category: 'container',
          divide: '4:4:4',
          columns: [[], [], []],
          image: './images/div444.png'
        },
        {
          id: uuid.simple(),
          name: '3:6:3',
          category: 'container',
          divide: '3:6:3',
          columns: [[], [], []],
          image: './images/div363.png'
        },
        {
          id: uuid.simple(),
          name: '柱状图',
          category: 'item',
          type: 'bar',
          title: '柱状图',
          image: './images/bar.png',
          style: {
            height: '200px',
            width: '100%',
            float: ''
          }
        },
        {
          id: uuid.simple(),
          name: '折线图',
          category: 'item',
          type: 'line',
          title: '折线图',
          image: './images/line.png',
          style: {
            height: '200px',
            width: '100%',
            float: ''
          }
        },
        {
          id: uuid.simple(),
          name: '饼图',
          category: 'item',
          type: 'pie',
          title: '饼图',
          image: './images/pie.png',
          style: {
            height: '200px',
            width: '100%',
            float: ''
          }
        },
        {
          id: uuid.simple(),
          name: '地图',
          category: 'item',
          type: 'map',
          title: '地图',
          image: './images/map.png',
          style: {
            height: '200px',
            width: '100%',
            float: ''
          }
        }
      ],
      dropzones: {}
    })

    var preOrder = function(tree, query, next) {
      tree.map(function(t) {
        if (t.hasOwnProperty(query)) {
          next(t)
          return
        }

        if (t.hasOwnProperty('category') && t.category === 'container') {
          t.columns.map(function(col) {
            preOrder(col, query, next)
          })
        }
      })
    }

    Service.getDataSource('json/GeoJSON.json').then(
      function(geoJson) {
        echarts.registerMap('LHK', geoJson)

        Service.getContent().then(
          function(dropzone) {
            preOrder(dropzone, 'dataSource', function(chart) {
              var newChart = EChartsFactory(chart.type)
              newChart.id = chart.id
              newChart.title = chart.title
              newChart.category = chart.category
              newChart.type = chart.type
              newChart.dataSource = chart.dataSource
              newChart.x = chart.x
              newChart.y = chart.y
              newChart.style = {
                height: chart.height,
                width: chart.width,
                float: chart.float
              }

              newChart.update(chart)
            })

            // 等待数据处理
            $timeout(function() {
              vm.dropzones.A = dropzone
            }, 500)
          },
          function(err) {
            console.log(err)
          }
        )
      },
      function(err) {
        console.log(err)
      }
    )

    $scope.check = function(check) {
      vm.check = check
    }

    $scope.changeDataSource = function() {
      preOrder(vm.dropzones.A, 'dataSource', function(chart) {
        if (chart.id === vm.selected.id) {
          var newChart = EChartsFactory(chart.type)
          newChart.id = chart.id
          newChart.title = chart.title
          newChart.category = chart.category
          newChart.type = chart.type
          newChart.dataSource = vm.selected.dataSource
          newChart.style = {
            height: chart.height,
            width: chart.width,
            float: chart.float
          }

          newChart.update(chart)
        }
      })
    }
  }).name
