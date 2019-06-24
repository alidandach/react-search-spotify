let express = require('express')
let request = require('request')
let querystring = require('querystring')

let app = express()

let port = 3333;

let redirect_uri = 'http://localhost:' + port + '/callback'

let access_token;

app.get('/login', function (req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: 'fce37bff33954a5f818764df1edcda1c',
      scope: 'user-read-private user-read-email',
      redirect_uri
    }))
})

app.get('/callback', function (req, res) {
  let code = req.query.code || null
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        'fce37bff33954a5f818764df1edcda1c' + ':' + '1551af2000234e5fbdd3c4477117acae'
      ).toString('base64'))
    },
    json: true
  }
  request.post(authOptions, function (error, response, body) {
    access_token = body.access_token
    let uri = 'http://localhost:3000'
    res.redirect(uri + '?access_token=' + access_token)
  })
})
app.listen(port)