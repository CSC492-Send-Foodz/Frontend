
<template>
  <div class="py-12 px-5">
    <router-link :to="{name:'inventory',params: {id:this.id}}" tag="div">
      <div class="profile-box">
        <img src="https://screenshots.imgix.net/mui-org/material-ui-icons/store-mall-directory-two-tone/~v=3.9.2/0d965950-8d36-46aa-bf0c-dd6cdd4c31d7.png?ixlib=js-1.2.0&s=441166f82f696e7100c199001922585a" />
        <div class="pb-6 name">{{company}}</div>
        <div class="pb-4 address">{{address}}</div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "GroceryStore",
  props: ["id", "address", "company"]
};
</script>


<style scoped>
img {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  box-shadow: 0 2px 6px 0 rgba(47, 83, 151, 0.1);
  transform: translate(0, -30%);
}

.name {
  font-size: 2em;
}

.address {
  font-size: 1em;
  color: #747474;
}

.profile-box {
  box-shadow: 0 2px 6px 0 rgba(47, 83, 151, 0.1);
  width: 240px;
  height: 350px;
  transition: 300ms;
  flex-grow: 1;
}

.profile-box:hover {
  cursor: pointer;
  box-shadow: 0 0 20px 9px rgba(0, 0, 0, 0.03);
}

.profile-box:hover img {
  box-shadow: 0 0 20px 9px rgba(0, 0, 0, 0.03);
}
</style>
