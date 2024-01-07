<template>
    <div class="container mx-auto flex flex-col h-full text-slate-50">
        <header>
            <nav class="flex w-full justify-between bg-zinc-700 p-4">
                <NuxtLink to="/">Multiplays</NuxtLink>
                <!-- <ul class="flex gap-4">
                    <li>
                        <NuxtLink to="/">Home</NuxtLink>
                    </li>
                </ul> -->
            </nav>
        </header>
        <main class="flex flex-grow justify-center items-center bg-zinc-900">
            <slot />
        </main>
        <footer class="flex w-full bg-zinc-700 p-4 justify-center">
            <p>©sarassaura, 2023. All rights reserved.</p>
        </footer>
    </div>
</template>
  
<script lang="ts" setup>

</script>
  
  
  
<style></style>
  