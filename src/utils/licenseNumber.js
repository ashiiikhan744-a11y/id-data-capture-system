
const STORAGE_KEY = "sample-document-counters-v1";

const DEMO_RULES = {
  demoA: { prefix: "DA", label: "Demo Region A" },
  demoB: { prefix: "DB", label: "Demo Region B" },
  demoC: { prefix: "DC", label: "Demo Region C" }
};

function readCounters() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function generateDemoReference(region) {
  const rule = DEMO_RULES[region];

  if (!rule) {
    throw new Error("Please select a valid demo region.");
  }

  const counters = readCounters();
  const next = (Number(counters[region]) || 0) + 1;

  counters[region] = next;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(counters));

  return `${rule.prefix}-SAMPLE-${String(next).padStart(6, "0")}`;
}

export function getDemoRegions() {
  return Object.entries(DEMO_RULES).map(([value, rule]) => ({
    value,
    label: rule.label
  }));
}
