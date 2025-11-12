import SITE from "../../Site/Site";
import { Check } from "../../Icons/Check";

export function Hero(){
  return (
    <section className="bg-gray-100 border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold">Verkoop je auto snel met <span className="text-indigo-700">ByeCar.nl</span></h1>
          <p className="mt-4 text-lg max-w-prose leading-relaxed">Vraag gratis een bod aan, plan de overdracht en ontvang veilige betaling. Zonder gedoe.</p>
          <ul className="mt-6 space-y-3 font-medium">
            <li className="flex gap-2 items-center"><Check/> Binnen 1 werkdag een bod</li>
            <li className="flex gap-2 items-center"><Check/> Ophalen aan huis mogelijk</li>
            <li className="flex gap-2 items-center"><Check/> Directe en veilige uitbetaling</li>
          </ul>
          <a href="#aanvraag" className="mt-8 inline-block rounded-md bg-indigo-700 px-6 py-3 text-white font-semibold hover:bg-indigo-800 shadow">Ontvang mijn bod</a>
        </div>
        <img src={SITE.HERO_IMAGE} alt="Auto verkopen ByeCar.nl" className="rounded-xl shadow-lg border border-gray-300" width={1200} height={800} loading="eager"/>
      </div>
    </section>
  );
}
export default Hero;