import React, { useEffect, useRef, useState } from 'react';
import { SITE } from '../Site/Site';
import { TrustpilotBadge } from '../Third-Party services/Trustpilot';


const sanitize = (v:string) => (v||'').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,6);
const PATTERNS = [
  /^([0-9]{2})([A-Z]{2})([A-Z]{2})$/,
  /^([0-9]{2})([A-Z]{3})([0-9])$/,
  /^([0-9])([A-Z]{3})([0-9]{2})$/,
  /^([A-Z]{2})([0-9]{3})([A-Z])$/,
  /^([A-Z])([0-9]{3})([A-Z]{2})$/,
  /^([A-Z]{3})([0-9]{2})([0-9])$/
];
function formatPlate(raw:string){
  const up = sanitize(raw);
  for (const re of PATTERNS){ const m = up.match(re); if (m){ return { formatted: `${m[1]}-${m[2]}-${m[3]}`, ok:true }; } }
  return { formatted: up, ok:false };
}




 export function LeadForm(){
  type Errors = Partial<{ kenteken:string; email:string; akkoord:string; km:string; postcode:string; phone:string }>;
  const [form,setForm] = useState<{ kenteken:string; km:string; email:string; phone:string; postcode:string; urgent24:boolean; akkoord:boolean }>({ kenteken:'', km:'', email:'', phone:'', postcode:'', urgent24:false, akkoord:false });
  const [errors,setErrors] = useState<Errors>({});
  const [status,setStatus] = useState<'idle'|'ok'|'stored'|'err'>('idle');
  const plateRef = useRef<HTMLInputElement|null>(null);
  useEffect(()=>{ plateRef.current?.focus(); },[]);

  function onChange(e:React.ChangeEvent<HTMLInputElement>){
    const {name,type,checked,value} = e.target;
    if (name==='kenteken') return setForm(p=>({...p,kenteken: sanitize(value)}));
    if (name==='km') return setForm(p=>({...p,km: (value||'').replace(/\D/g,'').slice(0,7)}));
    if (name==='postcode') return setForm(p=>({...p,postcode: (value||'').replace(/\D/g,'').slice(0,4)}));
    setForm(p=>({...p,[name]: type==='checkbox'? checked : value} as any));
  }

  function validate(){
    const e:Errors = {};
    if (sanitize(form.kenteken).length!==6) e.kenteken='Vul je kenteken (6 tekens) in.';
    if (!form.km) e.km='Vul de kilometerstand in.';
    if (!form.email) e.email='Vul je e‑mail in.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email='Voer een geldig e‑mailadres in.';
    if (form.postcode && !/^[0-9]{4}$/.test(form.postcode)) e.postcode='Postcode bestaat uit 4 cijfers.';
    if (!form.akkoord) e.akkoord='Vink aan dat we je mogen benaderen.';
    setErrors(e); return !Object.keys(e).length;
  }

  async function onSubmit(e:React.FormEvent){
    e.preventDefault();
    if (!validate()) return;
    const plate = formatPlate(form.kenteken).formatted;
    const payload = { ...form, kenteken: plate, ts: new Date().toISOString(), page: typeof window!=='undefined'? location.href:'' };
    try{
      const key='byecar_leads'; const arr = JSON.parse(localStorage.getItem(key)||'[]'); arr.push(payload); localStorage.setItem(key,JSON.stringify(arr));
      setStatus('stored');
    }catch{ setStatus('ok'); }
  }

  const plate = formatPlate(form.kenteken).formatted;

  return (
    <section id="aanvraag" className="py-6">
      <div className="rounded-xl bg-white p-6 border border-gray-300 shadow-sm">
        <h2 className="text-2xl font-bold mb-1">Ontvang je bod</h2>
        <p className="text-sm text-gray-700 mb-4">Gratis & vrijblijvend. Wij reageren binnen één werkdag.</p>
        <form onSubmit={onSubmit} noValidate className="grid md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="kenteken" className="block text-sm font-semibold mb-1">Kenteken *</label>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-[50px] bg-[#003399] rounded-l-md grid place-items-center"><span className="text-white text-[10px] font-bold">NL</span></div>
              <input ref={plateRef} id="kenteken" name="kenteken" value={plate} onChange={onChange} placeholder="ABC-12-D"
                className={`pl-[60px] text-center font-black text-[28px] leading-none rounded-md h-[60px] w-full border-4 ${errors.kenteken? 'border-red-500':'border-[#003399]'} bg-[#FFCC00] placeholder-gray-700 outline-none tracking-[0.25em]`} />
            </div>
            {errors.kenteken && <p className="text-red-700 text-sm mt-1">{errors.kenteken}</p>}

            <div className="grid md:grid-cols-2 gap-4 mt-3">
              <div>
                <label htmlFor="km" className="block text-sm font-semibold mb-1">Kilometerstand *</label>
                <input id="km" name="km" inputMode="numeric" value={form.km} onChange={onChange} placeholder="123500"
                  className={`w-full rounded-md border-2 px-3 py-3 text-lg placeholder-gray-500 outline-none ${errors.km? 'border-red-500':'border-gray-400 focus:border-indigo-700 focus:ring-2 focus:ring-indigo-700'}`} />
                {errors.km && <p className="text-red-700 text-sm mt-1">{errors.km}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-1">E‑mail *</label>
                <input type="email" id="email" name="email" value={form.email} onChange={onChange} placeholder="jij@voorbeeld.nl"
                  className={`w-full rounded-md border-2 px-3 py-3 text-lg placeholder-gray-500 outline-none ${errors.email? 'border-red-500':'border-gray-400 focus:border-indigo-700 focus:ring-2 focus:ring-indigo-700'}`} />
                {errors.email && <p className="text-red-700 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-3">
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold mb-1">Telefoon (optioneel)</label>
                <input id="phone" name="phone" inputMode="tel" value={form.phone} onChange={onChange} placeholder="06 1234 5678"
                  className={`w-full rounded-md border-2 px-3 py-3 text-lg placeholder-gray-500 outline-none ${errors.phone? 'border-red-500':'border-gray-400 focus:border-indigo-700 focus:ring-2 focus:ring-indigo-700'}`} />
                {errors.phone && <p className="text-red-700 text-sm mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="postcode" className="block text-sm font-semibold mb-1">Postcode (optioneel)</label>
                <input id="postcode" name="postcode" inputMode="numeric" value={form.postcode} onChange={onChange} placeholder="1234"
                  className={`w-full rounded-md border-2 px-3 py-3 text-lg placeholder-gray-500 outline-none ${errors.postcode? 'border-red-500':'border-gray-400 focus:border-indigo-700 focus:ring-2 focus:ring-indigo-700'}`} />
                {errors.postcode && <p className="text-red-700 text-sm mt-1">{errors.postcode}</p>}
              </div>
            </div>

            <div className="mt-3 rounded-md border-2 border-amber-400 bg-amber-50 p-3 shadow-sm">
              <label htmlFor="urgent24" className="flex items-start gap-3 cursor-pointer">
                <input id="urgent24" name="urgent24" type="checkbox" checked={form.urgent24} onChange={onChange} className="mt-1" />
                <span className="text-sm">
                  <span className="inline-flex items-center gap-2 font-bold text-amber-800">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>
                    Spoedophaalservice (binnen 24 uur)
                  </span>
                  <span className="block text-xs text-gray-700 mt-1">We plannen dit met prioriteit en nemen direct contact op.</span>
                </span>
              </label>
            </div>

            <div className="mt-3 flex items-start gap-3">
              <input id="akkoord" name="akkoord" type="checkbox" checked={form.akkoord} onChange={onChange} />
              <label htmlFor="akkoord" className="text-sm">Ik ga akkoord dat ByeCar.nl contact met mij opneemt en met het privacy statement.</label>
            </div>
            {errors.akkoord && <p className="-mt-2 text-sm text-red-700">{errors.akkoord}</p>}

            <button type="submit" className="mt-4 w-full rounded-md bg-amber-500 px-6 py-3 text-white font-bold text-lg hover:bg-amber-600">Verstuur aanvraag</button>
            {status==='stored' && <p className="mt-3 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded p-3">Dankjewel! Je aanvraag is opgeslagen. We nemen snel contact met je op.</p>}
            {status==='ok' && <p className="mt-3 text-sm text-emerald-700">Dankjewel! Je aanvraag is verstuurd.</p>}
            {status==='err' && <p className="mt-3 text-sm text-red-700">Er ging iets mis bij het versturen. Probeer het opnieuw of mail ons op <a className="underline" href={`mailto:${SITE.BRAND_EMAIL}`}>{SITE.BRAND_EMAIL}</a>.</p>}
          </div>



          <div>
            <TrustpilotBadge />
          </div>
        </form>
      </div>
    </section>
  );
}
export default LeadForm;