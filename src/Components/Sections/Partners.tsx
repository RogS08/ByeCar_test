import { SITE } from '../../Site/Site';

export function Partners(){
  return (
    <section className="border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white py-12 shadow-inner">
      <h3 className="text-center text-xl font-bold mb-8 tracking-tight">In samenwerking met betrouwbare partners</h3>
      <div className="flex flex-wrap justify-center gap-10">
        {SITE.PARTNERS.map(p=> (
          <div key={p.alt} className="flex flex-col items-center">
            <img src={p.src} alt={p.alt} className="h-14 md:h-16 w-[140px] object-contain opacity-90 hover:opacity-100 transition rounded grayscale hover:grayscale-0"/>
            <p className="text-xs text-gray-600 mt-2 font-medium">{p.alt}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Partners;