/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  Zap, 
  BarChart3, 
  Database, 
  FileText,
  Users,
  Terminal,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

// Types
type ProjectType = 'Automatización' | 'Análisis' | 'Optimización';

interface Project {
  id: number;
  name: string;
  type: ProjectType;
  need: string;
  how: string;
  time: string;
  impact: string;
  icon: React.ReactNode;
  url?: string;
  imageUrl?: string;
}

// Data
const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Automatización de historias de usuario",
    type: "Automatización",
    need: "Necesidad de optimizar el tiempo invertido en la creación manual de historias de usuario y documentación funcional.",
    how: "Desarrollo de una solución apoyada en IA para generar historias, criterios de aceptación y casos de prueba, reduciendo tareas manuales de asignación.",
    time: "3 semanas",
    impact: "Ahorro significativo de tiempo y estandarización en la documentación funcional de la empresa.",
    icon: <FileText className="w-12 h-12 text-blue-600" />,
    url: "https://sdipapwbhiaprbs.azurewebsites.net/",
    imageUrl: "/src/historias.png"
  },
  {
    id: 2,
    name: "Analizador de hojas de vida (Open Day)",
    type: "Análisis",
    need: "Brindar retroalimentación inmediata a estudiantes próximos a prácticas durante el evento Open Day de Postobón.",
    how: "Página para RRHH donde los estudiantes cargan su CV y reciben retroalimentación automática generada por IA sobre su perfil.",
    time: "1 día",
    impact: "Mejor preparación para procesos de selección y una experiencia de usuario innovadora y útil para los estudiantes.",
    icon: <Users className="w-12 h-12 text-emerald-600" />,
    url: "https://santi-osp.github.io/OpenDayHojasDeVida/",
    imageUrl: "/src/openday.png"
  },
  {
    id: 3,
    name: "Eliminación de AS400 del cargue SDI",
    type: "Optimización",
    need: "Eliminar la fuente AS400 (en desuso) del cargue canónico, manteniendo únicamente SAP como fuente de información.",
    how: "Uso de Copilot para modificar Procedimientos Almacenados (SP), eliminando lógica obsoleta y reestructurando el proceso hacia SAP.",
    time: "2 días",
    impact: "En el ambiende de PRBS se redujo el tiempo de cargue de 30 a 15 minutos, duplicando la eficiencia del proceso operativo.",
    icon: <Database className="w-12 h-12 text-amber-600" />
  }
];

