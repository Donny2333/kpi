export default angular
  .module('KPIApp.services', [])
  .service('Service', function($http, $q) {
    var content = 'json/content.json'

    // 异步读取json数据
    this.getContent = function() {
      var deferred = $q.defer()

      $http.get(content).then(
        function(response) {
          deferred.resolve(response.data)
        },
        function(err) {
          deferred.reject(err)
        }
      )

      return deferred.promise
    }

    this.getDataSource = function(json) {
      var deferred = $q.defer()

      $http.get(json).then(
        function(response) {
          deferred.resolve(response.data)
        },
        function(err) {
          deferred.reject(err)
        }
      )

      return deferred.promise
    }
  })
  .factory('EChartsFactory', function(Service) {
    var eChart = {}
    eChart.type = {}

    // 柱状图
    eChart.type.bar = function() {
      this.update = function(where) {
        Service.getDataSource(this.dataSource).then(
          function(response) {
            var xAxisData = []
            var series = []
            var legendData = []
            var option
            var temp = {}

            response.y.map(function(_y) {
              temp[_y] = []

              response.data.map(function(item) {
                temp[_y].push(item[_y])
              })

              series.push({
                name: _y,
                type: 'bar',
                stack: '总量',
                data: temp[_y]
              })

              legendData.push(_y)
            })

            response.data.map(function(item) {
              xAxisData.push(item[response.x])
            })

            option = {
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              legend: {
                data: legendData
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '5%',
                containLabel: true
              },
              xAxis: [
                {
                  type: 'category',
                  data: xAxisData
                }
              ],
              yAxis: [
                {
                  type: 'value'
                }
              ],
              series: series
            }

            this.data = option
            return (where.data = option)
          }.bind(this),
          function(err) {
            console.log(err)
          }
        )
      }
    }

    // 折线图
    eChart.type.line = function() {
      this.update = function(where) {
        Service.getDataSource(this.dataSource).then(
          function(response) {
            var xAxisData = []
            var series = []
            var seriesData = []
            var option

            response.data.map(
              function(item) {
                xAxisData.push(item[response.x])
                seriesData.push(item[response.y])
              }.bind(this)
            )

            series.push({
              name: '',
              type: 'line',
              data: seriesData
            })

            option = {
              tooltip: {
                trigger: 'axis',
                position: function(pt) {
                  return [pt[0], '10%']
                }
              },
              toolbox: {
                feature: {
                  dataZoom: {
                    yAxisIndex: 'none'
                  },
                  restore: {},
                  saveAsImage: {}
                }
              },
              legend: {
                data: ''
              },
              xAxis: {
                data: xAxisData
              },
              yAxis: {},
              series: series,
              color: ['#3398DB']
            }

            this.data = option
            return where.push(this)
          }.bind(this),
          function(err) {
            console.log(err)
          }
        )
      }
    }

    // 仪表盘
    eChart.type.gauge = function() {
      this.update = function(where) {
        Service.getDataSource(this.dataSource).then(
          function(response) {
            var option = {
              tooltip: {
                formatter: '{a} <br/>{b} : {c}%'
              },
              toolbox: {
                feature: {
                  restore: {},
                  saveAsImage: {}
                }
              },
              series: [
                {
                  name: '贫困率',
                  type: 'gauge',
                  detail: { formatter: '{value}%' },
                  data: [
                    {
                      name: response.data[0].country,
                      value: response.data[0].value
                    }
                  ]
                }
              ]
            }

            this.data = option
            return (where.data = option)
          }.bind(this),
          function(err) {
            console.log(err)
          }
        )
      }
    }

    // 饼图
    eChart.type.pie = function() {
      this.update = function(where) {
        Service.getDataSource(this.dataSource).then(
          function(response) {
            var seriesData = []

            response.data.map(
              function(item) {
                seriesData.push({
                  name: item[response.x],
                  value: item[response.y]
                })
              }.bind(this)
            )

            var option = {
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
              },
              visualMap: {
                show: false,
                min: 0,
                max: 200,
                inRange: {
                  colorLightness: [0, 1]
                }
              },
              series: [
                {
                  name: '销量',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '50%'],
                  data: seriesData.sort(function(a, b) {
                    return a.value - b.value
                  }),
                  roseType: 'angle',
                  label: {
                    normal: {
                      textStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                      },
                      smooth: 0.2,
                      length: 10,
                      length2: 20
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: '#c23531',
                      shadowBlur: 200,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  },
                  animationType: 'scale',
                  animationEasing: 'elasticOut',
                  animationDelay: function(idx) {
                    return Math.random() * 200
                  }
                }
              ]
            }

            this.data = option
            return (where.data = option)
          }.bind(this),
          function(err) {
            console.log(err)
          }
        )
      }
    }

    // 地图
    eChart.type.map = function() {
      this.update = function(where) {
        Service.getDataSource(this.dataSource).then(
          function(response) {
            var series = []
            var seriesData = []

            response.y.map(function(_y) {
              seriesData = []

              response.data.map(function(item) {
                seriesData.push({
                  name: item.country,
                  value: item[_y]
                })
              })

              series.push({
                name: _y,
                type: 'map',
                mapType: 'LHK', // 自定义扩展图表类型
                itemStyle: {
                  normal: { label: { show: true } },
                  emphasis: { label: { show: true } }
                },
                data: seriesData
              })
            })

            var option = {
              legend: {
                orient: 'vertical',
                left: 'left',
                data: response.y
              },
              tooltip: {
                trigger: 'item',
                formatter: '{b}<br/>{a}:{c}<br/>'
              },
              toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                  dataView: { readOnly: false },
                  restore: {},
                  saveAsImage: {}
                }
              },
              visualMap: {
                min: 50,
                max: 50000,
                text: ['高', '低'],
                realtime: false,
                calculable: true,
                inRange: {
                  color: ['lightskyblue', 'yellow', 'orangered']
                }
              },
              series: series
            }

            this.data = option
            return (where.data = option)
          }.bind(this),
          function(err) {
            console.log(err)
          }
        )
      }
    }

    return function(type) {
      return new eChart.type[type]()
    }
  })
  .factory('uuid', function() {
    var uuid = {}

    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    }

    uuid.create = function() {
      return (
        s4() +
        s4() +
        '-' +
        s4() +
        '-' +
        s4() +
        '-' +
        s4() +
        '-' +
        s4() +
        s4() +
        s4()
      )
    }

    uuid.simple = function() {
      return Math.random().toFixed(5) * 100000
    }

    return uuid
  }).name
