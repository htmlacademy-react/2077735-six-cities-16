export function getRatingPercentage(rating: number) {
  return `${(Math.round(rating) * 100) / 5}%`;
}
