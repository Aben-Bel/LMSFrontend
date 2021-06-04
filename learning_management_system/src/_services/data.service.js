import axios from "axios";
import { BehaviorSubject } from "rxjs";

import { handleResponse } from "../_helpers/handle-response";

const token = JSON.parse(localStorage.getItem("currentUser")).token;

const categoriesSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("categories"))
);

export const dataService = {
  addCategories,
  editCategories,
  addCourse,
  getCategories,
  categories: categoriesSubject.asObservable(),
  get categoriesValue() {
    return this.categories.value;
  },
};

function getCategories() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(`http://localhost:5000/api/category`, requestOptions)
    .then(handleResponse)
    .then((categories) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("categories", JSON.stringify(categories));
      categoriesSubject.next(categories);
      return categories;
    });
}

function addCategories(title, description) {
  console.log("lets add categories: ", title, " ", description);
  //   console.log("token ", token);
  const requestOptions = {
    method: "POST",
    Authorization: `Bearer ${token}`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  };

  return fetch(`http://localhost:5000/api/category`, requestOptions)
    .then(handleResponse)
    .then((categories) => {
      //   localStorage.setItem("categories", JSON.stringify(categories));
      //   categories.next(categories);
      return categories;
    });
}

function editCategories(title, description, id) {
  console.log("lets add categories: ", title, " ", description);
  //   console.log("token ", token);
  const requestOptions = {
    method: "PUT",
    Authorization: `Bearer ${token}`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, id }),
  };

  return fetch(`http://localhost:5000/api/category/${id}`, requestOptions)
    .then(handleResponse)
    .then((categories) => {
      return categories;
    });
}

function addCourse(title, description, catid) {
  const requestOptions = {
    method: "POST",
    accept: "application/json",
    Authorization: `Bearer ${token}`,
    headers: {
      "Content-Type": "application/json",
    },
    body: { Title: title, Description: description },
  };

  return fetch(
    `http://localhost:5000/api/category/${catid}/courses`,
    requestOptions
  )
    .then(handleResponse)
    .then((courses) => {
      //   localStorage.setItem("categories", JSON.stringify(categories));
      //   categories.next(categories);
      console.log("categories added: ", courses);
      return courses;
    });
}
