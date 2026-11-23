export default class LoadBalancer {
  // import vite.config;
  // Очень важное примечание к этому заданию: все полезные нагрузки запросов должны быть заменены числовым значением строки. В противном случае задание будет считаться невыполненным.

  constructor(servers) {
    // Ejemplo de un servidor:
    // {
    //   id: "server-2",
    //   power: 3,          // Unidades de trabajo por segundo simulado
    //   activeRequest: { id: "P01", payload: "08319462", work: 4 }, // null si está libre
    //   queuedRequests: [{ id: "P02", payload: "74150328", work: 2 }],
    //   activeProgress: 0.25 // Progreso de 0 a 1 (0 si está libre)
    // }
    // Los datos son de solo lectura y se actualizan durante la simulación.
    this.index = 0;
    this.max = servers.length ;
    
    this.servers = Object.freeze([...servers]);
  }

  async onRequestArrival(request, sendToServer) {
    // Ejemplo de la petición que llega:
    // {
    //   id: "request-17",
    //   payload: "08319462", // Datos que envía el cliente
    //   work: 4              // Unidades de trabajo necesarias
    // }
  let mejor = this.servers[0];

  for (let i = 0; i <this.max; i++) {
    const servidor = this.servers[i];
  
    let cola =servidor.queuedRequests.length + 1;

    if(servidor.activeRequest){
      cola = cola + servidor.activeRequest.work;
    }
    // Ordena los servidores por potencia y selecciona el primero disponible.
    let probando = mejor.queuedRequests.length + 1;
    if(mejor.activeRequest){
      probando = probando + mejor.activeRequest.work;
    }

    if(cola < probando){
      mejor = servidor;
    }
  
  }
    // Envía la petición al servidor y devuelve su respuesta al cliente.
    return sendToServer(mejor.id);
  }
  }

