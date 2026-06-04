import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingPageRouter from "../../components/landing/LandingPageRouter";
import { getAllLandingPageSlugs, getLandingPageBySlug } from "../../lib/landing-pages";
import { landingPageRobots } from "../../lib/lp-robots";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllLandingPageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPageBySlug(slug);
  if (!page) return { title: "Offer not found" };

  return {
    title: { absolute: page.seoTitle },
    description: page.seoDescription,
    robots: landingPageRobots(slug),
  };
}

export default async function LandingPage({ params }: Props) {
  const { slug } = await params;
  const page = getLandingPageBySlug(slug);
  if (!page) notFound();

  return <LandingPageRouter config={page} />;
}
