import React, { Link,useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const CheckDNA = () => {
          
  const formRef = React.useRef(); // add at top of component
  const navigate = useNavigate();

  const [dark, setDark] = useState(false);
  const toggleDark     = () => setDark(!dark);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const [errors, setErrors] = useState({});

  const [skin, setSkin]                 = useState("");
  const [intolerances, setIntolerances] = useState([]);
  const [color, setColor]               = useState("");
  const [mood, setMood]                 = useState("");
  const [skinConcern, setSkinConcern]   = useState("");
  const [skinTone, setSkinTone]         = useState("");
  const [hairType, setHairType]         = useState("");
  const [scalp, setScalp]               = useState("");
  const [sunExposure, setSunExposure]   = useState("");
  const [climate, setClimate]           = useState("");
  const [activity, setActivity]         = useState("");
  const [sleep, setSleep]               = useState("");
  const [healthGoal, setHealthGoal]     = useState("");
  const [supplements, setSupplements]   = useState([]);
  const [caffeine, setCaffeine]         = useState("");
  const [hydration, setHydration]       = useState(0);
  const [stressors, setStressors]       = useState([]);
  const [relax, setRelax]               = useState("");
  const [scent, setScent]               = useState("");
  const [texture, setTexture]           = useState("");
  const [packaging, setPackaging]       = useState("");
  const [budget, setBudget]             = useState("");
  const [crueltyFree, setCrueltyFree]   = useState(false);


  const handleArrayChange = (e, stateArray, setter) => {
    const { value, checked } = e.target;
    if (checked) setter([...stateArray, value]);
    else         setter(stateArray.filter((i) => i !== value));
  };

  const validate = () => {
    const err = {};
    if (!skin)          err.skin          = "Skin type is required.";
    if (!skinConcern)   err.skinConcern   = "Primary skin concern is required.";
    if (!skinTone)      err.skinTone      = "Skin tone is required.";
    if (!hairType)      err.hairType      = "Hair type is required.";
    if (!scalp)         err.scalp         = "Scalp condition is required.";
    if (!sunExposure)   err.sunExposure   = "Sun exposure is required.";
    if (!climate)       err.climate       = "Climate type is required.";
    if (!activity)      err.activity      = "Activity level is required.";
    if (!sleep)         err.sleep         = "Sleep quality is required.";
    if (!healthGoal)    err.healthGoal    = "Health goal is required.";
    if (!caffeine)      err.caffeine      = "Caffeine intake is required.";
    if (!color)         err.color         = "Colour palette is required.";
    if (!mood)          err.mood          = "Mood tendency is required.";
    if (!relax)         err.relax         = "Relaxation preference is required.";
    if (!scent)         err.scent         = "Fragrance family is required.";
    if (!texture)       err.texture       = "Texture preference is required.";
    if (!packaging)     err.packaging     = "Packaging choice is required.";
    if (!budget)        err.budget        = "Budget range is required.";
    if (intolerances.length === 0) err.intolerances = "Select at least one intolerance.";
    if (hydration < 4)  err.hydration     = "Drink at least 4 glasses per day 😉";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length) { setErrors(err); return; }
    setErrors({});
    const dnaProfile = {
      skin, intolerances, color, mood,
      skinConcern, skinTone, hairType, scalp,
      sunExposure, climate, activity, sleep,
      healthGoal, supplements, caffeine, hydration,
      stressors, relax, scent,
      texture, packaging, budget, crueltyFree,
    };
    localStorage.setItem("dnaProfile", JSON.stringify(dnaProfile));
    navigate("/loading");
  };

  return (
    <div
      className="relative w-full h-screen bg-cover overflow-y-auto dark:bg-gray-900 dark:text-white"
      style={{ backgroundImage: "url('/image/genome.jpg')" }}
    >

      <button
        onClick={toggleDark}
        className="absolute top-4 right-4 p-2 rounded-full shadow
                   bg-gray-200 dark:bg-gray-700 transition"
        aria-label="Theme toggle"
      >
        {dark ? "🌙" : "☀️"}
      </button>


      <div
        className="bg-white dark:bg-gray-800 text-black dark:text-white
                   p-5 max-w-xl mx-auto mt-10 rounded-xl shadow-lg
                   transition-colors duration-300"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">🧬 DNA Profile Input</h1>
        <div className="animate-bounce text-gray-400 text-center text-xl mt-2">⬇️</div>


        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-6 overflow-y-auto max-h-[80vh] pr-2"
        >


          <Section title="Skin Basics">
            <Select label="Skin Type" value={skin} setter={setSkin}
              options={{ sensitive:"Sensitive", normal:"Normal", oily:"Oily" }}
              error={errors.skin} />
            <Select label="Primary Skin Concern" value={skinConcern} setter={setSkinConcern}
              options={{ acne:"Acne", dryness:"Dryness", redness:"Redness",
                        hyperpigmentation:"Hyper‑pigmentation", aging:"Aging" }}
              error={errors.skinConcern} />
            <Select label="Fitzpatrick Phototype" value={skinTone} setter={setSkinTone}
              options={{ I:"I – Very fair", II:"II", III:"III", IV:"IV", V:"V", VI:"VI – Very dark" }}
              error={errors.skinTone} />
          </Section>


          <Section title="Hair & Scalp">
            <Select label="Hair Type" value={hairType} setter={setHairType}
              options={{ straight:"Straight", wavy:"Wavy", curly:"Curly", coily:"Coily" }}
              error={errors.hairType} />
            <Select label="Scalp Condition" value={scalp} setter={setScalp}
              options={{ dry:"Dry", oily:"Oily", balanced:"Balanced", dandruff:"Dandruff‑prone" }}
              error={errors.scalp} />
          </Section>

          <Section title="Lifestyle & Environment">
            <Select label="Daily Sun Exposure" value={sunExposure} setter={setSunExposure}
              options={{ "<30":"<30 min", "30-60":"30‑60 min", ">60":">1 hr" }}
              error={errors.sunExposure} />
            <Select label="Typical Climate" value={climate} setter={setClimate}
              options={{ humid:"Humid", dry:"Dry", cold:"Cold", hot:"Hot", variable:"Variable" }}
              error={errors.climate} />
            <Select label="Activity Level" value={activity} setter={setActivity}
              options={{ sedentary:"Sedentary", light:"Light", moderate:"Moderate", high:"Very active" }}
              error={errors.activity} />
            <Select label="Sleep Quality" value={sleep} setter={setSleep}
              options={{ poor:"Poor", average:"Average", good:"Good" }}
              error={errors.sleep} />
          </Section>


          <Section title="Dietary Intolerances">
            {["lactose","gluten","nuts"].map((i) => (
              <Checkbox key={i} label={cap(i)} value={i}
                checked={intolerances.includes(i)}
                onChange={(e) => handleArrayChange(e, intolerances, setIntolerances)} />
            ))}
            {errors.intolerances &&
              <p className="text-red-500 text-sm mt-1">{errors.intolerances}</p>}
          </Section>


          <Section title="Wellness Goals">
            <Select label="Primary Health Goal" value={healthGoal} setter={setHealthGoal}
              options={{ "weight-loss":"Weight‑loss", "muscle-gain":"Muscle‑gain",
                        maintenance:"Maintenance", "energy-boost":"Energy boost" }}
              error={errors.healthGoal} />
            <div>
              <label className="block font-medium mb-1">Preferred Supplements</label>
              <div className="flex flex-wrap gap-4">
                {["vitamin C","omega‑3","probiotics","collagen"].map((i) => {
                  const val = i.replace(/\s+/g,"");
                  return (
                    <Checkbox key={val} label={i} value={val}
                      checked={supplements.includes(val)}
                      onChange={(e) => handleArrayChange(e, supplements, setSupplements)} />
                  );
                })}
              </div>
            </div>
            <Select label="Caffeine Intake" value={caffeine} setter={setCaffeine}
              options={{ none:"None", "<100":"<100 mg/day", "100-300":"100‑300 mg/day", ">300":">300 mg/day" }}
              error={errors.caffeine} />
            <Slider label="Hydration (glasses/day)" value={hydration} setter={setHydration}
              min={0} max={12} error={errors.hydration} />
          </Section>

          <Section title="Mind & Mood">
            <Select label="Mood Tendency" value={mood} setter={setMood}
              options={{ dopamine:"Dopamine‑driven", serotonin:"Serotonin‑seeking" }}
              error={errors.mood} />
            <div>
              <label className="block font-medium mb-1">Stress Triggers</label>
              <div className="flex flex-wrap gap-4">
                {["work","study","family","social"].map((i) => (
                  <Checkbox key={i} label={cap(i)} value={i}
                    checked={stressors.includes(i)}
                    onChange={(e) => handleArrayChange(e, stressors, setStressors)} />
                ))}
              </div>
            </div>
            <Select label="Relaxation Preference" value={relax} setter={setRelax}
              options={{ meditation:"Meditation", exercise:"Exercise", music:"Music", reading:"Reading" }}
              error={errors.relax} />
            <Select label="Preferred Fragrance Family" value={scent} setter={setScent}
              options={{ citrus:"Citrus", floral:"Floral", woody:"Woody", fresh:"Fresh", oriental:"Oriental" }}
              error={errors.scent} />
          </Section>

          <Section title="Product & Ethical Preferences">
            <Select label="Texture Preference" value={texture} setter={setTexture}
              options={{ gel:"Gel", cream:"Cream", serum:"Serum", oil:"Oil" }}
              error={errors.texture} />
            <Select label="Packaging Priority" value={packaging} setter={setPackaging}
              options={{ eco:"Eco‑friendly", refill:"Refillable",
                        premium:"Premium", minimalist:"Minimalist" }}
              error={errors.packaging} />
            <Select label="Budget Range (₹/month)" value={budget} setter={setBudget}
              options={{ "<500":"<500", "500-1500":"500‑1500",
                        "1500-3000":"1500‑3000", ">3000":">3000" }}
              error={errors.budget} />
            <Checkbox label="Must be cruelty‑free" value="crueltyFree"
              checked={crueltyFree} onChange={() => setCrueltyFree(!crueltyFree)} />
          </Section>

        
          <Section title="Colour Preference">
            <Select label="Palette" value={color} setter={setColor}
              options={{ bright:"Bright colours", calm:"Calm tones" }}
              error={errors.color} />
          </Section>

        
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded
                       hover:bg-blue-700 hover:scale-105 transition-all
                       duration-300 shadow-md"
          >
            Analyze My DNA →
          </button>
        
        </form>
      </div>

      <ScrollTopBtn targetRef={formRef} />

    </div>
  );
};

