class Vehiculo{
    id=0;
    modelo="";
    anioFabricacion= 1;
    velocidadMaxima=1;


    constructor(id,modelo,anioFabricacion,velocidadMaxima)
    {
        this.id = id || -1;
        this.modelo = modelo || "modelo";
        if(anioFabricacion>0 && anioFabricacion!=null)
        {
            this.anioFabricacion = anioFabricacion;
        }else this.anioFabricacion = 1;

        if(velocidadMaxima>0 && velocidadMaxima!=null)
        {
            this.velocidadMaxima = velocidadMaxima;
        }else this.velocidadMaxima = 1;

    }

    toString()
    {
        return 'ID: '+ this.id + '|Modelo: '+this.modelo + '|Año fabricacion: '+this.anioFabricacion+ '|Velocidad Maxima: '+ this.velocidadMaxima;
    }
}


class Aereo extends Vehiculo{
    alturaMaxima=1;
    autonomia=1;

    constructor(id,modelo,anioFabricacion,velocidadMaxima,alturaMaxima,autonomia)
    {
        super(id,modelo,anioFabricacion,velocidadMaxima);
        if(alturaMaxima>0 && alturaMaxima!=null)
        {
            this.alturaMaxima = alturaMaxima;
        }else this.alturaMaxima = 1;

        if(autonomia>0 && autonomia!=null)
        {
            this.autonomia = autonomia;
        }else this.autonomia = 1;
    }




    toString()
    {
        return super.toString() + `|Altura maxima: ${this.alturaMaxima}|Autonomia: ${this.autonomia}`;
    }

}

class Terrestre extends Vehiculo{
    cantidadPuertas = 1;
    cantidadRuedas = 1;

    constructor(id,modelo,anioFabricacion,velocidadMaxima,cantidadPuertas,cantidadRuedas)
    {
        super(id,modelo,anioFabricacion,velocidadMaxima);
        if(cantidadPuertas>0 && cantidadPuertas!=null)
        {
            this.cantidadPuertas = cantidadPuertas;
        }else this.cantidadPuertas = 1;

        if(cantidadRuedas>0 && cantidadRuedas!=null)
        {
            this.cantidadRuedas = cantidadRuedas;
        }else this.cantidadRuedas = 1;
    }

}

var arrayVehiculos = [];


function Inicializar()
{
    const cadena = '[{"id":14, "modelo":"Ferrari F100", "anoFab":1998, "velMax":400, "cantPue":2, "cantRue":4},{"id":51, "modelo":"Dodge Viper", "anoFab":1991, "velMax":266, "cantPue":2, "cantRue":4},{"id":67, "modelo":"Boeing CH-47 Chinook","anoFab":1962, "velMax":302, "altMax":6, "autonomia":1200},{"id":666, "modelo":"Aprilia RSV 1000 R","anoFab":2004, "velMax":280, "cantPue":0, "cantRue":2},{"id":872, "modelo":"Boeing 747-400", "anoFab":1989,"velMax":988, "altMax":13, "autonomia":13450},{"id":742, "modelo":"Cessna CH-1 SkyhookR", "anoFab":1953,"velMax":174, "altMax":3, "autonomia":870}]'

    for(objeto of JSON.parse(cadena)){
        if(objeto.hasOwnProperty("id") && objeto.hasOwnProperty("modelo") && objeto.hasOwnProperty("anoFab") && objeto.hasOwnProperty("velMax"))
        {
            if(objeto.hasOwnProperty("cantPue") && objeto.hasOwnProperty("cantRue"))
            {
                let ter = new Terrestre(objeto.id,objeto.modelo,objeto.anoFab,objeto.velMax,objeto.cantPue,objeto.cantRue);
                arrayVehiculos.push(ter);
            }

            if(objeto.hasOwnProperty("altMax") && objeto.hasOwnProperty("autonomia"))
            {
                let air = new Aereo(objeto.id,objeto.modelo,objeto.anoFab,objeto.velMax,objeto.altMax,objeto.autonomia);
                arrayVehiculos.push(air);
            }
        }
    }
}

Inicializar();

let txtId = document.getElementById("txtId");
let txtModelo = document.getElementById("txtModelo");
let txtAnioFab = document.getElementById("txtAnioFab");
let txtVelMax = document.getElementById("txtVelMax");
let SelectTipo = document.getElementById("SelectTipo");
let txtAM = document.getElementById("txtAM");
let txtAutonomia = document.getElementById("txtAutonomia");
let txtCantPue = document.getElementById("txtCantPue");
let txtCantRue = document.getElementById("txtCantRue");
//let CantRue = document.getElementById("CantRue");

