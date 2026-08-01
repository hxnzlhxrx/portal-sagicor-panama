/* ===========================================
   BANDEJA
   <<--- </gishikoDev_> --->>
=========================================== */

console.log("bandeja.js cargado");

let bandeja = [];

async function cargarBandeja(){

    try{

        bandeja =
            await ReclamosRepository.obtenerTodos();

        pintarBandeja();

    }
    catch(error){

        console.error(error);

    }

}

function pintarBandeja(){

    console.log("BANDEJA A PINTAR:", bandeja);

    const tbody =
        document.getElementById(
            "tbody-bandeja"
        );

    if(!tbody)
        return;

    tbody.innerHTML =
        bandeja.map(reclamo=>`

        <tr
    onclick="abrirReclamo('${reclamo.id}')"
    style="cursor:pointer"
>

    <td>${reclamo.num}</td>

    <td>${reclamo.nombre}</td>

    <td>${reclamo.linea}</td>

    <td>${reclamo.producto}</td>

    <td>

        ${
            reclamo.monto
            ? Number(reclamo.monto).toLocaleString(
                "es-PA",
                {
                    style:"currency",
                    currency:"USD"
                }
            )
            : "-"
        }

    </td>

    <td>${reclamo.recibido_en ?? ""}</td>

    <td>
            <div>
            <span class="estado estado-${reclamo.estado.replace(/\s+/g,"-").toLowerCase()}">

            ${reclamo.estado} 

             </span>
             </div> 

    </td> 

    <td>${reclamo.genelco ?? "-"}</td>

    <td>${reclamo.asignado_a ?? "Sin asignar"}</td>

</tr>

        `).join("");

}

async function abrirReclamo(id){

    try{

        const reclamo =
            await ReclamosRepository.obtenerPorId(id);

        const documentos =
            await ReclamosRepository.obtenerDocumentos(id);

        const cont =
            document.getElementById(
                "detalle-body"
            );

            
            console.log("ID reclamo:", reclamo.id);
                

        cont.innerHTML = `

<div class="detalle-header">

    <div>

        <h2>

            ${reclamo.num}

        </h2>

        <div class="estado estado-${reclamo.estado.replace(/\s+/g,"-").toLowerCase()}">

            ${reclamo.estado}

        </div>

    </div>

</div>

<div class="detalle-grid">

<div class="tarjeta">

<h3>Información del Reclamo</h3>

<p><b>Asegurado</b><br>${reclamo.nombre}</p>

<p><b>Cédula</b><br>${reclamo.cedula}</p>

<p><b>Email</b><br>${reclamo.email}</p>

<p><b>Teléfono</b><br>${reclamo.tel}</p>

<p><b>Línea</b><br>${reclamo.linea}</p>

<p><b>Producto</b><br>${reclamo.producto}</p>

<p><b>Proveedor</b><br>${reclamo.proveedor ?? "-"}</p>

<p><b>Hospital</b><br>${reclamo.hospital ?? "-"}</p>

<p><b>Corredora</b><br>${reclamo.corredora ?? "-"}</p>

<p><b>Perfil</b><br>${reclamo.perfil_presenta}</p>

<p><b>Origen</b><br>${reclamo.origen}</p>

<p>

<b>Monto</b>

<br>

${

reclamo.monto

?

Number(reclamo.monto).toLocaleString(

"es-PA",

{

style:"currency",

currency:"USD"

}

)

:

"-"

}

</p>

</div>

<div class="tarjeta">

    <h3>Gestión del Reclamo</h3>

    <label>Estado del Reclamo</label>

    <select id="nuevo-estado" style="width:100%">

        <option value="Recibido" ${reclamo.estado==="Recibido"?"selected":""}>Recibido</option>

        <option value="En Proceso" ${reclamo.estado==="En Proceso"?"selected":""}>En Proceso</option>

        <option value="Pendiente de Información" ${reclamo.estado==="Pendiente de Información"?"selected":""}>Pendiente de Información</option>

        <option value="Pagado" ${reclamo.estado==="Pagado"?"selected":""}>Pagado</option>

        <option value="Rechazado" ${reclamo.estado==="Rechazado"?"selected":""}>Rechazado</option>

    </select>

    <br><br>

    <button
        class="btn btn-verde"
        style="width:100%"
        onclick="actualizarEstado('${reclamo.id}')">

        💾 Guardar Estado

    </button>

${
reclamo.estado === "Pagado" ||
reclamo.estado === "Rechazado"

?

`

<br><br>

<button

class="btn btn-danger"

style="width:100%"

onclick="confirmarArchivado('${reclamo.id}')">

🗄 Archivar Reclamo

</button>

`

:

""

}

</div>

<div class="tarjeta" style="margin-top:20px">

<h3>Descripción del Evento</h3>

<div class="nota">

${reclamo.descripcion ?? "-"}

</div>

</div>



<div class="tarjeta" style="margin-top:20px">

<h3>Documentos Adjuntos</h3>

${

documentos.length

?

documentos.map(doc=>`

<div class="doc-item">

<div>

<b>

📄 ${doc.tipo_documento}

</b>

<br>

<small>

${doc.nombre_original}

</small>

</div>

<div style="display:flex;gap:10px">

<button

class="btn btn-ghost btn-sm"

onclick="abrirDocumento('${doc.ruta}')">

👁 Ver

</button>

<button

class="btn btn-verde btn-sm"

onclick="descargarDocumento('${doc.ruta}')">

⬇ Descargar

</button>

</div>

</div>

`).join("")

:

"<p>No existen documentos cargados.</p>"

}

</div>



<div class="tarjeta" style="margin-top:20px">

<h3>Timeline</h3>

<div class="timeline">

<div class="timeline-item">

<div class="timeline-dot"></div>

<div>

<b>

Reclamo recibido

</b>

<br>

<small>

${reclamo.recibido_en ?? ""}

</small>

</div>

</div>

${

reclamo.asignado_a

?

`

<div class="timeline-item">

<div class="timeline-dot"></div>

<div>

Asignado a

<b>

${reclamo.asignado_a}

</b>

</div>

</div>

`

:

""

}

${

reclamo.genelco

?

`

<div class="timeline-item">

<div class="timeline-dot"></div>

<div>

Número Genelco

<b>

${reclamo.genelco}

</b>

</div>

</div>

`

:

""

}

<div class="timeline-item">

<div class="timeline-dot"></div>

<div>

Estado actual

<b>

${reclamo.estado}

</b>

</div>

</div>

</div>

</div>



<div class="tarjeta" style="margin-top:20px">

<h3>Observaciones Internas</h3>

<textarea

id="obs-interna"

style="width:100%;height:140px"

placeholder="Observaciones internas..."

>${reclamo.observaciones_internas ?? ""}</textarea>

<br><br>

<button

class="btn btn-verde"

onclick="guardarObservacion('${reclamo.id}')">

💾 Guardar Observación

</button>

</div>

`;

        tab("detalle");

        if(

    sesion?.rol === "Visualizador"

){

    document
        .querySelectorAll(

            "#detalle-body input, #detalle-body select, #detalle-body textarea"

        )
        .forEach(

            c=>c.disabled = true

        );

    document
        .querySelectorAll(

            "#detalle-body .btn-verde"

        )
        .forEach(

            b=>{

                if(

                    !b.textContent.includes("Descargar")

                ){

                    b.style.display="none";

                }

            }

        );

}

    }

    catch(error){

        console.error(error);

        toast(
            "No fue posible abrir el reclamo."
        );

    }

}

