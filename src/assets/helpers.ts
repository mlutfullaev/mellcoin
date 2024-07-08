export const formatCoin = (coin: number) => {
  return coin.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export const formatTime = (num: number) => {
  return num < 10 ? `0${num}` : num
}

export const formatWithPrefix = (number: number | string) => {
  number = Number(number)
  const units = ["", "K", "M", "B", "T"]
  let unitIndex = 0

  while (number >= 1000 && unitIndex < units.length - 1) {
    number /= 1000
    unitIndex++
  }

  if (unitIndex === 0) return number.toFixed(0) + units[unitIndex]

  return number.toFixed(1) + units[unitIndex]
}