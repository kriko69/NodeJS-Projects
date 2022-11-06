require('colors');
const Tarea = require('./tarea')

class Tareas{
    
    _listado={};

    constructor(){
        this._listado={};
    }

    crearTarea(descripcion=''){
        const tarea = new Tarea(descripcion);
        this._listado[tarea.id]=tarea;
    }

    get listadoArr(){ //con get aparecera esta funcion como propiedad y no funcion
        const listado = [];
        Object.keys(this._listado).forEach((key)=>{
            let tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    cargarTareasFromArr(tareas=[])
    {
        tareas.forEach((key)=>{
            this._listado[key['id']]=key;
        })
        //console.log('listado',this._listado);
    }

    listadoCompleto(){
        let salida='\n';
        Object.keys(this._listado).forEach((key,i)=>{
            salida+=`${i+1}. `.green;
            salida+=this._listado[key].descripcion;
            salida+=' :: '.green;
            if(this._listado[key].completadoEn) //si no es null
                salida+='Completada'.green;
            else
                salida+='Pendiente'.red;
            salida+='\n';
        });
        console.log(salida);
    }

    listarCompletadas(){
        let salida='';
        Object.keys(this._listado).forEach((key,index)=>{
            if(this._listado[key].completadoEn)
            {
                salida+=`\n${index+1}. `.green;
                salida+=this._listado[key].descripcion;
                salida+=' :: '.green;
                salida+='Completada'.green;
            }

        });
        console.log(salida);
    }

    listarPendientes(){
        let salida='';
        Object.keys(this._listado).forEach((key,index)=>{
            if(!this._listado[key].completadoEn)
            {
                salida+=`\n${index+1}. `.green;
                salida+=this._listado[key].descripcion;
                salida+=' :: '.green;
                salida+='Pendiente'.red;
            }

        });
        console.log(salida);
    }

    listarPendientesCompletadas(compl=true)
    {
        let salida='\n';
        Object.keys(this._listado).forEach((key,i)=>{
            let auxi='';
            auxi+=`${i+1}. `.green;
            auxi+=this._listado[key].descripcion;
            auxi+=' :: '.green;
            if(this._listado[key].completadoEn && compl) //si no es null
                salida+=auxi+this._listado[key].completadoEn+'\n'.green;
            else{
                if(!this._listado[key].completadoEn && !compl){
                    salida+=auxi+'Pendiente\n'.red;
                }
            }
                
        });
        console.log(salida);
    }

    borrarTarea(id=''){
        if(this._listado[id])
            delete this._listado[id];
    }

    completarTareas(ids=[])
    {
        ids.forEach((id)=>{
            if(this._listado[id])
        {
            this._listado[id].completadoEn=new Date();
        }
        });
        console.log('Tareas completadas');
    }

}

module.exports=Tareas;