<!DOCTYPE html>
<html lang="pt-PT">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Action Hub Pro - PetLojas</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; background-color: transparent; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        
        /* Segmented Control - Estilo Apple/iOS */
        .segmented-control { @apply flex bg-slate-200/70 p-1 rounded-xl shadow-inner; }
        .segment-btn { @apply px-4 py-1.5 text-xs font-bold rounded-lg transition-all duration-300 flex items-center gap-2 text-slate-500 cursor-pointer; }
        .segment-btn.active { @apply bg-white text-slate-800 shadow-sm ring-1 ring-slate-200; }

        /* Estilos do Calendário Proporcional */
        .calendar-grid { display: grid; gap: 0; }
        .day-column { @apply relative border-r border-slate-100 transition-colors hover:bg-slate-50/50 cursor-crosshair; }
        .day-column.today { @apply bg-blue-50/10; }
        
        /* Chip de Evento na Grade */
        .event-block { @apply absolute left-1 right-1 rounded-md p-1.5 text-[10px] leading-tight overflow-hidden shadow-sm border-l-4 transition-all hover:z-30 hover:scale-[1.02] cursor-pointer; }
        
        /* Cores de Prioridade */
        .event-alta { @apply bg-red-100 text-red-800 border-red-500; }
        .event-media { @apply bg-yellow-100 text-yellow-800 border-yellow-500; }
        .event-baixa { @apply bg-blue-100 text-blue-800 border-blue-500; }
    </style>
