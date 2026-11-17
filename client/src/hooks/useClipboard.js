import { useCallback, useState } from "react";

export function useClipboard(timeout = 2000) {
  const [hasCopied, setHasCopied] = useState(false);

  const copy = useCallback(
    async (text) => {
      if (!text) return false;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
          setHasCopied(true);
          setTimeout(() => setHasCopied(false), timeout);
          return true;
        }

        // Fallback for older browsers or insecure origins
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand("copy");
        textArea.remove();

        if (successful) {
          setHasCopied(true);
          setTimeout(() => setHasCopied(false), timeout);
          return true;
        }
        return false;
      } catch {
        setHasCopied(false);
        return false;
      }
    },
    [timeout]
  );

  return { copy, hasCopied };
}
