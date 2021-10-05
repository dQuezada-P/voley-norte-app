var db = null;
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    
    document.getElementById("NuevoEquipo").addEventListener("click", NuevoEquipo);
    
    ListarEquipos();
}

function ListarEquipos()
{   
    sqlitePlugin.openDatabase({ name: 'Voley.db',location: 'default',androidDatabaseProvider: 'system',createFromLocation: 1}, async function(db){
        await db.transaction(async function(tx){                   
            tx.executeSql('CREATE TABLE IF NOT EXISTS Equipos (Nombre)');
            await tx.executeSql('select * from Equipos',[], function(tx, result){ 
                var nciu = result.rows.length;
                var html = "";
                if (nciu>0){
                    for(var i=0;i<nciu;i++)
                    {
                        var fila=result.rows.item(i);                       
                        html += '<div><button onclick="Jugadores(' + i + ')" id="Equipo_' + i +'" value="' + fila['Nombre'] + '" >' + fila['Nombre'] + '</button></div>';                        
                    }
                    $("#Equipos").append(html);
                }
            },function(tx,error){
                alert('Select error: ' + error.message);
            });
        });
    }); 
}

function NuevoEquipo()
{    
    window.location = "NuevoEquipo.html";
}

function Jugadores(Equipo)
{
    sessionStorage.setItem("EquipoEditar",$("#Equipo_"+Equipo).val());
    window.location = "EditarEquipo.html";
}