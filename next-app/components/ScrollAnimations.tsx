"use client";

import { useEffect } from "react";

export default function ScrollAnimations() {
  useEffect(() => {
    const selector = ".fade-in, .fade-in-left, .fade-in-right, .stagger-children";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    function observeElements() {
      document.querySelectorAll(selector).forEach((el) => {
        if (!el.classList.contains("visible")) {
          observer.observe(el);
        }
      });
    }

    observeElements();

    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