//FUNCIONES PARA EDITAR Y MODIFICAR
function mostrarYllenarABM(tagId)
{
    arrayVehiculos.forEach(el=>{

        if(el.id == tagId)
        {
            document.getElementById("FrmABM").style.display = "";
            txtId.value = el.id;
            txtModelo.value = el.modelo;
            txtAnioFab.value = el.anioFabricacion;
            txtVelMax.value = el.velocidadMaxima;
            if(el.hasOwnProperty("alturaMaxima"))
            {
                SelectTipo.value = "tAereo";
                mostrarCorrespondiente();
                txtAM.value = el.alturaMaxima;
                txtAutonomia.value = el.autonomia;
                //document.getElementById("txtPublicado").value = el.publicado;

            }else{
                SelectTipo.value = "tTerrestre";
                mostrarCorrespondiente();
                txtCantPue.value = el.cantidadPuertas;
                txtCantRue.value = el.cantidadRuedas;
                //document.getElementById("txtKills").value = el.asesinatos;
            }

            document.getElementById("btnAlta").style.display="none";
            document.getElementById("btnEliminar").style.display="";
        document.getElementById("btnModificar").style.display="";
        }
    })
    
}

const lectorClick = (e)=>{

    let tagId = e.target.parentElement.id;
    //console.log(tagId);

    mostrarYllenarABM(tagId);

}
//

//FUNCION PARA LLENAR LA TABLA Y FILTRAR
function mostrarVehiculos(array)
{
    document.getElementById("vehiculo-container").innerHTML = "";
    array.forEach(el => {
        let tr = document.createElement("tr");
        tr.setAttribute("id",el.id);
        tr.classList.add("trVehiculos");
        tr.innerHTML = `
        <td>${el.id}</td>
        <td>${el.modelo}</td>
        <td>${el.anioFabricacion}</td>
        <td>${el.velocidadMaxima}</td>
        <td>${el.alturaMaxima || "-"}</td>
        <td>${el.autonomia || "-"}</td>
        <td>${el.cantidadPuertas || "-" }</td>
        <td>${el.cantidadRuedas || "-"}</td>
        `;    

        
        tr.addEventListener("dblclick",lectorClick);
        document.getElementById("vehiculo-container").appendChild(tr);
        //console.log(tr);
    })
}

mostrarVehiculos(arrayVehiculos);

function mostrarAereos(arrayVehiculos)
{

    document.getElementById("vehiculo-container").innerHTML = "";
    arrayVehiculos.forEach(el => {
        let tr = document.createElement("tr");

        if(el.hasOwnProperty("alturaMaxima")){
            tr.classList.add("trVehiculo");
            tr.setAttribute("id",el.id);
        tr.innerHTML = `
        <td>${el.id}</td>
        <td>${el.modelo}</td>
        <td>${el.anioFabricacion}</td>
        <td>${el.velocidadMaxima}</td>
        <td>${el.alturaMaxima || "-"}</td>
        <td>${el.autonomia || "-"}</td>
        <td>${el.cantidadPuertas || "-" }</td>
        <td>${el.cantidadRuedas || "-"}</td>
        
        `;
        tr.addEventListener("dblclick",lectorClick);
        document.getElementById("vehiculo-container").appendChild(tr);
        //console.log(tr);
        }

        
    })
}

function mostrarTerrestres(arrayVehiculos)
{

    document.getElementById("vehiculo-container").innerHTML = "";
    arrayVehiculos.forEach(el => {
        let tr = document.createElement("tr");

        if(el.hasOwnProperty("cantidadPuertas")){
            tr.classList.add("trVehiculos");
            tr.setAttribute("id",el.id);
        tr.innerHTML = `
        <td>${el.id}</td>
        <td>${el.modelo}</td>
        <td>${el.anioFabricacion}</td>
        <td>${el.velocidadMaxima}</td>
        <td>${el.alturaMaxima || "-"}</td>
        <td>${el.autonomia || "-"}</td>
        <td>${el.cantidadPuertas || "-" }</td>
        <td>${el.cantidadRuedas || "-"}</td>
        
        `;
        tr.addEventListener("dblclick",lectorClick);
        document.getElementById("vehiculo-container").appendChild(tr);
        //console.log(tr);
        }

        
    })
}

