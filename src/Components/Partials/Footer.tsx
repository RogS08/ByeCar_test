import WhatsAppIcon from '../../Third-Party services/WhatsApp/WhatsAppIcon';
import { SITE } from '../../Site/Site';


const waHref = () => `https://wa.me/${SITE.WHATSAPP_PHONE.replace(/[^+\d]/g,'')}?text=${encodeURIComponent(SITE.WHATSAPP_MESSAGE)}`;

export function Footer(){
  return (
    <footer className="border-t-2 border-gray-300 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-3 gap-6 text-sm text-gray-800">
        <div>
          <img src={SITE.LOGO_URL} alt="ByeCar logo" className="h-[84px] mb-3"/>
          <p>ByeCar.nl – jouw partner voor een eerlijke autoverkoop.</p>
        </div>
        <div>
          <h4 className="font-bold mb-2 text-indigo-800">Contact</h4>
          <p>E‑mail: <a href={`mailto:${SITE.BRAND_EMAIL}`} className="underline underline-offset-2 hover:text-indigo-700">{SITE.BRAND_EMAIL}</a><br/>
             Telefoon: <a href={`tel:${SITE.BRAND_PHONE}`} className="underline underline-offset-2 hover:text-indigo-700">{SITE.BRAND_PHONE}</a></p>
          <p className="mt-2"><a href={waHref()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-semibold"><WhatsAppIcon className="w-4 h-4"/> WhatsApp-chat openen</a></p>
        </div>
        <div>
          <h4 className="font-bold mb-2 text-indigo-800">Juridisch</h4>
          <a href="#" className="block hover:text-indigo-700">Privacy</a>
          <a href="#" className="block hover:text-indigo-700">Algemene voorwaarden</a>
        </div>
      </div>
      <div className="text-center text-xs text-gray-700 py-4 border-t border-gray-200">© {new Date().getFullYear()} ByeCar.nl</div>
    </footer>
  );
}
export default Footer;
