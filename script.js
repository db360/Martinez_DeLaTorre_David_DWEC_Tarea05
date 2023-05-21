document.addEventListener("DOMContentLoaded", function() {
  // Creamos las variables para los dos botones y el div donde vamos a mostrar el tablero, accedemos por su id
    var generarBtn = document.getElementById("generar");
    var iniciarBtn = document.getElementById("iniciar");
    var tableroDiv = document.getElementById("tablero");
    // Variable para el div con la información al usuario
    var infoDiv = document.getElementById("info");

    //Añadimos un listener para el click de generar el tablero, tomará el valor de los inputs
    generarBtn.addEventListener("click", function() {
      // Reseteamos el texto del div de información.
      infoDiv.innerText = "";
      // Obtenemos los valores del ancho y alto del tablero y lo guardamos en sus variables
      var ancho = parseInt(document.getElementById("ancho").value);
      var alto = parseInt(document.getElementById("alto").value);
      // Si el alto y ancho es mayor que 0
      if(alto > 0 && ancho > 0) {
        // Le quitamos el display: none para que se muestre.
        tableroDiv.style.display = "flex";
        //llamamos a la funcion generarTablero con los
        generarTablero(ancho, alto);
      } else {
        var nuevoTexto = document.createTextNode('El alto y ancho del tablero deben ser mayor a 0.');
        infoDiv.appendChild(nuevoTexto);
        // Ocultamos el tablero, ya que hay un error.
        tableroDiv.style.display = "none";
      }

    });
    // Añadimos otro listener para el click en el botón para iniciar las luces
    iniciarBtn.addEventListener("click", function() {
      iniciarLuces();
    });
    // Funcion que genera un tablero con el ancho y alto que proporciona el usuario
    function generarTablero(ancho, alto) {
      tableroDiv.innerHTML = "";
      tableroDiv.style.width = (ancho * 100) + "px";
      tableroDiv.style.height = (alto * 100) + "px";

      for (var i = 0; i < alto; i++) {
        var filaDiv = document.createElement("div"); // Creamos un div para representar una fila
        filaDiv.className = "fila"; // Asignamos la clase "fila" al div de la fila
        for (var j = 0; j < ancho; j++) {
          var casillaDiv = document.createElement("div");
          casillaDiv.className = "casilla";
          filaDiv.appendChild(casillaDiv);
        }
        tableroDiv.appendChild(filaDiv); // Agregar la fila completa al tablero
      }
    }

    function iniciarLuces() {
      var casillas = document.getElementsByClassName("casilla");

      var interval = setInterval(function() {
        var colors = ["red", "green", "blue", "yellow"];

        for (var i = 0; i < casillas.length; i++) {
          var colorIndex = Math.floor(Math.random() * colors.length);
          casillas[i].style.backgroundColor = colors[colorIndex];
        }
      },1000);

      // setTimeout de 10 segundos que quita el color a todas las casillas después
      setTimeout(function() {
        clearInterval(interval);

        for (var i = 0; i < casillas.length; i++) {
          casillas[i].style.backgroundColor = "white";
        }
      }, 10000);
    }
  });
