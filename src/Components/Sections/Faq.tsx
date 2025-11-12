export 
function FAQ(){
  const list=[
    { q:'Wat kost dit?', a:'De aanvraag is gratis en vrijblijvend.' },
    { q:'Wanneer krijg ik een bod?', a:'Binnen één werkdag.' },
    { q:'Halen jullie de auto op?', a:'Ja, ophalen is mogelijk.' },
    { q:'Wanneer krijg ik het geld?', a:'Bij overdracht.' }
  ];
  return (
    <section id="faq" className="py-12 bg-gray-50 border-t border-b border-gray-200">
      <h2 className="text-3xl font-bold mb-6">Veelgestelde vragen</h2>
      <div className="grid gap-4">
        {list.map(item=> (
          <details key={item.q} className="group rounded-lg bg-white border-2 border-gray-300 p-5 shadow-sm">
            <summary className="cursor-pointer font-semibold flex justify-between items-center">{item.q}<span className="text-indigo-700">⌄</span></summary>
            <p className="mt-2 leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default FAQ;