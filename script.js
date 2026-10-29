(() => {
  const $ = (selector) => document.querySelector(selector);

  // Curiosidade do topo: há uma alternativa local caso fatos.js não carregue.
  const fatosLocais = [
    "Margaret Hamilton liderou a equipe responsável pelo software de voo das missões Apollo.",
    "Os alarmes 1201 e 1202 indicavam sobrecarga de recursos do computador de orientação.",
    "O software da Apollo foi projetado para priorizar tarefas importantes durante a descida lunar."
  ];
  const listaFatos = (typeof FATOS !== "undefined" && Array.isArray(FATOS) && FATOS.length) ? FATOS : fatosLocais;
  let indiceFato = Math.floor(Date.now() / 86400000) % listaFatos.length;
  const textoFato = $("#fato-txt");
  const mostrarFato = () => { if (textoFato) textoFato.textContent = listaFatos[indiceFato]; };
  $("#fato-next")?.addEventListener("click", () => {
    indiceFato = (indiceFato + 1) % listaFatos.length;
    mostrarFato();
  });
  mostrarFato();

  const historias = [
    {
      data: "Década de 1960",
      titulo: "Antes de chegar à Lua",
      imagem: "assets/saturn-v.svg",
      alt: "Ilustração do foguete Saturn V na plataforma de lançamento",
      legenda: "O foguete Saturn V",
      paragrafos: [
        "Para levar astronautas à Lua e trazê-los de volta com segurança, a NASA precisava de foguetes, equipamentos e um sistema de software confiável.",
        "O computador de bordo tinha recursos muito limitados para os padrões atuais. Cada tarefa precisava ser planejada com cuidado."
      ],
      citacao: "A exploração espacial também depende de decisões tomadas em linhas de código."
    },
    {
      data: "Uma pioneira da computação",
      titulo: "Quem foi Margaret Hamilton?",
      imagem: "assets/margaret-hamilton.svg",
      alt: "Ilustração de Margaret Hamilton junto a listagens de código",
      legenda: "Margaret Hamilton e o código da Apollo",
      paragrafos: [
        "Margaret Hamilton foi uma matemática e cientista da computação que liderou a equipe do MIT Instrumentation Laboratory responsável pelo software de voo das missões Apollo.",
        "Seu trabalho ajudou a consolidar a engenharia de software como uma área essencial para sistemas complexos e críticos."
      ],
      citacao: "Não bastava fazer o computador funcionar: era preciso prepará-lo para o inesperado."
    },
    {
      data: "Planejar para o inesperado",
      titulo: "E se algo desse errado?",
      imagem: "assets/codigo-apollo.svg",
      alt: "Ilustração de listagens e documentos de programação da Apollo",
      legenda: "O planejamento por trás do software",
      paragrafos: [
        "O que aconteceria se o computador recebesse solicitações demais ao mesmo tempo? Como distinguir o que era urgente do que poderia esperar?",
        "A equipe desenvolveu o software para lidar com determinadas situações de sobrecarga, priorizando as tarefas essenciais em vez de simplesmente abandonar a missão."
      ],
      citacao: "Sistemas confiáveis são projetados pensando também nos momentos difíceis."
    },
    {
      data: "20 de julho de 1969",
      titulo: "Alarmes durante a descida",
      imagem: "assets/eagle-descida.svg",
      alt: "Ilustração do módulo lunar Eagle durante a descida",
      legenda: "O módulo lunar Eagle se aproxima da superfície",
      paragrafos: [
        "Durante a descida da Apollo 11, o computador de orientação emitiu os alarmes 1201 e 1202, relacionados à sobrecarga de recursos.",
        "O software priorizou tarefas importantes, e a equipe de controle avaliou as informações para decidir se a descida poderia continuar."
      ],
      citacao: "Em uma missão crítica, informação clara e decisões rápidas fazem diferença."
    },
    {
      data: "Uma conquista coletiva",
      titulo: "A equipe por trás da missão",
      imagem: "assets/sala-de-controle.svg",
      alt: "Ilustração de uma sala de controle de missão espacial",
      legenda: "A equipe de controle em ação",
      paragrafos: [
        "O pouso da Apollo 11 foi resultado do trabalho conjunto de astronautas, engenheiros, programadores, técnicos e equipes de controle.",
        "A contribuição de Hamilton foi importante, mas a história também pertence às muitas pessoas que trabalharam para tornar a missão possível."
      ],
      citacao: "Grandes conquistas são construídas por muitas mãos."
    },
    {
      data: "20 de julho de 1969",
      titulo: "Um passo histórico",
      imagem: "assets/eagle-na-lua.svg",
      alt: "Ilustração do módulo lunar Eagle na superfície da Lua",
      legenda: "O Eagle na superfície lunar",
      paragrafos: [
        "O módulo lunar Eagle pousou na Lua e a Apollo 11 entrou para a história. A missão mostrou a importância de combinar tecnologia, planejamento e colaboração.",
        "Em 2016, Margaret Hamilton recebeu a Medalha Presidencial da Liberdade por suas contribuições ao programa espacial dos Estados Unidos."
      ],
      citacao: "O legado de Margaret inspira quem transforma perguntas difíceis em soluções."
    }
  ];

  let atual = 0;
  const imagem = $("#story-image");
  const titulo = $("#story-title");
  const data = $("#story-date");
  const texto = $("#story-text");
  const citacao = $("#story-quote");
  const anterior = $("#story-prev");
  const proximo = $("#story-next");
  const pontos = $("#story-dots");
  const numero = $("#story-number");
  const total = $("#story-total");
  const legenda = $("#story-image-caption");

  function renderizarPontos() {
    pontos.replaceChildren();
    historias.forEach((historia, indice) => {
      const ponto = document.createElement("button");
      ponto.type = "button";
      ponto.className = indice === atual ? "active" : "";
      ponto.setAttribute("aria-label", `Ir para a parte ${indice + 1}: ${historia.titulo}`);
      ponto.setAttribute("aria-current", indice === atual ? "step" : "false");
      ponto.addEventListener("click", () => { atual = indice; renderizarHistoria(); });
      pontos.append(ponto);
    });
  }

  function renderizarHistoria() {
    const historia = historias[atual];
    imagem.src = historia.imagem;
    imagem.alt = historia.alt;
    legenda.textContent = historia.legenda;
    titulo.textContent = historia.titulo;
    data.textContent = historia.data;
    texto.replaceChildren();
    historia.paragrafos.forEach((paragrafo) => {
      const p = document.createElement("p");
      p.textContent = paragrafo;
      texto.append(p);
    });
    citacao.textContent = historia.citacao;
    numero.textContent = String(atual + 1).padStart(2, "0");
    total.textContent = String(historias.length).padStart(2, "0");
    anterior.disabled = atual === 0;
    proximo.disabled = atual === historias.length - 1;
    renderizarPontos();
  }
  anterior.addEventListener("click", () => { if (atual > 0) { atual--; renderizarHistoria(); } });
  proximo.addEventListener("click", () => { if (atual < historias.length - 1) { atual++; renderizarHistoria(); } });
  document.addEventListener("keydown", (evento) => {
    if (evento.target.matches("input, textarea, select, button, a")) return;
    if (evento.key === "ArrowRight" && atual < historias.length - 1) { atual++; renderizarHistoria(); }
    if (evento.key === "ArrowLeft" && atual > 0) { atual--; renderizarHistoria(); }
  });
  renderizarHistoria();

  // Navegação compacta em telas pequenas.
  const menu = $("#main-nav");
  const botaoMenu = $("#menu-toggle");
  botaoMenu.addEventListener("click", () => {
    const aberto = menu.classList.toggle("open");
    botaoMenu.setAttribute("aria-expanded", String(aberto));
  });
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    menu.classList.remove("open");
    botaoMenu.setAttribute("aria-expanded", "false");
  }));

  // Formulário: a mensagem só é confirmada como enviada quando o Formspree responder.
  const form = $("#form");
  const mensagem = $("#form-msg");
  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    mensagem.className = "form-message";
    if (!form.elements.mensagem.value.trim()) {
      mensagem.textContent = "Escreva uma mensagem antes de enviar.";
      mensagem.classList.add("error");
      return;
    }
    if (form.action.includes("SEU_ID_AQUI")) {
      mensagem.textContent = "O formulário ainda não está conectado. Configure seu ID do Formspree para receber mensagens.";
      mensagem.classList.add("error");
      return;
    }
    const botao = form.querySelector('button[type="submit"]');
    botao.disabled = true;
    botao.style.opacity = ".65";
    try {
      const resposta = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });
      if (!resposta.ok) throw new Error("Falha ao enviar");
      mensagem.textContent = "Obrigada! Sua mensagem foi enviada.";
      form.reset();
    } catch {
      mensagem.textContent = "Não foi possível enviar agora. Confira sua conexão e tente novamente.";
      mensagem.classList.add("error");
    } finally {
      botao.disabled = false;
      botao.style.opacity = "";
    }
  });
})();