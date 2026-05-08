import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

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

let dataFoco = new Date();
let visaoPeriodo = 'semana'; // dia, semana
let todosEventos = [];
const PIXELS_POR_HORA = 60;

document.addEventListener("DOMContentLoaded", () => {
    configurarFormulario();
    gerarEixosBase();
    ouvirFirebase();
    iniciarLinhaDoTempo();
    // Scroll inicial para as 08:00
    document.getElementById('calendar-scroll-area').scrollTop = 8 * PIXELS_POR_HORA;
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
    timeAxis.innerHTML = ''; gridLines.innerHTML = '';

    for(let h = 0; h < 24; h++) {
        // Eixo de horas
        const timeBox = document.createElement('div');
        timeBox.className = "absolute w-full text-right pr-2 text-[10px] font-bold text-slate-400";
        timeBox.style.top = `${h * PIXELS_POR_HORA - 7}px`;
        timeBox.innerText = `${h.toString().padStart(2, '0')}:00`;
        if(h > 0) timeAxis.appendChild(timeBox);

        // Linhas de fundo
        const line = document.createElement('div');
        line.className = "absolute w-full border-t border-slate-100";
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
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    return `${meses[data.getMonth()]} ${data.getFullYear()}`;
}

// 3. RENDERIZAÇÃO MATEMÁTICA DA AGENDA
function renderizarLayout() {
    document.getElementById('display-periodo').innerText = formatarMesAno(dataFoco);
    
    // BACKLOG (Tarefas sem data ou dia inteiro sem hora)
    const backlogContainer = document.getElementById('lista-tarefas');
    const tarefasBacklog = todosEventos.filter(e => !e.dataMarcada);
    document.getElementById('count-tarefas').innerText = tarefasBacklog.length;
    
    backlogContainer.innerHTML = tarefasBacklog.map(t => `
        <div class="p-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-blue-300 transition-all group">
            <span class="inline-block px-1.5 py-0.5 rounded text-[8px] font-black uppercase mb-1 event-${t.prioridade}">${t.prioridade}</span>
            <p class="text-xs font-bold text-slate-700">${t.titulo}</p>
            <button onclick="window.excluirAcao('${t.id}')" class="text-red-400 hover:text-red-600 text-[9px] font-bold uppercase mt-2 opacity-0 group-hover:opacity-100 transition"><i class="fa-solid fa-trash"></i> Excluir</button>
        </div>
    `).join('') || '<div class="text-center p-4 text-slate-400 text-[10px] font-bold uppercase">Backlog limpo</div>';

    // RENDERIZAR GRADE (Dia ou Semana)
    const headers = document.getElementById('calendar-headers');
    const columnsContainer = document.getElementById('day-columns-container');
    const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    
    headers.innerHTML = ''; columnsContainer.innerHTML = '';
    
    let numDias = visaoPeriodo === 'semana' ? 7 : 1;
    let dataInicio = new Date(dataFoco);
    if (visaoPeriodo === 'semana') dataInicio.setDate(dataInicio.getDate() - dataInicio.getDay()); // Volta para Domingo

    // Ajusta o CSS Grid (1 coluna ou 7)
    headers.style.gridTemplateColumns = `repeat(${numDias}, 1fr)`;
    columnsContainer.style.gridTemplateColumns = `repeat(${numDias}, 1fr)`;

    for (let i = 0; i < numDias; i++) {
        let diaCorrente = new Date(dataInicio);
        diaCorrente.setDate(dataInicio.getDate() + i);
        let diaIso = diaCorrente.toISOString().split('T')[0];
        let eHoje = new Date().toDateString() === diaCorrente.toDateString();

        // 1. Cria Cabeçalho do Dia
        headers.innerHTML += `
            <div class="p-2 text-center border-r border-slate-200 ${eHoje ? 'bg-blue-50/50' : ''}">
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">${diasSemana[diaCorrente.getDay()]}</p>
                <p class="text-lg font-black ${eHoje ? 'text-blue-600' : 'text-slate-700'}">${diaCorrente.getDate()}</p>
            </div>
        `;

        // 2. Cria Coluna Vertical na Grade
        const colDiv = document.createElement('div');
        colDiv.className = `day-column ${eHoje ? 'today' : ''}`;
        
        // CLICK-TO-ADD (Clicar na grade para criar evento na hora exata)
        colDiv.onclick = (e) => {
            if(e.target !== colDiv) return; // Evita abrir se clicar num cartão existente
            const rect = colDiv.getBoundingClientRect();
            const y = e.clientY - rect.top;
            const hora = Math.floor(y / PIXELS_POR_HORA);
            const horaStr = `${hora.toString().padStart(2,'0')}:00`;
            window.abrirModalNovaTarefa(diaIso, horaStr);
        };

        // 3. Posicionar Eventos com Hora Fixa neste dia
        const eventosDia = todosEventos.filter(e => e.dataMarcada === diaIso && e.horaInicio);
        eventosDia.forEach(ev => {
            const [hIn, mIn] = ev.horaInicio.split(':').map(Number);
            let duracao = 60; // Padrão 1 hora
            if(ev.horaFim) {
                const [hFim, mFim] = ev.horaFim.split(':').map(Number);
                duracao = (hFim * 60 + mFim) - (hIn * 60 + mIn);
                if(duracao < 15) duracao = 60; // Segurança
            }

            const topPx = (hIn * PIXELS_POR_HORA) + (mIn * (PIXELS_POR_HORA/60));
            const heightPx = duracao * (PIXELS_POR_HORA/60);

            const card = document.createElement('div');
            card.className = `event-block event-${ev.prioridade}`;
            card.style.top = `${topPx}px`;
            card.style.height = `${heightPx}px`;
            card.innerHTML = `
                <div class="font-black truncate">${ev.titulo}</div>
                <div class="text-[8px] font-medium opacity-80 mt-0.5">${ev.horaInicio} ${ev.horaFim ? '- '+ev.horaFim : ''}</div>
            `;
            
            // Botão de excluir aparece ao clicar no evento
            card.onclick = (e) => {
                e.stopPropagation();
                window.excluirAcao(ev.id);
            };

            colDiv.appendChild(card);
        });

        columnsContainer.appendChild(colDiv);
    }

    atualizarPosicaoLinhaTempo();
}

// 4. A LINHA VERMELHA (TEMPO REAL)
function atualizarPosicaoLinhaTempo() {
    const linha = document.getElementById('current-time-line');
    const agora = new Date();
    
    // Verifica se "Hoje" está visível na tela
    let inicioSemana = new Date(dataFoco);
    inicioSemana.setDate(inicioSemana.getDate() - inicioSemana.getDay());
    let fimSemana = new Date(inicioSemana);
    fimSemana.setDate(fimSemana.getDate() + 6);
    
    const mostrarLinha = (visaoPeriodo === 'dia' && dataFoco.toDateString() === agora.toDateString()) || 
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
    setInterval(atualizarPosicaoLinhaTempo, 60000); // Atualiza a cada 1 minuto
}

// 5. CRUD FIREBASE
function configurarFormulario() {
    const form = document.getElementById('form-nova-tarefa');
    form.onsubmit = async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Guardando...';
        btn.disabled = true;

        const isDiaInteiro = document.getElementById('input-dia-inteiro').checked;

        try {
            await addDoc(agendaRef, {
                titulo: document.getElementById('input-titulo').value,
                dataMarcada: document.getElementById('input-data').value,
                horaInicio: isDiaInteiro ? "" : document.getElementById('input-hora-inicio').value,
                horaFim: isDiaInteiro ? "" : document.getElementById('input-hora-fim').value,
                prioridade: document.getElementById('input-prioridade').value,
                telefone: document.getElementById('input-telefone').value,
                tipo: 'evento',
                criadoEm: Date.now()
            });
            form.reset();
            window.fecharModalNovaTarefa();
        } catch (err) { alert("Erro ao ligar ao Firebase."); console.error(err); }
        finally { 
            btn.innerHTML = 'Guardar no Calendário';
            btn.disabled = false; 
        }
    };
}

window.excluirAcao = async (id) => {
    if (confirm("Remover definitivamente do calendário?")) await deleteDoc(doc(db, "agenda_eventos", id));
};
