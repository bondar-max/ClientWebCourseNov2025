import axios from "axios";

export default class PhoneBookService {
    constructor() {
        this.baseUrl = "/api/contacts";
    }

    loadContacts(term) {
        return axios.get(this.baseUrl, {params: {term}})
            .then(response => response.data);
    }

    // Получение контакта по ID
    getContact(id) {
        return axios.get(`${this.baseUrl}/${id}`)
            .then(response => response.data);
    }

    deleteContact(id) {
        return axios.delete(`${this.baseUrl}/${id}`)
            .then(response => response.data);
    }

    addContact(contact) {
        return axios.post(this.baseUrl, contact)
            .then(response => response.data);
    }

    // Обновление контакта
    updateContact(id, contact) {
        return axios.put(`${this.baseUrl}/${id}`, contact)
            .then(response => response.data);
    }
};