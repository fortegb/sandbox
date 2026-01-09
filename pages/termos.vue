<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <h1 class="text-4xl font-bold mb-8">Termos de Uso</h1>
    
    <div class="prose prose-lg max-w-none">
      <p class="text-sm text-base-content/70 mb-8">
        Última atualização: {{ currentDate }}
      </p>

      <section class="mb-8">
        <h2>1. Aceitação dos Termos</h2>
        <p>
          Ao acessar e usar o site da ForteGB, você concorda em cumprir e estar vinculado a 
          estes Termos de Uso. Se você não concordar com qualquer parte destes termos, 
          não deve usar nosso site.
        </p>
      </section>

      <section class="mb-8">
        <h2>2. Uso do Site</h2>
        <p>Você concorda em usar o site apenas para fins legais e de acordo com estes termos. 
        É proibido:</p>
        <ul>
          <li>Usar o site de forma que viole qualquer lei ou regulamento</li>
          <li>Transmitir qualquer conteúdo malicioso ou prejudicial</li>
          <li>Tentar acessar áreas restritas do site</li>
          <li>Interferir no funcionamento do site</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2>3. Agendamento de Visitas</h2>
        <p>
          Ao agendar uma visita através do site, você concorda em:
        </p>
        <ul>
          <li>Fornecer informações verdadeiras e precisas</li>
          <li>Permitir verificação de identidade</li>
          <li>Respeitar as regras de acesso às propriedades</li>
          <li>Usar a senha de acesso apenas durante o período autorizado</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2>4. Propriedade Intelectual</h2>
        <p>
          Todo o conteúdo do site, incluindo textos, imagens, logos e design, é propriedade 
          da ForteGB e está protegido por leis de direitos autorais.
        </p>
      </section>

      <section class="mb-8">
        <h2>5. Limitação de Responsabilidade</h2>
        <p>
          A ForteGB não se responsabiliza por danos diretos, indiretos ou consequenciais 
          resultantes do uso ou incapacidade de usar o site.
        </p>
      </section>

      <section class="mb-8">
        <h2>6. Modificações</h2>
        <p>
          Reservamos o direito de modificar estes termos a qualquer momento. Alterações 
          significativas serão comunicadas através do site.
        </p>
      </section>

      <section class="mb-8">
        <h2>7. Lei Aplicável</h2>
        <p>
          Estes termos são regidos pelas leis do Brasil. Qualquer disputa será resolvida 
          nos tribunais competentes de Campinas-SP.
        </p>
      </section>

      <section class="mb-8">
        <h2>8. Contato</h2>
        <p>
          Para questões sobre estes Termos de Uso, entre em contato:
        </p>
        <ul>
          <li><strong>E-mail:</strong> contato@fortegb.com</li>
          <li><strong>Telefone:</strong> (19) 99999-9999</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Termos de Uso - ForteGB',
  meta: [
    {
      name: 'description',
      content: 'Termos de Uso do site ForteGB'
    }
  ]
})

const currentDate = new Date().toLocaleDateString('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})
</script>



