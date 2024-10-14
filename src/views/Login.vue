<template>
  <div class="login-container">
    <h1>Connexion</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">Email :</label>
        <input
          type="email"
          v-model="email"
          id="email"
          placeholder="Entrez votre email"
          required
        />
      </div>
      <br>
      <div>
        <label for="password">Mot de passe :</label>
        <input
          type="password"
          v-model="password"
          id="password"
          placeholder="Entrez votre mot de passe"
          required
        />
      </div>
      <br>
      <button type="submit">Se connecter</button>
    </form>

    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  name: 'login_page',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token); // Stocker le token
          this.$router.push('/todolist'); // Redirection après la connexion
        } else {
          this.errorMessage = 'Email ou mot de passe incorrect';
        }
      } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        this.errorMessage = 'Erreur lors de la connexion. Veuillez réessayer.';
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
}

body, html {
  height: 100%;
  margin: 0;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>