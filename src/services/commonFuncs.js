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

export const convertVietnameseToEnglish = (str) => {
  if (!str) return '';
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|=|<|>|\?|\/|,|\.|:|;|'| |"|&|#|\[|\]|~|$|_/g,
    '-',
  );

  /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
  str = str.replace(/-+-/g, '-'); // thay thế 2- thành 1-
  str = str.replace(/^-+|-+$/g, '');  // cắt bỏ ký tự - ở đầu và cuối chuỗi
  str = str.replace(/-/g, ' ')

  return str;
}


const REGEX_FIRST_CHARACTER = /^.| +./g
export const searchString = (searchText, nameProduct) => {
  const searchTxt = convertVietnameseToEnglish(searchText)
  let name = convertVietnameseToEnglish(nameProduct)

  let firstCharacters = name.match(REGEX_FIRST_CHARACTER)
    .join('')
    .replace(/ /g, '')
  return name.includes(searchTxt) || firstCharacters.includes(searchTxt)

}

export const parseParams = (search) => {
  if (!search) return ''
  var params = search ? search.substring(1) : window.location.search.substring(1);
  return JSON.parse('{"' + decodeURI(params).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

export const objectToParams = (obj) => {
  var str = "";
  for (var key in obj) {
    if (str !== "") {
      str += "&";
    }
    str += key + "=" + encodeURIComponent(obj[key]);
  }
  return str;
}

export const validatedUser = (ada, password) => {
  let rs = true;
  if (!ada) {
    return false;
  }
  if (ada.length !== 7) {
    return false;
  }
  if (!password) {
    return false;
  }
  if (password.length !== 8) {
    return false;
  }
  return rs;
}

export const cartToDescription = (cartSelected) => {
  const products = cartSelected.products.map((item)=> `${item.amount} ${item.product.name}` ).join(',')
  return `Tổng tiền: ${formatNumber(cartSelected.totalCp)} VND. Bao gồm các món: ${products}`
}

export const cartToParams = (cartSelected) => {
  const obj = {
    customerPrice: cartSelected.totalCp,
    count: cartSelected.totalItem,
    cartDetail: cartSelected.products.map((item)=> `${item.amount}-${item.product.sku}`).join('~')
  }
  return objectToParams(obj)
}