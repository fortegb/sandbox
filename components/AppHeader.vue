<template>
  <header class="bg-base-100 shadow-md sticky top-0 z-50">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <img 
            src="/Branding/V2/_Uso Rapido/Logo.png" 
            alt="ForteGB Logo" 
            class="h-12 w-auto"
            v-if="false"
          />
          <span class="text-2xl font-bold text-primary-500">ForteGB</span>
        </NuxtLink>
        
        <div class="hidden md:flex items-center space-x-6">
          <NuxtLink 
            to="/" 
            class="text-base-content hover:text-primary-500 transition-colors"
            active-class="text-primary-500 font-semibold"
          >
            Início
          </NuxtLink>
          <NuxtLink 
            to="/portfolio" 
            class="text-base-content hover:text-primary-500 transition-colors"
            active-class="text-primary-500 font-semibold"
          >
            Portfólio
          </NuxtLink>
          <NuxtLink 
            to="/sobre" 
            class="text-base-content hover:text-primary-500 transition-colors"
            active-class="text-primary-500 font-semibold"
          >
            Sobre
          </NuxtLink>
          <NuxtLink 
            to="/blog" 
            class="text-base-content hover:text-primary-500 transition-colors"
            active-class="text-primary-500 font-semibold"
          >
            Blog
          </NuxtLink>
          <NuxtLink 
            to="/contato" 
            class="btn-primary px-6 py-2 rounded-lg"
          >
            Contato
          </NuxtLink>
        </div>

        <!-- Mobile menu button -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden text-base-content"
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="md:hidden mt-4 space-y-2">
        <NuxtLink 
          to="/" 
          class="block py-2 text-base-content hover:text-primary-500"
          @click="mobileMenuOpen = false"
        >
          Início
        </NuxtLink>
        <NuxtLink 
          to="/portfolio" 
          class="block py-2 text-base-content hover:text-primary-500"
          @click="mobileMenuOpen = false"
        >
          Portfólio
        </NuxtLink>
        <NuxtLink 
          to="/sobre" 
          class="block py-2 text-base-content hover:text-primary-500"
          @click="mobileMenuOpen = false"
        >
          Sobre
        </NuxtLink>
        <NuxtLink 
          to="/blog" 
          class="block py-2 text-base-content hover:text-primary-500"
          @click="mobileMenuOpen = false"
        >
          Blog
        </NuxtLink>
        <NuxtLink 
          to="/contato" 
          class="block py-2 btn-primary rounded-lg text-center"
          @click="mobileMenuOpen = false"
        >
          Contato
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const mobileMenuOpen = ref(false)
</script>



