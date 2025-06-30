import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function DNARecommendations() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showAll, setShowAll] = useState(false);


  const budgetCap = (b) => ({ "<500": 500, "500-1500": 1500, "1500-3000": 3000, ">3000": 9999 }[b] ?? 2000);
  const budgetTag = (b) => ({ "<500": "budget‑friendly", "500-1500": "midrange", "1500-3000": "premium", ">3000": "luxury" }[b]);

  useEffect(() => {
    const saved = localStorage.getItem("dnaProfile");
    if (saved) {
      const obj = JSON.parse(saved);
      setProfile(obj);
      setPriceCap(budgetCap(obj.budget));
    }
  }, []);

  const deriveTags = () => {
    if (!profile) return [];
    const t = [];
    if (profile.color === "bright") t.push("vibrant", "bold");
    if (profile.color === "calm")   t.push("pastel", "soft");
    if (profile.skinConcern === "acne")  t.push("non‑comedogenic", "oil‑control");
    if (profile.skinConcern === "aging") t.push("anti‑aging", "collagen");
    t.push(budgetTag(profile.budget));
    if (profile.intolerances?.includes("gluten"))  t.push("gluten‑free");
    if (profile.intolerances?.includes("lactose")) t.push("lactose‑free");
    if (profile.hydration >= 8)                    t.push("hydration");
    if (profile.sleep === "poor")                 t.push("sleep‑aid", "relaxation");
    if (profile.stressors?.length)                 t.push("stress‑relief");
    if (profile.crueltyFree)                       t.push("ethical");
    return Array.from(new Set(t.filter(Boolean)));
  };
  const userTags = useMemo(deriveTags, [profile]);


  const makeTags = (pool, idx) => Array.from(new Set([
    pool[idx % pool.length],
    pool[(idx + 1) % pool.length],
    pool[(idx + 2) % pool.length],
  ]));

  const genProducts = (prefix, pool, startId, count, base) =>
    Array.from({ length: count }, (_, i) => ({
      id: startId + i,
      name: `${prefix} ${i + 1}`,
      tags: makeTags(pool, i),
      price: base + (i % 6) * 75,
      img: `/image/${prefix.toLowerCase()}${(i % 6) + 1}.jpg`,
    }));

  const corePool = ["budget‑friendly", "midrange", "premium", "vibrant", "pastel", "ethical", "hydration", "non‑comedogenic"];

  const products = useMemo(() => ({
    "Dress & Apparel": genProducts("Dress", [...corePool, "eco", "bold"], 1, 15, 799),
    "Cosmetics & Skin‑care": genProducts("Cosmetic", [...corePool, "brightening", "anti‑aging"], 101, 14, 499),
    "Foods & Nutrition": genProducts("Food", [...corePool, "gluten‑free", "omega‑3", "protein‑rich"], 201, 14, 299),
    Supplements: genProducts("Supplement", [...corePool, "vitamin‑c", "probiotics", "iron", "magnesium"], 301, 10, 699),
    "Lifestyle & Wellness": genProducts("Lifestyle", [...corePool, "relaxation", "stress‑relief"], 401, 10, 999),
    "Hair Care": genProducts("Hair", [...corePool, "dandruff", "dry-scalp", "oily-scalp"], 501, 8, 599),
    "Sleep Aids": genProducts("Sleep", [...corePool, "melatonin", "calming", "sleep‑aid"], 601, 6, 699),
    Beverages: genProducts("Drink", [...corePool, "caffeine-free", "energy-boost"], 701, 8, 199),
    "Fitness Gear": genProducts("Fitness", [...corePool, "active", "lightweight", "bold"], 801, 8, 899),
  }), []);

  const allTagOptions = useMemo(() => Array.from(new Set(Object.values(products).flat().flatMap(p => p.tags))), [products]);
  const [activeTag, setActiveTag] = useState("all");
  const [priceCap, setPriceCap]   = useState(2000);

  const productMatches = (p) => {
    const tagOk   = activeTag === "all" || p.tags.includes(activeTag);
    const priceOk = p.price <= priceCap;
    const dnaOk   = showAll || (userTags.length && p.tags.some(t => userTags.includes(t)));
    return tagOk && priceOk && dnaOk;
  };

  const addToCart    = (prod) => setCart(prev => prev.some(p=>p.id===prod.id)? prev : [...prev, prod]);
  const removeFromCart = (id) => setCart(prev => prev.filter(p=>p.id!==id));


  const Category = ({ title, list }) => {
    const filtered = list.filter(productMatches);
    if (!filtered.length) return null;
    return (
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-thin">
          {filtered.map((p) => (
            <div key={p.id} className="min-w-[13rem] bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
              <img src={p.img} alt={p.name} className="h-36 w-full object-cover rounded-t-xl" />
              <div className="p-3 space-y-1">
                <p className="text-sm font-medium line-clamp-2">{p.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">₹{p.price}</p>
                <button onClick={() => addToCart(p)} className="w-full mt-1 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

const CartPanel = () => (
  <div
    className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-800 shadow-lg transition-transform ${
      showCart ? "translate-x-0" : "translate-x-full"
    }`}
  >
    <div className="p-4 flex items-center justify-between border-b dark:border-gray-700">
      <h3 className="font-semibold">Cart ({cart.length})</h3>
      <button onClick={() => setShowCart(false)} className="text-xl">×</button>
    </div>
    <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-4rem)]">
      {cart.length === 0 && <p className="text-sm text-gray-500">Cart is empty.</p>}
      {cart.map((p) => (
        <div key={p.id} className="flex gap-2 items-center">
          <img src={p.img} alt={p.name} className="h-12 w-12 object-cover rounded" />
          <div className="flex-grow text-sm">
            {p.name}
            <div className="text-xs text-gray-500">₹{p.price}</div>
          </div>
          <button onClick={() => removeFromCart(p.id)} className="text-red-500 text-xs">Remove</button>
        </div>
      ))}
    </div>
  </div>
);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white p-6">

      <button onClick={() => setShowCart(true)} className="fixed top-4 right-4 bg-blue-600 text-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg">
        🛒<span className="ml-1 text-xs">{cart.length}</span>
      </button>
       <CartPanel />

      <header className="max-w-5xl mx-auto mb-8">
         <h1 className="text-3xl font-bold">Your Personalised Picks</h1>
         <p className="mt-1 text-gray-500 dark:text-gray-400 text-sm flex flex-wrap gap-2 items-center">
          Based on tags:
          {userTags.length ? userTags.map((t) => <span key={t} className="px-2 py-0.5 bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 rounded-full text-xs">{t}</span>) : " (no specific tags)"}
        </p>

      
         <div className="mt-4 flex flex-wrap gap-2">
            {["all", ...allTagOptions].map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1 rounded-full text-xs border ${
                  activeTag === tag
                    ? 'bg-blue-600 text-white'
                    : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

        <div className="mt-4">
          <label className="text-xs font-medium">Max Price: ₹{priceCap}</label>
          <input type="range" min={100} max={2000} step={100} value={priceCap} onChange={(e) => setPriceCap(Number(e.target.value))} className="w-full" />
        </div>
      </header>

    
      <main className="max-w-5xl mx-auto">
        {Object.entries(products).map(([group, items]) => (
          <Category key={group} title={group} list={items} />
        ))}
      </main>
    </div>
  );
}


