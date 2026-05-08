// Importações modulares do Firebase (v10.8.1)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// 🔑 Configuração Oficial extraída do CRM PetLojas
const firebaseConfig = {
    apiKey: "AIzaSyBjuvcJvTWw7lMrIwej5lHbIUXe99lJDN4",
    authDomain: "crmpetshop.firebaseapp.com",
    projectId: "crmpetshop",
    storageBucket: "crmpetshop.firebasestorage.app",
    messagingSenderId: "381013124221",
    appId: "1:381013124221:web:6a1860b4249c2939b6fd14"
};

// Inicializando o App e o Banco de Dados
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referência para a nossa coleção de Tarefas/Agenda
const agendaRef = collection(db, "agenda_eventos");

// Função para formatar números para o link do WhatsApp
function formatarWhatsApp(telefone) {
    if (!telefone) return "";
    let num = telefone.replace(/\D/g, '');
    if (num.length >= 10 && !num.startsWith('55')) num = '55' + num;
    return `https://api.whatsapp.com/send?phone=${num}`;
}

// Inicializa a escuta em tempo real do Firebase
function iniciarActionHub() {
    console.log("🚀 Motor do Action Hub conectado ao Firebase CRM!");

    // Busca os eventos ordenados pela data de criação
    const q = query(agendaRef, orderBy("criadoEm", "desc"));
    
    onSnapshot(q, (snapshot) => {
        const eventos = [];
        snapshot.forEach((doc) => {
            eventos.push({ id: doc.id, ...doc.data() });
        });
        
        console.log("Tarefas/Eventos carregados:", eventos);
        renderizarTarefas(eventos);
        // renderizarCalendario(eventos); // Será ativado na próxima fase
    });
}

// Renderiza a lista do Painel Esquerdo (To-Do List)
function renderizarTarefas(eventos) {
    const listaEl = document.getElementById('lista-tarefas');
    if (!listaEl) return; // Proteção caso o HTML ainda não tenha o ID
    
    listaEl.innerHTML = ''; // Limpa a lista antes de desenhar

    // Filtra apenas o que é "tarefa" (ignorando eventos de calendário por enquanto)
    const tarefas = eventos.filter(e => e.tipo === 'tarefa');

    if (tarefas.length === 0) {
        listaEl.innerHTML = `<div class="p-4 text-center text-slate-400 text-sm">Nenhuma tarefa pendente. Excelente trabalho!</div>`;
        return;
    }

    tarefas.forEach(tarefa => {
        const isConcluida = tarefa.status === 'concluido';
        const bgPriority = tarefa.prioridade === 'alta' ? 'bg-red-100 text-red-700' : 
                           tarefa.prioridade === 'media' ? 'bg-yellow-100 text-yellow-700' : 
                           'bg-slate-100 text-slate-600';
        
        const labelPriority = tarefa.prioridade === 'alta' ? 'Fechamento' : 
                              tarefa.prioridade === 'media' ? 'Follow-up' : 'Pesquisa';

        const tarefaHTML = `
            <div class="p-3 ${isConcluida ? 'bg-slate-100 opacity-60' : 'hover:bg-slate-50'} rounded-lg group border border-slate-100 transition flex gap-3 mb-2 shadow-sm">
                <input type="checkbox" ${isConcluida ? 'checked' : ''} onchange="window.alternarStatusTarefa('${tarefa.id}', this.checked)" class="mt-1 w-4 h-4 cursor-pointer accent-petlojas-primary">
                <div class="flex-1 ${isConcluida ? 'line-through text-slate-400' : ''}">
                    <span class="inline-block px-2 py-1 ${bgPriority} text-[10px] font-bold rounded mb-1 uppercase tracking-wider">${labelPriority}</span>
                    <p class="text-sm font-medium text-slate-700">${tarefa.titulo}</p>
                    ${tarefa.leadNome ? `<p class="text-xs text-slate-500 mt-1"><i class="fa-solid fa-store mr-1"></i> ${tarefa.leadNome}</p>` : ''}
                </div>
                
                <div class="flex flex-col gap-2">
                    ${tarefa.leadTelefone && !isConcluida ? `
                        <a href="${formatarWhatsApp(tarefa.leadTelefone)}" target="_blank" class="text-slate-300 hover:text-green-500 flex flex-col items-center text-[10px] font-bold transition" title="Disparar WhatsApp">
                            <i class="fa-brands fa-whatsapp text-lg"></i> Zap
                        </a>
                    ` : ''}
                    <button onclick="window.excluirTarefa('${tarefa.id}')" class="text-slate-300 hover:text-red-500 flex flex-col items-center text-[10px] font-bold transition" title="Excluir">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        listaEl.insertAdjacentHTML('beforeend', tarefaHTML);
    });
}

// Funções Globais (disponíveis para o HTML chamar no onclick)
window.alternarStatusTarefa = async (id, isChecked) => {
    const docRef = doc(db, "agenda_eventos", id);
    await updateDoc(docRef, { status: isChecked ? 'concluido' : 'pendente' });
};

window.excluirTarefa = async (id) => {
    if(confirm("Deseja excluir esta tarefa?")) {
        await deleteDoc(doc(db, "agenda_eventos", id));
    }
};

// Inicia o motor
document.addEventListener("DOMContentLoaded", iniciarActionHub);
