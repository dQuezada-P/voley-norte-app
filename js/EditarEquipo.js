document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    ListarJugadores();    
    document.getElementById("NuevoJugador").addEventListener("click", NuevoJugador);    
}

function ListarJugadores()
{
    alert("1");
    sqlitePlugin.openDatabase({ name: 'Voley.db',location: 'default',androidDatabaseProvider: 'system',createFromLocation: 1}, function(db){
        db.transaction(function(tx){
            tx.executeSql('CREATE TABLE IF NOT EXISTS Jugadores (Nombre,Numero,Equipo)');
            alert(sessionStorage.getItem("EquipoEditar"));
            tx.executeSql('select * from Jugadores where Equipo=?',[sessionStorage.getItem("EquipoEditar")], function(tx, result){
                //tx.executeSql('select * from Jugadores',[], function(tx, result){
                var nciu = result.rows.length;
                var html = "";                                
                alert(sessionStorage.getItem("EquipoEditar"));
                if (nciu>0){
                    for(var i=0;i<nciu;i++)
                    {
                        var fila=result.rows.item(i);
                        alert(fila['Nombre']);                        
                        html += "<div>"+fila['Nombre']+"</div>";
                        html += "<div>"+fila['Numero']+"</div>";
                    }
                    alert(html);
                    $("#Jugadores").append(html);
                }
            });
        });
    });    
}

function NuevoJugador()
{
    window.location = "NuevoJugador.html"
}