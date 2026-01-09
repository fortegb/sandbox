<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">Blog</h1>
    
    <div v-if="loading" class="text-center py-12">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
    
    <div v-else-if="posts.length === 0" class="text-center py-12">
      <p class="text-xl text-base-content/70">Nenhum post encontrado.</p>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <article
        v-for="post in posts"
        :key="post.id"
        class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
      >
        <figure v-if="post.image" class="h-48 overflow-hidden">
          <img 
            :src="post.image" 
            :alt="post.title"
            class="w-full h-full object-cover"
          />
        </figure>
        <div class="card-body">
          <div v-if="post.category" class="badge badge-primary mb-2">
            {{ post.category }}
          </div>
          <h2 class="card-title">{{ post.title }}</h2>
          <p class="text-base-content/70 line-clamp-3">{{ post.excerpt }}</p>
          <div class="card-actions justify-end mt-4">
            <NuxtLink 
              :to="`/blog/${post.slug}`"
              class="btn btn-primary btn-sm"
            >
              Ler Mais
            </NuxtLink>
          </div>
          <div class="text-sm text-base-content/50 mt-2">
            {{ formatDate(post.publishedAt) }}
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Blog - ForteGB',
  meta: [
    {
      name: 'description',
      content: 'Dicas, informações e novidades sobre construção, compra de imóveis e mercado imobiliário em Campinas-SP.'
    }
  ]
})

const loading = ref(false)

// Mock data temporário - usando dados do arquivo mock.ts
const mockData = await import('~/data/mock')

const posts = ref(mockData.mockBlogPosts)

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}
</script>



