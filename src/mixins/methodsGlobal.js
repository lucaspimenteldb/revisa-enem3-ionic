let objeto = {
    methods: {
        inserirElementos (arrayFor) {
            let array = [];
            for (let i = 0; i < arrayFor.length; i++) {
                array.push(arrayFor.item(i));
            }

            return array;
        },
    }
}

export default objeto;
