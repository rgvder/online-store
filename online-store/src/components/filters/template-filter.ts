import {ElementBuilder} from "../../controllers/element-builder";

export const templateCheckbox = ElementBuilder.buildTemplate`
    <div class="checkbox__container">
      <input class="checkbox__input" type="checkbox" id="${'id'}" name="${'id'}">
      <label class="checkbox__label" for="${'id'}">${'title'}</label>
    </div>
`;

export const templateColorCheckbox = ElementBuilder.buildTemplate`
    <div class="checkbox__container">
      <input class="checkbox__input" type="checkbox" id="${'id'}" name="${'id'}">
      <label class="checkbox__label" for="${'id'}">
        <span class="checkbox__color-title">${'title'}</span>
        <span class="checkbox__color" style="background-color:${'additional'};"></span>
      </label>
    </div>
`;

export const templateRangeSlider = ElementBuilder.buildTemplate`
   <div class="slider ${'selector'}">
     <h3 class="filters__text slider__header">${'title'}</h3>
     <div class="slider__wrapper"></div>
     <div class="slider__inputs">
       <label class="input-number-label">
         <span class="text">от</span>
         <input type="number" class="input-number input-start">
         <span class="text">${'unit'}</span>
       </label>
       <span class="input-number__separator"></span>
       <label class="input-number-label">
         <span class="text">до</span>
         <input type="number" class="input-number input-end">
         <span class="text">${'unit'}</span>
       </label>
     </div>
   </div>
`

export const templateFilter = ElementBuilder.buildTemplate`
<form class="filter__form" name="filter">
  <div class="search">
    <input class="input-text" type="text" name="query" id="query" minlength="3" placeholder="Введите текст" autocomplete="off" autofocus>
    <button class="search__button" type="button" id="queryButton">
    <svg class="search__icon" width="14" height="14" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7.99999 6.58578L14.2929 0.292893C14.6834 -0.0976313 15.3166 -0.0976307 15.7071 0.292894C16.0976 0.683418 16.0976 1.31658 15.7071 1.70711L9.41421 7.99999L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L7.99999 9.41421L1.70711 15.7071C1.31658 16.0976 0.683418 16.0976 0.292894 15.7071C-0.0976307 15.3166 -0.0976313 14.6834 0.292893 14.2929L6.58578 7.99999L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"/>
</svg>
</button>
  </div>
  
<div class="isPopular">
  <input class="isPopular__input" type="checkbox" id="popular" name="popular">
  <label class="isPopular__label" for="popular">
    <div class="isPopular__wrapper"></div>
    <span>Только популярные</span>
  </label>
</div>
  
  <div class="filters__sorting">
  <h3 class="filters__text">Сортировка</h3>
  <select class="sorting" name="sorting" id="sorting">
    <option value="nameAsc">
    <span>по наименованию &#8593;</span>
    </option>
    <option value="nameDesc">по наименованию &#8595;</option>
    <option value="priceAsc">по цене &#8593;</option>
    <option value="priceDesc">по цене &#8595;</option>
    <option value="rating">по рейтингу</option>
  </select>
  </div>
  
  <fieldset class="checkbox" name="brandCheckbox">
    <legend class="filters__text">Производитель</legend>
    <div class="checkbox__wrapper">
      ${'brandCheckbox'}
    </div>
  </fieldset>
    
    <fieldset class="checkbox" name="cleaningTypeCheckbox">
      <legend class="filters__text">Тип уборки</legend>
      <div class="checkbox__wrapper">
        ${'cleaningTypeCheckbox'}
      </div>
   </fieldset>
    
    <fieldset class="checkbox" name="colorCheckbox">
      <legend class="filters__text">Цвет</legend>
      <div class="checkbox__wrapper">
        ${'colorCheckbox'}
      </div>
    </fieldset>
    
    ${'sliderPrice'}
    
    ${'sliderSuctionPower'}
</form>`;