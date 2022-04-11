cargarColaboradores = () => {
    fetch('http://localhost:2000/colaboradores')
        .then(respuesta => respuesta.json())
        .then(colaboradores => {
            let html = ``, contador = 1;
            colaboradores.forEach(colaborador => {
                html += `
                <tr>
                    <td class="textoDerecha">${colaborador.idcolaborador}</td>
                    <td>${colaborador.nombre}</td>
                    <td>${colaborador.apellido}</td>
                    <td>${colaborador.direccion}</td>
                    <td class="textoDerecha" id="tdEdad.${contador}">${colaborador.edad}</td>
                    <td>${colaborador.profesion}</td>
                    <td>${colaborador.estadocivil}</td>
                    <td><input class="btn btn-outline-danger boton" id="btnNivelRiesgo.${contador}" onclick="calcularNivelRiesgo(this)" type="button" value="Nivel Riesgo"></td>
                </tr>`;
                contador++;
            });

            document.getElementById('listadoColaboradores').innerHTML = html;
        })
        .catch(err => {
            document.getElementById('mensaje').innerHTML =
            `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Error!</strong> Al consumir servicio web. ${err}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
        })
}

calcularNivelRiesgo = (boton) => {
    let html = '';

    try {
        let edad = document.getElementById('tdEdad.' + boton.id.split('.')[1]).innerText,
            mensaje = '', color = '';
        if (edad) {
            edad = parseInt(edad);
            if (edad >= 18 && edad <= 25) {
                mensaje = 'FUERA DE PELIGRO';
                color = 'success';
            }
            else if (edad >= 26 && edad <= 50) {
                mensaje = 'TENGA CUIDADO, TOME TODAS LAS MEDIDAS DE PREVENSION';
                color = 'warning';
            }
            else if (edad >= 51) {
                mensaje = 'POR FAVOR QUEDARSE EN CASA';
                color = 'danger';
            }

            if (mensaje) {
                html +=
                    `<div class="alert alert-${color} alert-dismissible fade show" role="alert">
                        ${mensaje}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;
            }
        }
    }
    catch (err) {
        html +=
            `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Error!</strong> Al determinar el nivel de riesgo. ${err}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
    }
    finally {
        document.getElementById('mensaje').innerHTML = html;
    }
}