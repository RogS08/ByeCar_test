import { SITE } from '../../Site/Site';
import WhatsAppIcon from './WhatsAppIcon';


const waHref = () => `https://wa.me/${SITE.WHATSAPP_PHONE.replace(/[^+\d]/g,'')}?text=${encodeURIComponent(SITE.WHATSAPP_MESSAGE)}`;

export function WhatsAppFloating(){
  return (
    <a href={waHref()} target="_blank" rel="noopener noreferrer" aria-label="Chat via WhatsApp"
       className="fixed bottom-4 right-4 md:bottom-6 md:right-6 rounded-full shadow-lg bg-emerald-500 hover:bg-emerald-600 text-white w-14 h-14 grid place-items-center">
      <WhatsAppIcon className="w-7 h-7"/>
    </a>
  );
}
export default WhatsAppFloating;



