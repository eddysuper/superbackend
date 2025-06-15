import { writable } from 'svelte/store';

export const pageData = writable({});

// Helper functions
export function setPageData(data) {
  pageData.update(current => ({ ...current, ...data }));
}

export function getPageData() {
  let value;
  pageData.subscribe(data => value = data)();
  return value;
}