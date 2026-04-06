import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, ChevronRight, MapPin, Stethoscope, Calendar, 
  Clock, User, Mail, Phone, X, Star, Award, 
  Activity, Heart, Brain, Bone, Baby, Zap, ShieldCheck 
} from 'lucide-react'
import { StickyNavbar } from '@/components/layout/StickyNavbar'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { branches } from '@/data/branches'
import { assetUrl } from '@/lib/assetUrl'

// Professional Luxury Tokens
const COLORS = {
  navy: '#0B1F3A',
  gold: '#D4AF37',
  pink: '#F76C8E',
  glass: 'rgba(255, 255, 255, 0.03)',
  border: 'rgba(212, 175, 55, 0.2)',
}

const SPECIALTIES = [
  { id: 'ortho', name: 'Orthopedics', icon: Bone, count: 12 },
  { id: 'cardio', name: 'Cardiology', icon: Heart, count: 8 },
  { id: 'neuro', name: 'Neurology', icon: Brain, count: 6 },
  { id: 'gynaec', name: 'Gynecology', icon: Baby, count: 9 },
  { id: 'general', name: 'Gen. Medicine', icon: Stethoscope, count: 18 },
  { id: 'urology', name: 'Urology', icon: ShieldCheck, count: 7 },
]

export function BookAppointmentPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [selectedSpec, setSelectedSpec] = useState(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState(null)

  // Filtered doctors based on branch + specialty
  const filteredDoctors = useMemo(() => {
    if (!selectedBranch) return []
    // Pulling actual chairman image as the face of quality
    const mainDoc = {
      name: 'Dr. Akhil Dadi',
      role: 'Chief Surgeon',
      image: assetUrl('doctors/akhil-dadi.png'),
      experience: '15+ Years',
      skills: ['Robotic Surgery', 'Joint Replacement'],
      rating: 4.9
    }
    
    return [
      { ...mainDoc, id: 'd-1', name: 'Dr. Akhil Dadi', role: 'Chairman & Chief Surgeon' },
      { ...mainDoc, id: 'd-2', name: 'Dr. Sameer V', role: 'Associate Director' },
      { ...mainDoc, id: 'd-3', name: 'Dr. Priyanka R', role: 'Senior Lead Surgeon' },
    ]
  }, [selectedBranch])

  const steps = [
    { id: 1, label: 'Choose Location' },
    { id: 2, label: 'Select Specialty' },
    { id: 3, label: 'Choose Consultant' },
    { id: 4, label: 'Reserve Slot' },
  ]

  const handleBooking = (doc) => {
    setSelectedDoc(doc)
    setIsBookingOpen(true)
  }

  return (
    <>
      <Helmet>
        <title>Reserve a Consultation | Srikara Hospitals Luxury</title>
      </Helmet>

      <div className="min-h-screen bg-[#061223] font-body text-white antialiased selection:bg-[#D4AF37] h-full">
        <StickyNavbar currentBranch={{ branchLogo: 'https://i.ibb.co/CK9bqmXK/sri-logo.jpg' }} />
        
        {/* Elite Ambient Gradient */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
           <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#0B1F3A] blur-[160px] opacity-100" />
           <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#D4AF37]/5 blur-[200px]" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] bg-[#F76C8E]/5 blur-[200px]" />
        </div>

        <div className="max-w-7xl mx-auto px-8 pt-20 pb-40 relative z-10">
          
          {/* Step Tracker */}
          <div className="text-center mb-16 pt-0">

            {/* Progress Bar Container */}
            <div className="max-w-xl mx-auto relative mt-6 px-6">
               <div className="absolute top-[22px] left-0 w-full h-[1px] bg-white/10" />
               <motion.div 
                 className="absolute top-[22px] left-0 h-[1px] bg-gradient-to-r from-[#D4AF37] to-[#F76C8E]"
                 initial={{ width: 0 }}
                 animate={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
               />
               <div className="flex justify-between relative">
                  {steps.map((s) => (
                    <div key={s.id} className="group flex flex-col items-center">
                       <button
                         onClick={() => s.id < step && setStep(s.id)}
                         className={`w-11 h-11 rounded-full flex items-center justify-center text-xs font-black transition-all duration-700 z-10 border ${
                           step >= s.id 
                           ? 'bg-[#D4AF37] border-[#D4AF37] text-[#0B1F3A] shadow-[0_0_30px_rgba(212,175,55,0.4)] scale-110' 
                           : 'bg-[#061223] border-white/10 text-white/30'
                         }`}
                       >
                         {step > s.id ? '✓' : s.id}
                       </button>
                       <span className={`mt-4 text-[9px] font-bold uppercase tracking-widest ${step >= s.id ? 'text-white' : 'text-white/20'}`}>{s.label}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Journey Steps Section */}
          <main className="min-h-[500px]">
             <AnimatePresence mode="wait">
               {step === 1 && (
                 <motion.div 
                   key="locations"
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -30 }}
                   className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                 >
                   {branches.map((b) => (
                     <div 
                       key={b.slug}
                       onClick={() => { setSelectedBranch(b); setStep(2); }}
                       className="group relative h-[380px] rounded-[2.5rem] overflow-hidden cursor-pointer border border-white/5 bg-white/5 backdrop-blur-2xl transition-all duration-700 hover:border-[#D4AF37]/50"
                     >
                       <img src={b.heroImage} alt={b.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                       <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/40 to-transparent z-10" />
                       <div className="absolute inset-0 p-10 flex flex-col justify-end z-20">
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37] mb-3 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">Select Site →</span>
                          <h3 className="font-headline text-3xl font-black text-white group-hover:text-[#D4AF37] transition-colors">{b.title}</h3>
                          <p className="text-white/60 text-xs mt-3 flex items-center gap-2 font-medium">
                            <MapPin size={14} className="text-[#F76C8E]" /> {b.address}
                          </p>
                       </div>
                       <div className="absolute inset-0 bg-[#0B1F3A]/20 group-hover:bg-[#0B1F3A]/10 transition-colors z-[15]" />
                     </div>
                   ))}
                 </motion.div>
               )}

               {step === 2 && (
                 <motion.div 
                   key="specialty"
                   initial={{ opacity: 0, x: 40 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -40 }}
                   className="max-w-4xl mx-auto"
                 >
                   <div className="flex flex-wrap justify-center gap-6">
                      {SPECIALTIES.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => { setSelectedSpec(s); setStep(3); }}
                          className={`group min-w-[240px] p-10 rounded-[3rem] border transition-all duration-700 ${
                            selectedSpec?.id === s.id 
                            ? 'bg-[#D4AF37] border-[#D4AF37] shadow-[0_30px_60px_rgba(212,175,55,0.2)]' 
                            : 'bg-white/5 border-white/5 hover:border-[#D4AF37]/30 hover:bg-white/10'
                          }`}
                        >
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all ${
                            selectedSpec?.id === s.id ? 'bg-[#0B1F3A] text-[#D4AF37]' : 'bg-white/5 text-white/40 group-hover:bg-[#D4AF37]/20 group-hover:text-[#D4AF37]'
                          }`}>
                            <s.icon size={32} />
                          </div>
                          <h4 className={`font-headline text-2xl font-black mb-1 transition-colors ${selectedSpec?.id === s.id ? 'text-[#0B1F3A]' : 'text-white'}`}>{s.name}</h4>
                          <p className={`text-[10px] font-black uppercase tracking-widest ${selectedSpec?.id === s.id ? 'text-[#0B1F3A]/60' : 'text-white/30'}`}>{s.count} Clinical Units</p>
                        </button>
                      ))}
                   </div>
                   <div className="text-center mt-16">
                      <button onClick={() => setStep(1)} className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.4em] hover:underline transition-all">← Back to Locations</button>
                   </div>
                 </motion.div>
               )}

               {step === 3 && (
                 <motion.div 
                   key="doctors"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto"
                 >
                   {filteredDoctors.map((doc, i) => (
                     <motion.div 
                       key={doc.id}
                       initial={{ opacity: 0, y: 40 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: i * 0.1 }}
                       className="group bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 flex flex-col md:flex-row items-center gap-10 hover:border-[#D4AF37]/40 transition-all duration-700"
                     >
                        <div className="w-40 h-40 shrink-0 relative">
                           <div className="absolute -inset-2 border border-[#D4AF37]/30 rounded-full" />
                           <img src={doc.image} alt={doc.name} className="w-full h-full rounded-full object-cover object-top border-4 border-[#061223] relative z-10" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F76C8E] block mb-3">{doc.role}</span>
                           <h3 className="font-headline text-3xl font-black text-white mb-2">{doc.name}</h3>
                           <div className="flex items-center justify-center md:justify-start gap-4 mb-8 text-white/40 text-xs font-bold tracking-widest uppercase">
                              <span><Star size={14} className="inline text-[#D4AF37] -mt-1 mr-1" /> {doc.rating}</span>
                              <span>{doc.experience} Expertise</span>
                           </div>
                           <button 
                             onClick={() => handleBooking(doc)}
                             className="w-full h-14 bg-[#D4AF37] text-[#0B1F3A] rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:shadow-[0_20px_40px_rgba(212,175,55,0.3)] transition-all active:scale-95"
                           >
                             Select & Proceed
                           </button>
                        </div>
                     </motion.div>
                   ))}
                   <div className="lg:col-span-2 text-center mt-12">
                      <button onClick={() => setStep(2)} className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.4em] hover:underline transition-all">← Back to Specialties</button>
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </main>
        </div>

        {/* Booking Overlay (Deep Luxury) */}
        <AnimatePresence>
          {isBookingOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-y-auto">
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 onClick={() => setIsBookingOpen(false)}
                 className="absolute inset-0 bg-[#061223]/95 backdrop-blur-3xl"
               />
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95, y: 30 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.95, y: 30 }}
                 className="relative w-full max-w-4xl bg-[#0B1F3A] border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_80px_160px_rgba(0,0,0,0.8)]"
               >
                 <button onClick={() => setIsBookingOpen(false)} className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors z-20">
                    <X size={32} />
                 </button>

                 <div className="grid grid-cols-1 md:grid-cols-5 min-h-[600px]">
                    <div className="md:col-span-2 bg-[#061223] p-12 border-r border-white/5 flex flex-col justify-between relative overflow-hidden">
                       <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37]" />
                       <div>
                          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#F76C8E] mb-10 block">Final Protocol</span>
                          <h2 className="font-headline text-4xl font-extrabold text-white leading-[0.9] mb-10">Luxury <br /><span className="text-[#D4AF37]">Confirmation.</span></h2>
                          <div className="space-y-8">
                             <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#D4AF37]"><User size={20} /></div>
                                <div>
                                   <p className="text-[9px] font-black uppercase text-white/30 tracking-widest">Surgeon</p>
                                   <p className="font-bold text-white text-lg">{selectedDoc?.name}</p>
                                </div>
                             </div>
                             <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#F76C8E]"><MapPin size={20} /></div>
                                <div>
                                   <p className="text-[9px] font-black uppercase text-white/30 tracking-widest">Facility</p>
                                   <p className="font-bold text-white text-lg">{selectedBranch?.title}</p>
                                </div>
                             </div>
                          </div>
                       </div>
                       <div className="pt-10 flex items-center gap-3">
                          <ShieldCheck size={16} className="text-[#D4AF37]" />
                          <span className="text-[9px] font-black uppercase text-white/40 tracking-widest">Secured Selection Protocol Encrypted</span>
                       </div>
                    </div>

                    <div className="md:col-span-3 p-12 lg:p-16">
                       <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert('Reservation Confirmed. Our concierge will contact you shortly.'); setIsBookingOpen(false); }}>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                             <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37] ml-4">Full Name</label>
                                <input type="text" placeholder="Gaurav Singh..." required className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-6 outline-none focus:border-[#D4AF37] transition-all" />
                             </div>
                             <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37] ml-4">Luxury Liaison (Mobile)</label>
                                <input type="tel" placeholder="+91..." required className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-6 outline-none focus:border-[#D4AF37] transition-all" />
                             </div>
                          </div>
                          <div className="space-y-3">
                             <label className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37] ml-4">Preferred Slot</label>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="relative">
                                   <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                                   <input type="date" required className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-14 outline-none focus:border-[#D4AF37] transition-all" />
                                </div>
                                <div className="relative">
                                   <Clock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                                   <select className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-14 outline-none focus:border-[#D4AF37] appearance-none transition-all">
                                      <option className="bg-[#0B1F3A]">Choose Time...</option>
                                      <option className="bg-[#0B1F3A]">10:00 AM - Priority</option>
                                      <option className="bg-[#0B1F3A]">02:30 PM - Clinical</option>
                                      <option className="bg-[#0B1F3A]">06:00 PM - Evening</option>
                                   </select>
                                </div>
                             </div>
                          </div>
                          <div className="pt-10">
                             <button className="w-full h-18 bg-gradient-to-r from-[#D4AF37] to-[#F76C8E] text-[#0B1F3A] rounded-[1.5rem] font-black uppercase tracking-[0.4em] text-xs shadow-[0_20px_50px_rgba(212,175,55,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all">
                                Request Elite Appointment →
                             </button>
                             <p className="text-center text-white/20 text-[9px] uppercase font-bold tracking-widest mt-6">Concierge Response within 15 Minutes</p>
                          </div>
                       </form>
                    </div>
                 </div>
               </motion.div>
            </div>
          )}
        </AnimatePresence>

        <Footer />
        <MobileBottomNav />
      </div>
    </>
  )
}
