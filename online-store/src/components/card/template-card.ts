import {ElementBuilder} from "../../controllers/element-builder";

export const templateCard = ElementBuilder.buildTemplate`
<article class="card">
  <img class="card__image" src="${'image'}" alt="${'model'}">
  
  <div class="card__content">
    <div class="card__info">
    <h3 class="header-text">${'model'}</h3>
    <div class="card__rating rating-${'rating'}"></div>
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
      <div class="card__buttons-basket ${'buttonClass'} ${'disabledClass'}">
        <button data-id="${'id'}" class="button button_basic basket-remove">&#8722;</button>
        <span class="basket-count">${'basketCount'}</span>
        <button data-id="${'id'}" class="button button_basic basket-add">
          <span class="basket-add__plus">&#43;</span>
          <span class="basket-add__text">В корзину</span>
        </button>
      </div>
      <button data-id="${'id'}" class="button button_icon button-favorite ${'isFavorite'}">
        <svg class="icon-heart" width="24" height="21" viewBox="0 0 24 21" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9994 2.10589C8.47019 -1.24772 3.26381 0.138319 1.35872 3.87584C0.313178 5.92706 0.298896 8.57818 1.84178 11.388C3.37099 14.173 6.41989 17.1125 11.5156 19.929L11.9993 20.1964L12.4831 19.9291C17.579 17.1126 20.6281 14.173 22.1574 11.3881C23.7004 8.57821 23.6861 5.92708 22.6406 3.87584C20.7355 0.138247 15.5289 -1.24767 11.9994 2.10589Z"/>
        </svg>
      </button>
      </div>
     <span class="text feature-text">В наличии ${'count'} шт.</span>
    </div>
  </div>
</article>`;