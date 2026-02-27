"use strict";

class PhoneBookService {
    constructor() {
        this.baseUrl = "/api/contacts"
    }

    loadContacts(term) {
        return axios.get(this.baseUrl, {params: {term}})
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
            contactIdToDelete: null
        };
    },

    methods: {
        loadContacts() {
            this.service.loadContacts(this.term)
                .then(contacts => this.contacts = contacts)
                .catch(() => alert("Ошибка при загрузке контактов"));
        },

        addContact() {
            //TODO валидация на клиенте
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

                        alert(response.message);
                        return;
                    }

                    this.loadContacts();

                    this.name = "";
                    this.phone = "";
                })
                .catch(() => alert("Ошибка при создании контакта"));

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
                })
                .catch(() => alert("Ошибка при удалении контакта"));

        }
    },

    created() {
        this.loadContacts();
    }
});

app.component("Modal", {
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
            this.hide();
        }

    },

    mounted() {
        this.modal = new bootstrap.Modal(this.$refs.modal, {});
    },

    template: `
      <div class="modal fade" tabindex="-1" ref="modal">
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
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
              <button @click="onOk" type="button" class="btn btn-primary">ОК</button>
            </div>
          </div>
        </div>
      </div>`
});

app.mount("#app")