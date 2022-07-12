import {ElementBuilder} from "../../controllers/element-builder";

export const templateCatalog = ElementBuilder.buildTemplate`
  <div class="catalog__count">
  ${'count'}
</div>
  <div class="catalog__wrapper wrapper">
  ${'cards'}
  </div>`;