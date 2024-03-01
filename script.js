const html = document.querySelector("html");
const focoBotao = document.querySelector(".app__card-button--foco");
const descansoCurtoBotao = document.querySelector(".app__card-button--curto");
const descansoLongoBotao = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseBotao = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector("#alternar-musica");
const iniciarOuPausarBotao = document.querySelector('#start-pause span');
const imagemBotaoPausePlay = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

const musica = new Audio('/sons/luna-rise-part-one.mp3');
const musicaAoPausarTimer = new Audio('/sons/pause.mp3');
const musicaAoIniciarTimer = new Audio('/sons/play.wav');
const musicaAoAcabarTimer = new Audio('/sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;


musica.loop = true;



musicaFocoInput.addEventListener('change', () => {
  if(musica.paused){
    musica.play();
  } else {
    musica.pause();
  }
})

focoBotao.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500;
  alterarContexto("foco");
  focoBotao.classList.add('active');
});

descansoCurtoBotao.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;
  alterarContexto("descanso-curto");
  descansoCurtoBotao.classList.add('active');
});

descansoLongoBotao.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;
  alterarContexto("descanso-longo");
  descansoLongoBotao.classList.add('active');
});

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    })
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
      break;
    case "descanso-curto":
      titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `;
      break;
    case "descanso-longo":
      titulo.innerHTML = `
            Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>
        `;
      break;
    default:
      break;
  }
}

const contagemRegressiva = () => {
  if(tempoDecorridoEmSegundos <= 0) {
    musicaAoAcabarTimer.play();
    alert('Tempo finalizado');
    zerar();
    return
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
}

startPauseBotao.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
  if(intervaloId){
    musicaAoPausarTimer.play();
    zerar();
    return
  }
  musicaAoIniciarTimer.play();
  intervaloId = setInterval(contagemRegressiva, 1000) 
  iniciarOuPausarBotao.textContent = "Pausar"
  imagemBotaoPausePlay.setAttribute('src', `/imagens/pause.png`)
}

function zerar() {
  clearInterval(intervaloId)
  imagemBotaoPausePlay.setAttribute('src', `/imagens/play_arrow.png`)
  iniciarOuPausarBotao.textContent = "Começar"
  intervaloId = null
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit'});
  tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()