//EVALUA EL FILTRO Y MUESTRA SEGUN CORRESPONDA
function filtroCorrespondiente()
{
    if(document.getElementById("filtroTipo").value == "vTodos")
    {
        mostrarVehiculos(arrayVehiculos);
        

    }else if(document.getElementById("filtroTipo").value == "vAereo")
    {
        mostrarAereos(arrayVehiculos);
    }else if(document.getElementById("filtroTipo").value == "vTerrestre")
    {
        mostrarTerrestres(arrayVehiculos);
    }
}

document.getElementById("filtroTipo").addEventListener("change",filtroCorrespondiente);
//

function mostrarCorrespondiente()
{
    if(SelectTipo.value == "tAereo")
    {
        txtAM.style.display="";
        txtAutonomia.style.display="";
        txtCantPue.style.display="none";
        txtCantRue.style.display="none";
        

        
    }else if(SelectTipo.value == "tTerrestre")
    {
        txtCantPue.style.display="";
        txtCantRue.style.display="";
        txtAM.style.display="none";
        txtAutonomia.style.display="none";
        
    }

}

SelectTipo.addEventListener("change",mostrarCorrespondiente);

function initConfig()
{
   document.getElementById("FrmABM").style.display="none";
   document.getElementById("FrmDatos").style.display="";
}

initConfig();

//HABILITAR BOTONES DE AMBOS FORMULARIOS
document.getElementById("FrmDatos").addEventListener("submit",e=> {
    e.preventDefault();
    });

document.getElementById("FrmABM").addEventListener("submit",e=> {
    e.preventDefault();
    });
//

function MostrarABM()
{
    document.getElementById("FrmABM").style.display="";
    if(SelectTipo.value == "tVacio")
    {       
        txtAM.style.display = "none";
        txtAutonomia.style.display = "none";
        txtCantPue.style.display = "none";
        txtCantRue.style.display = "none";
        
    }
    document.getElementById("FrmDatos").style.display="none";
    document.getElementById("btnEliminar").style.display="none";
    document.getElementById("btnModificar").style.display="none";
    document.getElementById("btnAlta").style.display="";
}

document.getElementById("btnAgregar").addEventListener("click",MostrarABM);

document.getElementById("btnCancelar").addEventListener("click",initConfig);

document.getElementById("btnPromedio").addEventListener("click", ()=>{
    let totalVelocidad=arrayVehiculos.reduce((velocidadTotal, elemento)=>{
            return velocidadTotal += elemento.velocidadMaxima;
        }, 0);
    document.getElementById("mostrarPromedio").value=(totalVelocidad/=arrayVehiculos.length).toFixed(2);
});

//FUNCIONES ABM

function generarId()
{
    
    let max = 0;
    let flag = false;

    

    arrayVehiculos.forEach(el=>{

        if(flag || parseInt(el.id) > max)
        {
            max = parseInt(el.id);
        }
    })
    

    return max + 1;
}

function validarCamposDefault()
{
    
    if(txtModelo.value!="" && txtAnioFab.value > 0 && txtVelMax.value > 0)
    {   
        return true;
    }else return false;
}

function validarCamposAEREO()
{
    
    
    if(txtAM.value != "" && txtAM.value > 0 && txtAutonomia.value!="")
    {
        return true;
    }else return false;
}

function validarCamposT()
{
    if(txtCantPue.value>0 && txtCantRue.value >0 )
    {
        return true;
    }else return false;

    
}


function Alta()
{
    txtId.value = generarId();

    if(document.getElementById("SelectTipo").value == "tAereo")
    {
        if(validarCamposDefault() && validarCamposAEREO())
        {   
            alert("Se agregara el elemento!");
            let a = new Aereo(txtId.value,txtModelo.value,txtAnioFab.value,txtVelMax.value,txtAM.value,txtAutonomia.value);
            arrayVehiculos.push(a);
        }else{
            alert("Verifique que los campos sean correctos!\n'Modelo' no debe contener letras\nVelocidad, año de fab, alt max y autonomia\n  deben ser mayores a 0");
        }    
        
        txtAM.value = ""
        txtAutonomia.value = ""
        SelectTipo.value = "tVacio";
    }else if(document.getElementById("SelectTipo").value == "tTerrestre")
    {
        if(validarCamposDefault() && validarCamposT())
        {
            
            let t = new Terrestre(txtId.value,txtModelo.value,txtAnioFab.value,txtVelMax.value,txtCantPue.value,txtCantRue.value);
            arrayVehiculos.push(t);
        }else alert("Verifique que los campos sean correctos!\nModelo no debe contener letras\nLos demas campos deben ser mayores a 0");
        
        txtCantPue.value = ""
        txtCantRue.value =""
        SelectTipo.value = "tVacio";
    }else{
        alert("ERROR\nNo puede dar de alta sin seleccionar una categoria!");
    }
    
    txtId.value="";
    txtModelo.value="";
    txtAnioFab.value="";
    txtVelMax.value="";
    txtId.value = "";
    
    initConfig();;
    mostrarVehiculos(arrayVehiculos);

}

