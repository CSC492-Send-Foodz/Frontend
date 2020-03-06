import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/inventory",
        name: "inventory",
        component: () =>
            import("../views/Inventory.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    base: "/",
    routes
});

export default router;