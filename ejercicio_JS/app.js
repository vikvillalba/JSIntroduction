
function calcularSalario(horasTrabajadas, pagoPorHora){
    let horasNormales;
    let horasExtra;
    let pagoHorasNormal;
    let pagoHorasExtra;
    let total;

    if(horasTrabajadas <= 40){
       horasNormales = horasTrabajadas;
       horasExtra = 0;

    } else {
        horasNormales = 40;
        horasExtra = horasTrabajadas - 40;
    }

    pagoHorasNormal = horasNormales * pagoPorHora;
    pagoHorasExtra = horasExtra * (pagoPorHora * 1.5);

    total = pagoHorasNormal + pagoHorasExtra;

    console.log("Horas normales trabajadas: " + horasNormales);
    console.log("Horas extras trabajadas: " + horasExtra);
    console.log("Pago por horas normales: " + pagoHorasNormal);
    console.log("Pago por horas extras: " + pagoHorasExtra);
    console.log("Salario total por horas trabajadas esta semana: " + total);

    return;

}

const horasTrabajadas = prompt("Ingresa tus horas trabajadas esta semana");
let pagoPorHora = prompt("Ingresa tu pago por hora");

calcularSalario(horasTrabajadas, pagoPorHora);