const $=q=>document.querySelector(q);
// Fato do dia (muda a cada dia)
let fi=Math.floor(Date.now()/864e5)%FATOS.length;
const mostraFato=()=>$('#fato-txt').textContent=FATOS[fi];
$('#fato-next').onclick=()=>{fi=(fi+1)%FATOS.length;mostraFato()};mostraFato();

// Slides: os 6 primeiros contam a história; os 3 últimos são o tutorial (fundo muda para o espaço)
const HIST=6;
const S=[
{e:"👩‍💻",t:"Margaret Hamilton",p:"Matemática e programadora, nasceu em 1936. No MIT, liderou a equipe que escreveu o software de voo das missões Apollo, o programa que levou humanos à Lua."},
{e:"🌍",t:"A corrida espacial",p:"Nos anos 1960, os Estados Unidos queriam chegar à Lua antes de todo mundo. O computador de bordo era minúsculo: sua memória cabia em poucos kilobytes, muito menos que uma foto de celular."},
{e:"⚠️",t:"O problema",p:"Não dava para “reiniciar” uma nave a caminho da Lua. O software precisava funcionar mesmo quando algo desse errado. E, na época, programar ainda era visto como detalhe perto do hardware."},
{e:"🧠",t:"O que ela criou",p:"Hamilton ajudou a transformar programação em engenharia de software: testes rigorosos, tratamento de erros e um sistema que decide quais tarefas são mais importantes quando o computador está sobrecarregado."},
{e:"🌕",t:"Apollo 11, 1969",p:"Na descida para a Lua, os alarmes 1201 e 1202 avisaram que o computador estava sobrecarregado. Graças ao projeto da equipe de Hamilton, ele descartou as tarefas menos importantes e manteve o pouso. A missão seguiu."},
{e:"💪",t:"Desafios e legado",p:"Ela trabalhava numa área dominada por homens e conciliava o laboratório com a maternidade. Suas ideias estão em sistemas que usamos hoje, e em 2016 ela recebeu a Medalha Presidencial da Liberdade."},
{e:"🚀",t:"Agora é a sua vez",p:"Você é o computador de bordo da Apollo 11. Tarefas chegam sem parar e você decide o que executar primeiro."},
{e:"🎯",t:"Como jogar",p:"Cada tarefa tem uma prioridade: roxo é alta (pouso, motores), dourado é média (radar, navegação) e verde é baixa (rádio, painel). Clique para executar antes que o tempo da barra acabe."},
{e:"🔔",t:"Cuidado com o 1202",p:"Mais de 6 tarefas ao mesmo tempo causam sobrecarga. Com a Proteção de Hamilton ligada, o sistema descarta as tarefas leves e segue. Desligue para ver o que acontece sem ela.",go:1}
];
let i=0;
function render(){
  const s=S[i],sl=$('#slide');
  sl.innerHTML=`<div class="em" aria-hidden="true">${s.e}</div><h2>${s.t}</h2><p>${s.p}</p>`+(s.go?'<a class="btn ouro" href="#jogo">Ir para a missão</a>':'');
  sl.classList.remove('in');void sl.offsetWidth;sl.classList.add('in');
  $('#stage').classList.toggle('space',i>=HIST);
  $('#prev').disabled=i==0;$('#next').disabled=i==S.length-1;
  $('#dots').innerHTML=S.map((_,k)=>`<i class="${k==i?'on':''}"></i>`).join('');
}
const vai=d=>{const n=i+d;if(n>=0&&n<S.length){i=n;render()}};
$('#next').onclick=()=>vai(1);$('#prev').onclick=()=>vai(-1);
document.addEventListener('keydown',e=>{if(e.target.matches('input,textarea,select'))return;if(e.key=='ArrowRight')vai(1);if(e.key=='ArrowLeft')vai(-1)});
let x0=0;const st=$('#stage');
st.addEventListener('touchstart',e=>x0=e.touches[0].clientX,{passive:true});
st.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>50)vai(d<0?1:-1)});
render();

// Formulário: troque SEU_ID_AQUI pelo ID do Formspree no index.html
const f=$('#form');
f.addEventListener('submit',async e=>{
  e.preventDefault();
  if(!f.mensagem.value.trim()){$('#form-msg').textContent='Escreva uma mensagem antes de enviar.';return}
  const ok=()=>{$('#form-msg').textContent='Obrigada! Sua mensagem foi enviada.';f.reset()};
  if(f.action.includes('SEU_ID_AQUI'))return ok(); // modo teste
  try{const r=await fetch(f.action,{method:'POST',body:new FormData(f),headers:{Accept:'application/json'}});r.ok?ok():$('#form-msg').textContent='Não foi possível enviar. Tente de novo.'}
  catch{$('#form-msg').textContent='Sem conexão. Tente de novo.'}
});
