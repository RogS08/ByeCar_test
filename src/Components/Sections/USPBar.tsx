import { Check } from "../../Icons/Check";

export function USPBar(){
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-4 py-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
        {['Vrijblijvend bod','Ophalen aan huis','Directe uitbetaling','RDW‑vrijwaring'].map(x=>
          <div key={x} className="flex items-center gap-2 font-semibold"><Check/>{x}</div>) }
      </div>
    </div>
  );
}

export default USPBar;