import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Search, X } from 'lucide-react'

/**
 * DiseaseSearchPanel
 * ─────────────────────────────────────────────────────────────
 * 2-column layout:
 *   LEFT  — "Find by Alphabet" A–Z circular buttons
 *   RIGHT — "Search Diseases" text input with debounce
 *
 * Features:
 *  • Alphabet click → lazy fetch, clears search input
 *  • Search typing  → debounced 300ms filter, clears active letter
 *  • Client-side Map cache — no repeated fetches
 *  • Skeleton loader while fetching
 *  • Fully responsive (mobile: search top, alphabet below)
 *  • theme="light" | "dark"
 */

// ─── Data ────────────────────────────────────────────────────
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const DISEASE_DATABASE = {
  A: ['Appendicitis','Arthritis','Asthma','Atrial Fibrillation','Anemia','Alzheimer\'s Disease','Angina','Aortic Stenosis','Autism Spectrum Disorder','Acute Kidney Injury'],
  B: ['Back Pain (Chronic)','Brain Tumor','Breast Cancer','Bronchitis','Bulging Disc','Burns','Bursitis','Blood Pressure (High)','Bone Fractures','Bladder Cancer'],
  C: ['Cancer (General)','Cardiac Arrest','Carpal Tunnel','Cataracts','Celiac Disease','Cervical Cancer','Chronic Fatigue','COPD','Colorectal Cancer','Coronary Artery Disease'],
  D: ['Dengue Fever','Depression','Diabetes Type 1','Diabetes Type 2','Dialysis','Disc Herniation','DVT (Deep Vein Thrombosis)','Dyslipidemia','Dysphagia','Dementia'],
  E: ['Eczema','Endometriosis','Epilepsy','Esophageal Cancer','Eye Disorders','Ear Infections','Emphysema','Endocarditis','Erectile Dysfunction','Eating Disorders'],
  F: ['Fatty Liver Disease','Fibromyalgia','Fractures','Frozen Shoulder','Fungal Infections','Fever (Typhoid)','Foot Drop','Fistula','Fibroids (Uterine)','Flu (Influenza)'],
  G: ['Gallstones','Gastritis','GERD','Glaucoma','Gout','Guillain-Barré Syndrome','Gynecological Cancers','Gangrene','Gastroenteritis','Growth Disorders'],
  H: ['Heart Attack','Heart Failure','Hepatitis A/B/C','Hernia','Hip Replacement','Hypertension','Hyperthyroidism','Hypothyroidism','HIV/AIDS','Hydrocephalus'],
  I: ['Infertility','Inflammatory Bowel Disease','Insomnia','Interstitial Lung Disease','IVF Complications','Irritable Bowel Syndrome','Ischemic Stroke','Immune Disorders','Infections (Bacterial)','Intestinal Obstruction'],
  J: ['Jaundice','Joint Replacement','Joint Infections','Juvenile Arthritis','Jaw Disorders (TMJ)'],
  K: ['Kidney Cancer','Kidney Failure','Kidney Stones','Knee Replacement','Kyphosis'],
  L: ['Leukemia','Liver Cancer','Liver Cirrhosis','Lung Cancer','Lupus','Lymphoma','Ligament Tears','Low Back Pain','Laryngeal Cancer','Leg Ulcers'],
  M: ['Malaria','Meningitis','Migraine','Multiple Sclerosis','Myocardial Infarction','Menopause Disorders','Metabolic Syndrome','Muscular Dystrophy','Macular Degeneration','Mental Health Disorders'],
  N: ['Neonatal Disorders','Nephritis','Nerve Damage','Neurological Disorders','Non-Hodgkin Lymphoma','Neuropathy','Nasal Polyps','Neck Pain','Nutritional Deficiencies','Narcolepsy'],
  O: ['Obesity','Osteoarthritis','Osteoporosis','Ovarian Cancer','Ovarian Cysts','Oral Cancer','Orthopedic Injuries','Obstructive Sleep Apnea','Organ Failure','Otitis Media'],
  P: ['Pancreatitis','Parkinson\'s Disease','PCOS','Peptic Ulcer','Peripheral Artery Disease','Pneumonia','Prostate Cancer','Psoriasis','Pulmonary Embolism','Pelvic Inflammatory Disease'],
  Q: ['Quadriplegia','Q Fever'],
  R: ['Renal Failure','Rheumatoid Arthritis','Rotator Cuff Tear','Retinal Detachment','Respiratory Failure','Rectal Cancer','Rhabdomyolysis','Rickets'],
  S: ['Sepsis','Sickle Cell Disease','Sinusitis','Skin Cancer','Spinal Cord Injury','Spine Disorders','Stroke','Stomach Cancer','Stress Disorders','Sleep Disorders'],
  T: ['Thyroid Cancer','Thyroid Disorders','Tonsillitis','Trauma Injuries','Tuberculosis','Tumors (Brain)','Type 2 Diabetes','Tendinitis','Testicular Cancer','Thalassemia'],
  U: ['Ulcerative Colitis','Urinary Incontinence','Urinary Tract Infection','Uterine Cancer','Uterine Fibroids','Urological Disorders'],
  V: ['Varicose Veins','Vascular Disorders','Vertigo','Viral Hepatitis','Vision Loss','Vitamin Deficiencies','Vocal Cord Disorders'],
  W: ['Weight Disorders','Wound Infections','Wrist Fractures','Wilson\'s Disease'],
  X: ['Xeroderma','X-linked Disorders'],
  Y: ['Yellow Fever'],
  Z: ['Zika Virus','Zinc Deficiency'],
}

