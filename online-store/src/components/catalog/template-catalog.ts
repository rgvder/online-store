import {ElementBuilder} from "../../controllers/element-builder";

export const templateCatalog = ElementBuilder.buildTemplate`
  <div class="catalog__count">
    <span class="header-text">Найдено товаров: ${'count'} шт.</span>
  </div>
  <div class="catalog__wrapper">
    ${'cards'}
  </div>`;