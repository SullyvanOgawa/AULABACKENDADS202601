import mysql from 'mysql2/promise';
export default async function obterConexao(){
    // assegurar que haja apenas uma única instância de um objeto (pool). Portanto essa instacia será armazenada no escopo global
    // se ele existir no momento em que for solicitado, então desse pool de conxões pega uma conexão (getConnection())
    if(global.poolConexoes){
        //await é quem bloqueia, é como se disesse eu não saio daqui enquanto houver uma conexão.
        return await global.poolConexoes.getConnection();
    }
    else{

        // caso não tenha um pool de conxões, entao cria um com esses parâmetros: https://sidorares.github.io/node-mysql2/docs#using-connection-pools
        //criar um pool de connexões com o MYSQL
        global.poolConexoes = mysql.createPool({
            host: 'localhost',
            user: 'root', // somente para desenvolvimento academico
            database: 'test',
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
            idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
        });

        return await global.poolConexoes.getConnection();
    }
}