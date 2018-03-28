export default class Http {
  constructor($http, $q) {
    const content = 'json/content.json'

    return {
      getContent: _ => {
        let deferred = $q.defer()

        $http.get(content).then(
          response => {
            deferred.resolve(response.data)
          },
          err => {
            deferred.reject(err)
          }
        )

        return deferred.promise
      },
      getDataSource: json => {
        let deferred = $q.defer()

        $http.get(json).then(
          response => {
            deferred.resolve(response.data)
          },
          err => {
            deferred.reject(err)
          }
        )

        return deferred.promise
      }
    }
  }
}
