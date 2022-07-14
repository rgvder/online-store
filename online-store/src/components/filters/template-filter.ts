import {ElementBuilder} from "../../controllers/element-builder";

export const templateCheckbox = ElementBuilder.buildTemplate`
    <div>
      <input type="checkbox" id="${'id'}" name="${'id'}">
      <label for="${'id'}">${'title'}</label>
    </div>
`;

export const templateFilter = ElementBuilder.buildTemplate`
<form class="filter__form" name="filter">
  <div class="search">
    <input class="input-text" type="text" name="query" id="query" minlength="3" placeholder="Введите текст" autocomplete="off" autofocus>
    <button type="reset" id="queryButton">Clear</button>
  </div>
  
  <select name="sorting" id="sorting">
    <option value="nameAsc">По наименованию от A до Z</option>
    <option value="nameDesc">По наименованию от Z до A</option>
    <option value="priceAsc">По возрастанию цены</option>
    <option value="priceDesc">По убыванию цены</option>
    <option value="rating">По рейтингу</option>
  </select>
  
  <fieldset name="brandCheckbox">
    <legend>Бренд</legend>
    ${'brandCheckbox'}
    </fieldset>
    
    <fieldset name="cleaningTypeCheckbox">
    <legend>Тип уборки</legend>
    ${'cleaningTypeCheckbox'}
    </fieldset>
</form>`;