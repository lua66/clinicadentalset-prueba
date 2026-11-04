/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Private CRM Page for Clinic Owner ("página oculta que se entre con contraseña solo dueño de clinica")
 * Tracks WhatsApp & Call interactions, timestamps, treatments, origin pages, and seen/unseen statuses.
 */

import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  Key,
  ShieldCheck,
  ShieldAlert,
  MessageCircle,
  Phone,
  CheckCircle2,
  Clock,
  Calendar,
  Search,
  Filter,
  Download,
  PlusCircle,
  Eye,
  EyeOff,
  ArrowLeft,
  Sparkles,
  Trash2,
  FileText,
  Save,
  Check,
  AlertTriangle
} from 'lucide-react';
import {
  CrmLead,
  getCrmLeads,
  markLeadAsSeen,
  markLeadAsUnseen,
  markAllLeadsAsSeen,
  updateLeadNotes,
  deleteCrmLead,
  trackCrmLead,
  isCrmAuthenticated,
  setCrmAuthenticated,
  checkCrmPassword,
  getStoredPassword,
  setStoredPassword,
  getUnseenLeadsCount
} from '../utils/crmTracker';
import { CLINIC_CONTACT } from '../data/clinicData';

interface OwnerCrmPageProps {
  onBackToWeb: () => void;
}

