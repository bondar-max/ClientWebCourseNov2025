<script>
import {Modal} from "bootstrap/dist/js/bootstrap.bundle";

export default {
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
    this.modal = new Modal(this.$refs.modal, {});

    // Слушаем событие скрытия модального окна
    this.$refs.modal.addEventListener('hidden.bs.modal', () => {
      this.$emit("hidden");
    });
  },

};
</script>

<template>
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
  </div>
</template>
