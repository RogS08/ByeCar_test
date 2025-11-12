import React, { useEffect, useRef, useState } from "react";

// ---------- Config ----------
const API_ENDPOINT = "http://localhost:4000/api/sendemail"; // Vul eventueel een endpoint in
const MAIL_TO = "";
const SUBMIT_LABEL = "Bod aanvragen";

type TechChoice = "goed" | "redelijk" | "slecht" | "onbekend";

// ---------- Icons (indigo-600) ----------
const baseIcon = "inline-block align-middle text-indigo-600";
const IconShield = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false" className={`${baseIcon} w-6 h-6 mr-2`} {...props}>
    <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8.5 12.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const IconFlash = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false" className={`${baseIcon} w-6 h-6`} {...props}>
    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);
const IconMail = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false" className={`${baseIcon} w-4 h-4 mr-1`} {...props}>
    <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const IconPhone = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false" className={`${baseIcon} w-4 h-4 mr-1`} {...props}>
    <path d="M6 2h4l1 4-2 1a11 11 0 0 0 6 6l1-2 4 1v4a2 2 0 0 1-2 2C8.268 22 2 15.732 2 8a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);
const IconMapPin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false" className={`${baseIcon} w-4 h-4 mr-1`} {...props}>
    <path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="10" r="2" fill="currentColor" />
  </svg>
);
const IconImage = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false" className={`${baseIcon} w-4 h-4 mr-1`} {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 15l3-3 3 3 3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="9" r="1.5" fill="currentColor" />
  </svg>
);
const IconUpload = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden focusable="false" className={`${baseIcon}`} {...props}>
    <path d="M12 16V7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M8.5 10L12 6.5 15.5 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 17.5A2.5 2.5 0 0 0 6.5 20h11A2.5 2.5 0 0 0 20 17.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const IconEdit = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false" className={`${baseIcon} w-4 h-4 mr-1`} {...props}>
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M14.06 6.19l2.12-2.12a1.5 1.5 0 0 1 2.12 0l1.63 1.63a1.5 1.5 0 0 1 0 2.12L17.93 9.94" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
const IconQuestion = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false" className={`${baseIcon} w-4 h-4`} {...props}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <path d="M9.5 9a3 3 0 1 1 5 2.4c-.5.37-1 .73-1 1.6M12 16.5h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const IconX = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false" className={`${baseIcon} w-4 h-4`} {...props}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const IconMinus = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false" className={`${baseIcon} w-4 h-4`} {...props}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <path d="M8 12h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const IconCheck = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false" className={`${baseIcon} w-4 h-4`} {...props}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <path d="M8 12.5l3 3 5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconOdometer = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false" className={`${baseIcon} w-4 h-4 mr-1`} {...props}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 12l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);

// ---------- Kenteken formatter ----------
const SIDE_CODES: { re: RegExp; fmt: (s: string) => string }[] = [
  { re: /^(\d{2})([A-Z]{2})([A-Z]{2})$/, fmt: (s) => s.replace(/^(\d{2})([A-Z]{2})([A-Z]{2})$/, "$1-$2-$3") },
  { re: /^(\d{2})([A-Z]{3})(\d)$/, fmt: (s) => s.replace(/^(\d{2})([A-Z]{3})(\d)$/, "$1-$2-$3") },
  { re: /^(\d)([A-Z]{3})(\d{2})$/, fmt: (s) => s.replace(/^(\d)([A-Z]{3})(\d{2})$/, "$1-$2-$3") },
  { re: /^([A-Z]{2})(\d{3})([A-Z])$/, fmt: (s) => s.replace(/^([A-Z]{2})(\d{3})([A-Z])$/, "$1-$2-$3") },
  { re: /^([A-Z])(\d{3})([A-Z]{2})$/, fmt: (s) => s.replace(/^([A-Z])(\d{3})([A-Z]{2})$/, "$1-$2-$3") },
  { re: /^([A-Z]{3})(\d{2})([A-Z])$/, fmt: (s) => s.replace(/^([A-Z]{3})(\d{2})([A-Z])$/, "$1-$2-$3") },
];
function formatPlate(raw: string) {
  const up = raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
  for (const sc of SIDE_CODES) if (sc.re.test(up)) return sc.fmt(up);
  if (/^[A-Z]{2}\d{3}[A-Z]$/.test(up)) return up.replace(/^([A-Z]{2})(\d{3})([A-Z])$/, "$1-$2-$3");
  return raw.toUpperCase().replace(/[^A-Z0-9-]/g, "");
}