// All diseases flat list for search
const ALL_DISEASES = Object.values(DISEASE_DATABASE).flat()

// Simulated async fetch by letter — swap for real API
async function fetchByLetter(letter) {
  await new Promise(r => setTimeout(r, 280))
  return DISEASE_DATABASE[letter] || []
}

// Simulated async search — swap for real API
async function fetchByQuery(query) {
  await new Promise(r => setTimeout(r, 200))
  const q = query.toLowerCase().trim()
  return ALL_DISEASES.filter(d => d.toLowerCase().includes(q))
}

// ─── Skeleton ────────────────────────────────────────────────
function Skeleton({ isDark }) {
  const widths = [120, 90, 150, 110, 80, 140, 100, 130]
  return (
    <div className="flex flex-wrap gap-2.5 mt-2">
      {widths.map((w, i) => (
        <div
          key={i}
          className={`h-8 rounded-full animate-pulse ${isDark ? 'bg-white/10' : 'bg-[#C2185B]/10'}`}
          style={{ width: w }}
        />
      ))}
    </div>
  )
}

// ─── Disease pill ─────────────────────────────────────────────
function DiseasePill({ name, isDark, index }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.018, duration: 0.2 }}
      className={`
        disease-pill
        inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-medium
        border transition-all duration-200 cursor-default select-none
        ${isDark
          ? 'bg-white/5 border-white/10 text-white/80 hover:bg-[#C2185B]/15 hover:border-[#C2185B]/40 hover:text-[#C2185B]'
          : 'bg-[#FCE4EC] border-[#F8BBD0] text-[#1A1A1A] hover:bg-[#C2185B] hover:border-[#C2185B] hover:text-white'
        }
      `}
    >
      {name}
    </motion.span>
  )
}

