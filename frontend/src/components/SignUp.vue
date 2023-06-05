<!-- Create singup template -->
<template>
  <form method="post">
    <input id="email" name="email" type="email" placeholder="Enter Email" v-model="users.email" @input="emailValidation"
      required />
    <p v-if="errors.email"> {{ errors.email }}</p>
    <input id="password" name="password" type="password" placeholder="Enter Password" v-model="users.password"
      @input="passwordValidation" require />
    <p v-if="errors.password"> {{ errors.password }}</p>
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
      },
      errors: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    emailValidation() {
      const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
      this.errors.email = emailRegex.test(this.users.email) ? "" : "Invalid email address.";
    },
    passwordValidation() {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      this.errors.password = passwordRegex.test(this.users.password) ? "" : "Invalid password: Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long."

    },

    //use fetch() sending user signup to home page and database to save data
    onSubmit() {
      this.emailValidation()
      this.passwordValidation()

      if (this.emailValidation && this.passwordValidation) {
        fetch("http://localhost:3000/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: this.users.email,
            password: this.users.password
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            localStorage.setItem("users-info", JSON.stringify(data));
            this.$router.push({ name: 'Login' }); //router to home page
            console.log(data)
          });
      } else {
        alert('Please properly fill out the form');
      }

    },
  },
};
</script>

<style>
form {
  width: 50%;
  margin-left: 25%;
  margin-top: 50px;
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
  font-size: 15px;
  /* background-color: rgb(135, 235, 193); */
  width: 450px;
  height: 45px;
  margin: auto;
  border: 1px solid black;
}
</style>