document.getElementById("btnAlta").addEventListener("click",Alta);

function modificar()
{
    arrayVehiculos.forEach(el=>{
        
        if(el.id == txtId.value)
        {
            if(confirm("Esta seguro que desea modificar  este vehiculo?"))
            {
                el.modelo = txtModelo.value;
                el.anioFabricacion = txtAnioFab.value;
                el.velocidadMaxima = txtVelMax.value;
                if(el.hasOwnProperty("autonomia")){
                    el.autonomia =  txtAutonomia.value;
                    el.alturaMaxima = txtAM.value;
                    
                }else{
                    el.cantidadPuertas = txtCantPue.value;
                    el.cantidadRuedas = txtCantRue.value;
                    
                }
            }
            
        }

    })
    initConfig();
    mostrarVehiculos(arrayVehiculos);
}

function eliminar()
{    
    let elementoAEliminar;
    arrayVehiculos.forEach(el=>{
        if(el.id == txtId.value)
        {
            elementoAEliminar = el;
        }
    })
    
    if(confirm("Desea eliminar este vehiculo?"))
    {
        let index = arrayVehiculos.indexOf(elementoAEliminar);
        if(index>-1)
        {
            arrayVehiculos.splice(index,1);
            mostrarVehiculos(arrayVehiculos);
            initConfig();
        }else{
            alert("El vehiculo no pudo ser eliminado con exito!");
        }
    }


}

document.getElementById("btnEliminar").addEventListener("click",eliminar)

document.getElementById("btnModificar").addEventListener("click",modificar)

//FUNCION PARA ORDENAMIENTO
function toSort(valueA, valueB) {
    if (valueA) {
        if (valueA > valueB) {
            return 1;
        } else if (valueA == valueB) {
            return 0;
        } else {
            return -1;
        }
    }
}

//ORDENAMIENTOS

document.getElementById("btnID").addEventListener("click",()=>{
    arrayVehiculos.sort((a,b) => toSort(a.id,b.id));
    mostrarVehiculos(arrayVehiculos);
});
document.getElementById("btnModelo").addEventListener("click",()=>{
    arrayVehiculos.sort((a,b) => toSort(a.modelo,b.modelo));
    mostrarVehiculos(arrayVehiculos);
});
//muestra primero mas viejos
document.getElementById("btnAnioFab").addEventListener("click",()=>{
    arrayVehiculos.sort((a,b) => toSort(a.anioFabricacion,b.anioFabricacion));
    mostrarVehiculos(arrayVehiculos);
});
//muestra primero maximas velocidades
document.getElementById("btnVelMax").addEventListener("click",()=>{
    arrayVehiculos.sort((a,b) => toSort(b.velocidadMaxima,a.velocidadMaxima));
    mostrarVehiculos(arrayVehiculos);
});

document.getElementById("btnAltMax").addEventListener("click",()=>{
    arrayVehiculos.sort((a,b) => toSort(a.alturaMaxima,b.alturaMaxima));
    mostrarVehiculos(arrayVehiculos);
});

document.getElementById("btnAutonomia").addEventListener("click",()=>{
    arrayVehiculos.sort((a,b) => toSort(a.autonomia,b.autonomia));
    mostrarVehiculos(arrayVehiculos);
});

document.getElementById("btnCantPue").addEventListener("click",()=>{
    arrayVehiculos.sort((a,b) => toSort(a.cantidadPuertas,b.cantidadPuertas));
    mostrarVehiculos(arrayVehiculos);
});

document.getElementById("btnCantRue").addEventListener("click",()=>{
    arrayVehiculos.sort((a,b) => toSort(a.cantidadRuedas,b.cantidadRuedas));
    mostrarVehiculos(arrayVehiculos);
});
