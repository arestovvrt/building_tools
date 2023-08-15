export default function showAlert(text, style, insertMethod, timeout) {
  const bodyEl = document.getElementById("container");
  const elemId = new Date().getTime();

  const msgHtml = `
      <div id="${elemId}" class="alert alert-${style} alert-dismissible fade show" role="alert">
          ${text}
          <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          ></button>
      </div>`;
  bodyEl.insertAdjacentHTML(insertMethod, msgHtml);

  // Remove after ...
  const msgEl = document.getElementById(elemId);
  setTimeout(() => {
    msgEl.remove();
  }, timeout);
}