const Section = ({ title, children }) => (
  <fieldset
    className="border border-gray-300 rounded mx-6 my-4 p-4
               hover:scale-105 hover:shadow-lg hover:-translate-y-1
               transition-transform duration-300 ease-in-out transform
               relative z-10 origin-top"
  >
    <legend className="px-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
      {title}
    </legend>
    <div className="mt-2 space-y-3">{children}</div>
  </fieldset>
);

const Select = ({ label, value, setter, options, error }) => (
  <div>
    <label className="block font-medium mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => setter(e.target.value)}
      className={`w-full p-2 border rounded focus:outline-none transition
         bg-white text-black dark:bg-gray-800 dark:text-white
        ${error
          ? "border-red-500 focus:ring-2 focus:ring-red-500"
          : "border-gray-300 focus:ring-2 focus:ring-blue-500"}`}
    >
      <option value="">-- Select --</option>
      {Object.entries(options).map(([val, text]) => (
        <option key={val} value={val}>
          {text}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const Checkbox = ({ label, value, checked, onChange }) => (
  <label className="flex items-center gap-1">
    <input
      type="checkbox"
      value={value}
      checked={checked}
      onChange={onChange}
      className="accent-blue-600"
    />
    {label}
  </label>
);

const Slider = ({ label, value, setter, min, max, error }) => (
  <div>
    <label className="block font-medium mb-1">
      {label}: <span className="font-semibold">{value}</span>
    </label>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => setter(Number(e.target.value))}
      className="w-full"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const ScrollTopBtn = ({ targetRef }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = targetRef?.current;
    if (!el) return;

    const onScroll = () => setShow(el.scrollTop > 200);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [targetRef]);

  if (!show) return null;

  return (
    <button
      onClick={() => targetRef?.current?.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white
                 text-black text-xl shadow-lg hover:scale-110
                 transition-transform"
      aria-label="Back to top"
    >
      ↑
    </button>
  );
};


const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export default CheckDNA;
