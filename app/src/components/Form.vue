<template>
    <div class="container">
        <div class="card-header">Create Users</div>
            <div class="card-body">
                <form @submit="formSubmit">
                    <strong>Company Name</strong>
                    <input type="text" class="form-control" v-model="company">
            
                    <strong>Address</strong>
                    <input class="form-control" v-model="address">

                    <strong>Store Number</strong>
                    <input class="form-control" v-model="storeNumber">
    
                    <button class="btn btn-success">Submit</button>
                </form>
    
                <strong>Output:</strong>
                <pre> {{output}} </pre>
            </div>
        </div>
</template>
     
<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        },
        data() {
            return {
              company: '',
              address: '',
              storeNumber: '',
              output: ''
            };
        },
        methods: {
            formSubmit(e) {
                e.preventDefault();
                let currentObj = this;
                this.axios.post("http://localhost:5000/send-foodz-1a677/us-central1/app/groceryStore/updateUserAccount", {
                    company: this.company,
                    address: this.address,
                    storeNumber: this.storeNumber,
                    
                })
                .then(function (response) {
                    currentObj.output = response.data;
                })
                .catch(function (error) {
                    currentObj.output = error;
                });
            }
        }
    }
</script>