document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {    
    document.getElementById("NuevoJugador").addEventListener("click", GuardarEquipo);    
}

function GuardarEquipo()
{
    sqlitePlugin.openDatabase({ name: 'Voley.db',location: 'default',androidDatabaseProvider: 'system',createFromLocation: 1}, async function(db){
        db.transaction(function(td){
            td.executeSql('CREATE TABLE IF NOT EXISTS Equipos (Nombre)');
            td.executeSql('select * from Equipos where Nombre = ?',[$("#NombreEquipo").val()], function(tx, result){ 
                var nciu = result.rows.length;                
                if (nciu > 0)
                {
                    alert('Ya existe un equipo con este nombre.');
                }
                else 
                {
                    db.transaction(function(tx){                        
                        tx.executeSql('Insert into Equipos values (?)', [$("#NombreEquipo").val()]);
                    }, function(error){
                        alert("Transaciont ERROR: " + error.message);
                    }, function(){
                        sessionStorage.setItem("Nombre_equipo", $("#NombreEquipo").val());
                        window.location = "NuevoJugador.html";
                    });         
                }
            });

        });        
    });
}