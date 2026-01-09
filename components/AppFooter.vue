<template>
  <footer class="bg-neutral text-neutral-content mt-auto">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Logo e Slogan -->
        <div class="col-span-1 md:col-span-2">
          <h3 class="text-2xl font-bold mb-2">ForteGB</h3>
          <p class="text-sm opacity-80 mb-4">
            Construindo sonhos e realizando vidas através de projetos imobiliários de qualidade. Sua nova casa está aqui.
          </p>
        </div>

        <!-- Links Rápidos -->
        <div>
          <h4 class="font-semibold mb-4">Links Rápidos</h4>
          <ul class="space-y-2 text-sm">
            <li>
              <NuxtLink to="/" class="hover:text-primary transition-colors">
                Início
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/portfolio" class="hover:text-primary transition-colors">
                Portfólio
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/sobre" class="hover:text-primary transition-colors">
                Sobre
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/blog" class="hover:text-primary transition-colors">
                Blog
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contato" class="hover:text-primary transition-colors">
                Contato
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contato -->
        <div>
          <h4 class="font-semibold mb-4">Contato</h4>
          <ul class="space-y-2 text-sm">
            <li>
              <a 
                :href="`https://wa.me/${whatsappNumber}`" 
                target="_blank" 
                rel="noopener noreferrer"
                class="hover:text-primary transition-colors flex items-center space-x-2"
              >
                <span>WhatsApp</span>
              </a>
            </li>
            <li>
              <NuxtLink to="/privacidade" class="hover:text-primary transition-colors">
                Política de Privacidade
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/termos" class="hover:text-primary transition-colors">
                Termos de Uso
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-neutral-content/20 mt-8 pt-4 text-center text-sm opacity-80">
        <p>&copy; {{ currentYear }} ForteGB. Todos os direitos reservados.</p>
        <p class="mt-1">Campinas-SP, Brasil</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const whatsappNumber = config.public.whatsappNumber || '5511999999999'
const currentYear = new Date().getFullYear()
</script>



