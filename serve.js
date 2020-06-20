let ws = require('nodejs-websocket');
let mass = (conn) => {
    server.connections.forEach(() => {
        conn.sendText(str)
    })
};
let server = ws.createServer((conn,str) => {
    conn.on('text', (str) => {
        conn.sendText(str);
        mass(conn,str)
    });
    conn.on('error', (err) => {
        console.log(err)
    });

}).listen(8888, (() => {
    console.log('启动成功')
}))