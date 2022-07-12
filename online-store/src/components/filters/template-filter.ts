import {ElementBuilder} from "../../controllers/element-builder";

export const templateFilter = ElementBuilder.buildTemplate`
  <div class="search">
  <input type="text" name="${'query'}" id="${'query'}" minlength="3">
  <button type="reset" id="queryButton">Clear</button>
  </div>`;