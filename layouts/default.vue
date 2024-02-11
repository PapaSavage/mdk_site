<template>
    <UContainer>
        <UCard class="mt-10" bg="black" :ui="{
            background: 'bh-bg-Neutral-800 dark:bg-neutral-800/50',
            ring: 'ring-1 ring-gray-300 dark:ring-gray-700',
            divide: 'divide-y divide-gray-300 dark:divide-gray-700',
            header: { base: 'font-bold' },
        }">
            <template #header>
                <div class="flex justify-between">
                    <h1>Welcome to Nuxt UI Starter</h1>
                    <ColorScheme>
                        <USelect v-model="$colorMode.preference" :options="['system', 'light', 'dark']" />
                    </ColorScheme>
                </div>
            </template>
            <slot />
        </UCard>
    </UContainer>
</template>

<script setup lang = "ts">

</script>
