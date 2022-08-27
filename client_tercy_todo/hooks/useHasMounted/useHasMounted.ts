import { useEffect, useState } from "react";

export function useHasMounted(): boolean {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect((): void => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}
