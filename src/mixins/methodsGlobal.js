let objeto = {
    methods: {
        inserirElementos (arrayFor) {
            let array = [];
            for (let i = 0; i < arrayFor.length; i++) {
                array.push(arrayFor.item(i));
            }

            return array;
        },

        apenasCampo(objeto, campo) {
            let array = [];
            for (let i = 0; i < objeto.length; i++) {
                for (let j of objeto[i][campo]) {
                    array.push(j);
                }
            }

            return array;
        },

        copiaCampo(objeto) {
            let array = [];

            for (let i = 0; i < objeto.length; i++) {
                array.push(objeto[i]);
            }
            return array;
        },

        removerCampo(objeto, campo) {
            let array = objeto;
            for (let i = 0; i < objeto.length; i++) {
                delete array[i][campo];
            }

            return array;
        },

        colocarIn (vetor) {
            let string = '';
            for (let i = 0; i < vetor.length; i++) {
                if (i == 0) {
                    string += '?';
                }
                else {
                    string+=',?';
                }
            }

            return string;
        },
    }
}

export default objeto;
