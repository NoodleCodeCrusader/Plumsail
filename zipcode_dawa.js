function DawaZipCodeLookUp () {
    const zipcodefield = fd.field('zipcode');
    const cityfield = fd.field('city');

    zipcodefield.$on('change', function (value) {
        const zipcode = value;

        if (!zipcode || zipcode.length !== 4) {
            cityfield.value = '';
            return;
        }

        fetch('https://dawa.aws.dk/postnumre/' + postnummer)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Postnummer ikke fundet');
                }
                return response.json();
            })
            .then(function (data) {
                if (data && data.navn) {
                    cityfield.value = data.navn;
                } else {
                    cityfield.value = '';
                }
            })
            .catch(function (error) {
                console.error('Fejl ved opslag:', error);
                cityfield.value = '';
            });
    });
}
