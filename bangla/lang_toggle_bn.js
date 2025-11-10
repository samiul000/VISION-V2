/* lang_toggle_bn.js — for Bangla page (index_bn.html)
   Starts with BN active (right side), clicking toggles to EN and loads English page.
*/
(function () {
  const knob = document.getElementById("toggleKnob");
  const langSwitch = document.getElementById("langSwitch");

  const EN_PAGE = "../index.html";
  const BN_PAGE = "index_bn.html";

  if (!langSwitch || !knob) return;

  let currentLang = "BN"; // initial state (knob on right)

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
    knob.style.left = currentLang === "BN" ? pos.right + "px" : pos.left + "px";

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
    currentLang = currentLang === "BN" ? "EN" : "BN";
    updateUI();

    document.body.style.opacity = "0";
    setTimeout(() => {
      window.location.href = currentLang === "BN" ? BN_PAGE : EN_PAGE;
    }, 300);
  });
})();
