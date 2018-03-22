/**
 * Created by Donny on 17/3/16.
 */
(function () {
  'use strict'

  angular.module('KPIApp.controllers')
    .controller('PageController', function (kpiService, $scope, $q, $uibModal, $log, uuid, host) {
      var vm = $scope.vm = {
        table: {}
      }

      var open = function (page) {
        var deferred = $q.defer()
        var newPage = page || {
          TITLE: '',
          SHOW_INDEX: 1,
          IS_SHOW: 'Y'
        }

        var modalInstance = $uibModal.open({
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'myModalContent.html',
          controller: 'ModalInstanceCtrl',
          resolve: {
            newPage: newPage
          }
        })

        modalInstance.result.then(function (newPage) {
          kpiService.post(host + 'api/kpiPages', {
            page: {
              ID: newPage.ID || uuid.create().toString(),
              TITLE: newPage.TITLE,
              IS_SHOW: newPage.IS_SHOW,
              SHOW_INDEX: newPage.SHOW_INDEX,
              CREATE_DATE: new Date(),
              CREATE_BY: 'admin',
              CREATE_NAME: '管理员',
              UPDATE_DATE: new Date(),
              UPDATE_BY: 'admin',
              UPDATE_NAME: '管理员'
            }
          }).then(function (res) {
            deferred.resolve(res)
          }, function (err) {
            deferred.reject(err)
          })

        }, function () {
          $log.info('Modal dismissed at: ' + new Date())
        })

        return deferred.promise
      }

      $scope.create = function () {
        open().then(function () {
          vm.table.bootstrapTable('refresh', {silent: true})
        })
      }

      $scope.edit = function () {
        var selects = vm.table.bootstrapTable('getSelections')
        open(selects[0]).then(function () {
          vm.table.bootstrapTable('refresh', {silent: true})
        })
      }

      $scope.delete = function () {
        var selects = vm.table.bootstrapTable('getSelections')
        var ids = _.map(selects, 'ID')

        kpiService.post(host + 'api/kpiPages/delete', {
          ids: ids
        }).then(function (res) {
          vm.table.bootstrapTable('refresh', {silent: true})
        })
      }
    })

    .controller('ModalInstanceCtrl', function ($uibModalInstance, $scope, newPage) {
      var vm = $scope.vm = {
        newPage: newPage,
        error: false,
        errorMsg: ''
      }

      $scope.ok = function () {
        if (vm.newPage.TITLE.length == 0) {
          vm.error = true
          vm.errorMsg = '标题不能为空！'
        } else if (!vm.newPage.SHOW_INDEX) {
          vm.error = true
          vm.errorMsg = '排序不能为空！'
        } else {
          $uibModalInstance.close(vm.newPage)
          vm.error = false
        }
      }

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel')
        vm.error = false
      }
    })
}())
