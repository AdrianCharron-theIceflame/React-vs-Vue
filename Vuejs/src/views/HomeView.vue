<script>
export default {
  components: {
  },
  data: () => ({
    users: [],
    error: '',
    loading: true
  }),
  computed: {
    showError() { return this.error.length > 0 }
  },
  methods: {
    async fetchFromApi() {
      this.loading = true
      await fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(data => {
          this.users = data
        })
        .catch(e => {
          this.error = e
        })
      this.loading = false
    }
  },
  async mounted() {
    await this.fetchFromApi()
  }
}
</script>

<template>
  <main>
    <div>
      <h1 v-if="loading">Loading Users...</h1>
      <h1 v-else-if="showError">{{ error }}</h1>
      <template v-else>
        <h1>Users</h1>
        <ul>
          <li v-for="user in users" v-bind:key="user.id">
            <router-link :to="{ name: 'users', params: { id: user.id } }">{{ user.name }}</router-link>
          </li>
        </ul>
      </template>
    </div>
  </main>
</template>
