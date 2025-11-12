export function TrustpilotBadge(): JSX.Element {
  return (
    <a href="#trust" className="block rounded-xl border border-gray-300 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 text-[#00B67A] font-bold">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
        Trustpilot
      </div>
      <div className="mt-2 flex items-end gap-2">
        <div className="text-2xl font-extrabold text-gray-900">4.8<span className="text-base text-gray-700">/5</span></div>
        <div className="text-amber-500 leading-none">★★★★★</div>
      </div>
      <div className="text-xs text-gray-600 mt-1">124+ reviews</div>
    </a>
  );
}
export default TrustpilotBadge;