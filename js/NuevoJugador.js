var xdb = null;
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    
    document.getElementById("AgregarJugador").addEventListener("click", AgregarJugador);

    $("#NombreEquipo").html(sessionStorage.getItem("Nombre_equipo"));

    ListarJugadores();
}

function AgregarJugador()
{
    sqlitePlugin.openDatabase({ name: 'Voley.db',location: 'default',androidDatabaseProvider: 'system',createFromLocation: 1}, async function(db){
        db.transaction(function(tx){
            tx.executeSql('CREATE TABLE IF NOT EXISTS Jugadores (Nombre,Numero,Equipo)');
            tx.executeSql('Insert into Jugadores values (?,?,?)', [$("#NombreJugador").val(),$("#NumeroJugador").val(),sessionStorage.getItem("Nombre_equipo")]);
        }, function(error){
            alert("Transaciont ERROR: " + error.message);
        }, function(){            
            
            window.location = "EditarEquipo.html";
        });
    });
}

function ListarJugadores()
{
    sqlitePlugin.openDatabase({ name: 'Voley.db',location: 'default',androidDatabaseProvider: 'system',createFromLocation: 1}, async function(db){
        await db.transaction(async function(tx){                   
            tx.executeSql('CREATE TABLE IF NOT EXISTS Jugadores (Nombre,Numero,Equipo)');
            await tx.executeSql('select * from Jugadores',[], function(tx, result){
                var nciu = result.rows.length;                
                var html = "";
                if (nciu>0){
                    for(var i=0;i<nciu;i++)
                    {
                        var fila=result.rows.item(i);
                        alert(fila['Nombre'])                        
                        html += "<div>"+fila['Nombre']+"</div>";
                    }
                    $("#Equipos").html(html);
                }
            },function(tx,error){
                alert('Select error: ' + error.message);
            });
        });
    });     
}