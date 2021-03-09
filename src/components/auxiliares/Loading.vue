<template>
    <ion-loading
            :is-open="isOpen"
            cssClass="my-custom-class"
            :message="texto"
            @onDidDismiss="setOpen(false)"
    >
    </ion-loading>
</template>

<script>
    import { IonLoading } from '@ionic/vue';
    import { defineComponent, ref } from 'vue';

    export default defineComponent({
        name:'Loading',
        props: {
           isOpen: {
               type: Boolean,
               default: false
           },

            texto: {
                type: String,
                default: 'Carregando'
            },
        },
        components: { IonLoading },
        setup() {
            const isOpenRef = ref(false);
            const setOpen = (state) => isOpenRef.value = state;

            return { isOpenRef, setOpen }
        },
    });
</script>
