"use strict";

class PhoneBookService {
    constructor() {
        this.baseUrl = "/api/contacts"
    }

    loadContacts(term) {
        return axios.get(this.baseUrl, {params: {term}})
            .then(response => response.data);
    }

    //Получение контакта по ID
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

    //Обновление контакта
    updateContact(id, contact) {
        return axios.put(`${this.baseUrl}/${id}`, contact)
            .then(response => response.data);
    }
}

const app = Vue.createApp({
    data() {
        return {
            contacts: [],
            name: "",
            phone: "",
            term: "",
            service: new PhoneBookService(),
            isNameInvalid: false,
            phoneErrorMessage: null,
            contactIdToDelete: null,
            editName: "",
            editPhone: "",
            isEditNameInvalid: false,
            editPhoneErrorMessage: null
        };
    },

    methods: {
        loadContacts() {
            this.service.loadContacts(this.term)
                .then(contacts => this.contacts = contacts)
                .catch(() => alert("Ошибка при загрузке контактов"));
        },

        //Сброс формы
        resetForm() {
            this.name = "";
            this.phone = "";
            this.isNameInvalid = false;
            this.phoneErrorMessage = null;
            this.contactIdToEdit = null;
        },

        //Сброс формы редактирования
        resetEditForm() {
            this.editName = "";
            this.editPhone = "";
            this.isEditNameInvalid = false;
            this.editPhoneErrorMessage = null;
            this.contactIdToEdit = null;
        },

        //Редактирование контакта
        editContact(id) {
            this.service.getContact(id)
                .then(response => {
                    if (!response.success) {
                        alert(response.message);
                        return;
                    }

                    this.contactIdToEdit = id;
                    this.editName = response.contact.name;
                    this.editPhone = response.contact.phone;
                    this.isEditNameInvalid = false;
                    this.editPhoneErrorMessage = null;

                    // Показать модальное окно редактирования
                    this.$refs.editContactModal.show();
                })
                .catch(() => alert("Ошибка при загрузке контакта"));
        },

        addContact() {
            this.isNameInvalid = false;
            this.phoneErrorMessage = null;

            let hasErrors = false;

            const contact = {
                name: this.name.trim(),
                phone: this.phone.trim()
            };

            if (contact.name.length === 0) {
                this.isNameInvalid = true;
                hasErrors = true;
            }

            if (contact.phone.length === 0) {
                this.phoneErrorMessage = "Необходимо заполнить поле";
                hasErrors = true;
            }

            if (hasErrors) {
                return;
            }

            this.service.addContact(contact)
                .then(response => {
                    if (!response.success) {
                        if (response.errorCode === 3) {
                            this.phoneErrorMessage = response.message;
                        }

                        return;
                    }

                    this.loadContacts();
                    this.resetForm();
                })
                .catch(() => alert("Ошибка при создании контакта"));

        },

        //Обновление контакта
        updateContact() {
            this.isEditNameInvalid = false;
            this.editPhoneErrorMessage = null;

            let hasErrors = false;

            const contact = {
                name: this.editName.trim(),
                phone: this.editPhone.trim()
            };

            if (contact.name.length === 0) {
                this.isEditNameInvalid = true;
                hasErrors = true;
            }

            if (contact.phone.length === 0) {
                this.editPhoneErrorMessage = "Необходимо заполнить поле";
                hasErrors = true;
            }

            if (hasErrors) {
                return;
            }

            this.service.updateContact(this.contactIdToEdit, contact)
                .then(response => {
                    if (!response.success) {
                        if (response.errorCode === 3) {
                            this.editPhoneErrorMessage = response.message;
                        } else {
                            alert(response.message);
                        }
                        return;
                    }

                    this.loadContacts();
                    this.$refs.editContactModal.hide();
                    this.resetEditForm();
                })
                .catch(() => alert("Ошибка при обновлении контакта"));
        },

        showDeleteContactConfirmModal(id) {
            this.contactIdToDelete = id;
            this.$refs.deleteContactConfirmModal.show();
        },

        deleteContact() {
            this.service.deleteContact(this.contactIdToDelete)
                .then(response => {
                    if (!response.success) {
                        alert(response.message);
                        return;
                    }

                    this.loadContacts();
                    this.$refs.deleteContactConfirmModal.hide();
                    this.contactIdToDelete = null;
                })
                .catch(() => alert("Ошибка при удалении контакта"));

        }
    },

    created() {
        this.loadContacts();
    }
});

app.component("Modal", {
    props: {
        id: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            modal: null
        };
    },

    methods: {
        show() {
            this.modal.show();
        },

        hide() {
            this.modal.hide();
        },

        onOk(){
            this.$emit("ok");
        },

        onCancel() {
            this.$emit("cancel");
            this.hide();
        }
    },

    mounted() {
        this.modal = new bootstrap.Modal(this.$refs.modal, {});

        // Слушаем событие скрытия модального окна
        this.$refs.modal.addEventListener('hidden.bs.modal', () => {
            this.$emit("hidden");
        });
    },

    template: `
      <div class="modal fade" :id="id" tabindex="-1" ref="modal" data-bs-backdrop="static">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                <slot name="title"></slot>
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
            </div>
            <div class="modal-body">
              <slot></slot>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="onCancel">Отмена</button>
              <button @click="onOk" type="button" class="btn btn-primary">
                <slot name="ok-button">ОК</slot>
              </button>
            </div>
          </div>
        </div>
      </div>`
});

app.mount("#app")