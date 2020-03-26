import Vue from "vue";
import VueRouter from "vue-router";
import store from "../../store/index";

Vue.use(VueRouter);

const routes = [
    {
        path: "/grocery-store/:id/inventory",
        name: "inventory",
        component: () =>
            import("../views/GroceryStoreInventory.vue")
    },
    {
        path: "/available-grocery-stores",
        name: "availableGroceryStores",
        component: () =>
            import("../views/GroceryStores.vue")
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
        component: () => import("../views/ActiveOrders.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    base: "/",
    routes
});

router.beforeEach((to, from, next) => {
    if (to.name !== "login" && to.name !== "signup" && store.state.id === -1) {
        next({ name: "login" });
    } else {
        next();
    }
});

export default router;