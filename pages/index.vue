<template>
  <div class="flex flex-col w-full h-full align-center">
    <h2 class="text-center text-4xl mt-8">Games</h2>
    <div class="grid p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 place-items-center">
      <a v-for="item in items" class="gameContainer" href="/tictactoe">
        {{ item.game }}
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
const items = [{ game: 'Dont knw' }, { game: 'boo' }, { game: 'boo' }, { game: 'boo' }, { game: 'boo' }, { game: 'boo' }, { game: 'boo' }, { game: 'boo' }, { game: 'boo' }, { game: 'boo' }, { game: 'boo' }, { game: 'boo' }, { game: 'boo' }, { game: 'boo' }, { game: 'boo' }]
</script>



<style>
.gameContainer {
  @apply border h-40 w-full flex items-center justify-center rounded;
}
</style>
