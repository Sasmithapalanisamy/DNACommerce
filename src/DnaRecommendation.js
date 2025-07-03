import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  dressProducts,
  cosmeticProducts,
  foodProducts,
  supplementProducts,
  lifestyleProducts,
  hairProducts,
} from "./data/productData";

const prettify = (tag) =>
  tag
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

export default function DNARecommendations() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [activeTag, setActiveTag] = useState("all");
  const [priceCap, setPriceCap] = useState(2000);

  useEffect(() => {
    const saved = localStorage.getItem("dnaProfile");
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  const userTags = useMemo(() => {
    if (!profile) return [];
    const tags = [];

    if (profile.skin) tags.push(profile.skin);       
    if (profile.skinConcern) tags.push(profile.skinConcern); 
    if (profile.skinTone) tags.push(profile.skinTone);      

    if (profile.hairType) tags.push(profile.hairType); 
    if (profile.scalp) tags.push(profile.scalp);       

    if (profile.sunExposure) tags.push(profile.sunExposure); 
    if (profile.climate) tags.push(profile.climate);   
    if (profile.activity) tags.push(profile.activity);  
    if (profile.sleep) tags.push(profile.sleep);         

    profile.intolerances?.forEach((i) => tags.push(i.toLowerCase())); 


    if (profile.healthGoal) tags.push(profile.healthGoal);   
    profile.supplements?.forEach((s) => tags.push(s.toLowerCase()));
    if (profile.caffeine) tags.push(profile.caffeine);    
    if (profile.hydration >= 4) tags.push("hydration");          

    if (profile.bodyShape) tags.push(profile.bodyShape);
    profile.bodySkinConcerns?.forEach((c) => tags.push(c));
    profile.musclePain?.forEach((m) => tags.push(m));
    if (profile.injuryHistory) tags.push(profile.injuryHistory);
    if (profile.posture) tags.push(profile.posture);

    return [...new Set(tags)];
  }, [profile]);

  const tagReason = (tag) => {
    if (tag === "hydration") return "adequate hydration";
    if (tag === "none") return "zero caffeine preference";
    return prettify(tag);
  };

  
  const products = useMemo(
    () => ({
      "Dress & Apparel": dressProducts,
      "Cosmetics & Skin‑care": cosmeticProducts,
      "Foods & Nutrition": foodProducts,
      Supplements: supplementProducts,
      Lifestyle: lifestyleProducts,
      "Hair Care": hairProducts,
    }),
    []
  );

  const allTagOptions = useMemo(
    () =>
      Array.from(
        new Set(Object.values(products).flat().flatMap((p) => p.tags))
      ),
    [products]
  );

  const productMatches = (p) => {
    const tagOk = activeTag === "all" || p.tags.includes(activeTag);
    const priceOk = p.price <= priceCap;
    const dnaOk = userTags.length && p.tags.some((t) => userTags.includes(t));
    return tagOk && priceOk && dnaOk;
  };

  const addToCart = (prod) => setCart((prev) => (prev.some((p) => p.id === prod.id) ? prev : [...prev, prod]));
  const removeFromCart = (id) => setCart((prev) => prev.filter((p) => p.id !== id));

  const buildReasons = (prod) => {
    const matches = prod.tags.filter((t) => userTags.includes(t));
    return matches.length ? matches.map(tagReason).join(", ") : "general recommendation";
  };



  const Category = ({ title, list }) => {
    const filtered = list.filter(productMatches);
    if (!filtered.length) return null;

    return (
      <section className="mt-10 bg-white/60 dark:bg-gray-800/40 p-6 rounded-2xl shadow-inner">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-thin scroll-smooth snap-x snap-mandatory">
          {filtered.map(p => (
            <div
              key={p.id}
              className="snap-start min-w-[15rem] w-64 h-[26rem] bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-2xl transition-transform transform hover:scale-105 flex flex-col justify-between"
            >

              <div className="relative w-full aspect-[1/4] overflow-hidden rounded-t-xl">
                <img
                  src={p.img}
                  alt={p.name}

                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </div>

              <div className="p-3 space-y-1">
                <p className="text-sm font-medium line-clamp-2">{p.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{p.desc}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">₹{p.price}</p>
                <p className="text-[11px] italic text-green-600 dark:text-green-300 line-clamp-2">
                  Recommended because: {buildReasons(p)}
                </p>
                <button
                  onClick={() => addToCart(p)}
                  className="w-full mt-1 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 active:scale-95 transition-transform"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const CartPanel = () => (
    <>
      <div onClick={() => setShowCart(false)} className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${showCart ? "opacity-100" : "opacity-0 pointer-events-none"}`} />
      <div className={`fixed top-0 right-0 h-full w-80 max-w-full z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-xl border-l transition-transform duration-500 ease-in-out ${showCart ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-4 flex items-center justify-between border-b dark:border-gray-700">
          <h3 className="font-semibold">Cart ({cart.length})</h3>
          <button onClick={() => setShowCart(false)} className="text-xl hover:text-red-600 transition-transform hover:rotate-90">×</button>
        </div>
        <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-4rem)]">
          {cart.length === 0 ? (
            <p className="text-sm text-gray-500">Cart is empty.</p>
          ) : (
            cart.map((p) => (
              <div key={p.id} className="flex gap-3 items-center bg-white dark:bg-gray-900/40 p-2 rounded-lg shadow-sm">
                <img src={p.img} alt={p.name} className="h-12 w-12 object-cover rounded" />
                <div className="flex-grow text-sm">
                  {p.name}
                  <div className="text-xs text-gray-500">₹{p.price}</div>
                </div>
                <button onClick={() => removeFromCart(p.id)} className="text-red-500 text-xs hover:underline">Remove</button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white p-6">
      <button onClick={() => setShowCart(true)} className="fixed top-4 right-4 bg-blue-600 text-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg">
        🛒<span className="ml-1 text-xs">{cart.length}</span>
      </button>
      <CartPanel />
      <header className="max-w-5xl mx-auto mb-8">

       
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-2">
          Your Personalised Picks
        </h1>

        
        <div className="mt-4 flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            Based on:
          </span>

          {["all", ...userTags].map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3 py-1 rounded-full text-xs border ${activeTag === tag
                  ? "bg-blue-600 text-white"
                  : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400"
                }`}
            >
              {tagReason(tag)}
            </button>
          ))}
        </div>
       <div className="flex justify-between items-center mt-6">
  <h1 className="font-bold text-3xl">Best Recommendations</h1>
  <button
    onClick={() => navigate("/dna")}
    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
  >
    Edit My Inputs
  </button>
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