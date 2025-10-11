import { useEffect, useState } from "react";

/** Returns a string key that updates on any client-side URL change */
export function useRouteChangeKey() {
  const [key, setKey] = useState(
    () =>
      window.location.pathname + window.location.search + window.location.hash
  );

  useEffect(() => {
    // Patch History API once
    const w = window as any;
    if (!w.__routePatchApplied) {
      const wrap = (method: "pushState" | "replaceState") => {
        const orig = history[method];
        return function (this: History, ...args: any[]) {
          const ret = orig.apply(this, args as any);
          window.dispatchEvent(new Event("routechange"));
          return ret;
        };
      };
      history.pushState = wrap("pushState") as any;
      history.replaceState = wrap("replaceState") as any;
      w.__routePatchApplied = true;
    }

    const update = () =>
      setKey(
        window.location.pathname + window.location.search + window.location.hash
      );

    // Listen for all navigation events
    window.addEventListener("popstate", update);
    window.addEventListener("hashchange", update);
    window.addEventListener("routechange", update);

    // Initial sync (optional)
    update();

    return () => {
      window.removeEventListener("popstate", update);
      window.removeEventListener("hashchange", update);
      window.removeEventListener("routechange", update);
    };
  }, []);

  return key;
}
