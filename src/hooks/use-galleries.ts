import { Gallery } from "@karasu-lab/karasu256-api-client";
import { useKarasu256API } from "./use-karasu256-api";
import { useEffect, useState } from "react";

export function useGalleries() {
  const api = useKarasu256API();
  const [galleries, setGalleries] = useState<Gallery[]>([]);

  useEffect(() => {
    api.galleries.galleriesControllerGet({
      query: {}
    }).then(setGalleries);
  }, [api.galleries]);

  return galleries;
}