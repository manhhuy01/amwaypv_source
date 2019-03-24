export const generateDataStructure = (products) => {
  if (products)
    return products.map(product => ({
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.name,
      "image": product.imageLink,
      "brand": {
        "@type": "Thing",
        "name": "Amway"
      },
      "offers": {
        "@type": "AggregateOffer",
        "lowPrice": product.dp,
        "highPrice": product.cp,
        "priceCurrency": "VND"
      }
    }))
  return []
}

export const formatNumber = (num) => num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");