import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Configuração Firebase extraída do CRM
const firebaseConfig = {
    apiKey: "AIzaSyBjuvcJvTWw7lMrIwej5lHbIUXe99lJDN4",
    authDomain: "crmpetshop.firebaseapp.com",
    projectId: "crmpetshop",
    storageBucket: "crmpetshop.firebasestorage.app",
    messagingSenderId: "381013124221",
    appId: "1:381013124221:web:6a1860b4249c2939b6fd14"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const agendaRef = collection(db, "agenda_eventos");

// ESTADO GLOBAL DO HUB
let dataFoco = new Date();
let visaoPeriodo = 'semana'; // dia, semana
let todosEventos = [];
const PIXELS_POR_HORA = 60;

// HELPER: Evita o Bug de Fuso Horário (Força a data local exata)
function obterDataIsoLocal(data) {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    configurarFormulario();
    gerarEixosBase();
    ouvirFirebase();
    iniciarLinhaDoTempo();
    // Scroll inicial para as 08:00
    const scrollArea = document.getElementById('calendar-scroll-area');
    if(scrollArea) scrollArea.scrollTop = 8 * PIXELS_POR_HORA;
});

function ouvirFirebase() {
    const q = query(agendaRef, orderBy("criadoEm", "desc"));
    onSnapshot(q, (snapshot) => {
        todosEventos = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        renderizarLayout();
    });
}

// 1. GERAR A ESTRUTURA FIXA DA GRADE DE HORAS
function gerarEixosBase() {
    const timeAxis = document.getElementById('time-axis');
    const gridLines = document.getElementById('grid-lines');
    if(!timeAxis || !gridLines) return;
    
    timeAxis.innerHTML = ''; gridLines.innerHTML = '';

    for(let h = 0; h < 24; h++) {
        const timeBox = document.createElement('div');
        timeBox.className = "absolute w-full text-right pr-2 text-[10px] font-bold text-slate-400 select-none";
        timeBox.style.top = `${h * PIXELS_POR_HORA - 7}px`;
        timeBox.innerText = `${h.toString().padStart(2, '0')}:00`;
        if(h > 0) timeAxis.appendChild(timeBox);

        const line = document.createElement('div');
        line.className = "absolute w-full border-t border-slate-100 pointer-events-none";
        line.style.top = `${h * PIXELS_POR_HORA}px`;
        gridLines.appendChild(line);
    }
}