</head>
<body class="flex flex-col h-screen overflow-hidden text-slate-800 p-4 gap-4">

    <div class="flex flex-wrap items-center justify-between bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-200 shadow-sm shrink-0 gap-4">
        
        <div class="segmented-control">
            <button onclick="mudarModo('hibrida', this)" class="segment-btn active">
                <i class="fa-solid fa-table-columns text-blue-500"></i> Híbrida
            </button>
            <button onclick="mudarModo('tarefas', this)" class="segment-btn">
                <i class="fa-solid fa-list-check text-slate-400"></i> Tarefas
            </button>
            <button onclick="mudarModo('agenda', this)" class="segment-btn">
                <i class="fa-solid fa-calendar-days text-slate-400"></i> Agenda
            </button>
        </div>

        <div class="flex items-center gap-4">
            <div class="flex items-center bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <button onclick="navegarData(-1)" class="px-3 py-1.5 hover:bg-slate-100 transition text-slate-500"><i class="fa-solid fa-chevron-left text-xs"></i></button>
                <button onclick="irParaHoje()" class="px-4 py-1.5 text-xs font-black uppercase text-slate-600 hover:text-blue-600 transition border-x border-slate-200">Hoje</button>
                <button onclick="navegarData(1)" class="px-3 py-1.5 hover:bg-slate-100 transition text-slate-500"><i class="fa-solid fa-chevron-right text-xs"></i></button>
            </div>
            
            <h2 id="display-periodo" class="text-sm font-black text-slate-700 min-w-[140px] text-center capitalize">Maio 2026</h2>

            <div class="segmented-control">
                <button onclick="mudarPeriodo('dia', this)" class="segment-btn">Dia</button>
                <button onclick="mudarPeriodo('semana', this)" class="segment-btn active">Semana</button>
            </div>
        </div>

        <button onclick="abrirModalNovaTarefa()" class="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg transition-all active:scale-95">
            <i class="fa-solid fa-plus text-sm"></i> Ação
        </button>
    </div>

    <div class="flex-1 flex gap-5 overflow-hidden">
        
        <div id="coluna-tarefas" class="w-1/4 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full transition-all duration-500">
            <div class="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/80 rounded-t-2xl shrink-0">
                <h3 class="font-black text-[11px] uppercase tracking-widest text-slate-600">Backlog (Sem Hora)</h3>
                <span id="count-tarefas" class="bg-slate-200 text-slate-700 text-[10px] px-2 py-0.5 rounded-full font-bold">0</span>
            </div>
            <div id="lista-tarefas" class="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
                </div>
        </div>

        <div id="coluna-agenda" class="flex-1 flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-500 relative">
            
            <div id="calendar-headers-wrapper" class="flex border-b border-slate-200 bg-slate-50/80 shrink-0">
                <div class="w-12 shrink-0 border-r border-slate-200"></div> <div id="calendar-headers" class="flex-1 calendar-grid">
                    </div>
            </div>

            <div id="all-day-wrapper" class="flex border-b border-slate-200 bg-white shrink-0 hidden">
                <div class="w-12 shrink-0 border-r border-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-400 uppercase">Dia<br>Todo</div>
                <div id="all-day-grid" class="flex-1 calendar-grid p-1">
                    </div>
            </div>
            
            <div class="flex-1 overflow-y-auto custom-scrollbar relative bg-white" id="calendar-scroll-area">
                <div class="flex h-[1440px] relative w-full">
                    
                    <div class="w-12 shrink-0 border-r border-slate-200 bg-white relative z-10" id="time-axis">
                        </div>
                    
                    <div class="absolute inset-0 left-12 pointer-events-none z-0" id="grid-lines">
                        </div>
                    
                    <div class="absolute left-12 right-0 h-[2px] bg-red-500 z-20 pointer-events-none hidden shadow-[0_0_8px_rgba(239,68,68,0.8)]" id="current-time-line">
                        <div class="w-2.5 h-2.5 bg-red-500 rounded-full absolute -left-1.5 -top-[4px]"></div>
                    </div>
                    
                    <div class="flex-1 calendar-grid relative z-10" id="day-columns-container">
                        </div>

                </div>
            </div>
        </div>

    </div>

    <div id="modal-nova-tarefa" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center hidden transition-opacity duration-300">
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-95 opacity-0 duration-300" id="modal-content">
            <div class="bg-slate-50 px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                <h3 class="font-black text-sm uppercase tracking-wider text-slate-800" id="modal-title">Nova Ação / Reunião</h3>
                <button onclick="fecharModalNovaTarefa()" class="text-slate-400 hover:text-red-500 transition w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50"><i class="fa-solid fa-xmark text-lg"></i></button>
            </div>
            <form id="form-nova-tarefa" class="p-6 space-y-4">
                <input type="hidden" id="input-id-edicao"> <div>
                    <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Título do Evento / Loja</label>
                    <input type="text" id="input-titulo" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm text-slate-800" placeholder="Ex: Reunião PetShop Cão Feliz">
                </div>
                
                <div class="grid grid-cols-3 gap-3">
                    <div class="col-span-3">
                        <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Data</label>
                        <input type="date" id="input-data" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-xs text-slate-700">
                    </div>
                    <div class="col-span-1">
                        <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 text-center">Início</label>
                        <input type="time" id="input-hora-inicio" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-xs text-center text-slate-700">
                    </div>
                    <div class="col-span-1 flex items-center justify-center pt-5 text-slate-300 font-bold">Até</div>
                    <div class="col-span-1">
                        <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 text-center">Fim</label>
                        <input type="time" id="input-hora-fim" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-xs text-center text-slate-700">
                    </div>
                </div>
                <div class="flex items-center gap-2 mt-1">
                    <input type="checkbox" id="input-dia-inteiro" class="w-4 h-4 accent-blue-600 rounded cursor-pointer" onchange="toggleHoras(this.checked)">
                    <label for="input-dia-inteiro" class="text-xs font-bold text-slate-500 cursor-pointer">Evento de Dia Inteiro / Sem Hora</label>
                </div>

                <div class="grid grid-cols-2 gap-4 pt-2">
                    <div>
                        <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Prioridade</label>
                        <select id="input-prioridade" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-xs text-slate-700">
                            <option value="baixa">🔵 Normal</option>
                            <option value="media">🟡 Follow-up</option>
                            <option value="alta">🔴 Fechamento / Urgente</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">WhatsApp</label>
                        <input type="text" id="input-telefone" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-xs text-slate-700" placeholder="(33) 9...">
                    </div>
                </div>

                <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-[0.1em] py-3.5 rounded-xl mt-4 transition shadow-lg shadow-blue-600/30 active:scale-95">
                    Guardar no Calendário
                </button>
            </form>
        </div>
    </div>

    <script type="module" src="agenda.js"></script>
    <script>
        // Funções de Interface UI
        window.abrirModalNovaTarefa = (dataIso = '', horaStr = '') => {
            document.getElementById('form-nova-tarefa').reset();
            document.getElementById('input-id-edicao').value = '';
            
            if (dataIso) document.getElementById('input-data').value = dataIso;
            if (horaStr) {
                document.getElementById('input-hora-inicio').value = horaStr;
                document.getElementById('input-dia-inteiro').checked = false;
                toggleHoras(false);
            } else {
                document.getElementById('input-dia-inteiro').checked = true;
                toggleHoras(true);
            }

            const modal = document.getElementById('modal-nova-tarefa');
            const content = document.getElementById('modal-content');
            modal.classList.remove('hidden');
            setTimeout(() => {
                content.classList.remove('scale-95', 'opacity-0');
                content.classList.add('scale-100', 'opacity-100');
            }, 10);
        };

        window.fecharModalNovaTarefa = () => {
            const content = document.getElementById('modal-content');
            content.classList.remove('scale-100', 'opacity-100');
            content.classList.add('scale-95', 'opacity-0');
            setTimeout(() => document.getElementById('modal-nova-tarefa').classList.add('hidden'), 300);
        };
        
        window.toggleHoras = (isDiaInteiro) => {
            document.getElementById('input-hora-inicio').disabled = isDiaInteiro;
            document.getElementById('input-hora-fim').disabled = isDiaInteiro;
            if(isDiaInteiro) {
                document.getElementById('input-hora-inicio').value = '';
                document.getElementById('input-hora-fim').value = '';
                document.getElementById('input-hora-inicio').classList.add('opacity-50');
                document.getElementById('input-hora-fim').classList.add('opacity-50');
            } else {
                document.getElementById('input-hora-inicio').classList.remove('opacity-50');
                document.getElementById('input-hora-fim').classList.remove('opacity-50');
            }
        };

        window.mudarModo = (modo, btn) => {
            document.querySelectorAll('.segmented-control:first-of-type button').forEach(b => {
                b.classList.remove('active');
                b.querySelector('i').classList.replace('text-blue-500', 'text-slate-400');
            });
            btn.classList.add('active');
            btn.querySelector('i').classList.replace('text-slate-400', 'text-blue-500');

            const colT = document.getElementById('coluna-tarefas');
            const colA = document.getElementById('coluna-agenda');
            if(modo === 'tarefas') { colT.className = 'w-full bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full block'; colA.classList.add('hidden'); }
            else if(modo === 'agenda') { colT.classList.add('hidden'); colA.classList.remove('hidden'); }
            else { colT.className = 'w-1/4 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full block'; colA.classList.remove('hidden'); }
        }
    </script>
</body>
</html>
