const sqlite = {};

sqlite.createTablesInit = async (db) => {
    try{
        if (!db) {
            return false;
        }
        await db.sqlBatch([['CREATE table if not exists menu_mobile(id integer primary key, nome TEXT, status TEXT, slug TEXT, disabled INTEGER)'],
                                       ['CREATE table if not exists noticia(id integer primary key, imagem TEXT)'],
                                       ['CREATE table if not exists volume(id integer primary key, rota integer, ttl TEXT, liberado integer)'],
                                       ['CREATE table if not exists materia(id integer, ttl TEXT, id_user integer, porcentagem integer, msg TEXT, progresso integer, primary key(id, id_user))'],
                                       ['CREATE table if not exists aula(id integer, id_materia integer, titulo TEXT,descricao TEXT, id_user integer, porcentagem integer, curtiu integer, msg TEXT,msgQuest TEXT, finalizadas integer, progresso integer, url2 text, finalizada integer default 0, totalQuestao integer, primary key(id, id_user))'],
                                       ['CREATE table if not exists questao_video(id integer, acertou integer,comentario TEXT, id_user integer, descricao text, id_video integer, ra TEXT,rb TEXT, rc TEXT, rd TEXT, re TEXT, resposta text, rgabarito text, primary key(id_video, id_user))'],
                                       ['CREATE table if not exists resposta_video(id_user integer, resposta text, id_questao integer, primary key(id_questao, id_user))'],
                                       ['CREATE table if not exists redacao(id_user integer,descricao text, titulo text,arquivo text, status text,id integer,encerrada integer, data_inicio text, data_fim text, bloqueada integer, primary key(id, id_user))'],
                                       ['CREATE table if not exists user_redacao(id_user integer, avaliacao text, desempenho text,id integer ,id_user_redacao integer, resultado decimal, titulo text, primary key(id_user_redacao))'],
                                       ['CREATE table if not exists competencia(id integer, id_user_redacao integer, descricao text, resultado decimal, primary key(id_user_redacao, id))'],
            ],
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

sqlite.consulta = async (db, query, param = []) => {
    try{
        if (!window.sqlitePlugin) {
            return;
        }
        let dados = await promiseAuxiliar(db, query, param);
        return dados.rows;
    }catch (e) {
        console.log('Erro ao consultar', e);
        throw e;
    }
};

const verificandoRestricoes = async (keys, valores, arraysRestricoes, tabela, db) => {
    try{
        let where = ' where ';
        if (keys.length <= 0 || valores.length <= 0 || arraysRestricoes.length <= 0){
            return;
        }

        let valoresDoWhere = [];
        for (let i = 0; i < arraysRestricoes.length; i++) {
            let indiceId = keys.indexOf(arraysRestricoes[i]);
            if (i == 0) {
                where += arraysRestricoes[i]+ ' = ?';
            }else{
                where += ' and '+   arraysRestricoes[i]+ ' = ?' ;
            }

            valoresDoWhere.push(valores[indiceId]);
        }

        let data = await sqlite.consulta(db,'select * from '+tabela+where, valoresDoWhere);
        console.log('query:', 'select * from '+tabela+where);
        console.log('valores: ', valoresDoWhere);
        if (data.length > 0) {
            return true;
        }
    }catch (e) {
        console.log('Verificar: ',e);
    }

    return false;

}

sqlite.insertBatch = async (db, objeto, tabela, arrayRestricoes = ['id']) => {
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
            let keysArray = keys.split(',');
            let valores = (Object.values(index));

            let data = await verificandoRestricoes(keysArray, valores, arrayRestricoes, tabela,db);
            if (data) {
                continue;
            }

            let interrogacoes = Array.from(valores).fill('?').join(',');
            let prefix = `insert into ${tabela} (${keys}) values (${interrogacoes})`;
            arrayGeral.push([prefix, valores]);
        }

        await promiseBatch(db, arrayGeral);
    }catch (e) {
        console.log('Erro ao executar o batch', e);
    }
}

sqlite.home = async () => {
    try{
        let db;
        if (!window.sqlitePlugin) {
            db = window.openDatabase('Porco', '1.1', 'Data', 2*1024*1024);
            return db;
        }
        else {
            db = window.sqlitePlugin.openDatabase({name: 'revisamaisv2.db', location: 'default'});
            sqlite.createTablesInit(db);
            return db;
        }

    }catch (e) {
        console.log(e);
        return null;
    }
};

export default sqlite;
