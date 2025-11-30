// datos de productos

const PRODUCTOS = {
    "Laptop": 12000,
    "Mouse": 700,
    "Teclado": 800
};

const PROMOCIONES = {
    "DESCUENTO10": 0.10,
    "PROMO20": 0.20
}
const pedidoEjemplo = {
    cliente: "María López",
    producto: "Laptop",
    cantidad: 2,
    codigoPromo: "DESCUENTO10"
};
const ALTO_VALOR = 20000;


const validarPedido = (pedido) => {
    console.log("Validando pedido");


    if (!pedido || typeof pedido !== 'object') {
        throw new Error("El pedido ingresado no es un objeto válido");
    }

    if (!pedido.cliente || typeof pedido.cliente !== 'string') {
        throw new Error("El pedido debe de tener un cliente");
    }


    if (!pedido.producto || typeof pedido.producto !== 'string') {
        throw new Error("El pedido debe de tener un producto");
    }

    if (typeof pedido.cantidad !== 'number' || pedido.cantidad <= 0) {
        throw new Error("El pedido debe de tener una cantidad positiva");
    }

    if (!PRODUCTOS[pedido.producto]) {
        throw new Error("El producto solicitado no existe en el sistema :(");
    }

    console.log("Validación realizada")
    return true;
};

const calcularTotal = (pedido) => {
    const precioUnitario = PRODUCTOS[pedido.producto];
    const subtotal = precioUnitario * pedido.cantidad;

    let descuento = 0;
    let descuentoPorcentaje = 0;

    const codigo = pedido.codigoPromo;
    if (codigo && PROMOCIONES[codigo]) {
        descuentoPorcentaje = PROMOCIONES[codigo];
        descuento = subtotal * descuentoPorcentaje;
        console.log("Descuento de " + (descuentoPorcentaje * 100) + "% aplicado");
    } else if (codigo) {
        console.log("Código de promoción", codigo, "es inválido o no existe.");
    }

    const total = subtotal - descuento;
    return {
        precioUnitario: precioUnitario,
        subtotal: subtotal,
        descuento: descuento,
        descuentoPorcentaje: descuentoPorcentaje,
        total: total
    };
};

const generarReporte = (pedido, calculos) => {

    const esAltoValor = calculos.total > ALTO_VALOR;
    const etiquetaValor = esAltoValor ? "Pedido de alto valor" : "Pedido de valor estándar";

    const reporte = {
        cliente: pedido.cliente,
        producto: pedido.producto,
        cantidad: pedido.cantidad,
        precioUnitario: calculos.precioUnitario,
        subtotal: calculos.subtotal,
        descuento: calculos.descuento,
        descuentoPorcentaje: calculos.descuentoPorcentaje,
        total: calculos.total,
        etiquetaValor: etiquetaValor
    }


    console.log("Reporte de procesamiento de pedido");
    console.log("=".repeat(40));
    console.log(`Cliente:         ${reporte.cliente}`);
    console.log(`Producto:        ${reporte.producto}`);
    console.log(`Cantidad:        ${reporte.cantidad}`);
    console.log(`Precio unitario: $${reporte.precioUnitario}`);
    console.log("---");
    console.log(`Subtotal:        $${reporte.subtotal}`);
    console.log(`Descuento:       ${(reporte.descuentoPorcentaje * 100)}% ( -$${reporte.descuento} )`); 
    console.log(`Total Final:     $${reporte.total}`);
    console.log("---");
    console.log("---");
    console.log(`Etiqueta:        **${reporte.etiquetaValor}**`);
    console.log("=".repeat(40) + "\n");

    return reporte;
};

const procesarPedido = (pedido) => {
    try {
        validarPedido(pedido);
        const calculos = calcularTotal(pedido);
        const reporte = generarReporte(pedido, calculos);

        return reporte;
    } catch (error) {
        console.log("Ocurrió un error al procesar el pedido.");
        return null;
    }
}

console.log("inicio del sistema");


const reportePedido = procesarPedido(pedidoEjemplo);