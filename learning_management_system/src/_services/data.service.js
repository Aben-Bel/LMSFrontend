import axios from "axios";
import { BehaviorSubject } from "rxjs";

import { handleResponse } from "../_helpers/handle-response";

const token =
  (JSON.parse(localStorage.getItem("currentUser")) &&
    JSON.parse(localStorage.getItem("currentUser")).token) ||
  " ";

const categoriesSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("categories"))
);

const instance = axios.create({
  baseURL: "http://localhost:5000/api/",
  timeout: 1000,
  headers: { Authorization: "Bearer " + token },
});

export const dataService = {
  getContents,
  addContent,
  editCourse,
  getCourses,
  getRating,
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

function getCourses(categoryId) {
  return instance.get(`/category/${categoryId}/courses`).then((res) => {
    return res.data;
  });
}

function getRating(categoryId, courseId) {
  console.log("cat and cou ", categoryId, " ", courseId);
  return instance
    .get(`/category/${categoryId}/courses/${courseId}/rating`)
    .then((res) => {
      console.log("rating: ", res.dat);
      return res.data;
    });
}

function addCourse(title, description, catid) {
  const requestOptions = {
    method: "POST",
    Authorization: `Bearer ${token}`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  };

  return fetch(
    `http://localhost:5000/api/category/${catid}/courses`,
    requestOptions
  )
    .then(handleResponse)
    .then((courses) => {
      return courses;
    });
}

function editCourse(title, description, couid, catid) {
  const requestOptions = {
    method: "PUT",
    Authorization: `Bearer ${token}`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  };

  return instance
    .put(`http://localhost:5000/api/category/${catid}/courses/${couid}`, {
      title,
      description,
    })
    .then((res) => {
      return res.data;
    });
}

function getContents(categoryId, courseId) {
  return instance
    .get(`/category/${categoryId}/courses/${courseId}/content`)
    .then((res) => {
      console.log("axios:: ", res);
      return res.data;
    });
}

function addContent(title, type, data, catid, couid) {
  // const requestOptions = {
  //   method: "POST",
  //   Authorization: `Bearer ${token}`,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ title, type, data }),
  // };

  // return fetch(
  //   `/api/category/${catid}/courses/${couid}/content`,
  //   requestOptions
  // )
  //   .then(handleResponse)
  //   .then((contents) => {
  //     return contents;
  //   });

  return instance
    .post(`/category/${catid}/courses/${couid}/content`, {
      title,
      type,
      data,
    })
    .then((res) => {
      return res.data;
    });
}
