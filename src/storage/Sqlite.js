const sqlite = {};

sqlite.home = async () => {
    try{
        let db;
        if (!window.sqlitePlugin) {
            db = window.openDatabase('MyDatabase', '1.0', 'Data', 2*1024*1024);
            console.log('Web',db);
            return db;
        }
        else {
            db = window.sqlitePlugin.openDatabase({name: 'MyDatabase.db', location: 'default'});
            console.log('SQLITE',db)
            return db;
        }
    }catch (e) {
        console.log(e);
        return null;
    }
}

export default sqlite;
