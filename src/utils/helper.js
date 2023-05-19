export function formatVND(value) {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  let res = formatter.format(value).replace(/\./g, ",");

  return `${res.slice(0, res.length - 1)}VND`;
}

export function formatPrice(priceStr) {
  priceStr = `${priceStr}`;
  if (priceStr === "") return "";
  const res = parseFloat(priceStr.replace(/,/g, ""));

  return new Intl.NumberFormat().format(res);
}

export function handleRoute(page, category) {
  const url = new URLSearchParams();
  if (page) url.set("page", page);
  url.set("category", category);
  return "?" + url.toString();
}
