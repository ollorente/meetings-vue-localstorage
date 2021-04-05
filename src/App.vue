<template>
  <div class="container" id="app">
    <router-view />
  </div>
</template>

<style>
:root {
  --primary: #01579b;
  --p-light: #4f83cc;
  --p-dark: #002f6c;
  --secondary: #ffb300;
  --s-light: #ffe54c;
  --s-dark: #c68400;
  --light: #fff;
  --dark: #1e1e1e;
  --gray: #ccc;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, "Roboto", Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 16px;
  background: var(--light);
  color: var(--dark);
}

body * {
  text-decoration: none;
}

body #main_navbar {
  display: none;
}

body #tasks {
  display: none;
}

body #projects {
  display: none;
}

body #meetings {
  display: none;
}

body #users {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

body #main__body__menu {
  display: block;
}

body #main_projects {
  display: none;
}

body #main_meetings {
  display: none;
}

body #main_users {
  display: block;
}

body #main_tasks {
  display: none;
}

body .aside {
  display: none;
  position: absolute;
  width: 80vw;
  max-width: 320px;
  height: 100vh;
  top: 0;
  left: 0;
  bottom: 0;
  background: var(--light);
  -webkit-box-shadow: 1rem 1rem 1rem rgba(0, 0, 0, 0.25);
  box-shadow: 1rem 1rem 1rem rgba(0, 0, 0, 0.25);
  z-index: 1500;
}

body .aside .aside__navbar {
  height: 25vh;
  background: var(--secondary);
  padding: 1rem;
}

body .aside .aside__body {
  padding: 1rem;
}

body .aside .aside__footer {
  padding: 1rem;
}

body .container {
  width: calc(100vw - 2rem);
  height: 100vh;
}

body .container .alert {
  position: absolute;
  width: 80%;
  margin: auto;
  top: 0.5rem;
  left: 5%;
  right: 5%;
  max-width: 450px;
  padding: 1rem;
  margin: 1rem auto;
  background: var(--s-light);
  border-radius: 0.25rem;
  -webkit-box-shadow: 0.5rem 0.5rem 0.75rem rgba(0, 0, 0, 0.5);
  box-shadow: 0.5rem 0.5rem 0.75rem rgba(0, 0, 0, 0.5);
  z-index: 1200;
}

body .container form {
  width: 100%;
}

body .container form input {
  width: calc(100% - 2rem);
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: solid 1px var(--p-light);
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  background: var(--light);
}

body .container form input[type="checkbox"] {
  display: inline-block;
  padding: 0.5rem;
  border: solid 1px var(--primary);
}

body .container form input[type="checkbox"] > label {
  display: inline-block;
}

body .container form textarea {
  width: calc(100% - 2rem);
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: solid 1px var(--p-light);
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

body .container form select {
  width: calc(100%);
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: solid 1px var(--p-light);
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  background: var(--light);
}

body .container form button {
  width: 100%;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

body .container form .form-label {
  margin-bottom: 1rem !important;
}

body .container form .form-label i {
  padding-bottom: 1rem;
  color: var(--primary);
}

body .container form .btn-primary {
  background: var(--primary);
  color: var(--light);
  border: 0;
}

body .container form .btn-p-light {
  background: var(--p-light);
  color: var(--light);
  border: 0;
}

body .container form .btn-p-dark {
  background: var(--p-dark);
  color: var(--light);
  border: 0;
}

body .container form .btn-secondary {
  background: var(--secondary);
  color: var(--dark);
  border: 0;
}

body .container form .btn-s-light {
  background: var(--s-light);
  color: var(--dark);
  border: 0;
}

body .container form .btn-s-dark {
  background: var(--s-dark);
  color: var(--light);
  border: 0;
}

body .container form .btn-outline-primary {
  background: transparent;
  color: var(--primary);
  border: solid 2px var(--primary);
}

body .container form .btn-outline-p-light {
  background: transparent;
  color: var(--p-light);
  border: solid 2px var(--p-light);
}

body .container form .btn-outline-p-dark {
  background: transparent;
  color: var(--p-dark);
  border: solid 2px var(--p-dark);
}

body .container form .btn-outline-secondary {
  background: transparent;
  color: var(--secondary);
  border: solid 2px var(--secondary);
}

body .container form .btn-outline-s-light {
  background: transparent;
  color: var(--s-light);
  border: solid 2px var(--s-light);
}

body .container form .btn-outline-s-dark {
  background: transparent;
  color: var(--s-dark);
  border: solid 2px var(--s-dark);
}

body .container .main {
  width: 100%;
}

body .container .main .main__navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2rem;
  padding: 0.5rem 1rem;
  background: var(--primary);
  font-size: 1.5rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  z-index: 1000;
}

body .container .main .main__navbar .main__navbar__logo {
  color: var(--light);
  padding: 0;
  margin: 0;
}

body .container .main .main__navbar .main__navbar__items {
  color: var(--light);
}

body
  .container
  .main
  .main__navbar
  .main__navbar__items
  .main__navbar_items_link {
  padding: 0.5rem;
  color: var(--light);
  font-size: 1rem;
}

body .container .main .main__navbar .options {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1600;
  background: transparent;
}

body .container .main .main__navbar .options .options__card {
  position: absolute;
  width: 80%;
  max-width: 15rem;
  top: 1rem;
  right: 1rem;
  padding: 1rem;
  background: var(--light);
  border: solid 1px var(--p-light);
  border-radius: 0.25rem;
  -webkit-box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.25);
  box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.25);
}

