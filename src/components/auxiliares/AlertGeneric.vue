<template>
    <ion-alert
            :is-open="dialog"
            :header="text.header"
            :sub-header="text.subHeader"
            :message="text.message"
            css-class="my-custom-class"
            :buttons="buttons"
    >
    </ion-alert>

</template>

<script>
    import { IonAlert } from '@ionic/vue';
    import { defineComponent } from 'vue';

    export default defineComponent(
        {
            name: "AlertGeneric",
            components: {IonAlert},
            props: {
                buttons: {
                    default: ['ok']
                },
                dialog: {
                    default: false,
                },

                text: {
                    default: {
                        header: 'Mensagem',
                        subHeader: 'Mensagem',
                        message: 'Mensagem',
                    }
                }
            },

            methods : {
                // setDialog (dialog) {
                //     // this.dialog = dialog;
                // }
            }
        }
    )
</script>

<style scoped>

</style>
