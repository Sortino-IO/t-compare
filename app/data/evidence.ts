/**
 * Research findings shown as "What the research says" notes. Each statement is
 * limited to what the linked abstract or agency page says (checked Sept 2026);
 * keep the population and caveat attached when editing.
 */
export type Evidence = {
  statement: string;
  caveat?: string;
  sourceLabel: string;
  url: string;
};

export const EVIDENCE = {
  "enclomiphene-sperm": {
    statement:
      "In two 16-week phase III trials, enclomiphene raised testosterone and kept sperm counts in the normal range, while testosterone gel markedly reduced sperm production.",
    caveat: "Overweight men aged 18-60 with secondary hypogonadism.",
    sourceLabel: "Kim et al., BJU International, 2016",
    url: "https://pubmed.ncbi.nlm.nih.gov/26496621/",
  },
  "enclomiphene-lh-fsh": {
    statement:
      "Enclomiphene raised LH and FSH, the hormones that drive the body's own testosterone production. Testosterone gel did not.",
    caveat: "Small pilot study of 12 men.",
    sourceLabel: "Kaminetsky et al., Journal of Sexual Medicine, 2013",
    url: "https://pubmed.ncbi.nlm.nih.gov/23530575/",
  },
  "enclomiphene-not-approved": {
    statement:
      "No FDA-approved drug contains enclomiphene. Programs supply it through compounding pharmacies, so ask how yours is made and tested.",
    caveat: "FDA status as of its June 2022 compounding committee review.",
    sourceLabel: "FDA briefing document, 2022",
    url: "https://www.fda.gov/media/158541/download",
  },
  "traverse-heart": {
    statement:
      "In 5,246 men with low testosterone and heart risk, testosterone therapy did not raise major cardiac events versus placebo (7.0% vs 7.3%).",
    caveat:
      "The same trial saw more atrial fibrillation, kidney injury and pulmonary embolism with testosterone.",
    sourceLabel: "TRAVERSE trial, New England Journal of Medicine, 2023",
    url: "https://pubmed.ncbi.nlm.nih.gov/37326322/",
  },
  "t-trials-sexual-function": {
    statement:
      "In men 65 and older with low testosterone, a year of treatment moderately improved sexual function and slightly improved mood.",
    caveat: "No benefit was found for energy or walking distance.",
    sourceLabel: "Testosterone Trials, New England Journal of Medicine, 2016",
    url: "https://pubmed.ncbi.nlm.nih.gov/26886521/",
  },
  "t-trials-bone": {
    statement:
      "A year of testosterone treatment increased bone density and estimated bone strength in older men with low testosterone, most in the spine.",
    caveat: "The trial did not measure fracture rates.",
    sourceLabel: "T Trials Bone Trial, JAMA Internal Medicine, 2017",
    url: "https://pubmed.ncbi.nlm.nih.gov/28241231/",
  },
  "t-trials-anemia": {
    statement:
      "Among older men with low testosterone and unexplained anemia, 58% were no longer anemic after a year of treatment, versus 22% on placebo.",
    caveat: "A small group of 62 men.",
    sourceLabel: "T Trials Anemia Trial, JAMA Internal Medicine, 2017",
    url: "https://pubmed.ncbi.nlm.nih.gov/28241237/",
  },
  "aua-diagnosis": {
    statement:
      "Low testosterone is diagnosed from two early-morning blood tests below about 300 ng/dL, together with symptoms. One test is not enough.",
    sourceLabel: "American Urological Association guideline",
    url: "https://www.auanet.org/guidelines-and-quality/guidelines/testosterone-deficiency-guideline",
  },
} satisfies Record<string, Evidence>;

export type EvidenceId = keyof typeof EVIDENCE;