// ─── Main component ───────────────────────────────────────────
export function AlphabetDiseaseSearch({ theme = 'light' }) {
  const isDark = theme === 'dark'

  // State
  const [activeLetter, setActiveLetter]   = useState(null)
  const [searchQuery,  setSearchQuery]    = useState('')
  const [diseases,     setDiseases]       = useState([])
  const [loading,      setLoading]        = useState(false)
  const [error,        setError]          = useState(null)
  const [mode,         setMode]           = useState(null) // 'alpha' | 'search' | null

  // Refs
  const letterCacheRef = useRef(new Map())
  const searchCacheRef = useRef(new Map())
  const letterDebounce = useRef(null)
  const searchDebounce = useRef(null)
  const pendingRef     = useRef(null)
  const inputRef       = useRef(null)

  // ── Cleanup ──
  useEffect(() => () => {
    clearTimeout(letterDebounce.current)
    clearTimeout(searchDebounce.current)
  }, [])

  // ── Shared result setter ──
  const setResults = useCallback((data) => {
    setDiseases(data)
    setLoading(false)
    setError(null)
  }, [])

  // ── Letter click ──
  const handleLetterClick = useCallback((letter) => {
    clearTimeout(letterDebounce.current)
    clearTimeout(searchDebounce.current)

    letterDebounce.current = setTimeout(async () => {
      if (pendingRef.current === `alpha:${letter}`) return

      setActiveLetter(letter)
      setSearchQuery('')
      setMode('alpha')
      setError(null)

      if (letterCacheRef.current.has(letter)) {
        setResults(letterCacheRef.current.get(letter))
        return
      }

      pendingRef.current = `alpha:${letter}`
      setLoading(true)
      setDiseases([])

      try {
        const data = await fetchByLetter(letter)
        letterCacheRef.current.set(letter, data)
        if (pendingRef.current === `alpha:${letter}`) setResults(data)
      } catch {
        if (pendingRef.current === `alpha:${letter}`) {
          setError('Failed to load. Please try again.')
          setLoading(false)
        }
      }
    }, 100)
  }, [setResults])

  // ── Search input ──
  const handleSearchChange = useCallback((e) => {
    const val = e.target.value
    setSearchQuery(val)
    clearTimeout(searchDebounce.current)
    clearTimeout(letterDebounce.current)

    if (!val.trim()) {
      setActiveLetter(null)
      setDiseases([])
      setMode(null)
      setLoading(false)
      pendingRef.current = null
      return
    }

    setActiveLetter(null)
    setMode('search')
    setError(null)

    searchDebounce.current = setTimeout(async () => {
      const key = val.trim().toLowerCase()
      if (pendingRef.current === `search:${key}`) return

      if (searchCacheRef.current.has(key)) {
        setResults(searchCacheRef.current.get(key))
        return
      }

      pendingRef.current = `search:${key}`
      setLoading(true)
      setDiseases([])

      try {
        const data = await fetchByQuery(val)
        searchCacheRef.current.set(key, data)
        if (pendingRef.current === `search:${key}`) setResults(data)
      } catch {
        if (pendingRef.current === `search:${key}`) {
          setError('Search failed. Please try again.')
          setLoading(false)
        }
      }
    }, 300)
  }, [setResults])

  // ── Clear all ──
  const handleClear = useCallback(() => {
    clearTimeout(letterDebounce.current)
    clearTimeout(searchDebounce.current)
    setActiveLetter(null)
    setSearchQuery('')
    setDiseases([])
    setMode(null)
    setLoading(false)
    setError(null)
    pendingRef.current = null
    inputRef.current?.focus()
  }, [])

  // ── Derived ──
  const hasResults  = diseases.length > 0
  const showResults = mode !== null
  const resultLabel = mode === 'alpha'
    ? `${diseases.length} condition${diseases.length !== 1 ? 's' : ''} under "${activeLetter}"`
    : `${diseases.length} result${diseases.length !== 1 ? 's' : ''} for "${searchQuery}"`

  // ── Style tokens ──
  const T = {
    section:    isDark ? 'bg-white/[0.03] border border-white/8' : 'bg-white border border-[#F8BBD0]',
    divider:    isDark ? 'border-white/10' : 'border-[#F8BBD0]',
    title:      'text-[#C2185B]',
    subtitle:   isDark ? 'text-white/45' : 'text-[#4A4A4A]',
    inputWrap:  isDark
      ? 'bg-white/5 border border-white/12 focus-within:border-[#C2185B]/60'
      : 'bg-[#FDF6F9] border border-[#F8BBD0] focus-within:border-[#C2185B]',
    input:      isDark
      ? 'bg-transparent text-white placeholder:text-white/30'
      : 'bg-transparent text-[#1A1A1A] placeholder:text-[#9E7B87]',
    resultBar:  isDark ? 'text-white/40' : 'text-[#9E7B87]',
    emptyText:  isDark ? 'text-white/35' : 'text-[#9E7B87]',
  }

  return (
    <div className="w-full">
      {/* ── 2-column grid ── */}
      <div className={`disease-search-panel rounded-2xl overflow-hidden ${T.section}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* ════════════════════════════════════════
              LEFT — Alphabet filter
          ════════════════════════════════════════ */}
          <div className={`p-6 md:p-8 lg:order-1 order-2 ${isDark ? 'border-t lg:border-t-0 lg:border-r border-white/8' : 'border-t lg:border-t-0 lg:border-r border-[#F8BBD0]'}`}>

            {/* Header */}
            <div className="mb-5">
              <h3 className={`font-headline text-lg font-extrabold tracking-tight ${T.title}`}>
                Find by Alphabet
              </h3>
              <p className={`text-xs mt-1 ${T.subtitle}`}>
                Click a letter to browse conditions
              </p>
            </div>

            {/* A–Z grid — 6 cols mobile → 7 tablet → 9 desktop */}
            <div className="alpha-grid grid grid-cols-6 sm:grid-cols-7 lg:grid-cols-9 gap-1.5">
              {ALPHABET.map(letter => {
                const isActive = activeLetter === letter
                return (
                  <button
                    key={letter}
                    onClick={() => handleLetterClick(letter)}
                    aria-pressed={isActive}
                    aria-label={`Diseases starting with ${letter}`}
                    className={`
                      alpha-btn
                      w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10
                      rounded-full text-[11px] sm:text-[12px] lg:text-[13px] font-semibold
                      transition-all duration-150 flex items-center justify-center mx-auto
                      focus:outline-none focus:ring-2 focus:ring-[#C2185B]/40 focus:ring-offset-1
                      ${isActive
                        ? 'bg-[#C2185B] text-white shadow-[0_2px_10px_rgba(194,24,91,0.35)] scale-105'
                        : isDark
                          ? 'bg-white/5 text-white/50 border border-white/10 hover:bg-[#C2185B] hover:text-white hover:border-[#C2185B] hover:scale-105'
                          : 'bg-white text-[#C2185B] border border-[#F8BBD0] hover:bg-[#C2185B] hover:text-white hover:border-[#C2185B] hover:scale-105'
                      }
                    `}
                  >
                    {letter}
                  </button>
                )
              })}
            </div>
          </div>

          {/* ════════════════════════════════════════
              RIGHT — Search input
          ════════════════════════════════════════ */}
          <div className="p-6 md:p-8 lg:order-2 order-1 flex flex-col">

            {/* Header */}
            <div className="mb-5">
              <h3 className={`font-headline text-lg font-extrabold tracking-tight ${T.title}`}>
                Search Diseases &amp; Conditions
              </h3>
              <p className={`text-xs mt-1 ${T.subtitle}`}>
                Type to instantly find any condition we treat
              </p>
            </div>

            {/* Search input */}
            <div className={`search-input-wrap relative flex items-center rounded-xl transition-all duration-200 ${T.inputWrap}`}>
              <Search
                size={17}
                className={`absolute left-4 flex-shrink-0 pointer-events-none ${isDark ? 'text-white/30' : 'text-[#C2185B]/50'}`}
              />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search diseases..."
                aria-label="Search diseases and conditions"
                className={`w-full h-12 pl-11 pr-20 text-sm font-medium rounded-xl outline-none ${T.input}`}
              />
              {/* Clear button */}
              {searchQuery && (
                <button
                  onClick={handleClear}
                  aria-label="Clear search"
                  className={`absolute right-14 p-1 rounded-full transition-colors ${isDark ? 'text-white/30 hover:text-white/70' : 'text-[#9E7B87] hover:text-[#C2185B]'}`}
                >
                  <X size={14} />
                </button>
              )}
              {/* Search button */}
              <button
                aria-label="Submit search"
                className="absolute right-2 h-8 w-10 rounded-lg bg-[#C2185B] flex items-center justify-center text-white hover:bg-[#0F4C5C] transition-colors duration-200 shadow-sm"
              >
                {loading && mode === 'search'
                  ? <Loader2 size={14} className="animate-spin" />
                  : <Search size={14} />
                }
              </button>
            </div>

            {/* Hint text */}
            <p className={`text-[11px] mt-2.5 ${T.subtitle}`}>
              Results update as you type — no need to press enter
            </p>

            {/* ── Results panel ── */}
            <div className="mt-5 flex-1 min-h-[120px]">
              <AnimatePresence mode="wait">

                {/* Loading skeleton */}
                {loading && (
                  <motion.div
                    key="skeleton"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className={`flex items-center gap-2 mb-3 ${T.resultBar}`}>
                      <Loader2 size={13} className="animate-spin text-[#C2185B]" />
                      <span className="text-xs">Loading conditions…</span>
                    </div>
                    <Skeleton isDark={isDark} />
                  </motion.div>
                )}

                {/* Error */}
                {!loading && error && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-red-400"
                  >
                    {error}
                  </motion.p>
                )}

                {/* Results */}
                {!loading && !error && showResults && hasResults && (
                  <motion.div
                    key={`results-${activeLetter || searchQuery}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Result count bar */}
                    <div className={`flex items-center justify-between mb-3 pb-2.5 border-b ${T.divider}`}>
                      <span className={`text-xs font-semibold ${T.resultBar}`}>{resultLabel}</span>
                      <button
                        onClick={handleClear}
                        className={`text-[11px] font-bold hover:text-[#C2185B] transition-colors ${T.resultBar}`}
                      >
                        Clear
                      </button>
                    </div>

                    {/* Pills */}
                    <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
                      {diseases.map((name, i) => (
                        <DiseasePill key={name} name={name} isDark={isDark} index={i} />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Empty state */}
                {!loading && !error && showResults && !hasResults && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-8 gap-2"
                  >
                    <span className="text-2xl">🔍</span>
                    <p className={`text-sm font-medium ${T.emptyText}`}>
                      No conditions found
                      {mode === 'alpha' ? ` under "${activeLetter}"` : ` for "${searchQuery}"`}
                    </p>
                  </motion.div>
                )}

                {/* Idle prompt */}
                {!loading && !error && !showResults && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-8 gap-2 text-center"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${isDark ? 'bg-white/5' : 'bg-[#FCE4EC]'}`}>
                      <Search size={18} className="text-[#C2185B]" />
                    </div>
                    <p className={`text-sm font-medium ${T.emptyText}`}>
                      Select a letter or type to search
                    </p>
                    <p className={`text-xs ${T.subtitle}`}>
                      Browse 200+ conditions we treat
                    </p>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