async function abrirDocumento(ruta){

    const {

        data,

        error

    } = await db.storage

        .from("reclamos")

        .createSignedUrl(

            ruta,

            300

        );

    if(error){

        console.error(error);

        return;

    }

    window.open(

        data.signedUrl,

        "_blank"

    );

}

async function descargarDocumento(ruta){

    const { data, error } =
        await db.storage
            .from("reclamos")
            .createSignedUrl(
                ruta,
                300
            );

    if(error){

        console.error(error);

        return;

    }

    window.open(
        data.signedUrl,
        "_blank"
    );

}


async function archivarReclamo(id){

    const reclamo =

        await ReclamosRepository.obtenerPorId(id);

    if(

        reclamo.estado !== "Pagado"

        &&

        reclamo.estado !== "Rechazado"

    ){

        toast(

            "Solo pueden archivarse reclamos Pagados o Rechazados."

        );

        return;

    }

    if(

        !confirm(

            "¿Desea archivar este reclamo?"

        )

    ){

        return;

    }

    try{

        await ReclamosRepository.archivar(id);

        toast(

            "Reclamo archivado."

        );

        tab("bandeja");

        await cargarBandeja();

    }

    catch(error){

        console.error(error);

    }

}

async function actualizarEstado(id){

    try{

        const estado =
            document
                .getElementById("nuevo-estado")
                .value;

        await ReclamosRepository.actualizarEstado(

            id,

            estado

        );

        toast("Estado actualizado correctamente.");

        await cargarBandeja();

        await abrirReclamo(id);

    }

    catch(error){

        console.error(error);

        toast("No fue posible actualizar el estado.");

    }

}

async function verArchivados(){

    bandeja =
        await ReclamosRepository
            .obtenerArchivados();

    pintarBandeja();

}

async function guardarObservacion(id){

    try{

        const texto =
            document
                .getElementById("obs-interna")
                .value;

        await ReclamosRepository
            .guardarObservacion(

                id,

                texto

            );

        toast("Observación guardada.");

    }

    catch(error){

        console.error(error);

        toast("No fue posible guardar.");

    }

}

async function verArchivados(){

    try{

        bandeja =
            await ReclamosRepository.obtenerArchivados();

        pintarBandeja();

        toast("Mostrando archivados.");

    }

    catch(error){

        console.error(error);

    }

}

window.verArchivados = verArchivados;

async function confirmarArchivado(id){

    const confirmar =
        confirm(

            "¿Desea archivar este reclamo?\n\n" +

            "El reclamo desaparecerá de la bandeja principal " +

            "pero podrá consultarse desde Archivados."

        );

    if(!confirmar){

        return;

    }

    await archivarReclamo(id);

}

window.confirmarArchivado = confirmarArchivado;
window.archivarReclamo = archivarReclamo;
window.verArchivados = verArchivados;
window.guardarObservacion = guardarObservacion;
window.abrirReclamo = abrirReclamo;
window.abrirDocumento = abrirDocumento;
window.descargarDocumento = descargarDocumento;
window.archivarReclamo = archivarReclamo;

