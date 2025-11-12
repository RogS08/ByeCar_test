import WhatsAppIcon from '../../Third-Party services/WhatsApp/WhatsAppIcon';
import { SITE } from '../../Site/Site';

const waHref = () => `https://wa.me/${SITE.WHATSAPP_PHONE.replace(/[^+\d]/g,'')}?text=${encodeURIComponent(SITE.WHATSAPP_MESSAGE)}`;

export function Header(){
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-6xl px-4 h-[84px] flex items-center justify-between">
        <a href="#" aria-label="Home"><img src={SITE.LOGO_URL} alt="ByeCar logo" className="h-[68px] w-auto" /></a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#hoe-werkt-het" className="hover:text-indigo-700">Hoe het werkt</a>
          <a href="#faq" className="hover:text-indigo-700">FAQ</a>
          <a href={waHref()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700" aria-label="WhatsApp">
            <WhatsAppIcon className="w-5 h-5"/> WhatsApp
          </a>
          <a href="#aanvraag" className="rounded-md bg-amber-500 px-5 py-2 text-white font-semibold hover:bg-amber-600">Ontvang mijn bod</a>
        </nav>
      </div>
    </header>
  );
}
export default Header;