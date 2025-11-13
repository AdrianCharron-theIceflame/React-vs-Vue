<script>
export default {
    data() {
        return {
            user: {},
            error: ``,
            loading: true,
            company: {},
            userAddress: {}
        }
    },
    computed: {
        routeId() { return this.$route.params.id },
        hasError() { return this.error.length > 0 }
    },
    methods: {
        async fetchUser() {
            this.loading = true
            await fetch(`https://jsonplaceholder.typicode.com/users/${this.routeId}`)
                .then(response => response.json())
                .then(data => {
                    this.user = {
                        name: data.name,
                        phone: data.phone,
                        email: data.email
                    }
                    this.company = data.company
                    this.userAddress = data.address
                })
                .catch(e => {
                    this.error = e
                })
            this.loading = false
        }
    },
    async mounted() {
        await this.fetchUser()
    }
}
</script>

<template>
    <main>
        <div>
            <h1 v-if="loading">Loading User...</h1>
            <h1 v-else-if="hasError">{{ error }}</h1>
            <h1 v-else>{{ user.name }}</h1>
            <ul>
                <li>Email: {{ user.email }}</li>
                <li>Phone Number: {{ user.phone }}</li>
                <li>Website: {{ user.website }}</li>
                <li>Company: {{ company.name }}</li>
                <li>Address: {{ userAddress.street }}, {{ userAddress.suite }}, {{ userAddress.city }}, {{
                    userAddress.zipcode }}</li>
            </ul>
        </div>
    </main>
</template>
