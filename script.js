//Variáveis globais
var largura;
var altura;
var tipoDeMosca;
var isFlipped;
var coordenadaX;
var coordenadaY;
var vidas = 3;
var tempo = 15;
var cronometro;
var nivel;
var tempoApareceMosca;



//Modificadores de atributos

/*Recupera a url com '?' seguido do nivel escolhido pelo usuário
no index.html*/
nivel = window.location.search;
//retira o ? para armazenar somente o nível 
nivel = nivel.replace('?', '');

//entrega o nivel ao setInterval scriptado no arquivo game.html
if (nivel == 'normal') {
    tempoApareceMosca = 1500;
} else if (nivel == 'dificil') {
    tempoApareceMosca = 1000;
} else if (nivel == 'muitodificil') {
    tempoApareceMosca = 750; 
}



//Funções

/*Função atribuída ao body para que o tamanho da tela 
seja definido em tempo de execução, caso o usuário 
altere o tamanho da tela*/
function DefinirTamanhoTela() {
    altura = window.innerHeight;
    largura = window.innerWidth;
}

function CriarPosicaoAleatoria() {
    coordenadaX = Math.floor(Math.random() * largura);
    coordenadaY = Math.floor(Math.random() * altura);

    //controle de posição mínima para não aparecer na tela incompleto
    coordenadaX >= 90 ? coordenadaX -= 90 : coordenadaX = 90;
    coordenadaY >= 90 ? coordenadaY -= 90 : coordenadaY = 90;
}

function EscolherTipoMosca() {
    tipoDeMosca = Math.floor(Math.random() * 3) + 1;

    switch (tipoDeMosca) {
        case 1:
            return 'mosca1';
        case 2:
            return 'mosca2';
        case 3:
            return 'mosca3';
    }
}

/*Função que determina aleatoriamente se a mosca será
exibida "olhando" para esquerda ou direita*/ 
function Flipar() {
    isFlipped = Math.floor(Math.random() * 2) + 1;

    switch (isFlipped) {
        case 2:
            return 'flip';
    }
}

function ControlarMoscas() {
    if (vidas == 0) {
        window.location.href = 'gameover.html';
    }

    //caso já haja um elemento mosca na tela, elimina-o antes de criar outro
    if (document.getElementById('mosca')) {
        document.getElementById('mosca').remove();
        
        document.getElementById('vida' + vidas).src = 'assets/coracao_vazio.png';
        vidas--;
    }
    
    var mosca = document.createElement('img');
    mosca.src = 'assets/mosca.png';
    mosca.id = 'mosca';
    //determina classes do elemento mosca de acordo com retorno das funções
    mosca.className = EscolherTipoMosca() + ' ' + Flipar();

    //elemento mosca recebe valores para determinar seu posicionamento em relação ao body
    CriarPosicaoAleatoria();
    mosca.style.position = 'absolute';
    mosca.style.left = coordenadaX + 'px';
    mosca.style.top = coordenadaY + 'px';

    mosca.onclick = function() {
        this.remove();
    }

    if (vidas > 0) {
        //adiciona o elemento mosca ao body
        document.body.appendChild(mosca);
    }
}

cronometro = setInterval(
    function() {
        if (tempo < 0) {
            clearInterval(cronometro);
            window.location.href = 'vitoria.html';
        } else {
            document.getElementById('tempo').innerHTML = tempo;
            tempo--;
        }
    }, 1000
);