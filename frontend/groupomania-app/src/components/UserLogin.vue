<template>
  <form class="login" @submit.prevent = login()>
        <label for="login_email">email </label>
        <input id="login_email" class="login_email" type="text" placeholder="email" required>
                
        <label for="login_password">password </label>
        <input id="login_password" class="login_password" type="password" placeholder="password" required>

        <div class="error-message">{{message}}</div>

        <button id="btn" class="login_btn" type="submit">Se connecter</button>
    </form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserConnect',

  data() {
        return {
            message: "",
        };
    },

    methods: {

        login(){
            const email = document.getElementById("login_email").value;
            const password = document.getElementById("login_password").value;

            axios.post(`http://localhost:8080/api/users/login`,
                {
                    email,
                    password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data));
                location.reload();
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    this.message = "Utilisateur inconnu.";
                }
                if (error.response.status === 401) {
                    this.message = "Email ou mot de passe invalide.";
                }
                if (error.response.status === 500) {
                    this.message = "Erreur serveur.";
                }
            });
        }
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.login {
    display: flex;
    flex-direction: column;
    margin: auto;
    width:300px;
    padding: 20px;
    box-shadow: 5px 5px 5px rgba(219, 217, 217, 0.842);
    border-radius: 5%;
    background-color: rgba(219, 217, 217, 0.842);

    &_email, &_password {
        margin-bottom: 15px;
    }
    
}

</style>
