require('colors');
const fs = require('fs');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquiererMenu, pausa, pregunta, listadoTareasBorrar, confirmar, mostarListadoChecklist } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');



console.clear();

const main = async ()=>{
    let opt='';
    const tareas = new Tareas();
    const db=leerDB();
    if (db) {
        tareas.cargarTareasFromArr(db);  
    }else{
        console.log('No hay tareas registradas'.red);
    }
    await pausa();
    do{
        opt=await inquiererMenu();
        
        switch (opt) {
            case 1:
                const desc=await pregunta('Descripcion: ');
                tareas.crearTarea(desc);
                break;
            case 2:
                tareas.listadoCompleto();
                break;
            case 3:
                tareas.listarPendientesCompletadas(true);
                break;
            case 4:
                tareas.listarPendientesCompletadas(false);
                break;
            case 5:
                const ids = await mostarListadoChecklist(tareas.listadoArr);
                tareas.completarTareas(ids);
                break;
            case 6:
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id!=='0')
                {
                    const conf=await confirmar('Esta seguro?');
                    if(conf)
                    {
                        tareas.borrarTarea(id);
                        console.log('\nTarea borrada correctamente'.green);
                    }
                }
                break;
            default:
                break;
        }
        guardarDB(tareas.listadoArr);

        await pausa();
    }while(opt!==0);
};

main();