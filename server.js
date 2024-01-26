const http = require('http')
const fs = require('fs')

// Status Codes

// 200 - OK
// 301 - Resource moved
// 404 - not found
// 500 - internal server error

// 100 range - informational response
// 200 range - sucess code
// 301 range - codes for redirects
// 404 range - user or client error codes
// 500 range - server error codes

// função é chamada quando chega um request (req) para o servidor
// req -> request object com informações como url e tipo de request
const server = http.createServer((req, res) => {
    console.log(req.url, req.method)

    // tipo de conteúdo que será enviado na response
    res.setHeader('content-type', 'text/html')

    let path = './views/'
    
    // monta o path de acordo com a url visitada
    switch(req.url){
        case '/':
            path += 'index.html'
            res.statusCode = 200
            break
        case '/about':
            path += 'about.html'
            res.statusCode = 200
            break
        default:
            path += 'notFound.html'
            res.statusCode = 404
            break
    }
    
    // envia um arquivo html lido pelo file system
    fs.readFile(path, (err, data) => {
        if(err) {
            console.log(err)
            res.end()
        } else {
            res.end(data)
        }
    })
    
})

// escuta a porta 3000 no host localhost
// localhost -> conectado com a interface de loopback (IP 127.0.0.1)
server.listen(3000,'localhost', () => {
    console.log('Listening on port 3000')
})