// For this exercise, you will have to go through a sales profit data of multiple products and return the product with:

//     Highest sales profit

//     Lowest sales profit


// Implement the functions:
function noProduct(productProfitArray) {
  if (productProfitArray.length === 0) {
    return "No Data";
  }
}

function topProduct(productProfitArray) {
  if (productProfitArray.length === 0) {
    return noProduct(productProfitArray);
  }

  let maxProfit = -1;
  let topProduct = "";

  productProfitArray.forEach((product) => {
    const productName = Object.keys(product)[0];
    const profit = product[productName];

    if (profit > maxProfit) {
      maxProfit = profit;
      topProduct = productName;
    }
  });

  return topProduct;
}

function bottomProduct(productProfitArray) {
  if (productProfitArray.length === 0) {
    return noProduct(productProfitArray);
  }

  let minProfit = 1;
  let bottomProduct = "";

  productProfitArray.forEach((product) => {
    const productName = Object.keys(product)[0];
    const profit = product[productName];

    if (profit < minProfit) {
      minProfit = profit;
      bottomProduct = productName;
    }
  });

  return bottomProduct;
}

function zeroProfitProduct(productProfitArray) {
  if (productProfitArray.length === 0) {
    return noProduct(productProfitArray);
  }

  let closestProfit = Infinity;
  let zeroProfitProduct = "";

  productProfitArray.forEach((product) => {
    const productName = Object.keys(product)[0];
    const profit = product[productName];
    const absoluteProfit = Math.abs(profit);

    if (absoluteProfit < closestProfit || (absoluteProfit === closestProfit && profit > 0)) {
      closestProfit = absoluteProfit;
      zeroProfitProduct = productName;
    }
  });

  return zeroProfitProduct;

}

const productProfitArray = [];

let addMore = true;
let productIndex = 0;

while (addMore) {
  productIndex++;
  const productName = "Product " + String.fromCharCode(65 + (productIndex - 1));
  const profit = parseInt(prompt(`Enter the profit of ${productName}:`));

  const product = {};
  product[productName] = profit;
  productProfitArray.push(product);

  const addMoreInput = prompt("Do you want to add more products? (Y/N)").toUpperCase();
  addMore = addMoreInput === "Y";
}

console.log(topProduct(productProfitArray));
console.log(bottomProduct(productProfitArray));
console.log(zeroProfitProduct(productProfitArray));
