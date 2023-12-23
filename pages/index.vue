<template>
  <div class="flex flex-col w-full h-full align-center">
    <h2 class="text-center text-4xl mt-8">Games</h2>
    <div class="grid p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 place-items-center">

      <div v-for="game in games" class="gameContainer">
        <NuxtLink :to='game.href' class="h-full w-full flex justify-center items-center bg-zinc-600">
          {{ game.name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const games = [{ name: 'Tic-Tac-Toe', href: '/tic-tac-toe' }, ...new Array(14).fill({ name: 'Undefined Game', href: '/tic-tac-toe' })]

</script>



<style>
.gameContainer {
  @apply border h-40 w-full flex items-center justify-center rounded;
}
</style>