// 2. LÓGICA DE NAVEGAÇÃO E DATAS
window.navegarData = (direcao) => {
    let dias = visaoPeriodo === 'semana' ? 7 : 1;
    dataFoco.setDate(dataFoco.getDate() + (direcao * dias));
    renderizarLayout();
};
window.irParaHoje = () => { dataFoco = new Date(); renderizarLayout(); };
window.mudarPeriodo = (periodo, btn) => {
    visaoPeriodo = periodo;
    document.querySelectorAll('.segmented-control:last-of-type button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderizarLayout();
};

function formatarMesAno(data) {
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    return `${meses[data.getMonth()]} ${data.getFullYear()}`;
}

// 3. RENDERIZAÇÃO MATEMÁTICA DA AGENDA
function renderizarLayout() {
    document.getElementById('display-periodo').innerText = formatarMesAno(dataFoco);
    
    // BACKLOG (Tarefas sem data marcada)
    const backlogContainer = document.getElementById('lista-tarefas');
    const tarefasBacklog = todosEventos.filter(e => !e.dataMarcada || e.dataMarcada === "");
    document.getElementById('count-tarefas').innerText = tarefasBacklog.length;
    
    if (backlogContainer) {
        backlogContainer.innerHTML = tarefasBacklog.map(t => `
            <div draggable="true" ondragstart="event.dataTransfer.setData('text/plain', '${t.id}')" 
                 class="p-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-blue-300 transition-all cursor-grab active:cursor-grabbing group">
                <span class="inline-block px-1.5 py-0.5 rounded text-[8px] font-black uppercase mb-1 event-${t.prioridade}">${t.prioridade === 'alta' ? 'URGENTE' : t.prioridade}</span>
                <p class="text-xs font-bold text-slate-700">${t.titulo}</p>
                <div class="mt-2 flex justify-between items-center opacity-0 group-hover:opacity-100 transition">
                    <button onclick="window.excluirAcao('${t.id}')" class="text-red-400 hover:text-red-600 text-[9px] font-bold uppercase"><i class="fa-solid fa-trash"></i> Excluir</button>
                    <i class="fa-solid fa-grip-vertical text-slate-300"></i>
                </div>
            </div>
        `).join('') || '<div class="text-center p-4 text-slate-400 text-[10px] font-bold uppercase">Backlog limpo</div>';
    }

    // RENDERIZAR GRADE (Dia ou Semana)
    const headers = document.getElementById('calendar-headers');
    const columnsContainer = document.getElementById('day-columns-container');
    const allDayGrid = document.getElementById('all-day-grid');
    const allDayWrapper = document.getElementById('all-day-wrapper');
    const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    
    if(!headers || !columnsContainer) return;

    headers.innerHTML = ''; columnsContainer.innerHTML = ''; allDayGrid.innerHTML = '';
    
    let numDias = visaoPeriodo === 'semana' ? 7 : 1;
    let dataInicio = new Date(dataFoco);
    if (visaoPeriodo === 'semana') dataInicio.setDate(dataInicio.getDate() - dataInicio.getDay()); // Volta para Domingo

    // Ajusta o CSS Grid (1 coluna ou 7)
    headers.style.gridTemplateColumns = `repeat(${numDias}, 1fr)`;
    columnsContainer.style.gridTemplateColumns = `repeat(${numDias}, 1fr)`;
    allDayGrid.style.gridTemplateColumns = `repeat(${numDias}, 1fr)`;

    let temEventoDiaInteiro = false;

    for (let i = 0; i < numDias; i++) {
        let diaCorrente = new Date(dataInicio);
        diaCorrente.setDate(dataInicio.getDate() + i);
        let diaIso = obterDataIsoLocal(diaCorrente); // Formato YYYY-MM-DD local seguro
        let eHoje = obterDataIsoLocal(new Date()) === diaIso;

        // 3.1. Cria Cabeçalho do Dia
        headers.innerHTML += `
            <div class="p-2 text-center border-r border-slate-200 ${eHoje ? 'bg-blue-50/50' : ''}">
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">${diasSemana[diaCorrente.getDay()]}</p>
                <p class="text-lg font-black ${eHoje ? 'text-blue-600' : 'text-slate-700'}">${diaCorrente.getDate()}</p>
            </div>
        `;

        // 3.2. Coluna Dia Inteiro (All Day) - O Limbo foi resolvido!
        const allDayCol = document.createElement('div');
        allDayCol.className = `border-r border-slate-200 p-1 min-h-[40px] flex flex-col gap-1 relative ${eHoje ? 'bg-blue-50/30' : ''}`;
        
        allDayCol.ondragover = (e) => e.preventDefault();
        allDayCol.ondrop = async (e) => {
            const id = e.dataTransfer.getData('text/plain');
            await updateDoc(doc(db, "agenda_eventos", id), { dataMarcada: diaIso, horaInicio: "", horaFim: "" });
        };

        const eventosSemHora = todosEventos.filter(e => e.dataMarcada === diaIso && (!e.horaInicio || e.horaInicio === ""));
        if (eventosSemHora.length > 0) temEventoDiaInteiro = true;

        eventosSemHora.forEach(ev => {
            const chip = document.createElement('div');
            chip.className = `event-block event-${ev.prioridade} !relative !left-0 !right-0 !top-0 shadow-sm`;
            chip.draggable = true;
            chip.ondragstart = (e) => e.dataTransfer.setData('text/plain', ev.id);
            chip.innerHTML = `<div class="font-black truncate">${ev.titulo}</div>`;
            chip.onclick = (e) => { e.stopPropagation(); window.excluirAcao(ev.id); };
            allDayCol.appendChild(chip);
        });
        allDayGrid.appendChild(allDayCol);

        // 3.3. Cria Coluna Vertical Principal na Grade
        const colDiv = document.createElement('div');
        colDiv.className = `day-column ${eHoje ? 'today' : ''}`;
        
        // CLICK-TO-ADD
        colDiv.onclick = (e) => {
            if(e.target !== colDiv) return; // Evita abrir se clicar num cartão existente
            const rect = colDiv.getBoundingClientRect();
            const y = e.clientY - rect.top;
            const hora = Math.floor(y / PIXELS_POR_HORA);
            const horaStr = `${hora.toString().padStart(2,'0')}:00`;
            window.abrirModalNovaTarefa(diaIso, horaStr);
        };

        // DRAG & DROP PARA A GRADE DE HORAS
        colDiv.ondragover = (e) => e.preventDefault();
        colDiv.ondrop = async (e) => {
            const id = e.dataTransfer.getData('text/plain');
            const rect = colDiv.getBoundingClientRect();
            const y = e.clientY - rect.top;
            const hora = Math.floor(y / PIXELS_POR_HORA);
            const horaStr = `${hora.toString().padStart(2,'0')}:00`;
            // Se arrastou pra cá, salva no dia e hora soltos
            await updateDoc(doc(db, "agenda_eventos", id), { dataMarcada: diaIso, horaInicio: horaStr, horaFim: "" });
        };

        // Posicionar Eventos com Hora Fixa
        const eventosComHora = todosEventos.filter(e => e.dataMarcada === diaIso && e.horaInicio && e.horaInicio !== "");
        eventosComHora.forEach(ev => {
            const [hIn, mIn] = ev.horaInicio.split(':').map(Number);
            let duracao = 60; // Padrão 1 hora
            if(ev.horaFim && ev.horaFim !== "") {
                const [hFim, mFim] = ev.horaFim.split(':').map(Number);
                duracao = (hFim * 60 + mFim) - (hIn * 60 + mIn);
                if(duracao < 15) duracao = 60; // Segurança visual
            }

            const topPx = (hIn * PIXELS_POR_HORA) + (mIn * (PIXELS_POR_HORA/60));
            const heightPx = duracao * (PIXELS_POR_HORA/60);

            const card = document.createElement('div');
            card.className = `event-block event-${ev.prioridade}`;
            card.draggable = true;
            card.ondragstart = (e) => e.dataTransfer.setData('text/plain', ev.id);
            card.style.top = `${topPx}px`;
            card.style.height = `${heightPx}px`;
            card.innerHTML = `
                <div class="font-black truncate">${ev.titulo}</div>
                <div class="text-[8px] font-medium opacity-80 mt-0.5">${ev.horaInicio} ${ev.horaFim ? '- '+ev.horaFim : ''}</div>
            `;
            
            card.onclick = (e) => { e.stopPropagation(); window.excluirAcao(ev.id); };
            colDiv.appendChild(card);
        });

        columnsContainer.appendChild(colDiv);
    }

    // Exibe ou oculta a seção de Dia Inteiro se houver tarefas
    if(temEventoDiaInteiro) allDayWrapper.classList.remove('hidden');
    else allDayWrapper.classList.add('hidden');

    atualizarPosicaoLinhaTempo();
}

// 4. A LINHA VERMELHA (TEMPO REAL)
function atualizarPosicaoLinhaTempo() {
    const linha = document.getElementById('current-time-line');
    if(!linha) return;
    
    const agora = new Date();
    const hojeIso = obterDataIsoLocal(agora);
    
    let inicioSemana = new Date(dataFoco);
    inicioSemana.setDate(inicioSemana.getDate() - inicioSemana.getDay());
    let fimSemana = new Date(inicioSemana);
    fimSemana.setDate(fimSemana.getDate() + 6);
    
    // Verifica se "Hoje" está sendo exibido na tela
    const mostrarLinha = (visaoPeriodo === 'dia' && obterDataIsoLocal(dataFoco) === hojeIso) || 
                         (visaoPeriodo === 'semana' && agora >= inicioSemana && agora <= fimSemana);

    if (mostrarLinha) {
        linha.classList.remove('hidden');
        const horas = agora.getHours();
        const minutos = agora.getMinutes();
        const topPx = (horas * PIXELS_POR_HORA) + (minutos * (PIXELS_POR_HORA/60));
        linha.style.top = `${topPx}px`;
    } else {
        linha.classList.add('hidden');
    }
}

function iniciarLinhaDoTempo() {
    atualizarPosicaoLinhaTempo();
    setInterval(atualizarPosicaoLinhaTempo, 60000); // Atualiza a cada 1 min
}

// 5. CRUD FIREBASE
function configurarFormulario() {
    const form = document.getElementById('form-nova-tarefa');
    if(!form) return;

    form.onsubmit = async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Guardando...';
        btn.disabled = true;

        const isDiaInteiro = document.getElementById('input-dia-inteiro').checked;

        try {
            await addDoc(agendaRef, {
                titulo: document.getElementById('input-titulo').value,
                dataMarcada: document.getElementById('input-data').value, // YYYY-MM-DD
                horaInicio: isDiaInteiro ? "" : document.getElementById('input-hora-inicio').value,
                horaFim: isDiaInteiro ? "" : document.getElementById('input-hora-fim').value,
                prioridade: document.getElementById('input-prioridade').value,
                telefone: document.getElementById('input-telefone').value,
                tipo: 'evento',
                criadoEm: Date.now()
            });
            form.reset();
            if(window.fecharModalNovaTarefa) window.fecharModalNovaTarefa();
        } catch (err) { 
            alert("Erro ao ligar ao Firebase."); 
            console.error(err); 
        } finally { 
            btn.innerHTML = 'Salvar Registro';
            btn.disabled = false; 
        }
    };
}

window.excluirAcao = async (id) => {
    if (confirm("Remover definitivamente do calendário?")) await deleteDoc(doc(db, "agenda_eventos", id));
};
