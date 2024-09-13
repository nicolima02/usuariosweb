import  moment  from 'moment-timezone';

const fechaAGMT = (fecha)=>{
    return moment(fecha).tz("America/Argentina/Buenos_Aires").format('MM/DD/YYYY HH:mm:ss');
};


export {fechaAGMT};