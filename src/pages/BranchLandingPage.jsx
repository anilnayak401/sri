import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { Star, MapPin } from 'lucide-react'
import { StickyNavbar } from '@/components/layout/StickyNavbar'
import { BranchSideNav } from '@/components/layout/BranchSideNav'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { AppointmentWidget } from '@/components/sections/AppointmentWidget'
import { VideoHero } from '@/components/sections/VideoHero'
import { AlphabetDiseaseSearch } from '@/components/sections/AlphabetDiseaseSearch'
import { assetUrl } from '@/lib/assetUrl'

export function BranchLandingPage({ branch }) {
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>Srikara Hospitals {branch.title} | {branch.subtitle}</title>
        <meta name="description" content={branch.description} />
      </Helmet>

      <div className="min-h-screen bg-surface font-body text-on-surface antialiased">
        <StickyNavbar currentBranch={branch} />
        <BranchSideNav currentSlug={branch.slug} />

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
                  className="w-full sm:w-auto min-h-[48px] bg-[#8B1A4A] text-white px-8 py-3 md:py-4 rounded-full font-label font-bold uppercase tracking-widest shadow-lg hover:bg-[#2D3A4A] transition-all duration-300 text-sm md:text-base"
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

          {/* ── 2. SPECIALTIES ── */}
          <section className="py-20 bg-surface px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                  <h2 className="font-headline text-4xl font-extrabold text-[#8B1A4A] tracking-tight uppercase mb-3">
                    Centers of Excellence
                  </h2>
                  <div className="w-12 h-1 bg-[#8B1A4A]" />
                </div>
                <span className="text-[#8B1A4A] font-black text-6xl opacity-10 hidden md:block">01</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
                {branch.specialtiesCards?.map((item, i) => (
                  <div key={i} className="group bg-surface-container-lowest p-7 rounded-2xl relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-ambient border border-outline-variant/10">
                    <div className="absolute left-0 top-0 w-1 h-0 bg-[#8B1A4A] group-hover:h-full transition-all duration-300 ease-in-out" />
                    <div className="text-3xl mb-5">{item.icon}</div>
                    <h3 className="font-headline font-bold text-base text-[#8B1A4A] mb-2">{item.title}</h3>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 3. HIGHLIGHTS ── */}
          {branch.highlights && (
            <section className="py-20 bg-surface-container-low px-8">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-[#8B1A4A] tracking-tight mb-8">
                    The {branch.title}<br />
                    <span className="text-[#2D3A4A] italic">Advantage.</span>
                  </h2>
                  <p className="text-lg text-[#4A4A4A] mb-8 leading-relaxed">{branch.description}</p>
                  <ul className="space-y-4 mb-10">
                    {branch.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-4 text-on-surface font-semibold">
                        <span className="text-[#2D3A4A] text-xl flex-shrink-0 mt-0.5">✅</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => navigate('/book')}
                    className="bg-[#2D3A4A] text-white px-8 py-4 rounded-full font-label font-bold uppercase tracking-widest hover:bg-[#2D3A4A]/90 transition-all"
                  >
                    Book a Consultation
                  </button>
                </div>
                <div className="relative">
                  <div className="aspect-square rounded-full overflow-hidden border-[12px] border-surface-container-lowest shadow-2xl">
                    <img src={branch.heroImage} alt={branch.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-surface/80 backdrop-blur-[20px] p-6 rounded-2xl border border-white/30 max-w-[240px] shadow-xl">
                    <p className="font-bold text-[#8B1A4A] uppercase text-xs tracking-tighter mb-1">📍 {branch.title}</p>
                    <p className="text-sm font-medium text-[#4A4A4A]">{branch.address}</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── 4. DOCTOR SPOTLIGHT ── */}
          {branch.doctor && (
            <section className="py-20 bg-surface px-8">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
                <div className="w-full md:w-1/3 flex-shrink-0">
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-br from-[#8B1A4A] to-[#5E0F30] opacity-10 rounded-2xl rotate-3 transition-transform group-hover:rotate-6" />
                    <img
                      src={assetUrl(branch.doctor.image)}
                      alt={branch.doctor.name}
                      className="relative z-10 w-full aspect-[3/4] object-cover object-top rounded-2xl transition-all duration-500 shadow-xl"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-[#8B1A4A] font-bold uppercase tracking-[0.3em] mb-3 text-sm">Leadership</p>
                  <h2 className="font-headline text-4xl font-extrabold text-[#8B1A4A] mb-3">
                    Led by a Pioneer in<br />Robotic Joint Replacement
                  </h2>
                  <h3 className="text-2xl font-bold text-[#4A4A4A] mb-5 italic">{branch.doctor.name}</h3>
                  <p className="text-[#4A4A4A] text-lg leading-relaxed mb-8">{branch.doctor.bio}</p>
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="bg-surface-container-low rounded-2xl p-5 text-center">
                      <p className="text-3xl font-black text-[#8B1A4A]">{branch.doctor.surgeries}</p>
                      <p className="text-xs font-bold uppercase text-[#4A4A4A] mt-1">Procedures</p>
                    </div>
                    <div className="bg-surface-container-low rounded-2xl p-5 text-center">
                      <p className="text-3xl font-black text-[#8B1A4A]">{branch.doctor.successRate}</p>
                      <p className="text-xs font-bold uppercase text-[#4A4A4A] mt-1">Success Rate</p>
                    </div>
                    <div className="bg-surface-container-low rounded-2xl p-5 text-center">
                      <p className="text-3xl font-black text-[#8B1A4A]">{branch.doctor.experience}+</p>
                      <p className="text-xs font-bold uppercase text-[#4A4A4A] mt-1">Years Exp.</p>
                    </div>
                  </div>
                  <button className="bg-[#8B1A4A] text-white px-10 py-4 rounded-full font-label font-bold uppercase tracking-widest hover:bg-[#8B1A4A]-container transition-all">
                    View Chairman's Message
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* ── 5. INFRASTRUCTURE ── */}
          {branch.infrastructure && (
            <section className="py-20 bg-surface-container-low px-8">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                  <h2 className="font-headline text-4xl font-extrabold text-[#8B1A4A] tracking-tight uppercase mb-3">
                    Precision Ecosystem
                  </h2>
                  <p className="text-[#4A4A4A] max-w-2xl mx-auto">
                    We invest in the future of healthcare so you can invest in your health.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {branch.infrastructure.map((item, i) => (
                    <div key={i} className="group relative rounded-3xl overflow-hidden h-80">
                      <img
                        src={i === 0
                          ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsy4QyvBAKqMc5jm3QR4_8UqR5L8nBrBgSREo9VuccfjCP3HBJs0ziEeXOzXDxHo0B3FHdgZ94q_LEkHTkaduFMpK7zhxxI5IWdcvN-1EW4X966vG-PKPso_lzppnnHlGyDyIMsO28rwYH6wDicKFOGBFapr15cRMuWLdd7kHDCSeiZIIlZVlSJHQkqMo4S7-j0KlCMmDIP3hLCOb2cYxW_Hg7zw1YIrLHAd8sA7shqELw9iCyfi6M_vOzb255-_fJs3YgQtG8S1g'
                          : 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkocaQxiMvMjVnD-a1ILZHkSv0qki-DziBAXey5cwaDbJPVJvUPjnQjskOai_Q8_37liZrGjoFcMZ8_ODtSqXvJiNU2tF5rt-YivEOSUkYsCfTRhxw7tIRSaqIU_zuodeWQLdnc0uAaaD3izQ6GubO1gO8RfpQyAGriwKDkRABilUPTxf1BlBpDfHmSA4rKljqGXmFIZu_9LwdTZcG6j84B2RphtdSEII3i5Oc5ICvuC_nANM4MerXxn9dvzbIe4fwaYrRonxFrbs'
                        }
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} to-transparent flex flex-col justify-end p-8`}>
                        <h4 className="text-white font-headline text-2xl font-bold mb-2">{item.title}</h4>
                        <p className="text-white/80 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── 6. LOCATION & REVIEWS ── */}
          {branch.googleMapEmbed && (
            <section className="py-24 bg-surface px-8">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="order-2 lg:order-1">
                    <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white h-[450px]">
                      <iframe
                        src={branch.googleMapEmbed}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <span className="text-[#2D3A4A] font-black uppercase tracking-[0.3em] mb-4 block text-sm">Visit our Facility</span>
                    <h2 className="font-headline text-4xl md:text-5xl font-black text-[#8B1A4A] tracking-tight mb-8">
                      Locate {branch.title} <br />
                      <span className="text-[#2D3A4A] italic">Hospitals.</span>
                    </h2>
                    
                    <div className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant/30 mb-8 flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center text-[#8B1A4A]">
                        <MapPin className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-[#8B1A4A]">{branch.address}</p>
                        <p className="text-[#4A4A4A] text-sm mt-1">{branch.phone}</p>
                      </div>
                    </div>

                    <div className="bg-[#8B1A4A] text-white p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-8 opacity-10">
                         <Star className="w-32 h-32 rotate-12" />
                       </div>
                       <div className="relative z-10">
                          <p className="text-xs font-black uppercase tracking-[0.4em] text-[#2D3A4A] mb-4">Patient Validation</p>
                          <div className="flex items-center gap-4 mb-6">
                            <span className="text-[5rem] font-black leading-none tracking-tighter">{branch.googleRating || '4.8'}</span>
                            <div className="flex flex-col">
                              <div className="flex gap-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-6 h-6 fill-secondary text-[#2D3A4A]" />
                                ))}
                              </div>
                              <span className="text-lg font-bold opacity-80">Google Reviews</span>
                            </div>
                          </div>
                          <p className="text-white/70 text-lg leading-relaxed italic mb-0">
                            "Trusted by over <span className="text-white font-black">{branch.googleReviewCount || '5,000+'}</span> patients in {branch.title} for precision care and clinical excellence."
                          </p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

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
                  <p className="opacity-90 font-medium">{branch.title} Branch — Emergency Trauma Support 24/7</p>
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

        </div>{/* end xl:pl-16 */}

        <AppointmentWidget currentBranch={branch} />
        <Footer />
        <MobileBottomNav />
      </div>
    </>
  )
}
