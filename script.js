/*
=========================================================
=== SCRIPT OFICIAL DO CAOS - A VINGANÇA DO IGOR 2.0  ===
=========================================================
   (Muita função, pouca sanidade)
*/

// Vamos esperar o HTML carregar antes de quebrar tudo
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SELEÇÃO DE ELEMENTOS (O Arsenal) ---
    const elementos = {
        tituloIgor: document.getElementById('titulo-igor'),
        botaoChato: document.getElementById('botao-chato'),
        botaoSecreto: document.getElementById('botao-secreto'),
        resultadoSecreto: document.getElementById('resultado-secreto'),
        botaoHomenagem: document.getElementById('botao-homenagem'),
        tituloBluezao: document.getElementById('titulo-bluezao'),
        comentarioIgor: document.getElementById('comentario-igor'),
        fotosIgor: document.querySelectorAll('.foto-item'),
        container: document.querySelector('.container'),
        imgBluezao: document.querySelector('.img-bluezao'),
        body: document.body
    };

    // --- 2. VARIÁVEIS DE ESTADO (O Controle do Caos) ---
    let estado = {
        cliquesBotaoChato: 0,
        cliquesHomenagem: 0,
        segredoRevelado: false,
        konamiIndex: 0,
        tituloOriginal: elementos.tituloIgor.textContent,
        scrambleInterval: null
    };

    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'
    ];

    // --- 3. FUNÇÕES INICIAIS (A Calmaria antes da Tempestade) ---
    function iniciarAlertas() {
        alert("!!! ATENÇÃO !!! VOCÊ ENTROU NA ZONA MAIS AVANÇADA DO IGOR!");
        alert("CUIDADO: ESTE SITE FOI ATUALIZADO COM NOVOS 'RECURSOS'. BOA SORTE.");
    }

    function iniciarRotacaoFotos() {
        elementos.fotosIgor.forEach(foto => {
            const rotacao = Math.random() * 10 - 5; // Entre -5 e 5 graus
            foto.style.setProperty('--rot', rotacao);
        });
    }

    function iniciarPiscaTituloPagina() {
        let piscarTitulo = true;
        setInterval(() => {
            document.title = piscarTitulo ?
                "!!! O MUNDO INCRIVEL DO IGOR - ELE VOLTOU !!!" :
                "****** IGOR IGOR IGOR O REI DA INTERNET ******";
            piscarTitulo = !piscarTitulo;
        }, 800);
    }

    // --- 4. NOVAS FUNÇÕES "DAORAS" E IRRITANTES ---

    /**
     * FUNÇÃO 1: O SEGUIDOR DO BLUEZÃO (Irritante e Daora)
     * Cria uma imagem do Bluezão que segue o cursor do mouse pela tela.
     */
    function iniciarSeguidorBluezao() {
        const seguidor = document.createElement('img');
        seguidor.src = 'https://pbs.twimg.com/profile_images/1506085188603684872/s5zJj8jV_400x400.jpg'; // URL do Bluezão
        seguidor.style.position = 'fixed'; // Posição fixa para flutuar
        seguidor.style.width = '75px';
        seguidor.style.height = '75px';
        seguidor.style.borderRadius = '50%';
        seguidor.style.border = '3px solid red';
        seguidor.style.zIndex = '9999';
        seguidor.style.pointerEvents = 'none'; // Para não bloquear cliques
        seguidor.style.transition = 'top 0.1s ease, left 0.1s ease'; // Suavidade
        elementos.body.appendChild(seguidor);

        window.addEventListener('mousemove', (e) => {
            seguidor.style.left = e.pageX + 15 + 'px';
            seguidor.style.top = e.pageY + 15 + 'px';
        });
    }

    /**
     * FUNÇÃO 2: O BOTÃO FUJÃO (Muito Irritante)
     * Faz o botão secreto fugir do mouse.
     */
    function iniciarBotaoFujao() {
        elementos.botaoSecreto.addEventListener('mouseover', () => {
            if (estado.segredoRevelado) return; // Para de fugir depois de clicado

            alert("NÃO TENTE CLICAR NO SECRETO!");
            
            // Força o botão a ter posicionamento absoluto para fugir
            elementos.botaoSecreto.style.position = 'absolute';
            
            const maxX = window.innerWidth - elementos.botaoSecreto.clientWidth;
            const maxY = window.innerHeight - elementos.botaoSecreto.clientHeight;

            elementos.botaoSecreto.style.left = Math.floor(Math.random() * maxX) + 'px';
            elementos.botaoSecreto.style.top = Math.floor(Math.random() * maxY) + 'px';
        });
    }

    /**
     * FUNÇÃO 3: TELA DE AVISO FALSA (Interessante e Irritante)
     * Substitui o primeiro alert chato por uma tela de "hacking".
     */
    function mostrarAvisoFalso() {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.95); z-index: 10000; color: #00FF00;
            font-family: 'Courier New', monospace; padding: 50px; font-size: 24px;
            box-sizing: border-box; overflow-y: auto;
        `;
        
        const textoAviso = document.createElement('pre');
        overlay.appendChild(textoAviso);
        elementos.body.appendChild(overlay);

        const mensagem = `
