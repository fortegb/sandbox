<template>
  <header class="bg-primary-500 shadow-md sticky top-0 z-50">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <img 
            src="/logo.png" 
            alt="ForteGB Logo" 
            class="h-16 w-auto"
          />
        </NuxtLink>
        
        <div class="hidden md:flex items-center space-x-6">
          <NuxtLink 
            to="/" 
            class="text-white hover:text-primary-100 transition-colors"
            active-class="text-primary-100 font-semibold"
          >
            Início
          </NuxtLink>
          <NuxtLink 
            to="/portfolio" 
            class="text-white hover:text-primary-100 transition-colors"
            active-class="text-primary-100 font-semibold"
          >
            Portfólio
          </NuxtLink>
          <NuxtLink 
            to="/sobre" 
            class="text-white hover:text-primary-100 transition-colors"
            active-class="text-primary-100 font-semibold"
          >
            Sobre
          </NuxtLink>
          <NuxtLink 
            to="/blog" 
            class="text-white hover:text-primary-100 transition-colors"
            active-class="text-primary-100 font-semibold"
          >
            Blog
          </NuxtLink>
          <NuxtLink 
            to="/contato" 
            class="bg-white text-primary-500 px-6 py-2 rounded-lg hover:bg-primary-100 transition-colors"
          >
            Contato
          </NuxtLink>
        </div>

        <!-- Mobile menu button -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden text-white"
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
          class="block py-2 text-white hover:text-primary-100"
          @click="mobileMenuOpen = false"
        >
          Início
        </NuxtLink>
        <NuxtLink 
          to="/portfolio" 
          class="block py-2 text-white hover:text-primary-100"
          @click="mobileMenuOpen = false"
        >
          Portfólio
        </NuxtLink>
        <NuxtLink 
          to="/sobre" 
          class="block py-2 text-white hover:text-primary-100"
          @click="mobileMenuOpen = false"
        >
          Sobre
        </NuxtLink>
        <NuxtLink 
          to="/blog" 
          class="block py-2 text-white hover:text-primary-100"
          @click="mobileMenuOpen = false"
        >
          Blog
        </NuxtLink>
        <NuxtLink 
          to="/contato" 
          class="block py-2 bg-white text-primary-500 rounded-lg text-center hover:bg-primary-100 transition-colors"
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



