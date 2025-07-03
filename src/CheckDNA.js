import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const CheckDNA = () => {
  const formRef = useRef();
  const navigate = useNavigate();

  const [dark, setDark] = useState(false);
  const toggleDark = () => setDark(!dark);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const [errors, setErrors] = useState({});

  const [skin, setSkin] = useState("");
  const [skinConcern, setSkinConcern] = useState("");
  const [skinTone, setSkinTone] = useState("");
  const [hairType, setHairType] = useState("");
  const [scalp, setScalp] = useState("");

  const [sunExposure, setSunExposure] = useState("");
  const [climate, setClimate] = useState("");
  const [activity, setActivity] = useState("");
  const [sleep, setSleep] = useState("");

  const [intolerances, setIntolerances] = useState([]);
  const [healthGoal, setHealthGoal] = useState("");
  const [supplements, setSupplements] = useState([]);
  const [caffeine, setCaffeine] = useState("");
  const [hydration, setHydration] = useState(0);

  const [bodyShape, setBodyShape] = useState("");
  const [bodySkinConcerns, setBodySkinConcerns] = useState([]);
  const [musclePain, setMusclePain] = useState([]);
  const [injuryHistory, setInjuryHistory] = useState("");
  const [posture, setPosture] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("dnaProfile");
    if (saved) {
      const data = JSON.parse(saved);
      setSkin(data.skin || "");
      setSkinConcern(data.skinConcern || "");
      setSkinTone(data.skinTone || "");
      setHairType(data.hairType || "");
      setScalp(data.scalp || "");
      setSunExposure(data.sunExposure || "");
      setClimate(data.climate || "");
      setActivity(data.activity || "");
      setSleep(data.sleep || "");
      setIntolerances(data.intolerances || []);
      setHealthGoal(data.healthGoal || "");
      setSupplements(data.supplements || []);
      setCaffeine(data.caffeine || "");
      setHydration(data.hydration || 0);
      setBodyShape(data.bodyShape || "");
      setBodySkinConcerns(data.bodySkinConcerns || []);
      setMusclePain(data.musclePain || []);
      setInjuryHistory(data.injuryHistory || "");
      setPosture(data.posture || "");
      setWeight(data.weight || "");
      setHeight(data.height || "");
    }
  }, []);

  const handleArrayChange = (e, stateArray, setter) => {
    const { value, checked } = e.target;
    if (checked) setter([...stateArray, value]);
    else setter(stateArray.filter((i) => i !== value));
  };

  const validate = () => {
    const err = {};
    if (!skin) err.skin = "Skin type is required.";
    if (!skinConcern) err.skinConcern = "Body skin concern is required.";
    if (!skinTone) err.skinTone = "Skin tone is required.";
    if (!hairType) err.hairType = "Hair type is required.";
    if (!scalp) err.scalp = "Scalp condition is required.";
    if (!sunExposure) err.sunExposure = "Sun exposure is required.";
    if (!climate) err.climate = "Climate type is required.";
    if (!activity) err.activity = "Activity level is required.";
    if (!sleep) err.sleep = "Sleep quality is required.";
    if (intolerances.length === 0) err.intolerances = "Select at least one intolerance.";
    if (!healthGoal) err.healthGoal = "Health goal is required.";
    if (!caffeine) err.caffeine = "Caffeine intake is required.";
    if (hydration < 4) err.hydration = "Drink at least 4 glasses per day 😉";
    if (!bodyShape) err.bodyShape = "Body shape / fitness level is required.";
    if (bodySkinConcerns.length === 0) err.bodySkinConcerns = "Select at least one body skin concern.";
    if (musclePain.length === 0) err.musclePain = "Select muscle pain / soreness areas.";
    if (!injuryHistory) err.injuryHistory = "Injury history is required.";
    if (!posture) err.posture = "Posture / back pain status is required.";
    if (!weight || weight <= 0) err.weight = "Enter valid weight.";
    if (!height || height <= 0) err.height = "Enter valid height.";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length) return setErrors(err);
    setErrors({});

    const dnaProfile = {
      skin, skinConcern, skinTone, hairType, scalp,
      sunExposure, climate, activity, sleep,
      intolerances, healthGoal, supplements, caffeine, hydration,
      bodyShape, bodySkinConcerns, musclePain,
      injuryHistory, posture, weight, height,
    };
    localStorage.setItem("dnaProfile", JSON.stringify(dnaProfile));
    navigate("/loading");
  };

  return (
    <div
      className="relative w-full h-screen bg-cover overflow-y-auto dark:bg-gray-900 dark:text-white"
      style={{ backgroundImage: "url('/image/genome.jpg')" }}>
      <button
        onClick={toggleDark}
        className="absolute top-4 right-4 p-2 rounded-full shadow bg-gray-200 dark:bg-gray-700 transition"
        aria-label="Theme toggle">
        {dark ? "🌙" : "☀️"}
      </button>

      <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-5 max-w-xl mx-auto mt-10 rounded-xl shadow-lg transition-colors duration-300">
        <h1 className="text-2xl font-bold mb-4 text-center">🧬 Body Profile Input</h1>
        <div className="animate-bounce text-gray-400 text-center text-xl mt-2">⬇️</div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 overflow-y-auto max-h-[80vh] pr-2">
          <Section title="Skin, Hair & Scalp">
            <Select label="Skin Type" value={skin} setter={setSkin} options={{ sensitive: "Sensitive", normal: "Normal", oily: "Oily" }} error={errors.skin} />
            <Select label="Body Skin Concern" value={skinConcern} setter={setSkinConcern} options={{ dryness: "Dryness", roughness: "Roughness", pigmentation: "Pigmentation" }} error={errors.skinConcern} />
            <Select label="Fitzpatrick Phototype" value={skinTone} setter={setSkinTone} options={{ I: "I – Very fair", II: "II", III: "III", IV: "IV", V: "V", VI: "VI – Very dark" }} error={errors.skinTone} />
            <Select label="Hair Type" value={hairType} setter={setHairType} options={{ straight: "Straight", wavy: "Wavy", curly: "Curly", coily: "Coily" }} error={errors.hairType} />
            <Select label="Scalp Condition" value={scalp} setter={setScalp} options={{ dry: "Dry", oily: "Oily", balanced: "Balanced", "dandruff-prone": "Dandruff‑prone" }} error={errors.scalp} />
          </Section>

          <Section title="Lifestyle & Environment">
            <Select label="Daily Sun Exposure" value={sunExposure} setter={setSunExposure} options={{ "<30": "<30 min", "30-60": "30‑60 min", ">60": ">1 hr" }} error={errors.sunExposure} />
            <Select label="Typical Climate" value={climate} setter={setClimate} options={{ humid: "Humid", dry: "Dry", cold: "Cold", hot: "Hot", variable: "Variable" }} error={errors.climate} />
            <Select label="Activity Level" value={activity} setter={setActivity} options={{ sedentary: "Sedentary", light: "Light", moderate: "Moderate", high: "Very active" }} error={errors.activity} />
            <Select label="Sleep Quality" value={sleep} setter={setSleep} options={{ poor: "Poor", average: "Average", good: "Good" }} error={errors.sleep} />
          </Section>

          <Section title="Nutrition & Hydration">
            <Select label="Primary Health Goal" value={healthGoal} setter={setHealthGoal} options={{ "weight-loss": "Weight‑loss", "muscle gain": "Muscle gain", maintenance: "Maintenance", "energy-boost": "Energy boost" }} error={errors.healthGoal} />
            <Select label="Caffeine Intake" value={caffeine} setter={setCaffeine} options={{ none: "None", "<100": "<100 mg/day", "100-300": "100‑300 mg/day", ">300": ">300 mg/day" }} error={errors.caffeine} />
            <Slider label="Hydration (glasses/day)" value={hydration} setter={setHydration} min={0} max={12} error={errors.hydration} />
            <div>
              <label className="block font-medium mb-1">Dietary Intolerances</label>
              {["lactose", "gluten", "nuts"].map((i) => (
                <Checkbox key={i} label={cap(i)} value={i} checked={intolerances.includes(i)} onChange={(e) => handleArrayChange(e, intolerances, setIntolerances)} />
              ))}
              {errors.intolerances && <p className="text-red-500 text-sm mt-1">{errors.intolerances}</p>}
            </div>
            <div>
              <label className="block font-medium mb-1">Preferred Supplements</label>
              <div className="flex flex-wrap gap-4">
                {["vitaminC", "omega‑3", "probiotics", "collagen"].map((i) => {
                  return (
                    <Checkbox
                      key={i}
                      label={i}
                      value={i}
                      checked={supplements.includes(i)}
                      onChange={(e) => handleArrayChange(e, supplements, setSupplements)}
                    />
                  );
                })}

              </div>
            </div>
          </Section>


          <Section title="Body Metrics">
            <Select label="Body Shape / Fitness Level" value={bodyShape} setter={setBodyShape} options={{ ectomorph: "Ectomorph", mesomorph: "Mesomorph", endomorph: "Endomorph", athletic: "Athletic", curvy: "Curvy", lean: "Lean" }} error={errors.bodyShape} />
            <div>
              <label className="block font-medium mb-1">Body Skin Concerns</label>
              {["cellulite", "stretch marks", "keratosis pilaris", "body acne"].map((i) => (
                <Checkbox key={i} label={cap(i)} value={i} checked={bodySkinConcerns.includes(i)} onChange={(e) => handleArrayChange(e, bodySkinConcerns, setBodySkinConcerns)} />
              ))}
              {errors.bodySkinConcerns && <p className="text-red-500 text-sm mt-1">{errors.bodySkinConcerns}</p>}
            </div>
            <div>
              <label className="block font-medium mb-1">Muscle Pain / Soreness</label>
              {["neck", "shoulders", "lower back", "knees", "none"].map((i) => (
                <Checkbox key={i} label={cap(i)} value={i} checked={musclePain.includes(i)} onChange={(e) => handleArrayChange(e, musclePain, setMusclePain)} />
              ))}
              {errors.musclePain && <p className="text-red-500 text-sm mt-1">{errors.musclePain}</p>}
            </div>
            <Select label="Injury History" value={injuryHistory} setter={setInjuryHistory} options={{ none: "None", "minor injuries": "Minor injuries", "major injury": "Major injury", "recovered": "Recovered (past injury)" }} error={errors.injuryHistory} />
            <Select label="Posture / Back Pain" value={posture} setter={setPosture} options={{ good: "Good posture", mild: "Mild back pain", poor: "Poor posture", scoliosis: "Scoliosis or spinal issue" }} error={errors.posture} />
            <div>
              <label className="block font-medium mb-1">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none
               bg-white text-black
               dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
              {errors.weight && (
                <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none
               bg-white text-black
               dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
              {errors.height && (
                <p className="text-red-500 text-sm mt-1">{errors.height}</p>
              )}
            </div>

          </Section>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-md">
            Analyze My Body Profile →
          </button>
        </form>
      </div>
    </div>
  );
};


const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const Section = ({ title, children }) => (
  <fieldset
    className="border border-gray-300 rounded mx-6 my-4 p-4
               hover:scale-105 hover:shadow-lg hover:-translate-y-1
               transition-transform duration-300"
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

export default CheckDNA;