export const OwnerCrmPage: React.FC<OwnerCrmPageProps> = ({ onBackToWeb }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // CRM State
  const [leads, setLeads] = useState<CrmLead[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'sin_ver' | 'visto' | 'whatsapp' | 'call'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState<string>('');
  const [savedNoteNotification, setSavedNoteNotification] = useState<string | null>(null);

  // Settings
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [settingsSuccess, setSettingsSuccess] = useState<string>('');

  // Initial check of auth
  useEffect(() => {
    setIsAuthenticated(isCrmAuthenticated());
  }, []);

  // Load leads
  const refreshLeads = () => {
    setLeads(getCrmLeads());
  };

  useEffect(() => {
    refreshLeads();

    const handleUpdate = () => refreshLeads();
    window.addEventListener('set-crm-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('set-crm-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkCrmPassword(passwordInput)) {
      setIsAuthenticated(true);
      setPasswordError('');
      setPasswordInput('');
    } else {
      setPasswordError('Contraseña incorrecta. Por favor verifíquela.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setCrmAuthenticated(false);
    setIsAuthenticated(false);
  };

  // Toggle single lead status
  const handleToggleLeadStatus = (lead: CrmLead) => {
    if (lead.status === 'sin_ver') {
      markLeadAsSeen(lead.id);
    } else {
      markLeadAsUnseen(lead.id);
    }
  };

  // Save Note
  const handleSaveNote = (id: string) => {
    updateLeadNotes(id, noteDraft);
    setEditingNotesId(null);
    setSavedNoteNotification(id);
    setTimeout(() => setSavedNoteNotification(null), 2500);
  };

  // Simulate demo lead
  const handleSimulateLead = (type: 'whatsapp' | 'call') => {
    const treatments = [
      'Implantes Dentales y Carga Inmediata',
      'Ortodoncia Invisible con Escáner 3D',
      'Estética Dental y Carillas de Cerámica',
      'Periodoncia y Cuidado de Encías',
      'Endodoncia Rotatoria',
      'Limpieza y Profilaxis Dental',
      'Urgencia Dental en Poblenou'
    ];
    const randomTreatment = treatments[Math.floor(Math.random() * treatments.length)];

    trackCrmLead({
      type,
      treatment: randomTreatment,
      sourcePage: `Web Clínica SET · Botón de Prueba (${type === 'whatsapp' ? 'WhatsApp' : 'Llamada'})`,
      sourceUrl: '/',
      phoneTarget: type === 'whatsapp' ? '+34 648 83 48 94' : '933 09 18 71',
    });
  };

  // Export CSV
  const handleExportCsv = () => {
    const headers = ['ID', 'Fecha', 'Hora', 'Canal', 'Telefono_Destino', 'Tratamiento_Especialidad', 'Pagina_Origen', 'URL_Origen', 'Estado', 'Revisado_El', 'Notas'];
    const rows = leads.map(l => [
      l.id,
      `"${l.formattedDate}"`,
      `"${l.formattedTime}"`,
      `"${l.type === 'whatsapp' ? 'WhatsApp' : 'Llamada Telefónica'}"`,
      `"${l.phoneTarget}"`,
      `"${(l.treatment || '').replace(/"/g, '""')}"`,
      `"${(l.sourcePage || '').replace(/"/g, '""')}"`,
      `"${l.sourceUrl || ''}"`,
      `"${l.status === 'sin_ver' ? 'Sin Ver (Pendiente)' : 'Visto'}"`,
      `"${l.seenAt || '-'}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_clinica_set_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Change Password
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.trim().length >= 4) {
      setStoredPassword(newPassword.trim());
      setSettingsSuccess('Contraseña actualizada correctamente.');
      setNewPassword('');
      setTimeout(() => setSettingsSuccess(''), 3000);
    } else {
      setSettingsSuccess('La contraseña debe tener al menos 4 caracteres.');
    }
  };

  const unseenCount = getUnseenLeadsCount();
  const seenCount = leads.length - unseenCount;
  const whatsappCount = leads.filter(l => l.type === 'whatsapp').length;
  const callCount = leads.filter(l => l.type === 'call').length;

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    // Tab filter
    if (activeTab === 'sin_ver' && lead.status !== 'sin_ver') return false;
    if (activeTab === 'visto' && lead.status !== 'visto') return false;
    if (activeTab === 'whatsapp' && lead.type !== 'whatsapp') return false;
    if (activeTab === 'call' && lead.type !== 'call') return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTreatment = lead.treatment.toLowerCase().includes(q);
      const matchDate = lead.formattedDate.toLowerCase().includes(q);
      const matchPage = lead.sourcePage.toLowerCase().includes(q);
      const matchNotes = (lead.notes || '').toLowerCase().includes(q);
      return matchTreatment || matchDate || matchPage || matchNotes;
    }

    return true;
  });

  // SCREEN 1: PASSWORD AUTHENTICATION GATE
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#08120c] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0d1a11] border border-emerald-950/80 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          
          {/* Subtle green ambient light */}
          <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#83C408]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img
                src="/assets/logo-blanc.png"
                alt="Clínica Dental SET"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#83C408]/15 text-[#83C408] border border-[#83C408]/30 mb-2">
              <Lock className="w-3 h-3" />
              <span>Acceso Exclusivo Dirección</span>
            </div>
            <h1 className="text-xl font-extrabold text-white">
              Panel CRM y Registro de Contactos
            </h1>
            <p className="text-xs text-stone-400 mt-1.5">
              Control en tiempo real de WhatsApps y llamadas de pacientes generadas desde la web.
            </p>
          </div>

          {/* Password Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                Contraseña de Acceso de la Dueña:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setPasswordError('');
                  }}
                  placeholder="Introduce la contraseña"
                  className="w-full px-4 py-3 bg-[#060e09] border border-emerald-900/60 rounded-xl text-white placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-[#83C408] text-sm pr-11"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {passwordError && (
                <p className="text-xs text-rose-400 mt-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{passwordError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-[#23A455] hover:bg-[#1e8d49] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Key className="w-4 h-4" />
              <span>Entrar al Panel Privado</span>
            </button>
          </form>

          {/* Default Password Tip */}
          <div className="mt-6 pt-5 border-t border-emerald-950/80 text-center">
            <div className="p-3 bg-stone-900/60 rounded-xl border border-stone-800 text-[11px] text-stone-400">
              <span className="font-semibold text-[#83C408]">Contraseña por defecto: </span>
              <code className="bg-black/50 px-2 py-0.5 rounded text-white font-mono font-bold">
                set2026
              </code>
              <p className="mt-1 text-[10px] text-stone-500">
                (Podrás cambiarla dentro en cualquier momento)
              </p>
            </div>

            <button
              onClick={onBackToWeb}
              className="mt-4 text-xs text-stone-400 hover:text-white flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a la página web</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  // SCREEN 2: AUTHENTICATED CRM DASHBOARD
  return (
    <div className="min-h-screen bg-[#08120c] text-stone-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* TOP BAR: Header, Logo, Status & Actions */}
        <div className="bg-[#0d1a11] border border-emerald-950 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/assets/logo-blanc.png"
              alt="Clínica Dental SET"
              className="h-9 sm:h-10 w-auto object-contain"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold text-white">
                  CRM de Dirección · Clínica Dental SET
                </h1>
                <span className="bg-[#83C408]/20 text-[#83C408] text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full border border-[#83C408]/30">
                  Panel Propietario
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Registro y auditoría en tiempo real de contactos generados por pacientes
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="px-3 py-2 text-xs font-medium rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 border border-emerald-950 flex items-center gap-1.5 cursor-pointer"
            >
              <Key className="w-3.5 h-3.5 text-[#83C408]" />
              <span>Seguridad</span>
            </button>

            <button
              onClick={handleExportCsv}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-[#122418] hover:bg-[#193322] text-[#83C408] border border-emerald-900/60 flex items-center gap-1.5 cursor-pointer"
              title="Descargar todos los registros en formato Excel / CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar CSV</span>
            </button>

            <button
              onClick={onBackToWeb}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-[#23A455] hover:bg-[#1e8d49] text-white flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a la Web</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-2 text-xs font-medium rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-800 cursor-pointer"
              title="Cerrar sesión"
            >
              <Unlock className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* SETTINGS PANEL (Change Password) */}
        {showSettings && (
          <div className="bg-[#0f1f14] border border-emerald-800/80 rounded-2xl p-5 animate-in fade-in duration-200">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Key className="w-4 h-4 text-[#83C408]" />
              <span>Configurar Contraseña de Dirección</span>
            </h3>
            <p className="text-xs text-stone-400 mb-4">
              Cambia la contraseña maestra de acceso a esta página privada de CRM.
            </p>
            <form onSubmit={handleChangePassword} className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="text"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nueva contraseña (mínimo 4 caracteres)"
                className="flex-1 px-3.5 py-2 bg-[#060e09] border border-emerald-900 rounded-xl text-white text-xs focus:outline-none focus:ring-1 focus:ring-[#83C408]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#23A455] text-white text-xs font-bold rounded-xl hover:bg-[#1e8d49] cursor-pointer"
              >
                Guardar Contraseña
              </button>
            </form>
            {settingsSuccess && (
              <p className="text-xs text-[#83C408] mt-2 font-medium">
                {settingsSuccess}
              </p>
            )}
          </div>
        )}

        {/* PERSISTENT ILLUMINATED WARNING BANNER (Rule: Warning remains ON as long as there are unseen clients) */}
        {unseenCount > 0 ? (
          <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-r from-red-950/90 via-rose-950/80 to-amber-950/70 border-2 border-red-500/80 shadow-[0_0_25px_rgba(239,68,68,0.4)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-lg animate-pulse">
                  <ShieldAlert className="w-6 h-6 text-yellow-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
                      Aviso para la Dueña: Tienes {unseenCount} {unseenCount === 1 ? 'cliente sin revisar' : 'clientes sin revisar'}
                    </h2>
                  </div>
                  <p className="text-xs text-rose-200/90 mt-1 leading-relaxed">
                    El botón de aviso en la web <strong className="text-yellow-300 underline font-semibold">permanecerá encendido e iluminado</strong> hasta que revises todos los contactos y los marques como vistos.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={markAllLeadsAsSeen}
                  className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-yellow-300" />
                  <span>Marcar todos como vistos</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl p-4 bg-[#0d1a11] border border-emerald-950 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#83C408]/20 text-[#83C408] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">
                  Todo al día · No hay clientes sin ver
                </h2>
                <p className="text-xs text-stone-400">
                  El botón de aviso en la web se encuentra apagado en modo reposo.
                </p>
              </div>
            </div>

            <div className="text-xs text-stone-500 font-mono">
              {leads.length} contactos registrados en histórico
            </div>
          </div>
        )}

        {/* 4-COLUMN SUMMARY METRICS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Sin Ver */}
          <div className={`p-4 rounded-2xl border transition-all ${
            unseenCount > 0
              ? 'bg-red-950/40 border-red-500/60 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
              : 'bg-[#0d1a11] border-emerald-950'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-400">Sin Ver (Pendientes)</span>
              <span className={`w-2.5 h-2.5 rounded-full ${unseenCount > 0 ? 'bg-red-500 animate-ping' : 'bg-stone-600'}`} />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className={`text-2xl sm:text-3xl font-extrabold ${unseenCount > 0 ? 'text-red-400' : 'text-stone-300'}`}>
                {unseenCount}
              </span>
              <span className="text-[11px] text-stone-500">requieren revisión</span>
            </div>
          </div>

          {/* Card 2: Vistos */}
          <div className="p-4 rounded-2xl bg-[#0d1a11] border border-emerald-950">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-400">Atendidos / Vistos</span>
              <CheckCircle2 className="w-4 h-4 text-[#83C408]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#83C408]">
                {seenCount}
              </span>
              <span className="text-[11px] text-stone-500">contactos revisados</span>
            </div>
          </div>

          {/* Card 3: WhatsApps */}
          <div className="p-4 rounded-2xl bg-[#0d1a11] border border-emerald-950">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-400">Canal WhatsApp</span>
              <MessageCircle className="w-4 h-4 text-[#23A455]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {whatsappCount}
              </span>
              <span className="text-[11px] text-stone-500">clics a WhatsApp</span>
            </div>
          </div>

          {/* Card 4: Llamadas */}
          <div className="p-4 rounded-2xl bg-[#0d1a11] border border-emerald-950">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-400">Llamadas Fijas</span>
              <Phone className="w-4 h-4 text-[#83C408]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {callCount}
              </span>
              <span className="text-[11px] text-stone-500">{CLINIC_CONTACT.phone}</span>
            </div>
          </div>
        </div>

        {/* TOOLBAR: Filter Tabs, Search & Simulate Test Action */}
        <div className="bg-[#0d1a11] border border-emerald-950 rounded-2xl p-4 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#060e09] rounded-xl border border-emerald-950">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#122418] text-[#83C408] font-bold shadow-xs'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Todos ({leads.length})
              </button>
              <button
                onClick={() => setActiveTab('sin_ver')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'sin_ver'
                    ? 'bg-red-950 text-red-300 font-bold shadow-xs'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${unseenCount > 0 ? 'bg-red-500' : 'bg-stone-500'}`} />
                <span>Sin Ver ({unseenCount})</span>
              </button>
              <button
                onClick={() => setActiveTab('visto')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'visto'
                    ? 'bg-[#122418] text-white font-bold shadow-xs'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Vistos ({seenCount})
              </button>
              <button
                onClick={() => setActiveTab('whatsapp')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                  activeTab === 'whatsapp'
                    ? 'bg-emerald-950 text-[#83C408] font-bold shadow-xs'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp ({whatsappCount})</span>
              </button>
              <button
                onClick={() => setActiveTab('call')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                  activeTab === 'call'
                    ? 'bg-emerald-950 text-[#83C408] font-bold shadow-xs'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Llamadas ({callCount})</span>
              </button>
            </div>

            {/* Test Simulation Buttons (Useful for the owner to test the illuminated alert feature immediately) */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-stone-500 hidden sm:inline">Probar alerta:</span>
              <button
                onClick={() => handleSimulateLead('whatsapp')}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#23A455]/20 hover:bg-[#23A455]/30 text-[#83C408] border border-[#23A455]/40 flex items-center gap-1.5 cursor-pointer"
                title="Genera un clic simulado a WhatsApp para comprobar cómo se ilumina el aviso de la dueña"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ Simular WhatsApp</span>
              </button>

              <button
                onClick={() => handleSimulateLead('call')}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 flex items-center gap-1.5 cursor-pointer"
                title="Genera una llamada simulada para comprobar el registro"
              >
                <Phone className="w-3.5 h-3.5 text-[#83C408]" />
                <span>+ Simular Llamada</span>
              </button>
            </div>

          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por tratamiento, fecha, origen o notas privadas..."
              className="w-full pl-10 pr-4 py-2 bg-[#060e09] border border-emerald-950 rounded-xl text-white placeholder-stone-600 text-xs focus:outline-none focus:ring-1 focus:ring-[#83C408]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-white"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* LEADS LIST */}
        <div className="space-y-3">
          {filteredLeads.length === 0 ? (
            <div className="bg-[#0d1a11] border border-emerald-950 rounded-2xl p-12 text-center">
              <CheckCircle2 className="w-10 h-10 text-[#83C408] mx-auto mb-3 opacity-60" />
              <h3 className="text-sm font-bold text-white">No hay contactos con este criterio</h3>
              <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
                No se encontraron contactos en esta pestaña o búsqueda. Prueba a cambiar el filtro o pulsa en "Simular WhatsApp" para añadir uno de prueba.
              </p>
            </div>
          ) : (
            filteredLeads.map((lead) => {
              const isUnseen = lead.status === 'sin_ver';
              const isEditingNote = editingNotesId === lead.id;

              return (
                <div
                  key={lead.id}
                  className={`rounded-2xl border transition-all p-4 sm:p-5 ${
                    isUnseen
                      ? 'bg-[#150a0a] border-red-500/70 shadow-[0_0_15px_rgba(239,68,68,0.15)] ring-1 ring-red-500/30'
                      : 'bg-[#0d1a11] border-emerald-950/80 hover:border-emerald-900/60'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    
                    {/* Left: Lead details */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Channel Badge */}
                        {lead.type === 'whatsapp' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-[#23A455] text-white shadow-xs">
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-stone-800 text-[#83C408] border border-emerald-900/40">
                            <Phone className="w-3.5 h-3.5" />
                            <span>Llamada Fija</span>
                          </span>
                        )}

                        {/* Status Badge */}
                        {isUnseen ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-extrabold bg-red-600 text-white animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-yellow-300" />
                            <span>SIN VER (Nuevo)</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-950/80 text-[#83C408] border border-emerald-900/50">
                            <Check className="w-3 h-3 text-[#83C408]" />
                            <span>Visto {lead.seenAt ? `(${lead.seenAt})` : ''}</span>
                          </span>
                        )}

                        {/* Target phone */}
                        <span className="text-xs text-stone-400 font-mono">
                          {lead.phoneTarget}
                        </span>
                      </div>

                      {/* Treatment and origin */}
                      <div>
                        <h4 className="text-sm sm:text-base font-extrabold text-white">
                          {lead.treatment}
                        </h4>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400 mt-0.5">
                          <span className="flex items-center gap-1 text-stone-300">
                            <Calendar className="w-3 h-3 text-[#83C408]" />
                            {lead.formattedDate} a las {lead.formattedTime}
                          </span>
                          <span>•</span>
                          <span>Origen: <strong className="text-stone-300">{lead.sourcePage}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-stone-800">
                      
                      {/* Mark as seen / unseen button */}
                      <button
                        onClick={() => handleToggleLeadStatus(lead)}
                        className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                          isUnseen
                            ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-md'
                            : 'bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-800'
                        }`}
                        title={isUnseen ? 'Marcar como visto para apagar el aviso' : 'Volver a marcar como sin ver'}
                      >
                        {isUnseen ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-yellow-300" />
                            <span>Marcar como Visto</span>
                          </>
                        ) : (
                          <>
                            <span>Marcar como Sin Ver</span>
                          </>
                        )}
                      </button>

                      {/* Add/Edit Notes button */}
                      <button
                        onClick={() => {
                          if (isEditingNote) {
                            setEditingNotesId(null);
                          } else {
                            setEditingNotesId(lead.id);
                            setNoteDraft(lead.notes || '');
                          }
                        }}
                        className="px-3 py-2 text-xs font-medium rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 flex items-center gap-1.5 cursor-pointer"
                        title="Añadir notas internas de la paciente o cita"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#83C408]" />
                        <span>{lead.notes ? 'Editar Nota' : '+ Nota'}</span>
                      </button>

                      {/* Delete Lead */}
                      <button
                        onClick={() => {
                          if (window.confirm('¿Eliminar este registro del CRM?')) {
                            deleteCrmLead(lead.id);
                          }
                        }}
                        className="p-2 text-stone-500 hover:text-rose-400 hover:bg-stone-900 rounded-xl transition-colors cursor-pointer"
                        title="Eliminar registro"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>

                  </div>

                  {/* Notes Display & Editor */}
                  {isEditingNote ? (
                    <div className="mt-4 pt-3 border-t border-stone-800/80 space-y-2">
                      <label className="text-[11px] font-semibold text-[#83C408] block">
                        Notas privadas de la clínica sobre este contacto:
                      </label>
                      <textarea
                        value={noteDraft}
                        onChange={(e) => setNoteDraft(e.target.value)}
                        placeholder="Ejemplo: Paciente preguntó por precio de Invisalign. Cita agendada para el jueves a las 11:30h con Dra. Ruby."
                        rows={2}
                        className="w-full p-2.5 bg-[#060e09] border border-emerald-950 rounded-xl text-white text-xs placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-[#83C408]"
                        autoFocus
                      />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSaveNote(lead.id)}
                          className="px-3.5 py-1.5 bg-[#23A455] hover:bg-[#1e8d49] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Guardar Nota</span>
                        </button>
                        <button
                          onClick={() => setEditingNotesId(null)}
                          className="px-3 py-1.5 bg-stone-900 text-stone-400 hover:text-white text-xs rounded-lg cursor-pointer"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : lead.notes ? (
                    <div className="mt-3 pt-3 border-t border-stone-800/60 flex items-start justify-between gap-3 text-xs">
                      <div className="bg-[#060e09]/70 rounded-xl p-2.5 border border-emerald-950/60 flex-1">
                        <span className="text-[10px] font-bold text-[#83C408] uppercase tracking-wider block mb-0.5">
                          Nota de la Clínica:
                        </span>
                        <p className="text-stone-300 italic">{lead.notes}</p>
                      </div>
                      {savedNoteNotification === lead.id && (
                        <span className="text-[11px] text-[#83C408] font-bold self-center animate-in fade-in">
                          ¡Nota guardada!
                        </span>
                      )}
                    </div>
                  ) : null}

                </div>
              );
            })
          )}
        </div>

        {/* FOOTER INFO */}
        <div className="pt-8 border-t border-emerald-950 text-center text-xs text-stone-500">
          <p>
            Clínica Dental SET · Carrer Doctor Trueta 213, Poblenou, Barcelona · Panel Privado de Dirección
          </p>
          <p className="mt-1 text-[11px]">
            La información se almacena localmente de forma segura en tu navegador y persiste entre sesiones.
          </p>
        </div>

      </div>
    </div>
  );
};
