(() => {
  const form = document.querySelector("[data-meal-cost-form]");
  if (!form) return;

  const results = document.querySelector("[data-meal-cost-results]");
  const error = document.querySelector("[data-meal-cost-error]");
  const copyButton = document.querySelector("[data-copy-calculation]");
  const output = (name, value) => {
    const target = document.querySelector(`[data-output="${name}"]`);
    if (target) target.textContent = value;
  };

  const symbols = { USD: "$", GBP: "£", EUR: "€", CAD: "CA$", AUD: "A$" };
  const readNumber = (name) => Number(form.elements[name].value || 0);
  const money = (value, currency) => {
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
      }).format(value);
    } catch {
      return `${symbols[currency] || ""}${value.toFixed(2)}`;
    }
  };

  function calculate({ updateUrl = true } = {}) {
    const currency = form.elements.currency.value;
    const price = readNumber("price");
    const people = readNumber("people");
    const meals = readNumber("meals");
    const shipping = readNumber("shipping");
    const fees = readNumber("fees");
    const discount = readNumber("discount");
    const grocery = readNumber("grocery");

    if (price <= 0 || people <= 0 || meals <= 0 || shipping < 0 || fees < 0 || discount < 0 || discount > 100 || grocery < 0) {
      error.hidden = false;
      results.hidden = true;
      return;
    }

    const servings = people * meals;
    const foodSubtotal = price * servings;
    const recurringWeekly = foodSubtotal + shipping + fees;
    const firstBox = foodSubtotal * (1 - discount / 100) + shipping + fees;
    const truePerServing = recurringWeekly / servings;
    const monthly = recurringWeekly * 52 / 12;
    const annual = recurringWeekly * 52;

    output("servings", servings.toLocaleString());
    output("first-box", money(firstBox, currency));
    output("weekly", money(recurringWeekly, currency));
    output("per-serving", money(truePerServing, currency));
    output("monthly", money(monthly, currency));
    output("annual", money(annual, currency));

    const comparison = document.querySelector("[data-grocery-comparison]");
    if (comparison) {
      if (grocery > 0) {
        const monthlyDifference = (recurringWeekly - grocery) * 52 / 12;
        const direction = monthlyDifference >= 0 ? "more" : "less";
        comparison.textContent = `That is ${money(Math.abs(monthlyDifference), currency)} ${direction} per average month than the weekly grocery budget you entered.`;
        comparison.hidden = false;
      } else {
        comparison.hidden = true;
      }
    }

    error.hidden = true;
    results.hidden = false;

    if (updateUrl && window.history?.replaceState) {
      const params = new URLSearchParams(new FormData(form));
      window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    calculate();
  });

  copyButton?.addEventListener("click", async () => {
    calculate();
    try {
      await navigator.clipboard.writeText(window.location.href);
      copyButton.textContent = "Calculation link copied";
    } catch {
      copyButton.textContent = "Copy the URL from your browser";
    }
  });

  const params = new URLSearchParams(window.location.search);
  let restored = false;
  for (const element of form.elements) {
    if (!element.name || !params.has(element.name)) continue;
    element.value = params.get(element.name);
    restored = true;
  }
  if (restored) calculate({ updateUrl: false });
})();