body
  .container
  .main
  .main__navbar
  .options
  .options__card
  .options__card__items {
  list-style: none;
  margin: 0;
  padding: 0;
}

body
  .container
  .main
  .main__navbar
  .options
  .options__card
  .options__card__items
  .options__card__icon {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

body
  .container
  .main
  .main__navbar
  .options
  .options__card
  .options__card__items
  .options__card__item {
  width: 100%;
  margin: 0.5rem 0;
  padding: 0;
}

body
  .container
  .main
  .main__navbar
  .options
  .options__card
  .options__card__items
  .options__card__item
  .options__card__link {
  width: 100%;
  font-size: 1.1rem;
  color: var(--dark);
}

body
  .container
  .main
  .main__navbar
  .options
  .options__card
  .options__card__items
  .options__card__item
  .options__card__link
  i {
  width: 1.75rem;
  font-size: 1.3rem;
  color: var(--primary);
}

body .container .main .main__body {
  position: relative;
  top: 3rem;
}

body .container .main .main__body .main__body__menu {
  width: calc(100vw - 1rem);
  left: 0;
  right: 0;
  background: var(--primary);
  color: var(--light);
  padding: 0 0.5rem;
}

body .container .main .main__body .main__body__menu .main__body__menu__item {
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  display: inline-block;
}

body
  .container
  .main
  .main__body
  .main__body__menu
  .main__body__menu__item.active {
  padding: 1rem 0;
  font-weight: bold;
  border-bottom: solid 0.3rem var(--secondary);
}

body .container .main .main__body .main__body__menu .main__body__menu__nav {
  margin: 0;
  padding: 0 0.5rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: center;
}

body
  .container
  .main
  .main__body
  .main__body__menu
  .main__body__menu__nav
  .main__body__menu__link {
  padding: 0.5rem;
  color: var(--light);
  font-size: 0.8rem;
  text-transform: uppercase;
}

body
  .container
  .main
  .main__body
  .main__body__menu
  .main__body__menu__nav
  .main__body__menu__link
  i {
  font-size: 1.25rem;
  opacity: 0.8;
}

body
  .container
  .main
  .main__body
  .main__body__menu
  .main__body__menu__nav
  .main__body__menu__link
  .text {
  display: none;
}

body .container .main .main__body .main__body__content {
  width: 100vw;
  min-height: calc(100vh - 7rem);
}

body .container .main .main__body .main__body__content .main__body__section {
  padding: 1rem;
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__nav--title {
  margin: 0.8rem 0;
  font-size: 1.25rem;
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__item {
  padding: 0.5rem 0;
  border-bottom: solid 1 var(--dark);
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__item
  .main__body__section__link {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-bottom: solid 1 var(--dark);
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__item
  .main__body__section__link
  .main__body__section__link__text {
  font-size: 1rem;
  color: var(--dark);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__item
  .main__body__section__link
  .main__body__section__link__text
  i {
  font-size: 1.5rem;
  margin-right: 0.5rem;
  color: var(--secondary);
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__item
  .main__body__section__link
  .main__body__section__link__text
  .main__body__section__link__text__content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__item
  .main__body__section__link
  .main__body__section__link__text
  .main__body__section__link__text__content
  .text-title {
  font-weight: 700;
  font-size: 1.1rem;
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__item
  .main__body__section__link
  .main__body__section__link__text
  .main__body__section__link__text__content
  .text-content {
  font-weight: 300;
  font-size: 1rem;
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__item
  .main__body__section__link
  .main__body__section__link__icon {
  font-size: 0.8rem;
  color: var(--primary);
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__card {
  width: calc(100% - 0.5rem);
  margin-bottom: 1rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__card
  .main__body__section__card__date {
  width: 4rem;
  margin-right: 0.75rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  text-align: center;
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__card
  .main__body__section__card__date
  .main__body__section__card__month {
  font-size: 0.8rem;
  text-transform: uppercase;
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__card
  .main__body__section__card__date
  .main__body__section__card__day {
  font-size: 2.5rem;
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__card
  .main__body__section__card__body {
  width: 100%;
  padding: 1rem;
  background: var(--p-light);
  color: var(--light);
  border-radius: 0.25rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__card
  .main__body__section__card__body
  .main__body__section__link__text__content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__card
  .main__body__section__card__body
  .main__body__section__link__text__content
  .text-title {
  font-weight: 700;
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__card
  .main__body__section__card__body
  .main__body__section__link__text__content
  .text-content {
  font-size: 1rem;
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__card
  .main__body__section__card__body
  .main__body__section__link__icon
  i {
  font-size: 0.8rem;
  margin-right: 0.25rem;
  color: var(--light);
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__user {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 1rem;
  color: var(--dark);
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__user
  .main__body__section__user__logo {
  width: 3rem;
  height: 3rem;
  margin-right: 0.75rem;
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__user
  .main__body__section__user__body {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__user
  .main__body__section__user__body
  .main__body__section__user__title {
  font-size: 1.1rem;
  font-weight: 700;
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__user
  .main__body__section__user__body
  .main__body__section__user__content {
  font-weight: 300;
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__task {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  margin-bottom: 1rem;
  color: var(--dark);
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__task
  .main__body__section__task__text {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__task
  .main__body__section__task__text
  i {
  font-size: 2rem;
  margin-right: 0.75rem;
  color: var(--secondary);
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__task
  .main__body__section__task__text
  .main__body__section__task__body {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__task
  .main__body__section__task__text
  .main__body__section__task__body
  .main__body__section__task__title {
  font-size: 1.1rem;
  font-weight: 700;
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__task
  .main__body__section__task__text
  .main__body__section__task__body
  .main__body__section__task__content {
  font-weight: 300;
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__task
  .main__body__section__task__icon {
  width: 3rem;
  text-align: right;
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__nav
  .main__body__section__task
  .main__body__section__task__icon
  i {
  font-size: 0.8rem;
  color: var(--primary);
  padding-left: 0.2rem;
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__person__avatar {
  width: calc(100vw - 2rem);
  text-align: center;
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__person__avatar
  .main__body__section__person__avatar--img {
  width: 10rem;
  height: 10rem;
  -o-object-fit: cover;
  object-fit: cover;
  position: center center;
  border: solid 1px #ccc;
  border-radius: 50%;
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__person__title {
  text-align: center;
  font-size: 1.5rem;
  margin: 0;
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__person__subtitle {
  text-align: center;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
  margin-bottom: 2rem;
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__person__block {
  width: calc(100vw - 2rem);
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__person__block
  .main__body__section__person__block__label {
  font-weight: 700;
}

body
  .container
  .main
  .main__body
  .main__body__content
  .main__body__section
  .main__body__section__person__block
  .main__body__section__person__block__content
  i {
  color: var(--primary);
}

body .container .main .main__body .main__body__content .main__body__aside {
  display: none;
}
</style>
