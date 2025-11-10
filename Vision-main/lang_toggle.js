/* lang_toggle.js — for English page (index.html)
   Starts with EN active (left side), clicking toggles to BN and loads Bangla page.
*/
(function () {
  const knob = document.getElementById("toggleKnob");
  const langSwitch = document.getElementById("langSwitch");

  const EN_PAGE = "index.html";
  const BN_PAGE = "bangla/index_bn.html";

  if (!langSwitch || !knob) return;

  let currentLang = "EN"; // initial state

  function computePositions() {
    const trackRect = langSwitch.getBoundingClientRect();
    const knobRect = knob.getBoundingClientRect();
    const padding = 5;
    return {
      left: padding,
      right: trackRect.width - knobRect.width - padding,
    };
  }

  function updateUI(initial = false) {
    const pos = computePositions();
    knob.style.left = currentLang === "EN" ? pos.left + "px" : pos.right + "px";

    // disable animation on first load
    if (initial) {
      knob.style.transition = "none";
      void knob.offsetWidth; // force repaint
      knob.style.transition = "";
    }
  }

  window.addEventListener("resize", updateUI);
  window.addEventListener("load", () => updateUI(true));

  langSwitch.addEventListener("click", () => {
    currentLang = currentLang === "EN" ? "BN" : "EN";
    updateUI();

    document.body.style.opacity = "0";
    setTimeout(() => {
      window.location.href = currentLang === "EN" ? EN_PAGE : BN_PAGE;
    }, 300);
  });
})();
