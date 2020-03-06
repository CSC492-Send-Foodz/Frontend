import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/inventory",
        name: "inventory",
        component: () =>
            import("../views/Inventory.vue")
    },
    {
        path: "/signup",
        name: "signup",
        component: () =>
            import("../components/SignUp.vue")
    },
    {
        path: "/login",
        name: "login",
        component: () =>
            import("../components/LogIn.vue")
    },
    {
        path: "/orders",
        name: "orders",
        component: () => import("../views/ActiveOrders")
    }
];

const router = new VueRouter({
    mode: "history",
    base: "/",
    routes
});

export default router;