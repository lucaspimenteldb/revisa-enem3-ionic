const sqlite = {};

sqlite.createTablesInit = async (db) => {
    try{
        if (!db) {
            return false;
        }
        await db.executeSql('CREATE table if not exists menu_mobile(id integer primary key, nome TEXT, status TEXT, slug TEXT, disabled INTEGER, created_at TEXT, updated_at TEXT)');
        console.log('certo');
    }catch (e) {
        console.log(e);
    }
    return true;
};

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

        db.executeSql(word, valores, () => {
            console.log('dados inserido na tabela' +table);
        }, (error) => {
            console.log('Erro ao inserir', error);
        });


    }catch (e) {
        console.log('Erro ao inserir dados: ',e);
    }
}

sqlite.consulta = async (db, query) => {
    try{
        let dados = await db.executeSql(query,[], (result) => {
            console.log(result)
        }, (error) => {
            console.log(error);
        });
        console.log(dados);
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
            db = window.sqlitePlugin.openDatabase({name: 'Porco4.db', location: 'default'});
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
