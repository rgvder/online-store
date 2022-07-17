import {ElementBuilder} from "../../controllers/element-builder";

export const templateCard = ElementBuilder.buildTemplate`
<article class="card">
  <img class="card__image" src="${'image'}" alt="${'model'}" width="200px">
  <div class="card__info">
    <h3 class="header-text">${'model'}</h3>
    <div class="card__rating rating-${'rating'}">
    
</div>
    <ul class="info">
      <li class="info__list">
        <span class="text">Производитель</span>
        <span class="text feature-text">${'brand'}</span>
      </li>
      <li class="info__list">
        <span class="text">Цвет</span>
        <span class="text feature-text">${'color'}</span>
      </li>
      <li class="info__list">
        <span class="text">Тип уборки</span>
        <span class="text feature-text">${'cleaningType'}</span>
      </li>
      <li class="info__list">
        <span class="text">Мощность всасывания</span>
        <span class="text feature-text">${'suctionPower'} Вт</span>
      </li>
    </ul>
  </div>
  <div class="card__buy">
    <span class="card__price">${'price'} ₽</span>
    <div class="card__buttons">
      <button class="button button_basic">
        <img class="card__basket" src="source/icons/basket.svg" alt="Добавить в корзину">
        В корзину
      </button>
      <button class="button button_icon">
        <svg class="icon-heart"  width="18" height="16" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99925 12.2715C4.93321 10.5252 3.22318 8.78955 2.39626 7.28361C1.54992 5.74228 1.62377 4.4441 2.0934 3.52273C3.05872 1.62892 5.80378 1.02333 7.4763 3.13865L7.99921 3.80001L8.52217 3.13868C10.195 1.02327 12.9402 1.62896 13.9055 3.52273C14.3751 4.44408 14.4489 5.74226 13.6025 7.28359C12.7756 8.78954 11.0654 10.5252 7.99925 12.2715ZM7.99928 1.73726C5.64647 -0.498482 2.17555 0.425546 0.905488 2.91723C0.20846 4.2847 0.198939 6.05212 1.22753 7.92536C2.247 9.78198 4.2796 11.7417 7.67675 13.6194L7.99924 13.7976L8.32173 13.6194C11.719 11.7417 13.7517 9.78199 14.7712 7.92537C15.7999 6.05214 15.7904 4.28472 15.0934 2.91723C13.8233 0.425498 10.3523 -0.498448 7.99928 1.73726Z"/>
        </svg>
      </button>
    </div>
    <span class="text feature-text">В наличии ${'count'} шт.</span>
  </div>
</article>`;