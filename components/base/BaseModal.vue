<template>
  <div>
    <b-modal id="modal-scoped" @cancel="cancel" @ok="ok" @hidden="cancel">
      <template #modal-header="{}">
        <h5>{{ modal.title }}</h5>
      </template>

      <template #default="{}">
        <p>{{ modal.description }}</p>
      </template>

      <template #modal-footer="{ ok, cancel }">
        <b-button variant="primary" @click="cancel()">
          {{ modal?.secondaryButton?.title || 'Hủy' }}
        </b-button>
        <b-button variant="danger" @click="ok()">
          {{ modal?.primaryButton?.title || 'Tiếp tục' }}
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultModal: {
        isShow: false,
        title: null,
        description: null,
        callback: async () => {},
        primaryButton: {
          title: null,
        },
        secondaryButton: {
          title: null,
        },
      },
      modal: {},
    }
  },
  watch: {
    '$store.state.modal.isShow'(value, oldValue) {
      this.modal = this.$store.getters.getModal
    },
    'modal.isShow'(value, oldValue) {
      if (value) {
        this.$bvModal.show('modal-scoped')
      }
    },
  },
  methods: {
    async ok() {
      await this.modal.callback()
      this.resetStoreModal()
    },
    cancel() {
      this.resetStoreModal()
    },
    resetStoreModal() {
      this.$store.dispatch('setModal', this.defaultModal)
    },
  },
}
</script>

<style></style>
