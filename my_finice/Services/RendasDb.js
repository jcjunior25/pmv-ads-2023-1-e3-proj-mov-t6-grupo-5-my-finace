import {db} from "./DbService";

export const CreateTable = ()=> {
    console.log('create')
    db.transaction((transaction)=>{
        transaction.executeSql("CREATE TABLE IF NOT EXISTS "+ 
        "Rendas "+
        "(id INTEGER PRIMARY KEY AUTOINCREMENT, Dia TEXT, Quantia REAL, Desc TEXT, Credito REAL, Destinacao TEXT);"
        )
    })
}

export async function adicionarRenda (dt){
    return new Promise((resolve)=>{
        db.transaction((transaction)=>{
            transaction.executeSql("INSERT INTO Rendas(Dia,Quantia,Desc,Credito,Destinacao) VALUES(?,?,?,?,?);",[dt.Dia,dt.Quantia,dt.Desc,dt.Credito,dt.Destinacao],()=>{
                resolve("Adicionado com sucesso")
            })
        })
    })
}

export async function recuperandoRendas (){
    return new Promise((resolve)=>{
        db.transaction((transaction)=>{
          transaction.executeSql("SELECT * FROM Rendas;",[],(transaction, resultados)=>{
                resolve(resultados.rows._array)
            })
          
        })
    })
}
export async function recuperandoRendasEspecifica (dt){
    return new Promise((resolve)=>{
        db.transaction((transaction)=>{
          transaction.executeSql("SELECT * FROM Rendas WHERE id=?;",[dt],(transaction, resultados)=>{
                resolve(resultados.rows._array)
            })
          
        })
    })
}
export async function atualizarRendas (dt){
    return new Promise((resolve)=>{
        db.transaction((transaction)=>{
            transaction.executeSql("UPDATE Rendas SET Dia=?,Quantia=?,Desc=?,Credito=?,Destinacao=? WHERE id=?;",[dt.Dia,dt.Quantia,dt.Desc,dt.Credito,dt.Destinacao,dt.id],()=>{
                resolve("Alteração realizada com sucesso")
            })
        })
    })
}

export async function deleteRendas (id){
    return new Promise((resolve)=>{
        db.transaction((transaction)=>{
            transaction.executeSql("DELETE FROM Rendas WHERE id=?;",[id],()=>{
                resolve("Adicionado com sucesso")
            })
        })
    })
}
