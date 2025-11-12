export function Assurances(){
  const items=[
    { t:'Geen verplichtingen', d:'Je aanvraag is 100% gratis en vrijblijvend.' },
    { t:'Veilige betaling', d:'Betaling bij overdracht via je bank.' },
    { t:'Eerlijke prijzen', d:'Wij zijn duidelijk over waardering en voorwaarden.' }
  ];
  return (
    <section className="py-10 bg-gray-50 border-t border-b border-gray-200">
      <div className="grid md:grid-cols-3 gap-6">
        {items.map(x=> (
          <div key={x.t} className="rounded-xl bg-white p-6 border-2 border-gray-300 shadow-sm">
            <h4 className="font-bold text-indigo-800 mb-2">{x.t}</h4>
            <p>{x.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Assurances;