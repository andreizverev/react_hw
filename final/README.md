Что сделано:
1. Выполнен рефакторинг проекта в соответствии с FSD
2. Оптимизированые рендеринги списоков продуктов и содержимого корзины
- Профайлинг приложения в целом до изменений: см. в profiling: profiling-data.18.11.2025.01-13-39_old.json
- Изменения до и после использования memo в списках: см. в profiling: *_before и *_after
- useMemo применено в Header для демонстрации функционала. Явных подходящих мест для использования useMemo я не обнаружил.
3. Создано демо портальное окно которое появляется при клике по значку сортировки
4. Используется useRef для фокуса в input-е email при открытии страницы логика. Используется useRef в debounce в качестве примера использования "useRef без рендера"
5. Создана сборка vite которая в 2а раза быстрее собирает проект и на порядок быстрее запускает dev-сервер. 
Статистика:
webpack:
- build time: 63780 ms
- размер: 677 КБ
vite + SWC:
-  build time: 28.18s
- размер: 662 КБ
6. Использован useActionState для формы отправки заказа. useOptimistic не применен, т.к. не очевидно, где его стоит использовать.
При этом, UI реагирует сразу при нажатии кнопки при отправке не дожидаясь ответа сервера.
Так же, эмулируется ситуация ошибки оформления которая появляется при первой отправки формы и исчезает при повторной отправке.

Структура папок:
- структура папок соответствует FSD
- app - настройки маршрутизации, защиты и стора (redux)
- pages: все страницы приложения: Основная/домашняя, Избранное, Корзина и т.д.
- widget: крупные самодостаточные части функционала такие, как список карточек товаров, заголовок и футер и т.д.
- features: переиспользуемые фичи продукта, такие как карточка товара, защита и т.д.
- entities: бизнес-сущности, такие как корзина, товар или пользователь
- shared: переиспользуемые сущности, которые, потенциально, можно вынести в библиотеки. Например, интеграция по API, утилитные функции или набор UI-элементов без бизнес-логики.

