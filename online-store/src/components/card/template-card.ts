import {ElementBuilder} from "../../controllers/element-builder";

export const templateCard = ElementBuilder.buildTemplate`
<article class="card">
  <img class="card__image" src="${'image'}" alt="${'model'}" width="200px">
  <span class="card__name">${'model'}</span>
  <span class="card__price">${'price'} ₽</span>
  <span class="card__count">В наличии ${'count'} шт.</span>
</article>`;