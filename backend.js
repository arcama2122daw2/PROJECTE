var light = {//Funcio de llum led per a cada estat
  normal : [8.9,4.5,0.5,0.5,0.6,0.5,0.6,0.5,0.5,0.6,0.5,0.6,0.5,0.6,0.5,0.6,0.5,0.6,0.5,1.7,0.5,1.7,0.5,1.7,0.6,1.8,0.4,1.7,0.5,1.7,0.5,1.7,0.5,1.7,0.5,1.7,0.5,0.6,0.5,1.7,0.5,1.7,0.5,0.6,0.5,0.6,0.5,0.6,0.5,0.6,0.5,0.6,0.5,1.7,0.5,0.6,0.5,0.6,0.5,1.7,0.5,1.7,0.5,1.7,0.5,1.7,0.5,39.9,8.9,2.2,0.5]
}

function tempTest() {
  NRF.setAdvertising({}, {
    manufacturerData: [E.getDades()]//Funcio de llum led
  });
  
  var dades = E.getDades();
  print("Menjar:"+dades);
  if (dades = any){
    LED1.write(1);//Led vermell on
  }  
}
setInterval(tempTest, 100);//interval de temps per cada vegada que busca la temperatura ambient


var path = document.getElementsByTagName('path')[0];
path.style="cursor:pointer;fill:#BBB";
function onLine(v) {
    console.log("Received: "+JSON.stringify(v));
}
var connection;
        path.addEventListener("click", function() {
          if (connection) {
            connection.close();
            connection = undefined;
          }
          Puck.connect(function(c) {
            if (!c) {
              alert("Couldn't connect!");
              return;
            }
            connection = c;
            var buf = "";
            connection.on("data", function(d) {
              buf += d;
              var i = buf.indexOf("\n");
              while (i>=0) {
                onLine(buf.substr(0,i));
                buf = buf.substr(i+1);
                i = buf.indexOf("\n");
              }
            });
            connection.write("reset();\n", function() {
              setTimeout(function() {
                connection.write("setInterval(function(){Bluetooth.println(Puck.light());},100);NRF.on('disconnect', function() {reset()});\n",
                  function() { console.log("Ready..."); });
              }, 2000);
            });
          });
        });