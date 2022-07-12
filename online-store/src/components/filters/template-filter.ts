import {ElementBuilder} from "../../controllers/element-builder";

export const templateFilter = ElementBuilder.buildTemplate`
  <div class="search">
  <input class="input-text" type="text" name="${'query'}" id="${'query'}" minlength="3" placeholder="Введите текст" autocomplete="off" autofocus>
  <button type="reset" id="queryButton">Clear</button>
  </div>`;