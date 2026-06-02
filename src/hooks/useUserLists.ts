import { useCallback, useEffect, useState } from "react";

export type TrackingStatus = "watching" | "planned" | "completed" | "dropped";

export type TrackingItem = {
  id: number;
  title: string;
  cover: string;
  status: TrackingStatus;
  progress: number;
  total?: number | null;
  score?: number | null;
  siteUrl?: string;
  addedAt: number;
};

const KEY = "otaku.tracking.v1";

function read(): TrackingItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function write(items: TrackingItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("otaku-tracking-changed"));
}

export function useUserLists() {
  const [items, setItems] = useState<TrackingItem[]>([]);

  useEffect(() => {
    setItems(read());
    const onChange = () => setItems(read());
    window.addEventListener("otaku-tracking-changed", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("otaku-tracking-changed", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const upsert = useCallback((item: Omit<TrackingItem, "addedAt"> & { addedAt?: number }) => {
    const list = read();
    const idx = list.findIndex((x) => x.id === item.id);
    const merged: TrackingItem = { addedAt: Date.now(), ...item };
    if (idx >= 0) list[idx] = { ...list[idx], ...merged };
    else list.push(merged);
    write(list);
  }, []);

  const remove = useCallback((id: number) => {
    write(read().filter((x) => x.id !== id));
  }, []);

  const updateProgress = useCallback((id: number, delta: number) => {
    const list = read();
    const it = list.find((x) => x.id === id);
    if (!it) return;
    it.progress = Math.max(0, it.progress + delta);
    if (it.total && it.progress >= it.total) {
      it.progress = it.total;
      it.status = "completed";
    }
    write(list);
  }, []);

  const setStatus = useCallback((id: number, status: TrackingStatus) => {
    const list = read();
    const it = list.find((x) => x.id === id);
    if (!it) return;
    it.status = status;
    write(list);
  }, []);

  return { items, upsert, remove, updateProgress, setStatus };
}
