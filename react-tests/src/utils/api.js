const config = {
  apiUrl: 'http://localhost:3000'
}

const api = {
  get (uri, authToken, params = { headers: new Headers() }) {
    if (authToken) params.headers.append('Authentication-Token', authToken)

    return fetch(`${config.apiUrl}/${uri}`, params)
  },

  post (uri, payload, authToken, params = {}) {
    params = Object.assign({}, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, params)
    if (authToken) params.headers['Authentication-Token'] = authToken
    params.body = JSON.stringify(payload)

    return fetch(`${config.apiUrl}/${uri}`, params)
  },

  put (uri, payload, authToken, params = {}) {
    params = Object.assign({}, params, { method: 'PUT' })
    return this.post(uri, payload, authToken, params)
  },

  delete (uri, authToken, params = {}) {
    params = Object.assign({}, params, { method: 'DELETE' })
    return this.post(uri, {}, authToken, params)
  }
}

export default api