// Helper Components
const Badge = ({ type }: { type: ProjectType }) => {
  const colors = {
    'Automatización': 'bg-blue-100 text-blue-800 border-blue-200',
    'Análisis': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Optimización': 'bg-amber-100 text-amber-800 border-amber-200',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${colors[type]}`}>
      {type}
    </span>
  );
};

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 6;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const progress = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 overflow-hidden flex flex-col">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[30%] h-[30%] bg-slate-100 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-5xl"
          >
            {currentSlide === 0 && (
              <div className="text-center space-y-8" id="slide-cover">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="inline-flex p-3 bg-white rounded-2xl shadow-sm border border-slate-200 mb-4"
                >
                  <Cpu className="w-12 h-12 text-blue-600" />
                </motion.div>
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
                    Proyectos desarrollados con apoyo de <span className="text-blue-600">Copilot</span> e Inteligencia Artificial
                  </h1>
                  <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-3xl mx-auto">
                    Automatización, optimización de procesos y soluciones internas
                  </p>
                </div>
                <div className="pt-12">
                  <div className="flex items-center justify-center gap-3 text-slate-400 font-medium">
                    <span className="w-8 h-px bg-slate-200" />
                    <span>Postobón</span>
                    <span className="w-8 h-px bg-slate-200" />
                  </div>
                </div>
              </div>
            )}

            {currentSlide >= 1 && currentSlide <= 3 && (
              <div className="grid md:grid-cols-2 gap-12 items-center" id={`slide-project-${currentSlide}`}>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Badge type={PROJECTS[currentSlide - 1].type} />
                    <h2 className="text-4xl font-bold text-slate-900 leading-tight">
                      {PROJECTS[currentSlide - 1].name}
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-blue-600 mb-2 flex items-center gap-2">
                        <Terminal className="w-4 h-4" /> Necesidad
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-lg">
                        {PROJECTS[currentSlide - 1].need}
                      </p>
                    </section>

                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-blue-600 mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4" /> Solución con IA
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-lg">
                        {PROJECTS[currentSlide - 1].how}
                      </p>
                    </section>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="relative group">
                    <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-200/50 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        {PROJECTS[currentSlide - 1].icon}
                      </div>
                      
                      <div className="relative z-10 space-y-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                              <Clock className="w-3 h-3" /> Tiempo Empleado
                            </div>
                            <div className="text-4xl font-black">{PROJECTS[currentSlide - 1].time}</div>
                          </div>
                          {PROJECTS[currentSlide - 1].url && (
                            <a 
                              href={PROJECTS[currentSlide - 1].url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors flex items-center gap-2 text-xs font-bold"
                            >
                              Ver evidencia <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>

                        <div className="pt-4 border-t border-blue-500/50">
                          <div className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3" /> Impacto Generado
                          </div>
                          <p className="text-lg font-medium leading-tight">
                            {PROJECTS[currentSlide - 1].impact}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {PROJECTS[currentSlide - 1].imageUrl ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col"
                    >
                      {/* Browser Header */}
                      <div className="bg-slate-50 border-b border-slate-100 p-3 flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                        </div>
                        <div className="flex-grow bg-white border border-slate-200 rounded-md py-1 px-3 text-[10px] text-slate-400 truncate font-mono">
                          {PROJECTS[currentSlide - 1].url}
                        </div>
                      </div>
                      
                      {/* Actual Image Evidence */}
                      <div className="relative group/img overflow-hidden">
                        <img 
                          src={PROJECTS[currentSlide - 1].imageUrl} 
                          alt="Evidencia del proyecto" 
                          className="w-full h-auto object-cover transition-transform duration-700 group-hover/img:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover/img:translate-y-0 transition-transform bg-gradient-to-t from-slate-900/80 to-transparent flex justify-center">
                          <a 
                            href={PROJECTS[currentSlide - 1].url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-white text-slate-900 text-xs font-bold rounded-lg hover:bg-slate-100 transition-all flex items-center gap-2 shadow-lg"
                          >
                            Abrir Plataforma <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ) : PROJECTS[currentSlide - 1].url && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-64"
                    >
                      {/* Browser Header fallback when no image but url exists */}
                      <div className="bg-slate-50 border-b border-slate-100 p-3 flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                        </div>
                        <div className="flex-grow bg-white border border-slate-200 rounded-md py-1 px-3 text-[10px] text-slate-400 truncate font-mono">
                          {PROJECTS[currentSlide - 1].url}
                        </div>
                      </div>
                      
                      <div className="flex-grow flex flex-col items-center justify-center p-6 bg-slate-50/30 text-center space-y-4">
                        <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 text-blue-600">
                          {PROJECTS[currentSlide - 1].icon}
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-slate-900 text-sm">Plataforma en Producción</h4>
                          <p className="text-slate-500 text-xs max-w-[200px] mx-auto">La herramienta está lista para su uso en los servidores correspondientes.</p>
                        </div>
                        <a 
                          href={PROJECTS[currentSlide - 1].url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-all flex items-center gap-2"
                        >
                          Abrir Proyecto <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {currentSlide === 4 && (
              <div className="space-y-8" id="slide-comparison">
                <div className="text-center space-y-2">
                  <h2 className="text-4xl font-bold tracking-tight">Comparativo de Impacto</h2>
                  <p className="text-slate-500 text-lg">Resumen de eficiencia y resultados clave</p>
                </div>

                <div className="grid gap-4">
                  {PROJECTS.map((project, idx) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center gap-6"
                    >
                      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        {project.icon}
                      </div>
                      <div className="flex-grow space-y-1">
                        <h4 className="font-bold text-lg">{project.name}</h4>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-blue-500" /> {project.time}</span>
                          <span className="flex items-center gap-1"><Badge type={project.type} /></span>
                        </div>
                      </div>
                      <div className="md:w-1/3 text-slate-600 bg-slate-50 p-3 rounded-lg text-sm italic">
                        {project.impact}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {currentSlide === 5 && (
              <div className="max-w-3xl mx-auto text-center space-y-12" id="slide-conclusion">
                <div className="space-y-6">
                  <div className="inline-flex p-4 bg-emerald-100 rounded-full text-emerald-600 mb-2">
                    <BarChart3 className="w-8 h-8" />
                  </div>
                  <h2 className="text-5xl font-bold tracking-tight text-slate-900">Conclusiones e Impacto</h2>
                  <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full" />
                </div>
                
                <p className="text-2xl text-slate-600 leading-relaxed font-medium">
                  Estos proyectos muestran cómo el uso de <span className="text-blue-600 font-bold">Copilot</span> y IA permitió acelerar desarrollos, automatizar tareas repetitivas y generar impacto real en:
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Eficiencia", icon: <Zap className="w-5 h-5" /> },
                    { label: "Experiencia", icon: <Users className="w-5 h-5" /> },
                    { label: "Rendimiento", icon: <BarChart3 className="w-5 h-5" /> },
                    { label: "Estandarización", icon: <CheckCircle2 className="w-5 h-5" /> }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 + (i * 0.1) }}
                      className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center gap-2"
                    >
                      <div className="text-blue-600">{item.icon}</div>
                      <span className="font-bold text-sm text-slate-700">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Footer */}
      <footer className="p-6 bg-white border-t border-slate-200 relative z-20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Progress Indicator */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="text-sm font-bold text-slate-400 tabular-nums">
              {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
            </div>
            <div className="h-1.5 w-48 bg-slate-100 rounded-full overflow-hidden flex-grow md:flex-grow-0">
              <motion.div 
                className="h-full bg-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              id="btn-prev"
              className="p-3 rounded-full hover:bg-slate-100 transition-colors text-slate-600 disabled:opacity-30 border border-slate-200"
              disabled={currentSlide === 0}
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              id="btn-next"
              className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all shadow-lg active:scale-95 flex items-center gap-2"
              aria-label="Siguiente"
            >
              {currentSlide === totalSlides - 1 ? 'Reiniciar' : 'Siguiente'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
