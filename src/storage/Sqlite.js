const sqlite = {};

sqlite.createTablesInit = async (db) => {
    try{
        if (!db) {
            return false;
        }
        await db.sqlBatch([['CREATE table if not exists menu_mobile(id integer primary key, nome TEXT, status TEXT, slug TEXT, disabled INTEGER)'],
                                       ['CREATE table if not exists noticia(id integer primary key, imagem TEXT)']],
            );
        console.log('certo tudo');
    }catch (e) {
        console.log('Erro ao criar a tabela', e);
    }
    return true;
};

const promiseAuxiliar = (db, query, params) => {
    return new Promise((resolve, reject) => {
        db.executeSql(query, params, (result) => {
            resolve(result);
        }, (error) => {
            reject(error);
        })
    });
}

const promiseBatch =  (db, query) => {
    return new Promise((resolve, reject) => {
        db.sqlBatch(query, (result) => {
            resolve(result);
        }, (error) => {
            reject(error);
        })
    });
}

sqlite.insertUnique = async (db, table, campos, valores) => {
    // let insert = [];
    try {
        if (!db) {
            console.log('conexão não realizada');
            return;
        }else if (!window.sqlitePlugin){
            console.log('Dispositivo não suportado!')
            return;
        }
        let word = 'insert into '+table+' (';
        for (let i= 0; i< campos.length; i++) {
            if (i == 0) {
                word += campos[i];
            }
            else {
                word+= ','+campos[i];
            }
        }

        word += ') values ('

        for (let j=0; j < valores.length; j++ ){
            if (j ==0 ){
                word+= '?';
            }
            else {
                word +=',?'
            }
        }

        word+= ')';

        await promiseAuxiliar(db, word, valores);


    }catch (e) {
        console.log('Erro ao inserir dados: ',e);
    }
}

sqlite.insertBatch = async (db, objeto, tabela) => {
    try{
        if (!db) {
            console.log('conexão não realizada');
            return;
        }else if (!window.sqlitePlugin){
            console.log('Dispositivo não suportado!')
            return;
        }

        let arrayGeral = [];
        for (let index of objeto) {
            let keys = (Object.keys(index)).join(',');
            let valores = (Object.values(index));
            let interrogacoes = Array.from(valores).fill('?').join(',');
            let prefix = `insert into ${tabela} (${keys}) values (${interrogacoes})`;
            arrayGeral.push([prefix, valores]);
        }

        let dados = await promiseBatch(db, arrayGeral);
        console.log('Batch',dados);
    }catch (e) {
        console.log('Erro ao executar o batch', e);
    }
}

sqlite.consulta = async (db, query) => {
    try{
        if (!window.sqlitePlugin) {
            return;
        }
        let dados = await promiseAuxiliar(db, query, []);
        console.log('Mis', dados.rows.item(0));
    }catch (e) {
        console.log('Erro ao consultar', e);
    }
};

sqlite.home = async () => {
    try{
        let db;
        if (!window.sqlitePlugin) {
            db = window.openDatabase('Porco', '1.0', 'Data', 2*1024*1024);
            return db;
        }
        else {
            db = window.sqlitePlugin.openDatabase({name: 'Porco5.db', location: 'default'});
            console.log('SQLITE',db)
            sqlite.createTablesInit(db);
            return db;
        }

    }catch (e) {
        console.log(e);
        return null;
    }
};

export default sqlite;
