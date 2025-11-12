export function HowItWorks(){
  const steps = ['Vul het formulier in','Ontvang een bod','Plan de overdracht','Direct betaald'];
  return (
    <section id="hoe-werkt-het" className="py-10">
      <h2 className="text-3xl font-bold mb-6">Hoe het werkt</h2>
      <div className="grid md:grid-cols-4 gap-6">
        {steps.map((t,i)=>(
          <div key={i} className="p-6 border-2 border-gray-300 bg-white rounded-xl shadow-sm hover:shadow-md transition">
            <div className="text-indigo-800 font-bold mb-2">Stap {i+1}</div>
            <p className="leading-relaxed">{t}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
export default HowItWorks;