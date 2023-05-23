<!-- Create singup template -->
<template>
  <form method="post">
    <input
      id="email"
      name="email"
      type="email"
      placeholder="Enter Email"
      v-model="users.email"
      required
    />
   <!--  <p style="{color: 'red'}"> {{ posts.errorMessage }}</p> -->
    <input
      id="password"
      name="password"
      type="password"
      placeholder="Enter Password"
      v-model="users.password"
      require
    />
    <button @click.prevent="onSubmit" type="submit">SignUp</button>
  </form>
</template>

<!-- Create signup properties and send to database -->
<script>
export default {
  name: "SignUp",
  data() {
    return {
      users: {
        email: "",
        password: "",
      }
      /* [ 
          { message:'One lowercase letter required.', regex:/[a-z]+/ },
          { message:"One uppercase letter required.",  regex:/[A-Z]+/ },
          { message:"8 characters minimum.", regex:/.{8,}/ },
          { message:"One number required.", regex:/[0-9]+/ },],    */
        
       /*  errorMessage: "",
        validateEmail: '',
        validatePassword: '' */
      }
  },
  methods: {
  /*   validatedEmail(email){
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        this.posts.errorMessage = '';
        this.posts.validateEmail = true;
      }else {
        this.errorMessage = "Email invalid";
        this.posts.validateEmail = true;
      }
    }, */
    
    //use fetch() sending user signup data to server to save in database
    onSubmit(e) {
      e.preventDefault();
      fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.users.emial,
          password: this.users.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    },
  },
/*   watch: {
      email(value) {
        this.posts.email = value;
        this.validateEmail(value);
      }
  } */
};
</script>

<style>
form {
  width: 50%;
  margin-left: 25%;
}
 
form input {
  display: block;
  width: 450px;
  padding-left: 15px;
  height: 45px;
  margin: 30px auto;
  border: 1px solid black;
}
form button {
  font-size: 18px;
  /* background-color: rgb(135, 235, 193); */
  width: 470px;
  height: 45px;
  margin: auto;
  border: 1px solid black;
}
</style>
