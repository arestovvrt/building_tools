import styles from "./styles.scss";
import { items } from "./js/items";

const showItem = (item) => {
  console.log(item);
  let innerEl;
  switch (item.type) {
    case "image":
      innerEl = `<img src="${item.src}" class="card-img-top" alt="${item.title}"></img>`;
      break;
    case "audio":
      innerEl = `<figure>
          <audio
          controls
          src="${item.src}">
          </audio>
        </figure>`;
      break;
    case "video":
      innerEl = `<video controls>
      <source src="${item.src}" type="video/mp4">
      Sorry, your browser doesn't support embedded videos.
    </video>`;
      break;
  }

  return `
    <div class="card" style="height: 300px;">
      <div class="card-body ${styles.cardBody}">
        ${innerEl}
      </div>
      <h5 class="card-title mt-2">${item.title}</h5>
    </div>`;
};

const id = "gallery";
const rootEl = `<div class="${styles.gallery} mt-4" id="${id}">`;
document.querySelector("#container").insertAdjacentHTML("beforeend", rootEl);
const galleryEl = document.querySelector(`#${id}`);

items.forEach((el) => {
  galleryEl.insertAdjacentHTML("beforeend", showItem(el));
});
