/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Private Password-Protected CRM Page for Clinic Owner (/crm)
 * Tracks WhatsApp & Call click conversions, timestamps, treatments, origin pages, and seen/unseen statuses.
 */

import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  Key,
  ShieldAlert,
  MessageCircle,
  Phone,
  CheckCircle2,
  Calendar,
  Search,
  Download,
  PlusCircle,
  Eye,
  EyeOff,
  ArrowLeft,
  Trash2,
  FileText,
  Save,
  Check,
  AlertTriangle,
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
  setStoredPassword,
  getUnseenLeadsCount,
} from '../utils/crmTracker';
import { CLINIC_CONTACT, SPECIALTIES } from '../data/clinicData';

interface OwnerCrmPageProps {
  onBackToWeb: () => void;
}

export const OwnerCrmPage: React.FC<OwnerCrmPageProps> = ({ onBackToWeb }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [leads, setLeads] = useState<CrmLead[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'sin_ver' | 'visto' | 'whatsapp' | 'call'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState<string>('');
  const [savedNoteNotification, setSavedNoteNotification] = useState<string | null>(null);

  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [settingsSuccess, setSettingsSuccess] = useState<string>('');

  useEffect(() => {
    setIsAuthenticated(isCrmAuthenticated());
  }, []);

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

  const handleLogout = () => {
    setCrmAuthenticated(false);
    setIsAuthenticated(false);
  };

  const handleToggleLeadStatus = (lead: CrmLead) => {
    if (lead.status === 'sin_ver') {
      markLeadAsSeen(lead.id);
    } else {
      markLeadAsUnseen(lead.id);
    }
  };

  const handleSaveNote = (id: string) => {
    updateLeadNotes(id, noteDraft);
    setEditingNotesId(null);
    setSavedNoteNotification(id);
    setTimeout(() => setSavedNoteNotification(null), 2500);
  };

  const handleSimulateLead = (type: 'whatsapp' | 'call') => {
    const specialtyTitles = SPECIALTIES.map((s) => s.title.es);
    const randomTreatment =
      specialtyTitles[Math.floor(Math.random() * specialtyTitles.length)] || 'Consulta General';

    trackCrmLead({
      type,
      treatment: randomTreatment,
      sourcePage: `Prueba CRM (${type === 'whatsapp' ? 'WhatsApp' : 'Llamada'})`,
      sourceUrl: '/',
      phoneTarget: type === 'whatsapp' ? CLINIC_CONTACT.whatsapp : CLINIC_CONTACT.phone,
    });
  };

  const handleExportCsv = () => {
    const headers = [
      'ID',
      'Fecha',
      'Hora',
      'Canal',
      'Telefono_Destino',
      'Tratamiento_Especialidad',
      'Pagina_Origen',
      'URL_Origen',
      'Estado',
      'Revisado_El',
      'Notas',
    ];
    const rows = leads.map((l) => [
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
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_clinica_set_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
  const whatsappCount = leads.filter((l) => l.type === 'whatsapp').length;
  const callCount = leads.filter((l) => l.type === 'call').length;

  const filteredLeads = leads.filter((lead) => {
    if (activeTab === 'sin_ver' && lead.status !== 'sin_ver') return false;
    if (activeTab === 'visto' && lead.status !== 'visto') return false;
    if (activeTab === 'whatsapp' && lead.type !== 'whatsapp') return false;
    if (activeTab === 'call' && lead.type !== 'call') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        lead.treatment.toLowerCase().includes(q) ||
        lead.formattedDate.toLowerCase().includes(q) ||
        lead.sourcePage.toLowerCase().includes(q) ||
        (lead.notes || '').toLowerCase().includes(q)
      );
    }

    return true;
  });

  // SCREEN 1: PASSWORD AUTHENTICATION GATE
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#080C0A] flex flex-col items-center justify-center p-4 text-[#F2F7F0]">
        <div className="w-full max-w-md bg-[#101914] border border-[#1F3125] rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img
                src="/assets/logo-blanc.png"
                alt="Clínica Dental SET"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#83C408] uppercase tracking-wider mb-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Acceso Exclusivo Dirección</span>
            </div>
            <h1 className="text-2xl text-[#F5FAF3]">
              Panel CRM y Registro de Contactos
            </h1>
            <p className="text-xs text-[#B9CEBE] mt-1.5 leading-relaxed">
              Acceso privado protegido por contraseña para consultar los clics a WhatsApp y teléfono realizados desde la web.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="crm-password-input"
                className="block text-xs font-bold text-[#F5FAF3] mb-1.5"
              >
                Contraseña de Acceso:
              </label>
              <div className="relative">
                <input
                  id="crm-password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setPasswordError('');
                  }}
                  placeholder="Introduce la contraseña"
                  className="w-full px-4 py-3 bg-[#080C0A] border border-[#2A4232] rounded-xl text-[#F5FAF3] placeholder-[#7B9480] focus:outline-none focus:ring-2 focus:ring-[#83C408] text-sm pr-11"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#83C408] hover:text-[#95DB0B] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {passwordError && (
                <p className="text-xs text-rose-400 mt-2 flex items-center gap-1.5 font-medium">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{passwordError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-[#83C408] hover:bg-[#95DB0B] text-[#071408] font-extrabold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Key className="w-4 h-4" />
              <span>Entrar al Panel Privado</span>
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#1D2D22] text-center">
            <div className="p-3 bg-[#0B110E] rounded-xl border border-[#1F3125] text-[11px] text-[#B9CEBE]">
              <span className="font-bold text-[#83C408]">Clave inicial de demostración: </span>
              <code className="bg-black px-2 py-0.5 rounded border border-[#1F3125] text-[#F5FAF3] font-mono font-bold">
                set2026
              </code>
              <p className="mt-1 text-[10px] text-[#9AB39E]">
                (Modificable desde Seguridad una vez dentro del panel)
              </p>
            </div>

            <button
              type="button"
              onClick={onBackToWeb}
              className="mt-4 text-xs font-bold text-[#83C408] hover:underline flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a la página web</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 2: AUTHENTICATED CRM DASHBOARD (Only visible after entering owner password)
  return (
    <div className="min-h-screen bg-[#080C0A] text-[#F2F7F0] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* TOP BAR */}
        <div className="bg-[#83C408] text-[#08120A] border border-[#6EA606] rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/assets/logo-blanc.png"
              alt="Clínica Dental SET"
              className="h-9 sm:h-10 w-auto object-contain brightness-0 contrast-125"
            />
            <div>
              <h1 className="text-lg sm:text-xl text-[#08120A]">
                CRM de Dirección · Clínica Dental SET
              </h1>
              <p className="text-xs font-medium text-[#08120A]/80">
                Registro privado de clics a WhatsApp y teléfono generados en la web
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className="px-3 py-2 text-xs font-bold rounded-xl bg-[#071408] hover:bg-[#112413] text-[#83C408] border border-[#071408] flex items-center gap-1.5 cursor-pointer"
            >
              <Key className="w-3.5 h-3.5 text-[#83C408]" />
              <span>Seguridad</span>
            </button>

            <button
              type="button"
              onClick={handleExportCsv}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-[#071408] hover:bg-[#112413] text-[#83C408] border border-[#071408] flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#83C408]" />
              <span>Exportar CSV</span>
            </button>

            <button
              type="button"
              onClick={onBackToWeb}
              className="px-3.5 py-2 text-xs font-extrabold rounded-xl bg-[#071408] hover:bg-[#112413] text-[#83C408] flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#83C408]" />
              <span>Volver a la Web</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-2 text-xs font-bold rounded-xl bg-[#071408] hover:bg-[#112413] text-[#83C408] cursor-pointer"
              title="Cerrar sesión"
              aria-label="Cerrar sesión"
            >
              <Unlock className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* SETTINGS PANEL */}
        {showSettings && (
          <div className="bg-[#101914] border border-[#1F3125] rounded-2xl p-5 shadow-xs">
            <h3 className="text-base text-[#F5FAF3] mb-1.5 flex items-center gap-2">
              <Key className="w-4 h-4 text-[#83C408]" />
              <span>Cambiar Contraseña de Dirección</span>
            </h3>
            <p className="text-xs text-[#B9CEBE] mb-4">
              Actualiza la contraseña privada para acceder al registro CRM.
            </p>
            <form onSubmit={handleChangePassword} className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="text"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nueva contraseña (mínimo 4 caracteres)"
                className="flex-1 px-3.5 py-2 bg-[#080C0A] border border-[#2A4232] rounded-xl text-[#F5FAF3] text-xs focus:outline-none focus:ring-1 focus:ring-[#83C408]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#83C408] text-[#071408] text-xs font-extrabold rounded-xl hover:bg-[#95DB0B] cursor-pointer"
              >
                Guardar Contraseña
              </button>
            </form>
            {settingsSuccess && (
              <p className="text-xs text-[#83C408] mt-2 font-bold">
                {settingsSuccess}
              </p>
            )}
          </div>
        )}

        {/* ILLUMINATED UNSEEN ALERT INSIDE PRIVATE CRM DASHBOARD */}
        {unseenCount > 0 ? (
          <div className="rounded-2xl p-5 bg-red-950/60 border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.25)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white">
                    Aviso: {unseenCount} {unseenCount === 1 ? 'contacto nuevo sin revisar' : 'contactos nuevos sin revisar'}
                  </h2>
                  <p className="text-xs text-rose-200 mt-0.5 leading-relaxed">
                    Este aviso permanece encendido mientras existan registros pendientes de marcar como vistos.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={markAllLeadsAsSeen}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Marcar todos como vistos</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl p-4 bg-[#101914] border border-[#1F3125] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#16241B] text-[#83C408] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#F5FAF3]">
                  Todos los contactos revisados · Sin avisos pendientes
                </h2>
                <p className="text-xs text-[#9AB39E]">
                  El estado del aviso se encuentra apagado.
                </p>
              </div>
            </div>

            <div className="text-xs text-[#9AB39E] font-mono tabular-nums">
              {leads.length} registros totales
            </div>
          </div>
        )}

        {/* 4-COLUMN SUMMARY METRICS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            className={`p-4 rounded-2xl border ${
              unseenCount > 0
                ? 'bg-red-950/35 border-red-500/60'
                : 'bg-[#101914] border-[#1F3125]'
            }`}
          >
            <span className="text-xs font-semibold text-[#9AB39E] block">Sin Ver (Pendientes)</span>
            <span
              className={`font-display text-2xl sm:text-3xl tabular-nums mt-1.5 block ${
                unseenCount > 0 ? 'text-rose-400' : 'text-[#F5FAF3]'
              }`}
            >
              {unseenCount}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#101914] border border-[#1F3125]">
            <span className="text-xs font-semibold text-[#9AB39E] block">Revisados / Vistos</span>
            <span className="font-display text-2xl sm:text-3xl text-[#83C408] tabular-nums mt-1.5 block">
              {seenCount}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#101914] border border-[#1F3125]">
            <span className="text-xs font-semibold text-[#9AB39E] block">Clics a WhatsApp</span>
            <span className="font-display text-2xl sm:text-3xl text-[#F5FAF3] tabular-nums mt-1.5 block">
              {whatsappCount}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#101914] border border-[#1F3125]">
            <span className="text-xs font-semibold text-[#9AB39E] block">Clics a Teléfono</span>
            <span className="font-display text-2xl sm:text-3xl text-[#F5FAF3] tabular-nums mt-1.5 block">
              {callCount}
            </span>
          </div>
        </div>

        {/* TOOLBAR: Filter Tabs, Search & Test Simulation */}
        <div className="bg-[#101914] border border-[#1F3125] rounded-2xl p-4 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#080C0A] rounded-xl border border-[#1F3125]">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#83C408] text-[#071408] font-extrabold'
                    : 'text-[#83C408] hover:bg-[#16231B]'
                }`}
              >
                Todos ({leads.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('sin_ver')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'sin_ver'
                    ? 'bg-red-600 text-white'
                    : 'text-[#83C408] hover:bg-[#16231B]'
                }`}
              >
                Sin Ver ({unseenCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('visto')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'visto'
                    ? 'bg-[#83C408] text-[#071408] font-extrabold'
                    : 'text-[#83C408] hover:bg-[#16231B]'
                }`}
              >
                Vistos ({seenCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('whatsapp')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'whatsapp'
                    ? 'bg-[#83C408] text-[#071408] font-extrabold'
                    : 'text-[#83C408] hover:bg-[#16231B]'
                }`}
              >
                WhatsApp ({whatsappCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('call')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'call'
                    ? 'bg-[#83C408] text-[#071408] font-extrabold'
                    : 'text-[#83C408] hover:bg-[#16231B]'
                }`}
              >
                Llamadas ({callCount})
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSimulateLead('whatsapp')}
                className="px-3 py-1.5 text-xs font-extrabold rounded-lg bg-[#83C408] hover:bg-[#95DB0B] text-[#071408] flex items-center gap-1.5 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ Simular WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => handleSimulateLead('call')}
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[#16231B] hover:bg-[#1D2E24] text-[#83C408] border border-[#83C408]/60 flex items-center gap-1.5 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+ Simular Llamada</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#83C408]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por tratamiento, fecha, página de origen o notas..."
              className="w-full pl-10 pr-4 py-2 bg-[#080C0A] border border-[#1F3125] rounded-xl text-[#F5FAF3] placeholder-[#7B9480] text-xs focus:outline-none focus:ring-1 focus:ring-[#83C408]"
            />
          </div>
        </div>

        {/* LEADS LIST */}
        <div className="space-y-3">
          {filteredLeads.length === 0 ? (
            <div className="bg-[#101914] border border-[#1F3125] rounded-2xl p-12 text-center">
              <CheckCircle2 className="w-10 h-10 text-[#83C408] mx-auto mb-3 opacity-60" />
              <h3 className="text-base text-[#F5FAF3]">No hay registros con este filtro</h3>
              <p className="text-xs text-[#9AB39E] mt-1 max-w-sm mx-auto">
                Cambia la pestaña de filtro o pulsa en «Simular WhatsApp» para comprobar el registro.
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
                      ? 'bg-red-950/25 border-red-500/70 shadow-xs'
                      : 'bg-[#101914] border-[#1F3125]'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-bold text-[#83C408] uppercase tracking-wider">
                          {lead.type === 'whatsapp' ? 'WhatsApp' : 'Llamada Telefónica'}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono text-[#E5F0E3] tabular-nums">
                          {lead.phoneTarget}
                        </span>
                        <span aria-hidden="true">·</span>
                        {isUnseen ? (
                          <span className="font-bold text-rose-400">
                            Pendiente (Sin Ver)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-semibold text-[#83C408]">
                            <Check className="w-3.5 h-3.5" />
                            <span>Visto {lead.seenAt ? `(${lead.seenAt})` : ''}</span>
                          </span>
                        )}
                      </div>

                      <h4 className="text-base text-[#F5FAF3]">
                        {lead.treatment}
                      </h4>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#9AB39E]">
                        <span className="flex items-center gap-1 tabular-nums">
                          <Calendar className="w-3.5 h-3.5 text-[#83C408]" />
                          {lead.formattedDate} · {lead.formattedTime}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>Origen: <strong className="text-[#F5FAF3]">{lead.sourcePage}</strong></span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#1D2D22]">
                      <button
                        type="button"
                        onClick={() => handleToggleLeadStatus(lead)}
                        className={`px-4 py-2 text-xs font-extrabold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer ${
                          isUnseen
                            ? 'bg-red-600 hover:bg-red-500 text-white'
                            : 'bg-[#83C408] hover:bg-[#95DB0B] text-[#071408]'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{isUnseen ? 'Marcar como Visto' : 'Marcar como Sin Ver'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (isEditingNote) {
                            setEditingNotesId(null);
                          } else {
                            setEditingNotesId(lead.id);
                            setNoteDraft(lead.notes || '');
                          }
                        }}
                        className="px-3 py-2 text-xs font-bold rounded-xl bg-[#16231B] hover:bg-[#1D2E24] text-[#83C408] border border-[#83C408]/60 flex items-center gap-1.5 cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#83C408]" />
                        <span>{lead.notes ? 'Editar Nota' : '+ Nota'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteCrmLead(lead.id)}
                        className="p-2 text-[#9AB39E] hover:text-rose-400 hover:bg-[#16231B] rounded-xl transition-colors cursor-pointer"
                        title="Eliminar registro"
                        aria-label="Eliminar registro"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {isEditingNote ? (
                    <div className="mt-4 pt-3 border-t border-[#1D2D22] space-y-2">
                      <label className="text-xs font-bold text-[#F5FAF3] block">
                        Notas privadas sobre este contacto:
                      </label>
                      <textarea
                        value={noteDraft}
                        onChange={(e) => setNoteDraft(e.target.value)}
                        placeholder="Escribe aquí notas internas de seguimiento o cita..."
                        rows={2}
                        className="w-full p-2.5 bg-[#080C0A] border border-[#2A4232] rounded-xl text-[#F5FAF3] text-xs focus:outline-none focus:ring-1 focus:ring-[#83C408]"
                        autoFocus
                      />
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleSaveNote(lead.id)}
                          className="px-3.5 py-1.5 bg-[#83C408] hover:bg-[#95DB0B] text-[#071408] text-xs font-extrabold rounded-lg flex items-center gap-1.5 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Guardar Nota</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingNotesId(null)}
                          className="px-3 py-1.5 bg-[#16231B] border border-[#83C408]/50 text-[#83C408] text-xs font-bold rounded-lg cursor-pointer"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : lead.notes ? (
                    <div className="mt-3 pt-3 border-t border-[#1D2D22] flex items-start justify-between gap-3 text-xs">
                      <div className="bg-[#080C0A] rounded-xl p-2.5 border border-[#1D2D22] flex-1">
                        <span className="text-[10px] font-bold text-[#83C408] uppercase tracking-wider block mb-0.5">
                          Nota de la Clínica:
                        </span>
                        <p className="text-[#B9CEBE]">{lead.notes}</p>
                      </div>
                      {savedNoteNotification === lead.id && (
                        <span className="text-xs text-[#83C408] font-bold self-center">
                          Nota guardada
                        </span>
                      )}
                    </div>
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
