$(document).ready(function () {
  var butt = $(".mainbut");

  butt.click(function () {
    butt.attr("src") == "img/desligado.png"
      ? butt.attr("src", "img/ligado.png")
      : butt.attr("src", "img/desligado.png");
    relay_inverse();
  });
  function relay_inverse() {
    var request = new XMLHttpRequest();
    request.open("GET", "/relay_switch", false);
    request.send();
  }

  var voltage = document.querySelector(".voltage svg .azul");
  var voltrange = document.querySelector(".voltrange");
  roundBar(voltage, 12, 45);
  $(".voltval").html(voltrange.value + "<span> V</span>");
  var frequency = document.querySelector(".freq svg .azul");
  var voltas = document.querySelector(".outvolt svg .azul");

  voltrange.oninput = function () {
    roundBar(voltage, voltrange.value, 45);
    $(".voltval").html(voltrange.value + "<span> V</span>");

    roundBar(frequency, voltrange.value * 1000, 100000);
    $("#frequence").html(voltrange.value * 1000 + "<span> kHz</span>");

    roundBar(voltas, voltrange.value * 1000, 100000);
    $("#voltas").html(voltrange.value * 1000 + "<span> kV</span>");
  };

  var room = document.querySelector(".room svg .orange");
  var scheme = document.querySelector(".scheme svg .orange");
  var prim = document.querySelector(".prim svg .orange");
  var sec = document.querySelector(".sec svg .orange");
  var some = document.querySelector(".something svg .orange");
  var range = document.querySelector(".fanspeed");

  function roundBar(nome, ins, des) {
    var radius = nome.r.baseVal.value;
    var length = 2 * Math.PI * radius;
    nome.style.strokeDasharray = `${length} ${length}`;
    nome.style.strokeDashoffset = length;
    var offset = length - (ins / des) * length;
    nome.style.strokeDashoffset = offset;
  }

  roundBar(room, 37, 100);
  roundBar(scheme, 44, 100);
  roundBar(prim, 89, 100);
  roundBar(sec, 55, 100);
  roundBar(some, 16, 100);

  range.oninput = function () {
    var vel = 1 / range.value;
    var dez = range.value * 10;
    if (range.value == 0) {
      vel = 24;
    }
    $("#helic").css("animation-duration", vel + "s");
    $(".cel h3").html(dez + "<span> ℃</span>");
    roundBar(room, dez, 100);
    roundBar(scheme, dez, 100);
    roundBar(prim, dez, 100);
    roundBar(sec, dez, 100);
    roundBar(some, dez, 100);
  };
});
