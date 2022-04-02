<template>
    <nav>
        <ul class="ul-lista">
            <li class="li-lista" v-for="route in routes" :key=route.title>
                <b>
                    <router-link class="router" :to="route.path ? route.path : '/'">
                        {{ route.title }}
                    </router-link>
                </b>
            </li>
        </ul>
    </nav>
</template>

<script>

export default {
    props: {
        routes: {
            type: Array,
            require: true
        }
    }
}
</script>

<style scoped>
    .ul-lista {
        list-style: none;
        display: grid;
    }
</style>