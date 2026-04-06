import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, MapPin, Phone, PhoneCall, Calendar } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { branches } from '@/data/branches'

export function StickyNavbar({ currentBranch }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [branchDropOpen, setBranchDropOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setBranchDropOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdown on route change
  useEffect(() => {
    setBranchDropOpen(false)
    setMobileOpen(false)
  }, [location.pathname])

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Find Doctor', path: '/doctors' },
    { label: 'Specialties', path: '/specialties' },
    { label: 'Services', path: '/services' },
    { label: 'About', path: '/about' },
  ]

  const isActive = (path) =>
    path === '/'
      ? location.pathname === '/' || location.pathname.startsWith('/branches')
      : location.pathname.startsWith(path)

  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const unsubscribe = scrollY.onChange((currentY) => {
      if (currentY > lastScrollY.current && currentY > 150) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScrollY.current = currentY
    })
    return () => unsubscribe()
  }, [scrollY])

  const navHeight = useTransform(scrollY, [0, 50], ['120px', '88px'])
  const navBg = useTransform(scrollY, [0, 50], ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.9)'])
  const navShadow = useTransform(scrollY, [0, 50], [
    '0 0 0 rgba(0,0,0,0)',
    '0 10px 40px -10px rgba(0,52,97,0.12)'
  ])

  return (
    <motion.header 
      style={{ height: navHeight, backgroundColor: navBg, boxShadow: navShadow }}
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="sticky top-0 z-[100] border-b border-outline-variant/10 backdrop-blur-xl flex items-center w-full"
    >
      <div className="flex items-center justify-between max-w-[1440px] mx-auto w-full px-8 h-full">

        {/* 1. BRAND LOGO */}
        <Link to="/" className="relative group shrink-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentBranch?.slug || 'main'}
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                src={currentBranch?.branchLogo || "https://i.ibb.co/qF1tmZrW/convert-into-high-202604060154.jpg"}
                alt="Srikara Hospitals"
                className="w-[260px] h-auto object-contain mix-blend-multiply contrast-[1.1] brightness-[1.02]"
              />
            </AnimatePresence>
          </motion.div>
        </Link>

        {/* 2. CENTERED DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-1 relative h-full">
          {navLinks.map((link, idx) => {
            const elements = []
            
            // Add Home
            if (idx === 0) {
              elements.push(
                <Link
                  key={link.label}
                  to={link.path}
                  className={`relative px-4 py-2.5 rounded-full font-headline tracking-widest text-[13px] font-black uppercase transition-all duration-300 ${
                    isActive(link.path) ? 'text-[#8B1A4A]' : 'text-[#4A4A4A] hover:text-[#8B1A4A]'
                  }`}
                >
                  {isActive(link.path) && (
                    <motion.div layoutId="nav-bg" className="absolute inset-0 bg-[#8B1A4A]/5 rounded-full z-0" />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              )

              // Inject Branches Dropdown after Home
              elements.push(
                <div key="branches-wrapper" ref={dropdownRef} className="relative h-full flex items-center">
                  <button
                    onClick={() => setBranchDropOpen(prev => !prev)}
                    className={`relative flex items-center gap-1.5 px-4 py-2.5 rounded-full font-headline tracking-widest text-[13px] font-black uppercase transition-all duration-300 ${
                      branchDropOpen || isActive('/branches') ? 'text-[#8B1A4A]' : 'text-[#4A4A4A] hover:text-[#8B1A4A]'
                    }`}
                  >
                    {(isActive('/branches') || branchDropOpen) && (
                      <motion.div layoutId="nav-bg" className="absolute inset-0 bg-[#8B1A4A]/5 rounded-full z-0" />
                    )}
                    <span className="relative z-10">Branches</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 relative z-10 transition-transform duration-500 ${branchDropOpen ? 'rotate-180 text-[#8B1A4A]' : 'text-[#8B1A4A]/40'}`}
                    />
                  </button>

                  <AnimatePresence>
                    {branchDropOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[520px] bg-white rounded-2xl shadow-[0_24px_60px_rgba(0,52,97,0.15)] border border-outline-variant/20 overflow-hidden z-50"
                      >
                        <div className="px-6 py-4 bg-gradient-to-r from-[#8B1A4A] to-[#5E0F30] flex items-center justify-between">
                          <div>
                            <p className="text-white font-headline font-bold text-sm uppercase tracking-widest">Our Centers</p>
                            <p className="text-white/70 text-[10px] mt-0.5">{branches.length} locations across AP & Telangana</p>
                          </div>
                          <Link to="/branches" className="text-[10px] font-bold text-white/80 hover:text-white uppercase tracking-wider border border-white/30 px-3 py-1.5 rounded-full hover:border-white transition-colors">View All →</Link>
                        </div>

                        <div className="p-3 grid grid-cols-2 gap-1 max-h-[400px] overflow-y-auto">
                          {branches.map((branch) => (
                            <Link
                              key={branch.slug}
                              to={`/branches/${branch.slug}`}
                              className="group flex items-start gap-3 p-3 rounded-xl hover:bg-surface-container-low transition-all duration-200"
                            >
                              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#8B1A4A]/10 flex items-center justify-center mt-0.5 group-hover:bg-[#8B1A4A]/20 transition-colors">
                                <MapPin className="w-4 h-4 text-[#8B1A4A]" />
                              </div>
                              <div className="min-w-0">
                                <p className="font-headline font-bold text-sm text-[#8B1A4A] group-hover:text-[#8B1A4A]-container transition-colors truncate">{branch.title}</p>
                                <p className="text-[11px] text-[#4A4A4A] truncate leading-relaxed">{branch.subtitle}</p>
                              </div>
                            </Link>
                          ))}
                        </div>

                        <div className="px-6 py-3 bg-surface-container-low border-t border-outline-variant/20 flex items-center justify-between">
                          <p className="text-[11px] text-[#4A4A4A]">🚨 Emergency: <span className="font-bold text-[#8B1A4A]">040-68324800</span></p>
                          <button onClick={() => { navigate('/book'); setBranchDropOpen(false) }} className="text-[10px] font-bold text-white bg-gradient-to-r from-[#8B1A4A] to-[#5E0F30] px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity">Book Appointment</button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            } else {
              elements.push(
                <Link
                  key={link.label}
                  to={link.path}
                  className={`relative px-4 py-2.5 rounded-full font-headline tracking-widest text-[13px] font-black uppercase transition-all duration-300 ${
                    isActive(link.path) ? 'text-[#8B1A4A]' : 'text-[#4A4A4A] hover:text-[#8B1A4A]'
                  }`}
                >
                  {isActive(link.path) && (
                    <motion.div layoutId="nav-bg" className="absolute inset-0 bg-[#8B1A4A]/5 rounded-full z-0" />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              )
            }
            return elements
          })}
        </nav>

        {/* 3. RIGHT ACTIONS */}
        <div className="flex items-center gap-6 shrink-0">
                  {/* Emergency Call - Enhanced Professional look */}
                  <div className="hidden lg:flex items-center gap-4 bg-red-50 px-6 py-3 rounded-2xl border border-red-100/50 group transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10">
                    <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg animate-pulse-slow">
                      <Phone className="w-5 h-5 fill-current" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600/80 mb-0.5">
                        Emergency 24/7
                      </span>
                      <a 
                        href={`tel:${currentBranch?.emergencyPhone || '04068324800'}`} 
                        className="text-xl font-black text-slate-900 tracking-tight transition-colors hover:text-red-700 font-headline"
                      >
                        {currentBranch?.emergencyPhone || '040-68324800'}
                      </a>
                    </div>
                  </div>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/book')}
            className="hidden sm:flex items-center gap-3 bg-[#8B1A4A] text-white pl-6 pr-5 py-3 rounded-full shadow-[0_15px_40px_rgba(0,52,97,0.2)] group relative overflow-hidden active:shadow-inner transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.2s] ease-in-out" />
            <span className="font-headline font-black text-xs uppercase tracking-widest relative z-10">Book Appointment</span>
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center relative z-10">
              <Calendar className="w-3.5 h-3.5 text-white" />
            </div>
          </motion.button>

          <button
            className="lg:hidden p-3 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="text-[#8B1A4A] w-6 h-6" /> : <Menu className="text-[#8B1A4A] w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 4. PREMIUM MOBILE DRAWER OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-outline-variant/10 overflow-hidden lg:hidden z-40"
          >
            <div className="px-6 py-8 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center justify-between py-4 px-5 rounded-2xl font-headline text-lg font-black uppercase tracking-tight transition-all ${
                      isActive(link.path) ? 'bg-[#8B1A4A] text-white' : 'text-[#4A4A4A] hover:bg-[#8B1A4A]/5'
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="-rotate-90 w-5 h-5 opacity-40" />
                  </Link>
                </motion.div>
              ))}

              <div className="mt-8 border-t border-outline-variant/30 pt-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4A4A4A]/40 px-5 mb-4">
                  Explore Centers
                </p>
                <div className="grid grid-cols-2 gap-3 px-2">
                  {branches.map(branch => (
                    <Link
                      key={branch.slug}
                      to={`/branches/${branch.slug}`}
                      className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[#8B1A4A]/5 transition-all border border-outline-variant/10"
                    >
                      <div className="w-8 h-8 rounded-xl bg-[#8B1A4A]/5 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-[#8B1A4A]" />
                      </div>
                      <span className="text-xs font-black text-[#8B1A4A] uppercase">{branch.title}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <motion.button
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                onClick={() => navigate('/book')}
                className="mt-8 w-full bg-[#8B1A4A] text-white py-5 rounded-[2rem] font-headline font-black uppercase tracking-widest text-sm shadow-2xl shadow-[#8B1A4A]/30 flex items-center justify-center gap-4"
              >
                <Calendar className="w-5 h-5" />
                Book Fast Appointment
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