// ---------- Reusable controls ----------
function RadioIcons({ name, value, onChange, label }: { name: string; value: TechChoice; onChange: (v: TechChoice) => void; label: string; }) {
  const opts: { val: TechChoice; text: string; Icon: (p: React.SVGProps<SVGSVGElement>) => JSX.Element; cls: string }[] = [
    { val: "goed", text: "Goed", Icon: IconCheck, cls: "text-indigo-600" },
    { val: "redelijk", text: "Redelijk", Icon: IconMinus, cls: "text-indigo-600" },
    { val: "slecht", text: "Slecht", Icon: IconX, cls: "text-indigo-600" },
    { val: "onbekend", text: "Onbekend", Icon: IconQuestion, cls: "text-indigo-600" },
  ];
  return (
    <fieldset className="w-full rounded-md border border-gray-200 bg-white p-1.5 shadow-none" aria-label={label}>
      <legend className="text-[11px] font-semibold text-gray-900 mb-0.5">{label}</legend>
      <div role="radiogroup" aria-label={label} className="flex flex-wrap items-center gap-0.5">
        {opts.map((o) => {
          const id = `${name}-${o.val}`;
          const active = value === o.val;
          return (
            <div key={o.val} className="inline-flex items-center">
              <input id={id} type="radio" name={name} value={o.val} checked={active} onChange={() => onChange(o.val)} className="sr-only" />
              <label
                htmlFor={id}
                title={`${label}: ${o.text}`}
                className={
                  "inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[11px] leading-4 whitespace-nowrap cursor-pointer select-none transition " +
                  (active ? "border-indigo-600 ring-1 ring-indigo-200 bg-white" : "border-gray-300 bg-white hover:bg-gray-50")
                }
              >
                <o.Icon className={"w-2 h-2 " + (active ? "text-indigo-600" : o.cls)} />
                <span className="font-medium text-gray-900">{o.text}</span>
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}

function LicensePlateInput({ value, onChange, error }: { value: string; onChange: (v: string) => void; error?: string }) {
  return (
    <div className="w-full max-w-md mx-auto text-center">
      <label htmlFor="kenteken" className="block text-sm font-semibold text-gray-900 mb-2">Kenteken</label>
      <div className="mx-auto flex items-center justify-center rounded-xl overflow-hidden shadow ring-1 ring-gray-300" aria-invalid={!!error}>
        <div className="flex items-center justify-center w-14 h-14 bg-[#003399] relative">
          <svg viewBox="0 0 36 36" className="absolute" width="36" height="36" aria-hidden>
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 - 90) * Math.PI / 180; const cx = 18 + 12 * Math.cos(angle); const cy = 18 + 12 * Math.sin(angle);
              return <polygon key={i} points="0,-2 0.59,-0.68 1.9,-0.62 0.95,0.23 1.31,1.5 0,0.8 -1.31,1.5 -0.95,0.23 -1.9,-0.62 -0.59,-0.68" transform={`translate(${cx} ${cy})`} fill="#FFD100" />
            })}
          </svg>
          <span className="relative z-10 text-white text-xs font-bold tracking-widest">NL</span>
        </div>
        <div className="flex-1 bg-[#FFD100] h-14 flex items-center px-3">
          <input
            id="kenteken"
            autoComplete="off"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="99-XXX-9"
            aria-describedby={error ? "kenteken-error" : undefined}
            className="w-full appearance-none bg-transparent text-black font-extrabold tracking-widest uppercase text-2xl text-center outline-none placeholder-black/60 selection:bg-black/10"
          />
        </div>
      </div>
      {error && (<p id="kenteken-error" role="alert" className="text-sm text-red-700 mt-1">{error}</p>)}
    </div>
  );
}

function USPBar() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 px-5 py-2 bg-indigo-50 border-b border-indigo-100 text-sm text-gray-800 font-medium">
      <span>✔ Gratis</span>
      <span>✔ Binnen 24 uur reactie</span>
      <span>✔ Ophalen op locatie</span>
    </div>
  );
}

