const fs = require('fs');
const { stringify } = require('querystring');

const path='./DB/tareas.json'

const guardarDB=(data)=>{
    fs.writeFileSync(path,JSON.stringify(data)); //convertir un arreglo como un json string

};

const leerDB = ()=>{
    if(!fs.existsSync(path))
    {
        return null;
    }else{
        const info = fs.readFileSync(path,{encoding:'utf-8'});
        const data = JSON.parse(info);
        return data;
    }
};

module.exports={
    guardarDB,
    leerDB
}