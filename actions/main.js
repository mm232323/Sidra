"use server";

import { revalidatePath } from "next/cache";

export async function getOrders() {
  const response = await fetch(`${process.env.SERVER_HOST_PORT}/get_orders`);
  const orders = (await response.json()).orders;
  return orders;
}

export async function setOrder(state, event) {
  const orders = await getOrders();
  const data = Object.fromEntries(event.entries());
  const errors = [];
  const products = data.products.split("|").map((product) => {
    product = product.split("_");
    return {
      name: product[0],
      weight: product[1],
      quantity: +product[2],
      type: product[3],
    };
  });
  if (data.name.length < 3) errors.push("name");
  if (data.phone.length !== 11) errors.push("phone");
  if (data.date.length == 0) errors.push("date");
  for (let i = 0; i < products.length; i++) {
    const choosedProd = products[i];
    if (
      choosedProd.name == "الاسم" ||
      choosedProd.weight == 0 ||
      choosedProd.quantity == 0 ||
      choosedProd.type == "النوع"
    )
      errors.push(`product_${i}`);
  }
  if (errors.length) return errors;
  data.id = orders.length + 1;
  const response = await fetch(`${process.env.SERVER_HOST_PORT}/set_order`, {
    method: "POST",
    body: JSON.stringify({ ...data, products }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resMes = (await response.json()).message;
  console.log(resMes);
  revalidatePath("/orders", "page");
  return ["done"];
}

export async function handleOrderActions(order, state) {
  const response = await fetch(
    `${process.env.SERVER_HOST_PORT}/handle_order/${state}`,
    {
      method: "POST",
      body: JSON.stringify({ order }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const resMes = (await response.json()).message;
  console.log(resMes);
  if (state == "successed") {
    const mainProds = await getProducts();
    let totalProductPrice = 0;
    let totalClientPrice = 0;
    let extra_costs = 0;
    const products = order.products;
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      console.log(product);
      if (product.type == "سدرة") continue;
      const mainProd = mainProds.filter(
        (prod) => product.name == prod.name && product.weight == prod.weight
      )[0];
      const client_price = +mainProd.price * product.quantity;
      const product_price = +mainProd.product_price * product.quantity;
      totalProductPrice += product_price;
      if (product.type == "هدية") {
        extra_costs += product_price;
      } else {
        totalClientPrice += client_price;
      }
    }
    const response2 = await fetch(
      `${process.env.SERVER_HOST_PORT}/handle_total_purchases`,
      {
        method: "POST",
        body: JSON.stringify({
          products_price: totalProductPrice,
          client_price: totalClientPrice,
          extra_costs,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resMes = (await response.json()).message;
  }
}

export async function getPurchases() {
  const response = await fetch(`${process.env.SERVER_HOST_PORT}/get-purchases`);
  const purchases = (await response.json()).purchases;
  console.log(purchases);
  return purchases;
}

export async function getProducts() {
  const response = await fetch(`${process.env.SERVER_HOST_PORT}/get-products`);
  const products = await response.json();
  return products;
}

export async function setProduct(state, event) {
  const data = Object.fromEntries(event.entries());
  const errors = [];
  if (data.name.length < 3) errors.push("name");
  if (data.weight == "") errors.push("weight");
  if (+data.product_price == 0) errors.push("product_price");
  if (+data.price == 0) errors.push("price");
  if (errors.length) return errors;
  data.type = "product";
  data.stock = 0;
  data.remained = 0;
  const response = await fetch(`${process.env.SERVER_HOST_PORT}/set-product`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resMes = (await response.json()).message;
  console.log(resMes);
  return ["done"];
}

export async function setOffer(state, event) {
  const data = Object.fromEntries(event.entries());
  data.type = "offer";
  const errors = [];
  if (data.name.length < 3) errors.push("name");
  if (data.price.length < 3) errors.push("price");
  const products = data.products.split("|").map((prod) => prod.split("_"));
  for (let i = 0; i < products.length; i++) {
    const selectedProd = products[i];
    if (
      selectedProd[0] == "الاسم" ||
      +selectedProd[1] == 0 ||
      +selectedProd[2] == 0
    )
      errors.push(`product_${i}`);
  }
  if (errors.length) return errors;
  data.products = products.map((prod, idx) => {
    console.log(prod);
    return {
      name: prod[0],
      weight: prod[1],
      quantity: prod[2],
      id: idx + 1,
    };
  });
  const response = await fetch(`${process.env.SERVER_HOST_PORT}/set-product`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resMes = (await response.json()).message;
  console.log(resMes);
  return ["done"];
}

export async function setCharge(state, event) {
  const data = Object.fromEntries(event.entries());
  let products = data.products.split("|").map((product) => product.split("_"));
  const errors = [];
  if (data.order_price == "") errors.push("order_price");
  for (let i = 0; i < products.length; i++) {
    const selectedProd = products[i];
    if (
      selectedProd[0] == "الاسم" ||
      +selectedProd[1] == 0 ||
      +selectedProd[2] == 0
    )
      errors.push(`product_${i}`);
  }
  if (errors.length) return errors;
  data.products = products.map((prod, idx) => {
    return {
      name: prod[0],
      weight: prod[1],
      quantity: +prod[2],
      id: idx + 1,
    };
  });
  products = data.products;
  let totalPrice = +data.order_price;
  const mainProds = await getProducts();
  for (let i = 0; i < products.length; i++) {
    let price = mainProds.filter(
      (prod) =>
        prod.name == products[i].name && prod.weight == products[i].weight
    )[0];
    if (price == undefined) {
      errors.push(`product_${i}`);
      continue;
    }
    price = price.product_price;
    totalPrice += +price * +products[i].quantity;
  }
  if (errors.length) return errors;
  data.totalPrice = totalPrice;
  const response = await fetch(`${process.env.SERVER_HOST_PORT}/set-charge`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response2 = await fetch(
    `${process.env.SERVER_HOST_PORT}/handle-remained-prods`,
    {
      method: "POST",
      body: JSON.stringify({ prods: products }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await response2.json();
  return ["done"];
}

export async function getCharges() {
  const response = await fetch(`${process.env.SERVER_HOST_PORT}/get-charges`);
  const charges = await response.json();
  return charges;
}
