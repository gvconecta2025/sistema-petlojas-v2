<!DOCTYPE html>
<html lang="pt-PT">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>CRM Pet Shops - V8.2 Safety Lock</title>
    
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js"></script>
    
    <script src="https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.8.1/firebase-auth-compat.js"></script>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #f8fafc; }
        .card-ghost { opacity: 0.5; background-color: #e2e8f0; }
        .col-ghost { opacity: 0.4; border: 2px dashed #94a3b8; }
        .history-item { border-left: 2px solid #e2e8f0; padding-left: 10px; margin-bottom: 10px; }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .highlight-match { background-color: #fef08a !important; color: #854d0e !important; border-radius: 4px; transition: all 0.3s ease; }
        .active-search-match { background-color: #f97316 !important; color: #ffffff !important; box-shadow: 0 0 0 3px #fed7aa; transform: scale(1.02); z-index: 10; }
    </style>
</head>
<body class="flex flex-col h-screen overflow-hidden bg-slate-50 relative">

    <div id="loginScreen" class="fixed inset-0 bg-slate-900 z-[200] flex flex-col items-center justify-center px-4 transition-opacity duration-300">
        <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
            <div class="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                <i class="fa-solid fa-shield-halved"></i>
            </div>
            <h1 class="text-2xl font-black text-slate-800 mb-2">CRM PetLojas</h1>
            <p class="text-slate-500 text-sm mb-6">Acesso restrito a administradores.</p>
            
            <div id="loadingAuth" class="flex flex-col items-center justify-center mb-2">
                <i class="fa-solid fa-circle-notch fa-spin text-3xl text-indigo-600 mb-3"></i>
                <p class="text-sm font-bold text-slate-500">A verificar sessão unificada...</p>
            </div>

            <button id="btn-login-google" onclick="loginComGoogle()" class="hidden w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition items-center justify-center gap-3 shadow-md">
                <i class="fa-brands fa-google text-lg"></i> Entrar com o Google
            </button>
            <p id="loginError" class="hidden mt-4 text-sm text-red-500 font-bold bg-red-50 p-3 rounded-lg border border-red-200"></p>
        </div>
    </div>

    <div id="mainApp" class="hidden flex-row h-full w-full">
        
        <nav class="group w-[60px] hover:w-64 bg-slate-900 flex flex-col py-6 transition-all duration-300 ease-in-out shrink-0 z-[100] absolute md:relative h-full overflow-hidden shadow-2xl md:shadow-none border-r border-slate-800">
            <div class="flex items-center px-4 mb-8 whitespace-nowrap overflow-hidden">
                <i class="fa-solid fa-paw text-emerald-400 text-2xl min-w-[28px] text-center"></i>
                <span class="text-white font-black text-lg ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">PetLojas</span>
            </div>
            
            <div class="flex flex-col space-y-3 px-2">
                <a href="https://crmpetshop.vercel.app/index.html" class="flex items-center px-3 py-3 rounded-lg whitespace-nowrap overflow-hidden bg-indigo-600 text-white shadow-md" title="Kanban CRM">
                    <i class="fa-solid fa-table-columns text-xl min-w-[24px] text-center"></i>
                    <span class="ml-3 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Kanban CRM</span>
                </a>
                <a href="https://crmpetshop.vercel.app/ficha-cadastro/index.html" class="flex items-center px-3 py-3 rounded-lg transition-colors whitespace-nowrap overflow-hidden text-slate-400 hover:text-white hover:bg-slate-800" title="Painel de Fichas">
                    <i class="fa-solid fa-address-book text-xl min-w-[24px] text-center"></i>
                    <span class="ml-3 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Painel de Fichas</span>
                </a>
                <a href="https://crmpetshop.vercel.app/disparadorcrm/index.html" class="flex items-center px-3 py-3 rounded-lg transition-colors whitespace-nowrap overflow-hidden text-slate-400 hover:text-white hover:bg-slate-800" title="Disparador">
                    <i class="fa-solid fa-paper-plane text-xl min-w-[24px] text-center"></i>
                    <span class="ml-3 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Disparador</span>
                </a>
            </div>
            
            <div class="flex-grow"></div>
            
            <div class="px-2 mb-2">
                <button onclick="toggleEditLock()" class="w-full flex items-center px-3 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors whitespace-nowrap overflow-hidden" title="Trava de Segurança">
                    <i id="lockIcon" class="fa-solid fa-lock text-rose-500 text-xl min-w-[24px] text-center transition-all duration-300"></i>
                    <span id="lockText" class="ml-3 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Edição Travada</span>
                </button>
            </div>

            <div class="px-2">
                <button onclick="fazerLogout()" class="w-full flex items-center px-3 py-3 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors whitespace-nowrap overflow-hidden" title="Sair do Sistema">
                    <i class="fa-solid fa-right-from-bracket text-xl min-w-[24px] text-center"></i>
                    <span class="ml-3 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Sair (Logout)</span>
                </button>
            </div>
        </nav>

        <div class="flex-1 flex flex-col h-full overflow-hidden pl-[60px] md:pl-0">
            <div class="p-3 md:p-6 pb-0 md:pb-2 shrink-0 overflow-y-auto md:overflow-visible max-h-[50vh] md:max-h-none custom-scrollbar">
                <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                    <div class="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                        <h1 class="text-xl md:text-2xl font-bold text-slate-800 flex items-center w-full md:w-auto justify-between md:justify-start">
                            <span>Módulo CRM</span>
                            <span class="text-[10px] font-bold bg-slate-800 text-indigo-400 px-2 py-1 rounded ml-3 uppercase tracking-widest shrink-0">V8.2</span>
                        </h1>
                        
                        <div class="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                            <button id="btnFilterDuplicates" onclick="toggleDuplicates()" class="hidden w-full sm:w-auto bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 px-3 py-2 rounded-lg text-sm font-bold transition-all items-center justify-center gap-2 shadow-sm whitespace-nowrap">
                                <i class="fa-solid fa-copy"></i> <span id="dupCountText">Duplicados (0)</span>
                            </button>

                            <div class="relative w-full md:w-64 flex items-center bg-slate-50 border border-slate-200 rounded-lg focus-within:ring-2 focus-within:ring-indigo-500 transition-all overflow-hidden h-10">
                                <i class="fa-solid fa-search text-slate-400 pl-3"></i>
                                <input type="text" id="searchInput" placeholder="Buscar Nome ou Tel..." class="w-full pl-2 pr-2 py-2 bg-transparent focus:outline-none text-sm">
                                <div id="searchControls" class="hidden items-center bg-slate-100 border-l border-slate-200 px-2 h-full shrink-0">
                                    <span id="searchCounter" class="text-xs font-bold text-slate-500 mr-1 min-w-[30px] text-center">0/0</span>
                                    <div class="flex flex-col">
                                        <button onclick="prevSearch()" class="text-slate-400 hover:text-indigo-600 transition leading-none py-0.5 px-1"><i class="fa-solid fa-caret-up text-[12px]"></i></button>
                                        <button onclick="nextSearch()" class="text-slate-400 hover:text-indigo-600 transition leading-none py-0.5 px-1"><i class="fa-solid fa-caret-down text-[12px]"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex flex-col md:flex-row gap-4 border-t border-slate-100 pt-4 items-stretch">
                        <div id="pasteZone" class="w-full md:w-1/4 border-2 border-dashed border-slate-300 bg-slate-50 rounded-xl p-3 flex flex-col items-center justify-center transition-all cursor-text outline-none hover:border-indigo-400 focus:border-indigo-500 focus:bg-white text-center" tabindex="0">
                            <div id="pasteInitialState" class="flex flex-col items-center">
                                <i class="fa-regular fa-image text-2xl text-slate-400 mb-1"></i>
                                <p class="text-slate-700 font-bold text-sm">Criar por Print</p>
                                <p class="text-slate-500 text-[10px] mt-1">Cole do Maps (<kbd class="bg-slate-200 px-1 rounded font-mono text-slate-600">Ctrl+V</kbd>)</p>
                            </div>
                            <div id="pasteProcessingState" class="hidden flex-col items-center">
                                <i class="fa-solid fa-circle-notch fa-spin text-xl text-indigo-500 mb-1"></i>
                                <p class="text-indigo-700 font-bold text-xs">A ler imagem...</p>
                            </div>
                        </div>

                        <div class="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3 md:p-4 flex flex-col justify-between shadow-inner">
                            <div class="flex flex-row justify-between items-stretch mb-3 gap-4">
                                <div class="shrink-0 flex flex-col justify-between py-1">
                                    <div>
                                        <p class="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Qtd Total</p>
                                        <p class="text-xl md:text-3xl font-black text-slate-800 leading-none" id="dashTotalLeads">0</p>
                                    </div>
                                    <div class="mt-2">
                                        <p class="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Pipeline (R$)</p>
                                        <p class="text-sm md:text-lg font-black text-emerald-600 leading-none" id="dashTotalValue">R$ 0,00</p>
                                    </div>
                                </div>
                                <div id="dashMetrics" class="flex gap-2 overflow-x-auto custom-scrollbar pb-1 items-end w-full justify-end"></div>
                            </div>
                            <div class="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden flex shrink-0" id="dashProgressBar"></div>
                        </div>

                        <div class="w-full md:w-1/3 flex flex-col justify-center bg-white border border-slate-200 p-3 rounded-xl shadow-sm">
                            <label class="text-[10px] font-bold text-slate-400 uppercase mb-2">Novo Lead Manual</label>
                            <form id="manualForm" class="flex flex-col gap-2">
                                <input type="text" id="manualName" placeholder="Nome da Loja..." class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs font-bold" required>
                                <div class="flex flex-col sm:flex-row gap-2">
                                    <input type="text" id="manualPhone" placeholder="Telefone..." class="w-full sm:w-1/3 border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs">
                                    <input type="text" id="manualAddress" placeholder="Localização..." class="w-full sm:flex-1 border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs">
                                </div>
                                <button type="submit" class="bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 transition shadow-sm text-xs font-bold w-full mt-1 flex items-center justify-center">
                                    <i class="fa-solid fa-plus mr-1"></i> Adicionar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex-1 overflow-x-auto overflow-y-hidden p-3 md:p-6 pt-2 md:pt-4 custom-scrollbar flex flex-col">
                <div class="flex gap-4 md:gap-6 flex-1 items-start min-h-0" id="kanbanBoard"></div>
            </div>
        </div>
    </div>

    <script>
        const firebaseConfig = {
            apiKey: "AIzaSyBjuvcJvTWw7lMrIwej5lHbIUXe99lJDN4",
            authDomain: "crmpetshop.firebaseapp.com",
            projectId: "crmpetshop",
            storageBucket: "crmpetshop.firebasestorage.app",
            messagingSenderId: "381013124221",
            appId: "1:381013124221:web:48f398a62ce40b7db6fd14"
        };
        if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();
        const auth = firebase.auth();

        const ADMIN_EMAILS = ["professoragiselle.edu2@gmail.com", "gvconecta2025@gmail.com"];

        let colListener = null;
        let leadsListener = null;
        
        // VARIÁVEL DA TRAVA DE SEGURANÇA (Padrão: Travado)
        let isEditingLocked = true;

        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(console.error);

        auth.onAuthStateChanged((user) => {
            const loginScreen = document.getElementById('loginScreen');
            const mainApp = document.getElementById('mainApp');
            const loginError = document.getElementById('loginError');
            const loadingAuth = document.getElementById('loadingAuth');
            const btnLogin = document.getElementById('btn-login-google');

            if (user) {
                if (ADMIN_EMAILS.includes(user.email)) {
                    loginScreen.classList.add('opacity-0', 'pointer-events-none');
                    setTimeout(() => loginScreen.classList.add('hidden'), 300);
                    mainApp.classList.remove('hidden');
                    mainApp.classList.add('flex');
                    iniciarDadosCRM(); 
                } else {
                    loadingAuth.classList.add('hidden');
                    btnLogin.classList.remove('hidden');
                    btnLogin.classList.add('flex');
                    loginError.innerHTML = `⚠️ Acesso Negado.<br>O e-mail <b>${user.email}</b> não tem permissão de administrador.`;
                    loginError.classList.remove('hidden');
                    auth.signOut();
                }
            } else {
                loginScreen.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
                mainApp.classList.add('hidden');
                mainApp.classList.remove('flex');
                loadingAuth.classList.add('hidden');
                btnLogin.classList.remove('hidden');
                btnLogin.classList.add('flex');
                pararDadosCRM(); 
            }
        });

        function loginComGoogle() { auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(error => { document.getElementById('loginError').innerText = "Erro: " + error.message; document.getElementById('loginError').classList.remove('hidden'); }); }
        function fazerLogout() { if(confirm("Deseja realmente sair do sistema?")) auth.signOut(); }

        // FUNÇÃO DA TRAVA DE SEGURANÇA
        window.toggleEditLock = () => {
            isEditingLocked = !isEditingLocked;
            const icon = document.getElementById('lockIcon');
            const text = document.getElementById('lockText');

            if(isEditingLocked) {
                icon.className = "fa-solid fa-lock text-rose-500 text-xl min-w-[24px] text-center transition-all duration-300";
                text.innerText = "Edição Travada";
            } else {
                icon.className = "fa-solid fa-lock-open text-emerald-400 text-xl min-w-[24px] text-center animate-pulse transition-all duration-300";
                text.innerText = "Edição Livre";
            }
            renderBoard(); // Recarrega os inputs para aplicar a trava
        };

        let columnsData = []; let leadsData = []; let draggedLeadId = null; let draggedColId = null; let expandedLeads = new Set();
        let currentSearchTerm = ""; let searchMatches = []; let currentSearchIndex = -1; let showOnlyDuplicates = false;

        const columnColors = [ { bg: 'bg-indigo-500', text: 'text-indigo-600', dot: 'text-indigo-500', lightBg: 'bg-indigo-50' }, { bg: 'bg-rose-500', text: 'text-rose-600', dot: 'text-rose-500', lightBg: 'bg-rose-50' }, { bg: 'bg-slate-400', text: 'text-slate-600', dot: 'text-slate-400', lightBg: 'bg-slate-100' }, { bg: 'bg-emerald-500', text: 'text-emerald-600', dot: 'text-emerald-500', lightBg: 'bg-emerald-50' }, { bg: 'bg-purple-500', text: 'text-purple-600', dot: 'text-purple-500', lightBg: 'bg-purple-50' } ];
        const boardEl = document.getElementById('kanbanBoard');

        function iniciarDadosCRM() {
            if(colListener) return; 
            colListener = db.collection('columns').orderBy('order').onSnapshot(snap => { columnsData = snap.docs.map(doc => ({ id: doc.id, ...doc.data() })); renderBoard(); });
            leadsListener = db.collection('leads').onSnapshot(snap => { leadsData = snap.docs.map(doc => ({ id: doc.id, ...doc.data() })); leadsData.sort((a, b) => b.createdAt - a.createdAt); renderBoard(); });
        }

        function pararDadosCRM() { if(colListener) { colListener(); colListener = null; } if(leadsListener) { leadsListener(); leadsListener = null; } columnsData = []; leadsData = []; boardEl.innerHTML = ''; }

        const formatMoney = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0);
        function mascaraTelefoneInteligente(valorPuro) { if(!valorPuro) return ''; let val = valorPuro.replace(/\D/g, ''); if (val.startsWith('55') && val.length > 11) val = val.substring(2); if (val.startsWith('0')) val = val.substring(1); if (val.length === 0) return ''; if (val.length <= 2) return val; if (val.length <= 6) return '(' + val.substring(0,2) + ') ' + val.substring(2); if (val.length === 10) return '(' + val.substring(0,2) + ') ' + val.substring(2,6) + '-' + val.substring(6); return '(' + val.substring(0,2) + ') ' + val.substring(2,7) + '-' + val.substring(7,11); }
        window.scrollToTop = (colId) => { const container = document.querySelector(`.kanban-scroll-container[data-col-id="${colId}"]`); if (container) container.scrollTo({ top: 0, behavior: 'smooth' }); };

        window.toggleDuplicates = () => { showOnlyDuplicates = !showOnlyDuplicates; const btn = document.getElementById('btnFilterDuplicates'); if(showOnlyDuplicates) { btn.classList.replace('bg-red-50', 'bg-red-500'); btn.classList.replace('text-red-600', 'text-white'); btn.innerHTML = `<i class="fa-solid fa-filter"></i> Isolando Repetidos`; } else { btn.classList.replace('bg-red-500', 'bg-red-50'); btn.classList.replace('text-white', 'text-red-600'); } renderBoard(); };
        window.addNewColumn = async () => { const title = prompt("Qual o nome da nova coluna?"); if(title && title.trim()) { const newId = 'col-' + Date.now(); await db.collection('columns').doc(newId).set({ id: newId, title: title.trim(), order: columnsData.length + 1 }); } };
        window.updateColumn = async (id, newTitle) => { if(newTitle.trim()) await db.collection('columns').doc(id).update({ title: newTitle.trim() }); };
        window.deleteColumn = async (colId) => { const leadsInCol = leadsData.filter(l => l.columnId === colId); if (leadsInCol.length > 0) { alert(`⚠️ AÇÃO BLOQUEADA:\n\nEsta coluna ainda possui ${leadsInCol.length} cartão(ões).\nPara excluí-la, você precisa primeiro mover ou excluir todos os cartões que estão dentro dela.`); return; } if(confirm("Coluna vazia! Tem a certeza que deseja excluir esta coluna permanentemente?")) await db.collection('columns').doc(colId).delete(); };

        function updateDashboard() {
            const totalLeads = leadsData.length; const totalValue = leadsData.reduce((acc, l) => acc + (parseFloat(l.dealValue) || 0), 0);
            document.getElementById('dashTotalLeads').innerText = totalLeads; document.getElementById('dashTotalValue').innerText = formatMoney(totalValue);
            const metricsContainer = document.getElementById('dashMetrics'); const progressContainer = document.getElementById('dashProgressBar');
            metricsContainer.innerHTML = ''; progressContainer.innerHTML = '';
            if (totalLeads === 0) return;
            columnsData.forEach((col, index) => {
                const colLeads = leadsData.filter(l => l.columnId === col.id); const count = colLeads.length; const colTotalValue = colLeads.reduce((acc, l) => acc + (parseFloat(l.dealValue) || 0), 0);
                const percentage = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0; const colorTheme = columnColors[index % columnColors.length]; const isFechado = col.title.trim().toLowerCase() === 'fechado'; const valueColor = isFechado ? 'text-indigo-500' : 'text-emerald-600';
                metricsContainer.innerHTML += `<div class="flex flex-col bg-white border border-slate-200 rounded-lg px-2 py-1.5 shadow-sm shrink-0 min-w-[85px] md:min-w-[110px]"><div class="flex items-center gap-1.5 mb-1"><span class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${colorTheme.bg}"></span><span class="text-[8px] md:text-[9px] font-bold text-slate-500 uppercase truncate max-w-[65px] md:max-w-[85px]">${col.title}</span></div><div class="flex items-baseline justify-between gap-2"><span class="text-sm md:text-lg font-black text-slate-800 leading-none">${count}</span><span class="text-[7px] md:text-[8px] font-bold ${colorTheme.text} ${colorTheme.lightBg} px-1 rounded-sm">${percentage}%</span></div><div class="mt-1 pt-1 border-t border-slate-100"><span class="text-[8px] md:text-[10px] font-black ${valueColor} truncate block">${formatMoney(colTotalValue)}</span></div></div>`;
                if (count > 0) progressContainer.innerHTML += `<div class="${colorTheme.bg} h-full transition-all duration-500" style="width: ${percentage}%"></div>`;
            });
        }

        function renderBoard() {
            if(columnsData.length === 0) { boardEl.innerHTML = `<div class="flex items-center justify-center h-full w-full"><button onclick="addNewColumn()" class="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-indigo-700 transition font-bold"><i class="fa-solid fa-plus mr-2"></i> Criar Primeira Coluna</button></div>`; return; }
            const scrollPositions = {}; document.querySelectorAll('.kanban-scroll-container').forEach(container => scrollPositions[container.dataset.colId] = container.scrollTop);
            const phoneCounts = {}; leadsData.forEach(lead => { if(!lead.phone) return; const cleanPhone = lead.phone.replace(/\D/g, ''); if(cleanPhone.length >= 10) phoneCounts[cleanPhone] = (phoneCounts[cleanPhone] || 0) + 1; });
            let duplicateCount = 0; leadsData.forEach(lead => { lead.isDuplicate = false; if(lead.phone) { const cleanPhone = lead.phone.replace(/\D/g, ''); if(cleanPhone.length >= 10 && phoneCounts[cleanPhone] > 1) { lead.isDuplicate = true; duplicateCount++; } } });
            const dupBtn = document.getElementById('btnFilterDuplicates'); if(duplicateCount > 0) { dupBtn.classList.remove('hidden'); dupBtn.classList.add('flex'); if(!showOnlyDuplicates) dupBtn.innerHTML = `<i class="fa-solid fa-copy"></i> Duplicados (${duplicateCount})`; } else { dupBtn.classList.add('hidden'); dupBtn.classList.remove('flex'); showOnlyDuplicates = false; }
            boardEl.innerHTML = ''; updateDashboard(); 
            const isFitMode = columnsData.length <= 8; const columnWidthClass = isFitMode ? 'w-[280px] shrink-0 lg:w-auto lg:flex-1 lg:min-w-[140px] max-w-[400px]' : 'w-[280px] md:w-[320px] shrink-0';

            columnsData.forEach((col, index) => {
                const colEl = document.createElement('div'); colEl.className = `kanban-col ${columnWidthClass} bg-slate-200/60 rounded-2xl flex flex-col border border-slate-200 h-full max-h-full transition-colors`; colEl.dataset.colId = col.id;
                colEl.draggable = true; colEl.addEventListener('dragstart', function(e) { if (e.target === colEl) { draggedColId = this.dataset.colId; e.dataTransfer.effectAllowed = 'move'; setTimeout(() => this.classList.add('col-ghost'), 0); }}); colEl.addEventListener('dragend', function(e) { if (e.target === colEl) { this.classList.remove('col-ghost'); draggedColId = null; }}); colEl.addEventListener('dragover', e => { e.preventDefault(); colEl.classList.add('bg-slate-300/40'); }); colEl.addEventListener('dragleave', () => colEl.classList.remove('bg-slate-300/40')); colEl.addEventListener('drop', handleDrop);
                let colLeads = leadsData.filter(l => l.columnId === col.id); if(showOnlyDuplicates) colLeads = colLeads.filter(l => l.isDuplicate);
                const colorTheme = columnColors[index % columnColors.length]; const isFechado = col.title.trim().toLowerCase() === 'fechado'; const colTotalValue = colLeads.reduce((acc, l) => acc + (parseFloat(l.dealValue) || 0), 0); const colSubtitle = isFechado ? 'Faturamento Atual' : 'Faturamento Possível'; const colSubtitleColor = isFechado ? 'text-indigo-500' : 'text-emerald-600';
                
                // CONDICIONAL DA TRAVA PARA A COLUNA
                const readOnlyAttr = isEditingLocked ? 'readonly tabindex="-1"' : '';
                const inputStyle = isEditingLocked ? 'focus:ring-0 cursor-default' : 'focus:ring-2 focus:ring-indigo-400';
                const hideDelete = isEditingLocked ? 'hidden' : '';

                colEl.innerHTML = `
                    <div class="p-3 md:p-4 pb-2 border-b border-slate-200/50 shrink-0">
                        <div class="flex justify-between items-center mb-2 group cursor-grab">
                            <i class="fa-solid fa-grip-vertical text-slate-300 mr-2 text-xs hidden md:block"></i>
                            <input type="text" class="font-bold text-slate-700 bg-transparent border-none ${inputStyle} rounded px-1 w-full outline-none transition-colors cursor-text truncate text-sm md:text-base" value="${col.title}" onblur="updateColumn('${col.id}', this.value)" onclick="event.stopPropagation()" ${readOnlyAttr}>
                            <button onclick="deleteColumn('${col.id}')" class="text-slate-300 hover:text-red-500 transition px-1 ml-auto ${hideDelete}" title="Excluir Coluna"><i class="fa-solid fa-trash-can text-[10px]"></i></button>
                            <button onclick="scrollToTop('${col.id}')" class="text-slate-300 hover:text-indigo-500 transition px-1 ml-1" title="Subir ao topo"><i class="fa-solid fa-arrow-up text-[10px]"></i></button>
                            <span class="bg-white shadow-sm ${colorTheme.text} text-xs py-0.5 px-2 rounded-full font-bold ml-1 border border-slate-200 shrink-0">${colLeads.length}</span>
                        </div>
                        <div class="text-center bg-white/50 rounded-lg p-1.5 md:p-2 border border-white/60 shadow-sm mt-1">
                            <p class="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-wider">${colSubtitle}</p>
                            <p class="text-xs md:text-sm font-black ${colSubtitleColor}">${formatMoney(colTotalValue)}</p>
                        </div>
                    </div>`;
                const container = document.createElement('div'); container.className = 'flex-1 overflow-y-auto custom-scrollbar space-y-3 p-2 md:p-3 kanban-scroll-container relative min-h-0'; container.dataset.colId = col.id;
                colLeads.forEach(lead => container.appendChild(createCard(lead, col.title))); if(colLeads.length === 0) container.innerHTML = `<div class="h-16 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center text-slate-400 text-xs">Vazio</div>`;
                colEl.appendChild(container); boardEl.appendChild(colEl);
            });
            document.querySelectorAll('.kanban-scroll-container').forEach(container => { if (scrollPositions[container.dataset.colId] !== undefined) container.scrollTop = scrollPositions[container.dataset.colId]; });
            const addColBtn = document.createElement('div'); addColBtn.className = 'shrink-0 h-full'; addColBtn.innerHTML = `<button onclick="addNewColumn()" class="bg-white border-2 border-dashed border-slate-300 text-slate-500 hover:text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50 transition rounded-xl w-14 h-full flex items-center justify-center shadow-sm" title="Adicionar Coluna"><i class="fa-solid fa-plus text-xl"></i></button>`; boardEl.appendChild(addColBtn);
            applySearchHighlight(true);
        }

        function createCard(lead, columnTitle) {
            const isExpanded = expandedLeads.has(lead.id); const isFechado = columnTitle.trim().toLowerCase() === 'fechado'; const valueColorClass = isFechado ? 'text-indigo-600' : 'text-emerald-600'; const valueBgClass = isFechado ? 'bg-indigo-50 border-indigo-100 focus-within:border-indigo-300' : 'bg-emerald-50 border-emerald-100 focus-within:border-emerald-300';
            const card = document.createElement('div'); card.className = `bg-white rounded-xl p-3 md:p-4 shadow-sm border ${isExpanded ? 'border-indigo-400 ring-1 ring-indigo-100' : 'border-slate-200'} cursor-grab hover:shadow-md transition-all group relative ${lead.isDuplicate ? 'ring-2 ring-red-300' : ''}`; card.draggable = true; card.dataset.leadId = lead.id;
            card.addEventListener('dragstart', function(e) { e.stopPropagation(); draggedLeadId = this.dataset.leadId; setTimeout(() => this.classList.add('card-ghost'), 0); }); card.addEventListener('dragend', function(e) { e.stopPropagation(); this.classList.remove('card-ghost'); draggedLeadId = null; });
            const formatDate = (ts) => ts ? new Date(ts).toLocaleDateString('pt-BR') : '-'; const formatTime = (ts) => ts ? new Date(ts).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '-';
            const duplicateBadge = lead.isDuplicate ? `<div class="flex justify-between items-center mb-1"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Contato</span><span class="bg-red-100 text-red-600 border border-red-200 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase flex items-center gap-1 animate-pulse" title="Repetido"><i class="fa-solid fa-triangle-exclamation"></i> Repetido</span></div>` : `<div class="hidden"></div>`;

            // CONDICIONAIS DA TRAVA PARA OS CAMPOS DO CARD
            const readOnlyAttr = isEditingLocked ? 'readonly tabindex="-1"' : '';
            const hideDelete = isEditingLocked ? 'hidden' : '';
            const inputBgHover = isEditingLocked ? '' : 'focus:bg-slate-50';

            card.innerHTML = `
                <div class="flex items-start justify-between mb-2 md:mb-3">
                    <div class="flex items-center gap-2 w-[80%]">
                        <i class="fa-solid fa-grip-vertical text-slate-300 hidden md:block"></i>
                        <input type="text" class="font-bold text-slate-800 bg-transparent w-full focus:outline-none ${inputBgHover} px-1 rounded edit-name truncate text-sm md:text-base" value="${lead.name}" ${readOnlyAttr}>
                    </div>
                    <button class="text-slate-400 hover:text-indigo-600 transition toggle-expand bg-slate-50 rounded-full w-6 h-6 md:w-7 md:h-7 flex items-center justify-center shrink-0"><i class="fa-solid ${isExpanded ? 'fa-chevron-up' : 'fa-list'} text-xs"></i></button>
                </div>
                <div class="space-y-1.5 md:space-y-2 mb-2 md:mb-3">
                    <div>${duplicateBadge}<div class="flex items-center bg-slate-50 rounded px-2 py-1 border border-transparent focus-within:border-slate-300 ${lead.isDuplicate ? 'border-red-200 bg-red-50/50' : ''}"><i class="fa-solid fa-phone text-[10px] md:text-xs ${lead.isDuplicate ? 'text-red-400' : 'text-slate-400'} mr-2 phone-icon"></i><input type="text" class="bg-transparent w-full focus:outline-none edit-phone text-xs md:text-sm ${lead.isDuplicate ? 'text-red-700 font-bold' : 'text-slate-600'}" value="${lead.phone || ''}" placeholder="Celular/Fixo..." ${readOnlyAttr}></div></div>
                    <div class="flex items-center bg-slate-50 rounded px-2 py-1 border border-transparent focus-within:border-slate-300"><i class="fa-solid fa-location-dot text-[10px] md:text-xs text-slate-400 mr-2"></i><input type="text" class="w-full text-[10px] md:text-xs text-slate-500 bg-transparent focus:outline-none edit-address" value="${lead.address || ''}" placeholder="Endereço..." ${readOnlyAttr}><button class="text-slate-400 hover:text-indigo-500 transition ml-1 px-1 map-btn" title="Abrir no Google Maps"><i class="fa-solid fa-map-location-dot text-[10px] md:text-xs"></i></button></div>
                    <div class="flex items-center rounded px-2 py-1.5 border transition-colors ${valueBgClass}"><span class="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase mr-2">Valor:</span><input type="text" class="edit-deal-value bg-transparent w-full focus:outline-none text-xs md:text-sm font-black ${valueColorClass} text-right" value="${formatMoney(lead.dealValue)}" title="Edite o valor" ${readOnlyAttr}></div>
                </div>
                <div class="${isExpanded ? 'block' : 'hidden'} mt-3 pt-3 border-t border-slate-100">
                    <div class="flex justify-between items-center mb-2"><p class="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wider">Histórico</p><button class="text-red-400 hover:text-red-600 text-[9px] md:text-[10px] uppercase font-bold delete-btn ${hideDelete}"><i class="fa-regular fa-trash-can"></i> Excluir</button></div>
                    <div class="max-h-32 overflow-y-auto custom-scrollbar mb-2 space-y-2">
                        ${(lead.history || []).length > 0 ? lead.history.map((h, idx) => `<div class="history-item text-[10px] md:text-xs"><textarea class="w-full bg-slate-50 border-none focus:ring-0 p-1 rounded edit-history-item resize-none min-h-[30px]" data-index="${idx}">${h.text}</textarea><div class="flex justify-between text-[8px] md:text-[9px] text-slate-400 mt-1 italic px-1"><span>${formatDate(h.createdAt)} ${formatTime(h.createdAt)}</span></div></div>`).join('') : '<p class="text-[10px] md:text-xs text-slate-400 italic">Sem notas.</p>'}
                    </div>
                    <div class="flex gap-2"><input type="text" class="flex-1 text-[10px] md:text-xs border border-slate-200 rounded p-1.5 focus:ring-1 focus:ring-indigo-500 outline-none new-note-input" placeholder="Nova nota..."><button class="bg-slate-800 text-white px-3 py-1 rounded text-xs add-note-btn"><i class="fa-solid fa-check"></i></button></div>
                </div>
                <div class="mt-3 md:mt-4 flex gap-2">
                    <a href="https://crmpetshop.vercel.app/ficha-cadastro/index.html?id=${lead.id}" target="_blank" rel="noopener noreferrer" class="flex-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 py-2 rounded-lg font-bold flex items-center justify-center gap-2 text-[10px] md:text-xs transition-colors shadow-sm text-center"><i class="fa-regular fa-address-card"></i> Ficha</a>
                    <button class="flex-1 ${lead.phone ? 'bg-emerald-500 hover:bg-emerald-600 text-white border border-emerald-500' : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'} py-2 rounded-lg font-bold flex items-center justify-center gap-2 whatsapp-btn text-[10px] md:text-xs transition-colors shadow-sm"><i class="fa-brands fa-whatsapp text-sm"></i> Falar</button>
                </div>
            `;

            const dealInput = card.querySelector('.edit-deal-value'); dealInput.addEventListener('input', (e) => { let val = e.target.value.replace(/\D/g, ''); if(!val) val = '0'; e.target.value = formatMoney(parseFloat(val) / 100); }); dealInput.addEventListener('blur', (e) => { let val = e.target.value.replace(/\D/g, ''); let raw = val ? parseFloat(val) / 100 : 0; updateField(lead.id, 'dealValue', raw); });
            card.querySelector('.toggle-expand').onclick = () => { isExpanded ? expandedLeads.delete(lead.id) : expandedLeads.add(lead.id); renderBoard(); }; card.querySelector('.edit-name').onblur = (e) => updateField(lead.id, 'name', e.target.value); card.querySelector('.edit-address').onblur = (e) => updateField(lead.id, 'address', e.target.value);
            card.querySelector('.map-btn').onclick = () => { const addr = card.querySelector('.edit-address').value.trim(); if(addr) window.open(`https://www.google.com/maps/search/?api=1&query=$0{encodeURIComponent(addr)}`, '_blank'); else alert('Por favor, preencha o endereço.'); };
            const phoneInput = card.querySelector('.edit-phone'); const phoneIcon = card.querySelector('.phone-icon'); phoneInput.addEventListener('input', function(e) { e.target.value = mascaraTelefoneInteligente(e.target.value); }); phoneInput.onblur = (e) => { updateField(lead.id, 'phone', e.target.value); };
            phoneInput.addEventListener('paste', async (e) => { const item = Array.from(e.clipboardData.items).find(i => i.type.includes('image')); if (item) { e.preventDefault(); phoneIcon.className = "fa-solid fa-circle-notch fa-spin text-xs text-indigo-500 mr-2"; try { const res = await Tesseract.recognize(item.getAsFile(), 'por'); const phoneMatch = res.data.text.match(/(?:\(?\d{2}\)?\s?)?(?:9?\d{4})[-\s]?(?:\d{4})/); if(phoneMatch) { let formatted = mascaraTelefoneInteligente(phoneMatch[0]); phoneInput.value = formatted; await updateField(lead.id, 'phone', formatted); } } catch(err) {} finally { phoneIcon.className = "fa-solid fa-phone text-[10px] md:text-xs text-slate-400 mr-2"; } } });
            card.querySelector('.whatsapp-btn').onclick = () => { if(!lead.phone) return; let num = lead.phone.replace(/\D/g, ''); if (num.length >= 10 && !num.startsWith('55')) num = '55' + num; window.open(`https://api.whatsapp.com/send?phone=${num}`, '_blank'); };
            card.querySelector('.delete-btn').onclick = () => confirm('Excluir Cartão permanentemente?') && db.collection('leads').doc(lead.id).delete();
            const addNoteBtn = card.querySelector('.add-note-btn'); if(addNoteBtn) { addNoteBtn.onclick = async () => { const val = card.querySelector('.new-note-input').value; if(!val.trim()) return; const newHistory = lead.history || []; newHistory.push({ text: val, createdAt: Date.now(), updatedAt: null }); await updateField(lead.id, 'history', newHistory); }; }
            card.querySelectorAll('.edit-history-item').forEach(area => { area.onblur = async (e) => { const idx = e.target.dataset.index; const newHistory = [...lead.history]; if(newHistory[idx].text === e.target.value) return; newHistory[idx].text = e.target.value; newHistory[idx].updatedAt = Date.now(); await updateField(lead.id, 'history', newHistory); }; });
            return card;
        }

        async function updateField(id, field, val) { await db.collection('leads').doc(id).update({ [field]: val }); }
        function handleDrop(e) { e.preventDefault(); e.stopPropagation(); this.classList.remove('bg-slate-300/40'); const targetColId = this.dataset.colId; if (draggedLeadId) updateField(draggedLeadId, 'columnId', targetColId); else if (draggedColId && draggedColId !== targetColId) reorderColumns(draggedColId, targetColId); }
        async function reorderColumns(sourceId, targetId) { const newCols = [...columnsData]; const srcIdx = newCols.findIndex(c => c.id === sourceId); const tgtIdx = newCols.findIndex(c => c.id === targetId); const [movedCol] = newCols.splice(srcIdx, 1); newCols.splice(tgtIdx, 0, movedCol); const batch = db.batch(); newCols.forEach((col, idx) => { batch.update(db.collection('columns').doc(col.id), { order: idx + 1 }); }); await batch.commit(); }

        searchInput.addEventListener('input', (e) => { currentSearchTerm = e.target.value.toLowerCase().trim(); applySearchHighlight(); });
        const searchControls = document.getElementById('searchControls'); const searchCounter = document.getElementById('searchCounter');
        function applySearchHighlight(isReRender = false) { 
            searchMatches = []; const searchDigits = currentSearchTerm.replace(/\D/g, ''); document.querySelectorAll('.edit-name, .edit-phone').forEach(input => { input.classList.remove('highlight-match', 'active-search-match'); if(input.classList.contains('edit-name')) input.classList.add('text-slate-800', 'bg-transparent'); });
            if (currentSearchTerm) { document.querySelectorAll('[data-lead-id]').forEach(card => { const nameInput = card.querySelector('.edit-name'); const phoneInput = card.querySelector('.edit-phone'); if (nameInput && nameInput.value.toLowerCase().includes(currentSearchTerm)) { nameInput.classList.add('highlight-match'); nameInput.classList.remove('text-slate-800', 'bg-transparent'); searchMatches.push(nameInput); } if (phoneInput && phoneInput.value) { const phoneDigits = phoneInput.value.replace(/\D/g, ''); if (phoneInput.value.toLowerCase().includes(currentSearchTerm) || (searchDigits.length > 0 && phoneDigits.includes(searchDigits))) { phoneInput.classList.add('highlight-match'); searchMatches.push(phoneInput); } } }); }
            if (searchMatches.length > 0) { searchControls.classList.remove('hidden'); searchControls.classList.add('flex'); if(!isReRender || currentSearchIndex === -1 || currentSearchIndex >= searchMatches.length) currentSearchIndex = 0; focusSearchMatch(currentSearchIndex); } else { if (currentSearchTerm) { searchControls.classList.remove('hidden'); searchControls.classList.add('flex'); searchCounter.innerText = "0/0"; } else { searchControls.classList.add('hidden'); searchControls.classList.remove('flex'); currentSearchIndex = -1; } }
        }
        function focusSearchMatch(index) { if (searchMatches.length === 0) return; if (index < 0) index = searchMatches.length - 1; if (index >= searchMatches.length) index = 0; currentSearchIndex = index; searchCounter.innerText = `${currentSearchIndex + 1}/${searchMatches.length}`; searchMatches.forEach(el => el.classList.remove('active-search-match')); const activeEl = searchMatches[currentSearchIndex]; activeEl.classList.add('active-search-match'); activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
        window.prevSearch = () => focusSearchMatch(currentSearchIndex - 1); window.nextSearch = () => focusSearchMatch(currentSearchIndex + 1);

        const manualPhoneInput = document.getElementById('manualPhone'); const manualAddressInput = document.getElementById('manualAddress'); const manualNameInput = document.getElementById('manualName');
        manualPhoneInput.addEventListener('input', function(e) { e.target.value = mascaraTelefoneInteligente(e.target.value); });
        document.getElementById('manualForm').onsubmit = (e) => { e.preventDefault(); db.collection('leads').add({ name: manualNameInput.value, phone: manualPhoneInput.value, address: manualAddressInput.value, dealValue: 0, columnId: columnsData[0].id, createdAt: Date.now(), history: [] }); manualNameInput.value = ''; manualPhoneInput.value = ''; manualAddressInput.value = ''; };
        const pasteInitial = document.getElementById('pasteInitialState'); const pasteProcessing = document.getElementById('pasteProcessingState');
        document.getElementById('pasteZone').onpaste = async (e) => {
            const item = Array.from(e.clipboardData.items).find(i => i.type.includes('image'));
            if (item) {
                pasteInitial.classList.add('hidden'); pasteProcessing.classList.remove('hidden'); pasteProcessing.classList.add('flex');
                try {
                    const res = await Tesseract.recognize(item.getAsFile(), 'por'); const text = res.data.text; const lines = text.split('\n').map(l => l.trim());
                    let name = 'Novo Lead'; const palavrasIgnoradas = ['pesquise', 'google', 'maps', 'rotas', 'salvar', 'compartilhar', 'avaliaç', 'telefone', 'endereço', 'fechado', 'aberto', 'adicionar']; const palavrasChavePet = ['pet', 'shop', 'agro', 'vet', 'raç', 'rac', 'bicho', 'cão', 'cao', 'gato', 'clínica', 'clinica', 'pata', 'animal'];
                    for (let i = 0; i < Math.min(lines.length, 8); i++) { let linhaAtual = lines[i]; let linhaLower = linhaAtual.toLowerCase(); if (linhaAtual.length < 4) continue; if (palavrasIgnoradas.some(w => linhaLower.includes(w))) continue; if (/^\d+[,\.]\d+/.test(linhaAtual) || /^\d+\s*\(/.test(linhaAtual)) continue; if (palavrasChavePet.some(w => linhaLower.includes(w))) { name = linhaAtual; break; } if (name === 'Novo Lead') name = linhaAtual; }
                    let finalPhone = ''; const phoneRegex = /(?:\+55\s?)?(?:\(?\d{2}\)?\s?)?\d{4,5}[-\s]?\d{4}/g; const allPhones = text.match(phoneRegex);
                    if (allPhones && allPhones.length > 0) { let celulares = allPhones.filter(p => { let limpo = p.replace(/\D/g, ''); return limpo.length >= 10 && limpo.replace(/^55/, '').length === 11 && limpo.replace(/^55/, '')[2] === '9'; }); let escolhido = celulares.length > 0 ? celulares[0] : allPhones[0]; finalPhone = mascaraTelefoneInteligente(escolhido); }
                    let addr = lines.find(l => l.match(/(rua|av|avenida|praça|rodovia|bairro|centro)/i) || l.match(/,\s*\d+/) || l.match(/\d{5}-\d{3}/) ) || '';
                    await db.collection('leads').add({ name: name, phone: finalPhone, address: addr, dealValue: 0, columnId: columnsData[0].id, createdAt: Date.now(), history: [{ text: "Criado via Print do Google Maps.", createdAt: Date.now() }] });
                } catch(err) { alert("Ocorreu um erro ao extrair os dados da imagem."); } finally { pasteInitial.classList.remove('hidden'); pasteProcessing.classList.add('hidden'); }
            }
        };
    </script>
</body>
</html>