// ---------- Form ----------
function LeadForm2Step() {
  type Step1 = { kenteken: string; email: string; telefoon: string; postcode: string; huisnummer: string; };
  type Step2 = { kilometerstand: string; spoed: boolean; tweeSleutels: boolean; isZakelijk: boolean; btwAuto: boolean; onderhoudHist: boolean; onderhoudKm: string; onderhoudTotKm: string; fotos?: File[] | null; motor: TechChoice; versnellingsbak: TechChoice; onderstel: TechChoice; remmen: TechChoice; banden: TechChoice; airco: TechChoice; beschrijving: string; geschattePrijs: string; hoogsteBodElders: string; stuurFotosExtern: boolean; };

  const [s1, setS1] = useState<Step1>({ kenteken: "", email: "", telefoon: "", postcode: "", huisnummer: "" });
  const [s2, setS2] = useState<Step2>({ kilometerstand: "", spoed: false, tweeSleutels: false, isZakelijk: false, btwAuto: false, onderhoudHist: false, onderhoudKm: "", onderhoudTotKm: "", fotos: null, motor: "onbekend", versnellingsbak: "onbekend", onderstel: "onbekend", remmen: "onbekend", banden: "onbekend", airco: "onbekend", beschrijving: "", geschattePrijs: "", hoogsteBodElders: "", stuurFotosExtern: false });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState<0 | 1>(0);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<null | "ok" | "err">(null);

  const step1Ref = useRef<HTMLDivElement | null>(null);
  const step2Ref = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number | "auto">("auto");
  useEffect(() => {
    function measure() { const el = step === 0 ? step1Ref.current : step2Ref.current; if (el) setHeight(el.offsetHeight + 24); }
    measure();
    const ro = new ResizeObserver(measure as ResizeObserverCallback);
    if (step1Ref.current) ro.observe(step1Ref.current);
    if (step2Ref.current) ro.observe(step2Ref.current);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, [step]);

  function onPlateChange(v: string) { setS1((p) => ({ ...p, kenteken: formatPlate(v) })); }
  function onPostcodeBlur() { setS1((p) => ({ ...p, postcode: p.postcode.replace(/\s+/g, "").toUpperCase() })); }

  function validateStep0(d: Step1) {
    const e: Record<string, string> = {};
    const up = d.kenteken.toUpperCase();
    if (!/[A-Z0-9]-/.test(up)) { const normalized = up.replace(/[^A-Z0-9]/g, ""); if (normalized.length < 5) e.kenteken = "Vul een geldig kenteken in."; }
    if (!/.+@.+\..+/.test(d.email)) e.email = "Vul een geldig e-mailadres in.";
    if (d.telefoon.replace(/\D/g, "").length < 8) e.telefoon = "Vul een geldig telefoonnummer in.";
    if (!/^\d{4}[A-Z]{2}$/.test(d.postcode.replace(/\s+/g, "").toUpperCase())) e.postcode = "Vul een geldige postcode in (1234AB).";
    if (!d.huisnummer) e.huisnummer = "Vul je huisnummer in.";
    return e;
  }
  function validateStep2() {
    const e: Record<string, string> = {};
    if (!/^[0-9]{1,7}$/.test(s2.kilometerstand)) e.kilometerstand = "Vul een juiste kilometerstand in.";
    if (s2.onderhoudKm && !/^[0-9]{1,7}$/.test(s2.onderhoudKm)) e.onderhoudKm = "Gebruik alleen cijfers.";
    if (s2.onderhoudHist && s2.onderhoudTotKm && !/^[0-9]{1,7}$/.test(s2.onderhoudTotKm)) e.onderhoudTotKm = "Gebruik alleen cijfers.";
    if (s2.geschattePrijs && !/^[0-9]{1,9}$/.test(s2.geschattePrijs)) e.geschattePrijs = "Gebruik alleen cijfers.";
    if (s2.hoogsteBodElders && !/^[0-9]{1,9}$/.test(s2.hoogsteBodElders)) e.hoogsteBodElders = "Gebruik alleen cijfers.";
    return e;
  }

  function next() { const e = validateStep0(s1); setErrors(e); if (Object.keys(e).length === 0) setStep(1); }
  function back() { setStep(0); }


  // async function submit(ev: React.FormEvent) {
  //   ev.preventDefault();
  //   const e2 = validateStep2();
  //   setErrors((prev) => ({ ...prev, ...e2 }));
  //   if (Object.keys(e2).length > 0) return;

  //   setSending(true); setDone(null);
  //   try {
  //     const payload = { to: MAIL_TO, subject: `Nieuwe auto-aanvraag – ${s1.kenteken || "onbekend"}`, step1: s1, step2: s2 };
  //     //if (!API_ENDPOINT) { await new Promise((r) => setTimeout(r, 200)); console.info("[DEMO] would mail:", payload); setDone("ok"); setSending(false); return; }
  //     const res = await fetch(API_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  //     console.log(payload);
  //     if (!res.ok) throw new Error("server");
  //     setDone("ok");
  //   } catch { setDone("err"); } finally { setSending(false); }
  // }




  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const e2 = validateStep2();
    setErrors((prev) => ({ ...prev, ...e2 }));
    if (Object.keys(e2).length > 0) return;

    setSending(true);
    setDone(null);

    try {
      const formData = new FormData();

      formData.append('step1', JSON.stringify(s1));
      formData.append('step2', JSON.stringify(s2));

      // Append photo files if they exist
      if (s2.fotos && s2.fotos.length > 0) {
        for (const file of s2.fotos) {
          formData.append('fotos', file);
        }
      }

      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        body: formData
      });

      console.log("Form submitted with", s2.fotos?.length || 0, "fotos");

      if (!res.ok) throw new Error("server");

      const result = await res.json();
      console.log("Server response:", result);

      setDone("ok");
    } catch (error) {
      console.error("Submit error:", error);
      setDone("err");
    } finally {
      setSending(false);
    }
  }

  const slideClass = step === 0 ? "translate-x-0" : "-translate-x-full";
  const slideClass2 = step === 1 ? "translate-x-0" : "translate-x-full";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden" >
      <USPBar />

      <form onSubmit={submit} aria-labelledby="form-legend">
        {/* Vooruitgang */}
        <div className="px-5 py-2 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="flex items-center justify-between text-sm font-medium text-gray-700">
            <span aria-current={step === 0 ? "step" : undefined}>Stap {step === 0 ? 1 : 2} van 2</span>
            <span>{step === 0 ? "Basisgegevens" : "Details"}</span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-gray-100" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={step === 0 ? 50 : 100}>
            <div className={"h-2 rounded-full bg-indigo-600 transition-all duration-300 " + (step === 0 ? "w-1/2" : "w-full")}></div>
          </div>
        </div>

        {/* Vertrouwen */}
        <div className="px-5 pt-3 space-y-2" aria-live="polite">
          <div className="flex items-start gap-3 rounded-md border border-emerald-200 bg-emerald-50 text-emerald-800 p-3">
            <IconShield />
            <p className="text-sm">Jouw gegevens worden veilig verwerkt. We delen niets zonder jouw toestemming.</p>
          </div>
        </div>

        {/* Slides container */}
        <div className="relative w-full overflow-hidden" style={{ height: typeof height === "number" ? `${height}px` : "auto" }}>
          {/* STAP 1 */}
          <div ref={step1Ref} className={"px-5 py-5 transition-transform duration-500 ease-out " + slideClass}>
            <fieldset className="flex flex-col items-center gap-6" aria-describedby="step1-hint">
              <legend id="form-legend" className="sr-only">Stap 1 van 2: Basisgegevens</legend>

              <LicensePlateInput value={s1.kenteken} onChange={onPlateChange} error={errors.kenteken} />

              <div className="w-full max-w-md grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1"><IconMail />E-mailadres</label>
                  <input id="email" name="email" type="email" autoComplete="email" value={s1.email} onChange={(e) => setS1((p) => ({ ...p, email: e.target.value }))} placeholder="naam@voorbeeld.nl" className="mt-1 w-full rounded-xl border border-indigo-200 bg-indigo-50/60 px-3 py-2 text-base text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
                  {errors.email && (<p id="email-error" role="alert" className="text-sm text-red-700 mt-1">{errors.email}</p>)}
                </div>
                <div>
                  <label htmlFor="telefoon" className="block text-sm font-medium mb-1"><IconPhone />Telefoonnummer</label>
                  <input id="telefoon" name="telefoon" inputMode="tel" autoComplete="tel" value={s1.telefoon} onChange={(e) => setS1((p) => ({ ...p, telefoon: e.target.value }))} placeholder="06 1234 5678" className="mt-1 w-full rounded-xl border border-indigo-200 bg-indigo-50/60 px-3 py-2 text-base text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600" aria-invalid={!!errors.telefoon} aria-describedby={errors.telefoon ? "telefoon-error" : undefined} />
                  {errors.telefoon && (<p id="telefoon-error" role="alert" className="text-sm text-red-700 mt-1">{errors.telefoon}</p>)}
                </div>
              </div>

              <div className="w-full max-w-md grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div>
                  <label htmlFor="postcode" className="block text-sm font-medium mb-1"><IconMapPin />Postcode</label>
                  <input id="postcode" name="postcode" value={s1.postcode} onChange={(e) => setS1((p) => ({ ...p, postcode: e.target.value }))} onBlur={onPostcodeBlur} placeholder="1234AB" pattern="^[0-9]{4}[A-Za-z]{2}$" className="mt-1 w-full rounded-xl border border-indigo-200 bg-indigo-50/60 px-3 py-2 text-base text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600" aria-invalid={!!errors.postcode} aria-describedby={errors.postcode ? "postcode-error" : undefined} />
                  {errors.postcode && (<p id="postcode-error" role="alert" className="text-sm text-red-700 mt-1">{errors.postcode}</p>)}
                </div>
                <div>
                  <label htmlFor="huisnummer" className="block text-sm font-medium mb-1"><IconMapPin />Huisnummer</label>
                  <input id="huisnummer" name="huisnummer" inputMode="numeric" value={s1.huisnummer} onChange={(e) => setS1((p) => ({ ...p, huisnummer: e.target.value }))} placeholder="10" className="mt-1 w-full rounded-xl border border-indigo-200 bg-indigo-50/60 px-3 py-2 text-base text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600" aria-invalid={!!errors.huisnummer} aria-describedby={errors.huisnummer ? "huisnummer-error" : undefined} />
                  {errors.huisnummer && (<p id="huisnummer-error" role="alert" className="text-sm text-red-700 mt-1">{errors.huisnummer}</p>)}
                </div>
                {/* Spoedophaalservice */}
                <div className="md:col-span-2">
                  <div className="flex items-start justify-between gap-3 rounded-md border border-amber-300 bg-amber-50 text-amber-800 p-3">
                    <div className="flex items-start gap-3">
                      <IconFlash />
                      <div>
                        <p className="text-base font-bold text-amber-800">Spoedophaalservice</p>
                        <p className="text-xs text-amber-800">Vandaag aangevraagd, de eerstvolgende werkdag opgehaald</p>
                      </div>
                    </div>
                    <label htmlFor="spoedtoggle" className="inline-flex items-center cursor-pointer">
                      <input id="spoedtoggle" aria-label="Spoedophaalservice aanzetten" type="checkbox" checked={s2.spoed} onChange={(e) => setS2(p => ({ ...p, spoed: e.target.checked }))} className="sr-only peer" />
                      <div className="relative w-10 h-5 bg-gray-700 border border-gray-800 rounded-full transition-colors peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-amber-700 peer-checked:bg-amber-600 after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-[2px] after:h-4 after:w-4 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-[18px]" aria-hidden></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button type="button" onClick={next} className="rounded-2xl bg-amber-600 text-white font-bold text-sm px-5 py-3 shadow hover:opacity-95 active:opacity-90" aria-label="Ga naar stap 2">Ga verder</button>
              </div>
            </fieldset>
          </div>

          {/* STAP 2 */}
          <div ref={step2Ref} className={"absolute top-0 left-0 w-full px-5 py-5 pb-28 md:pb-6 transition-transform duration-500 ease-out " + slideClass2}>
            <fieldset className="grid md:grid-cols-2 gap-5 items-start" aria-describedby="step2-hint">
              <legend className="sr-only">Stap 2 van 2: Details</legend>

              {/* Compact grid voor 4 items */}
              <div className="md:col-span-2 grid sm:grid-cols-2 gap-3">
                {/* Sleutels */}
                <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 flex items-center justify-between">
                  <span className="text-sm">Twee sleutels aanwezig</span>
                  <label htmlFor="sleutel" className="inline-flex items-center cursor-pointer">
                    <input id="sleutel" type="checkbox" checked={s2.tweeSleutels} onChange={(e) => setS2((p) => ({ ...p, tweeSleutels: e.target.checked }))} className="sr-only peer" />
                    <div className="relative w-10 h-5 bg-gray-700 border border-gray-800 rounded-full transition-colors peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-amber-700 peer-checked:bg-amber-600 after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-[2px] after:h-4 after:w-4 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-[18px]" aria-hidden></div>
                  </label>
                </div>

                {/* Type + BTW */}
                <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                  <span className="block text-sm font-medium mb-1">Type</span>
                  <div role="radiogroup" aria-label="Type" className="inline-flex rounded-lg border border-gray-300 overflow-hidden shadow-sm">
                    {([{ v: "particulier", l: "Particulier" }, { v: "zakelijk", l: "Zakelijk" }] as const).map(({ v, l }, i) => (
                      <label key={v} className={"px-2 py-1 text-xs font-medium cursor-pointer select-none " + (s2.isZakelijk === (v === "zakelijk") ? "bg-indigo-600 text-white" : "bg-white text-gray-800 hover:bg-gray-50") + (i > 0 ? " border-l border-gray-300" : "")}>
                        <input className="sr-only" type="radio" name="type" value={v} checked={s2.isZakelijk === (v === "zakelijk")} onChange={() => setS2((p) => ({ ...p, isZakelijk: v === "zakelijk" }))} />
                        {l}
                      </label>
                    ))}
                  </div>
                  {s2.isZakelijk && (
                    <div className="mt-2 flex items-center justify-between rounded border border-gray-200 bg-white px-2 py-1">
                      <span className="text-xs">BTW-auto</span>
                      <label htmlFor="btw" className="inline-flex items-center cursor-pointer">
                        <input id="btw" type="checkbox" checked={s2.btwAuto} onChange={(e) => setS2((p) => ({ ...p, btwAuto: e.target.checked }))} className="sr-only peer" />
                        <div className="relative w-10 h-5 bg-gray-700 border border-gray-800 rounded-full transition-colors peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-amber-700 peer-checked:bg-amber-600 after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-[2px] after:h-4 after:w-4 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-[18px]" aria-hidden></div>
                      </label>
                    </div>
                  )}
                </div>

                {/* Onderhoudshistorie */}
                <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Onderhoudshistorie aanwezig</span>
                    <label htmlFor="hist" className="inline-flex items-center cursor-pointer">
                      <input id="hist" type="checkbox" checked={s2.onderhoudHist} onChange={(e) => setS2((p) => ({ ...p, onderhoudHist: e.target.checked }))} className="sr-only peer" />
                      <div className="relative w-10 h-5 bg-gray-700 border border-gray-800 rounded-full transition-colors peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-amber-700 peer-checked:bg-amber-600 after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-[2px] after:h-4 after:w-4 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-[18px]" aria-hidden></div>
                    </label>
                  </div>
                  {s2.onderhoudHist && (
                    <div className="mt-2">
                      <label htmlFor="onderhoudTotKm" className="block text-xs font-medium mb-1">Aanwezig tot kilometerstand</label>
                      <input
                        id="onderhoudTotKm"
                        name="onderhoudTotKm"
                        inputMode="numeric"
                        value={s2.onderhoudTotKm}
                        onChange={(e) => setS2((p) => ({ ...p, onderhoudTotKm: e.target.value }))}
                        placeholder="Bijv. 145000"
                        className="w-full rounded-lg border border-indigo-200 bg-white px-2 py-1.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        aria-invalid={!!errors.onderhoudTotKm}
                        aria-describedby={errors.onderhoudTotKm ? "onderhoudTotKm-error" : undefined}
                      />
                      {errors.onderhoudTotKm && (<p id="onderhoudTotKm-error" role="alert" className="text-xs text-red-700 mt-1">{errors.onderhoudTotKm}</p>)}
                    </div>
                  )}
                </div>

                {/* Kilometerstand */}
                <div className="rounded-md border border-gray-200 bg-white px-3 py-2">
                  <label htmlFor="kilometerstand" className="block text-sm font-medium mb-1"><IconOdometer />Kilometerstand</label>
                  <input id="kilometerstand" name="kilometerstand" inputMode="numeric" value={s2.kilometerstand} onChange={(e) => setS2((p) => ({ ...p, kilometerstand: e.target.value }))} placeholder="123456" className="mt-1 w-full rounded-lg border border-indigo-200 bg-indigo-50/60 px-3 py-2 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600" aria-invalid={!!errors.kilometerstand} aria-describedby={errors.kilometerstand ? "km-error" : undefined} />
                  {errors.kilometerstand && (<p id="km-error" role="alert" className="text-sm text-red-700 mt-1">{errors.kilometerstand}</p>)}
                </div>
              </div>

              {/* Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1"><IconImage />Foto’s uploaden</label>
                <div>
                  <label
                    htmlFor="file-upload"
                    aria-label="Klik om foto’s te uploaden"
                    className={
                      "group flex flex-col items-center justify-center w-full rounded-xl border px-4 py-6 text-center cursor-pointer select-none transition " +
                      (s2.stuurFotosExtern
                        ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "border-dashed border-indigo-300 bg-indigo-50/50 hover:bg-indigo-50 text-gray-700")
                    }
                    aria-disabled={s2.stuurFotosExtern}
                  >
                    <IconUpload />
                    <span className="mt-2 text-sm font-semibold">Sleep je foto’s hierheen of klik om te kiezen</span>
                    <span className="text-xs text-gray-600">JPG of PNG, max 10 MB per foto</span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = e.target.files ? Array.from(e.target.files) : null;
                      setS2((p) => ({ ...p, fotos: files }));
                    }}
                    disabled={s2.stuurFotosExtern}
                    className="sr-only"
                  />
                  <p className="mt-1 text-xs text-gray-600">
                    {s2.fotos && s2.fotos.length > 0
                      ? (s2.fotos.length === 1 ? "1 bestand geselecteerd" : `${s2.fotos.length} bestanden geselecteerd`)
                      : "Nog geen bestanden geselecteerd"}
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between rounded-md border border-emerald-200 bg-emerald-50 text-emerald-800 p-3">
                  <div className="flex items-start gap-3">
                    <IconShield className="w-6 h-6" />
                    <div>
                      <p className="text-sm font-bold">Ik stuur foto's na de aanvraag via WhatsApp of e-mail.</p>
                      <p className="text-xs text-emerald-700">E-mail: <span className="font-semibold">foto@byecar.nl</span> • WhatsApp: <span className="font-semibold">0612550032</span>.</p>
                    </div>
                  </div>
                  <label htmlFor="whtoggle" className="inline-flex items-center cursor-pointer">
                    <input id="whtoggle" type="checkbox" checked={s2.stuurFotosExtern} onChange={(e) => setS2(p => ({ ...p, stuurFotosExtern: e.target.checked }))} className="sr-only peer" />
                    <div className="relative w-10 h-5 bg-gray-700 border border-gray-800 rounded-full transition-colors peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-amber-700 peer-checked:bg-amber-600 after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-[2px] after:h-4 after:w-4 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-[18px]" aria-hidden></div>
                  </label>
                </div>
              </div>

              {/* Techniek radio's, compact */}
              <div className="md:col-span-2 grid md:grid-cols-2 gap-2">
                <RadioIcons name="motor" label="Motor" value={s2.motor} onChange={(v) => setS2((p) => ({ ...p, motor: v }))} />
                <RadioIcons name="versnellingsbak" label="Versnellingsbak" value={s2.versnellingsbak} onChange={(v) => setS2((p) => ({ ...p, versnellingsbak: v }))} />
                <RadioIcons name="onderstel" label="Onderstel" value={s2.onderstel} onChange={(v) => setS2((p) => ({ ...p, onderstel: v }))} />
                <RadioIcons name="remmen" label="Remmen" value={s2.remmen} onChange={(v) => setS2((p) => ({ ...p, remmen: v }))} />
                <RadioIcons name="banden" label="Banden" value={s2.banden} onChange={(v) => setS2((p) => ({ ...p, banden: v }))} />
                <RadioIcons name="airco" label="Airconditioning" value={s2.airco} onChange={(v) => setS2((p) => ({ ...p, airco: v }))} />
              </div>

              {/* Beschrijving + verwachting */}
              <div className="md:col-span-2">
                <label htmlFor="beschrijving" className="block text-sm font-medium mb-1"><IconEdit />Beschrijving</label>
                <textarea id="beschrijving" name="beschrijving" value={s2.beschrijving} onChange={(e) => setS2((p) => ({ ...p, beschrijving: e.target.value }))} placeholder="Vertel iets over de auto. Bijzonderheden, onderhoud, schade, opties." className="mt-1 w-full rounded-2xl border border-indigo-200 bg-indigo-50/60 px-3 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600" />
              </div>
              <div className="md:col-span-2 grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="verwachtePrijs" className="block text-sm font-medium mb-1"><IconEdit />Wat verwacht je voor je auto?</label>
                  <input id="verwachtePrijs" name="verwachtePrijs" value={s2.geschattePrijs} onChange={(e) => setS2((p) => ({ ...p, geschattePrijs: e.target.value }))} placeholder="Bijv. 9000 (optioneel)" inputMode="numeric" className="mt-1 w-full rounded-xl border border-indigo-200 bg-indigo-50/60 px-3 py-2 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600" aria-invalid={!!errors.geschattePrijs} aria-describedby={errors.geschattePrijs ? "verwachtePrijs-error" : undefined} />
                  {errors.geschattePrijs && (<p id="verwachtePrijs-error" role="alert" className="text-sm text-red-700 mt-1">{errors.geschattePrijs}</p>)}
                  <p className="text-xs text-gray-600 mt-1">Vul je eigen verwachting of een ontvangen bod in (optioneel).</p>
                </div>
              </div>

            </fieldset>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <button type="button" onClick={back} className="rounded-2xl bg-white border border-gray-300 text-gray-800 font-semibold px-5 py-3 shadow-sm hover:bg-gray-50">Terug</button>
              <div className="hidden md:flex items-center gap-3">
                <p className="text-xs text-gray-600 mr-2">We gebruiken je gegevens alleen voor deze aanvraag. <a className="underline" href="#privacy">Privacy</a></p>
                <button disabled={sending || Object.keys(validateStep0(s1)).length > 0} type="submit" className="rounded-2xl bg-amber-600 text-white font-bold px-4 py-2.5 shadow disabled:opacity-50">{sending ? "Versturen..." : SUBMIT_LABEL}</button>
              </div>
            </div>

            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3.5 flex items-center justify-between">
              <p className="text-xs text-gray-600">We gebruiken je gegevens alleen voor deze aanvraag.</p>
              <button disabled={sending || Object.keys(validateStep0(s1)).length > 0} type="submit" className="rounded-2xl bg-amber-600 text-white font-bold px-3.5 py-2.5 shadow disabled:opacity-50">{sending ? "Versturen..." : SUBMIT_LABEL}</button>
            </div>
          </div>
        </div>

        <div className="px-5 pb-4" aria-live="polite" aria-atomic="true">
          {done === "ok" && (
            <div className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-emerald-800">
              {(() => {
                const ref = Math.random().toString(36).slice(2, 8).toUpperCase();
                return <span>Bedankt. Je aanvraag is ontvangen. Je referentie: <strong>{ref}</strong>. We reageren binnen 24 uur.</span>;
              })()}
              <div className="mt-2"><button type="button" className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm hover:bg-gray-50">Plan direct een mogelijke ophaaltijd</button></div>
            </div>
          )}
          {done === "err" && (
            <div className="mt-4 rounded-md border border-red-50 bg-red-50 p-3 text-red-700">Er ging iets mis. Probeer het later opnieuw.</div>
          )}
        </div>
      </form>
    </div>
  );
}

