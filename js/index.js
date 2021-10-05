document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    document.getElementById("Equipos").addEventListener("click", Equipos);
    document.getElementById("NuevoPartido").addEventListener("click", NuevoPartido);    
}

function Equipos()
{   
    window.location = "Equipos.html";
}

function NuevoPartido()
{
    window.location = "NuevaPartida.html";
}