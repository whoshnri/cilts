
import { useEffect, RefObject } from 'react';

type Callback = () => void;

export function useOutsideClick<T extends HTMLElement>(ref: RefObject<T>, callback: Callback): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}