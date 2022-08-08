<template>
    <form class="signup" @submit.prevent = signup()>

        <label for="username"> Username </label>
        <input id="username" class="signup_username" type="text" placeholder="Username" required>

        <label for="email">Email </label>
        <input id="email" class="signup_email" type="email" placeholder="Email" required>

        <label for="password">Mot de passe </label>
        <input id="password" class="signup_password" type="password" placeholder="Mot de passe" required>

        <label for="passwordCheck">Vérification du mot de passe </label>
        <input id="passwordCheck" class="signup_passwordCheck" type="password" placeholder="Vérifier mot de passe" required>

        <div class="error-message">{{message}}</div>

        <button id="btn" class="signup_btn" type="submit">S'inscrire</button>
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
        signup(){
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const passwordCheck = document.getElementById("passwordCheck").value;
            const email = document.getElementById("email").value;

            if(password === passwordCheck){
                axios.post(`http://localhost:8080/api/users/signup`,
                    {
                        username,
                        password,
                        email
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                .then(res => {
                    if(res.status === 201) {
                         location.href = '/';
                    }
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        this.message = "Email non disponible.";
                    }  
                });
            }
            else if( password != passwordCheck){
                this.message = "Vérifier le mot de passe";
            }
            
        }
    }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.signup {
    display: flex;
    flex-direction: column;
    margin: auto;
    width:300px;
    padding: 20px;
    box-shadow: 5px 5px 5px rgba(219, 217, 217, 0.842);
    border-radius: 10%;
    background-color: rgba(219, 217, 217, 0.842);

    &_username, &_password, &_email, &_passwordCheck {
        margin-bottom: 15px;
    }
    
}

</style>