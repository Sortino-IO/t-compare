import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getBrandBySlug, getBrandsByCategory, type Brand } from "./brands";
import { commitment } from "./provider-facts";
import { SITE_URL } from "./site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const siteHost = new URL(SITE_URL).host;

let logoDataUrl: string | null | undefined;
function logo(): string | null {
  if (logoDataUrl !== undefined) return logoDataUrl;
  try {
    const buf = readFileSync(join(process.cwd(), "public", "logo.png"));
    logoDataUrl = `data:image/png;base64,${buf.toString("base64")}`;
  } catch {
    logoDataUrl = null;
  }
  return logoDataUrl;
}

/** Most recent date any provider's terms were checked, e.g. "Sept 2026". */
export function lastCheckedLabel(): string | null {
  const dates = getBrandsByCategory("enclomiphene")
    .map((b) => b.facts?.checkedOn)
    .filter((d): d is string => Boolean(d))
    .sort();
  const latest = dates.at(-1);
  if (!latest) return null;
  const d = new Date(`${latest}T00:00:00Z`);
  const month = d.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
  return `${month === "Sep" ? "Sept" : month} ${d.getUTCFullYear()}`;
}

export function siteChips(): string[] {
  const count = getBrandsByCategory("enclomiphene").length;
  const checked = lastCheckedLabel();
  return [
    `${count} providers`,
    "12-month cost calculator",
    ...(checked ? [`Checked ${checked}`] : []),
  ];
}

const LABS_CHIP: Record<string, string | null> = {
  included: "Labs included",
  partial: "Some labs included",
  extra: "Labs extra",
  unknown: null,
};

export function providerChips(brand: Brand): string[] {
  if (!brand.facts) return [brand.priceLabel];
  const labs = LABS_CHIP[brand.facts.labs.included];
  return [brand.priceLabel, commitment(brand.facts).text, ...(labs ? [labs] : [])];
}

export function renderPairCard(pair: string, category: "enclomiphene" | "supplement") {
  const m = pair.match(/^([a-z0-9-]+)-vs-([a-z0-9-]+)$/i);
  const left = m ? getBrandBySlug(m[1]!.toLowerCase()) : undefined;
  const right = m ? getBrandBySlug(m[2]!.toLowerCase()) : undefined;
  const isSupplement = category === "supplement";
  if (!left || !right) {
    return renderOgCard({
      eyebrow: "Head-to-head",
      title: isSupplement ? "Testosterone Supplements Compared" : "TRT Provider Comparisons",
    });
  }
  const price = (b: Brand) => `${b.name}: ${b.priceLabel.replace(/\s*\(.*\)$/, "")}`;
  return renderOgCard({
    eyebrow: "Head-to-head",
    title: `${left.name} vs ${right.name}`,
    subtitle: isSupplement
      ? "Price, bundles, guarantee and formula side by side"
      : "Price, labs, commitment and 12-month cost side by side",
    chips: [price(left), price(right)],
  });
}

export type OgCardProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  chips?: string[];
};

function titleSize(title: string): number {
  if (title.length > 70) return 50;
  if (title.length > 48) return 60;
  if (title.length > 30) return 70;
  return 82;
}

export function renderOgCard({ eyebrow, title, subtitle, chips = [] }: OgCardProps) {
  const logoSrc = logo();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ width: "18px", height: "100%", background: "#176b87", display: "flex" }} />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 72px 52px 66px",
            background: "linear-gradient(135deg, #ffffff 0%, #ffffff 55%, #eef6f9 100%)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {logoSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoSrc} width={190} height={60} alt="" />
            ) : (
              <div style={{ display: "flex", fontSize: "40px", fontWeight: 700, color: "#142b3a" }}>
                T-Compare
              </div>
            )}
            <div
              style={{
                display: "flex",
                fontSize: "20px",
                fontWeight: 600,
                color: "#176b87",
                background: "#eef6f9",
                border: "2px solid #cfe4ec",
                borderRadius: "999px",
                padding: "8px 20px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {eyebrow}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: `${titleSize(title)}px`,
                fontWeight: 700,
                color: "#142b3a",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </div>
            {subtitle ? (
              <div
                style={{
                  display: "flex",
                  marginTop: "22px",
                  fontSize: "32px",
                  color: "#53666e",
                  lineHeight: 1.3,
                }}
              >
                {subtitle}
              </div>
            ) : null}
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: "12px" }}>
              {chips.map((chip) => (
                <div
                  key={chip}
                  style={{
                    display: "flex",
                    fontSize: "22px",
                    fontWeight: 600,
                    color: "#3c535e",
                    background: "#f4f8fa",
                    border: "2px solid #e3e3e3",
                    borderRadius: "12px",
                    padding: "8px 16px",
                  }}
                >
                  {chip}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", fontSize: "24px", fontWeight: 600, color: "#5f757f" }}>
              {siteHost}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
