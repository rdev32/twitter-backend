import app from './app'

app.listen(app.get('port'), () => {
  console.log(
    `Server in ${app.get('env')} started on http://localhost:${app.get(
      'port'
    )}/`
  )
})
