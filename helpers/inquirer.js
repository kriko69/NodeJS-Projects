const inquirer = require('inquirer');
require('colors');

const menuOpts=[
    {
        type:'list',
        name:'opcion',
        message:'Que desea hacer?',
        choices:[
            {
                value:1,
                name:`${'1.'.green} Crear una tarea`
            },
            {
                value:2,
                name:`${'2.'.green} Listar tareas`
            },
            {
                value:3,
                name:`${'3.'.green} Listar tareas completadas`
            },
            {
                value:4,
                name:`${'4.'.green} Listar tareas pendientes`
            },
            {
                value:5,
                name:`${'5.'.green} Completar tarea(s)`
            },
            {
                value:6,
                name:`${'6.'.green} Borrar una tarea`
            },
            {
                value:0,
                name:`${'0.'.green} Salir`
            }
        ]
    }
];

const pauseOpt=[{
    type:'input',
    name:'pause',
    message:`Presione ${'ENTER'.green} para continuar\n`,
}];

const inquiererMenu= async ()=>{
    console.clear();
    console.log('=========================='.green);
    console.log(' Seleccione una opcion '.white);
    console.log('==========================\n'.green);

    const {opcion}= await inquirer.prompt(menuOpts);
    return opcion;
};

const pausa= async ()=>{
    console.log('\n');
    const opt= await inquirer.prompt(pauseOpt);
    return opt;
};

const pregunta = async (question)=>{
    const preguntaOpt=[{
        type:'input',
        name:'qst',
        message:question,
        validate(value){
            if (value.length===0) {
                return 'Por favor ingrese el valor';
            }
            return true; 
        }
    }];
    const {qst}= await inquirer.prompt(preguntaOpt);
    return qst;
};

const listadoTareasBorrar= async (tareas=[])=>{
    const qst=tareas.map((tarea,i)=>{
        const idx = `${i+1}.`.green;

        return {
            value:tarea.id,
            name:`${idx} ${tarea.descripcion}`
        };
    });

    qst.unshift({
        value:'0',
        name:'0. '.green+'cancelar'
    });
    const menuTareas=[
        {
            type:'list',
            name:'tarea',
            message:'Elige una tarea',
            choices:qst
        }
    ];
    const {tarea}= await inquirer.prompt(menuTareas);
    return tarea;

};

const confirmar=async (mensaje)=>{
    const preguntaOpt=[{
        type:'confirm',
        name:'ok',
        message:mensaje,
    }];
    const {ok}= await inquirer.prompt(preguntaOpt);
    return ok;
};

const mostarListadoChecklist= async (tareas=[])=>{
    const qst=tareas.map((tarea,i)=>{
        const idx = `${i+1}.`.green;

        return {
            value:tarea.id,
            name:`${idx} ${tarea.descripcion}`,
            checked: (tarea.completadoEn) ? true : false
        };
    });

    const menuTareas=[
        {
            type:'checkbox',
            name:'ids',
            message:'Seleccione',
            choices:qst
        }
    ];
    const {ids}= await inquirer.prompt(menuTareas);
    return ids;

};

module.exports={
    inquiererMenu,
    pausa,
    pregunta,
    listadoTareasBorrar,
    confirmar,
    mostarListadoChecklist
}