"use client";

import { useEffect } from "react";
import { getLocalPreviewUrl } from "../lib/preview-origin";

export default function LocalPreviewOrigin() {
  useEffect(() => {
    const previewUrl = getLocalPreviewUrl(window.location.href);
    if (previewUrl) window.location.replace(previewUrl);
  }, []);
  return null;
}
