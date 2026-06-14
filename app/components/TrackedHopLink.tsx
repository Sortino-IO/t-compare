"use client";

import type { ComponentProps } from "react";
import { useTrackedHopUrl } from "../hooks/useTrackedHopUrl";

type Props = Omit<ComponentProps<"a">, "href"> & {
  href: string;
};

export default function TrackedHopLink({ href: baseUrl, ...props }: Props) {
  const href = useTrackedHopUrl(baseUrl);
  return <a href={href} {...props} />;
}