// ---------- Tests ----------
function runPlateTests() {
  const cases: [string, string][] = [
    ["12ABCD", "12-AB-CD"], ["12ABC3", "12-ABC-3"], ["1ABC23", "1-ABC-23"], ["AB123C", "AB-123-C"],
    ["A123BC", "A-123-BC"], ["ABC12D", "ABC-12-D"], ["12-ab-cd", "12-AB-CD"], ["12 AB CD", "12-AB-CD"],
    ["12-AB-CD", "12-AB-CD"], ["ab 123 c", "AB-123-C"], ["a123bc", "A-123-BC"], ["ab-12 3c", "AB-123-C"],
    ["XYZ--", "XYZ--"], ["99XXX9", "99-XXX-9"], [" 12abc3 ", "12-ABC-3"], ["AB 123 C", "AB-123-C"], ["aa000a", "AA000A"]
  ];
  for (const [input, expected] of cases) {
    const out = formatPlate(input);
    console.assert(out === expected, `Kenteken test faalde: ${input} -> ${out} (verwacht ${expected})`);
  }
}
runPlateTests();

export default function Demo() {
  return (
    <>
      <style>{`
        /* Globale fontinstelling */
        :root, body, #root, #__next, .font-root {
          font-family: "Segoe UI", SegoeUI, "Segoe UI Web", Inter, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", system-ui, -apple-system, BlinkMacSystemFont, Tahoma, Geneva, Verdana, sans-serif;
        }
        * { font-family: inherit; }
        button, input, select, textarea { font-family: inherit; }

        /* Kenteken altijd geel, ook bij autofill */
        input#kenteken:-webkit-autofill,
        input#kenteken:-webkit-autofill:hover,
        input#kenteken:-webkit-autofill:focus,
        input#kenteken:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0px 1000px #FFD100 inset !important;
          box-shadow: 0 0 0px 1000px #FFD100 inset !important;
          -webkit-text-fill-color: #000 !important;
          caret-color: #000 !important;
        }
        input#kenteken:autofill,
        input#kenteken:-moz-autofill {
          box-shadow: 0 0 0 1000px #FFD100 inset !important;
          -moz-text-fill-color: #000 !important;
        }
      `}</style>
      <div className="mx-auto max-w-2xl p-4 font-root">
        <LeadForm2Step />
      </div>
    </>
  );
}
