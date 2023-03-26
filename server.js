 var connect = require('connect');
 var serveStatic = require('serve-static');

 connect()
     .use(serveStatic(__dirname))
     .listen(13340, () => console.log('Server running on 13340...'));