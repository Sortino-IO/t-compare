import type { LandingPageConfig } from "../../lib/landing-pages";
import LandingPageView from "./LandingPageView";
import LandingPageViewLp2Advertorial from "./LandingPageViewLp2Advertorial";
import LandingPageViewLp2Bento from "./LandingPageViewLp2Bento";
import LandingPageViewTof from "./LandingPageViewTof";
import LandingPageViewLp2Dtc from "./LandingPageViewLp2Dtc";

export default function LandingPageRouter({ config }: { config: LandingPageConfig }) {
  const variant = config.variant ?? (config.slug.endsWith("-lp2") ? "lp2" : "lp1");

  if (variant === "lp1") {
    return <LandingPageView config={config} />;
  }

  switch (config.lp2Style) {
    case "tof":
      return <LandingPageViewTof config={config} />;
    case "dtc":
      return <LandingPageViewLp2Dtc config={config} />;
    case "advertorial":
      return <LandingPageViewLp2Advertorial config={config} />;
    case "bento":
      return <LandingPageViewLp2Bento config={config} />;
    default:
      return <LandingPageViewLp2Dtc config={config} />;
  }
}
