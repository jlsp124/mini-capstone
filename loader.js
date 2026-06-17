(function () {
  var loaderEl = document.getElementById("loader");
  var loaderNumber = document.getElementById("loader-number");
  var loaderTitle = document.getElementById("loader-title");
  if (!loaderEl || !loaderNumber || !loaderTitle) return;

  history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
  document.body.style.overflow = "hidden";

  var isMob = window.innerWidth <= 768;
  var steps = [
    { number: 0, title: "BUILDING FUTURE BLUEPRINT" },
    { number: 22, title: "OPENING PERSONAL ARCHIVE" },
    { number: 84, title: "ASSEMBLING PATHWAY" },
    { number: 100, title: "PRESENTATION READY" },
  ];
  var stepIndex = 0;
  var animDone = false;
  var readyPromise = null;
  var hiding = false;

  function typeTitle(text, callback) {
    var i = 0;
    loaderTitle.textContent = "";
    var speed = isMob ? 24 : 42;
    var interval = setInterval(function () {
      if (i < text.length) {
        loaderTitle.textContent += text[i++];
      } else {
        clearInterval(interval);
        setTimeout(callback, isMob ? 180 : 320);
      }
    }, speed);
  }

  function showNumber(num, callback) {
    var staggerIn = isMob ? 0.06 : 0.12;
    var staggerOut = isMob ? 0.035 : 0.07;

    function animateIn() {
      loaderNumber.innerHTML = String(num).split("").map(function (digit) {
        return '<span style="display:inline-block">' + digit + "</span>";
      }).join("");
      var spans = loaderNumber.querySelectorAll("span");
      window.gsap.set(spans, { clipPath: "inset(100% 0 0% 0)", y: 60 });
      window.gsap.to(spans, {
        clipPath: "inset(0% 0 0% 0)",
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: staggerIn,
        onComplete: callback,
      });
    }

    var existing = loaderNumber.querySelectorAll("span");
    if (existing.length > 0) {
      window.gsap.to(existing, {
        clipPath: "inset(0 0 100% 0)",
        y: -40,
        duration: 0.38,
        ease: "power3.in",
        stagger: staggerOut,
        onComplete: animateIn,
      });
    } else {
      animateIn();
    }
  }

  function runSteps() {
    if (stepIndex >= steps.length) {
      animDone = true;
      tryHide();
      return;
    }

    var step = steps[stepIndex++];
    typeTitle(step.title, function () {
      showNumber(step.number, function () {
        if (step.number === 100) {
          window.gsap.to(loaderNumber, {
            color: "#c8a96a",
            duration: 0.32,
            delay: 0.14,
            onComplete: function () {
              setTimeout(function () {
                animDone = true;
                tryHide();
              }, 260);
            },
          });
        } else {
          setTimeout(runSteps, isMob ? 260 : 520);
        }
      });
    });
  }

  function tryHide() {
    if (!animDone || hiding) return;
    hiding = true;
    var timeout = new Promise(function (resolve) { setTimeout(resolve, 5000); });
    Promise.race([readyPromise || Promise.resolve(), timeout]).then(doHide);
  }

  function doHide() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var glitch = document.createElement("canvas");
    glitch.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:100000;pointer-events:none;image-rendering:pixelated;";
    glitch.width = Math.max(1, Math.floor(width / 2));
    glitch.height = Math.max(1, Math.floor(height / 2));
    document.body.appendChild(glitch);
    var ctx = glitch.getContext("2d");
    var start = Date.now();
    var duration = 620;

    function frame() {
      var t = Math.min(1, (Date.now() - start) / duration);
      var ease = t * t;
      ctx.clearRect(0, 0, glitch.width, glitch.height);

      var bars = Math.floor(4 + ease * 22);
      for (var i = 0; i < bars; i++) {
        var y = Math.random() * glitch.height;
        var h = 1 + Math.random() * (ease * 30);
        var dx = (Math.random() - 0.5) * ease * 90;
        ctx.fillStyle = "rgba(0,0,0,0.92)";
        ctx.fillRect(0, y, glitch.width, h);
        if (Math.random() < 0.68) {
          ctx.fillStyle = "rgba(200,169,106," + (Math.random() * 0.55 * ease) + ")";
          ctx.fillRect(dx - 4, y, glitch.width, h);
        }
        if (Math.random() < 0.55) {
          ctx.fillStyle = "rgba(200,230,255," + (Math.random() * 0.4 * ease) + ")";
          ctx.fillRect(dx + 6, y, glitch.width, h);
        }
      }

      if (Math.random() < ease * 0.5) {
        ctx.fillStyle = "rgba(255,255,255," + (0.3 + Math.random() * 0.55) + ")";
        ctx.fillRect(0, Math.random() * glitch.height, glitch.width, Math.random() < 0.6 ? 1 : 2);
      }

      if (t > 0.48) {
        loaderEl.style.opacity = String(Math.max(0, 1 - (t - 0.48) * 1.92));
      }

      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, glitch.width, glitch.height);
        loaderEl.style.opacity = "0";
        setTimeout(function () {
          if (glitch.parentNode) glitch.parentNode.removeChild(glitch);
          loaderEl.style.display = "none";
          document.body.style.overflow = "";
          if (window.lenis) window.lenis.start();
          if (window._onLoaderHidden) window._onLoaderHidden();
        }, 55);
      }
    }

    frame();
  }

  window._loaderSetReadyPromise = function (promise) {
    readyPromise = promise;
    tryHide();
  };

  runSteps();
})();
