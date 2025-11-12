export function TrustStrip() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-gray-200">
      {['Transparant proces', 'Kentekencheck', 'Veilige uitbetaling', 'Afspraak = afspraak'].map(txt => (
        <div key={txt} className="text-sm font-semibold rounded-full border-2 border-gray-300 bg-gray-100 px-4 py-2 text-center shadow-sm">{txt}</div>
      ))}
    </div>
  );
}
export default TrustStrip;