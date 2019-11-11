function Pizza(size, crust) {
  this.size = size;
  this.crust = crust;
  this.toppings = [];
}

function Location(name, estate) {
  this.name = name;
  this.estate = estate;
}
var sizePrice = {
  small: 550,
  medium: 800,
  large: 1000
};
var toppingPrice =
{
  meat: 100,
  vegetable: 50,
  doubleStack: 150,
};

var crustPrice = {
  thick: 100,
  thin: 70,
  custom: 50,
};

function sizeCalcPrice(size) {
  if (size === "small") {
    return sizePrice.small * 1;
  } else if (size === "medium") {
    return sizePrice.medium * 1;
  } else {
    return sizePrice.large * 1;
  }
}

function crustCalcPrice(crust) {
  if (crust === "thick") {
    return crustPrice.thick * 1;
  } else if (crust === "thin") {
    return crustPrice.thin * 1;
  } else {
    return crustPrice.custom * 1;
  }
}
function toppingsCalcPrice(toppings) {
  var noOfTopping = 0;
  for (i = 0; i < toppings.length; i++) {
    if (toppings[i] == "meat") {
      noOfTopping += 100;
    }
    if (toppings[i] == "vegetable") {
      noOfTopping += 50;
    }
    if (toppings[i] == "doubleStack") {
      noOfTopping += 150;
    }
  }
  return noOfTopping * 1;
}


function checkmeat(topping) {
  return topping === "meat";
}

$("document").ready(function () {

  function getPizzaSize() {
    return $("#pizza-size")
      .find(":selected")
      .val();
  }

  function getCrust() {
    return $("#pizza-crust")
      .find(":selected")
      .val();
  }

  function getToppings() {
    var toppingList = [];
    $(".toppings :checked").each(function () {
      toppingList.push($(this).val());
    });
    return toppingList;
  }


  $("form#myform").submit(function (event) {
    event.preventDefault();
    var pizzaSize = getPizzaSize();
    var crust = getCrust();
    var toppingList = getToppings();

    var newPizza = new Pizza(pizzaSize, crust);
    newPizza.toppings.push(toppingList);
    $("#cart").hide();
    $("#table").show();
    $(".checkout").show();
    var oneOrder =
      sizeCalcPrice(pizzaSize) +
      crustCalcPrice(crust) +
      toppingsCalcPrice(toppingList);


    $("#items").append(
      "<tr>" +
      "<td>" +
      newPizza.size +
      "</td>" +
      "<td>" +
      "<p>" +
      newPizza.crust +
      "</p>" +
      "</td>" +
      "<td>" +
      newPizza.toppings +
      "</td>" +
      "<td>" +
      oneOrder +
      "</td>" +
      "</tr>"
    );
  });
  var totalQuantity = parseInt($("#quantity").val());
  function calcTotal() {
    var priceOnePizza =
      sizeCalcPrice(getPizzaSize()) +
      crustCalcPrice(getCrust()) +
      toppingsCalcPrice(getToppings());
    return priceOnePizza;
  }
  var pizzaList = [];

  $("#orderbtn").on("click", function () {
    totalQuantity += 1;
    $("#quantity").text(totalQuantity);
    pizzaList.push(calcTotal());
  });


  $("#checkoutbtn").click(function () {
    var total = 0;
    pizzaList.forEach(function (pizza) {
      total += pizza;
    });
    alert("We deliver at a cost of ksh 200 in 30 mins.")
    $("#money").text(total);
  });


  $("#myModel").click(function () {
    var deliver = confirm(
      alert("We deliver at a cost of ksh 200 in 30 mins.")
    );
    if (deliver) {
      var place = prompt("location");
      $("#place").text(place);
      $("#success").show();
    } else {
      $("#no-delivery").show();
    }

    $("#pizza-size").val("");
    $("#pizza-crust").val("");
    $("#items").remove();
    $("#quantity").text(0);
  });
});