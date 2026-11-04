// Vanilla replacement for the React behaviour of the homepage, used by the Shopify
// section exported with scripts/export-shopify.mjs. Hooks are the data-* attributes
// set in hero-gallery.tsx, margin-calculator.tsx and reveal.tsx.
(() => {
  // Both Sancy sections include this script; run it once.
  if (window.__sancyHome) return;
  window.__sancyHome = true;

  const toggle = (el, on, classes) => {
    classes.on.forEach((c) => el.classList.toggle(c, on));
    classes.off.forEach((c) => el.classList.toggle(c, !on));
  };

  const formatUsd = (value, digits = 0) =>
    `$${value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
  const formatQty = (grams) => (grams >= 1000 ? `${grams / 1000} kg` : `${grams}g`);

  function initCalculator(section) {
    const products = JSON.parse(section.dataset.calcProducts);
    const state = { id: products[0][0], tier: "jet", grams: 1000 };
    const productButtons = [...section.querySelectorAll("[data-calc-product]")];
    const tierButtons = [...section.querySelectorAll("[data-calc-tier]")];
    const qtyButtons = [...section.querySelectorAll("[data-calc-qty]")];
    const resale = section.querySelector("[data-calc-resale]");
    const link = section.querySelector("[data-calc-link]");
    const out = (name) => section.querySelector(`[data-calc-out="${name}"]`);

    const styles = {
      product: { on: ["border-pink", "bg-pink", "text-white"], off: ["border-border", "hover:border-pink"] },
      tier: { on: ["bg-ink", "text-white"], off: ["text-ink/70", "hover:text-ink"] },
      qty: { on: ["border-ink", "bg-ink", "text-white"], off: ["border-border", "hover:border-ink"] },
    };

    const render = () => {
      const [, name, jet, colors] = products.find((p) => p[0] === state.id);
      const perKg = state.tier === "jet" ? jet : colors;
      const bundles = state.grams / 100;
      const perBundle = perKg / 10;
      const value = Number.parseFloat(resale.value);
      const hasResale = Number.isFinite(value) && value > 0;
      const margin = hasResale ? value - perBundle : 0;

      productButtons.forEach((b) => {
        const on = b.dataset.calcProduct === state.id;
        b.setAttribute("aria-pressed", String(on));
        toggle(b, on, styles.product);
      });
      tierButtons.forEach((b) => {
        const on = b.dataset.calcTier === state.tier;
        b.setAttribute("aria-pressed", String(on));
        toggle(b, on, styles.tier);
      });
      qtyButtons.forEach((b) => {
        const on = Number(b.dataset.calcQty) === state.grams;
        b.setAttribute("aria-pressed", String(on));
        toggle(b, on, styles.qty);
      });

      out("bundles").textContent = String(bundles);
      out("per-bundle").textContent = formatUsd(perBundle, 2);
      out("total").textContent = formatUsd((perKg * state.grams) / 1000);
      out("keep").textContent = hasResale ? formatUsd(margin * bundles) : "-";
      out("keep").classList.toggle("text-pink-soft", hasResale && margin < 0);
      out("keep-per").textContent = hasResale ? `${formatUsd(margin, 2)} / bundle` : "";

      const message = `PRICE ${name}, ${state.tier === "jet" ? "#1 Jet Black" : "Colors"}, ${formatQty(state.grams)}`;
      link.href = `${link.href.split("?")[0]}?text=${encodeURIComponent(message)}`;
    };

    productButtons.forEach((b) => b.addEventListener("click", () => ((state.id = b.dataset.calcProduct), render())));
    tierButtons.forEach((b) => b.addEventListener("click", () => ((state.tier = b.dataset.calcTier), render())));
    qtyButtons.forEach((b) => b.addEventListener("click", () => ((state.grams = Number(b.dataset.calcQty)), render())));
    resale.addEventListener("input", render);
    render();
  }

  function initGallery(gallery) {
    const main = gallery.querySelector("[data-gallery-main]");
    const strip = gallery.querySelector("[data-gallery-strip]");
    const thumbs = [...gallery.querySelectorAll("[data-gallery-thumb]")];
    const mainImg = main.querySelector("img");
    const ring = { on: ["ring-pink"], off: ["ring-transparent", "opacity-70", "hover:opacity-100"] };

    thumbs.forEach((thumb) =>
      thumb.addEventListener("click", () => {
        main.querySelector("[data-gallery-ph]")?.remove();
        const img = thumb.querySelector("img");
        if (img && mainImg) {
          mainImg.src = img.src;
          mainImg.alt = (thumb.getAttribute("aria-label") || "").replace(/^Show photo: /, "");
          mainImg.style.display = "";
        } else if (mainImg) {
          // Placeholder thumb: show its "Ảnh chờ" box in the large frame.
          mainImg.style.display = "none";
          const ph = thumb.firstElementChild.cloneNode(true);
          ph.setAttribute("data-gallery-ph", "");
          main.prepend(ph);
        }
        thumbs.forEach((t) => {
          t.setAttribute("aria-pressed", String(t === thumb));
          toggle(t, t === thumb, ring);
        });
      }),
    );

    gallery.querySelector("[data-gallery-next]")?.addEventListener("click", () => {
      const atEnd = strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 4;
      strip.scrollBy({ left: atEnd ? -strip.scrollWidth : strip.clientWidth * 0.75, behavior: "smooth" });
    });
  }

  function initReveal(node) {
    if (node.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    node.dataset.state = "hidden";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.dataset.state = "visible";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
  }

  // In-page links (#prices, #products) point inside the shadow root, where the browser's
  // own hash scrolling cannot see, so scroll to them by hand.
  function initAnchors(root) {
    root.addEventListener("click", (event) => {
      const link = event.target.closest('a[href^="#"]');
      const target = link && root.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // Mobile menu of the header section (site-header.tsx, standalone).
  function initMenu(root) {
    const toggle = root.querySelector("[data-menu-toggle]");
    const menu = root.querySelector("[data-menu]");
    if (!toggle || !menu) return;
    const set = (open) => {
      menu.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      root.querySelector('[data-menu-icon="close"]')?.classList.toggle("hidden", !open);
      root.querySelector('[data-menu-icon="open"]')?.classList.toggle("hidden", open);
    };
    toggle.addEventListener("click", () => set(menu.hidden));
    menu.addEventListener("click", (event) => event.target.closest("a") && set(false));
  }

  // The section ships as a declarative shadow root. The theme editor re-inserts sections
  // with innerHTML, which leaves the <template> inert, so attach it here when needed.
  const shadowOf = (host) => {
    if (host.shadowRoot) return host.shadowRoot;
    const template = host.querySelector(":scope > template[shadowrootmode]");
    if (!template) return null;
    const shadow = host.attachShadow({ mode: "open" });
    shadow.appendChild(template.content);
    template.remove();
    return shadow;
  };

  const init = () =>
    document.querySelectorAll("[data-sancy-host]").forEach((host) => {
      const root = shadowOf(host)?.querySelector("[data-sancy-home]");
      if (!root || root.dataset.ready) return;
      root.dataset.ready = "true";
      root.querySelectorAll("[data-calc]").forEach(initCalculator);
      root.querySelectorAll("[data-gallery]").forEach(initGallery);
      root.querySelectorAll(".reveal").forEach(initReveal);
      initAnchors(root);
      initMenu(root);
    });

  // /#prices from the footer or another page: the target sits in a shadow root, which the
  // browser's own hash scrolling cannot see.
  const findTarget = (hash) => {
    if (hash.length < 2) return null;
    const id = decodeURIComponent(hash.slice(1));
    for (const host of document.querySelectorAll("[data-sancy-host]")) {
      const target = host.shadowRoot?.getElementById(id);
      if (target) return target;
    }
    return null;
  };
  const scrollToHash = () => findTarget(location.hash)?.scrollIntoView({ behavior: "smooth", block: "start" });

  // Header and footer links to /#prices while already on the homepage: the hash may not
  // change, so no hashchange fires. Scroll by hand.
  document.addEventListener("click", (event) => {
    const link = event.composedPath().find((el) => el.tagName === "A" && el.hash && el.pathname === location.pathname);
    const target = link && findTarget(link.hash);
    if (!target) return;
    event.preventDefault();
    history.replaceState(null, "", link.hash);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  init();
  scrollToHash();
  window.addEventListener("hashchange", scrollToHash);
  // The theme editor re-renders sections in place.
  document.addEventListener("shopify:section:load", init);
})();
