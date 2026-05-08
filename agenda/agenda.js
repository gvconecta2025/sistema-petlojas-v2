import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Configuração Firebase extraída
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
let visaoPeriodo = 'semana'; // dia, semana, 2semanas, mes
let todosEventos = [];

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    configurarFormulario();
    ouvirFirebase();
    renderizarLayout();
});

function ouvirFirebase() {
    const q = query(agendaRef, orderBy("criadoEm", "desc"));
    onSnapshot(q, (snapshot) => {
        todosEventos = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        renderizarLayout();
    });
}

// LÓGICA DE NAVEGAÇÃO
window.navegarData = (direcao) => {
    if (visaoPeriodo === 'mes') dataFoco.setMonth(dataFoco.getMonth() + direcao);
    else if (visaoPeriodo === 'dia') dataFoco.setDate(dataFoco.getDate() + direcao);
    else {
        let dias = visaoPeriodo === 'semana' ? 7 : 14;
        dataFoco.setDate(dataFoco.getDate() + (direcao * dias));
    }
    renderizarLayout();
};

window.irParaHoje = () => { dataFoco = new Date(); renderizarLayout(); };

window.mudarPeriodo = (periodo, btn) => {
    visaoPeriodo = periodo;
    document.querySelectorAll('.segmented-control:last-of-type button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderizarLayout();
};

// RENDERIZAÇÃO COMPLETA
function renderizarLayout() {
    const display = document.getElementById('display-periodo');
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    display.innerText = `${meses[dataFoco.getMonth()]} ${dataFoco.getFullYear()}`;

    renderizarBacklog();
    renderizarGradeCalendario();
}

function renderizarBacklog() {
    const container = document.getElementById('lista-tarefas');
    const tarefas = todosEventos.filter(e => !e.dataMarcada || e.dataMarcada === "");
    document.getElementById('count-tarefas').innerText = tarefas.length;
    
    container.innerHTML = tarefas.map(t => `
        <div draggable="true" ondragstart="event.dataTransfer.setData('text/plain', '${t.id}')" 
             class="p-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-blue-300 transition-all group">
            <span class="event-chip block mb-2 event-${t.prioridade}">${t.prioridade === 'alta' ? 'URGENTE' : t.prioridade}</span>
            <p class="text-xs font-bold text-slate-700">${t.titulo}</p>
            <div class="mt-2 flex justify-between items-center opacity-0 group-hover:opacity-100 transition">
                <button onclick="window.excluirAcao('${t.id}')" class="text-red-400 hover:text-red-600 text-[10px] font-bold uppercase">Excluir</button>
                <i class="fa-solid fa-grip-vertical text-slate-300"></i>
            </div>
        </div>
    `).join('') || '<div class="text-center p-4 text-slate-400 text-[10px] font-bold italic">Backlog vazio</div>';
}

function renderizarGradeCalendario() {
    const grid = document.getElementById('grid-container');
    const headers = document.getElementById('calendar-headers');
    const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    
    headers.innerHTML = diasSemana.map(d => `<div class="calendar-header-cell">${d}</div>`).join('');
    grid.innerHTML = "";

    // Calcula Início e Fim da Visão
    let dataInicio = new Date(dataFoco);
    let numDias = 7;

    if (visaoPeriodo === 'mes') {
        dataInicio = new Date(dataFoco.getFullYear(), dataFoco.getMonth(), 1);
        dataInicio.setDate(dataInicio.getDate() - dataInicio.getDay()); // Início no Domingo
        numDias = 35; // 5 semanas padrão
    } else if (visaoPeriodo === 'semana' || visaoPeriodo === '2semanas') {
        dataInicio.setDate(dataInicio.getDate() - dataInicio.getDay());
        numDias = visaoPeriodo === 'semana' ? 7 : 14;
    } else {
        numDias = 1;
        grid.style.gridTemplateColumns = "1fr";
        headers.style.gridTemplateColumns = "1fr";
    }

    if (visaoPeriodo !== 'dia') {
        grid.style.gridTemplateColumns = "repeat(7, 1fr)";
        headers.style.gridTemplateColumns = "repeat(7, 1fr)";
    }

    for (let i = 0; i < numDias; i++) {
        let diaCorrente = new Date(dataInicio);
        diaCorrente.setDate(dataInicio.getDate() + i);
        let diaIso = diaCorrente.toISOString().split('T')[0];
        let eHoje = new Date().toDateString() === diaCorrente.toDateString();

        const diaDiv = document.createElement('div');
        diaDiv.className = `calendar-day ${eHoje ? 'today' : ''}`;
        diaDiv.innerHTML = `<div class="flex justify-between items-center mb-2">
            <span class="text-[10px] font-black ${eHoje ? 'text-blue-600' : 'text-slate-400'}">${diaCorrente.getDate()}</span>
            <span class="text-[8px] font-bold text-slate-300 uppercase">${visaoPeriodo === 'mes' ? '' : diasSemana[diaCorrente.getDay()]}</span>
        </div>`;

        // Ativa Drop
        diaDiv.ondragover = (e) => e.preventDefault();
        diaDiv.ondrop = async (e) => {
            const id = e.dataTransfer.getData('text/plain');
            await updateDoc(doc(db, "agenda_eventos", id), { dataMarcada: diaIso });
        };

        // Filtra eventos desse dia
        const eventosDia = todosEventos.filter(e => e.dataMarcada === diaIso);
        eventosDia.forEach(ev => {
            const chip = document.createElement('div');
            chip.className = `event-chip event-${ev.prioridade}`;
            chip.draggable = true;
            chip.innerText = ev.titulo;
            chip.ondragstart = (e) => e.dataTransfer.setData('text/plain', ev.id);
            chip.onclick = () => window.excluirAcao(ev.id);
            diaDiv.appendChild(chip);
        });

        grid.appendChild(diaDiv);
    }
}

// CRUD
function configurarFormulario() {
    const form = document.getElementById('form-nova-tarefa');
    form.onsubmit = async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        btn.disabled = true;

        try {
            await addDoc(agendaRef, {
                titulo: document.getElementById('input-titulo').value,
                dataMarcada: document.getElementById('input-data').value,
                prioridade: document.getElementById('input-prioridade').value,
                telefone: document.getElementById('input-telefone').value,
                status: 'pendente',
                tipo: 'evento',
                criadoEm: Date.now()
            });
            form.reset();
            window.fecharModalNovaTarefa();
        } catch (err) { alert("Erro ao salvar."); }
        finally { btn.disabled = false; }
    };
}

window.excluirAcao = async (id) => {
    if (confirm("Excluir esta ação?")) await deleteDoc(doc(db, "agenda_eventos", id));
};
