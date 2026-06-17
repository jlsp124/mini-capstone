(function () {
  var loaderEl = document.getElementById("loader");
  var loaderNumber = document.getElementById("loader-number");
  var loaderTitle = document.getElementById("loader-title");
  if (!loaderEl || !loaderNumber || !loaderTitle) return;

  history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
  document.body.style.overflow = "hidden";

  var isMob = window.innerWidth <= 768;
  var motionParams = new URLSearchParams(window.location.search);
  var forceNoGsap = motionParams.get("forceNoGsap") === "1";
  var reducedMotion = motionParams.get("forceReducedMotion") === "1" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var titleText = "JOVAN PAHAL";
  var titleIndex = 0;

  function hasGsap() {
    return !forceNoGsap && !reducedMotion && window.gsap && window.gsap.set && window.gsap.to;
  }

  function startTypewriter(callback) {
    var speed = isMob ? 30 : 55;
    var interval = setInterval(function () {
      if (titleIndex < titleText.length) {
        loaderTitle.textContent += titleText[titleIndex++];
      } else {
        clearInterval(interval);
        setTimeout(callback, 400);
      }
    }, speed);
  }

  var numbers = [0, 19, 84, 100];
  var numIndex = 0;
  var animDone = false;
  var readyPromise = null;
  var hiding = false;

  function showNumber(num, callback) {
    var staggerIn = isMob ? 0.08 : 0.15;
    var staggerOut = isMob ? 0.05 : 0.10;

    function animateIn() {
      loaderNumber.innerHTML = String(num).split("").map(function (digit) {
        return '<span style="display:inline-block">' + digit + "</span>";
      }).join("");
      var spans = loaderNumber.querySelectorAll("span");
      if (!hasGsap()) {
        setTimeout(callback, 120);
        return;
      }
      window.gsap.set(spans, { clipPath: "inset(100% 0 0% 0)", y: 60 });
      window.gsap.to(spans, {
        clipPath: "inset(0% 0 0% 0)",
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: staggerIn,
        onComplete: callback
      });
    }

    var existing = loaderNumber.querySelectorAll("span");
    if (existing.length > 0) {
      if (!hasGsap()) {
        animateIn();
        return;
      }
      window.gsap.to(existing, {
        clipPath: "inset(0 0 100% 0)",
        y: -40,
        duration: 0.4,
        ease: "power3.in",
        stagger: staggerOut,
        onComplete: animateIn
      });
    } else {
      animateIn();
    }
  }

  function tryHide() {
    if (!animDone || hiding) return;
    hiding = true;
    var timeout = new Promise(function (resolve) { setTimeout(resolve, 5000); });
    Promise.race([readyPromise || Promise.resolve(), timeout]).then(doHide);
  }

  function doHide() {
    function finishHide() {
      loaderEl.style.display = "none";
      document.body.style.overflow = "";
      if (window.lenis) window.lenis.start();
      if (window._onLoaderHidden) window._onLoaderHidden();
    }

    if (reducedMotion) {
      if (typeof loaderEl.animate === "function") {
        loaderEl.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 180,
          easing: "linear",
          fill: "forwards"
        });
      }
      setTimeout(function () {
        loaderEl.style.opacity = "0";
        finishHide();
      }, 210);
      return;
    }

    var width = window.innerWidth;
    var height = window.innerHeight;
    var glitch = document.createElement("canvas");
    glitch.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:100000;pointer-events:none;image-rendering:pixelated;";
    glitch.width = width;
    glitch.height = height;
    document.body.appendChild(glitch);
    var ctx = glitch.getContext("2d");
    var start = Date.now();
    var duration = 620;

    function frame() {
      var t = Math.min(1, (Date.now() - start) / duration);
      var ease = t * t;
      ctx.clearRect(0, 0, width, height);

      var bars = Math.floor(4 + ease * 20);
      for (var i = 0; i < bars; i++) {
        var y = Math.random() * height;
        var h = 1 + Math.random() * (ease * 55);
        var dx = (Math.random() - 0.5) * ease * 160;

        ctx.fillStyle = "rgba(0,0,0,0.9)";
        ctx.fillRect(0, y, width, h);

        if (Math.random() < 0.65) {
          ctx.fillStyle = "rgba(204,0,0," + (Math.random() * 0.6 * ease) + ")";
          ctx.fillRect(dx - 6, y, width, h);
        }
        if (Math.random() < 0.55) {
          ctx.fillStyle = "rgba(180,230,255," + (Math.random() * 0.45 * ease) + ")";
          ctx.fillRect(dx + 9, y, width, h);
        }
      }

      if (Math.random() < ease * 0.45) {
        ctx.fillStyle = "rgba(255,255,255," + (0.4 + Math.random() * 0.6) + ")";
        ctx.fillRect(0, Math.random() * height, width, Math.random() < 0.6 ? 1 : 2);
      }

      if (t > 0.48) {
        loaderEl.style.opacity = String(Math.max(0, 1 - (t - 0.48) * 1.92));
      }

      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, width, height);
        loaderEl.style.opacity = "0";
        setTimeout(function () {
          if (glitch.parentNode) glitch.parentNode.removeChild(glitch);
          finishHide();
        }, 55);
      }
    }

    frame();
  }

  window._loaderSetReadyPromise = function (promise) {
    readyPromise = promise;
    tryHide();
  };

  window._loaderSetHandPromise = window._loaderSetReadyPromise;

  function runNumbers() {
    if (numIndex >= numbers.length) return;
    var num = numbers[numIndex++];
    var wait = isMob ? 300 : 600;

    showNumber(num, function () {
      if (num === 100) {
        if (!hasGsap()) {
          loaderNumber.style.color = "#cc0000";
          setTimeout(function () {
            animDone = true;
            tryHide();
          }, 300);
          return;
        }
        window.gsap.to(loaderNumber, {
          color: "#cc0000",
          duration: 0.3,
          delay: 0.2,
          onComplete: function () {
            setTimeout(function () {
              animDone = true;
              tryHide();
            }, 300);
          }
        });
      } else {
        setTimeout(runNumbers, wait);
      }
    });
  }

  startTypewriter(function () {
    runNumbers();
  });
})();
