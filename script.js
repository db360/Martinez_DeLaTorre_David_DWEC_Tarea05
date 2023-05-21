///Creamos un event listener para esperar que todo el contenido del DOM haya cargado para ejecutar el script
document.addEventListener("DOMContentLoaded", function() {

//* Creamos toda la esctura HTML con métodos y propiedades del DOM como se nos pide en el ejercicio*//
 // Div y clase Principal
  var containerDiv = document.createElement("div");
  containerDiv.className = "container";
 // Div y clase  para el formulario
  var formularioDiv = document.createElement("div");
  formularioDiv.className = "formulario";
  // Div y clase para el campo del ancho
  var anchoDiv = document.createElement("div");
  anchoDiv.className = "ancho";
  // Etiqueta y contenido para el label del ancho
  var anchoLabel = document.createElement("label");
  anchoLabel.setAttribute("for", "ancho");
  anchoLabel.textContent = "Ancho del tablero:";
  // Atributos para el input del ancho
  var anchoInput = document.createElement("input");
  anchoInput.setAttribute("type", "number");
  anchoInput.setAttribute("id", "ancho");
  // Añadimos el Label y el Input al Div contenedor
  anchoDiv.appendChild(anchoLabel);
  anchoDiv.appendChild(anchoInput);

  // Div y clase para el campo del ancho
  var altoDiv = document.createElement("div");
  altoDiv.className = "alto";
  // Etiqueta y contenido para el label del alto
  var altoLabel = document.createElement("label");
  altoLabel.setAttribute("for", "alto");
  altoLabel.textContent = "Alto del tablero:";
  // Atributos para el input del alto
  var altoInput = document.createElement("input");
  altoInput.setAttribute("type", "number");
  altoInput.setAttribute("id", "alto");
  // Añadimos el Label y el Input al Div contenedor
  altoDiv.appendChild(altoLabel);
  altoDiv.appendChild(altoInput);
  // Añadimos los dos campos al div del formulario
  formularioDiv.appendChild(anchoDiv);
  formularioDiv.appendChild(altoDiv);
  //Creamos el div contenedor de los botones
  var botonesDiv = document.createElement("div");
  botonesDiv.className = "botones";
  // Creamos los elementos de los botones, primero el de generar tablero, luego iniciar
  var crearBtn = document.createElement("button");
  crearBtn.className = "btn";
  crearBtn.setAttribute("id", "crear");
  crearBtn.textContent = "Generar tablero";

  var iniciarBtn = document.createElement("button");
  iniciarBtn.className = "btn";
  iniciarBtn.setAttribute("id", "iniciar");
  iniciarBtn.textContent = "Iniciar luces";
  // Aádimos los botones creados al div contenedor
  botonesDiv.appendChild(crearBtn);
  botonesDiv.appendChild(iniciarBtn);
  // Creamos un div para el error
  var infoDiv = document.createElement("div");
  infoDiv.className = "info";
  infoDiv.setAttribute("id", "info");
  // Creamos un div para el tablero, con su clase y atributos
  var tableroDiv = document.createElement("div");
  tableroDiv.className = "tablero";
  tableroDiv.setAttribute("id", "tablero");
  // Por ultimo añadimos toda la estructura creada al div contenedor principal
  containerDiv.appendChild(formularioDiv);
  containerDiv.appendChild(botonesDiv);
  containerDiv.appendChild(infoDiv);
  containerDiv.appendChild(tableroDiv);
  // Y a su vez, el div contenedor al body del documento
  document.body.appendChild(containerDiv);

  /* Listener para el clic en el boton de generar tablero */
    crearBtn.addEventListener("click", function() {
      // Reseteamos el texto del div de información.
      infoDiv.innerText = "";
      // Obtenemos los valores del ancho y alto del tablero y lo guardamos en sus variables
      var ancho = parseInt(document.getElementById("ancho").value);
      var alto = parseInt(document.getElementById("alto").value);
      // Si el alto y ancho es mayor que 0, llamamos la función y mostramos el tablero
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

    // Funcion con la  que generamos el tablero con el ancho y alto que proporciona el usuario
    function generarTablero(ancho, alto) {
      // reseteamos el tablero
      tableroDiv.innerText = "";
      // Le damos el ancho y el alto al with y height multiplicado por el tamaño de cada casilla(total tablero)
      tableroDiv.style.width = (ancho * 100) + "px";
      tableroDiv.style.height = (alto * 100) + "px";
      // Iteramos con un for sobre el alto para sacar las filas, creamos un div para cada una
      for (var i = 0; i < alto; i++) {
        var filaDiv = document.createElement("div"); // Creamos un div para cada fila
        filaDiv.className = "fila"; /// Aádimos fila como clase al div
        // Hacemos lo mismo para el ancho,cada div con casilla creada lo añadimos como hijo a la fila
        for (var j = 0; j < ancho; j++) {
          // Creamos un div para la casilla
          var casillaDiv = document.createElement("div");
          // Le asignamo un classname
          casillaDiv.className = "casilla";
          // Le damos 100px de width y height a cada casilla
          casillaDiv.style.width = "100px";
          casillaDiv.style.height = "100px";
          filaDiv.appendChild(casillaDiv);
        }
        // Y para finalizar añadimos el total de las casillas al tablero
        tableroDiv.appendChild(filaDiv);
      }
    }

    // Funcion que inicia el cambio de color de las casillas
    function iniciarLuces() {
      // Seleccionamos las casilla
      var casillas = document.getElementsByClassName("casilla");
      // Si el numero de casillas es mayor que  0, continuamos
      if(casillas.length > 0) {
        // Creamos un intervalo para que se vaya cambiando el background color de cada casilla cada 1seg
        var intervalo = setInterval(function() {
          // Creamos un array con los 4 colores que vamos a usar.
          var colores = ["red", "green", "blue", "yellow"];
          // Iteramos entre el tamaño de las casillas
          for (var i = 0; i < casillas.length; i++) {
            ///Creamos un index con Math.random para que escoja cada vez un color aleatorio por el index del array
            var colorIndex = Math.floor(Math.random() * colores.length);
            // Vamos añadiendo a cada casilla el color aleatorio.
            casillas[i].style.backgroundColor = colores[colorIndex];
          }
        },1000);

        // setTimeout de 10 segundos que cambia el color de las casillas a blanco cuando finaliza.
        setTimeout(function() {
          // Limpiamos el intervalo para colorear casillas
          clearInterval(intervalo);
          // Iteramos sobre cada casilla y le otorgamos el color blanco.
          for (var i = 0; i < casillas.length; i++) {
            casillas[i].style.backgroundColor = "white";
          }
        }, 10000);
      }
    }
  });