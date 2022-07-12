import {ElementBuilder} from "../../controllers/element-builder";

export const templateCatalog = ElementBuilder.buildTemplate`
  <div class="catalog__count">
  Найдено товаров: ${'count'} шт.
</div>
  <div class="catalog__wrapper">
  ${'cards'}
  </div>`;