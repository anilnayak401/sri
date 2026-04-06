import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { StickyNavbar } from '@/components/layout/StickyNavbar'
import { BranchSideNav } from '@/components/layout/BranchSideNav'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { AppointmentWidget } from '@/components/sections/AppointmentWidget'
import { peerzadiguda as branch } from '@/data/branches/peerzadiguda'
import { VideoHero } from '@/components/sections/VideoHero'
import { AlphabetDiseaseSearch } from '@/components/sections/AlphabetDiseaseSearch'

/* ── icon map for specialty cards ── */
const iconMap = {
  orthopedics: '🦴',
  medical_services: '🩺',
  urology: '🫘',
  emergency: '🚨',
  biotech: '🔬',
}

export function PeerzadigudaPage() {
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>Srikara Hospitals Peerzadiguda | Affordable Advanced Care</title>
        <meta name="description" content="Bringing world-class Orthopedic, General, and Urology care to Peerzadiguda with robotic-assisted precision." />
      </Helmet>

      <div className="min-h-screen bg-surface font-body text-on-surface antialiased">
        <StickyNavbar currentBranch={branch} />
        <BranchSideNav currentSlug={branch.slug} />

        {/* offset content on xl to avoid side nav overlap */}
        <div className="xl:pl-16">

        {/* ── 1. HERO ── */}
        <VideoHero branch={branch}>
          <div className="max-w-2xl">
            <h1 className="font-headline font-extrabold tracking-tighter mb-5 md:mb-6">
              <span className="hero-line-1 block text-[28px] md:text-5xl lg:text-7xl text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
                {branch.heroHeadline}
              </span>
              <span className="hero-line-2 block text-[26px] md:text-5xl lg:text-7xl hero-gradient-text">
                {branch.heroHighlight}
              </span>
            </h1>
            <p className="hero-desc text-sm md:text-lg text-white/70 max-w-xl mb-6 md:mb-8 leading-relaxed">
              {branch.description}
            </p>
            <div className="hero-btn-wrap flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
              <button
                onClick={() => navigate('/book')}
                className="w-full sm:w-auto min-h-[48px] bg-gradient-to-br from-[#C2185B] to-[#8E0038] text-white px-8 py-3 md:py-4 rounded-full font-label font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-transform text-sm md:text-base"
              >
                Book an Appointment
              </button>
              <button
                onClick={() => navigate('/specialties')}
                className="w-full sm:w-auto min-h-[48px] bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3 md:py-4 rounded-full font-label font-bold uppercase tracking-widest hover:bg-white/20 transition-all text-sm md:text-base"
              >
                Explore Specialties
              </button>
            </div>
          </div>
        </VideoHero>

        {/* ── 2. CENTERS OF EXCELLENCE ── */}
        <section className="py-24 bg-surface px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-2xl">
                <h2 className="font-headline text-4xl font-extrabold text-[#C2185B] tracking-tight mb-4 uppercase">
                  Centers of Excellence
                </h2>
                <p className="text-[#4A4A4A]">
                  Our Peerzadiguda facility combines neighborhood accessibility with the surgical power of a global medical hub.
                </p>
              </div>
              <span className="text-[#C2185B] font-black text-6xl opacity-10 hidden md:block">01</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {branch.specialtiesCards.map((item, i) => (
                <div key={i} className="group bg-surface-container-lowest p-8 rounded-xl relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-ambient">
                  <div className="absolute left-0 top-0 w-1 h-0 bg-[#C2185B] group-hover:h-full transition-all duration-300 ease-in-out" />
                  <div className={`w-12 h-12 rounded-lg bg-[#C2185B]/5 flex items-center justify-center mb-6 text-2xl ${item.iconColor || 'text-[#C2185B]'}`}>
                    {iconMap[item.icon] || '⚕️'}
                  </div>
                  <h3 className="font-headline font-bold text-lg text-[#C2185B] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#4A4A4A] leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. ACCESSIBLE ADVANCED CARE ── */}
        <section className="py-24 bg-surface-container-low overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-full overflow-hidden border-[12px] border-surface-container-lowest shadow-2xl">
                <img
                  src={branch.accessibleCareImage}
                  alt="Surgeon using robotic console"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-surface/70 backdrop-blur-[20px] p-6 rounded-2xl border border-white/30 max-w-[260px] shadow-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#C2185B] text-lg">⚙️</span>
                  <p className="font-bold text-[#C2185B] uppercase text-xs tracking-tighter">Robotic Advantage</p>
                </div>
                <p className="text-sm font-medium text-[#4A4A4A] italic">
                  "We've brought the precision of elite city centers to Peerzadiguda, ensuring no one has to travel far for the best surgery."
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-[#C2185B] tracking-tight mb-8">
                Accessible Advanced Care.<br />
                <span className="text-[#0F4C5C] italic">Now Closer to Home.</span>
              </h2>
              <p className="text-lg text-[#4A4A4A] mb-8 leading-relaxed">
                At Srikara Hospitals Peerzadiguda, we believe precision shouldn't be a privilege. By integrating high-tech robotic surgery into our neighborhood facility, we ensure that advanced healthcare is both geographically and financially accessible to the local community.
              </p>
              <ul className="space-y-4 mb-10">
                {branch.accessibleCareHighlights.map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-on-surface font-semibold">
                    <span className="text-[#0F4C5C] text-xl flex-shrink-0">✅</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="bg-[#0F4C5C] text-white px-8 py-4 rounded-full font-label font-bold uppercase tracking-widest hover:bg-[#0F4C5C]/90 transition-all">
                Learn about our mission
              </button>
            </div>
          </div>
        </section>

        {/* ── 4. CHAIRMAN SPOTLIGHT ── */}
        <section className="py-24 bg-surface px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/3 flex-shrink-0">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-br from-[#C2185B] to-[#8E0038] opacity-10 rounded-2xl rotate-3 transition-transform group-hover:rotate-6" />
                <img
                  src={branch.doctor.image}
                  alt={branch.doctor.name}
                  className="relative z-10 w-full aspect-[3/4] object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-[#C2185B] font-bold uppercase tracking-[0.3em] mb-4">Leadership</p>
              <h2 className="font-headline text-4xl font-extrabold text-[#C2185B] mb-4">
                Led by a Pioneer in Robotic Joint Replacement
              </h2>
              <h3 className="text-2xl font-bold text-[#4A4A4A] mb-6 italic">{branch.doctor.name}</h3>
              <p className="text-[#4A4A4A] text-lg leading-relaxed mb-8">{branch.doctor.bio}</p>
              <div className="grid grid-cols-2 gap-8 mb-8 border-l-2 border-[#0F4C5C]/20 pl-8">
                <div>
                  <p className="text-3xl font-black text-[#C2185B]">{branch.doctor.surgeries}</p>
                  <p className="text-xs font-bold uppercase text-[#4A4A4A]">Joint Replacements</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-[#C2185B]">{branch.doctor.experience}+</p>
                  <p className="text-xs font-bold uppercase text-[#4A4A4A]">Years of Excellence</p>
                </div>
              </div>
              <button className="bg-[#C2185B] text-white px-10 py-4 rounded-full font-label font-bold uppercase tracking-widest hover:bg-[#C2185B]-container transition-all">
                View Chairman's Message
              </button>
            </div>
          </div>
        </section>

        {/* ── 5. MODERN INFRASTRUCTURE ── */}
        <section className="py-24 bg-surface-container-low px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-headline text-4xl font-extrabold text-[#C2185B] tracking-tight mb-4 uppercase">
                Modern Infrastructure
              </h2>
              <p className="text-[#4A4A4A] max-w-2xl mx-auto">
                A seamless integration of robotics and diagnostics to ensure zero-error outcomes.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsy4QyvBAKqMc5jm3QR4_8UqR5L8nBrBgSREo9VuccfjCP3HBJs0ziEeXOzXDxHo0B3FHdgZ94q_LEkHTkaduFMpK7zhxxI5IWdcvN-1EW4X966vG-PKPso_lzppnnHlGyDyIMsO28rwYH6wDicKFOGBFapr15cRMuWLdd7kHDCSeiZIIlZVlSJHQkqMo4S7-j0KlCMmDIP3hLCOb2cYxW_Hg7zw1YIrLHAd8sA7shqELw9iCyfi6M_vOzb255-_fJs3YgQtG8S1g',
                  title: 'Modern Diagnostics',
                  desc: 'Equipped with ultra-modern MRI, CT Scan, and Digital X-Ray systems for hyper-accurate visualization.',
                  gradient: 'from-primary/90',
                },
                {
                  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkocaQxiMvMjVnD-a1ILZHkSv0qki-DziBAXey5cwaDbJPVJvUPjnQjskOai_Q8_37liZrGjoFcMZ8_ODtSqXvJiNU2tF5rt-YivEOSUkYsCfTRhxw7tIRSaqIU_zuodeWQLdnc0uAaaD3izQ6GubO1gO8RfpQyAGriwKDkRABilUPTxf1BlBpDfHmSA4rKljqGXmFIZu_9LwdTZcG6j84B2RphtdSEII3i5Oc5ICvuC_nANM4MerXxn9dvzbIe4fwaYrRonxFrbs',
                  title: 'Surgical Robotics',
                  desc: 'State-of-the-art robotic systems that assist our surgeons in performing complex procedures with sub-millimeter precision.',
                  gradient: 'from-secondary/90',
                },
              ].map((item, i) => (
                <div key={i} className="group relative rounded-3xl overflow-hidden h-96">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} to-transparent flex flex-col justify-end p-10`}>
                    <h4 className="text-white font-headline text-2xl font-bold mb-2">{item.title}</h4>
                    <p className="text-white/80 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. DISEASE SEARCH ── */}
        <section className="py-16 bg-[#FDF6F9] px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <AlphabetDiseaseSearch theme="light" />
          </div>
        </section>

        {/* ── 7. EMERGENCY BANNER ── */}
        <section className="bg-error text-on-error py-10 px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center animate-pulse text-3xl">
                🚑
              </div>
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight">Need Urgent Help?</h2>
                <p className="opacity-90 font-medium">{branch.title} Branch Emergency Trauma Support Available 24/7</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm font-bold opacity-75 uppercase mb-1">Call Now</p>
              <a href={`tel:${branch.emergencyPhone}`} className="text-4xl font-black tracking-tighter">
                {branch.emergencyPhone}
              </a>
            </div>
          </div>
        </section>

        <AppointmentWidget currentBranch={branch} />
        </div>{/* end xl:pl-16 */}
        <Footer />
        <MobileBottomNav />
      </div>
    </>
  )
}
