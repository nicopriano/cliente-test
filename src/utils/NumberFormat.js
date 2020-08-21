export default function formatNumber (number, decimals) {
  const formatter = new Intl.NumberFormat("es-ES", { minimumFractionDigits: 2 }), 
  dec = Math.pow(10, decimals),
  roundedNumber = Math.round(number * dec) / dec;

  return formatter.format(roundedNumber).replace(/\D00(?=\D*$)/, '');;
}