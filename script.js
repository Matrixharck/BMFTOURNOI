// script.js
const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyXdEoO-8x4qmRJPxWkCjHbSMCt6P_7p00zKByPdcJ7E5ZCkg6d65h6kppgAvgaO7PH/exec";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const confirmation = document.getElementById("confirmation");
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // UI : on signale à l’utilisateur que l’envoi est en cours
    confirmation.textContent = "⏳ Envoi en cours…";
    submitBtn.disabled = true;
    submitBtn.textContent = "Envoi…";

    try {
      // Préparation des données
      const data = new FormData(form);
      const params = new URLSearchParams(data);

      // Appel Apps Script
      const res = await fetch(ENDPOINT, { method: "POST", body: params });

      if (!res.ok) throw new Error("Network error");

      // Succès : message + redirection
      confirmation.textContent = "✅ Inscription envoyée avec succès !";
      const teamName = encodeURIComponent(form.team.value.trim());

      // Petite pause de 1 s pour laisser le temps de lire le message
      setTimeout(() => {
        window.location.href = payement.html?team=$:{teamName};
      }, 1000);

      form.reset();
    } catch (err) {
      console.error(err);
      confirmation.textContent = "❌ Une erreur est survenue. Réessayez.";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Envoyer";
    }
  });
});