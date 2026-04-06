import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Bone, Heart, Brain, Baby, Zap, Award, Star, ShieldCheck, ChevronRight, Stethoscope } from 'lucide-react'
import { motion } from 'framer-motion'
import { StickyNavbar } from '@/components/layout/StickyNavbar'
import { BranchSideNav } from '@/components/layout/BranchSideNav'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { assetUrl } from '@/lib/assetUrl'

const COLORS = {
  navy: '#0B1F3A',
  gold: '#C2185B',
  pink: '#C2185B',
  ivory: '#FCFBFC'
}

const doctor = {
  name: 'Dr. Akhil Dadi',
  title: 'Chief Surgeon & Chairman',
  surgeries: '27,000+',
  successRate: '99%',
  experience: '15+',
  bio: "As a multidimensional Joint Replacement Surgeon, Dr. Dadi has pioneered the integration of robotic technology in India. His clinical precision and human-centric approach have positioned him to thousands.",
  image: assetUrl('doctors/akhil-dadi.png'),
}

const surgicalSpecialties = [
  {
    tag: 'ELITE STANDARD',
    title: 'Robotic Orthopedic Surgery',
    description: 'Procedures performed for both knees using the latest robotic available for joint replacements.',
    highlight: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkocaQxiMvMjVnD-a1ILZHkSv0qki-DziBAXey5cwaDbJPVJvUPjnQjskOai_Q8_37liZrGjoFcMZ8_ODtSqXvJiNU2tF5rt-YivEOSUkYsCfTRhxw7tIRSaqIU_zuodeWQLdnc0uAaaD3izQ6GubO1gO8RfpQyAGriwKDkRABilUPTxf1BlBpDfHmSA4rKljqGXmFIZu_9LwdTZcG6j84B2RphtdSEII3i5Oc5ICvuC_nANM4MerXxn9dvzbIe4fwaYrRonxFrbs',
  },
  { icon: Heart, title: 'Cardiology', description: 'Advanced cardiovascular care and surgical interventions.' },
  { icon: Brain, title: 'Neurology', description: 'Comprehensive brain and nervous system treatments.' },
]

const expertDoctors = [
  { name: 'Dr. Akhil Dadi', role: 'Orthopaedic Surgeon', tag: 'CHAIRMAN', image: assetUrl('doctors/akhil-dadi.png') },
]