AVISO DE SEGURANÇA DO SISTEMA IGOR-NET
--------------------------------------------
> Detectada atividade suspeita...
> Iniciando varredura de 'bom gosto'...
> Varredura falhou. 'bom gosto' não encontrado.
> 
> Ameaça detectada: Nível 9000 (BLUEZÃO)
> Tentando conter a ameaça...
> 
> ...FALHA NA CONTENÇÃO...
> O NÍVEL DE 'MOLESTAMENTO' DESTE SITE EXCEDEU OS LIMITES!
> 
> O IGOR É O RESPONSÁVEL.
> 
> Pressione [FECHAR] para aceitar os riscos e continuar.
        `;

        let i = 0;
        function digitar() {
            if (i < mensagem.length) {
                textoAviso.textContent += mensagem.charAt(i);
                i++;
                setTimeout(digitar, 30); // Velocidade da digitação
            } else {
                const botaoFechar = document.createElement('button');
                botaoFechar.textContent = '[FECHAR]';
                botaoFechar.style.cssText = `
                    background: #00FF00; color: black; font-size: 24px;
                    border: 2px solid #00FF00; padding: 15px; cursor: pointer;
                    margin-top: 30px;
                `;
                overlay.appendChild(botaoFechar);
                botaoFechar.onclick = () => overlay.remove();
            }
        }
        digitar();
    }

    /**
     * FUNÇÃO 4: EMBARALHADOR DE TÍTULO (Cool)
     * Embaralha o H1 principal quando o mouse passa por cima.
     */
    function iniciarEmbaralhadorDeTitulo() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&!';
        
        elementos.tituloIgor.addEventListener('mouseover', () => {
            if (estado.scrambleInterval) clearInterval(estado.scrambleInterval);

            estado.scrambleInterval = setInterval(() => {
                let novoTexto = '';
                for (let i = 0; i < estado.tituloOriginal.length; i++) {
                    if (estado.tituloOriginal[i] === ' ') {
                        novoTexto += ' ';
                    } else {
                        novoTexto += chars[Math.floor(Math.random() * chars.length)];
                    }
                }
                elementos.tituloIgor.textContent = novoTexto;
            }, 50); // Velocidade do embaralhamento
        });

        elementos.tituloIgor.addEventListener('mouseout', () => {
            clearInterval(estado.scrambleInterval);
            estado.scrambleInterval = null;
            elementos.tituloIgor.textContent = estado.tituloOriginal; // Restaura
        });
    }

    /**
     * FUNÇÃO 5: CAOS NA DIGITAÇÃO (Irritante)
     * Faz letras flutuantes aparecerem enquanto digita no textarea.
     */
    function iniciarCaosTextarea() {
        elementos.comentarioIgor.addEventListener('keyup', (e) => {
            const letra = e.key;
            if (letra.length > 1) return; // Ignora 'Enter', 'Shift', etc.

            const particula = document.createElement('span');
            particula.textContent = letra;
            particula.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%; 
                top: ${Math.random() * 100}%;
                font-size: ${Math.random() * 20 + 15}px;
                color: rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255});
                pointer-events: none;
                animation: flutuar 1.5s ease-out forwards;
            `;
            // Adiciona a animação no CSS (ou aqui via JS)
            // Vamos adicionar a keyframe no CSS (é melhor, mas vamos fazer via JS)
            // ... ah, espera, o usuário não pode mexer no CSS. Vamos fazer com JS.
            
            let anim = particula.animate([
                { transform: 'translateY(0) scale(1)', opacity: 1 },
                { transform: 'translateY(-100px) scale(1.5)', opacity: 0 }
            ], {
                duration: 1500,
                easing: 'ease-out'
            });
            anim.onfinish = () => particula.remove();
            
            elementos.comentarioIgor.parentElement.style.position = 'relative'; // Garante que o span fique dentro
            elementos.comentarioIgor.parentElement.appendChild(particula);
        });
    }
    
    /**
     * FUNÇÃO 6: O KONAMI CODE (Muito Daora)
     * Um Easter Egg que faz algo especial.
     */
    function iniciarKonamiCode() {
        window.addEventListener('keydown', (e) => {
            if (e.key === konamiCode[estado.konamiIndex]) {
                estado.konamiIndex++;
                if (estado.konamiIndex === konamiCode.length) {
                    ativarEfeitoKonami();
                    estado.konamiIndex = 0; // Reseta
                }
            } else {
                estado.konamiIndex = 0; // Errou, reseta
            }
        });
    }
    
    function ativarEfeitoKonami() {
        alert("KONAMI CODE ATIVADO! PREPARE-SE PARA A GLÓRIA MÁXIMA!");
        // Efeito: Deixa o Bluezão gigante e piscando
        elementos.imgBluezao.style.transition = 'transform 0.5s ease';
        elementos.imgBluezao.style.transform = 'scale(3) rotate(1080deg)';
        
        let pisca = 0;
        const piscaInterval = setInterval(() => {
            elementos.body.style.backgroundColor = pisca % 2 === 0 ? '#FF0000' : '#0000FF';
            pisca++;
            if (pisca > 10) {
                clearInterval(piscaInterval);
                elementos.body.style.backgroundColor = ''; // Volta ao normal
                elementos.imgBluezao.style.transform = 'scale(1) rotate(0deg)'; // Volta ao normal
            }
        }, 200);
    }
    
    /**
     * FUNÇÃO 7: CAOS NAS CORES (Irritante)
     * Muda a cor da borda do container principal aleatoriamente.
     */
     function iniciarCaosBorda() {
         setInterval(() => {
            const corR = Math.floor(Math.random() * 255);
            const corG = Math.floor(Math.random() * 255);
            const corB = Math.floor(Math.random() * 255);
            elementos.container.style.borderColor = `rgb(${corR}, ${corG}, ${corB})`;
         }, 1000); // Muda a cada segundo
     }

    // --- 5. LÓGICA ANTIGA (Botões e Validação) ---

    // Botão Chato
    elementos.botaoChato.addEventListener('click', () => {
        estado.cliquesBotaoChato++;
        
        switch (estado.cliquesBotaoChato) {
            case 1:
                mostrarAvisoFalso(); // Nova função!
                break;
            case 3:
                alert("Parabéns, você clicou 3 vezes! Ganhou uma foto do igor de sunga!");
                break;
            case 5:
                alert("Impressionante sua determinação! Continue, a vida te repreende.");
                break;
            default:
                if (estado.cliquesBotaoChato > 5 && estado.cliquesBotaoChato % 2 === 0) {
                    alert(`Você já clicou ${estado.cliquesBotaoChato} vezes! Sério? O que você espera?`);
                } else {
                    alert("Igor agradece sua dedicação em clicar. É a única coisa que ele faz também.");
                }
        }
        
        // Mudar o texto do título
        if (estado.cliquesBotaoChato % 4 === 0) {
            estado.tituloOriginal = "IGOR: A LENDA VIVA!";
            elementos.tituloIgor.textContent = estado.tituloOriginal;
            elementos.tituloIgor.style.color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
        } else if (estado.cliquesBotaoChato % 3 === 0) {
            estado.tituloOriginal = "O REINO DO IGOR!";
            elementos.tituloIgor.textContent = estado.tituloOriginal;
        } else {
            estado.tituloOriginal = "O IGOR É O HOMOSEXUAL!";
            elementos.tituloIgor.textContent = estado.tituloOriginal;
        }
    });

    // Botão Secreto
    elementos.botaoSecreto.addEventListener('click', () => {
        if (estado.segredoRevelado) {
            alert("Já te contei o segredo, seu VIADO!");
            return;
        }
        
        elementos.resultadoSecreto.classList.remove('escondido');
        estado.segredoRevelado = true;
        elementos.botaoSecreto.textContent = "SEGREDO REVELADO!";
        elementos.botaoSecreto.style.backgroundColor = 'gray';
        elementos.botaoSecreto.style.cursor = 'not-allowed';
        elementos.botaoSecreto.style.position = 'static'; // Para de fugir
    });

    // Botão Bluezão
    elementos.botaoHomenagem.addEventListener('click', () => {
        estado.cliquesHomenagem++;
        const frases = [
            "Você é um homem de cultura! Viva Bluezão!",
            "A lenda vive! Bluezão para presidente!",
            "NAO MANDEM CEBOLA PRA MINHA CASA ",
            "Mais um clique para a glória do Bluezão!",
            "Obrigado por louvar o mestre!"
        ];
        alert(frases[estado.cliquesHomenagem % frases.length]);

        const frasesTitulo = [
            "O ÍDOLO DO IGOR: O GRANDE BLUEZÃO!",
            "BLUEZÃO: O VERDADEIRO REI DA INTERNET!",
            "HONRA AO MESTRE BLUEZÃO!",
            "NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA NAO MANDEM CEBOLA PRA MINHA CASA ",
            "A SABEDORIA DE BLUEZÃO!"
        ];
        elementos.tituloBluezao.textContent = frasesTitulo[Math.floor(Math.random() * frasesTitulo.length)];
    });

    // Validação do Comentário
    elementos.comentarioIgor.addEventListener('blur', () => {
        const valor = elementos.comentarioIgor.value.toLowerCase();
        if (valor.includes('legal') || valor.includes('bonito')) {
            alert("CUIDADO! Não fale bem do Igor aqui, senão o site se autodestrói! ");
            elementos.comentarioIgor.value = "O Igor é um mendigo!";
            elementos.comentarioIgor.style.backgroundColor = 'red';
            elementos.comentarioIgor.style.color = 'white';
        } else if (valor.length < 10 && valor.length > 0) {
            alert("Seu comentário sobre o Igor é muito curto. Ele merece MENOS dedicação!");
        } else if (valor.length === 0) {
            elementos.comentarioIgor.placeholder = "Fale algo... NEGATIVO sobre o Igor!";
        } else {
            elementos.comentarioIgor.style.backgroundColor = 'yellow';
            elementos.comentarioIgor.style.color = 'purple';
        }
    });

    // --- 6. INICIALIZAÇÃO DE TUDO ---
    // (A ordem importa um pouco)

    iniciarAlertas();
    iniciarRotacaoFotos();
    iniciarPiscaTituloPagina();
    
    // As novas funções caóticas:
    iniciarSeguidorBluezao();
    iniciarBotaoFujao();
    iniciarEmbaralhadorDeTitulo();
    iniciarCaosTextarea();
    iniciarKonamiCode();
    iniciarCaosBorda();

    console.log("igor da a BUNDA");

});