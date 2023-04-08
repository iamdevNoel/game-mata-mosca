//Variáveis globais
var largura;
var altura;
var tipoDeMosca;
var isFlipped;
var coordenadaX;
var coordenadaY;



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

function Flipar() {
    isFlipped = Math.floor(Math.random() * 2) + 1;

    switch (isFlipped) {
        case 2:
            return 'flip';
    }
}

function CriarMoscas() {
    if (document.getElementById('mosca')) {
        document.getElementById('mosca').remove();
    }

    var mosca = document.createElement('img');
    mosca.src = 'assets/mosca.png';
    mosca.id = 'mosca';
    mosca.className = EscolherTipoMosca() + ' ' + Flipar();

    CriarPosicaoAleatoria();
    mosca.style.position = 'absolute';
    mosca.style.left = coordenadaX + 'px';
    mosca.style.top = coordenadaY + 'px';

    document.body.appendChild(mosca);
}