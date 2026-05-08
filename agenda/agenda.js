// Importações modulares do Firebase (usando CDN para rodar direto no navegador se preferir, ou ajuste para o seu bundler)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// ⚠️ ATENÇÃO: Se você já tem um arquivo de configuração do Firebase no seu projeto, 
// o ideal é importá-lo aqui. Caso contrário, preencha com suas chaves.
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

// Inicializando o App e o Banco de Dados
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referência para a nossa nova coleção
const agendaRef = collection(db, "agenda_eventos");

// Função Principal: Escutar as mudanças em tempo real e desenhar na tela
function iniciarActionHub() {
    console.log("🚀 Motor do Action Hub PetLojas iniciado!");

    // Usamos onSnapshot para que, se você alterar algo no celular, a tela do PC atualize na mesma hora
    const q = query(agendaRef, orderBy("data_hora_inicio", "asc"));
    
    onSnapshot(q, (snapshot) => {
        const eventos = [];
        snapshot.forEach((doc) => {
            eventos.push({ id: doc.id, ...doc.data() });
        });
        
        console.log("Dados recebidos do Firebase:", eventos);
        
        // Próximo passo: Criar as funções que pegam esses 'eventos' e injetam 
        // no HTML (Painel Esquerdo para tarefas, Painel Direito para agenda)
        // renderizarTarefas(eventos);
        // renderizarCalendario(eventos);
    });
}

// Inicia o motor assim que a página HTML terminar de carregar
document.addEventListener("DOMContentLoaded", iniciarActionHub);
