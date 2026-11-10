"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { grades, lengths, products, whatsappHref, whatsappNumbers } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

const quantities = ["100g", "200g", "500g", "1 kg", "2-5 kg", "5 kg+"];
const colorOptions = ["#1 Jet Black", "Colors (tell us the code)", "Not sure yet"];

const label = "text-xs font-bold uppercase tracking-[0.2em] text-white/60";
const field =
  "mt-2 w-full rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-3 text-sm text-white outline-none max-sm:px-2.5 max-sm:text-[0.8rem] transition-colors focus:border-pink [&>option]:text-ink";

// Builds a WhatsApp message from the buyer's answers. Nothing is stored or sent from the page.
export function QuoteBuilder() {
  const [product, setProduct] = useState(products[0].name);
  const [length, setLength] = useState(`${lengths[0].cm}cm / ${lengths[0].inch}"`);
  const [color, setColor] = useState(colorOptions[0]);
  const [grade, setGrade] = useState(grades[1]);
  const [qty, setQty] = useState(quantities[0]);
  const [country, setCountry] = useState("");
  const [line, setLine] = useState(whatsappNumbers[0].digits);

  const message = [
    "PRICE",
    `Product: ${product}`,
    `Length: ${length}`,
    `Color: ${color}`,
    `Grade: ${grade}`,
    `Quantity: ${qty}`,
    `Ship to: ${country.trim() || "(country)"}`,
  ].join("\n");

  return (
    <form
      className="rounded-[2rem] bg-ink p-6 text-left text-white max-sm:p-5 sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        window.open(whatsappHref(message, line), "_blank", "noopener,noreferrer");
      }}
    >
      <p className="text-lg font-extrabold">Build your quote request</p>
      <p className="mt-1 text-sm text-white/55">We turn it into a WhatsApp message. You check it before sending.</p>

      <div className="mt-6 grid gap-4 max-sm:grid-cols-2 max-sm:gap-3 sm:grid-cols-2">
        <label className="block max-sm:col-span-2 sm:col-span-2">
          <span className={label}>Product</span>
          <select className={field} value={product} onChange={(e) => setProduct(e.target.value)}>
            {products.map((p) => (
              <option key={p.id}>{p.name}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={label}>Length</span>
          <select className={field} value={length} onChange={(e) => setLength(e.target.value)}>
            {lengths.map((l) => (
              <option key={l.cm}>{`${l.cm}cm / ${l.inch}"`}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={label}>Color</span>
          <select className={field} value={color} onChange={(e) => setColor(e.target.value)}>
            {colorOptions.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={label}>Grade</span>
          <select className={field} value={grade} onChange={(e) => setGrade(e.target.value)}>
            {[...grades, "Not sure yet"].map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={label}>Ship to</span>
          <input
            className={cn(field, "placeholder:text-white/35")}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Your country"
            autoComplete="country-name"
          />
        </label>
      </div>

      <fieldset className="mt-5">
        <legend className={label}>Quantity</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {quantities.map((q) => (
            <button
              key={q}
              type="button"
              aria-pressed={qty === q}
              onClick={() => setQty(q)}
              className={cn(
                "tabular rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                qty === q ? "border-pink bg-pink text-white" : "border-white/15 text-white/75 hover:border-white/40",
              )}
            >
              {q}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className={label}>Send to</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {whatsappNumbers.map((n) => (
            <button
              key={n.digits}
              type="button"
              aria-pressed={line === n.digits}
              onClick={() => setLine(n.digits)}
              className={cn(
                "rounded-xl border px-3.5 py-2.5 text-left transition-colors",
                line === n.digits ? "border-pink bg-pink/15" : "border-white/15 hover:border-white/40",
              )}
            >
              <span className="tabular block text-sm font-bold">{n.display}</span>
              <span className="block text-xs text-white/55">{n.label}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full bg-pink px-7 py-4 text-sm font-bold transition-colors hover:bg-pink-deep"
      >
        <WhatsAppIcon className="size-5" />
        Open WhatsApp with my request
      </button>
    </form>
  );
}
