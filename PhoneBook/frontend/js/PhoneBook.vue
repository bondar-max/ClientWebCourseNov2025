<script>
import PhoneBookService from "./phoneBookService";
import Modal from "./Modal.vue";

export default {
  components: {
    Modal
  },

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
      isEditingNameInvalid: false,
      editPhoneErrorMessage: null,
      searchTimeout: null
    };
  },

  methods: {
    loadContacts() {
      this.service.loadContacts(this.term)
          .then(contacts => this.contacts = contacts)
          .catch(() => alert("Ошибка при загрузке контактов"));
    },

    // Обработчик ввода с debounce
    handleSearchInput() {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }

      this.searchTimeout = setTimeout(() => {
        this.loadContacts();
      }, 1000);
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
      this.isEditingNameInvalid = false;
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
            this.isEditingNameInvalid = false;
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
      this.isEditingNameInvalid = false;
      this.editPhoneErrorMessage = null;

      let hasErrors = false;

      const contact = {
        name: this.editName.trim(),
        phone: this.editPhone.trim()
      };

      if (contact.name.length === 0) {
        this.isEditingNameInvalid = true;
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
};
</script>

<template>
  <div class="container">
    <h1 class="my-3">PhoneBook</h1>
    <div class="row">
      <form @submit.prevent="addContact" class="mb-3 col-lg-6">
        <div class="mb-3">
          <label for="name" class="form-label"> Имя</label>
          <input v-model.trim="name" :class="{'is-invalid': isNameInvalid}" type="text" class="form-control"
                 id="name">
          <div class="invalid-feedback">Необходимо заполнить поле</div>
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label">Телефон</label>
          <input v-model.trim="phone" :class="{'is-invalid': !!phoneErrorMessage}" type="text"
                 class="form-control" id="phone">
          <div class="invalid-feedback" v-text="phoneErrorMessage"></div>
        </div>
        <button type="submit" class="btn btn-primary">Создать</button>
      </form>
    </div>

    <!--Поле поиска-->
    <div class="row mb-3">
      <div class="col-lg-6">
        <input type="text" class="form-control" v-model="term" @input="handleSearchInput"
               placeholder="Поиск контактов...">
      </div>
    </div>

    <div class="table-responsive col-12">
      <table class="table table-striped">
        <thead>
        <tr>
          <th>#</th>
          <th>Имя</th>
          <th>Телефон</th>
          <th>Действия</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(contact, index) in contacts" :key="contact.id">
          <td>{{ index + 1 }}</td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.phone }}</td>
          <td>
            <button @click="editContact(contact.id)" class="btn btn-primary btn-sm me-2">Редактировать</button>
            <button @click="showDeleteContactConfirmModal(contact.id)" class="btn btn-danger btn-sm">Удалить
            </button>
          </td>
        </tr>

        <!--Сообщение когда нет контактов-->
        <tr v-if="contacts.length === 0">
          <td colspan="4" class="text-center">Нет контактов</td>
        </tr>
        </tbody>
      </table>
    </div>

    <!--Редактирование контакта-->
    <modal ref="editContactModal" @ok="updateContact" @cancel="resetEditForm" @hidden="resetEditForm">
      <template v-slot:title>
        Редактирование контакта
      </template>

      <form @submit.prevent="updateContact">
        <div class="mb-3">
          <label for="editName" class="form-label">Имя</label>
          <input v-model.trim="editName" :class="{'is-invalid': isEditingNameInvalid}" type="text"
                 class="form-control" id="editName">
          <div class="invalid-feedback">Необходимо заполнить поле</div>
        </div>
        <div class="mb-3">
          <label for="editPhone" class="form-label">Телефон</label>
          <input v-model.trim="editPhone" :class="{'is-invalid': !!editPhoneErrorMessage}" type="text"
                 class="form-control" id="editPhone">
          <div class="invalid-feedback" v-text="editPhoneErrorMessage"></div>
        </div>
      </form>

      <template v-slot:ok-button>
        Сохранить изменения
      </template>
    </modal>

    <!--Подтверждение удаления-->
    <modal @ok="deleteContact" ref="deleteContactConfirmModal">
      <template v-slot:title>
        Подтвердите удаление
      </template>
      <p>Вы действительно хотите удалить выбранный контакт?</p>
    </modal>

  </div>
</template>