export function DoctorsPage() {
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>Find a Doctor | Srikara Hospitals Premium</title>
      </Helmet>

      <div className="min-h-screen bg-[#FDF6F9] font-body text-[#0F4C5C] antialiased selection:bg-[#C2185B] selection:text-white">
        <StickyNavbar currentBranch={{ branchLogo: 'https://i.ibb.co/CK9bqmXK/sri-logo.jpg' }} />
        <BranchSideNav currentSlug={null} />
        
        <div className="xl:pl-16">

          {/* Luxury Hero */}
          <section className="relative pt-16 pb-20 px-8 overflow-hidden bg-white">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C2185B]/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0F4C5C]/5 blur-[100px] rounded-full" />
            
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <span className="inline-block text-[10px] font-black uppercase tracking-[0.5em] text-[#C2185B] mb-3">
                  ✦ Excellence Redefined
                </span>
                <h1 className="font-headline text-5xl md:text-7xl font-extrabold leading-[0.9] tracking-tighter mb-4">
                  <span className="text-[#0F4C5C]">Find Your</span>
                  <br />
                  <span className="hero-gradient-text not-italic">Specialist.</span>
                </h1>
                <p className="text-slate-500 text-lg mb-6 leading-relaxed max-w-xl">
                  Experience a new standard of personalized clinical care, where high-surgical precision meets human empathy.
                </p>

                {/* Glass Search Bar (Premium Light) */}
                <div className="relative max-w-xl w-full group mb-8">
                  <div className="absolute inset-0 bg-[#C2185B]/10 blur-2xl opacity-40 rounded-full" />
                  <div className="relative bg-white/40 backdrop-blur-xl border border-[#C2185B]/20 rounded-full p-2 flex items-center shadow-lg transition-all duration-300 hover:border-[#C2185B]/40">
                    <input 
                      type="text" 
                      placeholder="Search by specialty, doctor name..." 
                      className="flex-1 bg-transparent border-none outline-none text-[#0F4C5C] placeholder-[#0F4C5C]/40 px-6 text-lg font-medium"
                    />
                    <div className="w-12 h-12 rounded-full bg-[#0F4C5C] flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer">
                      <Search className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-5">
                  <button onClick={() => navigate('/book')} className="bg-[#0F4C5C] text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:shadow-[0_20px_40px_rgba(11,31,58,0.2)] transition-all">
                    Quick Consultation
                  </button>
                  <div className="flex items-center gap-4 text-[#C2185B]">
                    <ShieldCheck size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Priority Access Enabled</span>
                  </div>
                </div>
              </motion.div>

              {/* Signature Doctor Card */}
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
                <div className="absolute -inset-4 bg-[#C2185B]/5 blur-xl rounded-[3rem] rotate-3" />
                <div className="relative bg-white border border-[#C2185B]/10 rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-[0_40px_80px_rgba(0,0,0,0.05)]">
                  <div className="relative mb-8">
                     <div className="absolute -inset-2 border border-[#C2185B] rounded-full opacity-20" />
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-44 h-44 rounded-full object-cover object-top border-4 border-white shadow-xl relative z-10"
                    />
                  </div>
                  <h3 className="font-headline text-3xl font-black text-[#0F4C5C] mb-2">{doctor.name}</h3>
                  <p className="text-[#C2185B] font-bold text-sm uppercase tracking-widest mb-6">{doctor.title}</p>
                  
                  <div className="w-full grid grid-cols-2 gap-4 border-t border-slate-100 pt-8">
                    <div>
                      <p className="text-2xl font-black text-[#0F4C5C]">{doctor.surgeries}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Surgeries</p>
                    </div>
                    <div>
                      <p className="text-2xl font-black text-[#0F4C5C]">{doctor.successRate}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Success</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Premium Emergency Strip */}
          <div className="bg-[#0F4C5C] text-white py-4 px-8 border-y border-[#C2185B]/20">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                <span className="w-2 h-2 rounded-full bg-[#C2185B] animate-pulse" />
                <span className="font-black text-[10px] uppercase tracking-[0.2em]">24/7 Clinical Priority Protocol</span>
              </div>
              <div className="hidden sm:block text-xs font-bold text-[#C2185B]">
                EMERGENCY COUNSEL: <span className="text-white ml-2">040-68324800</span>
              </div>
            </div>
          </div>

          {/* Specialized Depth Section */}
          <section className="py-24 px-8 bg-[#FDF6F9]">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                <div>
                  <span className="inline-block text-[10px] font-black uppercase tracking-[0.4em] text-[#C2185B] mb-4">Precision Mastery</span>
                  <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-[#0F4C5C] tracking-tighter">
                    Surgical Depth & <br /><span className="italic text-[#C2185B]">Human Connection.</span>
                  </h2>
                </div>
                <button className="h-14 px-8 border border-[#C2185B]/30 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#C2185B] hover:text-white transition-all">
                  View full scope
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Main Hero Specialty */}
                <div className="md:col-span-8 group relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl">
                  <img src={surgicalSpecialties[0].image} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C5C] via-[#0F4C5C]/20 to-transparent" />
                  <div className="relative h-full p-12 flex flex-col justify-end">
                    <span className="px-4 py-1.5 bg-[#C2185B] text-[#0F4C5C] text-[10px] font-black rounded-full w-fit mb-6">
                      {surgicalSpecialties[0].tag}
                    </span>
                    <h3 className="font-headline text-4xl font-black text-white mb-4 italic">{surgicalSpecialties[0].title}</h3>
                    <p className="text-white/70 max-w-lg leading-relaxed">{surgicalSpecialties[0].description}</p>
                  </div>
                </div>

                {/* Vertical Accents */}
                <div className="md:col-span-4 flex flex-col gap-8">
                  {[surgicalSpecialties[1], surgicalSpecialties[2]].map((s, i) => (
                    <div key={i} className="flex-1 bg-white border border-[#C2185B]/10 rounded-[2.5rem] p-8 hover:border-[#C2185B]/50 transition-all shadow-sm">
                      <div className="w-12 h-12 rounded-2xl bg-[#C2185B]/5 flex items-center justify-center text-[#C2185B] mb-6">
                        <s.icon size={24} />
                      </div>
                      <h4 className="font-headline text-xl font-extrabold text-[#0F4C5C] mb-3">{s.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{s.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Expert Gallery & Professional Benchmark */}
          <section className="py-24 px-8 bg-white overflow-hidden">
             <div className="max-w-7xl mx-auto">
               <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
                 
                 {/* The Chairman Portrait */}
                 <div className="md:col-span-4">
                   <div className="text-center mb-10 md:text-left">
                     <span className="inline-block text-[10px] font-black uppercase tracking-[0.4em] text-[#C2185B] mb-4 underline decoration-[#C2185B]/30 underline-offset-8">THE COUNCIL OF EXPERTS</span>
                     <h2 className="font-headline text-4xl font-black text-[#0F4C5C]">Leadership & <br />Vision.</h2>
                   </div>
                   {expertDoctors.map((doc, i) => (
                     <motion.div whileHover={{ y: -10 }} key={i} className="group relative">
                        <div className="aspect-[4/5] rounded-[3rem] overflow-hidden mb-8 border border-[#C2185B]/10 shadow-2xl relative">
                          <img src={doc.image} alt={doc.name} className="w-full h-full object-cover object-top" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C5C]/60 via-transparent" />
                          <div className="absolute bottom-10 left-10 right-10">
                             <button onClick={() => navigate('/book')} className="w-full h-14 bg-[#C2185B] text-[#0F4C5C] font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl hover:scale-105 transition-transform">Book Priority Access</button>
                          </div>
                        </div>
                        <div className="text-center md:text-left">
                          <h4 className="font-headline text-2xl font-black text-[#0F4C5C] mb-1">{doc.name}</h4>
                          <p className="text-[12px] font-black uppercase tracking-widest text-[#C2185B]">{doc.role}</p>
                        </div>
                     </motion.div>
                   ))}
                 </div>

                 {/* Professional Expertise Details */}
                 <div className="md:col-span-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                       <div className="p-8 bg-[#FDF6F9] border border-[#C2185B]/10 rounded-[2rem] hover:shadow-ambient transition-all group">
                          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#C2185B] mb-6 shadow-sm group-hover:bg-[#0F4C5C] group-hover:text-white transition-colors">
                             <Award size={28} />
                          </div>
                          <h3 className="font-headline text-xl font-black text-[#0F4C5C] mb-4">Elite Clinical Network</h3>
                          <p className="text-slate-500 text-sm leading-relaxed">
                            A massive 1000-bedded healthcare ecosystem strategically spread across 8 units in Hyderabad and key cities in Andhra Pradesh.
                          </p>
                       </div>

                       <div className="p-8 bg-[#FDF6F9] border border-[#C2185B]/10 rounded-[2rem] hover:shadow-ambient transition-all group">
                          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#C2185B] mb-6 shadow-sm group-hover:bg-[#0F4C5C] group-hover:text-white transition-colors">
                             <Zap size={28} />
                          </div>
                          <h3 className="font-headline text-xl font-black text-[#0F4C5C] mb-4">Robotic Pioneers</h3>
                          <p className="text-slate-500 text-sm leading-relaxed">
                            Promoting world-class standards in Joint Replacement & Spine Surgery through the integration of the NAVIO Robotic system.
                          </p>
                       </div>

                       <div className="p-8 bg-[#FDF6F9] border border-[#C2185B]/10 rounded-[2rem] hover:shadow-ambient transition-all group">
                          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#C2185B] mb-6 shadow-sm group-hover:bg-[#0F4C5C] group-hover:text-white transition-colors">
                             <Stethoscope size={28} />
                          </div>
                          <h3 className="font-headline text-xl font-black text-[#0F4C5C] mb-4">Global Credentials</h3>
                          <p className="text-slate-500 text-sm leading-relaxed">
                            Led by members of the <span className="font-bold text-[#0F4C5C]">World Orthopaedic Concern</span> and Indo German Orthopaedic Foundation.
                          </p>
                       </div>

                       <div className="p-8 bg-[#FDF6F9] border border-[#C2185B]/10 rounded-[2rem] hover:shadow-ambient transition-all group">
                          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#C2185B] mb-6 shadow-sm group-hover:bg-[#0F4C5C] group-hover:text-white transition-colors">
                             <Star size={28} />
                          </div>
                          <h3 className="font-headline text-xl font-black text-[#0F4C5C] mb-4">A Decade of Care</h3>
                          <p className="text-slate-500 text-sm leading-relaxed">
                            Since 2013, Srikara has evolved into a premier multi-specialty institution dedicated to outcomes-based medicine.
                          </p>
                       </div>
                    </div>
                    
                    <div className="mt-12 p-8 bg-[#0F4C5C] rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8">
                       <div>
                          <p className="text-white font-headline text-2xl font-extrabold italic">Your health, our commitment.</p>
                          <p className="text-white/40 text-[10px] uppercase font-black tracking-[0.2em] mt-1">Multi-Specialty precision across India</p>
                       </div>
                       <button className="bg-white text-[#0F4C5C] px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#C2185B] hover:text-white transition-all">Official Directory →</button>
                    </div>
                 </div>

               </div>
             </div>
          </section>

        </div>{/* end xl:pl-16 */}

        <Footer />
        <MobileBottomNav />
      </div>
    </>
  )
}
