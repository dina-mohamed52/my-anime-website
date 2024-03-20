import { format } from "date-fns";
export function customSort(a, b) {
  const removeArticles = (title) => {
    return title.replace(/^(a|an|the)\s+/i, "");
  };

  const titleA = removeArticles(a.title);
  const titleB = removeArticles(b.title);

  return titleA.localeCompare(titleB);
}

 export function formatDate(dateString) {
  const date = new Date(dateString);
  return format(date, "MMMM d, yyyy");
}