final
│── .env
│── .eslintignore
│── .eslintrc.js
│── .gitignore
│── .idea
│   │── .gitignore
│   │── final.iml
│   │── inspectionProfiles
│   │   └── Project_Default.xml
│   │── misc.xml
│   │── modules.xml
│   │── prettier.xml
│   └── vcs.xml
│── .prettierignore
│── .prettierrc.js
│── .stylelintignore
│── .stylelintrc.json
│── index.html
│── package-lock.json
│── package.json
│── pnpm-lock.yaml
│── postcss.config.js
│── profiling
│   │── cardList_after.json
│   │── cardList_before.json
│   │── cartList_after.json
│   │── cartList_before.json
│   └── profiling-data.18.11.2025.01-13-39_old.json
│── public
│   └── index.html
│── README.md
│── src
│   │── app
│   │   │── app.module.css
│   │   │── App.tsx
│   │   │── index.ts
│   │   │── routing
│   │   │   └── router.tsx
│   │   │── store.ts
│   │   └── styles
│   │       │── normalize.css
│   │       └── styles.css
│   │── custom.d.ts
│   │── entities
│   │   │── Cart
│   │   │   └── model
│   │   │       │── cart.ts
│   │   │       └── useAddToCart.ts
│   │   │── product
│   │   │   └── model
│   │   │       └── products.ts
│   │   └── user
│   │       └── model
│   │           └── user.ts
│   │── features
│   │   │── Card
│   │   │   │── index.ts
│   │   │   │── model
│   │   │   │   └── useCount.ts
│   │   │   └── ui
│   │   │       │── Card.module.css
│   │   │       │── Card.tsx
│   │   │       │── CartCounter.module.css
│   │   │       │── CartCounter.tsx
│   │   │       │── LikeButton.module.css
│   │   │       │── LikeButton.tsx
│   │   │       │── Price.module.css
│   │   │       └── Price.tsx
│   │   │── Logo
│   │   │   │── assets
│   │   │   │   └── logo.svg
│   │   │   │── index.ts
│   │   │   └── ui
│   │   │       │── Logo.module.css
│   │   │       └── Logo.tsx
│   │   │── Product
│   │   │   │── index.ts
│   │   │   └── model
│   │   │       └── useProducts.ts
│   │   │── Protection
│   │   │   └── model
│   │   │       └── WithProtection.tsx
│   │   │── Search
│   │   │   │── index.tsx
│   │   │   │── model
│   │   │   │   └── usePostsSearchForm.ts
│   │   │   └── ui
│   │   │       │── Search.module.css
│   │   │       └── Search.tsx
│   │   └── Sort
│   │       │── index.ts
│   │       │── model
│   │       │   └── useSort.ts
│   │       └── ui
│   │           └── Sort.tsx
│   │── index.tsx
│   │── pages
│   │   │── CartPage
│   │   │   │── index.ts
│   │   │   └── ui
│   │   │       │── CartAmount.tsx
│   │   │       │── CartItem.tsx
│   │   │       │── CartList.tsx
│   │   │       │── CartPage.module.css
│   │   │       └── CartPage.tsx
│   │   │── FavoritesPage
│   │   │   │── index.ts
│   │   │   └── ui
│   │   │       └── FavoritesPage.tsx
│   │   │── HomePage
│   │   │   │── index.ts
│   │   │   └── ui
│   │   │       └── HomePage.tsx
│   │   │── NotFoundPage
│   │   │   │── index.ts
│   │   │   └── ui
│   │   │       │── NotFoudPage.module.css
│   │   │       └── NotFoundPage.tsx
│   │   │── ProductPage
│   │   │   │── index.ts
│   │   │   └── ui
│   │   │       │── ProductPage.module.css
│   │   │       └── ProductPage.tsx
│   │   │── ProfilePage
│   │   │   │── index.ts
│   │   │   └── ui
│   │   │       │── ProfilePage.module.css
│   │   │       └── ProfilePage.tsx
│   │   │── SignInPage
│   │   │   │── index.ts
│   │   │   └── ui
│   │   │       └── SignInPage.tsx
│   │   └── SignUpPage
│   │       │── index.ts
│   │       └── ui
│   │           └── SignUpPage.tsx
│   │── shared
│   │   │── api
│   │   │   │── ApiServise.ts
│   │   │   │── authApi.ts
│   │   │   │── config.ts
│   │   │   │── productsApi.ts
│   │   │   └── useActionCreated.ts
│   │   │── lib
│   │   │   │── HOCs
│   │   │   │   └── WithQuery.tsx
│   │   │   │── hooks
│   │   │   │   │── useCount.ts
│   │   │   │   │── useDebounce.ts
│   │   │   │   └── usePagination.ts
│   │   │   │── types
│   │   │   │   └── global.d.ts
│   │   │   └── utils
│   │   │       │── common.ts
│   │   │       │── getMessageFromError.ts
│   │   │       │── index.ts
│   │   │       └── isLiked.ts
│   │   │── store.ts
│   │   └── ui
│   │       │── assets
│   │       │   │── icons
│   │       │   │   │── back.svg
│   │       │   │   │── like.svg
│   │       │   │   │── quality.svg
│   │       │   │   │── star.svg
│   │       │   │   │── trash.svg
│   │       │   │   └── truck.svg
│   │       │   └── images
│   │       │       │── instagram.svg
│   │       │       │── telegram.svg
│   │       │       │── viber.svg
│   │       │       │── vk.svg
│   │       │       └── whatsapp.svg
│   │       │── ButtonBack.tsx
│   │       │── Modal.tsx
│   │       │── Rating.tsx
│   │       └── Spinner
│   │           │── index.ts
│   │           │── Spinner.module.css
│   │           └── Spinner.tsx
│   │── vite-env.d.ts
│   └── widgets
│       │── CardList
│       │   │── index.ts
│       │   └── ui
│       │       │── CardList.module.css
│       │       └── CardList.tsx
│       │── Footer
│       │   │── index.ts
│       │   └── ui
│       │       │── Footer.module.css
│       │       └── Footer.tsx
│       │── Header
│       │   │── index.ts
│       │   └── ui
│       │       │── Header.module.css
│       │       └── Header.tsx
│       │── LoadMore
│       │   │── index.ts
│       │   │── model
│       │   │   └── useLoadMore.ts
│       │   └── ui
│       │       └── LoadMore.tsx
│       │── ProductCartCounter
│       │   │── index.ts
│       │   └── ui
│       │       │── ProductCartCounter.module.css
│       │       └── ProductCartCounter.tsx
│       │── ReviewList
│       │   │── index.ts
│       │   └── ui
│       │       │── ReviewForm
│       │       │   │── ReviewForm.module.css
│       │       │   └── ReviewForm.tsx
│       │       │── ReviewList.module.css
│       │       └── ReviewList.tsx
│       │── SignInForm
│       │   │── index.ts
│       │   │── model
│       │   │   │── types.ts
│       │   │   └── validator.ts
│       │   └── ui
│       │       └── SignInForm.tsx
│       └── SignUpForm
│           │── index.ts
│           │── model
│           │   │── types.ts
│           │   └── validator.ts
│           └── ui
│               └── SignUpForm.tsx
│── steiger.config.js
│── tsconfig.json
│── vite.config.ts
│── webpack
│   │── webpack.common.js
│   │── webpack.config.js
│   │── webpack.dev.js
│   └── webpack.prod.js
└── презентация.pptx